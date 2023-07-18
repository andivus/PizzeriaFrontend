import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(
    private _http: HttpClient
  ) { }

  urlString = `${environment.apiUrl}/items`

  headers = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }

  getItems(): Observable<any> {
    return this._http.get(this.urlString, this.headers)
  }

  createItem(request: any): Observable<any> {
    return this._http.post(this.urlString, request, this.headers)
  }

  getItem(id: number): Observable<any> {
    return this._http.get(this.urlString + `/${id}`, this.headers)
  }

  removeItem(id: number): Observable<any> {
    return this._http.delete(this.urlString + `/${id}`, this.headers)
  }

  updateItem(id: number, request: any): Observable<any> {
    return this._http.put(this.urlString + `/${id}`, request, this.headers)
  }
}
