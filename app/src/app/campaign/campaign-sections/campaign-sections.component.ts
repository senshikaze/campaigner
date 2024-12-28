import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/interfaces/campaign';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'campaign-sections',
  template: `
  <div class="grow flex flex-row h-screen">
    <div class="grow-0 flex flex-col h-full">
      <div class="flex">
          <div class="mb-2 flex flex-auto">
            <cInput
              class="grow m-2"
              styleClass="w-full"
              [(value)]="campaign.name"
              title="Campaign Title"
              placeholder="Campaign Title"></cInput>
          </div>
          <div class="mb-2 flex">
            <save-button (click)="onSaveClicked(campaign)" title="Save Campaign"></save-button>
          </div>
      </div>
      <campaign-section-list class="grow flex overflow-hidden" [campaign]="campaign" (section)="sectionSelected($event)"></campaign-section-list>
    </div>
    <campaign-entries class="grow flex flex-row" *ngIf="selectedSection" [section]="selectedSection"></campaign-entries>
  </div>
  `,
  styles: []
})
export class CampaignSectionsComponent {
  @Input() campaign!: Campaign;
  selectedSection!: CampaignSection;

  constructor(private store: StoreService, private router: Router) {}

  sectionSelected(section: CampaignSection): void {
    this.selectedSection = section;
  }

  onSaveClicked(campaign: Campaign): void {
    this.store.saveCampaign(campaign).subscribe(c =>{
      if (campaign.id != c.id) {
        this.router.navigate(["/campaigns", c.id]);
      }
      this.campaign = c
    });
  }
}
