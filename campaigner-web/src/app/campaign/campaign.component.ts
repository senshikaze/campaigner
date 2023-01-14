import { Component } from '@angular/core';
import { Entry } from '../interfaces/entry';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent {
  entries$: Entry[] = [];

  onCreateClicked() {
    console.log("hola");
    this.entries$.push({text: ""} as Entry);
  }
}
