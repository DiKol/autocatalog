import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModelDataService } from '../../../service/model-data.service';
import { Model } from 'src/app/core/model/model';
import { BrandDataService } from 'src/app/features/brand/service/brand-data.service';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/core/model/brand';


@Component({
  selector: 'app-model.edit.dialog',
  templateUrl: './model.edit.component.html',
  styleUrls: ['./model.edit.component.scss']
})

export class ModelEditComponent implements OnInit {

  title = '';
  formControl = new FormControl('', [Validators.required]);
  brands: Brand[];
  selectedBrandId!: number;

  constructor(
    public dialogRef: MatDialogRef<ModelEditComponent>,
    @Inject(MAT_DIALOG_DATA) public model: Model,
    public service: ModelDataService,
    public brandService:BrandDataService)
    {
      if (!this.model.id) {
        this.model.brand = new Brand();
      }
      this.brands = [];
    }

  ngOnInit() {
    this.brandService.getBrands().subscribe(b => this.brands = b);
    this.title = !this.model.id ? 'Add Model' : 'Edit Model';
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  close(): void {
    this.dialogRef.close();
  }

  public edit(): void {
    if (!this.model.id) {
      this.service.addModel(this.model).subscribe(x=> this.model = x);
    } else {
      this.service.updateModel(this.model).subscribe(x=> this.model = x);
    }
  }
}
