import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  /**
   * 
   * @param data - data that arrives for a service that show on the dialog
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

}
