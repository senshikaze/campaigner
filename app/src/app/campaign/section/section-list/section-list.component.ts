import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of, take, takeUntil } from 'rxjs';
import { Campaign } from 'src/app/interfaces/campaign';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'campaign-section-list',
  template: `
  <div class="grow flex flex-col w-full max-h-full">
    <div class="grow w-full overflow-auto min-h-0">
      <campaign-section
        class="w-full"
        *ngFor="let section of sections$| async"
        [section]="section"
        (selected)="sectionSelected($event)"
        [ngClass]="{'bg-light-bg-selected dark:bg-dark-input-bg-selected': selected?.id == section.id}"
        (deleteClicked)="sectionDeleted()"
      ></campaign-section>
    </div>
    <div class="grow-0 flex flex-row">
      <campaign-section-create-button
        *ngIf="campaign.id"
        [campaign]="campaign"
        (newSectionEvent)="addNewSection()"
      ></campaign-section-create-button>
    </div>
  </div>
  `,
  styles: []
})
export class SectionListComponent implements OnInit, OnDestroy {
  @Input() campaign!: Campaign;
  @Output() section = new EventEmitter<CampaignSection>();
  sections$ = new BehaviorSubject<CampaignSection[]>([]);

  selected: CampaignSection | undefined;

  destroy$ = new Subject<boolean>();

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store.getSections(this.campaign).pipe(
      map(sections => this.sections$.next(sections)),
      take(1)
    ).subscribe();
  }

  sectionDeleted() {
    this.store.getSections(this.campaign).pipe(
      map(sections => this.sections$.next(sections)),
      take(1)
    ).subscribe();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addNewSection() {
    let sections = this.sections$.value;
    sections = [...sections, ...[{campaign_id: this.campaign.id, name: ""} as CampaignSection]];
    this.sections$.next(sections);
  }

  sectionSelected(section: CampaignSection): void {
    if (section.id) {
      this.section.emit(section);
      this.selected = section;
    }
  }
}
