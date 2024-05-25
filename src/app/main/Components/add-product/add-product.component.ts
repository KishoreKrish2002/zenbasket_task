import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, mergeMap, of } from 'rxjs';
import { ApiError, OneProduct, ProductData, UpdateProduct } from 'src/app/models/models.module';
import { CommonDialogService } from 'src/app/shared/services/common-dialog.service';
import { CommonSnackbarService } from 'src/app/shared/services/common-snackbar.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Message } from 'src/app/shared/constant/message.constant';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent extends Message {
  /**
   * Variable used to handle form values
   */
  myGroup!: FormGroup;
  /**
   * Variable used for store product details
   */
  productDetails!: ProductData;
  /**
   * Subscription object vairable to add subscribed datas
   */
  subscriptonObj = new Subscription();
  /**
   * 
   * @param productService - call backend apis for the required methods
   * @param route - route for get param datas
   * @param router - to process the navigation operation
   * @param dialogService - to perform the dialog operatoions
   * @param snackbarService - to perform a snackbar service
   */
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: CommonDialogService,
    private snackbarService: CommonSnackbarService
  ) { super() }
  /**
   * Angular life cycle hook calls first
   */
  ngOnInit(): void {
    this.getSingleProduct();
  }
  /**
   * Function used to fetch the single product detail
   */
  getSingleProduct(): void {
    this.formInitilizer();
    this.subscriptonObj.add(
      //Get the param data and process with mergemap
      this.route.params.pipe(mergeMap((res: any) => {
        if (res && res.id) {
          //return the single product detail based on the param id
          return this.productService.getOneProduct(res.id);
        }
        // if not res it return observabel of null
        return of(false);
      })).subscribe({
        next: (res: any) => {
          // assign the subscribed value to product detial
          if (res && res.productDetails) {
            this.productDetails = res.productDetails;
            this.patchFormFieldValues();
          }
        },
        error: (err: ApiError) => {
          this.snackbarService.openSnackBar(this.snackbarMessage.SOMETING_WENT_WRONG, this.snackbarMessage.ERROR_ACTION);
        }
      })
    );
  }
  /**
   * Initilizing form and validation
   */
  formInitilizer(): void {
    this.myGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      price: new FormControl(null, Validators.required)
    })
  }
  /**
   * Patching form value and updation
   */
  patchFormFieldValues(): void {
    // Patch the value on update senario
    this.myGroup.patchValue({
      name: this.productDetails && this.productDetails.name,
      description: this.productDetails && this.productDetails.description,
      price: this.productDetails && this.productDetails.price
    })
  }
  /**
   * Function calls on clicking submit button
   */
  onSubmit(): void {
    if (this.myGroup.valid) {
      if (this.myGroup && this.myGroup.value) {
        this.subscriptonObj.add(
          // make the create product call to sotre the details on db
          this.productService.createProduct(this.myGroup.value).subscribe({
            next: (res: OneProduct) => {
              // if create the row successfully it navigates the all product page
              if (res) {
                this.snackbarService.openSnackBar(this.snackbarMessage.PRODUCT_ADDED_SUCCESSFULLY, this.snackbarMessage.SUCCESS_ACTION);
                this.router.navigate(['/']);
              }
            },
            error: (err: ApiError) => {
              this.snackbarService.openSnackBar(this.snackbarMessage.SOMETING_WENT_WRONG, this.snackbarMessage.ERROR_ACTION);
            }
          })
        )
      }
    }
  }
  /**
   * Function for handle update event
   */
  onUpdate(): void {
    if (this.myGroup.valid) {
      if (this.myGroup && this.myGroup.value) {
        this.subscriptonObj.add(
          // make the update call to update the row
          this.productService.updateProduct(this.productDetails.id, this.myGroup.value).subscribe({
            next: (res: UpdateProduct) => {
              // if update the row successfully it navigates the all product page
              if (res) {
                this.router.navigate(['/']);
                this.snackbarService.openSnackBar(this.snackbarMessage.UPDATE_PRODUCT_SUCCESSFULLY, this.snackbarMessage.SUCCESS_ACTION);
              }
            },
            error: (err: ApiError) => {
              this.snackbarService.openSnackBar(this.snackbarMessage.SOMETING_WENT_WRONG, this.snackbarMessage.ERROR_ACTION);
            }
          })
        )
      }
    }
  }
  /**
   * Function calls when click the reset function
   */
  onReset(): void {
    if (this.productDetails) {
      // make a getOneProduct call to fetch the single product detail
      this.getSingleProduct();
    } else {
      // if it is not a update senario it reset the form
      this.myGroup.reset();
    }
  }
  /**
   * Function call while click the cancel button
   */
  onCancel(): void {
    if (this.myGroup.dirty) {
      // Call common dialog component when the form is dirty
      const dialogRef = this.dialogService.openDialog(this.productDetails ? this.snackbarMessage.WANT_TO_CANCEL : this.snackbarMessage.WANT_TO_GO_BACK);
      this.subscriptonObj.add(
        //Subscribe the returned boolean value form dialog box
        dialogRef.afterClosed().subscribe((res: boolean) => {
          if (res) {
            // it navigates the all product page
            this.router.navigate(['/']);
          }
        }, (err: ApiError) => {
          this.snackbarService.openSnackBar(this.snackbarMessage.SOMETING_WENT_WRONG, this.snackbarMessage.ERROR_ACTION);
        })
      )
    } else {
      // it navigates the all product page when it not a update senario
      this.router.navigate(['/']);
    }
  }
  /**
   * Angular life cycle hook calls last
   */
  ngOnDestroy(): void {
    this.subscriptonObj.unsubscribe();
  }

}
