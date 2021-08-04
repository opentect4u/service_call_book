import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
const srch_dt= gql`
query searchByDate($frm_dt: String!, $to_dt: String!, $user_id: String!){
  searchByDate(frm_dt: $frm_dt, to_dt: $to_dt, user_id: $user_id){
    id
    log_in
    tkt_no
    client_name
    tktStatus
    emp_name
  }
 }
`;

@Component({
  selector: 'app-search-by-date',
  templateUrl: './search-by-date.component.html',
  styleUrls: ['./search-by-date.component.css',
  '../../../assets/css/font-awesome.css',
  '../../../assets/css/apps.css',
  '../../../assets/css/apps_inner.css',
   '../../../assets/css/res.css']
})
export class SearchByDateComponent implements OnInit {

  constructor(private activatedroute:ActivatedRoute,private apollo:Apollo,private router:Router) { }
   from_date:any;
   to_date:any;
   posts:any;
   type:any;
   dt:any;
   public now: Date = new Date();
   user_type:any;
   displayedColumns: string[] = ['Report Date', 'Ticket No.','Client Name','Assigned To', 'Status','View'];
   dataSource = new MatTableDataSource([]);
  dlt=true;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
  setInterval(()=>{
    this.from_date=this.activatedroute.snapshot.params['id1'];
   this.from_date=atob(this.from_date);
   this.to_date=this.activatedroute.snapshot.params['id2'];
   this.to_date=atob(this.to_date)
   console.log(this.from_date+" "+this.to_date)
  if(localStorage.getItem('user_Type')=='A'||localStorage.getItem('user_Type')=='M')
  {this.type=''; console.log("type="+localStorage.getItem('user_Type'))}
  else
  this.type=localStorage.getItem('UserId');
  this.fetch_data();
  },1000)
   
  }
  fetch_data(){
     this.apollo.watchQuery<any>({
      query: srch_dt,
      variables:{
        frm_dt:this.from_date,
        to_dt:this.to_date,
        user_id:this.type
      },
      pollInterval:100
    })
      .valueChanges
      .subscribe(({ data }) => {
        
        this.posts = data;
       
        console.log(this.posts);
       this.putdata(this.posts);
      });

  }
  view_page(v:any){
    console.log(v+" "+localStorage.getItem('user_Type'));
    this.user_type=localStorage.getItem('user_Type')
    this.router.navigate(['/view',btoa(v),btoa(this.user_type)])
  }
  public putdata(posts:any){
    this.dataSource=new MatTableDataSource(posts.searchByDate);
   
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

}
