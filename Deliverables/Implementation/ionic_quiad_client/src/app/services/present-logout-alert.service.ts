import { Injectable } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { LogoutService } from '../account/services/logout.service';

@Injectable({
  providedIn: 'root'
})
export class PresentLogoutAlertService {

  constructor(
    private alertController: AlertController,
    private logoutService: LogoutService,
    private toastController: ToastController,
    private navController: NavController
  ) { }

  public presentLogoutAlert() {
    this.alertController
    .create({
      message: "Sei sicuro di voler uscire?",
      translucent: true,
      buttons: [
        {
          text: "Sì",
          handler: () => {
            this.logoutService
              .logout()
              .then(() => {
                this.navController.navigateRoot("/main/home");
                this.toastController.create({
                    message: "Logout effettuato.",
                  duration: 1000
                }).then(toast => {
                  toast.present();
                });
              });
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
