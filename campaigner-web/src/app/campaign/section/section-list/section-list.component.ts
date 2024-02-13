import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { Campaign } from 'src/app/interfaces/campaign';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'campaign-section-list',
  template: `
  <div class="flex flex-col border-r-2 border-slate-700 h-full">
    <div class="grow">
      <campaign-section *ngFor="let section of sections$| async" [section]="section" (selected)="sectionSelected($event)"></campaign-section>
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
    ).subscribe(s => this.sections$ = of([...s, ...[{name:'', campaign: this.campaign._id} as CampaignSection]]))
  }

  sectionSelected(section: CampaignSection): void {
    if (section._id) {
      this.section.emit(section);
    }
  }
}
