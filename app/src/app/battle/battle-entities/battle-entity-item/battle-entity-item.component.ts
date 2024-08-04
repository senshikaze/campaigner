import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { BattleEntitySelectedService } from '../../services/battle-entity-selected.service';
import { InitiativeService } from '../../services/initiative.service';
import { Entity } from 'src/app/interfaces/entity';

@Component({
  selector: 'battle-entity-item',
  template: `
    <div 
      class="flex"
      [ngClass]="{
        'bg-gradient-to-b': entity.current_health ?? 0 <= (entity.total_health ??0) / 2,
        'from-red-400/50': entity.current_health ?? 0 > 0,
        'from-red-600/50': entity.current_health ?? 0 <= 0 && entity.allows_negative,
        'from-red-600/50 to-red-500/10': (entity.current_health ?? 0 <= 0 && !entity.allows_negative) || (entity.current_health ?? 0 <= -(entity.total_health ?? 0) && entity.allows_negative),
        'bg-light-bg-selected dark:bg-dark-bg-selected': currentInit | async
      }"
    >
      <div class="flex flex-col grow-0">
        <close-button (click)="deleted.emit(entity)" title="Delete Entity"></close-button>
        <drag-item cdkDragHandle></drag-item>
      </div>  
      <div class="basis-3/4 grow" (click)="entitySelected.entitySelected(entity)" >
        <div>
          <cInput
            class="grow"
            [(value)]="entity.name"
            title="Entity Name"
            placeholder="Entity Name"
            styleClass="m-2"
            (blur)="saveBattleEntity(entity)"></cInput>
          <div class="flex">
            <cInput
              styleClass="inline w-16 m-2"
              [(value)]="entity.current_health"
              title="Current Health"
              inputType="number"
              (blur)="saveBattleEntity(entity)"></cInput>
            <p class="dark:text-white p-2 m-2">/</p>
            <cInput
              styleClass="inline w-16 m-2"
              [(value)]="entity.total_health"
              title="Total Health"
              [min]="0"
              inputType="number"
              (valueChange)="entity.current_health = $event; saveBattleEntity(entity)"
              (blur)="saveBattleEntity(entity)"></cInput>
          </div>
          <cInput
            [(value)]="entity.initiative"
            title="Initiative"
            inputType="number"
            styleClass="m-2"
            (blur)="saveBattleEntity(entity)"></cInput>
        </div>
      </div>
      <div class="basis-1/4 grow-0">
        <health-picker
          (healthChange)="changeCurrentHealth(entity, $event)"
        ></health-picker>
      </div>
    </div>
  `,
  styles: []
})
export class BattleEntityItemComponent implements OnInit {
  @Input() entity!: Entity;
  @Output() deleted = new EventEmitter<Entity>();

  currentInit: Observable<boolean> = of(false);

  edit = false;

  constructor(
    private store: StoreService,
    public entitySelected: BattleEntitySelectedService,
    private initiative: InitiativeService,
  ) {}

  ngOnInit(): void {
    if (!this.entity.id) {
      this.edit = true;
    }
    this.currentInit = this.initiative.currentEntity().pipe(
      map(entity => (entity !== undefined && this.entity.id) ? entity.id == this.entity.id : false)
    );
  }

  changeCurrentHealth(entity: Entity, change: number): void {
    if (entity.current_health ?? 0 + change > (entity.total_health ?? 0)) {
      entity.current_health = entity.total_health;
    } else {
      entity.current_health = (this.entity.allows_negative)
        ? entity.current_health ?? 0 + change
        : entity.current_health = Math.max(entity.current_health ?? 0 + change, 0);
    }
    this.saveBattleEntity(entity);
  }

  saveBattleEntity(entity: Entity): void {
    this.store.saveEntity(entity).pipe(
      map(e => this.entity = e),
      take(1)
    ).subscribe();
  }
}
