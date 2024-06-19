import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleListComponent } from './battle-list.component';
import { StoreService } from '../services/store.service';
import { of } from 'rxjs';
import { MockComponents } from 'ng-mocks';
import { AddButtonComponent } from '../misc/add-button/add-button.component';

describe('BattleListComponent', () => {
  let component: BattleListComponent;
  let fixture: ComponentFixture<BattleListComponent>;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('StoreService', ['getBattles']);
    storeSpy.getBattles.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [
        BattleListComponent,
        MockComponents(AddButtonComponent)
      ],
      providers: [
        {provide: StoreService, useValue: storeSpy}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
