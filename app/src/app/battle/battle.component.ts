import { Component, OnDestroy, OnInit } from '@angular/core';
import { Battle } from '../interfaces/battle';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { BehaviorSubject, NotFoundError, Observable, Subject, Subscription, catchError, debounce, debounceTime, distinctUntilChanged, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { InitiativeService } from './services/initiative.service';

@Component({
  selector: 'battle',
  template:`
  @if (battle$ | async; as battle) {
  <div class="flex grow h-full max-h-screen">
    <div class="flex max-h-full">
      <div class="flex flex-col min-w-96">
        <div class="mb-4 flex">
          <cInput
            class="grow m-2"
            styleClass="w-full"
            [value]="battle.name"
            (valueChange)="title$.next($event)"
            title="Battle Title"
            placeholder="Battle Title"></cInput>
          <initiative-button></initiative-button>
        </div>
        <div class="flex grow">
          <battle-entities
            class="border-b-2 last:border-b-0 border-b-slate-400 dark:border-b-slate-700 w-full"
            [battle]="battle"
            [saveEvent]="saveEvent.asObservable()"></battle-entities>
        </div>
      </div>
    </div>
    <battle-entity-description class="grow flex flex-col"></battle-entity-description>
  </div>
  }
  `,
  styles: []
})
export class BattleComponent implements OnInit, OnDestroy {
  battle$ = new BehaviorSubject<Battle>({name: '', rounds: 0});

  saveEvent = new Subject<Battle>();

  title$ = new Subject<string>();

  destroy$ = new Subject<void>();

  constructor (
    private store: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: ModalService,
    private initiative: InitiativeService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((p: ParamMap) => {
        if (p.has('id') && p.get('id') != "new") {
          return this.store.getBattle(Number.parseInt(p.get("id") ?? '')).pipe(
            tap(battle => (battle) ? this.initiative.setBattle(battle) : undefined)
          );
        } else {
          return of({name: '', rounds: 0} as Battle);
        }
      }),
      take(1)
    ).subscribe(battle => (battle) ? this.battle$.next(battle) : undefined);

    this.title$.pipe(
      debounceTime(450),
      distinctUntilChanged(),
      switchMap(title => this.battle$.pipe(
        map(battle => {
          battle.name = title;
          return battle;
        }),
        tap(b => this.store.saveBattle(b).pipe(
          tap(b => (b?.id) ? this.router.navigate(["battles", b.id]) : undefined),
          map(b => this.battle$.next(b))
        )),
      )),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
