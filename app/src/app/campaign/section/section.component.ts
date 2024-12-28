import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, take, tap } from 'rxjs';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { ConfirmDialogComponent, ConfirmDialogInterface } from 'src/app/misc/dialogs/confirm-dialog/confirm-dialog.component';
import { ModalService } from 'src/app/services/modal.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'campaign-section',
  template: `
  <div class="flex flex-row w-full" (click)="clicked()">
    <cInput
      class="grow m-2"
      *ngIf="editing; else display"
      [(value)]="section.name"
      placeholder="Section Title"></cInput>
    <ng-template #display>
      <div class="grow dark:text-white p-2 m-2 cursor-pointer"
        (dblclick)="editing = !editing">
        {{section.name}}
      </div>
    </ng-template>
    <delete-button (click)="onDeleteClicked()" title="Delete Section"></delete-button>
  </div>
  `,
  styles: []
})
export class SectionComponent implements OnInit {
  @Input() section!: CampaignSection;
  @Input() index!: number;
  @Output() sectionChange = new EventEmitter<CampaignSection>();
  @Output() selected = new EventEmitter<CampaignSection>();
  @Output() deleteClicked = new EventEmitter<number>();

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
      tap(s => s?.id ? this.store.saveCampaignEntry({section_id: s.id, title: '', text: ''}) : undefined),
      take(1)
    ).subscribe(s => {this.section = s; this.selected.emit(this.section);});
  }

  clicked(): void {
    this.selected.emit(this.section);
  }

  onDeleteClicked() {
    if (this.section.id) {
      let data: ConfirmDialogInterface = {
        message: "Are you sure you want to delete this section?\nThis will delete all entries as well.",
        confirm: true,
        yes: () => this.store.deleteSection(this.section).pipe(
          take(1)
        ).subscribe(s => this.modal.close()),
        no: () => this.modal.close(),
        ok: () => this.modal.close(),
        cancel: () => this.modal.close(),
      };
      this.modal.open({
        header: "Are you sure?",
        component: ConfirmDialogComponent,
        data: data
      });
    }
    this.deleteClicked.emit(this.index);
  }
}
