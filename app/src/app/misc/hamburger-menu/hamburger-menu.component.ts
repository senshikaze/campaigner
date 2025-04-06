import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'src/app/interfaces/menu-item';

@Component({
  selector: 'hamburger-menu',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
  <div>
    <button 
      class="px-3 py-1 m-2 rounded-lg text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover"
      [title]="title" (click)="hidden = !hidden">
    ...
    </button>
    @if (!hidden) {
      <ul class="static">
        @for (item of items; track item) {
          <li [title]="title">
            @if (item.link !== undefined) {
              <a [routerLink]="item.link">{{item.text}}</a>
            } @else if (item.action !== undefined) {
              <button (click)="item.action()">{{item.text}}</button>
            } @else {
              <span>{{item.text}}</span>
            }
          </li>
        }
      </ul>
    }
  </div>
  `,
  styles: ``
})
export class HamburgerMenuComponent {
  @Input() title = "Options...";
  @Input() items: MenuItem[] = [];

  hidden = true;


}
