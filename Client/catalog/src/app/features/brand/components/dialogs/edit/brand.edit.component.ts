import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Brand } from 'src/app/core/model/brand';
import { BrandDataService } from '../../../service/brand-data.service';

@Component({
  selector: 'app-brand.edit.dialog',
  templateUrl: './brand.edit.component.html',
  styleUrls: ['./brand.edit.component.scss']
})

export class BrandEditComponent implements OnInit {

  title = '';
  formControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<BrandEditComponent>,
    @Inject(MAT_DIALOG_DATA) public brand: Brand,
    public service: BrandDataService)
    { }

  ngOnInit() {
    this.title = !this.brand.id ? 'Add Brand' : 'Edit Brand';
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  close(): void {
    this.dialogRef.close();
  }

  public edit(): void {
    if (!this.brand.id) {
      this.service.addBrand(this.brand).subscribe(x=> this.brand = x);
    } else {
      this.service.updateBrand(this.brand).subscribe(x=> this.brand = x);
    }
  }
}
