import { Component } from '@angular/core';
import { HttpRoutingService } from 'src/app/shared/Services/http-routing.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  constructor(private httpService: HttpRoutingService) { }
  ngOnInit() {
    this.httpService.getMethod('/product').subscribe(data => {
      console.log(data);

    })
  }
}
