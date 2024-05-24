import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, mergeMap, of } from 'rxjs';
import { OneProduct, Rows, updateProduct } from 'src/app/models/models.module';
import { ProductService } from 'src/app/shared/Services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  /**
   * Variable used to handle form values
   */
  myGroup!: FormGroup;
  /**
   * Variable used for store product details
   */
  productDetails!: Rows;
  /**
   * Subscription object vairable to add subscribed datas
   */
  subscriptonObj = new Subscription();
  /**
   * 
   * @param productService - call backend apis for the required methods
   * @param route - route for get param datas
   */
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  /**
   * Angular life cycle hook calls first
   */
  ngOnInit() {
    this.subscriptonObj.add(
      this.route.params.pipe(mergeMap((res: any) => {
        console.log("param rsL ", res);

        this.formInitilizer();
        if (res && res.id) {
          return this.productService.getOneProduct(res.id);
        }
        return of(null);
      })).subscribe({
        next: (res: any) => {
          this.productDetails = res.productDetails;
          this.patchFormFieldValues();
        },
        error: (err) => {
          console.error(err);
        }
      })
    );
  }
  /**
   * Initilizing form and validation
   */
  formInitilizer() {
    this.myGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      price: new FormControl(null, Validators.required)
    })
  }
  /**
   * Patching form value and updation
   */
  patchFormFieldValues() {
    this.myGroup.patchValue({
      name: this.productDetails && this.productDetails.name,
      description: this.productDetails && this.productDetails.description,
      price: this.productDetails && this.productDetails.price
    })
  }
  /**
   * Function calls on clicking submit button
   */
  onSubmit() {
    if (this.myGroup.valid) {
      if (this.myGroup && this.myGroup.value) {
        this.subscriptonObj.add(
          this.productService.createProduct(this.myGroup.value).subscribe({
            next: (res: OneProduct) => {
              if (res) this.router.navigate(['/']);
            },
            error: (err) => {
              console.error(err);
            }
          })
        )
      }
    }
  }
  /**
   * Function for handle update event
   */
  onUpdate() {
    if (this.myGroup.valid) {
      if (this.myGroup && this.myGroup.value) {
        this.subscriptonObj.add(
          this.productService.updateProduct(this.productDetails.id, this.myGroup.value).subscribe({
            next: (res: updateProduct) => {
              if (res) this.router.navigate(['/']);
            },
            error: (err) => {
              console.error(err);
            }
          })
        )
      }
    }
  }
  /**
   * Function for send instruction for candeactivate route guard to allow use to go back or not
   * @returns boolean value that make input of canDeactivate guard
   */
  onDeactivate(): boolean {
    // var flag = false;
    // if (!this.myGroup.dirty) {
    //   flag = true;
    // } else {
    //   const dialogRef = this.dialogService.openDialog('Are you sure you want to leave!');
    //   dialogRef.afterClosed().subscribe({
    //     next: (res: boolean) => {
    //       flag = res;
    //     },
    //     error: (err: any) => {
    //       console.error(err);
    //     }
    //   });
    // }
    // return flag
    console.log("value on add deactivate: ", this.myGroup && this.myGroup?.dirty ? false : true);

    return this.myGroup && this.myGroup?.dirty ? false : true;
  }
  /**
   * Angular life cycle hook calls last
   */
  ngOnDestroy() {
    this.subscriptonObj.unsubscribe();
  }

}
