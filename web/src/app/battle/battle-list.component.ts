import { Component, OnInit } from '@angular/core';
import { Battle } from '../interfaces/battle';
import { Observable, share } from 'rxjs';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-battle-list',
  template: `
  <div class="flex flex-col p-2">
    <div class="flex mb-4 grow">
      <span class="grow"></span>
      <add-button (click)="onCreateClicked()" title="Add Battle"></add-button>
    </div>
    <div class="flex grow">
      <ul class="grow">
        <li class="p-2 odd:bg-dark-zebra-odd even:bg-dark-zebra-even" *ngFor="let battle of battles$ | async">
          <div class="flex">
            <p class="grow block text-lg">{{battle.name}}</p>
            <view-button [routerLink]="['/battles', battle.id]" [state]="battle" title="View Battle"></view-button>
            <delete-button [value]="battle" (click)="onDeleteClicked($event)" title="Delete Battle"></delete-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
  `,
  styles: []
})
export class BattleListComponent implements OnInit {
  battles$!: Observable<Battle[]>;

  constructor(private store: StoreService) {}
  ngOnInit(): void {
    this.battles$ = this.store.getBattles().pipe(share())
  }

  onCreateClicked(): void {

  }

  onDeleteClicked(battle: Battle): void {

  }
}
