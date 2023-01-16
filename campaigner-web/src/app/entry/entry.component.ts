import { Component, Input, OnInit } from '@angular/core';
import { Entry } from '../interfaces/entry';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {
  @Input() entry: Entry;

  editing: boolean = false;

  constructor(private api: ApiService) {
    this.entry = {
      title: "",
      text: ""
    };
  }

  onEditClicked() {
    this.editing = true;
  }

  onSaveClicked() {
    this.editing = false;
  }

  onTitleChanged() {
    console.log(this.entry);
  }
}
