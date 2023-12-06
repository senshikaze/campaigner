import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AlmanacComponent } from './almanac.component';
import { AlmanacEntryComponent } from './entry/almanac-entry/almanac-entry.component';


const routes: Routes = [
    {path: "", component: AlmanacComponent},
    {path: ":id", component: AlmanacEntryComponent},
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
  export class AlmanacRoutingModule { }
  