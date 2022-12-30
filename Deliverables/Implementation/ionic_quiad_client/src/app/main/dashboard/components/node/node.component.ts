import { Component, Input, OnInit } from '@angular/core';
import { Node } from 'src/app/tree/models/node';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {

  @Input()
  public node?: Node;

  constructor() { }

  ngOnInit() {}

}
