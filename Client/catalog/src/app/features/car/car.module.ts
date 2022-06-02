import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { CarEditComponent } from './components/dialogs/edit/car.edit.component';
import { CarGridComponent } from './components/table/car.grid.component';



@NgModule({
  declarations: [
    CarGridComponent,
    CarEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule

  ],
  exports: [
    CarEditComponent,
    CarGridComponent
  ]
})
export class CarModule { }
