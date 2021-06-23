import { Component, OnDestroy, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
const SHOW_PM=gql`
query{
  getPriorityModeData(id:"", db_type: 4){
    priority_id
    priority_mode
  }
}`
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
  selector: 'app-pmdashboard',
  templateUrl: './pmdashboard.component.html',
  styleUrls: ['./pmdashboard.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class PmdashboardComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = ['Sl_No', 'Operational_Mode','Edit'];
  dataSource = new MatTableDataSource; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  loading: boolean=false;
  posts_pm: any;
  private querySubscription: Subscription = new Subscription;
  constructor(private router:Router,private apollo:Apollo) { }

  ngOnInit(): void {
    this.fetch_data();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetch_data(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: SHOW_PM,
      pollInterval:100
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.posts_pm = data;
        console.log(this.posts_pm);
       this.putdata(this.posts_pm);
      });

  }
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.getPriorityModeData);
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
    this.router.navigate(['/prioritymode/addpm'])
  }
  go_to_update(v1:any,v2:any){
    this.router.navigate(['/prioritymodule/editpm',v1,v2])
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}