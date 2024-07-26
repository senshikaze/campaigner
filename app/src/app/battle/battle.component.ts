import { Component, OnInit } from '@angular/core';
import { Battle } from '../interfaces/battle';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Observable, Subject, of, take } from 'rxjs';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'battle',
  template:`
  <div class="flex grow p-2 h-full max-h-full" *ngIf="battle$ | async as battle">
    <div class="flex">
      <div class="flex flex-col min-w-96">
        <div class="mb-4 flex border-b-2 border-slate-400 dark:border-slate-700">
          <cInput
            class="grow mr-2"
            styleClass="w-full"
            [(value)]="battle.name"
            title="Battle Title"
            placeholder="Battle Title"></cInput>
          <save-button
            class="justify-end"
            (click)="onSaveClicked(battle)"
            title="Save Battle"></save-button>
        </div>
        <div class="flex grow">
          <battle-entities
            class="border-b-2 last:border-b-0 border-b-slate-400 dark:border-b-slate-700"
            [battle]="battle"
            [saveEvent]="saveEvent.asObservable()"></battle-entities>
        </div>
      </div>
    </div>
    <div class="grow flex">
      <battle-entity-description class="grow flex flex-col"></battle-entity-description>
    </div>
    <dice-roller class="absolute bottom-1 right-1"></dice-roller>
</div>
  `,
  styles: []
})
export class BattleComponent implements OnInit {
  battle$!: Observable<Battle | undefined>;

  saveEvent = new Subject<Battle>();

  constructor (
    private store: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: ModalService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      if (p.has('id') && p.get('id') != "new") {
        this.battle$ = this.store.getBattle(Number.parseInt(p.get("id") ?? ''));
      } else {
        this.battle$ = of({
          name: ''
        });
      }
    })
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
