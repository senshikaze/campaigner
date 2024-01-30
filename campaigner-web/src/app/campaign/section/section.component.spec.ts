import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionComponent } from './section.component';
import { StoreService } from 'src/app/services/store.service';
import { CampaignSection } from 'src/app/interfaces/campaign-section';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getSection']);
    await TestBed.configureTestingModule({
      imports: [
        FormsModule, ReactiveFormsModule
      ],
      declarations: [ SectionComponent ],
      providers: [
        { provide: StoreService, useValue: storeSpy}
      ]
    })
    .compileComponents();

    let section: CampaignSection = {
      campaign: "1",
      name: "Test Name"
    };

    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
    component.section = section;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
