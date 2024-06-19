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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
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
