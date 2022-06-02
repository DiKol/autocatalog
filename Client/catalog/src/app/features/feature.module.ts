import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { CarModule } from './car/car.module';
import { OverviewModule } from './overview/overview.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    BrandModule,
    ModelModule,
    CarModule,
    FormsModule,
    OverviewModule
  ],
  exports: []
})
export class FeatureModule { }
