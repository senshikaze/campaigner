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
      <cInput
        class="grow"
        [(value)]="entry.title"
        title="Entry Title"
        placeholder="Entry Title"></cInput>
        <save-button (click)="onSaveClicked()" title="Save Entry"></save-button>
        <delete-button (click)="onDeleteClicked()" title="Delete Entry"></delete-button>
    </div>
    <div class="min-h-[15rem] m-2">
        <textbox styleClass="min-h-96" [(text)]="entry.text"></textbox>
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
