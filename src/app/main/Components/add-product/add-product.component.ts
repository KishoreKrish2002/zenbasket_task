import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpRoutingService } from 'src/app/shared/Services/http-routing.service';
import { ProductService } from 'src/app/shared/Services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  myGroup!: any;
  productDetails!: any;
  paramDatas!: any;
  subscriptonObj = new Subscription();
  isUpdateScenario!: boolean;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.paramDatas = {};
    this.isUpdateScenario = false;
    console.log("outside a pram");
    if (this.route && this.route.params) {
      console.log("inside a pram", this.route.params);
      this.isUpdateScenario = true;
      this.subscriptonObj.add(
        this.route.params.subscribe((res: any) => {

          this.paramDatas.id = res.id;
          this.productService.getOneProduct(res.id)
            .subscribe((res: any) => {
              this.productDetails = res.productDetails;
              this.formInitilizer();
            })
        })
      );
    }
    console.log("product details on edit: ", this.productDetails);

    this.formInitilizer();
  }

  formInitilizer() {
    this.myGroup = new FormGroup({
      name: new FormControl(this.productDetails && this.productDetails.name ? this.productDetails.name : null),
      description: new FormControl(this.productDetails && this.productDetails.description ? this.productDetails.description : null),
      price: new FormControl(this.productDetails && this.productDetails.price ? this.productDetails.price : null)
    })
  }

  onSubmit() {
    console.log(this.myGroup.value);
    if (this.myGroup.valid) {
      if (this.myGroup && this.myGroup.value) {
        console.log(this.isUpdateScenario);

        if (!this.isUpdateScenario) {
          console.log("create");

          this.productService.createProduct(this.myGroup.value).subscribe((res: any) => {
            console.log("add response: ", res);
          });
        } else {
          console.log("update", this.productDetails.id, this.myGroup.value);

          this.productService.updateProduct(this.productDetails.id, this.myGroup.value).subscribe((res) => {
            console.log(res);

          })
        }
      }
    }
  }

  ngOnDestroy() {
    this.subscriptonObj.unsubscribe();
  }
}
