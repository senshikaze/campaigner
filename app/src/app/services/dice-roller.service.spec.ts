import { TestBed } from '@angular/core/testing';

import { DiceRollerService } from './dice-roller.service';
import { HttpClient } from '@angular/common/http';

describe('DiceRollerService', () => {
  let service: DiceRollerService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpSpy}
      ]
    });
    service = TestBed.inject(DiceRollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
