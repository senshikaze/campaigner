import { Component, EventEmitter, Input, Output } from '@angular/core';
import { take } from 'rxjs';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { ModalService } from 'src/app/services/modal.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-section',
  template: `
    <input class="grow text-white p-2 m-2 rounded-md placeholder:text-slate-400 bg-dark-input-bg"
      [(ngModel)]="section.name"
      (input)="change()"
      (click)="clicked()"
      placeholder="New Section"
    >
    <button
      *ngIf="section._id"
      class="p-2 m-2 rounded-md text-white bg-dark-action hover:bg-dark-accent-red"
      (click)="onDeleteClicked()"
      i18n i18n-title title="Delete Entry">
      <img class="w-[28px] h-[28px]" src="assets/delete-white.png" i18n-title title="Delete Entry" alt="Delete Entry"/>
    </button>
  `,
  styles: []
})
export class SectionComponent {
  @Input() section!: CampaignSection;
  @Output() sectionChange = new EventEmitter<CampaignSection>();

  @Output() selected = new EventEmitter<CampaignSection>();

  constructor(
    private store: StoreService,
    private modal: ModalService) {}

  change(): void {
    this.store.saveSection(this.section).pipe(
      take(1)
    ).subscribe(s => {this.section = s; this.selected.emit(this.section);});
  }

  clicked(): void {
    this.selected.emit(this.section);
  }

  onDeleteClicked() {
    if (this.section._id) {
      this.modal.open({
        header: "Are you sure?",
        message: "Are you sure you want to delete this section?\nThis will delete all entries as well.",
        yes: () => this.store.deleteSection(this.section)
      });
    }
  }
}
