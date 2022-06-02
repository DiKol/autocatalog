import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { BrandGridComponent } from './components/table/brand.grid.component';
import { BrandEditComponent } from './components/dialogs/edit/brand.edit.component';
import { BrandDataService } from './service/brand-data.service';

@NgModule({
  declarations: [
    BrandGridComponent,
    BrandEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule

  ],
  exports: [
    BrandEditComponent,
    BrandGridComponent
  ]
})
export class BrandModule { }
