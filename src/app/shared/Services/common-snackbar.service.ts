import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class CommonSnackbarService {
  durationInSeconds = 5000000;

  constructor(private _snackBar: MatSnackBar) { }
  /**
   * 
   * @param message - have messag for snackbar
   * @param action - reperesent the action of the snackbar
   */
  openSnackBar(message: string, action: string): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass: (action === 'success') ? 'snackbar-success' : (action === 'error') ? 'snackbar-error' : 'sncakbar-warinig',
      data: {
        message: message
      }
    });
  }
}
