import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Campaign } from '../interfaces/campaign';
import { Entry } from '../interfaces/entry';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  campaign: Campaign;

  constructor(private store: StoreService, private route: ActivatedRoute) { 
    this.campaign = {
      id: "",
      name: "",
      entries: []
    };
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => {
        if (params.has("id") && params.get("id") != "new") {
          this.store.getCampaign(params.get("id") as string).subscribe({
            next: c => this.campaign = c
          });
        }
      })
    );
  }

  onCreateClicked() {
    this.campaign.entries.push({id: null, title: "", text: ""} as Entry);
  }
}
