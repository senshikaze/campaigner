import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleEntitiesComponent } from './battle-entities.component';

describe('BattleEntitiesComponent', () => {
  let component: BattleEntitiesComponent;
  let fixture: ComponentFixture<BattleEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BattleEntitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
