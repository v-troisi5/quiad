import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { LoginCredentials, LoginService } from 'src/app/account/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private loginService: LoginService,
    private navController: NavController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) { }

  public isLoading: boolean = false;
  public error: string = "";

  public loginCredentials: LoginCredentials = {
    username: "",
    password: "",
    rememberMe: false
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.loginCredentials.username = queryParams["username"];
    });
  }

  onSubmit(loginCredentials: LoginCredentials) {
    this.loginService
      .login(loginCredentials)
        .subscribe({
          next: (account) => {
            this.navController.navigateRoot("/main/dashboard");
            console.log(account);
          },
          error: (err) => {
            switch(err.status) {
              case 401:
                this.error = "Username e/o password errati. Si prega di riprovare"
                break
            }
            this.toastController
              .create({
                message: err.message,
                color: "danger",
                duration: 1000
              }).then(toast => {
                toast.present();
              })
          },
        });
  }

}
