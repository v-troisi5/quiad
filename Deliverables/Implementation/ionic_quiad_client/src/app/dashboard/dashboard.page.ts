import { Component, OnInit } from '@angular/core'
import { ModalController, NavController } from '@ionic/angular'
import { AuthService } from '../account/services/auth.service'
import { NodeService } from '../tree/services/node.service'
import { CreateNodeModalComponent } from './create-node-modal/create-node-modal.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(
    private nodeService: NodeService,
    private authService: AuthService,
    private modalController: ModalController,
    private navController: NavController
  ) {}

  public userNode: any
  public nodes: any

  ngOnInit() {
    const account = this.authService.Account!
    if (account) {
      const id = account.id!
      this.userNode = account.user?.node
      this.nodeService.getNodes(id).subscribe((nodes) => {
        this.nodes = nodes
      })
    } else {
      this.navController.navigateRoot("/login");
    }
  }

  public presentCreateNodeModal(relations: { fatherId?: number, motherId?: number, motherHasChildren?: number, fatherHasChildren?: number }, parent: Node) {
    this.modalController
      .create({
        component: CreateNodeModalComponent,
        componentProps: {
          fatherId: relations.fatherId,
          motherId: relations.motherId,
          motherHasChildren: relations.motherHasChildren,
          fatherHasChildren: relations.fatherHasChildren,
          parent: parent
        }
      })
      .then((modal) => {
        modal.present()
      })
  }

  public logout() {
    this.authService.logout()
      .then(() => {
        this.navController.navigateRoot("/login");
      });
  }

}
