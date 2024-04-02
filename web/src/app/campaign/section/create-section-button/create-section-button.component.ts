import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Campaign } from 'src/app/interfaces/campaign';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'campaign-section-create-button',
  template: `
    <button
      class="p-2 m-2 rounded-md text-white bg-dark-action hover:bg-dark-action-hover"
      (click)="onCreateClicked()"
      i18n i18n-title title="Add Section">
      <img class="w-[28px] h-[28px]" src="assets/add-white.png" i18n-title title="Add Section" alt="Add Section"/>
    </button>
  `,
  styles: []
})
export class CreateSectionButtonComponent {
  @Input() campaign!: Campaign;
  @Output() newSectionEvent = new EventEmitter<CampaignSection>()

  constructor(private store: StoreService) {}

  onCreateClicked(): void {
    if (this.campaign._id !== undefined) {
      this.newSectionEvent.emit({
        campaign: this.campaign._id,
        name: ""
      });
    }
  }
}
