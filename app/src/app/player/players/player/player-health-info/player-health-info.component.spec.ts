import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerHealthInfoComponent } from './player-health-info.component';

describe('PlayerHealthInfoComponent', () => {
  let component: PlayerHealthInfoComponent;
  let fixture: ComponentFixture<PlayerHealthInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerHealthInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerHealthInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
