import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CampaignComponent } from './campaign.component';
import { CampaignListComponent } from './campaign-list.component';
import { EntryComponent } from './entry/entry.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import { TextBoxModule } from '../textbox/textbox.module';


@NgModule({
    declarations: [
      CampaignComponent,
      CampaignListComponent,
      EntryComponent,
    ],
    imports: [
      CommonModule,
      CampaignRoutingModule,
      FormsModule,
      TextBoxModule
    ],
    providers: [],
    bootstrap: [CampaignListComponent]
  })
  export class CampaignModule { }