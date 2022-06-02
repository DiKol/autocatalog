import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { OverviewComponent } from './components/overview.component';

@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule

  ],
  exports: [
    OverviewComponent
  ]
})
export class OverviewModule { }
