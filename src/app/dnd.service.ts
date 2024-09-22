import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject }                 from 'rxjs';
import { Injectable }                          from '@angular/core';
import { environment }                         from '../environments/environment';
import { MysqlError }                          from 'mysql';
import { NodeService }                         from './node.service';
import { User }                                from '../interfaces/user';
import md5                                     from 'md5';

@Injectable({
  providedIn: 'root'
})
export class DNDService
{
  private myNodeServer = environment.nodeServer;
  myURLBase = 'https://www.dnd5eapi.co';

  serverError = new Subject<MysqlError | unknown>();
  boolServerError = new Subject<boolean>();
  boolLoading = new Subject<boolean>();
  private destroy$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient,
    private nodeService: NodeService)
  {}

  callAPI<Type>(endpoint: string): Observable<Type>
  {
    const apiCall = `${this.myURLBase}${endpoint}`
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const myOptions = { headers: headers };
    const myHttpClient = this.httpClient.get<Type>(apiCall, myOptions);
    return myHttpClient
  }

  CreateAccount<Type>(myUser: User): Observable<Type>
  {
    console.log(myUser)
    const QueryUrl = "user/CreateUser"
    const QueryBody = new HttpParams().appendAll(
      {
        UserID:       'null',
        Username:     myUser.Username,
        UsernameHash: md5(myUser.Username),
        FirstName:    myUser.FirstName,
        LastName:     myUser.LastName,
        PasswordHash: md5(myUser.Password),
        Email:        myUser.Email
      }
    );
    return this.nodeService.NODE_POST<Type>(QueryBody, QueryUrl)
  }

  UserLogin(username: string, password: string): Observable<User[]>
  {
    const QueryUrl = "user/Login";
    const QueryBody = new HttpParams().appendAll(
      {
        UsernameHash: md5(username),
        PasswordHash: md5(password)
      });
    return this.nodeService.NODE_POST<User[]>(QueryBody, QueryUrl)
  }

  Authorize(username: string, password: string): Observable<{ accessToken: string }>
  {
    const QueryUrl = "user/Authorize";
    const QueryBody = new HttpParams().appendAll(
      {
        UsernameHash: md5(username),
        PasswordHash: md5(password),
        timestamp:    Date.now()
      });
    return this.nodeService.NODE_POST<{ accessToken: string }>(QueryBody, QueryUrl)
  }
}
