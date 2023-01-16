import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign/campaign.component';
import { BattleComponent } from './battle/battle.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { NotfoundComponent } from './notfound.component';

const routes: Routes = [
  { path: "campaign", component: CampaignListComponent},
  { path: "campaign/:id", component: CampaignComponent},
  { path: "battle", component: BattleComponent},
  { path: "", redirectTo: "/campaign", pathMatch: "full"},
  { path: "**", component: NotfoundComponent}
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
