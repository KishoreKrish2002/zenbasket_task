import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OneProduct, Rows, updateProduct } from 'src/app/models/models.module';
import { ProductService } from 'src/app/shared/Services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  myGroup!: FormGroup;
  productDetails!: Rows;
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
    if (this.route && this.route.params) {
      this.subscriptonObj.add(
        this.route.params.subscribe((res: any) => {
          this.paramDatas.id = res.id;
          this.productService.getOneProduct(res.id)
            .subscribe((res: OneProduct) => {
              this.productDetails = res.productDetails;
              this.formInitilizer();
            })
        })
      );
    }

    this.formInitilizer();
  }

  formInitilizer() {
    if (!this.productDetails) {
      this.isUpdateScenario = false;
    } else {
      this.isUpdateScenario = true;
    }
    this.myGroup = new FormGroup({
      name: new FormControl(this.productDetails && this.productDetails.name ? this.productDetails.name : null),
      description: new FormControl(this.productDetails && this.productDetails.description ? this.productDetails.description : null),
      price: new FormControl(this.productDetails && this.productDetails.price ? this.productDetails.price : null)
    })
  }

  onSubmit() {
    if (this.myGroup.valid) {
      if (this.myGroup && this.myGroup.value) {

        if (!this.isUpdateScenario) {
          this.productService.createProduct(this.myGroup.value).subscribe((res: OneProduct) => {
            if (res) this.myGroup.reset();
          });
        } else {

          this.productService.updateProduct(this.productDetails.id, this.myGroup.value).subscribe((res: updateProduct) => {
            if (res) this.myGroup.reset();
          })
        }
      }
    }
  }

  ngOnDestroy() {
    this.subscriptonObj.unsubscribe();
  }

  onDeactivate() {
    return this.myGroup ? !this.myGroup.dirty : true;
  }
}
