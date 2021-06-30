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
  dataSource = new MatTableDataSource<any> (); 
  Tickite:any;
  edittickit:boolean=true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private router:Router,private apollo:Apollo) { }

  ngOnInit(): void {
       if( localStorage.getItem('edittickit')=='1'){
            this.edittickit=false;
       }
     
    localStorage.setItem('address', '/operations/assignticket');

    this.fetch_data();
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
    console.log("v1:" +v1);
    this.router.navigate(['/operations/editassignticket',v1])
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
  localStorage(){
    localStorage.setItem('edittickit','0');
    this.edittickit=true;
}





}
