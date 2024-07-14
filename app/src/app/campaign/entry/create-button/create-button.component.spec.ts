import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntryButtonComponent } from './create-entry-button.component';
import { StoreService } from 'src/app/services/store.service';
import { MockComponents } from 'ng-mocks';
import { AddButtonComponent } from 'src/app/misc/add-button/add-button.component';

describe('CreateButtonComponent', () => {
  let component: CreateEntryButtonComponent;
  let fixture: ComponentFixture<CreateEntryButtonComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['saveSection']);
    await TestBed.configureTestingModule({
      declarations: [
        CreateEntryButtonComponent,
        MockComponents(AddButtonComponent)
      ],
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
