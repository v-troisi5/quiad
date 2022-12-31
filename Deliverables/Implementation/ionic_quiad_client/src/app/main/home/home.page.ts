import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Account } from 'src/app/account/models/account';
import { LogoutService } from 'src/app/account/services/logout.service';
import { AccountProviderService } from 'src/app/services/account-provider.service';
import { PresentLogoutAlertService } from 'src/app/services/present-logout-alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public account?: Account;

  constructor(
    private accountProviderService: AccountProviderService,
    private presentLogoutAlertService: PresentLogoutAlertService
  ) { }


  ngOnInit() {
    this.accountProviderService.account.subscribe(account => {
      this.account = account;
    });
  }

  public presentLogoutAlert() {
    this.presentLogoutAlertService.presentLogoutAlert();
  }

  toggleDarkMode(event: any) {
    if(event.detail.checked) {
      document.body.setAttribute("color-theme", "dark");
    } else {
      document.body.setAttribute("color-theme", "light");
    }
  }

  public get isDarkMode() {
    return document.body.getAttribute("color-theme") == "dark";
  }

}
