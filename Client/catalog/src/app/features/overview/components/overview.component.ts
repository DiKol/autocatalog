import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog  } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Model } from 'src/app/core/model/model';
import { Brand } from 'src/app/core/model/brand';
import { ModelDataService } from '../../model/service/model-data.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { BrandDataService } from '../../brand/service/brand-data.service';
import { Car } from 'src/app/core/model/car';
import { CarDataService } from '../../car/service/car-data.service';

interface TNode {
  id: number;
  name: string;
  children?: TNode[];
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})


export class OverviewComponent implements AfterViewInit, OnInit {

  treeControl = new NestedTreeControl<TNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TNode>();

  cars: Car[] =[];
  flexstyle: { [klass: string]: any; } = {};
  count: number = 8;
  @ViewChild('xrow') xrow!: ElementRef;

  constructor(
    public httpClient: HttpClient,
    public modelService: ModelDataService,
    public brandService: BrandDataService,
    public carService: CarDataService,
  ) {

    this.carService.getCars().subscribe(cars=>{

      for (var i = 0; i < cars.length; i++)
      {
        this.cars.push(cars[i]);
      }

    });


    let TREE_DATA: TNode[] = [];

    brandService.getBrands().subscribe(brands => {
      modelService.getModels().subscribe(models => {
        brands.forEach(elem => {
          var children: TNode[] = [];
          var childs = models.filter(x => x.brand.id == elem.id);
          childs.forEach(c => {

            let cnode: TNode = {
              id: c.id,
              name: c.name
            };
            children.push(cnode);
          });

          let node: TNode = {
            id: elem.id,
            name: elem.name,
            children: childs
          };
          TREE_DATA.push(node);


        });
        this.dataSource.data = TREE_DATA;

      });
    });

  }

  hasChild = (_: number, node: TNode) => !!node.children && node.children.length > 0;


  filterBrand(id:number){}
  filterModel(id:number){}

  ngAfterViewInit() {
    var w = this.xrow.nativeElement.offsetWidth/5-1;
    this.flexstyle = { flex: '1 0 ' + w + 'px' };
  }

  ngOnInit() {
  }

}
