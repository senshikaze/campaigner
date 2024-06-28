import { Component } from '@angular/core';

@Component({
  selector: 'sidebar',
  template: `
<div class="flex flex-col h-full w-11" [ngClass]="{'sm:w-fit': expanded}">
  <nav class="w-48 grow flex flex-col">
    <ul class="grow">
        <li class="text-white bg-dark-action hover:bg-dark-action-hover">
          <a
            routerLink="campaign"
            routerLinkActive="bg-dark-action-active"
            class="flex p-2"
            i18n i18n-title title="Campaigns">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
            </svg>
            <span class="hidden" [ngClass]="{'sm:inline':expanded}">Campaign</span>
          </a>
        </li>
        <li class="text-white bg-dark-action hover:bg-dark-action-hover">
          <a
            routerLink="battles"
            routerLinkActive="bg-dark-action-active"
            class="p-2 flex"
            i18n i18n-title title="Battles">
            <img class="w-[28px] h-[28px] mr-2" src="assets/sword-white.png" />
            <span class="hidden" [ngClass]="{'sm:inline':expanded}">Battles</span>
          </a>
        </li>
        <li class="text-white bg-dark-action hover:bg-dark-action-hover">
          <a
            routerLink="almanac"
            routerLinkActive="bg-dark-action-active"
            class="flex p-2"
            i18n i18n-title title="Almanac">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
            </svg>
            <span class="hidden" [ngClass]="{'sm:inline':expanded}">Almanac</span>
          </a>
        </li>
    </ul>
    <div class="hidden sm:flex sm:flex-row">
      <svg *ngIf="expanded" class="cursor-pointer" title="Close" (click)="expanded = false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
      </svg>
      <svg *ngIf="!expanded" class="cursor-pointer" title="Expand" (click)="expanded = true" vxmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
      </svg>
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
