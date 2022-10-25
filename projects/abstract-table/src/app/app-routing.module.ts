import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WholesalerComponent } from './modules/wholesaler-module/wholesaler/wholesaler.component';
import { ContainerComponent } from './container/container.component';
import { ProductComponent } from './modules/product-module/product/product.component';
import { AbstractTableModule } from './modules/abstract-table-module/abstract-table.module';

const routes: Routes = [
  { path: '', component: ContainerComponent },
  {
    path: 'product',
    // loadChildren: () =>
    //   import('./modules/product-module/product.module').then(
    //     (m) => m.ProductModule
    //   ),
    component: ProductComponent,
  },
  {
    path: 'wholesaler',
    pathMatch: 'full',
    loadChildren: async () =>
      (await import('./modules/wholesaler-module/wholesaler.module'))
        .WholesalerModule,

    // component: WholesalerComponent,
  },
];

// 3mb (1mb per module/component)

// lazy loading
// 1mb - kolejnego modułu

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
