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

  constructor(
    private documentService: DocumentService,
  ) { }

  ngOnInit() {
  }

  public onSubmit() {
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
