import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLevelInfoComponent } from './player-level-info.component';

describe('PlayerLevelInfoComponent', () => {
  let component: PlayerLevelInfoComponent;
  let fixture: ComponentFixture<PlayerLevelInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerLevelInfoComponent]
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
