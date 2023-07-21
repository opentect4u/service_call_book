import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddclientdashboardComponent } from 'src/app/master/addclient/addclientdashboard/addclientdashboard.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
const srch_dt = gql`
query searchByDate($frm_dt: String!, $to_dt: String!, $user_id: String!,$user_type:String!){
  searchByDate(frm_dt: $frm_dt, to_dt: $to_dt, user_id: $user_id,user_type:$user_type){
    id
    log_in
    tkt_no
    client_name
    tktStatus
    emp_name
    work_status
    assigned_dt
    call_attend
    delivery
    assigned_by
  }
 }`
const searchByDateClient = gql`query searchByDateClient($frm_dt: String!,$to_dt: String!,$client_id: String!,$user_id: String!,$user_type: String!){
  searchByDateClient(frm_dt: $frm_dt,to_dt: $to_dt,client_id: $client_id,user_id: $user_id,user_type: $user_type){
    id,
    client_id,
    phone_no,
    client_name,
    prob_reported,
    emp_name,
    work_status,
    tkt_no
  }
}`
const searchByDateEmp = gql`query searchByDateEmp($frm_dt: String!,$to_dt: String!,$emp_id: String!,$user_id: String!,$user_type: String!){
  searchByDateEmp(frm_dt: $frm_dt,to_dt: $to_dt,emp_id: $emp_id,user_id: $user_id,user_type: $user_type){
    id,
    client_id,
    phone_no,
    client_name,
    prob_reported,
    emp_name,
    work_status,
    tkt_no
  }
}`;
const GET_DETAILS=gql`
query getSupportLogDtls($id:String!,$user_type:String!,$user_id:String!){
  getSupportLogDtls(id:$id,user_type:$user_type,user_id:$user_id){
    assign_engg
    id
    client_name
    phone_no
    tkt_no
    emp_name
    priority
    tktStatus
    log_in
  }
}`
const GET_EDITABLE=gql`
query getSupportLogDtls($id:String!,$user_type:String!,$user_id:String!){
  getSupportLogDtls(id:$id,user_type:$user_type,user_id:$user_id){
    id
    tkt_no
    client_name
     district_name
    client_type
    oprn_mode
    working_hrs
    amc_upto
    rental_upto
    phone_no
    priority
    module
    prob_reported
    assign_engg
    remarks
    tktStatus
    tkt_status
    emp_name,
    log_in,
    work_status
    call_attend
    delivery
  }
}`
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css',
  '../../../assets/css/bootstrap.css',
  '../../../assets/css/font-awesome.css',
  '../../../assets/css/apps.css',
  '../../../assets/css/apps_inner.css',
  '../../../assets/css/res.css']
})
export class ReportComponent implements OnInit {
  showForm!:FormGroup;
  constructor(private datePipe: DatePipe,private fb:FormBuilder,private activatedroute: ActivatedRoute, private apollo: Apollo, private router: Router, private spinner: NgxSpinnerService) { 
    this.showForm= this.fb.group({
      date:[{value:'',disabled:true}],
      client:[{value:'',disabled:true}],
      district:[{value:'',disabled:true}],
      client_type:[{value:'',disabled:true}] ,  
      oprn_mode:[{value:'',disabled:true}],
      working_hrs:[{value:'',disabled:true}] ,  
      amc_upto:[{value:'',disabled:true}],
      rental_upto:[{value:'',disabled:true}],
      phoneno:[{value:'',disabled:true}],
      priority:[{value:'',disabled:true}],
      tkt_module:[{value:'',disabled:true}],
      prob_reported:[{value:'',disabled:true}] ,  
      assign_to:[{value:'',disabled:true}],
      attendedat:[{value:'',disabled:true}] ,  
      deliveryat:[{value:'',disabled:true}],
      ticketstatus:[{value:'',disabled:true}],
      work_status:[{value:'',disabled:true}],
      remarks:[{value:'',disabled:true}],
    })
  }
  from_date: any;
  to_date: any;
  posts: any;
  type: any;
  dt: any;
  _id: any;
  _type:any;
  rptDate:any;
  asgnDate:any
  duration1:any
  public now: Date = new Date();
  user_type: any;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource([]);
  dlt = true;
  fnDate1:any
  fnDate2:any
  fnTime:any
  fnHour:any
  fnMin:any
  fnSec:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.displayedColumns = ['Report-Date','Client-Name', 'Assigned-By','Assigned-Date','Duration1','Attended-At','Duration2','Delivery-At','Duration3']
    this.from_date = this.activatedroute.snapshot.params['id1'];
    this.from_date = atob(this.from_date);
    this.to_date = this.activatedroute.snapshot.params['id2'];
    this.to_date = atob(this.to_date)
    this._id = atob(this.activatedroute.snapshot.params['name'])
    this._type= atob(this.activatedroute.snapshot.params['type'])

