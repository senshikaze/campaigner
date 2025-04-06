import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLevelInfoComponent } from './player-level-info.component';
import { StoreService } from 'src/app/services/store.service';
import { of } from 'rxjs';

describe('PlayerLevelInfoComponent', () => {
  let component: PlayerLevelInfoComponent;
  let fixture: ComponentFixture<PlayerLevelInfoComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getRaces']);
    storeSpy.getRaces.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [PlayerLevelInfoComponent],
      providers: [
        { provide: StoreService, useValue: storeSpy }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerLevelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
