import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit() {

    console.log("data on dialog: ", this.data);
  }

  afterClosed() {
    console.log("afterclosed");

  }

}
