import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlmanacComponent } from './almanac.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../services/store.service';

describe('AlmanacComponent', () => {
  let component: AlmanacComponent;
  let fixture: ComponentFixture<AlmanacComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getAlmanacEntries']);
    await TestBed.configureTestingModule({
      declarations: [ 
        AlmanacComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: StoreService, useValue: storeSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmanacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
