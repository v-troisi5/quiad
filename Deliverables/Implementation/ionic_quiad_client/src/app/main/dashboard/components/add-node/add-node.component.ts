import { Component, Input, OnInit } from '@angular/core'
import { ModalController, ToastController } from '@ionic/angular'
import { Subscription } from 'rxjs'
import { Account } from 'src/app/account/models/account'
import { AccountProviderService } from 'src/app/services/account-provider.service'
import { INode, Node } from 'src/app/tree/models/node'
import { TreeService } from 'src/app/tree/services/tree.service'

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss'],
})
export class AddNodeComponent implements OnInit {
  public node: CreationNode = {}

  @Input()
  public relation?: {
    motherHasChildren?: { connect: { id: number } }
    fatherHasChildren?: { connect: { id: number } }
    fatherId?: number
    motherId?: number
  }

  @Input()
  public parent?: Node

  private account?: Account
  private accountSubscription?: Subscription

  constructor(
    private treeService: TreeService,
    private accountProviderService: AccountProviderService,
    private modalController: ModalController,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.accountSubscription = this.accountProviderService.account.subscribe(
      (account) => {
        this.account = account
      },
    )
  }

  onSubmit() {
    if (this.node) {
      this.treeService
        .createNode(
          new Node({
            ...this.node,
            ...this.relation,
            ownerId: this.account!.user.id,
          }),
        )
        .subscribe((node) => {
          this.modalController.dismiss()
          if (this.relation?.motherHasChildren) {
            this.parent!.motherId = node.id
          } else if (this.relation?.fatherHasChildren) {
            this.parent!.fatherId = node.id
          }
          this.account?.user.addNode(node)
        })
    }
  }

  ngOnDestroy() {
    this.accountSubscription?.unsubscribe()
  }
}

interface CreationNode {
  firstname?: string
  lastname?: string
  sex?: 'MALE' | 'FEMALE'
  birthplace?: string
  deathplace?: string
  birthdate?: string | Date | null
  deathdate?: string | Date | null
  fatherId?: number
  motherId?: number
  ownerId?: number
}
