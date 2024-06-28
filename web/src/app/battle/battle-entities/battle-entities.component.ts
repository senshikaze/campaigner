import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BattleEntity } from 'src/app/interfaces/battle-entity';

@Component({
  selector: 'battle-entities',
  template: `
  <div class="h-full w-full grow flex flex-col">
    <div class="grow flex flex-row">
      <div
        class="grow-0 flex-initial basis-1/5 border-r-slate-700 border-r-2"
        (dragover)="onDragOver($event)"
        (drop)="onDrop($event)"
      >
        <battle-entity-item
          *ngFor="let entity of entities"
          [entity]="entity" [attr.data-index]="entity.initiative ?? 0"
          (entitySelected)="selectedEntity = $event"
          (deleted)="deleted.emit($event)"
          draggable="true"
          (dragstart)="onDragStarted($event)"
        ></battle-entity-item>
      </div>
      <div class="grow flex flex-col basis-4/5">
        <battle-entity-description class="grow flex flex-col" [entity]="selectedEntity"></battle-entity-description>
      </div>
    <div>
  </div>
  `,
  styles: []
})
export class BattleEntitiesComponent {
  @Input() entities: BattleEntity[] = [];
  @Output() deleted = new EventEmitter<BattleEntity>();

  selectedEntity!: BattleEntity;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    (event.dataTransfer as DataTransfer).dropEffect = 'move';
  }

  onDragStarted(event: DragEvent): void {
    event.dataTransfer?.setData('text/plain', (event.target as HTMLElement).dataset?.['index'] ?? "0");
    (event.dataTransfer as DataTransfer).effectAllowed = 'move';
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
  }

  sortEntities(): void {

  }
}
