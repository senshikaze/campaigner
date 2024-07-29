import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Battle } from 'src/app/interfaces/battle';
import { BattleEntity } from 'src/app/interfaces/battle-entity';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'battle-entities',
  template: `
  <div
    class="grow flex flex-col min-h-full overflow-hidden">
    <div class="grow flex flex-col overflow-auto h-0" cdkDropList (cdkDropListDropped)="drop($event)">
      @for (entity of entities$ | async; track entity) {
        <battle-entity-item
          class="min-h-30"
          [entity]="entity" [attr.data-index]="entity.initiative ?? 0"
          (deleted)="onDeleted($event)"
          cdkDrag></battle-entity-item>
      }
    </div>
    @if (battle.id) {
      <div class="grow-0 flex flex-col border-t-2 border-slate-300 dark:border-slate-800">
        <add-button (clicked)="onAddClicked(battle)" title="Add Combatant"></add-button>
      </div>
    }
  </div>
  `,
  styles: [
    `.cdk-drag-preview {background: theme('colors.slate.800')}`,
    `.cdk-drag-placeholder {visibility: hidden}`
  ]
})
export class BattleEntitiesComponent implements OnInit, OnDestroy {
  @Input() battle!: Battle;
  @Input() saveEvent!: Observable<Battle>;

  entities$ = new BehaviorSubject<BattleEntity[]>([]);

  destroy$ = new Subject<boolean>();

  constructor(
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.store.getBattleEntities(this.battle).pipe(
      takeUntil(this.destroy$)
    ).subscribe(entities => this.entities$.next(entities));
  }

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

  drop(event: CdkDragDrop<BattleEntity[]>) {
    let entities = this.entities$.getValue();
    // find the next best initiative to set the current to +1/-1
    if (event.currentIndex !== event.previousIndex) {
      if (entities.length > 1 && event.currentIndex == 0) {
        entities[event.previousIndex].initiative = (entities[0].initiative ?? 0) + 1;
      } else if (entities.length > 1 && event.currentIndex + 1 == entities.length) {
        entities[event.previousIndex].initiative = (entities[entities.length - 1].initiative ?? 0) - 1;
      } else if (entities.length > 1) {
        entities[event.previousIndex].initiative = (entities[event.currentIndex + 1].initiative ?? 0) + 1;
      }
    }
    entities.sort((a, b) => ((b.initiative ?? 0) > (a.initiative ?? 0)) ? 1 : -1)
    this.entities$.next(entities);
  }
}
