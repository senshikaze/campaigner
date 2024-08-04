import { Component } from '@angular/core';
import { Dialog } from 'src/app/interfaces/dialog';

export interface ConfirmDialogInterface {
  message: string,
  confirm: boolean,
  yes: () => void,
  no: () => void,
  ok: () => void,
  cancel: () => void,
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  template: `
    <div class="body grow p-2 flex-shrink-0">
      <p class="px-4 py-2">{{data.message}}</p>
    </div>
    <div class="actions flex-shrink-0 flex p-2">
      @if (data.confirm) {
      <span class="confirm grow flex justify-end">
        <button
          class="p-2 m-2 w-12 rounded-md text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover"
          (click)="data.yes()"
          i18n i18n-title title="Yes">Yes</button>
        <button
          class="p-2 m-2 w-12 rounded-md text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover"
          (click)="data.no()"
          i18n i18n-title title="No">No</button>
      </span>
      } @else {
        <span class="ok grow flex justify-end">
          <button
            class="p-2 m-2 rounded-md text-white bg-light-action hover:bg-light-action-hover dark:bg-dark-action dark:hover:bg-dark-action-hover"
            (click)="data.ok()"
            i18n i18n-title title="Ok">Ok</button>
        </span>
      }
    </div>
  `,
  styles: ``
})
export class ConfirmDialogComponent implements Dialog {
  data!: ConfirmDialogInterface;
}
