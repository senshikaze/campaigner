import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSectionsComponent } from './campaign-sections.component';
import { SectionListComponent } from '../section/section-list/section-list.component';
import { StoreService } from 'src/app/services/store.service';
import { CreateEntryButtonComponent } from '../entry/create-button/create-entry-button.component';
import { CreateSectionButtonComponent } from '../section/create-section-button/create-section-button.component';
import { Campaign } from 'src/app/interfaces/campaign';
import { FormsModule } from '@angular/forms';
import { MockComponents } from 'ng-mocks';
import { SaveButtonComponent } from 'src/app/misc/save-button/save-button.component';

describe('CampaignSectionsComponent', () => {
  let component: CampaignSectionsComponent;
  let fixture: ComponentFixture<CampaignSectionsComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;
  let campaign: Campaign;

  beforeEach(async () => {
    campaign = {
      id: 1,
      name: "Campaign",
      user_id: 1
    };

    storeSpy = jasmine.createSpyObj('StoreService', ['saveSection', 'getSections']);
    await TestBed.configureTestingModule({
      declarations: [
        CampaignSectionsComponent,
        SectionListComponent,
        CreateEntryButtonComponent,
        CreateSectionButtonComponent,
        MockComponents(SaveButtonComponent)
      ],
      providers: [
        { provide: StoreService, useValue: storeSpy }
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampaignSectionsComponent);
    component = fixture.componentInstance;
    component.campaign = campaign;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
