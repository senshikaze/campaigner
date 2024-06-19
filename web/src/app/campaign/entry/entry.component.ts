import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CampaignEntry } from '../../interfaces/campaign-entry';
import { StoreService } from 'src/app/services/store.service';
import { take, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'campaign-entry',
  template:`
  <div class="flex flex-col">
    <div class="flex">
        <input
            class="grow m-2 p-2 text-white rounded-md placeholder:text-slate-400 bg-dark-input-bg"
            type="text"
            [(ngModel)]="entry.title"
            i18n-title title="Entry Title"
            i18n-placeholder placeholder="Entry Title" />
        <save-button (click)="onSaveClicked()" title="Save Entry"></save-button>
        <delete-button (click)="onDeleteClicked()" title="Delete Entry"></delete-button>
    </div>
    <div class="min-h-[15rem] m-2">
        <textbox [(text)]="entry.text"></textbox>
    </div>
  </div>
`,
  styles: []
})
export class EntryComponent {
  @Input() entry!: CampaignEntry;
  @Output() entryDelete = new EventEmitter<CampaignEntry>();

  editing: boolean = false;

  constructor(private store: StoreService, private modal: ModalService) {}

  onDeleteClicked(): void {
    if (this.entry.id) {
      this.modal.open({
        header: "Are you sure?",
        message: "Are you sure you want to delete this entry?",
        confirm: true,
        yes: () => this.store.deleteCampaignEntry(this.entry).pipe(
          take(1)
        ).subscribe(_ =>
          this.entryDelete.emit(this.entry)
        )
      });
    }
  }

  onEditClicked(): void {
    this.editing = true;
  }

  onSaveClicked(): void {
    this.editing = false;
    this.store.saveCampaignEntry(this.entry).pipe(
      take(1)
    ).subscribe(e => this.entry = e);
  }
}
