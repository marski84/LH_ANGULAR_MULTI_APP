import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

const formControlNames = ['title', 'price', 'description', 'category', 'image'];
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [{ provide: 'formControlNames', useValue: formControlNames }],
})
export class AddProductComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<any> //   boolean
  ) {}

  ngOnInit(): void {
    return;
  }

  handleAddProduct(formData: any) {
    console.log(formData);
    this.dialogRef.close(formData);
  }

  handleCloseForm() {
    this.dialogRef.close();
  }
}
