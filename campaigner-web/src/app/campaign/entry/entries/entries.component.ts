import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CampaignEntry } from 'src/app/interfaces/campaign-entry';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-entries',
  template: `
  <div>
    <div class="flex flex-row">
      <span class="grow"></span>
      <app-create-entry-button [section]="section"></app-create-entry-button>
    </div>
    <app-entry *ngFor="let entry of entries$ | async" [entry]="entry"></app-entry>
  <div>
  `,
  styles: []
})
export class EntriesComponent implements OnInit {
  @Input() section!: CampaignSection;

  entries$!: Observable<CampaignEntry[]>;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.entries$ = this.store.getSectionEntries(this.section);
  }
}
