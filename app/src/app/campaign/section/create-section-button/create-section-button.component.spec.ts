import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSectionButtonComponent } from './create-section-button.component';
import { StoreService } from 'src/app/services/store.service';
import { MockComponents } from 'ng-mocks';
import { AddButtonComponent } from 'src/app/misc/add-button/add-button.component';

describe('CreateSectionButtonComponent', () => {
  let component: CreateSectionButtonComponent;
  let fixture: ComponentFixture<CreateSectionButtonComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['saveSection']);
    await TestBed.configureTestingModule({
      declarations: [
        CreateSectionButtonComponent,
        MockComponents(AddButtonComponent)
      ],
      providers: [
        { provide: StoreService, useValue: storeSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSectionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
