import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, debounceTime, distinct, distinctUntilChanged, filter, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { ConfirmDialogComponent, ConfirmDialogInterface } from 'src/app/misc/dialogs/confirm-dialog/confirm-dialog.component';
import { ModalService } from 'src/app/services/modal.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'campaign-section',
  template: `
  <div class="flex flex-row w-full" (click)="clicked()">
    <cInput
      class="grow m-2"
      [value]="section.name"
      (valueChange)="title$.next($event)"
      placeholder="Section Title"
      title="Section Title"></cInput>
    @if(section.id) {
    <delete-button (click)="onDeleteClicked()" title="Delete Section"></delete-button>
    }
  </div>
  `,
  styles: []
})
export class SectionComponent implements OnInit, OnDestroy {
  @Input() section!: CampaignSection;
  @Input() index!: number;
  @Output() sectionChange = new EventEmitter<CampaignSection>();
  @Output() selected = new EventEmitter<CampaignSection>();
  @Output() deleteClicked = new EventEmitter<number>();

  title$ = new BehaviorSubject<string>('');

  destroy$ = new Subject<void>();

  constructor(
    private store: StoreService,
    private modal: ModalService
  ) {}
  
  ngOnInit(): void {
    if (this.section.id) {
      this.title$.next(this.section.name);
    }
    this.title$.pipe(
      debounceTime(450),
      distinctUntilChanged(),
      filter(title => title != ""),
      switchMap(title => {
        this.section.name = title;
        return this.store.saveSection(this.section);
      }),
      takeUntil(this.destroy$)
    ).subscribe(s => this.section = s);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clicked(): void {
    this.selected.emit(this.section);
  }

  onDeleteClicked() {
    if (this.section.id) {
      let data: ConfirmDialogInterface = {
        message: "Are you sure you want to delete this section?\nThis will delete all entries as well.",
        confirm: true,
        yes: () => this.store.deleteSection(this.section).pipe(
          tap(_ => this.deleteClicked.emit(this.index)),
          take(1)
        ).subscribe(s => this.modal.close()),
        no: () => this.modal.close(),
        ok: () => this.modal.close(),
        cancel: () => this.modal.close(),
      };
      this.modal.open({
        header: "Are you sure?",
        component: ConfirmDialogComponent,
        data: data
      });
    }
  }
}
