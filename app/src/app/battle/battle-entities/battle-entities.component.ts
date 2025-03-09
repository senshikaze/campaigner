import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, ModelSignal, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, reduce, Subject, take, takeUntil } from 'rxjs';
import { EntityType } from 'src/app/enums/entity-type';
import { Battle } from 'src/app/interfaces/battle';
import { Entity } from 'src/app/interfaces/entity';
import { BattleEntityDialogComponent, BattleEntityDialogInterface } from 'src/app/misc/dialogs/battle-entity-dialog/battle-entity-dialog.component';
import { ModalService } from 'src/app/services/modal.service';
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
          (initChanged)="sortEntities()"
          (deleted)="onDeleted($event)"
          cdkDrag></battle-entity-item>
      }
    </div>
    @if (battle.id) {
      <div class="grow-0 flex flex-col">
        <add-button (clicked)="addEntity()" title="Add Combatant" text="Add"></add-button>
      </div>
    }
  </div>
  `,
  styles: [
    `.cdk-drag-preview {background: theme('colors.slate.800')}`,
    `.cdk-drag-placeholder {visibility: hidden}`
  ]
})
export class BattleEntitiesComponent implements OnInit, OnChanges {
  @Input() battle!: Battle;
  @Input() saveEvent!: Observable<Battle>;

  entities$ = new BehaviorSubject<Entity[]>([]);

  constructor(
    private store: StoreService,
    private model: ModalService,
  ) {}

  ngOnInit(): void {
    this.store.getBattleEntities(this.battle).pipe(
      take(1)
    ).subscribe(entities => this.entities$.next(entities));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['battle']) {
      this.store.getBattleEntities(this.battle).pipe(
        map(entities => entities.sort((higher, lower) => (lower.initiative ?? 0) > (higher.initiative ?? 0) ? 1 : -1)),
        take(1)
      ).subscribe(entities => this.entities$.next(entities));
    }
  }

  addEntity(): void {
    if (this.battle.id) {
      let entities = this.entities$.getValue();
      let data: BattleEntityDialogInterface = {
        entity: {
          type: EntityType.NPC,
          name: "",
          description: "",
          notes: "",
          battle_id: this.battle.id,
          initiative: (entities[entities.length - 1]) ? (entities[entities.length - 1].initiative ?? 21) - 1 : 20,
          total_health: 0,
          current_health: 0,
          allows_negative: false,
          stats: {
            ac: 0,
            speed: 0,
            strength: 0,
            constitution: 0,
            dexterity: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
          }
        },
        saved: (entity) => {
          let entities = this.entities$.getValue();
          this.entities$.next([...entities, ...[entity]])
        }
      };
  
      this.model.open({
        header: "Create New Combatant",
        component: BattleEntityDialogComponent,
        data: data,
      });
    }
  }

  onDeleted(entity: Entity): void {
    if (entity.id) {
      this.store.deleteEntity(entity);
    }
    let entities = this.entities$.getValue();
    entities = entities.filter(e => e != entity);
    this.entities$.next(entities);
  }

  sortEntities(): void {
    this.store.getBattleEntities(this.battle).pipe(
      map(entities => entities.sort((higher, lower) => (lower.initiative ?? 0) > (higher.initiative ?? 0) ? 1 : -1)),
      take(1)
    ).subscribe(entities => this.entities$.next(entities));
  }

  drop(event: CdkDragDrop<Entity[]>) {
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
