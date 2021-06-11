import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router'
export interface PeriodicElement {
  Sl_No: any;
  Client_Type: any;
  Edit:any;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Sl_No: 1,
    Client_Type: 'abc',
    Edit:''
   
  }, 
  
];

@Component({
  selector: 'app-ctmdashboard',
  templateUrl: './ctmdashboard.component.html',
  styleUrls: ['./ctmdashboard.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css'
]
})

export class CtmdashboardComponent implements OnInit {


  displayedColumns: string[] = ['Sl_No', 'Client_Type','Edit'];
  dataSource = new MatTableDataSource<PeriodicElement> (ELEMENT_DATA); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;




  constructor(private router:Router) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  go_to_AddItem(){
    this.router.navigate(['/clienttype/addctm'])
  }
  go_to_update(v1:any,v2:any){
    this.router.navigate(['/clienttype/editctm'])
  }
}
