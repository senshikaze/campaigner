import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Battle } from 'src/app/interfaces/battle';
import { BattleEntity } from 'src/app/interfaces/battle-entity';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'battle-entities',
  template: `
  <div class="h-full w-full grow flex flex-col">
    <div class="grow flex flex-row">
      <div
        class="grow-0 flex-initial basis-1/5 flex flex-col border-r-slate-400 dark:border-r-slate-700 border-r-2">
        <div class="flex grow flex-col">
          <battle-entity-item
            *ngFor="let entity of entities$ | async"
            [entity]="entity" [attr.data-index]="entity.initiative ?? 0"
            (entitySelected)="selectedEntity = $event"
            (deleted)="onDeleted($event)"></battle-entity-item>
        </div>
        <div class="flex flex-col">
          <add-button *ngIf="battle.id" (clicked)="onAddClicked(battle)" title="Add Combatant"></add-button>
        </div>
      </div>
      <div class="grow flex flex-col basis-4/5">
        <battle-entity-description class="grow flex flex-col" [entity]="selectedEntity"></battle-entity-description>
      </div>
    <div>
  </div>
  `,
  styles: []
})
export class BattleEntitiesComponent implements OnDestroy {
  @Input() battle!: Battle;
  @Input() saveEvent!: Observable<Battle>;

  entities$ = new BehaviorSubject<BattleEntity[]>([]);
  
  selectedEntity!: BattleEntity;

  destroy$ = new Subject<boolean>();

  constructor(
    private store: StoreService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onAddClicked(battle: Battle): void {
    if (battle.id) {
      let entities = this.entities$.getValue();
      let lastInit = (entities[entities.length - 1]) ? (entities[entities.length - 1].initiative ?? 21) - 1 : 20;
      entities = [...entities, ...[{battle_id: battle.id, current_health: 0, total_health: 0, initiative: lastInit}]];
      this.entities$.next(entities);
    }
  }

  onDeleted(entity: BattleEntity): void {
    if (entity.id) {
      this.store.deleteBattleEntity(entity);
    }
    let entities = this.entities$.getValue();
    entities = entities.filter(e => e != entity);
    this.entities$.next(entities);
  }

  sortEntities(): void {

  }
}
