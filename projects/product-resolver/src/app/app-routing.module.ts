import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from './product.resolver';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListResolver } from './product-list.resolver';
import { EditProductComponent } from './product/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: { productList: ProductListResolver },
  },
  {
    path: 'edit/:id',
    component: EditProductComponent,
    resolve: { product: ProductResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
