import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'drag-item',
  standalone: true,
  imports: [],
  template: `
    <div class="p-2 m-2 rounded-md text-black dark:text-white cursor-move">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
      </svg>
    </div>
  `,
  styles: []
})
export class DragItemComponent {
  @Input() item: any;
  @Output() dragstart = new EventEmitter<any>();
}
