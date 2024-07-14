import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface Modal {
  header?: string;
  message: string;
  closable?: boolean;
  confirm?: boolean;
  close?: () => void;
  yes?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  openModal = new ReplaySubject<Modal>();

  constructor() { }

  open(modal: Modal): void {
    this.openModal.next(modal);
  }
}
