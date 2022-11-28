import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    rate: ['', Validators.required],
    count: ['', Validators.required],
  });

  get idCtrl() {
    return this.productForm.get('id') as FormControl;
  }
  get titleCtrl() {
    return this.productForm.get('title') as FormControl;
  }
  get priceCtrl() {
    return this.productForm.get('price') as FormControl;
  }
  get descriptionCtrl() {
    return this.productForm.get('description') as FormControl;
  }
  get categoryCtrl() {
    return this.productForm.get('category') as FormControl;
  }
  get imageCtrl() {
    return this.productForm.get('image') as FormControl;
  }
  get rateCtrl() {
    return this.productForm.get('rate') as FormControl;
  }
  get countCtrl() {
    return this.productForm.get('count') as FormControl;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
