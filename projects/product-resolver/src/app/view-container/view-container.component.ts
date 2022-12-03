import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { TableColumn } from '../models/TableColumn.interface';
import { ProductApiService } from '../product-api.service';

@Component({
  selector: 'app-view-container',
  templateUrl: './view-container.component.html',
  styleUrls: ['./view-container.component.scss'],
})
export class ViewContainerComponent implements OnInit {
  // https://www.youtube.com/watch?v=BLLO2x7_R5M

  constructor(private productsService: ProductApiService) {}

  products: any;

  tableColmuns: TableColumn[] = [
    {
      name: 'Product id',
      dataKey: 'id',
      isSortable: true,
      position: 'right',
    },
    {
      name: 'Title',
      dataKey: 'title',
      isSortable: true,
      position: 'right',
    },
    {
      name: 'Price',
      dataKey: 'price',
      isSortable: true,
      position: 'right',
    },
    {
      name: 'Product description',
      dataKey: 'description',
    },
    {
      name: 'Category',
      dataKey: 'category',
      isSortable: true,
      position: 'right',
    },
    // {
    //   name: 'Image',
    //   dataKey: 'image',
    // },
    {
      name: 'Product rating',
      dataKey: 'rate',
    },
    {
      name: 'Amount of opinions',
      dataKey: 'count',
    },

    { name: 'Edit', dataKey: 'edit' },
  ];

  ngOnInit(): void {
    this.products = this.productsService
      .getProducts()
      .pipe(tap((value) => console.log(value)))
      .subscribe((data: any) => (this.products = data));
  }

  ngAfterViewInit(): void {
    console.log(this.products);
  }
}
