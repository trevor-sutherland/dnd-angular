import { Injectable }                          from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map }                     from 'rxjs/operators';
import { Observable, Subject, takeUntil }      from 'rxjs';
import { environment }                         from '../environments/environment';
import { MysqlError }                          from 'mysql';

@Injectable({
  providedIn: 'root'
})
export class NodeService
{

  private myNodeServer = environment.nodeServer;
  myURLBase = 'https://www.dnd5eapi.co';

  serverError = new Subject<MysqlError | unknown>();
  boolServerError = new Subject<boolean>();
  boolLoading = new Subject<boolean>();
  private destroy$ = new Subject<void>();

  constructor(private httpClient: HttpClient)
  {}

  NODE_POST<Type>(myQueryBody: HttpParams, myQueryUrl: string): Observable<Type>
  {
    const QueryBody = myQueryBody?.toString()
    const QueryUrl = this.myNodeServer + myQueryUrl;
    const token = localStorage.getItem('user-token');
    const parsedToken = token || '';
    const headers = new HttpHeaders(
      {
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${parsedToken}`
      })
    const myOptions = { headers: headers };
    const myHttpClient = this.httpClient.post<Type>(QueryUrl, QueryBody, myOptions)
    return this.myQueryPipe(myHttpClient)
  }

  SendToNode<Type>(myQuery: string, myQueryBody?: HttpParams): Observable<Type>
  {
    const QueryBody = myQueryBody?.toString()
    const QueryUrl = this.myNodeServer + myQuery;
    const token = localStorage.getItem('user-token');
    const parsedToken = token || '';
    const headers = new HttpHeaders(
      {
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${parsedToken}`
      })
    const myOptions = { headers: headers };
    const myHttpClient = this.httpClient.post<Type>(QueryUrl, QueryBody, myOptions)
    return this.myQueryPipe(myHttpClient)
  }

  // This pipes the response and catches errors
  myQueryPipe<Type>(myHttpClient: Observable<Type>): Observable<Type>
  {
    return myHttpClient.pipe(map(
      (response): Type =>
      {
        if (this.dbQueryError(response)) this.boolLoading.next(false)
        return response;
      }),
    catchError(error =>
    {
      console.log(error);
      this.boolLoading.next(false);
      throw this.setServerError(error)
    }),
    takeUntil(this.destroy$)
    )
  }

  dbQueryError<Type> (response: Type): boolean
  {
    if (JSON.stringify(response).includes("RequestError") || JSON.stringify(response).includes("Authentication unsuccessful"))
    {
      this.setServerError(response);
      return true;
    }
    return false;
  }

  // Set boolean for server error
  setServerError(error: MysqlError | unknown): void
  {
    this.serverError.next(error);
    this.boolServerError.next(true);
    this.boolLoading.next(false);
    throw error
  }
}
