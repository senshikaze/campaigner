import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerComponent } from './add-player.component';
import { StoreService } from 'src/app/services/store.service';

describe('AddPlayerComponent', () => {
  let component: AddPlayerComponent;
  let fixture: ComponentFixture<AddPlayerComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['savePlayer']);
    await TestBed.configureTestingModule({
      imports: [AddPlayerComponent],
      providers: [
        { provide: StoreService, useValue: storeSpy }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
