import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ConstantModule {
  messages = {
    DELETE_CONFIRMATION_MESSAGE: 'Are you sure, You want to delete!'
  }
}
