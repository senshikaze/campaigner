import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryComponent } from './entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { CampaignEntry } from 'src/app/interfaces/campaign-entry';

describe('EntryComponent', () => {
  let component: EntryComponent;
  let fixture: ComponentFixture<EntryComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreSerive', ['getEntry']);
    await TestBed.configureTestingModule({
      declarations: [ EntryComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: StoreService, useValue: storeSpy}
      ]
    })
    .compileComponents();

    let entry: CampaignEntry = {
      section: "1",
      title: "Test Title",
      text: "Test Text"
    };

    fixture = TestBed.createComponent(EntryComponent);
    component = fixture.componentInstance;
    component.entry = entry;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
