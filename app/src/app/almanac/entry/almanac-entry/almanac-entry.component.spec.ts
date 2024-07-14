import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmanacEntryComponent } from './almanac-entry.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

describe('AlmanacEntryComponent', () => {
  let component: AlmanacEntryComponent;
  let fixture: ComponentFixture<AlmanacEntryComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getAlmanac']);
    await TestBed.configureTestingModule({
      declarations: [ AlmanacEntryComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({id: 1})) } },
        { provide: StoreService, useValue: storeSpy }
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
