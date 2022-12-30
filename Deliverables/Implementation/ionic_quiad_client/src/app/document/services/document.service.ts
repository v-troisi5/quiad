import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Document, IDocument } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClient) { }

  public findDocuments(filter: SearchDocumentsFilter) {
    return this.httpClient
      .get<IDocument[]>(environment.apiUrl + environment.paths.documents)
      .pipe(map(documents => {
        const _ = documents.map(d => new Document(d));
        return _;
      }));
  }

}

export interface SearchDocumentsFilter {

  retrievalPlace?: string;
  retrievalDate?: Date | string;
  originPlace?: string;
  originDate?: Date | string;

}