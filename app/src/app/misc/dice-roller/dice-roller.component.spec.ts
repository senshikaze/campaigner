import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceRollerComponent } from './dice-roller.component';
import { DiceRollerService } from 'src/app/services/dice-roller.service';

describe('DiceRollerComponent', () => {
  let component: DiceRollerComponent;
  let fixture: ComponentFixture<DiceRollerComponent>;
  let diceRoller: jasmine.SpyObj<DiceRollerService>;

  beforeEach(async () => {
    diceRoller = jasmine.createSpyObj('DiceRollerService', ["roll"]);
    await TestBed.configureTestingModule({
      imports: [DiceRollerComponent],
      providers: [
        {provide: DiceRollerService, useValue: diceRoller}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiceRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
