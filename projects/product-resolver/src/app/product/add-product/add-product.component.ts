import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductFormComponent } from '../product-form/product-form.component';

const formControlNames = ['title', 'price', 'description', 'category', 'image'];
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [{ provide: 'formControlNames', useValue: formControlNames }],
})
export class AddProductComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddProductComponent> //   boolean
  ) {}

  @ViewChild('addProductForm') addProductForm!: ProductFormComponent;

  ngOnInit(): void {
    return;
  }

  handleAddProduct() {
    if (this.addProductForm.productForm.valid) {
      console.log(this.addProductForm.productForm.getRawValue());

      this.dialogRef.close(this.addProductForm.productForm.getRawValue());
    }
  }

  handleCloseForm() {
    this.dialogRef.close();
    console.log(this.addProductForm.productForm.valid);
  }
}
