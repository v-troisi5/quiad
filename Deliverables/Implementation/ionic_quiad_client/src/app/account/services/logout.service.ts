import { Injectable } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AccountProviderService } from 'src/app/services/account-provider.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private accountProviderService: AccountProviderService,
    private alertController: AlertController,
    private navController: NavController,
    private toastController: ToastController
  ) { }

  public logout() {
    this.alertController
    .create({
      message: "Sei sicuro di voler uscire?",
      translucent: true,
      buttons: [
        {
          text: "Sì",
          handler: () => {
            this.accountProviderService.account.next(undefined);
            localStorage.removeItem("token");
            this.navController.navigateRoot("/main/home");
            this.toastController.create({
                message: "Logout effettuato."
              }).then(toast => {
                toast.present();
              })
          }
        },
        {
          text: "Annulla",
          role: "cancel"
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

}
