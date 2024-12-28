import { Component, Input, OnInit } from '@angular/core';
import { Battle } from 'src/app/interfaces/battle';
import { InitiativeService } from '../services/initiative.service';
import { of } from 'rxjs';

@Component({
  selector: 'initiative-button',
  template:`
    @if (started$ | async) {
      <button
        class="p-2 m-2 rounded-md text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover"
        (click)="next()"
        i18n i18n-title title="Next">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
        </svg>
      </button>
      <close-button (clicked)="stop()" title="Stop Encounter"></close-button>
    } @else {
      <button
        class="p-2 m-2 rounded-md text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover"
        (click)="start()"
        i18n i18n-title title="Start">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
        </svg>
      </button>

    }
  `,
  styles: []
})
export class InitiativeButtonComponent implements OnInit {
  started$ = of(false);

  constructor(
    private initiative: InitiativeService
  ) {}

  ngOnInit(): void {
    this.started$ = this.initiative.isStarted();
  }

  next(): void {
    this.initiative.next();
  }

  start(): void {
    this.initiative.start();
  }

  stop(): void {
    this.initiative.stop();
  }
}
