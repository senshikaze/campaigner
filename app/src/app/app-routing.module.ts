import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound.component';


const routes: Routes = [
  { path: "campaign", loadChildren: () => import("./campaign/campaign.module").then(m => m.CampaignModule)},
  { path: "battles", loadChildren: () => import("./battle/battle.module").then(m => m.BattleModule)},
  { path: "almanac", loadChildren: () => import("./almanac/almanac.module").then(m => m.AlmanacModule)},
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
