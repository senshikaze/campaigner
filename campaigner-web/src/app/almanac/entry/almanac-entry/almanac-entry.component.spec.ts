import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmanacEntryComponent } from './almanac-entry.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('AlmanacEntryComponent', () => {
  let component: AlmanacEntryComponent;
  let fixture: ComponentFixture<AlmanacEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmanacEntryComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({id: 1})) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmanacEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
