import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { ModelGridComponent } from './components/table/model.grid.component';
import { ModelEditComponent } from './components/dialogs/edit/model.edit.component';

@NgModule({
  declarations: [
    ModelGridComponent,
    ModelEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule

  ],
  exports: [
    ModelEditComponent,
    ModelGridComponent
  ]
})
export class ModelModule { }
