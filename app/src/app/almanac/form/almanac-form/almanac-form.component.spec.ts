import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmanacFormComponent } from './almanac-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { MockComponents } from 'ng-mocks';
import { InputComponent } from 'src/app/misc/input/input.component';

describe('AlmanacFormComponent', () => {
  let component: AlmanacFormComponent;
  let fixture: ComponentFixture<AlmanacFormComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['saveAlmanac']);
    await TestBed.configureTestingModule({
      declarations: [
        AlmanacFormComponent,
        MockComponents(InputComponent)
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: StoreService, useValue: storeSpy }
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
