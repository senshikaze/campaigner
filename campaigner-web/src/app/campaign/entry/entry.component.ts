import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CampaignEntry } from '../../interfaces/campaign-entry';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'campaign-entry',
  templateUrl: './entry.component.html',
  styles: []
})
export class EntryComponent {
  @Input() entry!: CampaignEntry;
  @Output() entryDelete = new EventEmitter<CampaignEntry>();

  editing: boolean = false;

  constructor(private store: StoreService) {}

  onDeleteClicked(): void {
    this.store.deleteCampaignEntry(this.entry);
    this.entryDelete.emit(this.entry);
  }

  onEditClicked(): void {
    this.editing = true;
  }

  onSaveClicked(): void {
    this.editing = false;
    this.store.saveCampaignEntry(this.entry)
  }
}
