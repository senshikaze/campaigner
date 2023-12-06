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
      i18n i18n-title title="Add Campaign">
      <img class="w-[28px] h-[28px]" src="assets/add-white.png" i18n-title title="Add Campaign" alt="Add Campaign"/>
    </button>
  </div>
  <div class="flex grow">
    <ul class="grow">
      <li class="p-2 odd:bg-dark-zebra-odd even:bg-dark-zebra-even" *ngFor="let campaign of campaigns | async">
        <div class="flex">
          <p class="grow block text-lg">{{campaign.name}}</p>
          <a
            class="p-2 m-2 rounded-md bg-dark-action hover:bg-dark-action-hover inline-block"
            [routerLink]="['/campaign/', campaign.id]"
            [state]="campaign">
            <img class="w-[28px] h-[28px]" src="assets/open-white.png" i18n-title title="View Campaign" alt="View Campaign"/>
          </a>
          <button
            class="p-2 m-2 rounded-lg text-white bg-dark-action hover:bg-dark-accent-red"
            [attr.data-campaign_id]="campaign.id" (click)="onDeleteClicked($event)"
            title="Delete Campaign"
            i18n i18n-title title="Delete Campaign">
            <img class="w-[28px] h-[28px]" src="assets/delete-white.png" i18n-title title="Delete Campaign" alt="Delete Campaign"/>
          </button>
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
    let target = $event.target as HTMLElement;
    if (target.dataset['campaign_id']) {
      this.campaigns = this.store.deleteCampaign(target.dataset['campaign_id']);
    }
  }
}
