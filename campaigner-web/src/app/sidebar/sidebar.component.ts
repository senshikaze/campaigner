import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
<div class="flex flex-col h-full">
  <nav class="w-52 grow">
    <ul>
        <li class="text-white bg-dark-action hover:bg-dark-action-hover p-2"><a routerLink="campaign" routerLinkActive="bg-dark-action-active" class="block p-2">Campaign</a></li>
        <li class="text-white bg-dark-action hover:bg-dark-action-hover p-2"><a routerLink="battle" routerLinkActive="bg-dark-action-active" class="block p-2">Battle</a></li>
        <li class="text-white bg-dark-action hover:bg-dark-action-hover p-2"><a routerLink="almanac" routerLinkActive="bg-dark-action-active" class="block p-2">Almanac</a></li>
    </ul>
  </nav>
  <footer class="text-xs">&copy; 2023 Kaze Industries</footer>
</div>`
})
export class SidebarComponent {

}
