import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign/campaign.component';
import { BattleComponent } from './battle/battle.component';

const routes: Routes = [
  { path: "", component: CampaignComponent},
  { path: "campaign", component: CampaignComponent, },
  { path: "battle", component: BattleComponent}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
