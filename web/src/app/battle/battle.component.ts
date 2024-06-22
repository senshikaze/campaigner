import { Component, OnInit } from '@angular/core';
import { Battle } from '../interfaces/battle';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { BehaviorSubject, Observable, from, of, scan, take, tap } from 'rxjs';
import { BattleEntity } from '../interfaces/battle-entity';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-battle',
  template:`
  <div class="flex flex-col grow p-2 h-full" *ngIf="battle$ | async as battle">
    <div class="overflow-y-scroll grid grid-flow-col gird-cols-12 grow">
        <div class="grow col-span-2 flex flex-col border-r-2 border-slate-700">
            <div class="flex border-b-2 border-slate-700">
                <div class="mb-2 flex flex-auto">
                    <input
                        class="grow text-white p-2 m-2 rounded-md placeholder:text-slate-400 bg-dark-input-bg"
                        [(ngModel)]="battle.name"
                        i18n-title title="Battle Title"
                        i18n-placeholder placeholder="Battle Title">
                    <save-button (click)="onSaveClicked(battle)" title="Save Battle"></save-button>
                    <add-button *ngIf="battle.id" (click)="onAddClicked(battle)" title="Add Combatant"></add-button>
                </div>
            </div>
            <battle-entities [entities]="(entities$ | async) ?? []"></battle-entities>
        </div>
    </div>
</div>
  `,
  styles: []
})
export class BattleComponent implements OnInit {
  battle$!: Observable<Battle>;

  entities$ = new BehaviorSubject<BattleEntity[]>([]);

  constructor (
    private store: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: ModalService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      if (p.has('id') && p.get('id') != "new") {
        this.battle$ = this.store.getBattle(Number.parseInt(p.get("id") ?? '')).pipe(
          tap(b => this.store.getBattleEntities(b).pipe(
              take(1)
            ).subscribe(c => this.entities$.next(c))
          )
        );
      } else {
        this.battle$ = of({
          name: ''
        });
      }
    })
  }

  onAddClicked(battle: Battle): void {
    if (battle.id) {
      
    }
  }

  onSaveClicked(battle: Battle): void {
    if (battle.id != undefined) {
      this.battle$ = this.store.saveBattle(battle);
    } else {
      this.store.saveBattle(battle).pipe(
        take(1)
      ).subscribe(b => this.router.navigate(["/battles", b.id]));
    }
  }
}
