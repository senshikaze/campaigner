import { Component, OnInit } from '@angular/core';
import { BattleEntitySelectedService } from '../../services/battle-entity-selected.service';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { Entity } from 'src/app/interfaces/entity';

@Component({
  selector: 'battle-entity-description',
  template:`
  @if (entity$ | async; as entity) {
  <div class="grow flex h-full">
    <div class="grow flex overflow-hidden">
      <textbox
        class="m-2 grow flex min-h-30 overflow-auto"
        styleClass="grow p-2"
        [text]="entity.description"
        (textChange)="onDescriptionChanged(entity, $event)"
        [entity]="entity"
      ></textbox>
    </div>
  </div>
  } @else {
  <div class="grow flex m-2 p-2 items-center bg-light-bg-selected dark:bg-dark-bg-selected text-center min-h-max rounded-md">
    <p class="text-slate-700 dark:text-slate-500 grow">Select Combatant</p>
  </div>
  }
  `,
  styles: []
})
export class BattleEntityDescriptionComponent implements OnInit {
  entity$!: Observable<Entity>;

  constructor(
    private store: StoreService,
    private entitySelected: BattleEntitySelectedService
  ) {}

  ngOnInit(): void {
    this.entity$ = this.entitySelected.getEntity();
  }

  onDescriptionChanged(entity: Entity, description: string): void {
    entity.description = description;
    if (entity.id) {
      this.store.saveEntity(entity);
    }
  }

}
