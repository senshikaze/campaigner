import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPickerComponent } from './health-picker.component';

describe('HealthPickerComponent', () => {
  let component: HealthPickerComponent;
  let fixture: ComponentFixture<HealthPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HealthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
