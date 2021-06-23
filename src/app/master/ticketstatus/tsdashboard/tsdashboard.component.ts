import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
const SHOW_TS=gql`
query{
  getTktStatusData(id:"", db_type: 3){
    tkt_id
    tkt_status
  }
}`
// export interface PeriodicElement {
//   Sl_No: any;
//   Status: any;
//   Edit:any;
  
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     Sl_No: 1,
//     Status: 'abc',
//     Edit:''
   
//   }, 
  
// ];
@Component({
  selector: 'app-tsdashboard',
  templateUrl: './tsdashboard.component.html',
  styleUrls: ['./tsdashboard.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css'

]
})
export class TsdashboardComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = ['Sl_No', 'Status','Edit'];
  dataSource = new MatTableDataSource; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading: boolean=false;
  posts_ts: any=[];
  private querySubscription: Subscription = new Subscription;
  constructor(private router:Router,private apollo:Apollo) { }
 

  ngOnInit(): void {
    localStorage.setItem('address','/ticketstatus/dashboard');  
    this.posts_ts.length=0;
    this.fetch_data();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetch_data(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: SHOW_TS,
      pollInterval:100
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.posts_ts = data;
       
        console.log(this.posts_ts);
       this.putdata(this.posts_ts);
      });

  }
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.getTktStatusData);
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
    this.router.navigate(['/ticketstatus/addts'])
  }
  go_to_update(v1:any,v2:any){
    this.router.navigate(['/ticketstatus/editts',v1,v2])
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
