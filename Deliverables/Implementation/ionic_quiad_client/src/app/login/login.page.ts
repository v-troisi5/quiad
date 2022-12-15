import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private queryParamsSubscription: Subscription;
  public username?: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.queryParamsSubscription = activatedRoute.queryParams.subscribe(queryParams => {
      this.username = queryParams["username"];
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }

}
