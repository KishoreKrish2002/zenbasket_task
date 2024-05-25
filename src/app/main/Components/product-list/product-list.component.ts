import { Component, WritableSignal, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, map, mergeMap, of, switchMap } from 'rxjs';
import { AllProducts, ApiError, DeleteRes, ProductData } from 'src/app/models/models.module';
import { CommonDialogService } from 'src/app/shared/services/common-dialog.service';
import { CommonSnackbarService } from 'src/app/shared/services/common-snackbar.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Message } from 'src/app/shared/constant/message.constant';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends Message {
  /**
   * Subscription object to store subscribed details
   */
  subscriptionObj = new Subscription();
  /**
   * Variable use for store product detials
   */
  productListData!: Array<ProductData>
  /**
   * Form control variable for store serach input values
   */
  searchText!: FormControl;
  /**
   * A writable signal used for display the cart count
   */
  cartCount: WritableSignal<number> = signal(0);
  /**
   * @param productService - Service for perform various operation on product list
   * @param dialogService - Service for implement dialog functionalities
   * @param router - Variable for get param datas
   */
  constructor(
    private productService: ProductService,
    private dialogService: CommonDialogService,
    private router: Router,
    private snackbarService: CommonSnackbarService
  ) {
    super();
  }
  /**
   * Angular life cycle hook calls first
   */
  ngOnInit(): void {
    this.searchText = new FormControl('');
    this.getAllProducts();
    this.onSearch();
  }
  /**
   * Function used for implementing search operaiton
   */
  onSearch(): void {
    this.subscriptionObj.add(
      // Use pipe rxjs operator to take one observable and emit combinaton of observable values 
      this.searchText.valueChanges.pipe(
        // switchMap to perform a async call for a getAllProduct 
        switchMap((searchData: string) => this.productService.getAllProduct().pipe(
          // map operator for performing operaitons on the return datas of switchMap
          map((productData: AllProducts) => productData && productData.productList && productData.productList.rows && productData.productList.rows
            //filter operator for get the matching datas of searched string
            .filter((filterData: ProductData) => filterData && filterData.name && filterData.name.toLowerCase().includes(searchData && searchData.toLowerCase())))
        ))
      ).subscribe({
        next: (result: Array<ProductData>) => {
          //Get the response and assign to the vairable
          this.productListData = result;
        },
        error: (err: ApiError) => {
          this.snackbarService.openSnackBar(this.snackbarMessage.SOMETING_WENT_WRONG, this.snackbarMessage.ERROR_ACTION);
        }
      }));
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
    const dialogRef = this.dialogService.openDialog(this.snackbarMessage.WANT_TO_CANCEL);
    this.subscriptionObj.add(
      dialogRef.afterClosed().pipe(mergeMap((res: boolean) => {
        if (res) {
          // make delete call if get response
          return this.productService.deleteProduct(id);
        } else {
          // else return observable of null
          return of(null)
        }
      })).subscribe({
        next: (res: DeleteRes) => {
          // if get delete response make getAllProduct call to display the current rows
          if (res && res.success) {
            this.getAllProducts();
            this.snackbarService.openSnackBar(this.snackbarMessage.PRODUCT_DELETE_SUCCESSFULLY, this.snackbarMessage.SUCCESS_ACTION);
          }
        },
        error: (err: ApiError) => {
          this.snackbarService.openSnackBar(this.snackbarMessage.SOMETING_WENT_WRONG, this.snackbarMessage.ERROR_ACTION);
        }
      })
    )
  }
  /**
   * Funciton for fetch all products
   */
  getAllProducts(): void {
    this.subscriptionObj.add(
      // Make getAllProduct call to display on view
      this.productService.getAllProduct().subscribe({
        next: (data: AllProducts) => {
          // after getting data assingning the corresponding datas to the corresponding variable
          if (data && data.productList && data.productList.rows && data.productList.rows.length) {
            this.productListData = data.productList.rows;
          } else {
            this.productListData = [];
          }
        },
        error: (err: ApiError) => {
          this.snackbarService.openSnackBar(this.snackbarMessage.FAILED_TO_FETCH, this.snackbarMessage.ERROR_ACTION);
        }
      })
    )
  }
  /**
   * Function that implements tha angular signal concept that update tha cart count
   */
  addCart(): void {
    this.cartCount.update(x => x + 1);
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
