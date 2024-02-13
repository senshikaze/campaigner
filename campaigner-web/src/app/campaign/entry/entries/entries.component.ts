import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { CampaignEntry } from 'src/app/interfaces/campaign-entry';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'campaign-entries',
  template: `
  <div class="grow">
    <div class="flex flex-row">
      <span class="grow"></span>
      <campaign-entry-create-button [section]="section" (entryCreated)="entryCreated($event)"></campaign-entry-create-button>
    </div>
    <campaign-entry *ngFor="let entry of entries$ | async" [entry]="entry" (entryDelete)="entryDeleted()"></campaign-entry>
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
