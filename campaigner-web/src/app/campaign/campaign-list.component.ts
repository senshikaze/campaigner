import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, share, Observable } from 'rxjs';
import { Campaign } from '../interfaces/campaign';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-campaign-list',
  template:`
<div class="flex flex-col p-2">
  <div class="flex mb-4 grow">
    <span class="grow"></span>
    <button
      class="p-2 rounded-lg text-white bg-dark-action hover:bg-dark-action-hover"
      (click)="onCreateClicked()"
      i18n>
        New Campaign
    </button>
  </div>
  <div class="flex grow">
    <ul class="grow">
      <li class="p-2 odd:bg-dark-action-light hover:bg-dark-action-hover" *ngFor="let campaign of campaigns | async">
        <div class="flex">
          <a
            class="grow block text-lg"
            [routerLink]="['/campaign/', campaign.id]" 
            [state]="campaign">
              {{campaign.name}}
          </a>
          <div>
            <button
              class="p-2 rounded-lg text-white bg-dark-action hover:bg-dark-accent-red"
              [attr.data-campaign_id]="campaign.id" (click)="onDeleteClicked($event)"
              title="Delete Campaign">
                Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
  `
})
export class CampaignListComponent implements OnInit {
  campaigns: Observable<Campaign[]> = of([]);

  constructor(private store: StoreService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.campaigns = this.store.getCampaigns().pipe(share());
  }

  onCreateClicked() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  onDeleteClicked($event: MouseEvent) {
    // @ts-ignore
    let id = $event.target?.dataset.campaign_id;
    this.campaigns = this.store.deleteCampaign(id).pipe(share());
  }
}