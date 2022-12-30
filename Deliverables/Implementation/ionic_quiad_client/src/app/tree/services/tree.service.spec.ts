import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { INode, Node } from '../models/node';
import { TreeModule } from '../tree.module';

import { TreeService } from './tree.service';

describe('TreeService', () => {
  let service: TreeService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TreeModule
      ]
    });
    service = TestBed.inject(TreeService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of nodes by ownerId', () => {
    const inodes: INode[] = [
      {
        id: 2,
        documents: [],
        ownerId: 1
      }
    ]
    const _ = inodes.map(n => new Node(n));
    spyOn(httpClient, "get").and.returnValue(of(inodes));
    service
      .getNodes(1)
      .subscribe(nodes => {
        expect(nodes).toEqual(_);
      });
  });

  it('should create a certain node', () => {
    const inodes: INode = {
        id: 2,
        firstname: "Mario",
        lastname: "Rossi",
        documents: [],
        ownerId: 1
    };
    spyOn(httpClient, "post").and.returnValue(of(inodes));
    const _ = new Node(inodes);
    service
      .createNode(_)
      .subscribe(node => {
        expect(node).toEqual(_);
      });
  });

  it('should modify a certain node', () => {
    const inodes: INode = {
        id: 2,
        firstname: "Mario",
        lastname: "Rossi",
        documents: [],
        ownerId: 1
    };
    spyOn(httpClient, "patch").and.returnValue(of(inodes));
    const _ = new Node(inodes);
    service
      .modifyNode(2, new Node({
        id: 2,
        firstname: "Mario",
        documents: []
      }))
      .subscribe(node => {
        expect(node).toEqual(_);
      });
    });
    
    it('should delete a certain node', () => {
      const inodes: INode = {
        id: 2,
        firstname: "Mario",
        lastname: "Rossi",
        ownerId: 1,
        documents: []
    };
    spyOn(httpClient, "delete").and.returnValue(of(inodes));
    const _ = new Node(inodes);
    service
      .deleteNode(2)
      .subscribe(node => {
        expect(node).toEqual(_);
      });
  });

  it('should bind a document to a node', () => {
    const inodes: INode = {
        id: 2,
        firstname: "Mario",
        lastname: "Rossi",
        ownerId: 1,
        documents: [
          {
            id: 1,
            categoryId: 1,
            name: "Registro delle nascite",
            retrievalDate: new Date().toString(),
            originDate: new Date().toString(),
            originPlace: "Salerno",
            retrievalPlace: "Salerno"
          }
        ]
    };
    spyOn(httpClient, "put").and.returnValue(of(inodes));
    const _ = new Node(inodes);
    service
      .bindDocument(2, 1)
      .subscribe(node => {
        expect(node).toEqual(_);
      });
  });

  it('should unbind a document from a node', () => {
    const inodes: INode = {
        id: 2,
        firstname: "Mario",
        lastname: "Rossi",
        ownerId: 1,
        documents: [
          {
            id: 1,
            categoryId: 1,
            name: "Registro delle nascite",
            retrievalDate: new Date().toString(),
            originDate: new Date().toString(),
            originPlace: "Salerno",
            retrievalPlace: "Salerno"
          }
        ]
    };
    spyOn(httpClient, "put").and.returnValue(of(inodes));
    const _ = new Node(inodes);
    service
      .unbindDocument(2, 3)
      .subscribe(node => {
        expect(node).toEqual(_);
      });
  });



});
