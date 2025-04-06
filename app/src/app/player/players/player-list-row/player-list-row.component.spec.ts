import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListRowComponent } from './player-list-row.component';

describe('PlayerListRowComponent', () => {
  let component: PlayerListRowComponent;
  let fixture: ComponentFixture<PlayerListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerListRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
