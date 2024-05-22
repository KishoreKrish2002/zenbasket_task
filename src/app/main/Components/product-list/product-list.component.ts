import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/Services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  subscriptionObj = new Subscription();
  productListData: any;
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }
  ngOnInit() {
    this.subscriptionObj.add(
      this.productService.getAllProduct().subscribe((data: any) => {
        console.log(data);
        if (data && data.productList && data.productList.rows) {
          this.productListData = data.productList.rows;
        }
      })
    )
  }

  onEditProduct(id: any) {
    this.router.navigate(['add-product', id]);
  }

  onDeleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe((res: any) => {
      console.log("delete res: ", res);
      this.productListData = this.productListData.filter((data: any) => { return data.id !== id });
      console.log("log after del: ", this.productListData);

    })
  }

  ngOnDestroy() {
    if (this.subscriptionObj) {
      this.subscriptionObj.unsubscribe();
    }
  }
}
