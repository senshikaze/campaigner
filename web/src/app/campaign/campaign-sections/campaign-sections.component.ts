import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/interfaces/campaign';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'campaign-sections',
  template: `
  <div class="overflow-y-scroll grid grid-flow-col grid-cols-12 grow">
    <div class="grow col-span-2 flex flex-col border-r-2 border-slate-700">
      <div class="flex border-b-2 border-slate-700">
          <div class="mb-2 flex flex-auto">
              <input
                  class="grow text-white p-2 m-2 rounded-md placeholder:text-slate-400 bg-dark-input-bg"
                  [(ngModel)]="campaign.name"
                  i18n-title title="Campaign Title" 
                  i18n-placeholder placeholder="Campaign Title"/>
          </div>
          <div class="mb-2 flex">
              <button
                  class="p-2 m-2 rounded-md text-white bg-dark-action hover:bg-dark-action-hover"
                  (click)="onSaveClicked(campaign)"
                  i18n i18n-title title="Save Campaign">
                  <img class="w-[28px] h-[28px]" src="assets/save-white.png" i18n-title title="Save Campaign" alt="Save Campaign"/>
              </button>
          </div>
      </div>
      <campaign-section-list class="grow" [campaign]="campaign" (section)="sectionSelected($event)"></campaign-section-list>
    </div>
    <campaign-entries class="col-span-10 col-start-3 flex flex-row" *ngIf="selectedSection" [section]="selectedSection"></campaign-entries>
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
