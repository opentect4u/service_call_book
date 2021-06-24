import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router'
import {Apollo, gql} from 'apollo-angular';
const SHOW_CLIENT=gql`
query getClient($active: String){
  getClient(id:"", active: $active){
    id
    client_name
    client_type
    phone_no
    district_name
  }
}`
// export interface PeriodicElement {
//   Sl_No: any;
//   Client_Code: any;
//   Name:any;
//   Type:any;
//   Phone:any;
  
  
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     Sl_No: 1,
//     Client_Code:1,
//     Name: 'abc',
//     Type:'',
//     Phone:'123',
    
   
//   }, 
  
// ];

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


  displayedColumns: string[] = ['Client_Code','Name','Type','Phone','District','Edit','Delete'];

  

  dataSource = new MatTableDataSource; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  updt=true;
  insrt=true;
  updatec:any;
  insertc:any;

  constructor(private router:Router,private apollo:Apollo) { }
  posts:any;
  ngOnInit(): void {

    localStorage.setItem('address', '/addclient/dashboard');

    this.updatec=localStorage.getItem('updatec')
    this.insertc=localStorage.getItem('addc')
    console.log(this.updatec)
    if(this.updatec=='0')
    {
       this.updt=true;
    }
    else
       {
         this.updt=false;
         localStorage.setItem('updatec','0')

       }
       if(this.insertc=='0')
       {
          this.insrt=true;
       }
       else
          {
            this.insrt=false;
            localStorage.setItem('addc','0')
   
          }

    this.fetch_data(1);
    //this.fetch_data(1);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  fetch_data(v:any){
    this.apollo.watchQuery<any>({
      query: SHOW_CLIENT,
      pollInterval:100,
      variables:{
        active:v.toString()
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        
        this.posts = data;
       console.log(data)
        console.log(this.posts);
       this.putdata(this.posts);
      });

  }
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.getClient);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  go_to_AddItem(){
    this.router.navigate(['/addclient/addcl']); 
  }
  go_to_update(v1:any){
    this.router.navigate(['/addclient/editclient',v1])
  }
delete(){}
sendstatus(v:any){
  this.fetch_data(v);
  //this.fetch_data(v);
}
}
