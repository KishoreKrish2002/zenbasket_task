import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createCallData } from 'src/app/models/models.module';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpRoutingService {
  constructor(private httpService: HttpClient) { }

  url = environment.url;

  postMethod(url: string, data: createCallData) {
    return this.httpService.post(this.url + '/v1' + url, data);
  }

  getMethod(url: string) {
    return this.httpService.get(this.url + '/v1' + url);
  }

  putMethod(url: string, data: createCallData, queryParam: any) {

    return this.httpService.put(this.url + '/v1' + url, data, {
      params: queryParam,
    })
  }

  deleteMethod(url: string) {
    return this.httpService.delete(this.url + '/v1' + url)
  }

}
