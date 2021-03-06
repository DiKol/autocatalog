import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandGridComponent } from './features/brand/components/table/brand.grid.component';
import { CarGridComponent } from './features/car/components/table/car.grid.component';
import { ModelGridComponent } from './features/model/components/table/model.grid.component';
import { OverviewComponent } from './features/overview/components/overview.component';

const routes: Routes = [
  {
    path: 'brands',
    component: BrandGridComponent
  },
  {
    path: 'models',
    component: ModelGridComponent
  },
  {
    path: 'cars',
    component: CarGridComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
