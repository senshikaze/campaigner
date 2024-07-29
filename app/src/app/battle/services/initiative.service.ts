import { Injectable } from '@angular/core';
import { catchError, filter, map, max, mergeMap, Observable, ReplaySubject, switchMap, take, tap } from 'rxjs';
import { Battle } from 'src/app/interfaces/battle';
import { BattleEntity } from 'src/app/interfaces/battle-entity';
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

  currentEntity(): Observable<BattleEntity | undefined> {
    return this.battle$.pipe(
      filter((b: Battle) => b.current_entity_id !== undefined),
      switchMap(b => this.store.getBattleEntity(b.current_entity_id))
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
          b.current_entity_id = entities.slice(index).filter(entity => entity.current_health >=0)[0].id;
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
        map((entity: BattleEntity) => {b.current_entity_id = entity.id; return b;}),
        tap(battle => this.store.saveBattle(battle).pipe(take(1)).subscribe())
      )),
      take(1)
    ).subscribe(battle => this.battle$.next(battle));
  }
}
