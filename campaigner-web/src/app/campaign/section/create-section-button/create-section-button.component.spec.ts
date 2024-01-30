import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSectionButtonComponent } from './create-section-button.component';
import { StoreService } from 'src/app/services/store.service';

describe('CreateSectionButtonComponent', () => {
  let component: CreateSectionButtonComponent;
  let fixture: ComponentFixture<CreateSectionButtonComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['saveSection']);
    await TestBed.configureTestingModule({
      declarations: [ CreateSectionButtonComponent ],
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
