import { Component } from '@angular/core';
import { BattleEntityComponent } from "../../entries/battle-entity/battle-entity.component";
import { Dialog } from 'src/app/interfaces/dialog';
import { ModalService } from 'src/app/services/modal.service';
import { Entity } from 'src/app/interfaces/entity';

export interface BattleEntityDialogInterface {
  entity: Entity,
  saved: (entity: Entity) => void 
}

@Component({
  selector: 'app-battle-entity-dialog',
  standalone: true,
  imports: [BattleEntityComponent],
  template: `
  <div class="min-h-0">
    <battle-entity-entry [entity]="data.entity" (saved)="data.saved($event); modal.close()"></battle-entity-entry>
  </div>
  `,
  styles: ``
})
export class BattleEntityDialogComponent implements Dialog {
  data!: BattleEntityDialogInterface;

  constructor(
    public modal: ModalService
  ) {}
}
