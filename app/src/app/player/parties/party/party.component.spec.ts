import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyComponent } from './party.component';
import { StoreService } from 'src/app/services/store.service';

describe('PartyComponent', () => {
  let component: PartyComponent;
  let fixture: ComponentFixture<PartyComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getFromStore']);

    await TestBed.configureTestingModule({
      imports: [PartyComponent],
      providers: [
        { provide: StoreService, useValue: storeSpy }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
