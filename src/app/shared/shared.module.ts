import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './Components/dialog/dialog.component';
import { SnackbarComponent } from './Components/snackbar/snackbar.component';



@NgModule({
  declarations: [
  
    DialogComponent,
       SnackbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
