import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent, ConfirmDialogInterface } from './confirm-dialog.component';
import { Modal } from 'src/app/services/modal.service';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    let data: ConfirmDialogInterface = {
      message: 'test',
      confirm: true,
      ok: () => undefined,
      cancel: () => undefined,
      no: () => undefined,
      yes: () => undefined,
    };
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
