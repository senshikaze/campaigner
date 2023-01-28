import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Entry } from '../../interfaces/entry';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnChanges {
  @Input() entry: Entry;
  @Output() entryChange = new EventEmitter<Entry>();

  editing: boolean = false;

  constructor() {
    this.entry = {
      title: "",
      text: ""
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.entryChange.emit(this.entry);
  }

  onEditClicked() {
    this.editing = true;
  }

  onSaveClicked() {
    this.editing = false;
  }

}
