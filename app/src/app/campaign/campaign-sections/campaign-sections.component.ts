import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
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
              [value]="campaign.name"
              (valueChange)="title$.next($event)"
              title="Campaign Title"
              placeholder="Campaign Title"></cInput>
          </div>
      </div>
      <campaign-section-list
        class="grow flex overflow-hidden"
        [campaign]="campaign"
        (section)="sectionSelected($event)"
      ></campaign-section-list>
    </div>
    @if (selectedSection) {
    <campaign-entry
      class="grow flex flex-row"
      [section]="selectedSection"
    ></campaign-entry>
    }
  </div>
  `,
  styles: []
})
export class CampaignSectionsComponent implements OnInit, OnDestroy {
  @Input() campaign!: Campaign;
  selectedSection!: CampaignSection;

  title$ = new BehaviorSubject<string>('');

  destroy$ = new Subject<void>();

  constructor(
    private store: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.campaign.id) {
      this.title$.next(this.campaign.name);
    }
    this.title$.pipe(
      debounceTime(450),
      distinctUntilChanged(),
      filter(title => title != ""),
      switchMap(title => {
        this.campaign.name = title;
        return this.store.saveCampaign(this.campaign);
      }),
      takeUntil(this.destroy$)
    ).subscribe(c => this.campaign = c);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sectionSelected(section: CampaignSection): void {
    this.selectedSection = section;
  }
}
