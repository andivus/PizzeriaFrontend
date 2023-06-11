export default interface ItemCreateRequest {
  name: string;
  description: string;
  imageUrl: string;
  price: number,
  isActive: boolean;
  stock: number;
}
