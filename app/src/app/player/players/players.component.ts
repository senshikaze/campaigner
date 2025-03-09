import { Component, OnInit } from '@angular/core';
import { AddButtonComponent } from 'src/app/misc/add-button/add-button.component';
import { PartiesComponent } from "../parties/parties.component";
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeleteButtonComponent } from 'src/app/misc/delete-button/delete-button.component';
import { StoreService } from 'src/app/services/store.service';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AddButtonComponent,
    DeleteButtonComponent,
    PartiesComponent,
],
  template: `
  <div class="flex flex-col p-2">
    <div class="flex flex-col">
      <h3 class="text-2xl font-bold">Parties</h3>
      <parties></parties>
    </div>
    <div class="flex flex-col">
      <h3 class="text-2xl font-bold">Players</h3>
      <div class="flex mb-4 grow">
        <span class="grow"></span>
        <add-button (click)="onPlayerCreateClicked()" title="Add Player"></add-button>
      </div>
      <div class="flex grow">
        <table class="grow border-collapse table-auto">
          <tr class="bg-light-zebra-odd dark:bg-dark-zebra-odd">
            <th class="p-2 text-left text-xl">Name</th>
            <th class="p-2 text-left text-xl">Sections</th>
            <th class="p-2 text-left"></th>
          </tr>
          @for (player of players$ | async; track player.id) {
          <tr class="odd:bg-light-zebra-odd dark:odd:bg-dark-zebra-odd even:bg-light-zebra-even dark:even:bg-dark-zebra-even">
            <td class="w-2/3">
              <a
                class="p-2 block text-lg hover:font-bold"
                [routerLink]="['/players/', player.id]"
                [state]="player"
                [title]="player.name"
              >{{player.name}}</a>
            </td>
            <td class="p-2"></td>
            <td class="p-2">
              <delete-button (click)="onPlayerDeleteClicked(player)" title="Delete Player"></delete-button>
            </td>
          </tr>
          }
        </table>
      </div>
    </div>
  </div>
  `,
  styles: ``
})
export class PlayersComponent implements OnInit {
  players$ = new Subject<Player[]>();

  constructor(
    private store: StoreService,
  ) {}

  ngOnInit(): void {
    
  }

  onPlayerCreateClicked(): void {

  }

  onPlayerDeleteClicked(player: Player): void {

  }
}
