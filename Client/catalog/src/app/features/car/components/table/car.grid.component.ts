import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog  } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CarDataService } from '../../service/car-data.service';
import { Car } from 'src/app/core/model/car';
import { CarEditComponent } from '../dialogs/edit/car.edit.component';

@Component({
  selector: 'app-car-grid',
  templateUrl: './car.grid.component.html',
  styleUrls: ['./car.grid.component.scss']
})

export class CarGridComponent implements AfterViewInit, OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef | undefined;

  cars$: Observable<Car[]>;

  displayedColumns = ['id', 'description', 'volume', 'brand', 'model', 'color', 'price', 'actions'];
  dataSource: MatTableDataSource<Car> = new MatTableDataSource();

  constructor(
    public httpClient: HttpClient,
    public dialogService: MatDialog,
    public service: CarDataService
  ) {
    this.cars$ = this.service.getCars();
  }

  getCars() {
    this.service.getCars();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getCars();
    this.cars$.subscribe(x => {
      this.dataSource = new MatTableDataSource(x);
    });
  }

  add() {
    let dialogRef = this.dialogService.open(CarEditComponent, { data: {} });
    dialogRef.afterClosed().subscribe(result => {
      this.cars$ = this.service.getCars();
      this.cars$.subscribe(x => { this.dataSource = new MatTableDataSource(x); });
    });
  }

  edit(i: number, row: any) {
    let dialogRef =this.dialogService.open(CarEditComponent, { data: row });
    dialogRef.afterClosed().subscribe(result => {
      this.cars$ = this.service.getCars();
      this.cars$.subscribe(x => { this.dataSource = new MatTableDataSource(x); });
    });

  }

  delete(i: number, id: string) {
    this.service.deleteCar(id).subscribe(x=> {
      this.cars$ = this.service.getCars();
      this.cars$.subscribe(x => { this.dataSource = new MatTableDataSource(x); });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
