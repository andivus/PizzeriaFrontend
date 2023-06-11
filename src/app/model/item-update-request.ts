export default interface ItemUpdateRequest {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  isActive: boolean;
  stock: number;
}
