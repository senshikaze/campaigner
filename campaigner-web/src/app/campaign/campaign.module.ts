import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CampaignComponent } from './campaign.component';
import { CampaignListComponent } from './campaign-list.component';
import { EntryComponent } from './entry/entry.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import { TextBoxModule } from '../textbox/textbox.module';
import { SectionComponent } from './section/section.component';
import { SectionListComponent } from './section/section-list/section-list.component';
import { CreateEntryButtonComponent } from './entry/create-button/create-entry-button.component';
import { CreateSectionButtonComponent } from './section/create-section-button/create-section-button.component';
import { EntriesComponent } from './entry/entries/entries.component';


@NgModule({
    declarations: [
      CampaignComponent,
      CampaignListComponent,
      EntryComponent,
      SectionComponent,
      SectionListComponent,
      CreateEntryButtonComponent,
      CreateSectionButtonComponent,
      EntriesComponent,
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