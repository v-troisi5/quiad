import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs'
import { Account, IAccount } from '../models/account';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(LoginService);
    httpClient = TestBed.inject(HttpClient);
    localStorage.removeItem("token");
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and remember the user', () => {
    const iaccount: IAccount = {
      id: 1,
      email: "valeriotroisi@quiad.com",
      username: "quiad",
      user: {
        id: 1,
        residence: "Via G. Verdi, 21",
        role: {
          id: 1,
          name: 'standard',
        },
        node: {
          id: 1,
          documents: []
        }
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHF1aWFkLmNvbSIsInVzZXJuYW1lIjoicXVpYWQiLCJ1c2VyIjp7ImlkIjoxLCJyZXNpZGVuY2UiOiJCYXRoIChVSykiLCJyb2xlIjp7ImlkIjoxLCJuYW1lIjoic3RhbmRhcmQiLCJvcGVyYXRpb25zIjpbeyJpZCI6NCwibmFtZSI6ImRvY3VtZW50OnNlYXJjaCJ9LHsiaWQiOjIsIm5hbWUiOiJub2RlOmNyZWF0ZSJ9LHsiaWQiOjUsIm5hbWUiOiJub2RlOmRlbGV0ZSJ9LHsiaWQiOjEsIm5hbWUiOiJub2RlOnJlYWQifSx7ImlkIjozLCJuYW1lIjoibm9kZTp1cGRhdGUifV19LCJub2RlIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJWYWxlcmlvIiwibGFzdG5hbWUiOiJUcm9pc2kiLCJiaXJ0aGRhdGUiOiIxOTk5LTA1LTE4VDIyOjAwOjAwLjAwMFoiLCJiaXJ0aHBsYWNlIjoiTG9uZG9uIChVSykiLCJzZXgiOiJNQUxFIiwiZmF0aGVySWQiOm51bGwsIm1vdGhlcklkIjoyMH0sImN1cmF0b3IiOm51bGx9LCJzdXBlcnZpc29yIjpudWxsLCJpYXQiOjE2NzI0MDIyNzZ9.WJogaK5TmAfQLwKj-bNujmoq_F46XqSO--fxF_csPlo"
    };
    spyOn(httpClient, "post").and.returnValue(of({ account: iaccount }))
    const account = new Account(iaccount);
    service.login({
      username: "quiad",
      password: "miapassword",
      rememberMe: true
    }).subscribe(_ => {
      expect(_).toEqual(account);
      expect(localStorage.getItem("token")).toBe(account.token);
    });
  });

  it('should login and not remember the user', () => {
    const iaccount: IAccount = {
      id: 1,
      username: "quiad",
      email: "valeriotroisi@quiad.com",
      user: {
        id: 1,
        role: {
          id: 1,
          name: 'standard',
        },
        residence: "Via G. Verdi, 21",
        node: {
          id: 1,
          documents: []
        }
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHF1aWFkLmNvbSIsInVzZXJuYW1lIjoicXVpYWQiLCJ1c2VyIjp7ImlkIjoxLCJyZXNpZGVuY2UiOiJCYXRoIChVSykiLCJyb2xlIjp7ImlkIjoxLCJuYW1lIjoic3RhbmRhcmQiLCJvcGVyYXRpb25zIjpbeyJpZCI6NCwibmFtZSI6ImRvY3VtZW50OnNlYXJjaCJ9LHsiaWQiOjIsIm5hbWUiOiJub2RlOmNyZWF0ZSJ9LHsiaWQiOjUsIm5hbWUiOiJub2RlOmRlbGV0ZSJ9LHsiaWQiOjEsIm5hbWUiOiJub2RlOnJlYWQifSx7ImlkIjozLCJuYW1lIjoibm9kZTp1cGRhdGUifV19LCJub2RlIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJWYWxlcmlvIiwibGFzdG5hbWUiOiJUcm9pc2kiLCJiaXJ0aGRhdGUiOiIxOTk5LTA1LTE4VDIyOjAwOjAwLjAwMFoiLCJiaXJ0aHBsYWNlIjoiTG9uZG9uIChVSykiLCJzZXgiOiJNQUxFIiwiZmF0aGVySWQiOm51bGwsIm1vdGhlcklkIjoyMH0sImN1cmF0b3IiOm51bGx9LCJzdXBlcnZpc29yIjpudWxsLCJpYXQiOjE2NzI0MDIyNzZ9.WJogaK5TmAfQLwKj-bNujmoq_F46XqSO--fxF_csPlo"
    };
    spyOn(httpClient, "post").and.returnValue(of({ account: iaccount }))
    const account = new Account(iaccount);
    service.login({
      username: "quiad",
      password: "miapassword",
      rememberMe: false
    }).subscribe(_ => {
      expect(_).toEqual(account);
      expect(localStorage.getItem("token")).toBeNull();
    });
  });

  it('should not login with a non valid username', () => {
    spyOn(httpClient, "post").and.returnValue(throwError(new HttpErrorResponse({
      status: 401,
      error: null
    })));
    service.login({
      username: "quiad",
      password: "miapasswordz",
      rememberMe: false
    }).subscribe({
      error(err) {
        expect(err).toBeDefined();
        expect(localStorage.getItem("token")).toBeNull();
      },
    });
  });

  it('should not login with a non valid password', () => {
    spyOn(httpClient, "post").and.returnValue(throwError(new HttpErrorResponse({
      status: 401,
      error: null
    })));
    service.login({
      username: "quiadz",
      password: "miapassword",
      rememberMe: false
    }).subscribe({
      error(err) {
        expect(err).toBeDefined();
        expect(localStorage.getItem("token")).toBeNull();
      },
    });
  });

});
