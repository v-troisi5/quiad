import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AccountProviderService } from 'src/app/services/account-provider.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private accountProviderService: AccountProviderService,
  ) { }

  public account?: { id: number };

  ngOnInit() {
    this.accountProviderService.account.subscribe(account => {
      this.account = account;
    });
  }

  public presentLogoutAlert() {
    this.alertController
      .create({
        message: "Sei sicuro di voler uscire?",
        translucent: true,
        buttons: [
          {
            text: "Sì",
            handler: () => {

            }
          },
          {
            text: "Annulla",
            role: "cancel"
          }
        ]
      }).then(alert => {
        alert.present();
      })
  }

}
