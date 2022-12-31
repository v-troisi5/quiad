import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Account } from 'src/app/account/models/account';
import { Document } from 'src/app/document/models/document';
import { AccountProviderService } from 'src/app/services/account-provider.service';
import { TreeService } from 'src/app/tree/services/tree.service';

@Component({
  selector: 'app-bind-document',
  templateUrl: './bind-document.component.html',
  styleUrls: ['./bind-document.component.scss'],
})
export class BindDocumentComponent implements OnInit {

  @Input()
  public document?: number;

  constructor(
    private accountProviderService: AccountProviderService,
    private treeService: TreeService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  public account?: Account;

  public node?: number;

  ngOnInit() {
    this.accountProviderService
    .account
    .subscribe(account => {
      this.account = account;
        this.treeService
          .getNodes(account!.user.id)
          .subscribe(tree => {
            this.account!.user.tree.clear()
            for(const node of tree) {
              this.account?.user.addNode(node);
            }
          })
      })
  }

  onSubmit() {
    this.treeService
      .bindDocument(this.node!, this.document!)
      .subscribe(_ => {
        this.modalController.dismiss();
        this.toastController.create({
          message: "Collegamento del documento effettuato",
          duration: 1000,
          color: "warning"
        });
        for(const node of this.account!.user.getNodes()) {
          if(node.id == _.id) {
            node.bindDocument(new Document({
              id: this.document!,
            }))
          }
        }
      });
  }

}
