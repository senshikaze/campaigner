import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
<nav class="w-48">
  <ul>
      <li class="text-white bg-dark-action hover:bg-dark-action-hover"><a routerLink="campaign" routerLinkActive="bg-dark-action-active" class="block p-2">Campaign</a></li>
      <li class="text-white bg-dark-action hover:bg-dark-action-hover"><a routerLink="battle" routerLinkActive="bg-dark-action-active" class="block p-2">Battle</a></li>
      <li class="text-white bg-dark-action hover:bg-dark-action-hover"><a routerLink="almanac" routerLinkActive="bg-dark-action-active" class="block p-2">Almanac</a></li>
  </ul>
</nav>`
})
export class SidebarComponent {

}
