import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BattleComponent } from './battle.component';
import { BattleListComponent } from './battle-list.component';


const routes: Routes = [
    {path: "", component: BattleListComponent},
    {path: ":id", component: BattleComponent}
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class BattleRoutingModule { }
  