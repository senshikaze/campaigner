import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'close-button',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <button     
      class="p-2 m-2 rounded-md text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover"
      (click)="clicked.emit($event)"
      i18n i18n-title [title]="title">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
      <span class="sr-only">{{title}}</span>
    </button>
  `,
  styles: []
})
export class CloseButtonComponent {
  @Input() title = "Close";
  @Output() clicked = new EventEmitter<Event>();
}
