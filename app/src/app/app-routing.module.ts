import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound.component';
import { PartiesComponent } from './player/parties/parties.component';
import { PartyComponent } from './player/parties/party/party.component';
import { PlayersComponent } from './player/players/players.component';
import { PlayerComponent } from './player/players/player/player.component';


const routes: Routes = [
  { path: "almanac", loadChildren: () => import("./almanac/almanac.module").then(m => m.AlmanacModule)},
  { path: "battles", loadChildren: () => import("./battle/battle.module").then(m => m.BattleModule)},
  { path: "campaign", loadChildren: () => import("./campaign/campaign.module").then(m => m.CampaignModule)},
  {
    path: "players",
    component: PlayersComponent,
    children: [
      {
        path: "parties",
        component: PartiesComponent,
        children: [
          { path: ':id', component: PartyComponent }
        ]
      },
      { path: ':id', component: PlayerComponent }
    ]
  },
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
