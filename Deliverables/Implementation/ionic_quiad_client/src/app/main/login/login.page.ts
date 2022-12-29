import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/account/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private loginService: LoginService,
    private navController: NavController
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService
      .login({ username: "quiad", password: "Quiad&2022", rememberMe: true })
        .subscribe({
          next: (account) => {
            this.navController.navigateRoot("/main/home");
            console.log(account);
          },
          error: (err) => {
            console.log(err);
          },
        });
  }

}
