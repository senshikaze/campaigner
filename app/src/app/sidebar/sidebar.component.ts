import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
<div class="flex flex-col h-full" [ngClass]="{'w-11': !expanded}">
  <nav class="w-48 grow flex flex-col">
    <ul class="grow">
        <li class="text-white bg-dark-action hover:bg-dark-action-hover">
          <a
            routerLink="campaign"
            routerLinkActive="bg-dark-action-active"
            class="flex p-2"
            i18n i18n-title title="Campaigns">
            <img class="w-[28px] h-[28px] mr-2" src="assets/person-white.png" />
            <span [class.hidden]="!expanded">Campaign</span>
          </a>
        </li>
        <li class="text-white bg-dark-action hover:bg-dark-action-hover">
          <a
            routerLink="battle"
            routerLinkActive="bg-dark-action-active"
            class="p-2 flex"
            i18n i18n-title title="Battles">
            <img class="w-[28px] h-[28px] mr-2" src="assets/sword-white.png" />
            <span [class.hidden]="!expanded">Battles</span>
          </a>
        </li>
        <li class="text-white bg-dark-action hover:bg-dark-action-hover">
          <a
            routerLink="almanac"
            routerLinkActive="bg-dark-action-active"
            class="flex p-2"
            i18n i18n-title title="Almanac">
            <img class="w-[28px] h-[28px] mr-2" src="assets/book-white.png" />
            <span [class.hidden]="!expanded">Almanac</span>
          </a>
        </li>
    </ul>
    <div class="flex row">
      <img class="cursor-pointer w-[28px] h-[28px]" src="assets/left-white.png" [class.rotate-180]="!expanded" [alt]="expanded ? 'Close' : 'Expand'" [title]="expanded ? 'Close' : 'Expand'" (click)="onExpand()" />
    </div>
  </nav>
  <footer class="text-xs whitespace-nowrap" title="&copy; 2024 Kaze Industries">&copy; 2024 Kaze Industries</footer>
</div>`
})
export class SidebarComponent {
  expanded = true;

  onExpand(): void {
    this.expanded = !this.expanded;
  }
}
