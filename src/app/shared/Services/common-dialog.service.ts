import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CommonDialogService {
  /**
  * @param dialog - Dialog service to show dialog box
  */
  constructor(public dialog: MatDialog) { }
  /**
   * Function for open dialog
   * @param message - have the dialog message
   * @returns - Reutrn the refference of dialog
   */
  openDialog(message: string): any {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: message
    });
    return dialogRef;
  }
}
