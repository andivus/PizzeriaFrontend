import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import OrderDTO, {OrderItem, OrderUpdateRequest} from "../model/order-dto";
import {UserUpdateResponse} from "../model/user-dto";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private _http: HttpClient
  ) { }

  private urlString = `${environment.apiUrl}/orders`
  private token = () => {
    return sessionStorage.getItem("token")
  }

  private headers = () => {
    return {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set("Authorization", this.token() ? `Bearer ${this.token()}` : "")
    }
  }

  getOrders(): Observable<any> {
    return this._http.get(this.urlString, this.headers())
  }

  createOrder(request: any): Observable<any> {
    return this._http.post(this.urlString, request, this.headers())
  }

  updateOrder(id: string, request: OrderUpdateRequest): Promise<OrderDTO | null> {
    return new Promise((resolve, reject) => {
      let result: OrderDTO | null = null
      const subscription = this._http.put<OrderDTO>(`${this.urlString}/${id}`, request, this.headers())
          .subscribe({
            next: (val: OrderDTO) => {
              result = val
            },
            error: (err) => {
              console.error(err);
              reject(err);
            },
            complete: () => {
              resolve(result);
            }
          });
    });
  }

    getOrderItems(id: string): Promise<OrderItem[]> {
        return new Promise((resolve, reject) => {
            let result: OrderItem[] = []
            const subscription = this._http.get<OrderItem[]>(`${this.urlString}/${id}/items`, this.headers())
                .subscribe({
                    next: (val: OrderItem[]) => {
                        result = val
                    },
                    error: (err) => {
                        console.error(err);
                        reject(err);
                    },
                    complete: () => {
                        resolve(result);
                    }
                });
        });
    }
}
