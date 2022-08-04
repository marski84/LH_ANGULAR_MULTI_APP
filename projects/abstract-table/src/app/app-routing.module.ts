import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductModuleComponent } from './abstract-table/product-module/product-module.component';
import { WholesalerModuleComponent } from './abstract-table/wholesaler-module/wholesaler-module.component';
import { ContainerComponent } from './container/container.component';

const routes: Routes = [
  { path: '', component: ContainerComponent },
  { path: 'product', component: ProductModuleComponent },
  { path: 'wholesaler', component: WholesalerModuleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
