import { TestBed } from '@angular/core/testing';

import { BearerInterceptor } from './bearer.interceptor';

describe('BearerService', () => {
  let service: BearerInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BearerInterceptor
      ]
    });
    service = TestBed.inject(BearerInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
