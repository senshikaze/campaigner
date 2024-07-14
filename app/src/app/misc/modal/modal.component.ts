import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Modal, ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  template: `
    <div *ngIf="modal" class="wrapper bg-slate-700/75 h-screen w-screen z-50 absolute top-0 left-0 flex items-center justify-center" [class.hidden]="!open" (click)="modalClose()">
      <div class="modal border-2 bg-dark-bg border-dark-bg w-1/2 h-1/3 flex flex-col min-h-[13rem]" (click)="$event.stopPropagation()">
        <div class="header border-b-2 border-slate-700 flex p-2 items-center">
          <h2 class="grow text-2xl font-bold px-4" *ngIf="modal.header">{{modal.header}}</h2>
          <button
            *ngIf="modal.closable"
            class="p-2 m-2 rounded-md text-white bg-dark-action hover:bg-dark-action-hover"
            (click)="modalClose()"
            i18n i18n-title title="Close">
            <img class="w-[28px] h-[28px]" src="assets/close-white.png" i18n-title title="Close" alt="Close"/>
          </button>
        </div>
        <div class="body grow p-2 flex-shrink-0">
          <p class="px-4 py-2">{{modal.message}}</p>
        </div>
        <div class="actions flex p-2">
          <span *ngIf="modal.confirm; else ok" class="confirm grow flex justify-end">
            <button
              class="p-2 m-2 w-12 rounded-md text-white bg-dark-action hover:bg-dark-action-hover"
              (click)="onYesClicked()"
              i18n i18n-title title="Yes">Yes</button>
            <button
              class="p-2 m-2 w-12 rounded-md text-white bg-dark-action hover:bg-dark-action-hover"
              (click)="modalClose()"
              i18n i18n-title title="No">No</button>
          </span>
          <ng-template #ok>
            <span class="ok grow flex justify-end">
              <button
                class="p-2 m-2 rounded-md text-white bg-dark-action hover:bg-dark-action-hover"
                (click)="modalClose()"
                i18n i18n-title title="Ok">Ok</button>
            </span>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ModalComponent implements OnInit, OnDestroy {
  modal!: Modal;
  open = false;

  serviceRef$!: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.serviceRef$ = this.modalService.openModal.subscribe(m => {
      this.modal = m;
      this.open = true;
    })
  }

  ngOnDestroy(): void {
    if (this.serviceRef$) {
      this.serviceRef$.unsubscribe();
    }
  }

  modalClose() {
    this.open = false;
    if (this.modal.close) {
      this.modal.close();
    }
  }

  onYesClicked() {
    this.open = false;
    if (this.modal.yes) {
      this.modal.yes();
    }
  }
}
