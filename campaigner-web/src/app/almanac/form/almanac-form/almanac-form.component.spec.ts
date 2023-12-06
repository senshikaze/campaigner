import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmanacFormComponent } from './almanac-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AlmanacFormComponent', () => {
  let component: AlmanacFormComponent;
  let fixture: ComponentFixture<AlmanacFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmanacFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmanacFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
