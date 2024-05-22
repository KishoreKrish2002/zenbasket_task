import { Injectable } from '@angular/core';
import { HttpRoutingService } from './http-routing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpService: HttpRoutingService
  ) { }

  createProduct(data: any) {
    return this.httpService.postMethod('/product', data)
  }

  getAllProduct() {
    return this.httpService.getMethod('/product');
  }

  getOneProduct(id: any) {
    return this.httpService.getMethod(`/product/${id}`);
  }

  updateProduct(id: any, data: any) {
    return this.httpService.putMethod(`/product`, data, { id: id });
  }

  deleteProduct(id: any) {
    return this.httpService.deleteMethod(`/product/${id}`);
  }

}
