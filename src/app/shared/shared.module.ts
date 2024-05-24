import { NgModule } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './Components/dialog/dialog.component';
import { SnackbarComponent } from './Components/snackbar/snackbar.component';
import { ProductStyleDirective } from './Services/product-style.directive';
import { FormatPricePipe } from './Services/format-price.pipe';



@NgModule({
  declarations: [

    DialogComponent,
    SnackbarComponent,
    ProductStyleDirective,
    FormatPricePipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ProductStyleDirective,
    FormatPricePipe
  ]
})
export class SharedModule { }
