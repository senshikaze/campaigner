import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CampaignListComponent } from './campaign-list.component';
import { CampaignComponent } from './campaign.component';

const routes: Routes = [
    {path: "", component: CampaignListComponent},
    {path: ":id", component: CampaignComponent}
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class CampaignRoutingModule { }
  