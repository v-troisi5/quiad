import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from "rxjs";
import { IAccount } from '../models/IAccount';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private queryParamsSubscription?: Subscription;
  signinForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    ricordati_di_me: new FormControl(false)
  });
  loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
  }
  
  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(queryParams => {
      this.signinForm.get("username")?.setValue(queryParams["username"]);
    });
  }

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
  }

  onSubmit(credentials: IAccount) {
    this.loading = true;
    this.authService.login(credentials).subscribe({
      next: (account) => {
        this.router.navigate(["/dashboard"]);
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
