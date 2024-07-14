import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleEntityDescriptionComponent } from './battle-entity-description.component';

describe('BattleEntityDescriptionComponent', () => {
  let component: BattleEntityDescriptionComponent;
  let fixture: ComponentFixture<BattleEntityDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BattleEntityDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleEntityDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
