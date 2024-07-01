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
import { CampaignSectionsComponent } from './campaign-sections/campaign-sections.component';
import { AddButtonComponent } from '../misc/add-button/add-button.component';
import { DeleteButtonComponent } from '../misc/delete-button/delete-button.component';
import { ViewButtonComponent } from '../misc/view-button/view-button.component';
import { SaveButtonComponent } from '../misc/save-button/save-button.component';
import { InputComponent } from '../misc/input/input.component';


@NgModule({
    declarations: [
      CampaignComponent,
      CampaignListComponent,
      CampaignSectionsComponent,
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
      TextBoxModule,
      AddButtonComponent,
      DeleteButtonComponent,
      SaveButtonComponent,
      ViewButtonComponent,
      InputComponent,
    ],
    providers: [],
    bootstrap: [CampaignListComponent]
  })
  export class CampaignModule { }