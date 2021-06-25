import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



export interface PeriodicElement {
  UserId: number;
  Username: string;
  UserType: any[];

}

const ELEMENT_DATA: PeriodicElement[] = [
  {UserId: 1, Username: 'Suman Mitra',  UserType: [{value:'A',usertype:'Admin'},{value:'T',usertype:'Telecaller'},{value:'E',usertype:'Engineer'},{value:'C',usertype:'Client'}]},
  {UserId: 2, Username: 'Somnath Thakur',  UserType: [{value:'A',usertype:'Admin'},{value:'T',usertype:'Telecaller'},{value:'E',usertype:'Engineer'},{value:'C',usertype:'Client'}]},
  {UserId: 3, Username: 'Utsav Roy',  UserType: [{value:'A',usertype:'Admin'},{value:'T',usertype:'Telecaller'},{value:'E',usertype:'Engineer'},{value:'C',usertype:'Client'}]},
  {UserId: 4, Username: 'Tanmoy Mondal',  UserType: [{value:'A',usertype:'Admin'},{value:'T',usertype:'Telecaller'},{value:'E',usertype:'Engineer'},{value:'C',usertype:'Client'}]},
  {UserId: 5, Username: 'Subham Barua',  UserType: [{value:'A',usertype:'Admin'},{value:'T',usertype:'Telecaller'},{value:'E',usertype:'Engineer'},{value:'C',usertype:'Client'}]},
  {UserId: 6, Username: 'Chittaranjan Maity', UserType: [{value:'A',usertype:'Admin'},{value:'T',usertype:'Telecaller'},{value:'E',usertype:'Engineer'},{value:'C',usertype:'Client'}]},
  {UserId: 7, Username: 'Lokesh Kr Jha', UserType: [{value:'A',usertype:'Admin'},{value:'T',usertype:'Telecaller'},{value:'E',usertype:'Engineer'},{value:'C',usertype:'Client'}]},
  {UserId: 8, Username: 'Suvrojit Monadal',  UserType: [{value:'A',usertype:'Admin'},{value:'T',usertype:'Telecaller'},{value:'E',usertype:'Engineer'},{value:'C',usertype:'Client'}]},
  {UserId: 9, Username: 'Raja Saha', UserType: [{value:'A',usertype:'Admin'},{value:'T',usertype:'Telecaller'},{value:'E',usertype:'Engineer'},{value:'C',usertype:'Client'}]},
  {UserId: 10, Username: 'Neon',  UserType: [{value:'A',usertype:'Admin'},{value:'T',usertype:'Telecaller'},{value:'E',usertype:'Engineer'},{value:'C',usertype:'Client'}]},
];


@Component({
  selector: 'app-usermaintanance',
  templateUrl: './usermaintanance.component.html',
  styleUrls: ['./usermaintanance.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class UsermaintananceComponent implements OnInit {
  support:any='A';
  collect:any;
   data:any;
   active:any;
   deactive:any;
   a_status:any;
   d_status:any;
  displayedColumns: string[] = ['Username', 'UserId', 'UserType','Status'];
  dataSource=new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('address','/operations/Admin/usermaintanance')
    this.dataSource=new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.data=this.dataSource.filteredData.length;
   console.log(this.dataSource.filteredData.length);
 
 
   
     
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  sendstatus(v:any){
    // this.dataSource=new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      console.log("Value:",v)
        this.a_status=document.getElementById("a");
     this.d_status=document.getElementById("i");
     if(v==1){
      this.a_status.checked=true;
      this.d_status.checked=false;

     }
     else{
      this.a_status.checked=false;
      this.d_status.checked=true;

     }

    //   for (let i=0;i<this.dataSource.filteredData.length;i++){
    //  this.active=document.getElementById("active");
    //  this.deactive=document.getElementById("deactive");
    //  this.a_status=document.getElementById("a");
    //  this.d_status=document.getElementById("i");
    //  this.collect=v;
    //   if(this.collect==1){
    //     this.a_status.checked=true;
    //     this.active.checked=true;
    //     this.deactive.checked=false;
    //     this.d_status.checked=false;

    //   }
    //   else{
    //     this.a_status.checked=false;
    //     this.d_status.checked=true;
    //     this.deactive.checked=true;
    //     this.active.checked=false;
    //   }
    // }
  }

//   onRowClicked(row:any) {
//     console.log('Row clicked: ', row);
// }
}
  
  


