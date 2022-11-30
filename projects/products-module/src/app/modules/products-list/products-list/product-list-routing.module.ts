import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from '../table/table.component';
import { ProductComponent } from '../../product/product/product.component';
import { ProductResolverService } from '../product-resolver.service';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: ProductComponent,
    data: { isNewProduct: false },
    resolve: [
      {
        products: ProductResolverService,
      },
    ],
  },
  {
    path: 'addProduct',
    component: ProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ProductsListRoutingModule {}
