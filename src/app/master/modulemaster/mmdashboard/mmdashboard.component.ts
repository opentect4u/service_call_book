import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
const SHOW_MM=gql`
query{
  getModuleTypeData(id:"", db_type: 5){
    module_id
    module_type
  }
}`
// export interface PeriodicElement {
//   Sl_No: any;
//   Module: any;
//   Edit:any;
  
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     Sl_No: 1,
//     Module: 'abc',
//     Edit:''
   
//   }, 
  
// ];
@Component({
  selector: 'app-mmdashboard',
  templateUrl: './mmdashboard.component.html',
  styleUrls: ['./mmdashboard.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class MmdashboardComponent implements OnInit {

  displayedColumns: string[] = ['Sl_No', 'Module','Edit'];
  dataSource = new MatTableDataSource; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  loading: boolean=false;
  posts_mm: any;
  private querySubscription: Subscription = new Subscription;
  constructor(private router:Router,private apollo:Apollo) { }


  ngOnInit(): void {
    localStorage.setItem('address','/mastermodule/dashboard'); 
    this.fetch_data();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetch_data(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: SHOW_MM,
      pollInterval:100
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.posts_mm = data;
        console.log(this.posts_mm);
       this.putdata(this.posts_mm);
      });

  }
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.getModuleTypeData);
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
    this.router.navigate(['/mastermodule/addmm'])
  }
  go_to_update(v1:any,v2:any){
    this.router.navigate(['/mastermodule/editmm',v1,v2])
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
