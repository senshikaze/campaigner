import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Campaign } from 'src/app/interfaces/campaign';
import { CampaignEntry } from 'src/app/interfaces/campaign-entry';
import { CampaignSection } from 'src/app/interfaces/campaign-section';

@Component({
  selector: 'campaign-entry-create-button',
  template: `
    <add-button (click)="onCreateClicked()" title="Add Entry"></add-button>
  `,
  styles: []
})
export class CreateEntryButtonComponent {
  @Input() section!: CampaignSection;
  @Output() entryCreated = new EventEmitter<CampaignEntry>();

  onCreateClicked(): void {
    this.entryCreated.emit({title: "", text: "", section_id: this.section.id} as CampaignEntry);
  }
}
