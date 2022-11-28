import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products-list',
    loadChildren: () =>
      import(
        './modules/products-list/products-list/product-list-routing.module'
      ).then((module) => module.ProductsListRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
