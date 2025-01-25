import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CampaignEntry } from '../../interfaces/campaign-entry';
import { StoreService } from 'src/app/services/store.service';
import { debounceTime, distinctUntilChanged, map, Subject, take, takeUntil, tap } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { ConfirmDialogComponent, ConfirmDialogInterface } from 'src/app/misc/dialogs/confirm-dialog/confirm-dialog.component';
import { CampaignSection } from 'src/app/interfaces/campaign-section';

@Component({
  selector: 'campaign-entry',
  template:`
  <div class="grow flex flex-col h-screen overflow-hidden bg-light-input-bg text-black dark:text-white dark:bg-dark-input-bg rounded-md">
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
export class EntryComponent implements OnInit, OnChanges, OnDestroy {
  @Input() section!: CampaignSection;
  @Output() entryDelete = new EventEmitter<CampaignEntry>();

  entry: CampaignEntry = {text: ""} as CampaignEntry;

  editing: boolean = false;

  text$ = new Subject<string>();

  destroy$ = new Subject<void>();

  constructor(
    private store: StoreService,
    private modal: ModalService
  ) {}
  
  ngOnInit(): void {
    if (this.section && this.section.id) {
      this.store.getSectionEntries(this.section).pipe(
        map(e => e[0]),
        take(1)
      ).subscribe(e => {
        if (e) {
          this.entry = e;
          this.text$.next(e.text);
        } else {
          this.entry.section_id = this.section.id!;
        }
      });
    }

    this.text$.pipe(
      debounceTime(450),
      distinctUntilChanged(),
      map(text => this.entry.text = text),
      tap(_ => this.store.saveCampaignEntry(this.entry)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["section"]) {
      this.section = changes["section"].currentValue;
      this.entry = {text: ""} as CampaignEntry;
      if (this.section && this.section.id) {
        this.store.getSectionEntries(this.section).pipe(
          map(e => e[0]),
          take(1)
        ).subscribe(e => {
          if (e) {
            this.entry = e;
            this.text$.next(e.text);
          } else {
            this.entry.section_id = this.section.id!;
          }
        });
      }
    }
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
}
