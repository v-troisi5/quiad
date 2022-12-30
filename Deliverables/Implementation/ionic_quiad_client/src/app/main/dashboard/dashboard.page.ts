import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/account/models/account';
import { LogoutService } from 'src/app/account/services/logout.service';
import { AccountProviderService } from 'src/app/services/account-provider.service';
import { PresentLogoutAlertService } from 'src/app/services/present-logout-alert.service';
import { TreeService } from 'src/app/tree/services/tree.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private presentLogoutAlertService: PresentLogoutAlertService,
    private accountProviderService: AccountProviderService,
    private treeService: TreeService
  ) { }

  public accountSubscription: Subscription = this.accountProviderService.account.subscribe(account => {
    if(account) {
      this.treeService
        .getNodes(account.id)
        .subscribe(nodes => {
          for(const node of nodes) {
            account.user.addNode(node);
          }
        });
    }
    this.account = account;
  });;

  public account?: Account;

  ngOnInit() {

  }

  public presentLogoutAlert() {
    this.presentLogoutAlertService.presentLogoutAlert();
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }

}
