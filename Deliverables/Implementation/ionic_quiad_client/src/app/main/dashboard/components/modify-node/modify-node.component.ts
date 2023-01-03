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

  public dismissModal() {
    this.modalController.dismiss();
  }

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

  validateFirstname() {
    if(this.form) {
      if(this.form.firstname) {
        if(/^[a-zA-Z ]{2,50}$/.test(this.form.firstname)) {
          this.firstnameError = undefined;
        } else {
          this.firstnameError = "Il nome può contenere solo caratteri alfabetici e dev’essere compreso tra 2 e 50 caratteri"
          return false;
        }
      }
      return true;
    }
    return false;
  }

  validateLastname() {
    if(this.form) {
      if(this.form.lastname) {
        if(/^[a-zA-Z ]{2,50}$/.test(this.form.lastname)) {
          this.lastnameError = undefined;
        } else {
          this.lastnameError = "Il cognome può contenere solo caratteri alfabetici e dev’essere compreso tra 2 e 50 caratteri"
          return false;
        }
      }
      return true;
    }
    return false;
  }

  public error?: string;
  public firstnameError?: string;
  public lastnameError?: string;

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
      const node = new Node(this.form!);
      if(node.birthdate && node.deathdate) {
        if(node.birthdate > node.deathdate) {
          this.error = "La data di decesso non può essere antecedente a quella di nascita.";
          return;
        }
      }
      this.treeService
        .modifyNode(this.node.id!, node)
        .subscribe((node) => {
          this.account?.user.modifyNode(this.node!.id!, node)
          this.accountProviderService.save(this.account);
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
