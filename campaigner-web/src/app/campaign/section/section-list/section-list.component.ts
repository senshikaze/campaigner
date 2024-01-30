import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Campaign } from 'src/app/interfaces/campaign';
import { CampaignSection } from 'src/app/interfaces/campaign-section';

@Component({
  selector: 'app-section-list',
  template: `
  <div class="flex flex-col border-r-2 border-slate-700 h-full">
    <div class="grow">
      <app-section *ngFor="let section of sections" [section]="section" (selected)="sectionSelected($event)"></app-section>
    </div>
    <div class="grow-0 flex flex-row">
      <app-create-section-button [campaign]="campaign" (newSectionEvent)="sections.push($event)"></app-create-section-button>
    </div>
  </div>
  `,
  styles: []
})
export class SectionListComponent {
  @Input() campaign!: Campaign;
  @Input() sections!: CampaignSection[];
  @Output() section = new EventEmitter<CampaignSection>();

  sectionSelected(section: CampaignSection): void {
    if (section._id) {
      this.section.emit(section);
    }
  }
}
