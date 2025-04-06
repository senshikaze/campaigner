import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesComponent } from './parties.component';
import { StoreService } from 'src/app/services/store.service';

describe('PartiesComponent', () => {
  let component: PartiesComponent;
  let fixture: ComponentFixture<PartiesComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getFromStore']);

    await TestBed.configureTestingModule({
      imports: [PartiesComponent],
      providers: [
        { provide: StoreService, useValue: storeSpy }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
