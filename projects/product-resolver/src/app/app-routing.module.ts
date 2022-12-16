import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductResolver } from './product.resolver';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListResolver } from './product-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: { productList: ProductListResolver },
  },
  {
    path: 'edit/:id',
    component: ProductComponent,
    resolve: { product: ProductResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
