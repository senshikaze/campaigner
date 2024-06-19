import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, share, Observable } from 'rxjs';
import { Campaign } from '../interfaces/campaign';
import { StoreService } from '../services/store.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'campaign-list',
  template:`
<div class="flex flex-col p-2">
  <div class="flex mb-4 grow">
    <span class="grow"></span>
    <add-button (click)="onCreateClicked()" title="Add Campaign"></add-button>
  </div>
  <div class="flex grow">
    <ul class="grow">
      <li class="p-2 odd:bg-dark-zebra-odd even:bg-dark-zebra-even" *ngFor="let campaign of campaigns | async">
        <div class="flex">
          <p class="grow block text-lg">{{campaign.name}}</p>
          <view-button [routerLink]="['/campaign/', campaign.id]" [state]="campaign"></view-button>
          <delete-button (click)="onDeleteClicked(campaign)" title="Delete Campaign"></delete-button>
        </div>
      </li>
    </ul>
  </div>
</div>
  `
})
export class CampaignListComponent implements OnInit {
  campaigns: Observable<Campaign[]> = of([]);

  constructor(
    private store: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: ModalService) {}

  ngOnInit(): void {
    this.campaigns = this.store.getCampaigns().pipe(share());
  }

  onCreateClicked() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  onDeleteClicked(campaign: Campaign) {
    if (campaign.id !== undefined) {
      this.modal.open({
        header: "Are you sure?",
        message: "Are you sure you want to delete this campaign?",
        confirm: true,
        closable: true,
        yes: () => {
          this.store.deleteCampaign(campaign);
          this.campaigns = this.store.getCampaigns();
        }
      })
    }
  }
}
