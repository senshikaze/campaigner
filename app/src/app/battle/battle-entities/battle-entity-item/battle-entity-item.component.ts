import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
import { BattleEntity } from 'src/app/interfaces/battle-entity';
import { StoreService } from 'src/app/services/store.service';
import { BattleEntitySelectedService } from '../../services/battle-entity-selected.service';
import { InitiativeService } from '../../services/initiative.service';

@Component({
  selector: 'battle-entity-item',
  template: `
    <div 
      class="flex"
      [ngClass]="{
        'bg-gradient-to-b': entity.current_health <= entity.total_health / 2,
        'from-red-400/50': entity.current_health > 0,
        'from-red-600/50': entity.current_health <= 0 && allowNegativeHealth,
        'from-red-600/50 to-red-500/10': (entity.current_health <= 0 && !allowNegativeHealth) || (entity.current_health <= -entity.total_health && allowNegativeHealth),
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
            (blur)="saveBattleEntity(entity)"></cInput>
          <div class="flex">
            <cInput
              styleClass="inline w-16"
              [(value)]="entity.current_health"
              title="Current Health"
              inputType="number"
              (blur)="saveBattleEntity(entity)"></cInput>
            <p class="dark:text-white p-2 m-2">/</p>
            <cInput
              styleClass="inline w-16"
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
  @Input() entity!: BattleEntity;
  @Input() allowNegativeHealth = false;
  @Output() deleted = new EventEmitter<BattleEntity>();

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

  changeCurrentHealth(entity: BattleEntity, change: number): void {
    if (entity.current_health + change > entity.total_health) {
      entity.current_health = entity.total_health;
    } else {
      entity.current_health = (this.allowNegativeHealth)
        ? entity.current_health + change
        : entity.current_health = Math.max(entity.current_health + change, 0);
    }
    this.saveBattleEntity(entity);
  }

  saveBattleEntity(entity: BattleEntity): void {
    this.store.saveBattleEntity(entity).pipe(
      map(e => this.entity = e),
      take(1)
    ).subscribe();
  }
}