    if (localStorage.getItem('user_Type') == 'A' || localStorage.getItem('user_Type') == 'M') { this.type = ''; console.log("type=" + localStorage.getItem('user_Type')) }
    else
      this.type = localStorage.getItem('UserId');
    this.fetch_data();
  }
  fetch_data() {
    this.spinner.show();
    this.apollo.watchQuery<any>({
      query: srch_dt,
      variables:
        {frm_dt: this.from_date,
          to_dt: this.to_date,
          user_id: this.type,
          user_type: localStorage.getItem('user_Type')}
    })
      .valueChanges
      .subscribe(({ data }) => {
        this.posts = data;
        // for(let dt of this.posts.searchByDate){
        //   // console.log(dt.assigned_dt);
        //   dt = JSON.parse(JSON.stringify(dt));
        //   // console.log(this.calculateDuration(dt.assigned_dt, dt.log_in));
        //   // break;
        //   dt['duration1'] = this.calculateDuration(dt.assigned_dt, dt.log_in)
        //   dt['duration2'] = this.calculateDuration(dt.call_attend, dt.assigned_dt)
        //   dt['duration3'] = this.calculateDuration(dt.delivery, dt.call_attend)
        // }
        console.log(this.posts);
        this.putdata(this.posts);
        this.spinner.hide();
      });
  }
  calculateDuration(date1:any, date2:any){
    this.fnDate1 = this.datePipe.transform(date1, 'yyyy-MM-dd H:mm:ss');
    this.fnDate2 = this.datePipe.transform(date2, 'yyyy-MM-dd H:mm:ss');
    
    // console.log(Date.parse(this.fnDate1), this.fnDate2);
    this.fnDate1 = Date.parse(this.fnDate1)
    this.fnDate2 = Date.parse(this.fnDate2)

    
    this.fnTime = (this.fnDate1 - this.fnDate2) / (1000 * 60 * 60);
    console.log(this.fnTime);
    this.fnTime = this.fnTime > 0 ? this.fnTime.toString().split('.') : 0.0
    this.fnHour = this.fnTime[0]
    this.fnMin = this.fnTime[1] > 0 ? this.fnTime[1] / 60 : 0.0
    // this.fnMin=this.fnMin.toFixed(2)
    // console.log(this.fnMin)
    this.fnMin = this.fnMin.toString().split('.')[0]
    this.fnSec = this.fnMin.toString().split('.')[1]
    var time = `${this.fnHour > 0 ? `${this.fnHour}h` : ''} ${this.fnMin > 0 ? `${this.fnMin.substr(0,2)}m` : ''} ${this.fnSec > 0 ? `${this.fnSec}s` : ''}`
    // this.duration1 = Time / (1000 * 3600)
    return time;
  }
// view_page(v: any) {
  //   this.user_type = localStorage.getItem('user_Type')
  //   this.router.navigate(['/view', btoa(v), btoa(this.user_type)])
  // }
  public putdata(posts: any) {
    this.dataSource = new MatTableDataSource(posts.searchByDate);
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
  view_page(v: any) {
       this.get_details(v);
       this.get_editable(v);
}
  get_details(_id:any){
    this.apollo.watchQuery<any>({
      query: GET_DETAILS,
      variables:{
         id:_id,
         user_type:localStorage.getItem('user_Type'),
         user_id:localStorage.getItem('UserId')    
      },
      pollInterval: 500
    })
      .valueChanges.subscribe(({ data}) => {
      this.showForm.patchValue({
        date:this.datePipe.transform(data.getSupportLogDtls[0].log_in , 'dd-MM-yyyy h:mm:ss a'),
        client:data.getSupportLogDtls[0].client_name,
        phoneno:data.getSupportLogDtls[0].phone_no,
        priority:data.getSupportLogDtls[0].priority,
        ticketstatus:data.getSupportLogDtls[0].tktStatus,
      })
      })     
  }
  get_editable(_id:any){
    this.apollo.watchQuery<any>({
      query: GET_EDITABLE,
      variables:{
         id:_id,
         user_type:localStorage.getItem('user_Type'),
         user_id:localStorage.getItem('UserId')
      },
       pollInterval:500
    })
      .valueChanges
      .subscribe(({ data}) => {
           this.showForm.patchValue({  
            tkt_module:data.getSupportLogDtls[0].module,
            prob_reported:data.getSupportLogDtls[0].prob_reported,  
            assign_to:data.getSupportLogDtls[0].emp_name,
            assigned_dt:this.datePipe.transform(data.getSupportLogDtls[0].assigned_dt , 'dd-MM-yyyy'),
            call_attend:this.datePipe.transform(data.getSupportLogDtls[0].call_attend , 'dd-MM-yyyy'),  
            attendedat:this.datePipe.transform(data.getSupportLogDtls[0].call_attend , 'dd-MM-yyyy'),  
            deliveryat:this.datePipe.transform(data.getSupportLogDtls[0].delivery , 'dd-MM-yyyy'),
            work_status:data.getSupportLogDtls[0].work_status > 0 ? 'Done' : 'Pending',
            remarks:data.getSupportLogDtls[0].remarks,
            district:data.getSupportLogDtls[0].district_name,
            client_type:data.getSupportLogDtls[0].client_type ,  
            oprn_mode:data.getSupportLogDtls[0].oprn_mode,
            working_hrs:data.getSupportLogDtls[0].working_hrs ,  
            amc_upto:this.datePipe.transform(data.getSupportLogDtls[0].amc_upto, 'dd-MM-yyyy'),
            rental_upto:this.datePipe.transform(data.getSupportLogDtls[0].rental_upto, 'dd-MM-yyyy'),
           })
       })
  }

}
