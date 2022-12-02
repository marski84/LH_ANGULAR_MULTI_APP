import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from './product.resolver';
import { ProductComponent } from './product/product.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent,
  },

  {
    path: 'edit/:id',
    component: ProductComponent,
    resolve: [
      {
        product: ProductResolver,
      },
    ],
  },
  {
    path: 'addProduct',
    component: ProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsListRoutingModule {}
