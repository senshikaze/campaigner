import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { CampaignEntry } from 'src/app/interfaces/campaign-entry';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'campaign-entries',
  template: `
  <div class="grow">
    <campaign-entry
      [section]="section"
      (entryDelete)="entryDeleted()"
      class="border-b-2 last:border-b-0 border-slate-400 dark:border-slate-700"
    ></campaign-entry>
  <div>
  `,
  styles: []
})
export class EntriesComponent implements OnInit, OnDestroy {
  @Input() section!: CampaignSection;

  entries$!: Observable<CampaignEntry[]>;

  destroy$ = new Subject<boolean>();

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.entries$ = this.store.getSectionEntries(this.section);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  entryCreated(entry: CampaignEntry): void {
    this.entries$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(e => this.entries$ = of([...e, ...[entry]]));
  }

  entryDeleted(): void {
    this.entries$ = this.store.getSectionEntries(this.section);
  }
}
