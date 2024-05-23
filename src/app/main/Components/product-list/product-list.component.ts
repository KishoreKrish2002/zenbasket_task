import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, mergeMap, of } from 'rxjs';
import { AllProducts, DeleteRes, Rows } from 'src/app/models/models.module';
import { CommonDialogService } from 'src/app/shared/Services/common-dialog.service';
import { ProductService } from 'src/app/shared/Services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  
  subscriptionObj = new Subscription();
  productListData!: Array<Rows>;
  constructor(
    private productService: ProductService,
    private dialogService: CommonDialogService,
    private router: Router
  ) { }
  ngOnInit() {
    
    this.getAllProducts();
  }

  onEditProduct(id: number) {
    this.router.navigate(['add-product', id]);
  }

  onDeleteProduct(id: number) {
    const dialogRef = this.dialogService.openDialog('Are you sure you want to delete!');

    dialogRef.afterClosed().mergeMap((res: any) => {
      if (res) {
        return this.productService.deleteProduct(id);
      } else {
        return of(null)
      }
    })
    // this.subscriptionObj.add(
    //   this.dialogService.dialogReturn$.subscribe((res: boolean) => {
    //     console.log("dialgo returns: ", res);
    //     if (res) {
    //       this.productService.deleteProduct(id).subscribe((res: DeleteRes) => {
    //         if (res.success) {
    //           this.getAllProducts();
    //         }
    //       })
    //     }
    //   })
    // )
  }

  getAllProducts() {
    this.subscriptionObj.add(
      this.productService.getAllProduct().subscribe((data: AllProducts) => {
        if (data && data.productList && data.productList.rows && data.productList.rows.length) {
          this.productListData = data.productList.rows;
        }
      })
    )
  }

  ngOnDestroy() {
    if (this.subscriptionObj) {
      this.subscriptionObj.unsubscribe();
    }
  }
}
