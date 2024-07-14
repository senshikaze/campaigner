import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntryButtonComponent } from './create-entry-button.component';
import { StoreService } from 'src/app/services/store.service';

describe('CreateButtonComponent', () => {
  let component: CreateEntryButtonComponent;
  let fixture: ComponentFixture<CreateEntryButtonComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['saveSection']);
    await TestBed.configureTestingModule({
      declarations: [ CreateEntryButtonComponent ],
      providers: [
        { provide: StoreService, useValue: storeSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEntryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
