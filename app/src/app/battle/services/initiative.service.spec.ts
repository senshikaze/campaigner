import { TestBed } from '@angular/core/testing';

import { InitiativeService } from './initiative.service';
import { StoreService } from 'src/app/services/store.service';

describe('InitiativeService', () => {
  let service: InitiativeService;
  let storeSpy: jasmine.SpyObj<StoreService>;

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('StoreService', ["getBattleEntites"]);
    TestBed.configureTestingModule({
      providers: [
        {provide: StoreService, useValue: storeSpy}
      ]
    });
    service = TestBed.inject(InitiativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
