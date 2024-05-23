import { Injectable } from '@angular/core';
import { HttpRoutingService } from './http-routing.service';
import { Observable } from 'rxjs';
import { AllProducts, DeleteRes, OneProduct, Rows, createCallData, updateProduct } from 'src/app/models/models.module';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpService: HttpRoutingService
  ) { }

  createProduct(data: createCallData): Observable<OneProduct> {
    return this.httpService.postMethod('/product', data) as Observable<OneProduct>;
  }

  getAllProduct(): Observable<AllProducts> {
    return this.httpService.getMethod('/product') as Observable<AllProducts>;
  }

  getOneProduct(id: number): Observable<OneProduct> {
    return this.httpService.getMethod(`/product/${id}`) as Observable<OneProduct>;
  }

  updateProduct(id: number, data: createCallData): Observable<updateProduct> {
    return this.httpService.putMethod(`/product`, data, { id: id }) as Observable<updateProduct>;
  }

  deleteProduct(id: number): Observable<DeleteRes> {
    return this.httpService.deleteMethod(`/product/${id}`) as Observable<DeleteRes>;
  }

}
