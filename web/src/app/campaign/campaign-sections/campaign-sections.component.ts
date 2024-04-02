import { Component, Input } from '@angular/core';
import { Campaign } from 'src/app/interfaces/campaign';
import { CampaignSection } from 'src/app/interfaces/campaign-section';

@Component({
  selector: 'campaign-sections',
  template: `
  <div class="overflow-y-scroll grid grid-flow-col grid-cols-12 grow">
    <campaign-section-list class="col-span-2" [campaign]="campaign" (section)="sectionSelected($event)"></campaign-section-list>
    <campaign-entries class="col-span-10 col-start-3 flex flex-row" *ngIf="selectedSection" [section]="selectedSection"></campaign-entries>
  </div>
  `,
  styles: []
})
export class CampaignSectionsComponent {
  @Input() campaign!: Campaign;
  selectedSection!: CampaignSection;

  sectionSelected(section: CampaignSection): void {
    this.selectedSection = section;
  }
}
