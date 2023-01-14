import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
<nav class="w-48">
  <ul class="text-white">
      <li class="bg-slate-500 hover:bg-slate-400"><a routerLink="campaign" routerLinkActive="bg-slate-500" class="block p-2">Campaign</a></li>
      <li class="bg-slate-500 hover:bg-slate-400"><a routerLink="battle" routerLinkActive="bg-slate-500" class="block p-2">Battle</a></li>
      <li class="bg-slate-500 hover:bg-slate-400"><a routerLink="almanac" routerLinkActive="bg-slate-500" class="block p-2">Almanac</a></li>
  </ul>
</nav>`
})
export class SidebarComponent {

}
