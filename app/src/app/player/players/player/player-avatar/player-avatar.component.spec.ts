import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAvatarComponent } from './player-avatar.component';
import { Player } from 'src/app/interfaces/player';

describe('PlayerAvatarComponent', () => {
  let component: PlayerAvatarComponent;
  let fixture: ComponentFixture<PlayerAvatarComponent>;
  let player: Player;

  beforeEach(async () => {
    player = {} as Player;
    await TestBed.configureTestingModule({
      imports: [PlayerAvatarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerAvatarComponent);
    component = fixture.componentInstance;
    component.player = player;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
