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

interface TNode {
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

  //models$: Observable<Model[]>;

  constructor(
    public httpClient: HttpClient,
    public modelService: ModelDataService,
    public brandService: BrandDataService
  ) {


    let TREE_DATA: TNode[] = [];

    brandService.getBrands().subscribe(brands=>
      {
        modelService.getModels().subscribe(models=>
          {
            brands.forEach(elem => {
              //elem.id
              var children : TNode[] = [];
              var childs = models.filter(x=>x.brand.id == elem.id);
              childs.forEach(c => {

                let cnode: TNode = {
                  name: c.name
                };
                children.push(cnode);
               });

               let node: TNode = {
                name: elem.name,
                children : childs
              };
              TREE_DATA.push(node);


          });
          this.dataSource.data = TREE_DATA;

      });

    });

  }

  hasChild = (_: number, node: TNode) => !!node.children && node.children.length > 0;



  ngAfterViewInit() {

  }

  ngOnInit() {

  }


}
