import { TestBed } from '@angular/core/testing';

import { PresentLogoutAlertService } from './present-logout-alert.service';

describe('PresentLogoutAlertService', () => {
  let service: PresentLogoutAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresentLogoutAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
