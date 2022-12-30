import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Account } from 'src/app/account/models/account';
import { LogoutService } from 'src/app/account/services/logout.service';
import { AccountProviderService } from 'src/app/services/account-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public account?: Account;

  constructor(
    private accountProviderService: AccountProviderService,
    private logoutService: LogoutService
  ) { }

  ngOnInit() {
    this.accountProviderService.account.subscribe(account => {
      this.account = account;
    });
  }

  public presentLogoutAlert() {
    this.logoutService.logout();
  }

}
