import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlmanacType } from 'src/app/enums/almanac-type';
import { AlmanacEntry } from 'src/app/interfaces/almanac-entry';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'almanac-form',
  template: `
  <form [formGroup]="almanacForm" (ngSubmit)="onSave()">
    <div class="flex flex-col m-2">
      <cInput
        class="grow"
        formControlName="name"
        placeholder="Entry Name"
        title="Almanac Entry Name"
        [invalid]="this.almanacForm.dirty && (this.almanacForm.get('name')?.invalid ?? false)"></cInput>
      <select
        class="grow dark:text-stone-900 m-2 p-2 rounded-md dark:placeholder:text-slate-400 dark:bg-dark-input-bg"
        formControlName="type"
        i18n i18n-title title="Almanac Entry Type"
        [ngClass]="{'border-2 border-light-accent-red dark:border-dark-accent-red': this.almanacForm.dirty && this.almanacForm.get('type')?.invalid}">
        <option *ngFor="let aType of almanacTypes">{{aType}}</option>
      </select>
      <textarea
        class="grow dark:text-stone-900 m-2 p-2 rounded-md dark:placeholder:text-slate-400 dark:bg-dark-input-bg bg-light-input-bg"
        placeholder="Entry Description"
        formControlName="description"
        i18n i18n-title title="Almanac Entry Description"
        [ngClass]="{'border-2 border-light-accent-red dark:border-dark-accent-red': this.almanacForm.dirty && this.almanacForm.get('description')?.invalid}"></textarea>
      <p *ngIf="!this.almanacForm.valid">{{this.almanacForm.errors}}</p>
      <button
        type="submit"
        class="p-2 m-2 rounded-md bg-light-action dark:bg-dark-action hover:bg-light-action-hover dark:hover:bg-dark-action-hover inline-block cursor-pointer"
        i18n i18n-title title="Save Entry">
          Save
      </button>
    </div>
  `,
  styles: []
})
export class AlmanacFormComponent implements OnInit {
  @Input() entry!: AlmanacEntry;
  @Output() saveEvent = new EventEmitter<AlmanacEntry>();

  almanacTypes = Object.values(AlmanacType).filter(a => isNaN(Number(a)));

  almanacForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    type: [AlmanacType.LOCATION, [Validators.required]],
    description:['']
  });

  constructor(private store: StoreService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (this.entry) {
      this.almanacForm.get('name')?.setValue(this.entry.name);
      this.almanacForm.get('type')?.setValue(this.entry.type);
      this.almanacForm.get('description')?.setValue(this.entry.description);
    }
  }

  onSave(): void {
    if (this.almanacForm.valid) {
      // emit the entry
      this.entry.name = this.almanacForm.get('name')?.value || ''; // fucking typescript
      this.entry.type = this.almanacForm.get('type')?.value || AlmanacType.LOCATION;
      this.entry.description = this.almanacForm.get('description')?.value || '';

      this.saveEvent.emit(this.entry);
    }
  }
}
