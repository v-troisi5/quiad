import { Injectable } from '@angular/core';
import { AccountProviderService } from 'src/app/services/account-provider.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private accountProviderService: AccountProviderService) { }

  public logout() {
    
  }

}
