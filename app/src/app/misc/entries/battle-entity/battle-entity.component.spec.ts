import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleEntityComponent } from './battle-entity.component';
import { StoreService } from 'src/app/services/store.service';
import { MockComponents } from 'ng-mocks';
import { TextboxComponent } from '../../textbox/textbox.component';
import { Entity } from 'src/app/interfaces/entity';
import { EntityType } from 'src/app/enums/entity-type';

describe('BattleEntityComponent', () => {
  let component: BattleEntityComponent;
  let fixture: ComponentFixture<BattleEntityComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreSpy', ["saveEntity"]);
    let entity: Entity = {
      id: 1,
      type: EntityType.BATTLE,
      name: "string",
      description: "string",
      notes: "string",
    };
  
    await TestBed.configureTestingModule({
      imports: [
        BattleEntityComponent,
        MockComponents(TextboxComponent),
      ],
      providers: [
        {provide: StoreService, useValue: storeSpy},
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleEntityComponent);
    component = fixture.componentInstance;
    component.entity = entity;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
