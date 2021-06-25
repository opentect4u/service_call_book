import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
export interface PeriodicElement {
  Ticket_No: any;
  Client_Name: any;
  Phone_no:any;
  Assigned_to:any;
  Priority:any;
  Ticket_Status:any;
  Edit:any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Ticket_No: 1,
    Client_Name:1,
    Phone_no: 'abc',
    Assigned_to:'',
    Priority:'123',
    Ticket_Status:'',
   Edit:''
  }, 
  
];


@Component({
  selector: 'app-assignticket',
  templateUrl: './assignticket.component.html',
  styleUrls: ['./assignticket.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css'

]
})
export class AssignticketComponent implements OnInit {

  displayedColumns: string[] = ['Ticket_No', 'Client_Name','Phone_no','Assigned_to','Priority','Ticket_Status','Edit'];
  dataSource = new MatTableDataSource<PeriodicElement> (ELEMENT_DATA); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private router:Router) { }

  ngOnInit(): void {
    localStorage.setItem('address', '/operations/assignticket');


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
    this.router.navigate(['/operations/editassignticket'])
  }



}
