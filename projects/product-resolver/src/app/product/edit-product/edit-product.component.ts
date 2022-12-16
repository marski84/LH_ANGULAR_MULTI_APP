import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  providers: [{ provide: 'formControls', useValue: ['a', 'b', 'c'] }],
})
export class EditProductComponent implements OnInit {
  constructor() {
    return;
  }

  ngOnInit(): void {
    return;
  }
}
