import { IDeactivableComponent } from './../models/IDeactivableComponent';
import {} from './../app-routing.module';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from '../dialog-component/dialog/confirmation-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class CanDeactiveFormService
  implements CanDeactivate<IDeactivableComponent>
{
  component!: IDeactivableComponent;
  route!: ActivatedRouteSnapshot;

  constructor(private dialog: MatDialog) {}

  canDeactivate(
    component: IDeactivableComponent
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canDeactivate triggered');

    if (component.isDataSaved()) {
      return of(true);
    }
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = '250px';
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.data = {
      title: 'Please confirm',
      content: 'You have unsaved changes- are you sure you wanna leave?',
    };
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );

    return dialogRef.afterClosed();
  }
}
