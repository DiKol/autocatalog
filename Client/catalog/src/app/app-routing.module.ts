import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandGridComponent } from './features/brand/components/table/brand.grid.component';

const routes: Routes = [
  {
    path: 'brands',
    component: BrandGridComponent
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
