import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: StoreService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpSpy}
      ]
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
