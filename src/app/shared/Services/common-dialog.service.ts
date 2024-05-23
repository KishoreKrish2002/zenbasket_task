import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../Components/dialog/dialog.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonDialogService {

  constructor(public dialog: MatDialog) { }
  public dialogReturn$ = new BehaviorSubject<any>(null);

  openDialog(message: string): any {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: message
    });

    return dialogRef;

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    //   if (result) {
    //     this.dialogReturn$.next(true);

    //   }
    // });
  }
}
