import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Campaign } from 'src/app/interfaces/campaign';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'campaign-section-create-button',
  template: `
    <add-button (click)="onCreateClicked()" title="Add Section"></add-button>
  `,
  styles: []
})
export class CreateSectionButtonComponent {
  @Input() campaign!: Campaign;
  @Output() newSectionEvent = new EventEmitter<CampaignSection>()

  constructor(private store: StoreService) {}

  onCreateClicked(): void {
    if (this.campaign.id !== undefined) {
      this.newSectionEvent.emit({
        campaign_id: this.campaign.id,
        name: ""
      });
    }
  }
}
