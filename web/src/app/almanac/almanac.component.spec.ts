import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlmanacComponent } from './almanac.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../services/store.service';
import { MockComponents } from 'ng-mocks';
import { AddButtonComponent } from '../misc/add-button/add-button.component';

describe('AlmanacComponent', () => {
  let component: AlmanacComponent;
  let fixture: ComponentFixture<AlmanacComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getAlmanacEntries']);
    await TestBed.configureTestingModule({
      declarations: [ 
        AlmanacComponent,
        MockComponents(AddButtonComponent),
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
