import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';


const GET_RAISETICKITE=gql`
query getSupportLogDtls($id:String!){
  getSupportLogDtls(id:$id){
    id
    client_name
    phone_no
    tkt_no
    emp_name
    priority
    tktStatus
  }
}`
;

@Component({
  selector: 'app-attendanddeliver',
  templateUrl: './attendanddeliver.component.html',
  styleUrls: ['./attendanddeliver.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AttendanddeliverComponent implements OnInit {
  Tickite:any;
  attendtickite:boolean=true;
  displayedColumns: string[] = ['Ticket_No', 'Client_Name','Phone_no','Assigned_to','Priority','Ticket_Status','Edit'];
  dataSource = new MatTableDataSource<any> (); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private router:Router,private apollo:Apollo) { }

  ngOnInit(): void {
    if( localStorage.getItem('attendent')=='1'){
      this.attendtickite=false;
     }
    localStorage.setItem('address', '/operations/attendanddeliver');
    this.fetch_data();
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
  go_to_update(v1:any){
    this.router.navigate(['/operations/editattendanddeliver',v1])
  }

  private fetch_data(){
    this.apollo.watchQuery<any>({
      query: GET_RAISETICKITE,
      variables:{
         id:""
      },
      pollInterval:500
      
    })
      .valueChanges
      .subscribe(({ data}) => {

         this.Tickite=data;
         this.putdata(this.Tickite);
      })

    
  }
  private putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.getSupportLogDtls);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  LocalStorage(){
    localStorage.setItem('attendent','0');
    this.attendtickite=false;
  }




}
