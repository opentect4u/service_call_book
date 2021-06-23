import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
const SHOW_EMP=gql`
query{
  getEmp(id:""){
    id
    emp_code
    emp_name
  }
}`
// export interface PeriodicElement {
//   Sl_No: any;
//   Employee_Code: any;
//   Name:any;
//   Edit:any;
  
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     Sl_No: 1,
//     Employee_Code:1,
//     Name: 'abc',
//     Edit:''
   
//   }, 
  
// ];
@Component({
  selector: 'app-addempdashboard',
  templateUrl: './addempdashboard.component.html',
  styleUrls: ['./addempdashboard.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddempdashboardComponent implements OnInit {

  displayedColumns: string[] = ['Sl_No', 'Employee_Code','Name','Edit'];
  dataSource = new MatTableDataSource; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  loading: boolean=false;
  posts_emp: any;
  private querySubscription: Subscription = new Subscription;
  constructor(private router:Router,private apollo:Apollo) { }


  ngOnInit(): void {
    localStorage.setItem('address', '/addemp/dashboard');
    this.fetch_data();
    //this.fetch_data();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetch_data(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: SHOW_EMP,
      pollInterval:100
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.posts_emp = data;
        console.log(this.posts_emp);
       this.putdata(this.posts_emp);
      });

  }
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.getEmp);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  go_to_AddItem(){
    this.router.navigate(['/addemp/adde'])   ; 
  }
  go_to_update(v1:any,v2:any,v3:any){
    //console.log(v1+" "+v2+" "+" "+v3);
    this.router.navigate(['/addemp/editemp',v1,v2,v3])
  }
}
