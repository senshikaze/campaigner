import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'health-picker',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  template:`
  <div class="flex flex-col m-2 relative z-50">
    <button (click)="healthChange.emit(+amount);" title="Increase Health by 1" class="p-2 rounded-t-md bg-light-health-up-bg dark:bg-dark-health-up-bg dark:text-slate-300">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 block m-auto">
        <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clip-rule="evenodd" />
      </svg>
    </button>
    <input
      [(ngModel)]="amount"
      [min]="0"
      class="grow dark:text-white p-2 placeholder:text-slate-600 dark:placeholder:text-slate-400 bg-light-input-bg dark:bg-dark-input-bg w-20 text-center"
      title="Current Health"
      (change)="quickBar = false"
      (click)="showQuickbar($event)"
      (focus)="selectText($event)"
      >
    <button (click)="healthChange.emit(-amount)" title="Decrease Health by 1" class="p-2 rounded-b-md bg-light-health-down-bg dark:bg-dark-health-down-bg dark:text-slate-300">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 block m-auto">
        <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
  @if (quickBar) {
        <div class="fixed bg-slate-500 min-w-fit p-2" [style.top]="quickTop+'px'" [style.left]="quickLeft+'px'">
          <button (click)="amount = 1; quickBar = false" class="min-w-6 p-2 mx-2 text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover rounded-lg">1</button>
          <button (click)="amount = 5; quickBar = false" class="min-w-6 p-2 mx-2 text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover rounded-lg">5</button>
          <button (click)="amount = 10; quickBar = false" class="min-w-6 p-2 mx-2 text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover rounded-lg">10</button>
        </div>
      }
  `,
  styles: []
})
export class HealthPickerComponent {
  @Input() amount = 1;
  @Output() healthChange = new EventEmitter<number>();

  quickBar = false;
  quickTop = 0;
  quickLeft = 0;

  selectText(event: Event): void {
    (event.target as HTMLInputElement).select();
  }

  showQuickbar(event: Event): void {
    let rect = (event.target as HTMLElement).getClientRects()[0];
    this.quickTop = rect.top - 6;
    this.quickLeft = rect.right + 12;
    this.quickBar = true;
  }
}
