import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CreateOrderRequest} from "../model/order-dto";

@Injectable({
  providedIn: "root"
})
export class CartService {

  constructor(
    private _http: HttpClient
  ) { }

  urlString = `${environment.apiUrl}/orders`

  token = () => {
    return localStorage.getItem("token")
  }

  headers = () => {
    return {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set("Authorization", this.token() ? `Bearer ${this.token()}` : "")
    }
  }

  addOneToCart(itemId: number): void {
    const cart = this.getCart();
    if (cart[itemId] == null) cart[itemId] = 1
    else cart[itemId]++
    this.saveCart(cart);
  }

  removeOneFromCart(itemId: number): void {
    const cart = this.getCart();
    if (cart[itemId] == null) return
    if (cart[itemId] == 1) delete cart[itemId]
    cart[itemId]--
    this.saveCart(cart);
  }

  removeFullFromCart(itemId: number): void {
    const cart = this.getCart();
    if (cart[itemId] == null) return
    else delete cart[itemId];
    this.saveCart(cart);
  }

  getCart(): { [itemId: number]: number } {
    const cartString = localStorage.getItem('cart');
    return cartString ? JSON.parse(cartString) : {};
  }

  getItemAmount(id: number): any {
    const cart = this.getCart();
    if (cart[id] == null) return
    return cart[id];
  }

  isInCart(itemId: number): boolean {
    const cart = this.getCart();
    return cart[itemId] != null
  }

  hasItems(): boolean {
    const cart = this.getCart();
    if (cart == null) return false
    let i = 0
    Object.keys(cart).forEach(id => {
      if (cart[Number (id)] == 0 || cart[Number (id)] == null) i++
    } )

    return i != Object.keys(cart).length;

  }

  setToCart(itemId: number, amount: number) {
    const cart = this.getCart();
    cart[itemId] = amount
    this.saveCart(cart);
  }

  private saveCart(cart: { [itemId: number]: number }): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  createOrder(request: CreateOrderRequest): Observable<any> {
    return this._http.post(this.urlString, request, this.headers())
  }
}
