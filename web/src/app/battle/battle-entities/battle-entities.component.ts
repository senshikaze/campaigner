import { Component, Input } from '@angular/core';
import { BattleEntity } from 'src/app/interfaces/battle-entity';

@Component({
  selector: 'battle-entities',
  template: `
    <div>
      <div>
        <battle-entity-item *ngFor="let entity of entities" [entity]="entity"></battle-entity-item>
      </div>
      <div>
      </div>
    <div>
  `,
  styles: []
})
export class BattleEntitiesComponent {
  @Input() entities: BattleEntity[] = [];
}
