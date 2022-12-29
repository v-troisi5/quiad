import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClient) { }

  public searchDocuments(filter: SearchDocumentsFilter) {
    this.httpClient
      .get(environment.apiUrl + environment.paths.documents)
  }

}

export interface SearchDocumentsFilter {

  retrievalPlace: string;
  retrievalDate: Date;
  originPlace: string;
  originDate: Date;

}