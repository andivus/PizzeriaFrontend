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
    const cartString = sessionStorage.getItem('cart');
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
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
}
