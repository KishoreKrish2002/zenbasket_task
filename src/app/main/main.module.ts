import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { ConstantModule } from '../constant/constant.module';



@NgModule({
  declarations: [
    ProductListComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ConstantModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class MainModule { }
