import { Component } from '@angular/core';
import { Entry } from '../interfaces/entry';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent {
  entries$: Entry[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getEntries().subscribe({
      next: entries => this.entries$ = entries
    })
  }

  onCreateClicked() {
    this.entries$.push({id: null, title: "", text: ""} as Entry);
  }
}
