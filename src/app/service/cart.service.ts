import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CartService {

  constructor() {}

  addOneToCart(itemId: number): void {
    const cart = this.getCart();
    if (cart[itemId] == null) cart[itemId] = 1
    else cart[itemId]++
    this.saveCart(cart);
  }

  removeOneFromCart(itemId: number): void {
    const cart = this.getCart();
    if (cart[itemId] == null || cart[itemId] == 1) return
    else cart[itemId]--
    this.saveCart(cart);
  }

  removeFullFromCart(itemId: number): void {
    const cart = this.getCart();
    if (cart[itemId] == null) return
    else delete cart[itemId];
    this.saveCart(cart);
  }

  getCart(): { [itemId: number]: number } {
    const cartString = sessionStorage.getItem('cart');
    return cartString ? JSON.parse(cartString) : {};
  }

  isInCart(itemId: number): boolean {
    const cart = this.getCart();
    return cart[itemId] != null
  }

  private saveCart(cart: { [itemId: number]: number }): void {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
}
