import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, take } from 'rxjs';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { ModalService } from 'src/app/services/modal.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'campaign-section',
  template: `
  <div class="flex flex-row" (click)="clicked()">
    <input *ngIf="editing; else display" class="grow text-white p-2 m-2 rounded-md placeholder:text-slate-400 bg-dark-input-bg"
      [(ngModel)]="section.name"
      (input)="dirty = true"
      placeholder="New Section"
    >
    <ng-template #display>
      <div class="grow text-white p-2 m-2 cursor-pointer"
        (dblclick)="editing = !editing">
        {{section.name}}
      </div>
    </ng-template>
    <save-button (click)="onSaveClicked()" title="Save"></save-button>
    <delete-button (click)="onDeleteClicked()" title="Delete Section"></delete-button>
  </div>
  `,
  styles: []
})
export class SectionComponent implements OnInit {
  @Input() section!: CampaignSection;
  @Output() sectionChange = new EventEmitter<CampaignSection>();
  @Output() selected = new EventEmitter<CampaignSection>();

  editing = false;
  dirty = false;

  constructor(
    private store: StoreService,
    private modal: ModalService
  ) {}
  
  ngOnInit(): void {
    if (this.section && this.section.name == "") {
      this.editing = true;
    }
  }

  onSaveClicked(): void {
    this.store.saveSection(this.section).pipe(
      take(1)
    ).subscribe(s => {this.section = s; this.selected.emit(this.section);});
  }

  clicked(): void {
    this.selected.emit(this.section);
  }

  onDeleteClicked() {
    if (this.section.id) {
      this.modal.open({
        header: "Are you sure?",
        message: "Are you sure you want to delete this section?\nThis will delete all entries as well.",
        confirm: true,
        yes: () => this.store.deleteSection(this.section).pipe(
          take(1)
        ).subscribe()
      });
    }
  }
}
