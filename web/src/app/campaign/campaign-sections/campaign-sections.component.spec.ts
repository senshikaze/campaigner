import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSectionsComponent } from './campaign-sections.component';
import { SectionListComponent } from '../section/section-list/section-list.component';
import { StoreService } from 'src/app/services/store.service';
import { CreateEntryButtonComponent } from '../entry/create-button/create-entry-button.component';
import { CreateSectionButtonComponent } from '../section/create-section-button/create-section-button.component';

describe('CampaignSectionsComponent', () => {
  let component: CampaignSectionsComponent;
  let fixture: ComponentFixture<CampaignSectionsComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['saveSection', 'getSections']);
    await TestBed.configureTestingModule({
      declarations: [
        CampaignSectionsComponent,
        SectionListComponent,
        CreateEntryButtonComponent,
        CreateSectionButtonComponent,
      ],
      providers: [
        { provide: StoreService, useValue: storeSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampaignSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
