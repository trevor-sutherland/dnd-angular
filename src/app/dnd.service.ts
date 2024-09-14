import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DNDService {

  myURLBase = 'https://www.dnd5eapi.co';

  constructor(private httpClient: HttpClient) { }

  callAPI<Type>(endpoint: string): Observable<Type>
  {
    const apiCall = `${this.myURLBase}${endpoint}`
    const headers = new HttpHeaders({ 'Content-Type':  'application/json'});
    const myOptions = { headers: headers };
    const myHttpClient = this.httpClient.get<Type>(apiCall, myOptions);
    return myHttpClient
  }
}
