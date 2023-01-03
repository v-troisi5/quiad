import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { INode, Node } from '../models/node'

@Injectable()
export class TreeService {
  constructor(private httpClient: HttpClient) {}

  public getNodes(ownerId: number): Observable<Node[]> {
    return this.httpClient
      .get<INode[]>(
        environment.apiUrl + environment.paths.nodes + '/' + ownerId,
      )
      .pipe(
        map((nodes) => {
          const _ = nodes.map((node) => new Node(node))
          return _
        }),
      )
  }

  public createNode(node: Node): Observable<Node> {
    return this.httpClient
      .post<INode>(environment.apiUrl + environment.paths.nodes, {
        node,
      })
      .pipe(
        map((node) => {
          const _ = new Node(node)
          return _
        }),
      )
  }

  public modifyNode(id: number, node: Node): Observable<Node> {
    return this.httpClient
      .patch<INode>(environment.apiUrl + environment.paths.nodes + '/' + id, {
        node,
      })
      .pipe(
        map((node) => {
          const _ = new Node(node)
          return _
        }),
      )
  }

  public deleteNode(id: number) {
    return this.httpClient
      .delete<number[]>(environment.apiUrl + environment.paths.nodes + "/" + id)
      // .pipe(
      //   map((node) => {
      //     const _ = new Node(node);
      //     return _;
      //   }),
      // )
  }

  public bindDocument(node: number, document: number) {
    return this.httpClient
      .put<INode>(environment.apiUrl + environment.paths.nodes + "/" + node + "/bind/" + document, {})
      .pipe(
        map((node) => {
          const _ = new Node(node);
          return _;
        }),
      )
  }
  
  public unbindDocument(node: number, document: number) {
    return this.httpClient
      .put<INode>(environment.apiUrl + environment.paths.nodes + "/" + node + "/unbind/" + document, {})
      .pipe(
        map((node) => {
          const _ = new Node(node);
          return _;
        }),
      )
  }

}
