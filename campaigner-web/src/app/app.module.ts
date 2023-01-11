import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CampaignComponent } from './campaign/campaign.component';
import { AppRoutingModule } from './app-routing.module';
import { BattleComponent } from './battle/battle.component';
import { AlmanacComponent } from './almanac/almanac.component';
import { TextboxComponent } from './textbox/textbox.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CampaignComponent,
    BattleComponent,
    AlmanacComponent,
    TextboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
