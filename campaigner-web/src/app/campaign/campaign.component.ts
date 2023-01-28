import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, timer } from 'rxjs';
import { Location } from '@angular/common';

import { Campaign } from '../interfaces/campaign';
import { Entry } from '../interfaces/entry';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit, OnDestroy {
  campaign: Campaign;
  saveTimer: Subscription | null = null;

  constructor(private store: StoreService, private route: ActivatedRoute, private location: Location) { 
    this.campaign = {
      id: "",
      name: "",
      entries: []
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      if (p.has("id") && p.get("id") != "new") {
        this.store.getCampaign(p.get("id") as string).subscribe({
          next: c => this.campaign = c
        });
      }
    });

    // create a timer to save the campaign every 10 seconds
    // only save if the campaign has a name
    if (this.campaign.name) {
      this.saveTimer = timer(10000, 10000)
        .subscribe({next: 
          _ => this.store.saveCampaign(this.campaign)
        });
    }
  }

  ngOnDestroy(): void {
    if (this.saveTimer) {
      this.saveTimer.unsubscribe();
    }
  }

  onNameChanged(value: string): void {
    this.campaign.name = value;
    // save this campaign
    if (!this.campaign.id) {
      this.store.saveCampaign(this.campaign).subscribe({
        next: c => {
          this.campaign.id = c.id;
          this.route.parent?.url.subscribe(p => this.location.replaceState(`${p[p.length -1].path}/${c.id}`));
        }
      });
    }
  }

  onCreateClicked(): void {
    this.campaign.entries.push({id: null, title: "", text: ""} as Entry);
  }

  onSaveClicked(): void {
    this.store.saveCampaign(this.campaign);
  }
}
