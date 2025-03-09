import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import { liveQuery } from 'dexie';
import { catchError, from, map, take } from 'rxjs';

@Component({
  selector: 'sidebar',
  template: `
<div class="flex flex-col h-full w-11" [ngClass]="{'sm:w-fit': expanded}">
  <nav class="w-48 grow flex flex-col">
    <ul class="grow">
        <li>
          <a
          class="flex -p-2 text-slate-200 dark:text-white bg-light-menu hover:bg-light-menu-hover dark:bg-dark-menu dark:hover:bg-dark-menu-hover"
            routerLink="campaign"
            routerLinkActive="bg-light-menu-active hover:bg-light-menu-hover dark:bg-dark-menu-active dark:hover:bg-dark-menu-hover"
            class="flex p-2"
            i18n i18n-title title="Campaigns">
            <svg fill="#000000" viewBox="0 0 24 24" id="pennant-15" data-name="Flat Color" class="size-6">
              <path id="secondary" d="M17,8a1,1,0,0,1-.62-.22L12,4.28,7.62,7.78A1,1,0,1,1,6.38,6.22l5-4a1,1,0,0,1,1.24,0l5,4a1,1,0,0,1,.16,1.4A1,1,0,0,1,17,8Z" style="fill: rgba(255, 255, 255);"></path>
              <path id="primary" d="M18,6H6A1,1,0,0,0,5,7V17.5a2,2,0,0,0,1.11,1.79l5,2.5a2,2,0,0,0,1.78,0l5-2.5A2,2,0,0,0,19,17.5V7A1,1,0,0,0,18,6Z" style="fill: rgb(255, 255, 255);"></path>
              <path id="secondary-2" data-name="secondary" d="M19,8H5A1,1,0,0,1,5,6H19a1,1,0,0,1,0,2Zm-3,7a1,1,0,0,0-1-1H9a1,1,0,0,0,0,2h6A1,1,0,0,0,16,15Zm0-4a1,1,0,0,0-1-1H9a1,1,0,0,0,0,2h6A1,1,0,0,0,16,11Z" style="fill: rgba(255, 255, 255,0);"></path>
            </svg>
            <span class="hidden" [ngClass]="{'sm:inline':expanded}">Campaigns</span>
          </a>
        </li>
        <li>
          <a
            class="flex p-2 text-slate-200 dark:text-white bg-light-menu hover:bg-light-menu-hover dark:bg-dark-menu dark:hover:bg-dark-menu-hover"
            routerLink="players"
            routerLinkActive="bg-light-menu-active hover:bg-light-menu-hover dark:bg-dark-menu-active dark:hover:bg-dark-menu-hover"
            i18n i18n-title title="Players">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
            </svg>
            <span class="hidden" [ngClass]="{'sm:inline':expanded}">Players</span>
          </a>
        </li>
        <li>
          <a
            class="flex p-2 text-slate-200 dark:text-white bg-light-menu hover:bg-light-menu-hover dark:bg-dark-menu dark:hover:bg-dark-menu-hover"
            routerLink="battles"
            routerLinkActive="bg-light-menu-active hover:bg-light-menu-hover dark:bg-dark-menu-active dark:hover:bg-dark-menu-hover"
            i18n i18n-title title="Battles">
            <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="size-6">
              <g>
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path fill-rule="nonzero" d="M7.05 13.406l3.534 3.536-1.413 1.414 1.415 1.415-1.414 1.414-2.475-2.475-2.829 2.829-1.414-1.414 2.829-2.83-2.475-2.474 1.414-1.414 1.414 1.413 1.413-1.414zM3 3l3.546.003 11.817 11.818 1.415-1.414 1.414 1.414-2.474 2.475 2.828 2.829-1.414 1.414-2.829-2.829-2.475 2.475-1.414-1.414 1.414-1.415L3.003 6.531 3 3zm14.457 0L21 3.003l.002 3.523-4.053 4.052-3.536-3.535L17.457 3z"/>
              </g>
            </svg>
            <span class="hidden" [ngClass]="{'sm:inline':expanded}">Battles</span>
          </a>
        </li>
        <li>
          <a
            class="flex p-2 text-slate-200 dark:text-white bg-light-menu hover:bg-light-menu-hover dark:bg-dark-menu dark:hover:bg-dark-menu-hover"
            routerLink="almanac"
            routerLinkActive="bg-light-menu-active hover:bg-light-menu-hover dark:bg-dark-menu-active dark:hover:bg-dark-menu-hover"
            i18n i18n-title title="Almanac">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
            </svg>
            <span class="hidden" [ngClass]="{'sm:inline':expanded}">Almanac</span>
          </a>
        </li>
    </ul>
    <div class="hidden sm:flex sm:flex-row">
      <svg *ngIf="expanded" class="cursor-pointer" title="Close" (click)="onExpand(false)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
      </svg>
      <svg *ngIf="!expanded" class="cursor-pointer" title="Expand" (click)="onExpand(true)" vxmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
      </svg>
    </div>
  </nav>
  <footer class="text-xs whitespace-nowrap" title="&copy; 2024 Kaze Industries">&copy; 2024 Kaze Industries</footer>
</div>`
})
export class SidebarComponent implements OnInit {
  expanded = true;

  constructor(private db: DBService) {}

  ngOnInit(): void {
    from(liveQuery(
      () => this.db.stateTable.where({variable: 'sidebarExpanded'}).first()
    )).pipe(
      map(s => s?.id ? this.expanded = !!s.value : this.expanded = true),
      take(1)
    ).subscribe();
  }

  onExpand(expand: boolean): void {
    this.expanded = expand;
    from(liveQuery(
      () => this.db.stateTable.where({variable: "sidebarExpanded"}).first()
    )).pipe(
      map(s => this.db.stateTable.put({id: s?.id, variable: "sidebarExpanded", value: this.expanded}, s?.id)),
      take(1)
    ).subscribe();
  }
}
