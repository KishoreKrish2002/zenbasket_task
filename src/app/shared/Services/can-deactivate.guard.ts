// import { Injectable } from '@angular/core';
// import { CanDeactivate, CanDeactivateFn } from '@angular/router';
// import { CommonDialogService } from './common-dialog.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class canDeactivateGuard implements CanDeactivate<any> {
//   constructor(private dialogService: CommonDialogService) {

//   }

//   canDeactivate(
//     component: any,
//     currentRoute: any,
//     currentState: any,
//     nextState: any
//   ) {
//     console.log("deactive value: ", component.onDeactivate());

//     if (!component.onDeactivate()) {
//       console.log("deacive inside a if", component.onDeactivate());
//       return false
//     } else {
//       console.log("deacive inside a else", component.onDeactivate());

//       const dialogRef = this.dialogService.openDialog('sdfsdfsa');
//       return dialogRef.afterClosed().subscribe((res: boolean) => {
//         console.log(res);

//       })

//     }
//   }
// }
// // export const canDeactivateGuard: CanDeactivateFn<unknown> = (component: any, currentRoute, currentState, nextState) => {
// //   console.log("can deactivete: ", component.onDeactivate());
// //   if (!component.onDeactivate())
// //     return false;
// //   else
// //     return true;
// // };

/**
 * Guard which is used to check whether the changes are saved when navigate to other page.
 */
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CommonDialogService } from './common-dialog.service';
/**
 * Abstract class method which is used to declare the canDeactivate method.
 */
export abstract class FormCanDeactivate {
  /**
   * abstract function,It can be implemented in component. Observable<boolean>|
   * @return {boolean}
   */
  abstract canDeactivate(): boolean;
}
/**
 * Guard which is used to check whether the changes are saved when navigate to other page
 */
@Injectable()
export class canDeactivateGuard implements CanDeactivate<FormCanDeactivate> {
  /**
   * Component constructor which is used to inject the required services.
   * @param dialogService To access the functions inside the DialogService.
   */
  constructor(private dialogService: CommonDialogService) {
  }
  /**
   * Method which is used to dispaly dialog when navigate to another route without saving from data.
   * @param component To get the FormCanDeactivate component.
   */
  canDeactivate(component: FormCanDeactivate): Observable<boolean> | boolean {
    // To check whether the component have unsaved changes.
    if (component && !component.canDeactivate()) {
      // If component have unsaved changes then create observable to return the selected value.
      return new Observable((observer: Observer<boolean>) => {
        const dialogRef = this.dialogService.openDialog("kjbkjnkjn");
        dialogRef.afterClosed().pipe(filter((result: boolean) => {
          return result;
        })).subscribe((res: any) => {
          observer.next(true);
          observer.complete();
        });
      }
      );
    } else {
      return true;
    }
  }
}

