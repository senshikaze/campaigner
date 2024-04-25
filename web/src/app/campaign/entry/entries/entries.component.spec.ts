import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesComponent } from './entries.component';
import { StoreService } from 'src/app/services/store.service';
import { CreateEntryButtonComponent } from '../create-button/create-entry-button.component';
import { MockComponent } from 'ng-mocks';
import { TextboxComponent } from 'src/app/textbox/textbox.component';
import { TextBoxModule } from 'src/app/textbox/textbox.module';

describe('EntriesComponent', () => {
  let component: EntriesComponent;
  let fixture: ComponentFixture<EntriesComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getSectionEntries']);
    await TestBed.configureTestingModule({
      declarations: [
        EntriesComponent,
        CreateEntryButtonComponent,
      ],
      providers: [
        { provide: StoreService, useValue: storeSpy },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
