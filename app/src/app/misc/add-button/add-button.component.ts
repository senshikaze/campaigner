import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'add-button',
  standalone: true,
  imports: [],
  template: `
    <button
      class="p-2 m-2 rounded-lg text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover"
      (click)="clicked.emit()"
      i18n i18n-title [title]="title">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 inline">
        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
      </svg>
      @if (text) {
        {{text}}
      }
      <span class="sr-only">{{title}}</span>
    </button>
  `,
  styles: ``
})
export class AddButtonComponent {
  @Input() title = "Add";
  @Input() text: string | undefined = undefined;
  @Output() clicked = new EventEmitter<void>();
}
