import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductModuleComponent } from './product-module/product-module.component';
import { WholesalerModuleComponent } from './wholesaler-module/wholesaler-module.component';
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
