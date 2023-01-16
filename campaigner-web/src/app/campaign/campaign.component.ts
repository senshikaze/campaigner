import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Campaign } from '../interfaces/campaign';
import { Entry } from '../interfaces/entry';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  campaign: Campaign;

  constructor(private api: ApiService, private route: ActivatedRoute) { 
    this.campaign = {
      id: "",
      name: "",
      entries: []
    };
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params)
    );
  }

  onCreateClicked() {
    this.campaign.entries.push({id: null, title: "", text: ""} as Entry);
  }
}
