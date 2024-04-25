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
    <button
      *ngIf="dirty"
      class="p-2 m-2 rounded-md text-white bg-dark-action hover:bg-dark-action-hover"
      (click)="save()"
      i18n i18n-title title="Save Section">
      <img class="w-[28px] h-[28px]" src="assets/save-white.png" i18n-title title="Save" alt="Save"/>
    </button>
    <button
      *ngIf="section.id"
      class="p-2 m-2 rounded-md text-white bg-dark-action hover:bg-dark-accent-red"
      (click)="onDeleteClicked()"
      i18n i18n-title title="Delete Section">
      <img class="w-[28px] h-[28px]" src="assets/delete-white.png" i18n-title title="Delete" alt="Delete"/>
    </button>
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

  save(): void {
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
