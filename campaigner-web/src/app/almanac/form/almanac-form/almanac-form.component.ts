import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlmanacType } from 'src/app/enums/almanac-type';
import { AlmanacEntry } from 'src/app/interfaces/almanac-entry';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-almanac-form',
  template: `
  <form [formGroup]="almanacForm" (ngSubmit)="onSave()">
    <div class="flex flex-col m-2">
      <input
        type="text"
        class="grow text-stone-900 m-2 p-2 rounded-md placeholder:text-slate-700 bg-dark-input-bg"
        formControlName="name"
        placeholder="Entry Name"
        i18n i18n-title title="Almanac Entry Name"
        [ngClass]="{'border-2 border-dark-accent-red': this.almanacForm.dirty && this.almanacForm.get('name')?.invalid}">
      <select
        class="grow text-stone-900 m-2 p-2 rounded-md placeholder:text-slate-700 bg-dark-input-bg"
        formControlName="type"
        i18n i18n-title title="Almanac Entry Type"
        [ngClass]="{'border-2 border-dark-accent-red': this.almanacForm.dirty && this.almanacForm.get('type')?.invalid}">
        <option *ngFor="let aType of almanacTypes">{{aType}}</option>
      </select>
      <textarea
        class="grow text-stone-900 m-2 p-2 rounded-md placeholder:text-slate-700 bg-dark-input-bg"
        placeholder="Entry Description"
        formControlName="description"
        i18n i18n-title title="Almanac Entry Description"
        [ngClass]="{'border-2 border-dark-accent-red': this.almanacForm.dirty && this.almanacForm.get('description')?.invalid}"></textarea>
      <p *ngIf="!this.almanacForm.valid">{{this.almanacForm.errors}}</p>
      <button
        type="submit"
        class="p-2 m-2 rounded-md bg-dark-action hover:bg-dark-action-hover inline-block cursor-pointer"
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
