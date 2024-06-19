import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'view-button',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <a
      class="p-2 m-2 rounded-md bg-dark-action hover:bg-dark-action-hover inline-block"
      i18n-title [title]="title">
      <img class="w-[28px] h-[28px]" src="assets/open-white.png" i18n-title [title]="title" [alt]="title"/>
    </a>
  `,
  styles: ``
})
export class ViewButtonComponent {
  @Input() value: any;
  @Input() title = "View";
}
