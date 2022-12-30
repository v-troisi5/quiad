import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/account/models/account';
import { AccountProviderService } from 'src/app/services/account-provider.service';
import { Node } from 'src/app/tree/models/node';
import { TreeService } from 'src/app/tree/services/tree.service';
import { AddNodeComponent } from '../add-node/add-node.component';
import { ModifyNodeComponent } from '../modify-node/modify-node.component';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {

  @Input()
  public node?: Node;

  @Input()
  public color: string = "";

  @Input()
  public isUserNode: boolean = false;

  private account?: Account;
  private accountSubscription?: Subscription;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private treeService: TreeService,
    private toastController: ToastController,
    private accountProviderService: AccountProviderService
  ) { }

  ngOnInit() {
    this.accountSubscription = this.accountProviderService.account.subscribe(account => {
      this.account = account;
    });
  }

  public presentModifyNodeModal() {
    this.modalController
      .create({
        component: ModifyNodeComponent,
        componentProps: {
          node: this.node
        }
      }).then(modal => {
        modal.present();
      });
  }

  public presentDeleteNodeAlert(node: Node) {
    this.alertController.create({
      message: "Vuoi eliminare questo nodo?",
      buttons: [
        {
          text: "Sì",
          handler: () => {
            this.treeService
              .deleteNode(node.id!)
              .subscribe(node => {
                this.account?.user.deleteNode(node.id!);
                this.toastController.create({
                  message: "Il nodo è stato eliminato",
                  duration: 1000,
                  color: "danger"
                }).then(toast => {
                  toast.present();
                })
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

  public presentAddNodeModal(relation: { motherHasChildren?: number, fatherHasChildren?: number, fatherId?: number, motherId?: number }, parent: Node) {
    this.modalController.create({
      component: AddNodeComponent,
      componentProps: {
        relation: {
          motherHasChildren: relation.motherHasChildren ? { connect: { id: relation.motherHasChildren } } : undefined,
          fatherHasChildren: relation.fatherHasChildren ? { connect: { id: relation.fatherHasChildren } } : undefined,
          fatherId: relation.fatherId,
          motherId: relation.motherId
        },
        parent
      }
    }).then(modal => {
      modal.present();
    })
  }

  ngOnDestroy() {
    this.accountSubscription?.unsubscribe();
  }

}
