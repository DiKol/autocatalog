import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CarDataService } from '../../../service/car-data.service';
import { Car } from 'src/app/core/model/car';
import { Brand } from 'src/app/core/model/brand';
import { BrandDataService } from 'src/app/features/brand/service/brand-data.service';
import { ModelDataService } from 'src/app/features/model/service/model-data.service';
import { Model } from 'src/app/core/model/model';



@Component({
  selector: 'app-car.edit.dialog',
  templateUrl: './car.edit.component.html',
  styleUrls: ['./car.edit.component.scss']
})

export class CarEditComponent implements OnInit {

  title = '';
  formControl = new FormControl('', [Validators.required]);
  brands: Brand[];
  selectedBrandId!: number;
  models: Model[];
  selectedModelId!: number;

  constructor(
    public dialogRef: MatDialogRef<CarEditComponent>,
    @Inject(MAT_DIALOG_DATA) public car: Car,
    public service: CarDataService,
    public brandService:BrandDataService,
    public modelService:ModelDataService,)
    {
      this.brands = [];
      this.models = [];
    }

  ngOnInit() {
    this.title = !this.car.id ? 'Add Car' : 'Edit Car';
    this.brandService.getBrands().subscribe(b => {
      this.brands = b;
      if(!this.car.id){
        this.selectedBrandId = 0;
      } else{
        this.selectedBrandId = this.car.model.brand.id;
        this.modelService.getModelsByBrand(this.selectedBrandId).subscribe(b => { this.models = b; this.selectedModelId = this.car.model.id;});
      }
    });
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  brandChanged(event:any)
  {
    this.modelService.getModelsByBrand(event.value).subscribe(b => this.models = b);
  }

  modelChanged(event:any)
  {}

  close(): void {
    this.dialogRef.close();
  }

  public edit(): void {
    this.car.modelId = this.selectedModelId;

    if (!this.car.id) {
      this.service.addCar(this.car).subscribe(x=> this.car = x);
    } else {
      this.service.updateCar(this.car).subscribe(x=> this.car = x);
    }
  }
}
