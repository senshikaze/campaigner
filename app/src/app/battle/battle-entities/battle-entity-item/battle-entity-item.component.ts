import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, take } from 'rxjs';
import { BattleEntity } from 'src/app/interfaces/battle-entity';
import { StoreService } from 'src/app/services/store.service';
import { BattleEntitySelectedService } from '../../services/battle-entity-selected.service';

@Component({
  selector: 'battle-entity-item',
  template: `
    <div class="flex">
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
              inputType="number"
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
          [maxHealth]="entity.total_health"
          [(currentHealth)]="entity.current_health"
          (changed)="saveBattleEntity(entity)"
        ></health-picker>
      </div>
    </div>
  `,
  styles: []
})
export class BattleEntityItemComponent implements OnInit {
  @Input() entity!: BattleEntity;
  @Output() deleted = new EventEmitter<BattleEntity>();

  edit = false;

  constructor(
    private store: StoreService,
    public entitySelected: BattleEntitySelectedService,
  ) {}

  ngOnInit(): void {
    if (!this.entity.id) {
      this.edit = true;
    }
  }

  onHealthChanged(entity: BattleEntity, health: number): void {
    entity.current_health = health;
    this.saveBattleEntity(entity);
  }

  saveBattleEntity(entity: BattleEntity): void {
    this.store.saveBattleEntity(entity).pipe(
      map(e => this.entity = e),
      take(1)
    ).subscribe();
  }
}
