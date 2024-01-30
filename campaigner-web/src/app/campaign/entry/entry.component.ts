import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CampaignEntry } from '../../interfaces/campaign-entry';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styles: []
})
export class EntryComponent implements OnChanges {
  @Input() entry!: CampaignEntry;
  @Output() entryChange = new EventEmitter<CampaignEntry>();
  @Output() entryDelete = new EventEmitter<CampaignEntry>();

  editing: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.entryChange.emit(this.entry);
  }

  onDeleteClicked(): void {
    this.entryDelete.emit(this.entry);
  }

  onEditClicked(): void {
    this.editing = true;
  }

  onSaveClicked(): void {
    this.editing = false;
  }

}
