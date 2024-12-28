import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CampaignEntry } from '../../interfaces/campaign-entry';
import { StoreService } from 'src/app/services/store.service';
import { debounceTime, map, Subject, take, takeUntil, tap } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { ConfirmDialogComponent, ConfirmDialogInterface } from 'src/app/misc/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'campaign-entry',
  template:`
  <div class="grow flex flex-col h-screen overflow-hidden bg-light-input-bg text-black dark:text-white dark:bg-dark-input-bg rounded-md">
    <div class="flex">
      <cInput
        class="grow m-2"
        styleClass="w-1/3 border-b-2"
        [value]="entry.title"
        (valueChange)="title$.next($event)"
        title="Entry Title"
        placeholder="Entry Title"></cInput>
    </div>
    <textbox
      class="grow m-2 flex min-h-30 overflow-auto"
      styleClass="grow min-h-full"
      [text]="entry.text"
      (textChange)="text$.next($event)"
    ></textbox>
  </div>
`,
  styles: []
})
export class EntryComponent implements OnInit, OnDestroy {
  @Input() entry!: CampaignEntry;
  @Output() entryDelete = new EventEmitter<CampaignEntry>();

  editing: boolean = false;

  title$ = new Subject<string>();
  text$ = new Subject<string>();

  destroy$ = new Subject<void>();

  constructor(
    private store: StoreService,
    private modal: ModalService
  ) {}
  
  ngOnInit(): void {
    this.title$.next(this.entry.title);
    this.text$.next(this.entry.text);

    this.title$.pipe(
      debounceTime(450),
      map(title => this.entry.title = title),
      tap(_ => this.store.saveCampaignEntry(this.entry)),
      takeUntil(this.destroy$)
    ).subscribe();

    this.text$.pipe(
      debounceTime(450),
      map(text => this.entry.text = text),
      tap(_ => this.store.saveCampaignEntry(this.entry)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteClicked(): void {
    if (this.entry.id) {
      let data: ConfirmDialogInterface = {
        message: "Are you sure you want to delete this entry?",
        confirm: true,
        yes: () => this.store.deleteCampaignEntry(this.entry).pipe(
          take(1)
        ).subscribe(s => this.modal.close()),
        no: () => this.modal.close(),
        ok: () => this.modal.close(),
        cancel: () => this.modal.close(),
      };
      this.modal.open({
        header: "Are you sure?",
        closable: true,
        component: ConfirmDialogComponent,
        data: data
      });
    }
  }

  onEditClicked(): void {
    this.editing = true;
  }

  onSaveClicked(): void {
    this.editing = false;
    this.store.saveCampaignEntry(this.entry).pipe(
      take(1)
    ).subscribe(e => this.entry = e);
  }
}
