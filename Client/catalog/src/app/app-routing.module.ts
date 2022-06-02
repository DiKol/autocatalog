import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandGridComponent } from './features/brand/components/table/brand.grid.component';
import { ModelGridComponent } from './features/model/components/table/model.grid.component';

const routes: Routes = [
  {
    path: 'brands',
    component: BrandGridComponent
  },
  {
    path: 'models',
    component: ModelGridComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
