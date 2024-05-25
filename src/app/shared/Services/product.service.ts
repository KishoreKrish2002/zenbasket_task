import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllProducts, DeleteRes, OneProduct, CreateCallData, UpdateProduct } from 'src/app/models/models.module';
import { HttpClient } from '@angular/common/http';
import { HttpRoutingService } from './http-routing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /**
   * @param httpService - Service have methoda of crud operation
   */
  constructor(
    private httpService: HttpRoutingService,
    private clientService: HttpClient
  ) { }
  /**
   * Funcition for create rows in db
   * @param data - variabel have paroduct details for creation
   * @returns - response of the call in observable type
   */
  createProduct(data: CreateCallData): Observable<OneProduct> {
    return this.httpService.postMethod('/product', data) as Observable<OneProduct>;
  }
  /**
   * Funciton for fetch all datas form db
   * @returns - response of the call in observable type
   */
  getAllProduct(): Observable<AllProducts> {
    return this.httpService.getMethod('/product') as Observable<AllProducts>;
  }
  /**
   * Function for get one particulat data form db
   * @param id - mention the particulat data
   * @returns - response of the call in observable type
   */
  getOneProduct(id: number): Observable<OneProduct> {
    return this.httpService.getMethod(`/product/${id}`) as Observable<OneProduct>;
  }
  /**
   * Function for update the datas in db
   * @param id - mention the particulat rows
   * @param data - having update datas
   * @returns - response of the call in observable type
   */
  updateProduct(id: number, data: CreateCallData): Observable<UpdateProduct> {
    return this.httpService.putMethod(`/product`, data, { id: id }) as Observable<UpdateProduct>;
  }
  /**
   * Funciton for deleting purticular rows in db
   * @param id - mention the particulat rows
   * @returns - response of the call in observable type
   */
  deleteProduct(id: number): Observable<DeleteRes> {
    return this.httpService.deleteMethod(`/product/${id}`) as Observable<DeleteRes>;
  }
}
