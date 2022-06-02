import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog  } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BrandEditComponent } from '../dialogs/edit/brand.edit.component';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/core/model/brand';
import { BrandDataService } from '../../service/brand-data.service';


@Component({
  selector: 'app-brand-grid',
  templateUrl: './brand.grid.component.html',
  styleUrls: ['./brand.grid.component.scss']
})

export class BrandGridComponent implements AfterViewInit, OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef | undefined;

  brands$: Observable<Brand[]>;
  //loading$: Observable<boolean>;

  displayedColumns = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<Brand> = new MatTableDataSource();

  constructor(
    public httpClient: HttpClient,
    public dialogService: MatDialog,
    public service: BrandDataService
  ) {
    this.brands$ = service.getBrands();
    //this.loading$ = this.organizationSelectors.loading$;
  }

  getBrands() {
    this.service.getBrands();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getBrands();
    this.brands$.subscribe(x => { this.dataSource = new MatTableDataSource(x); });
  }

  add() {
    let dialogRef = this.dialogService.open(BrandEditComponent, { data: {} });
    dialogRef.afterClosed().subscribe(result => {
      this.brands$ = this.service.getBrands();
      this.brands$.subscribe(x => { this.dataSource = new MatTableDataSource(x); });
    });
  }

  edit(i: number, id: number, name: string) {
    let dialogRef =this.dialogService.open(BrandEditComponent, { data: { id: id, name: name } });
    dialogRef.afterClosed().subscribe(result => {
      this.brands$ = this.service.getBrands();
      this.brands$.subscribe(x => { this.dataSource = new MatTableDataSource(x); });
    });

  }

  delete(i: number, id: string) {
    this.service.deleteBrand(id).subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
