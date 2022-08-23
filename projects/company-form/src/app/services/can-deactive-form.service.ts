import { CanDeactivateRoute } from './../app-routing.module';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DialogComponent } from '../dialog-component/dialog/dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class CanDeactiveFormService
  implements CanDeactivate<CanDeactivateRoute>
{
  component!: CanDeactivateRoute;
  route!: ActivatedRouteSnapshot;

  constructor(private dialog: MatDialog) {}

  canDeactivate(
    component: CanDeactivateRoute
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canDeactivate triggered');

    if (!component.isDataSaved()) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.width = '250px';
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;
      dialogConfig.data = {
        title: 'Please confirm',
        content: 'You have unsaved changes- are you sure you wanna leave?',
      };
      const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

      return dialogRef.afterClosed();
    }
    return of(true);
  }
}
