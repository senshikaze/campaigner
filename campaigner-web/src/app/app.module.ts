import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CKEditorModule } from 'ckeditor4-angular';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CampaignComponent } from './campaign/campaign.component';
import { AppRoutingModule } from './app-routing.module';
import { BattleComponent } from './battle/battle.component';
import { AlmanacComponent } from './almanac/almanac.component';
import { TextboxComponent } from './textbox/textbox.component';
import { EntryComponent } from './entry/entry.component';
import { FormsModule } from '@angular/forms';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { NotfoundComponent } from './notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CampaignComponent,
    BattleComponent,
    AlmanacComponent,
    TextboxComponent,
    EntryComponent,
    CampaignListComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
