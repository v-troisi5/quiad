import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Document, IDocument } from '../models/document';

import { DocumentService } from './document.service';

describe('DocumentService', () => {
  let service: DocumentService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(DocumentService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should find a list of documents", () => {
    const idocuments: IDocument[] = [
      {
        id: 1,
        name: "Registro delle nascite",
        categoryId: 1,
        originDate: new Date("2022-01-01").toString(),
        retrievalDate: new Date("2022-01-01").toString(),
        originPlace: "Salerno",
        retrievalPlace: "Salerno"
      }
    ]
    const _ = idocuments.map(d => new Document(d));
    spyOn(httpClient, "get").and.returnValue(of(idocuments));
    service.findDocuments({
      originPlace: "Salerno"
    }).subscribe(documents => {
      expect(documents).toEqual(_);
    });
  });

});
