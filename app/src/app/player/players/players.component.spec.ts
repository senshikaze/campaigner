import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersComponent } from './players.component';
import { StoreService } from 'src/app/services/store.service';

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getFromStore']);

    await TestBed.configureTestingModule({
      imports: [PlayersComponent],
      providers: [
        { provide: StoreService, useValue: storeSpy }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
