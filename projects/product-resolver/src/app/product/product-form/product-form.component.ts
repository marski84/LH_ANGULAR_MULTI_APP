import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  constructor(@Inject('formControls') private fromControl: []) {
    return;
  }

  ngOnInit(): void {
    console.log(this.fromControl);

    return;
  }
}
