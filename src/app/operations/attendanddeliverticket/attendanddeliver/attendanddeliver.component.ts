import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import {ThemePalette} from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';



const UPDATE_TKT_STATUS=gql`
mutation  updateTktStatus($id:String!,$user_id:String!,$tkt_status:String!){
  
  updateTktStatus(id:$id,user_id:$user_id,tkt_status:$tkt_status){
    message
    success
    
  }
}


`


const GET_RAISETICKITE=gql`
query getSupportLogDtls($id:String!,$user_type:String!,$user_id:String!){
  getSupportLogDtls(id:$id,tag:"0",user_type:$user_type,user_id:$user_id){
    id
    client_name
    phone_no
    tkt_no
    emp_name
    priority
    tktStatus,
    tkt_status
    log_in
    work_status
  }
}`
;



const FETCH=gql`
query getSuppLogDone($user_type:String!,$user_id:String!){
  getSuppLogDone(user_type:$user_type , user_id:$user_id){
    id
    client_name
    phone_no
    tkt_no
    emp_name
    priority
    tktStatus
    log_in
    work_status
    tkt_status
  }
}


`

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
  displayedColumns: string[] = ['SL NO','Ticket_No', 'Client_Name','ticket_log_date','Assigned_to','Priority','Ticket_Status','Edit'];
  dataSource = new MatTableDataSource<any> (); 
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dis:any;
  btn:any;


  constructor(private router:Router,private apollo:Apollo,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    if( localStorage.getItem('attendent')=='1'){
      this.attendtickite=false;
     }
    localStorage.setItem('address', '/operations/attendanddeliver');
    localStorage.setItem('Active', '1');
    

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
    this.spinner.show();
    this.apollo.watchQuery<any>({
      query: GET_RAISETICKITE,
      variables:{
         id:"",
         user_type:localStorage.getItem('user_Type'),
         user_id:localStorage.getItem('UserId')
         
      },
      pollInterval:20000
      
    })
      .valueChanges
      .subscribe(({ data}) => {
        for(let i=0;i<data.getSupportLogDtls.length;i++){
          if(data.getSupportLogDtls[i].tkt_status==''|| data.getSupportLogDtls[i].tkt_status!=null){

            this.dis=true;
          }
          

        }
     

         this.Tickite=data;
         this.putdata(this.Tickite);
         this.spinner.hide();
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

  public fetchdata_for_Done(){
    this.spinner.show();
    this.apollo.watchQuery<any>({
      query: FETCH,
      variables:{
         user_type:localStorage.getItem('user_Type'),
         user_id:localStorage.getItem('UserId')
         
      },
      pollInterval:20000
      
    })
      .valueChanges
      .subscribe(({ data}) => {
        console.log(data);

         this.Tickite=data;
         this.putdata1(this.Tickite);
         this.spinner.hide();
      })



  }

  private putdata1(posts:any){
    this.dataSource=new MatTableDataSource(posts.getSuppLogDone);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sendstatus(v:any){
     if(v==1){
      this.fetch_data();
     }
     else{
      this.fetchdata_for_Done();
     }

  }

  onToggle(event:any,id:any){
  
    this.btn = document.getElementById('av_'+id);
    if(event.checked == true){
      this.btn.removeAttribute('hidden');
      this.btn.style.display = "block";
    }else{
      this.btn.style.display = "none";
    }
    console.log("Slide Me:",event.checked);
   
    this.apollo.mutate({
      mutation:UPDATE_TKT_STATUS ,
      variables:{
        id:id,
       user_id: localStorage.getItem("UserId"),
        tkt_status: event.checked ? '4' : '0'

      }
    }).subscribe(({data})=>{
      console.log(data);

    })
    
  }




}
