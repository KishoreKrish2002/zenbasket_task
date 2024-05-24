import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, filter, map, mergeMap, of, switchMap } from 'rxjs';
import { AllProducts, DeleteRes, Rows } from 'src/app/models/models.module';
import { CommonDialogService } from 'src/app/shared/Services/common-dialog.service';
import { ProductService } from 'src/app/shared/Services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  /**
   * Subscription object to store subscribed details
   */
  subscriptionObj = new Subscription();
  /**
   * Variable use for store product detials
   */
  productListData!: Array<Rows>;
  /**
   * Form control variable for store serach input values
   */
  serachText!: FormControl;
  /**
   * @param productService - Service for perform various operation on product list
   * @param dialogService - Service for implement dialog functionalities
   * @param router - Variable for get param datas
   */
  constructor(
    private productService: ProductService,
    private dialogService: CommonDialogService,
    private router: Router
  ) { }
  /**
   * Angular life cycle hook calls first
   */
  ngOnInit(): void {
    this.serachText = new FormControl('');
    this.getAllProducts();
    this.onSearch();
  }
  /**
   * Function used for implementing search operaiton
   */
  onSearch() {
    this.subscriptionObj.add(
      // Use pipe rxjs operator to take one observable and emit combinaton of observable values 
      this.serachText.valueChanges.pipe(
        // switchMap to perform a async call for a getAllProduct 
        switchMap((searchData: string) => this.productService.getAllProduct().pipe(
          // map operator for performing operaitons on the return datas of switchMap
          map((productData: AllProducts) => productData && productData.productList && productData.productList.rows && productData.productList.rows
            //filter operator for get the matching datas of searched string
            .filter((filterData: Rows) => filterData && filterData.name && filterData.name.toLowerCase().includes(searchData && searchData.toLowerCase())))
        ))
      ).subscribe({
        next: (result: Array<Rows>) => {
          this.productListData = result
        },
        error: (err) => {
          console.error(err);
        }
      })
    )
  }
  /**
   * Function for navigate the single product detail for edit operation
   * @param id - send id for a particulat product for edit
   */
  onEditProduct(id: number): void {
    this.router.navigate(['add-product', id]);
  }
  /**
   * Function for implement delete operaiton
   * @param id - send particular id of a product to delete call
   */
  onDeleteProduct(id: number): void {
    const dialogRef = this.dialogService.openDialog('Are you sure you want to delete?');
    this.subscriptionObj.add(
      dialogRef.afterClosed().pipe(mergeMap((res: boolean) => {
        if (res) {
          return this.productService.deleteProduct(id);
        } else {
          return of(null)
        }
      })).subscribe({
        next: (res: DeleteRes) => {
          if (res && res.success) {
            this.getAllProducts();
          }
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    )
  }
  /**
   * Funciton for fetch all products
   */
  getAllProducts(): void {
    this.subscriptionObj.add(
      this.productService.getAllProduct().subscribe({
        next: (data: AllProducts) => {
          if (data && data.productList && data.productList.rows && data.productList.rows.length) {
            this.productListData = data.productList.rows;
          } else {
            this.productListData = [];
          }
        },
        error: (err) => {
          console.error(err)
        }
      })
    )
  }
  /**
   * Angular life cycle hook calls at last
   */
  ngOnDestroy(): void {
    if (this.subscriptionObj) {
      this.subscriptionObj.unsubscribe();
    }
  }
}
