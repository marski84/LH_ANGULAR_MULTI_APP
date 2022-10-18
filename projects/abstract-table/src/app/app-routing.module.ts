import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WholesalerComponent } from './modules/wholesaler-module/wholesaler/wholesaler.component';
import { ContainerComponent } from './container/container.component';
import { ProductComponent } from './modules/product-module/product/product.component';

const routes: Routes = [
  { path: '', component: ContainerComponent },
  { path: 'product', component: ProductComponent },
  { path: 'wholesaler', component: WholesalerComponent },
];

// 3mb (1mb per module/component)

// lazy loading
// 1mb - kolejnego modułu

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
