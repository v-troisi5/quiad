import { Component, OnInit } from '@angular/core';
import { AuthService } from '../account/services/auth.service';
import { NodeService } from '../tree/services/node.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private nodeService: NodeService,
    private authService: AuthService
  ) { }

  public nodes: any;

  ngOnInit() {
    const account = this.authService.Account!
    const id = account.id!;
    this.nodeService.getNodes(id)
      .subscribe(nodes => {
        this.nodes = nodes;
      });
  }

}
