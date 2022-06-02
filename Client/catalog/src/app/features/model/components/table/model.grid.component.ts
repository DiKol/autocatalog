import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog  } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Model } from 'src/app/core/model/model';
import { ModelDataService } from '../../service/model-data.service';
import { ModelEditComponent } from '../dialogs/edit/model.edit.component';



@Component({
  selector: 'app-model-grid',
  templateUrl: './model.grid.component.html',
  styleUrls: ['./model.grid.component.scss']
})

export class ModelGridComponent implements AfterViewInit, OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef | undefined;

  models$: Observable<Model[]>;

  displayedColumns = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<Model> = new MatTableDataSource();

  constructor(
    public httpClient: HttpClient,
    public dialogService: MatDialog,
    public service: ModelDataService
  ) {
    this.models$ = service.getModels();
  }

  getModels() {
    this.service.getModels();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getModels();
    this.models$.subscribe(x => { this.dataSource = new MatTableDataSource(x); });
  }

  add() {
    let dialogRef = this.dialogService.open(ModelEditComponent, { data: {} });
    dialogRef.afterClosed().subscribe(result => {
      this.models$ = this.service.getModels();
      this.models$.subscribe(x => { this.dataSource = new MatTableDataSource(x); });
    });
  }

  edit(i: number, id: number, name: string) {
    let dialogRef =this.dialogService.open(ModelEditComponent, { data: { id: id, name: name } });
    dialogRef.afterClosed().subscribe(result => {
      this.models$ = this.service.getModels();
      this.models$.subscribe(x => { this.dataSource = new MatTableDataSource(x); });
    });

  }

  delete(i: number, id: string) {
    this.service.deleteModel(id).subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
