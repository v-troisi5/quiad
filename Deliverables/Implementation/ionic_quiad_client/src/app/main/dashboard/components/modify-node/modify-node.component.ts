import { Component, Input, OnInit } from '@angular/core';
import { Node } from 'src/app/tree/models/node';
import { TreeService } from 'src/app/tree/services/tree.service';

@Component({
  selector: 'app-modify-node',
  templateUrl: './modify-node.component.html',
  styleUrls: ['./modify-node.component.scss'],
})
export class ModifyNodeComponent implements OnInit {

  @Input()
  public node?: Node;

  constructor(private treeService: TreeService) { }

  ngOnInit() {}

  onSubmit() {
    if(this.node) {
      this.treeService
        .modifyNode(this.node.id, this.node)
        .subscribe(node => {
          console.log(node);
        });
    }
  }

}
