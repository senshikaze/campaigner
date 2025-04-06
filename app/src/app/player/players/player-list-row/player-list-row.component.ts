import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Campaign } from 'src/app/interfaces/campaign';
import { Player } from 'src/app/interfaces/player';
import { DeleteButtonComponent } from 'src/app/misc/delete-button/delete-button.component';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'tr[player-list-row]',
  standalone: true,
  imports: [
    BrowserModule,
    RouterLink,
    DeleteButtonComponent
  ],
  template: `
  <ng-content class="odd:bg-light-zebra-odd dark:odd:bg-dark-zebra-odd even:bg-light-zebra-even dark:even:bg-dark-zebra-even">
    <td class="w-2/3">
      <a
        class="p-2 block text-lg hover:font-bold"
        [routerLink]="['/players/', player.id]"
        [state]="player"
        [title]="player.name"
      >{{player.name}}</a>
    </td>
    @if (campaign$ | async; as campaign) {
      <td class="p-2">{{campaign?.name ?? "None"}}</td>
    } @else {
      <td class="p-2">None</td>
    }
    <td class="p-2">
      <delete-button (click)="onPlayerDeleteClicked()" title="Delete Player"></delete-button>
    </td>
  </ng-content>
  `,
  styles: ``
})
export class PlayerListRowComponent implements OnInit {
  @Input() player!: Player;
  @Output() playerDeleted = new EventEmitter<Player>();

  campaign$!: Observable<Campaign|undefined>;

  constructor(
    private store: StoreService
  ) {}

  ngOnInit(): void {
    if (this.player && this.player.campaign_id !== undefined) {
      this.campaign$ = this.store.getCampaign(this.player.campaign_id);
    }
  }

  onPlayerDeleteClicked() {
    this.playerDeleted.emit(this.player);
  }
}
