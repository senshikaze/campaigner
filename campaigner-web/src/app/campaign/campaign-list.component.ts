import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { Campaign } from '../interfaces/campaign';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-campaign-list',
  template:`
<div class="flex flex-col">
  <div class="flex">
    <h2 class="grow">Campaigns</h2>
    <button class="p-2 rounded-lg text-white bg-dark-action hover:bg-dark-action-hover" (click)="onCreateClicked()">Create</button>
  </div>
  <div class="flex">
    <ul>
      <li *ngFor="let campaign of campaigns"><a [routerLink]="['/campaign/', campaign.id]"  [state]="campaign">{{campaign.name}}</a></li>
    </ul>
  </div>
</div>
  `
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];

  constructor(private store: StoreService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.getCampaigns().subscribe({
      next: json => this.campaigns = json
    });
  }

  onCreateClicked() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
