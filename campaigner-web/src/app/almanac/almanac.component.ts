import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlmanacEntry } from '../interfaces/almanac-entry';
import { StoreService } from '../services/store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-almanac',
  template: `
    <div class="flex flex-col">
      <div class="flex flex-row">
        <input 
          class="grow m-2 p-2 text-white rounded-md placeholder:text-slate-700 bg-dark-input-bg"
          placeholder="Search..."
          [(ngModel)]="search">
        <button
          class="p-2 m-2 rounded-md text-white bg-dark-action hover:bg-dark-action-hover"
          (click)="onCreateClicked()"
          i18n i18n-title title="Add Entry">
          <img class="w-[28px] h-[28px]" src="assets/add-white.png" i18n-title title="Add Entry" alt="Add Entry"/>
        </button>
      </div>
      <div class="flex flex-row">
        <ul class="grow">
          <li class="p-2 odd:bg-dark-zebra-odd even:bg-dark-zebra-even" *ngFor="let entry of almanacEntries$ | async">
            <div class="flex flex-row">
              <p class="px-4 block align-middle text-lg">{{entry.name}}</p>
              <p class="px-4 block align-middle grow">{{entry.description | ellipsis:50}}</p>
              <p class="px-4 block align-middle">{{entry.type}}</p>
              <a
                class="p-2 m-2 rounded-md bg-dark-action hover:bg-dark-action-hover inline-block"
                [routerLink]="['/almanac/', entry.id]">
                <img class="w-[28px] h-[28px]" src="assets/open-white.png" i18n-title title="View Entry" alt="View Entry"/>
              </a>
              <button
                class="p-2 m-2 rounded-md text-white bg-dark-action hover:bg-dark-accent-red"
                (click)="onDeleteClicked(entry)"
                i18n i18n-title title="Delete Entry">
                <img class="w-[28px] h-[28px]" src="assets/delete-white.png" i18n-title title="Delete Entry" alt="Delete Entry"/>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: []
})
export class AlmanacComponent implements OnInit {
  search: string = '';

  almanacEntries$!: Observable<AlmanacEntry[]>;

  constructor(
    private store: StoreService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.almanacEntries$ = this.store.getAlmanacEntries();
  }

  onCreateClicked(): void {
    this.router.navigate(["new"], {relativeTo: this.route});
  }

  onDeleteClicked(entry: AlmanacEntry): void {
    this.almanacEntries$ = this.store.deleteAlmanacEntry(entry.id);
  }
}
