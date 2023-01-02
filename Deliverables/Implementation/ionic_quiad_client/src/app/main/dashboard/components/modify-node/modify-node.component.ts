import { Component, Input, OnInit } from '@angular/core'
import { ModalController, ToastController } from '@ionic/angular'
import { Subscription } from 'rxjs'
import { Account } from 'src/app/account/models/account'
import { AccountProviderService } from 'src/app/services/account-provider.service'
import { INode, Node } from 'src/app/tree/models/node'
import { TreeService } from 'src/app/tree/services/tree.service'

@Component({
  selector: 'app-modify-node',
  templateUrl: './modify-node.component.html',
  styleUrls: ['./modify-node.component.scss'],
})
export class ModifyNodeComponent implements OnInit {
  @Input()
  public node?: Node

  public form?: INode

  private account?: Account
  private accountSubscription: Subscription = this.accountProviderService.account.subscribe(
    (account) => {
      this.account = account
    },
  )

  constructor(
    private treeService: TreeService,
    private toastController: ToastController,
    private accountProviderService: AccountProviderService,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    if(this.node) {
      this.form = {
        id: this.node!.id!,
        firstname: this.node?.firstname,
        lastname: this.node?.lastname,
        birthdate: this.node?.birthdate?.toISOString().split('T')[0],
        deathdate: this.node?.deathdate?.toISOString().split('T')[0],
        birthplace: this.node?.birthplace,
        deathplace: this.node?.deathplace,
      }
    }
  }

  onSubmit() {
    if (this.node) {
      this.treeService
        .modifyNode(this.node.id!, new Node(this.form!))
        .subscribe((node) => {
          this.account?.user.modifyNode(this.node!.id!, node)
          this.toastController
            .create({
              message: 'Modificato',
              duration: 1000,
              color: 'warning',
            })
            .then((toast) => {
              toast.present()
            })
          this.modalController.dismiss()
        });
    }
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe()
  }
}
