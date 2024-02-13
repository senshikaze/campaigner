import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Campaign } from 'src/app/interfaces/campaign';
import { CampaignEntry } from 'src/app/interfaces/campaign-entry';
import { CampaignSection } from 'src/app/interfaces/campaign-section';

@Component({
  selector: 'campaign-entry-create-button',
  template: `
  <button
    class="p-2 m-2 rounded-md text-white bg-dark-action hover:bg-dark-action-hover"
    (click)="onCreateClicked()"
    i18n i18n-title title="Add Entry">
    <img class="w-[28px] h-[28px]" src="assets/add-white.png" i18n-title title="Add Entry" alt="Add Entry"/>
  </button>
  `,
  styles: []
})
export class CreateEntryButtonComponent {
  @Input() section!: CampaignSection;
  @Output() entryCreated = new EventEmitter<CampaignEntry>();

  onCreateClicked(): void {
    this.entryCreated.emit({title: "", text: "", section: this.section._id} as CampaignEntry);
  }
}
