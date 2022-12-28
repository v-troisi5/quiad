import { Component, Input, OnInit } from '@angular/core';
import { Node } from 'src/app/tree/models/Node';

@Component({
  selector: 'app-create-node-modal',
  templateUrl: './create-node-modal.component.html',
  styleUrls: ['./create-node-modal.component.scss'],
})
export class CreateNodeModalComponent implements OnInit {

  @Input()
  public fatherId?: number;

  @Input()
  public motherId?: number;

  @Input()
  public motherHasChildren?: number;

  @Input()
  public fatherHasChildren?: number;

  @Input()
  public parent?: Node;

  constructor() { }

  ngOnInit() {}

}
