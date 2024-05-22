import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpRoutingService {
  constructor(private httpService: HttpClient) { }

  url = environment.url;
  message !: any;

  postMethod(url: any, data: any) {
    console.log(this.url + '/v1' + url, data);
    return this.httpService.post(this.url + '/v1' + url, data);
  }

  getMethod(url: any) {
    console.log(this.url + '/v1' + url);
    return this.httpService.get(this.url + '/v1' + url);
  }

  putMethod(url: any, data: any, queryParam: any) {
    console.log(this.url + '/v1' + url, data, queryParam);

    return this.httpService.put(this.url + '/v1' + url, data, {
      params: queryParam,
    })
  }

  deleteMethod(url: any) {
    return this.httpService.delete(this.url + '/v1' + url)
  }

}
