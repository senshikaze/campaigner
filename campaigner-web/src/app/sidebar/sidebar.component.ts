import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
  <div class="w-48">
    <ul class="text-white">
        <li class="bg-slate-500 hover:bg-slate-400 my-1"><a routerLink="campaign" class="block p-2">Campaign</a></li>
        <li class="bg-slate-500 hover:bg-slate-400 my-1"><a routerLink="battle" class="block p-2">Battle</a></li>
        <li class="bg-slate-500 hover:bg-slate-400 my-1"><a routerLink="almanac" class="block p-2">Almanac</a></li>
    </ul>
</div>`
})
export class SidebarComponent {

}
