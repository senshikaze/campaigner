import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'save-button',
  standalone: true,
  imports: [],
  template: `
    <button
      class="p-2 m-2 rounded-md text-white bg-dark-action hover:bg-dark-action-hover"
      (click)="click.emit(value)"
      i18n i18n-title title="Save Campaign">
      <img class="w-[28px] h-[28px]" src="assets/save-white.png" i18n-title title="Save Campaign" alt="Save Campaign"/>
    </button>
  `,
  styles: ``
})
export class SaveButtonComponent {
  @Input() value: any;
  @Input() title = "Save";
  @Output() click = new EventEmitter<any>();
}
