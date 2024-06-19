import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BattleComponent } from './battle.component';
import { BattleRoutingModule } from './battle-routing.module';
import { BattleListComponent } from './battle-list.component';
import { DeleteButtonComponent } from '../misc/delete-button/delete-button.component';
import { ViewButtonComponent } from '../misc/view-button/view-button.component';
import { AddButtonComponent } from '../misc/add-button/add-button.component';
import { SaveButtonComponent } from '../misc/save-button/save-button.component';


@NgModule({
    declarations: [
      BattleComponent,
      BattleListComponent,
    ],
    imports: [
      CommonModule,
      BattleRoutingModule,
      FormsModule,
      DeleteButtonComponent,
      ViewButtonComponent,
      AddButtonComponent,
      SaveButtonComponent,
    ],
    providers: [],
    bootstrap: [BattleComponent]
  })
  export class BattleModule { }