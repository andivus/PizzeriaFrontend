import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private _http: HttpClient
  ) { }

  urlString = `${environment.apiUrl}/orders`

  headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }

  getOrders(): Observable<any> {
    return this._http.get(this.urlString, this.headers)
  }

  createOrder(request: any): Observable<any> {
    return this._http.post(this.urlString, request, this.headers)
  }

  
}
