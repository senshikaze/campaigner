import { Component, Input } from '@angular/core';
import { BattleEntity } from 'src/app/interfaces/battle-entity';

@Component({
  selector: 'battle-entity-description',
  template:`
  <div class="grow flex items-center">
    <div class="grow" *ngIf="entity; else elseBlock">
      {{entity.description}}
    </div>
    <ng-template #elseBlock>
      <p class="text-slate-500 text-center grow">Select Combatant</p>
    </ng-template>
  </div>
  `,
  styles: []
})
export class BattleEntityDescriptionComponent {
  @Input() entity!: BattleEntity;
}
