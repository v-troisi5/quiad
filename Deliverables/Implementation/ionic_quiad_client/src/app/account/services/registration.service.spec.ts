import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { Account, IAccount } from '../models/account'

import { RegistrationService } from './registration.service'

describe('RegistrationService', () => {
  let service: RegistrationService
  let httpClient: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(RegistrationService)
    httpClient = TestBed.inject(HttpClient)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should register a new account', () => {
    const iaccount: IAccount = {
      id: 1,
      email: 'valeriotroisi@quiad.com',
      username: 'valeriotroisi',
      user: {
        id: 1,
        residence: 'Via G. Verdi, 21',
        role: {
          id: 1,
          name: 'standard',
        },
        node: {
          id: 1,
          firstname: 'Valerio',
          lastname: 'Troisi',
          birthdate: '1999-05-18T22:00:00.000Z',
          birthplace: 'London (UK)',
          sex: 'MALE',
          documents: []
        },
      },
      token: '',
    }
    spyOn(httpClient, 'post').and.returnValue(of(iaccount))
    service.register({
      email: 'valeriotroisi@quiad.com',
      username: 'quiad',
      password: 'miapassword',
      user: {
        residence: 'Via G. Verdi, 21',
        node: {
          firstname: 'Valerio',
          lastname: 'Troisi',
          birthdate: '1999-05-18T22:00:00.000Z',
          birthplace: 'London (UK)',
          sex: 'MALE',
        },
      },
    }).subscribe(account => {
      expect(account).toEqual(new Account(iaccount));
    });
  })



})
