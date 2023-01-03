import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/document/models/document';
import { DocumentService, SearchDocumentsFilter } from 'src/app/document/services/document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  public filter: SearchDocumentsFilter = {};

  public documents: Document[] = [];

  public nameError?: string;

  constructor(
    private documentService: DocumentService,
  ) { }

  ngOnInit() {
  }

  public onSubmit() {
    if(this.filter.name) {
      if(this.filter.name.length < 3 || this.filter.name.length > 80) {
        this.nameError = "Il nome deve essere compreso tra 3 e 80 caratteri";
        return;
      } else {
        this.nameError = undefined;
      }
    }
    const filter: SearchDocumentsFilter = {
      ...this.filter,
      originDate: this.filter.originDate ? new Date(this.filter.originDate).toISOString() : undefined,
      retrievalDate: this.filter.retrievalDate ? new Date(this.filter.retrievalDate).toISOString() : undefined
    }
    this.documentService
      .findDocuments(filter)
      .subscribe(documents => {
        this.documents = documents;
      })
  }

}
