import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Subscription } from "rxjs";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private queryParamsSubscription?: Subscription;
  public signinForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    ricordatiDiMe: new FormControl(false)
  });
  loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastController: ToastController,
    private navController: NavController
  ) {
  }

  ngOnInit() {
    const account = this.authService.Account;
    if(account) {
      this.navController.navigateRoot("/dashboard");
    }
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(queryParams => {
      this.signinForm.get("username")?.setValue(queryParams["username"]);
    });
  }

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
  }

  onSubmit(credentials: { username: string, password: string, ricordatiDiMe: boolean }) {
    this.loading = true;
    this.authService.login(credentials).subscribe({
      next: (account) => {
        this.navController.navigateRoot("/dashboard");
      },
      error: (error) => {
        this.toastController.create({
          duration: 3000,
          color: "danger",
          message: error.message,
        }).then(toast => {
          toast.present();
        });
      },
    }).add(() => {
      this.loading = false;
    })
  }

}
