import { NgModule } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { FormatPricePipe } from './services/format-price.pipe';
import { ProductStyleDirective } from './services/product-style.directive';



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
