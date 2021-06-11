import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
export interface PeriodicElement {
  Sl_No: any;
  Client_Code: any;
  Name:any;
  Type:any;
  Phone:any;
  
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Sl_No: 1,
    Client_Code:1,
    Name: 'abc',
    Type:'',
    Phone:'123',
    
   
  }, 
  
];

@Component({
  selector: 'app-addclientdashboard',
  templateUrl: './addclientdashboard.component.html',
  styleUrls: ['./addclientdashboard.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddclientdashboardComponent implements OnInit {

  displayedColumns: string[] = ['Sl_No', 'Client_Code','Name','Type','Phone'];
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
    this.router.navigate(['/addclient/addcl'])   ; 
  }
  go_to_update(v1:any,v2:any){
    //this.router.navigate(['/addemp/editemp'])
  }


}
