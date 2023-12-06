import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmanacRoutingModule } from './almanac-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlmanacComponent } from './almanac.component';
import { AlmanacEntryComponent } from './entry/almanac-entry/almanac-entry.component';
import { SharedModule } from '../shared.module';
import { AlmanacFormComponent } from './form/almanac-form/almanac-form.component';



@NgModule({
  declarations: [
    AlmanacComponent,
    AlmanacEntryComponent,
    AlmanacFormComponent,
  ],
  imports: [
    CommonModule,
    AlmanacRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AlmanacModule { }
