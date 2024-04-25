import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { Campaign } from 'src/app/interfaces/campaign';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'campaign-section-list',
  template: `
  <div class="flex flex-col h-full">
    <div class="grow">
      <campaign-section
        class="border-b-dark-input-bg border-b-2 last:border-b-0"
        *ngFor="let section of sections$| async"
        [section]="section"
        (selected)="sectionSelected($event)"
        [ngClass]="{'bg-dark-input-bg-selected': selected?.id == section.id}"
        if></campaign-section>
    </div>
    <div class="grow-0 flex flex-row">
      <campaign-section-create-button [campaign]="campaign" (newSectionEvent)="addNewSection()"></campaign-section-create-button>
    </div>
  </div>
  `,
  styles: []
})
export class SectionListComponent implements OnInit, OnDestroy {
  @Input() campaign!: Campaign;
  @Output() section = new EventEmitter<CampaignSection>();
  sections$!: Observable<CampaignSection[]>;

  selected: CampaignSection | undefined;

  destroy$ = new Subject<boolean>();

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.sections$ = this.store.getSections(this.campaign);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addNewSection() {
    this.sections$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(s => this.sections$ = of([...s, ...[{name:'', campaign_id: this.campaign.id} as CampaignSection]]))
  }

  sectionSelected(section: CampaignSection): void {
    if (section.id) {
      this.section.emit(section);
      this.selected = section;
    }
  }
}
