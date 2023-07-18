export default interface OrderDTO {
  uuid: string;
  purchaseDate: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  city: string;
  zipCode: number;
  firstAddress: string;
  secondAddress?: string;
  totalPrice: number;
  status: string;
  userIp?: string;
  userAgent?: string;
}
