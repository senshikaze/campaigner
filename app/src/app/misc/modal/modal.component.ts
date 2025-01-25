import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { CloseButtonComponent } from '../close-button/close-button.component';
import { DynamicDirective } from '../directives/dynamic.directive';
import { Dialog } from 'src/app/interfaces/dialog';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [
    CloseButtonComponent,
    DynamicDirective,
  ],
  template: `
    <div
      class="wrapper bg-slate-500/85 dark:bg-slate-700/85 h-screen w-screen z-50 absolute top-0 left-0 flex items-center justify-center py-2"
      [class.hidden]="!open"
      (click)="modalClose()">
      <div
        class="modal border-2 w-3/4 min-h-40 max-h-full rounded-md flex flex-col bg-light-bg dark:bg-dark-bg border-light-bg dark:border-dark-bg"
        (click)="$event.stopPropagation()">
        <div class="header border-b-2 border-slate-400 dark:border-slate-700 flex p-2 items-center">
          @if (modal && modal.header) {
          <h2 class="grow text-2xl font-bold px-4">{{modal.header}}</h2>
          }
          @if (modal && modal.closable) {
          <close-button  (click)="modalClose()" title="Close"></close-button>
          }
        </div>
        <div class="max-h-full min-h-0 overflow-auto">
          <ng-template dynamicDirective></ng-template>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicDirective, {static: true}) private dynamicHost!: DynamicDirective;
  modal!: Modal;
  open = false;

  serviceRef$!: Subscription;

  constructor(
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.serviceRef$ = this.modalService.openModal.subscribe(m => {
      this.modal = m;
      this.open = true;
      this.modalService.closeModal.subscribe(c => this.modalClose());
      this.loadComponent();
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

  loadComponent(): void {
    if (this.modal) {
      const viewRef = this.dynamicHost.viewContainerRef;
      viewRef.clear();

      const componentRef = viewRef.createComponent<Dialog>(this.modal.component);
      componentRef.instance.data = this.modal.data;
    }
  }

}
