import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';

import { BattleComponent } from './battle.component';
import { BattleRoutingModule } from './battle-routing.module';
import { BattleListComponent } from './battle-list.component';
import { DeleteButtonComponent } from '../misc/delete-button/delete-button.component';
import { ViewButtonComponent } from '../misc/view-button/view-button.component';
import { AddButtonComponent } from '../misc/add-button/add-button.component';
import { SaveButtonComponent } from '../misc/save-button/save-button.component';
import { BattleEntitiesComponent } from './battle-entities/battle-entities.component';
import { BattleEntityItemComponent } from './battle-entities/battle-entity-item/battle-entity-item.component';
import { HealthPickerComponent } from '../misc/health-picker/health-picker.component';
import { BattleEntityDescriptionComponent } from './battle-entities/battle-entity-description/battle-entity-description.component';
import { CloseButtonComponent } from '../misc/close-button/close-button.component';
import { DragItemComponent } from '../misc/drag-item/drag-item.component';
import { InputComponent } from '../misc/input/input.component';
import { TextboxComponent } from '../misc/textbox/textbox.component';
import { DiceRollerComponent } from '../misc/dice-roller/dice-roller.component';


@NgModule({
    declarations: [
      BattleComponent,
      BattleListComponent,
      BattleEntitiesComponent,
      BattleEntityItemComponent,
      BattleEntityDescriptionComponent,
    ],
    imports: [
      CommonModule,
      BattleRoutingModule,
      FormsModule,
      DeleteButtonComponent,
      ViewButtonComponent,
      AddButtonComponent,
      SaveButtonComponent,
      HealthPickerComponent,
      CloseButtonComponent,
      DragItemComponent,
      InputComponent,
      TextboxComponent,
      DiceRollerComponent,
      CdkDrag,
      CdkDropList,
      CdkDragHandle,
    ],
    providers: [],
    bootstrap: [BattleComponent]
  })
  export class BattleModule { }