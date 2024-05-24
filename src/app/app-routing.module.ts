import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './main/Components/product-list/product-list.component';
import { AddProductComponent } from './main/Components/add-product/add-product.component';
import { canDeactivateGuard } from './shared/Services/can-deactivate.guard';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'add-product/:id', component: AddProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
