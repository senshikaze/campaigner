import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum ToastType {
  INFO,
  ERROR,
}

export interface ToastMessage {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  messages$ = new Subject<ToastMessage>();

  constructor() { }

  toast(message: string): void {
    this.messages$.next({message: message, type: ToastType.INFO});
  }

  error(message: string): void {
    this.messages$.next({message: message, type: ToastType.ERROR});
  }

  subscribe(): Observable<ToastMessage> {
    return this.messages$.asObservable();
  }
}
