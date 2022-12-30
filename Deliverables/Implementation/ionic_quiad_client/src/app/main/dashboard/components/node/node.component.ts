import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Node } from 'src/app/tree/models/node';
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

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

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

}
