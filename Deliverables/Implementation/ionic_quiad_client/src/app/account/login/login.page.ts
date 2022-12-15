import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";
import { LoginCredentials } from '../models/LoginCredentials';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private queryParamsSubscription: Subscription;
  username?: string;
  signinForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    ricordati_di_me: new FormControl(false)
  });
  loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.queryParamsSubscription = activatedRoute.queryParams.subscribe(queryParams => {
      this.username = queryParams["username"];
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }

  onSubmit(utente: LoginCredentials) {
    this.authService.login(utente).subscribe(loginAccount => {
      console.log(loginAccount);
    });
  }

}
