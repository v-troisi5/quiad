import { Component, OnInit } from '@angular/core';
import { DocumentService } from './services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {

  constructor(private documentService: DocumentService) {

  }

  ngOnInit() {
    
  }

}
