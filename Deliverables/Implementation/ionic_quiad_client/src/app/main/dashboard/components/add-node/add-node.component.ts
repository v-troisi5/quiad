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

  public disableSex: boolean = false;

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

  public error?: string;

  ngOnInit() {
    if(this.relation?.fatherHasChildren != null) {
      this.node.sex = "MALE";
      this.disableSex = true;
    } else if(this.relation?.motherHasChildren != null) {
      this.node.sex = "FEMALE";
      this.disableSex = true;
    }
    this.accountSubscription = this.accountProviderService.account.subscribe(
      (account) => {
        this.account = account
      },
    )
  }

  public firstnameError?: string;
  public lastnameError?: string;

  validateFirstname() {
    if(this.node.firstname) {
      if(/^[a-zA-Z '-]{2,50}$/.test(this.node.firstname)) {
        this.firstnameError = undefined;
      } else {
        this.firstnameError = "Il nome può contenere solo caratteri alfabetici e dev’essere compreso tra 2 e 50 caratteri"
        return false;
      }
    }
    return true;
  }

  validateLastname() {
    if(this.node.lastname) {
      if(/^[a-zA-Z '-]{2,50}$/.test(this.node.lastname)) {
        this.lastnameError = undefined;
      } else {
        this.lastnameError = "Il cognome può contenere solo caratteri alfabetici e dev’essere compreso tra 2 e 50 caratteri"
        return false;
      }
    }
    return true;
  }

  onSubmit() {
    if (this.node) {
      const validateFirstname = this.validateFirstname();
      const validateLastname = this.validateLastname();
      if(!validateFirstname) {
        return;
      }
      if(!validateLastname) {
        return;
      }
      const node = new Node({
        ...this.node,
        ...this.relation,
        ownerId: this.account!.user.id,
      });
      if(node.birthdate && node.deathdate) {
        if(node.birthdate > node.deathdate) {
          this.error = "La data di decesso non può essere antecedente a quella di nascita.";
          return;
        }
      }
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
            this.parent!.mother = new Node({
              id: node.id,
              firstname: node.firstname,
              lastname: node.lastname
            })
          } else if (this.relation?.fatherHasChildren) {
            this.parent!.fatherId = node.id
            this.parent!.father = new Node({
              id: node.id,
              firstname: node.firstname,
              lastname: node.lastname
            })
          }
          this.account?.user.addNode(node);
          this.accountProviderService.save(this.account);
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
