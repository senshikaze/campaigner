import { Injectable } from '@angular/core';
import { filter, map, Observable, ReplaySubject, switchMap, take, tap } from 'rxjs';
import { Battle } from 'src/app/interfaces/battle';
import { Entity } from 'src/app/interfaces/entity';
import { StoreService } from 'src/app/services/store.service';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {

  battle$ = new ReplaySubject<Battle>();

  constructor(
    private store: StoreService,
  ) { }

  setBattle(battle: Battle): void {
    this.battle$.next(battle);
  }

  getBattle(): Observable<Battle> {
    return this.battle$.asObservable();
  }

  isStarted(): Observable<boolean> {
    return this.battle$.pipe(
      map(b => b.current_entity_id !== undefined)
    )
  }

  currentEntity(): Observable<Entity | undefined> {
    return this.battle$.pipe(
      switchMap(b => this.store.getEntity(b.current_entity_id ?? -1))
    )
  }

  next(): void {
    this.battle$.pipe(
      switchMap(b => this.store.getBattleEntities(b).pipe(
        map(entities => {
          let index = entities.findIndex((value) => value.id == b.current_entity_id) + 1;
          if (index >= entities.length) {
            index = 0;
          }
          b.current_entity_id = entities
            .slice(index)
            .filter(entity => entity.allows_negative || (entity.current_health ?? 0)  >= 0)[0].id;
          return b;
        }),
        tap(battle => this.store.saveBattle(battle).pipe(take(1)).subscribe())
      )),
      take(1)
    ).subscribe(battle => this.battle$.next(battle));
  }

  start(): void {
    this.battle$.pipe(
      switchMap(b => this.store.getBattleEntities(b).pipe(
        map(entities => entities.reduce((highest, current) => (current.initiative ?? 0) > (highest.initiative ?? 0) ? current : highest)),
        map((entity: Entity) => {b.current_entity_id = entity.id; return b;}),
        tap(battle => this.store.saveBattle(battle).pipe(take(1)).subscribe())
      )),
      take(1)
    ).subscribe(battle => this.battle$.next(battle));
  }

  stop(): void {
    this.battle$.pipe(
      map(battle => {battle.current_entity_id = undefined; return battle}),
      tap(battle => this.store.saveBattle(battle).pipe(take(1)).subscribe()),
      take(1)
    ).subscribe(battle => this.battle$.next(battle));
  }
}
