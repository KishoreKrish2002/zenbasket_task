import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpRoutingService {
  /**
   * url that arrives form environment file
   */
  url = environment.url;
  /**
   * @param httpService - http service comes form http client module to perform http operations
   */
  constructor(private httpService: HttpClient) { }
  /**
   * @param url - url arives form environment file
   * @param data - vairbale having data to update or create
 * @returns - response of the call in observable type
   */
  postMethod(url: any, data: any) {
    return this.httpService.post(this.url + '/v1' + url, data);
  }
  /**
   * @param url - url arives form environment file
   * @returns - response of the call in observable type
   */
  getMethod(url: any) {
    return this.httpService.get(this.url + '/v1' + url);
  }
  /**
   * @param url - url arives form environment file
   * @param data - data to identify datas to update
   * @param queryParam - querry param contains id for a particulat data
   * @returns - response of the call in observable type
   */
  putMethod(url: any, data: any, queryParam: any) {
    return this.httpService.put(this.url + '/v1' + url, data, {
      params: queryParam,
    })
  }
  /**
   * @param url - url arives form environment file
   * @returns - response of the call in observable type
   */
  deleteMethod(url: any) {
    return this.httpService.delete(this.url + '/v1' + url)
  }
}
