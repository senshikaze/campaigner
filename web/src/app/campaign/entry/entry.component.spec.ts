import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryComponent } from './entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { CampaignEntry } from 'src/app/interfaces/campaign-entry';
import { TextBoxModule } from 'src/app/textbox/textbox.module';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

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
        ReactiveFormsModule,
        TextBoxModule,
        MarkdownModule.forRoot()
      ],
      providers: [
        { provide: StoreService, useValue: storeSpy},
        MarkdownService
      ]
    })
    .compileComponents();

    let entry: CampaignEntry = {
      section_id: 1,
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
