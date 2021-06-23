import { Component, OnDestroy, OnInit,  ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
const SHOW_OP=gql`
query{
  getOprnModeData(id:"", db_type: 2){
    oprn_id
    oprn_mode
  }
}`;
// export interface PeriodicElement {
//   Sl_No: any;
//   Operational_Mode: any;
//   Edit:any;
  
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     Sl_No: 1,
//     Operational_Mode: 'abc',
//     Edit:''
   
//   }, 
  
// ];
@Component({
  selector: 'app-omdashboard',
  templateUrl: './omdashboard.component.html',
  styleUrls: ['./omdashboard.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css'

]
})

export class OmdashboardComponent implements OnInit,OnDestroy{
  displayedColumns: string[] = ['Sl_No', 'Operational_Mode','Edit'];
  dataSource = new MatTableDataSource;
  private querySubscription: Subscription = new Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading: boolean=false;
  posts_om: any=[];

  constructor(private router:Router,private apollo:Apollo) { }

  ngOnInit(): void {
    localStorage.setItem('address','/operationmode/dashboard'); 
    this.posts_om.length=0;
    this.fetch_data();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetch_data(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: SHOW_OP,
      pollInterval:100
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        console.log(data+" "+loading);
        this.posts_om = data;
       
        console.log(this.posts_om);
       this.putdata(this.posts_om);
      });

  }
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.getOprnModeData);
    console.log(this.dataSource);
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
  go_to_AddItem(){
    this.router.navigate(['/operationmode/addom'])
  }
  go_to_update(v1:any,v2:any){
    //console.log(v1+" "+v2);
    this.router.navigate(['/operationmode/editom',v1,v2])
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
