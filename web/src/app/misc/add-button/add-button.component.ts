import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'add-button',
  standalone: true,
  imports: [],
  template: `
    <button
      class="p-2 rounded-lg text-white bg-dark-action hover:bg-dark-action-hover"
      (click)="click.emit()"
      i18n i18n-title [title]="title">
      <img class="w-[28px] h-[28px]" src="assets/add-white.png" i18n-title [title]="title" [alt]="title"/>
    </button>
  `,
  styles: ``
})
export class AddButtonComponent {
  @Input() title = "Add";
  @Output() click = new EventEmitter<void>();
}
