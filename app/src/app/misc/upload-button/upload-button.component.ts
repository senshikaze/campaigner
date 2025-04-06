import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catchError, from, map, take } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'upload-button',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <button class="p-1" [ngClass]="styleclass" [title]="title" (click)="fileUpload.click()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
        <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
        <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
      </svg>
    </button>
    <input type="file" class="hidden" (change)="uploadFile($event)" [multiple]="file_limit > 1" #fileUpload>
  `,
  styles: ``
})
export class UploadButtonComponent {
  @Input() file_limit = 1;
  @Input() file_size_limit = 128 * 1024;
  @Input() file_filter = ""; //ex: image/png
  @Input() title = "";
  @Input() styleclass = "";
  @Output() upload = new EventEmitter<ArrayBuffer>();

  constructor(
    private toast: ToastService
  ) {}

  uploadFile(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element == null) {
      return;
    }
    const files: FileList | null = element.files;
    if (files) {
      let count = 0;
      while (count < this.file_limit) {
        let file = files.item(count) as File;
        if (file === null) {
          return;
        }
        if (file.size > this.file_size_limit) {
          this.toast.toast(`File is too large, it should be smaller than ${Math.round(this.file_size_limit) / 1024}KB`);
          return;
        }


        from(file.arrayBuffer()).pipe(
          catchError((err, caught) => {console.error(err); this.toast.toast("Error uploading file!"); throw err;}),
          map(blob => this.upload.emit(blob)),
          take(1),
        ).subscribe();

        count = count + 1;
      }
    }
  }

}
