import { TestBed } from '@angular/core/testing';

import { LogoutService } from './logout.service';

describe('LogoutService', () => {
  let service: LogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: []
    });
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHF1aWFkLmNvbSIsInVzZXJuYW1lIjoicXVpYWQiLCJ1c2VyIjp7ImlkIjoxLCJyZXNpZGVuY2UiOiJCYXRoIChVSykiLCJyb2xlIjp7ImlkIjoxLCJuYW1lIjoic3RhbmRhcmQiLCJvcGVyYXRpb25zIjpbeyJpZCI6NCwibmFtZSI6ImRvY3VtZW50OnNlYXJjaCJ9LHsiaWQiOjIsIm5hbWUiOiJub2RlOmNyZWF0ZSJ9LHsiaWQiOjUsIm5hbWUiOiJub2RlOmRlbGV0ZSJ9LHsiaWQiOjEsIm5hbWUiOiJub2RlOnJlYWQifSx7ImlkIjozLCJuYW1lIjoibm9kZTp1cGRhdGUifV19LCJub2RlIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJWYWxlcmlvIiwibGFzdG5hbWUiOiJUcm9pc2kiLCJiaXJ0aGRhdGUiOiIxOTk5LTA1LTE4VDIyOjAwOjAwLjAwMFoiLCJiaXJ0aHBsYWNlIjoiTG9uZG9uIChVSykiLCJzZXgiOiJNQUxFIiwiZmF0aGVySWQiOm51bGwsIm1vdGhlcklkIjoyMH0sImN1cmF0b3IiOm51bGx9LCJzdXBlcnZpc29yIjpudWxsLCJpYXQiOjE2NzI0MDIyNzZ9.WJogaK5TmAfQLwKj-bNujmoq_F46XqSO--fxF_csPlo");
    service = TestBed.inject(LogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should logout', async () => {
    await service.logout();
    expect(localStorage.getItem("token")).toBeNull();
  });

});
