import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cInput',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true}
  ],
  template: `
    <input 
      class="dark:text-white p-2 m-2 rounded-md placeholder:text-slate-600 dark:placeholder:text-slate-400 bg-light-input-bg dark:bg-dark-input-bg"
      [(ngModel)]="value"
      (input)="onInput(value)"
      [type]="inputType"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [ngClass]="{'border-2 border-light-accent-red dark:border-dark-accent-red': invalid}"
      [class]="styleClass"
      (blur)="(value) ? blur.emit(true): undefined">
    <span *ngIf="showClear"></span>
  `,
  styles: [

  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() value!: any;
  @Input() inputType = "text";
  @Input() placeholder = "";
  @Input() display = true;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() showClear = false;
  @Input() styleClass = "";
  @Output() valueChange = new EventEmitter<any>();
  @Output() dirty = new EventEmitter<boolean>(false);
  @Output() blur = new EventEmitter<boolean>(false);

  onChange = (value: any) => {};
  onTouch = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  onInput(value: any): void {
    if (!this.disabled) {
      this.onTouch();
      this.onChange(value);
      this.valueChange.emit(value);
      this.dirty.emit(true);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
