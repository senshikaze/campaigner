import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, map, Subject, takeUntil, tap } from 'rxjs';
import { ToastMessage, ToastService, ToastType } from 'src/app/services/toast.service';

@Component({
  selector: 'toast',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <div
        class="fixed top-4 right-4 z-50 flex flex-col gap-y-2">
    @for (message of messages; track $index) {
      <div
        class="border-2 p-3 rounded-md max-w-64"
        [ngClass]="{
          'bg-red-200 border-red-500': message.type == toastType.ERROR,
          'bg-slate-400 border-slate-600 dark:bg-slate-800 dark:border-slate-900': message.type == toastType.INFO,
          'opacity-75': $index > 2,
          'opacity-25': $index > 5,
          'opacity-0': $index > 8,
        }"
      >
          {{message.message}}
      </div>
    }
  </div>
  `,
  styles: ``
})
export class ToastComponent implements OnInit, OnDestroy {
  messages: ToastMessage[] = [];
  delay = 4500;

  destroy$ = new Subject<void>();

  toastType = ToastType;

  constructor(
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.toast.subscribe().pipe(
      map(message => this.messages.push(message)),
      delay(this.delay),
      tap((_: any) => this.messages.shift()),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
