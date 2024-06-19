import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'delete-button',
  standalone: true,
  imports: [],
  template:`
  <button
    class="p-2 m-2 rounded-lg text-white bg-dark-action hover:bg-dark-accent-red"
    (click)="click.emit(value)"
    [title]="title"
    i18n i18n-title>
    <img class="w-[28px] h-[28px]" src="assets/delete-white.png" i18n-title [title]="title" [alt]="title"/>
  </button>
  `,
  styles: []
})
export class DeleteButtonComponent {
  @Input() value: any; 
  @Input() title = "Delete Button";
  @Output() click = new EventEmitter<any>();
}
