import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { PeriodicElement } from '../table/table.component';
import { TableColumn } from '../models/TableColumn.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, AfterViewInit {
  constructor(private productsService: ProductsService) {}

  // https://www.youtube.com/watch?v=BLLO2x7_R5M

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
