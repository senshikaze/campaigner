import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';
import { StoreService } from 'src/app/services/store.service';
import { MockComponents } from 'ng-mocks';
import { PlayerLevelInfoComponent } from './player-level-info/player-level-info.component';
import { PlayerAvatarComponent } from './player-avatar/player-avatar.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getFromStore']);

    await TestBed.configureTestingModule({
      declarations: [
        MockComponents(
          PlayerLevelInfoComponent,
          PlayerAvatarComponent
        )
      ],
      imports: [PlayerComponent],
      providers: [
        { provide: StoreService, useValue: storeSpy }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
