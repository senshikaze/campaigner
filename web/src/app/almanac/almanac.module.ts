import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmanacRoutingModule } from './almanac-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlmanacComponent } from './almanac.component';
import { AlmanacEntryComponent } from './entry/almanac-entry/almanac-entry.component';
import { SharedModule } from '../shared.module';
import { AlmanacFormComponent } from './form/almanac-form/almanac-form.component';
import { AddButtonComponent } from '../misc/add-button/add-button.component';
import { DeleteButtonComponent } from '../misc/delete-button/delete-button.component';
import { ViewButtonComponent } from '../misc/view-button/view-button.component';
import { InputComponent } from '../misc/input/input.component';



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
    ReactiveFormsModule,
    AddButtonComponent,
    DeleteButtonComponent,
    ViewButtonComponent,
    InputComponent,
    
  ]
})
export class AlmanacModule { }
