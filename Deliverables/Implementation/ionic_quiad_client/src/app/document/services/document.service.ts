import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClient) { }

  public getDocuments(filter: { name?: string, retrievalPlace?: string, retrievalDate?: Date, originPlace?: string, originDate?: Date }) {
    const params = new HttpParams();
    if(filter.name) params.append("name", filter.name);
    if(filter.retrievalPlace) params.append("retrievalPlace", filter.retrievalPlace);
    if(filter.retrievalPlace) params.append("retrievalDate", filter.retrievalDate!.toString());
    if(filter.retrievalPlace) params.append("retrievalPlace", filter.retrievalPlace);
    if(filter.originDate) params.append("originDate", filter.originDate!.toString());
    this.httpClient.get(environment.apiUrl + environment.paths.documents, {
      params: params
    });
  }

}
