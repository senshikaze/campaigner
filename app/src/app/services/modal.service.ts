import { Injectable, Type } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { DynamicDirective } from '../misc/directives/dynamic.directive';
import { Dialog } from '../interfaces/dialog';

export interface Modal {
  header?: string;
  closable?: boolean;
  confirm?: boolean;
  component: Type<Dialog>,
  data?: any,
  close?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  openModal = new ReplaySubject<Modal>();
  closeModal = new Subject<boolean>();

  constructor() { }

  open(modal: Modal): void {
    this.openModal.next(modal);
  }

  close(): void {
    this.closeModal.next(true);
  }

}
