import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionListComponent } from './section-list.component';
import { CreateSectionButtonComponent } from '../create-section-button/create-section-button.component';
import { StoreService } from 'src/app/services/store.service';
import { MockComponents } from 'ng-mocks';

describe('SectionListComponent', () => {
  let component: SectionListComponent;
  let fixture: ComponentFixture<SectionListComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getSections']);
    await TestBed.configureTestingModule({
      declarations: [
        SectionListComponent,
        MockComponents(CreateSectionButtonComponent),
      ],
      providers: [
        { provide: StoreService, useValue: storeSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
