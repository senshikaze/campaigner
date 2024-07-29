import { Component, OnInit } from '@angular/core';
import { Battle } from '../interfaces/battle';
import { Observable, share } from 'rxjs';
import { StoreService } from '../services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'battle-list',
  template: `
  <div class="flex flex-col p-2">
    <div class="flex mb-4 grow">
      <span class="grow"></span>
      <add-button (click)="onCreateClicked()" title="Add Battle"></add-button>
    </div>
    <div class="flex grow">
      <ul class="grow">
        @for (battle of battles$ | async; track battle) {
          <li class="p-2 odd:bg-light-zebra-odd dark:odd:bg-dark-zebra-odd even:bg-light-zebra-even dark:even:bg-dark-zebra-even">
            <div class="flex">
              <p class="grow block text-lg">{{battle.name}}</p>
              <view-button [routerLink]="['/battles', battle.id]" [state]="battle" title="View Battle"></view-button>
              <delete-button [value]="battle" (clicked)="onDeleteClicked($event)" title="Delete Battle"></delete-button>
            </div>
          </li>
        }
      </ul>
    </div>
  </div>
  `,
  styles: []
})
export class BattleListComponent implements OnInit {
  battles$!: Observable<Battle[]>;

  constructor(
    private store: StoreService,
    private modal: ModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.battles$ = this.store.getBattles().pipe(share())
  }

  onCreateClicked(): void {
    this.router.navigate(["new"], {relativeTo: this.route})
  }

  onDeleteClicked(battle: Battle): void {
    if (battle.id) {
      this.modal.open({
        header: "Are you sure?",
        message: "Are you sure you want to delete this battle?",
        confirm: true,
        closable: true,
        yes: () => {
          this.store.deleteBattle(battle);
          this.battles$ = this.store.getBattles();
        }
      });
    }
  }
}
