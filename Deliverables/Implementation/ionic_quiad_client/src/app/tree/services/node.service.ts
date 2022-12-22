import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/account/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  public getNodes(owner: number) {
    const account  = this.authService.Account!;
    const token = account.token!;
    return this.httpClient.get(environment.apiUrl + environment.paths.nodes + "/" + owner);
  }

}
