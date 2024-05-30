export default interface OrderDTO {
  uuid: string;
  purchaseDate: string;
  firstName: string;
  email: string;
  phone: number;
  city: string;
  firstAddress: string;
  totalPrice: number;
  status: string;
}

export interface CreateOrderRequest {
  firstName: string;
  email: string;
  phone: number;
  city: string;
  firstAddress: string;
  cart: { [itemId: number]: number };
}

export interface OrderItem {
  itemId: number;
  itemAmount: number;
  name: string;
  imageUrl: string;
}

export enum StatusType {
  ITEM_NOT_FOUND = "ITEM_NOT_FOUND",
  NO_ENOUGH_ITEMS = "NO_ENOUGH_ITEMS",
  CART_IS_EMPTY = "CART_IS_EMPTY"
}

export interface OrderUpdateRequest {
  firstName: string;
  email: string;
  phone: number;
  city: string;
  firstAddress: string;
  status: string;
}
