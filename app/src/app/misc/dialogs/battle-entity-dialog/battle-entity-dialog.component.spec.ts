import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleEntityDialogComponent, BattleEntityDialogInterface } from './battle-entity-dialog.component';
import { StoreService } from 'src/app/services/store.service';
import { MarkdownModule } from 'ngx-markdown';
import { DiceRollerService } from 'src/app/services/dice-roller.service';
import { EntityType } from 'src/app/enums/entity-type';

describe('BattleEntityDialogComponent', () => {
  let component: BattleEntityDialogComponent;
  let fixture: ComponentFixture<BattleEntityDialogComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;
  let diceRollerSpy: jasmine.SpyObj<DiceRollerService>;

  beforeEach(async () => {
    diceRollerSpy = jasmine.createSpyObj('DiceRollerService', ['roll']);
    storeSpy = jasmine.createSpyObj('StoreService', ["getEntity"]);
    let data: BattleEntityDialogInterface = {
      entity: {
        id: 1,
        type: EntityType.BATTLE,
        name: "string",
        description: "string",
        notes: "string"
      },
      saved: (e) => undefined
    }
    await TestBed.configureTestingModule({
      imports: [
        BattleEntityDialogComponent,
        MarkdownModule.forRoot()
      ],
      providers: [
        {provide: StoreService, useValue: storeSpy},
        {provide: DiceRollerService, useValue: diceRollerSpy},
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleEntityDialogComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
