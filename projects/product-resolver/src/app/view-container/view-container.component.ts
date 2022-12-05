import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../product-api.service';

@Component({
  selector: 'app-view-container',
  templateUrl: './view-container.component.html',
  styleUrls: ['./view-container.component.scss'],
})
export class ViewContainerComponent implements OnInit {
  // https://www.youtube.com/watch?v=BLLO2x7_R5M

  constructor(private productService: ProductApiService) {
    return;
  }
  // initiate replay subject
  ngOnInit() {
    return this.productService.getProducts().subscribe();
  }
}
