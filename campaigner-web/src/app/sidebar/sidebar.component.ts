import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
<div class="flex flex-col h-full">
  <nav class="w-52 grow">
    <ul>
        <li class="text-white bg-dark-action hover:bg-dark-action-hover">
          <a routerLink="campaign" routerLinkActive="bg-dark-action-active" class="block p-2" i18n>Campaigns</a>
        </li>
        <li class="text-white bg-dark-action hover:bg-dark-action-hover">
          <a routerLink="battle" routerLinkActive="bg-dark-action-active" class="block p-2" i18n>Battle</a>
        </li>
        <li class="text-white bg-dark-action hover:bg-dark-action-hover">
          <a routerLink="almanac" routerLinkActive="bg-dark-action-active" class="block p-2" i18n>Almanac</a>
        </li>
    </ul>
  </nav>
  <footer class="text-xs">&copy; 2023 Kaze Industries</footer>
</div>`
})
export class SidebarComponent {

}
