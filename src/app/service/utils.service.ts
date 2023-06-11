import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  handleImageError(event: Event): void {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = './assets/images/stock-pizza.jpg';
  }
}
