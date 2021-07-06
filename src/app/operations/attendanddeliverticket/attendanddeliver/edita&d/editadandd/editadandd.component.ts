import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
import {formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// For update Deliver&Attendent Tickite

const EDITABLE=gql`
mutation updateDeliverTkt($id:String!,$call_attend: String!,$delivery:String!,
 $tkt_status:String!,$remarks:String!,$user_id:String!,$work_status:String!) {
  
  updateDeliverTkt(id:$id
      call_attend:$call_attend
      delivery:$delivery
      tkt_status:$tkt_status
      remarks:$remarks
      user_id:$user_id,
      work_status:$work_status)  {

       success
       message

}
}`
;









const SHOW_TS=gql`
query{
  getTktStatusData(id:"", db_type: 3){
    tkt_id
    tkt_status
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
    log_in
  }
}` 
@Component({
  selector: 'app-editadandd',
  templateUrl: './editadandd.component.html',
  styleUrls: ['./editadandd.component.css', 
  '../../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../../assets/masters_css_js/css/res.css']
})
export class EditadanddComponent implements OnInit {
  id:any;
  tkt_no:any
  TktStatus:any;
  logDate:any;
  tktid:any;
  client_name:any
   district_name:any
  client_type:any;
  oprn_mode:any;
  working_hrs:any;
  amc_upto:any;
  rental_upto:any;
  phone_no:any;
  priority_status:any;
  tkt_module:any;
  prob_reported:any;
  assign_engg:any;
  tickit:any;
  tkt:boolean=false;
  phonmobile:boolean=false;
  mobile:boolean=false;
  Attend:any;
  pathname:any;
  posts_ts:any;
  tsdata:any;
  deliver:any;

  attended:any;
  dateitem:any;
  valid_init=true;
  valid_init_at=true;
  valid_init_de=true;
  input_attended:any;
  input_delivery:any;
  Remarks:any;
  x:any;
  for_issue_error:boolean=false;
  valid_issue:boolean=true;
  // valid_init_work:boolean=true;
  issue:any;
  work:any;
  wrork_stat:boolean=false;
  constructor(private apollo:Apollo,private route:ActivatedRoute,private router:Router) {}
  ngOnInit(): void {
    this.issue=document.getElementById("itemissue");
   console.log("empty:" +this.issue.value)
   
   
    this.work=document.getElementById("wrkstatus")
    localStorage.setItem('Active', '1');
    this.input_attended=document.getElementById('itemattendedat')
    var iso = new Date().toISOString();
    var minDate = iso.substring(0,iso.length-1);
          // this.input_attended.value=minDate;
    this.input_attended.min=minDate;

    this.input_delivery=document.getElementById('itemdeliveryat')
          
    var iso1 = new Date().toISOString();
    var minDate1 = iso1.substring(0,iso1.length-1);
          // this.input_delivery.value=minDate1;
    this.input_delivery.min=minDate1;
   
    

    //  elem.value=minDate;
    //   elem.min=minDate
    localStorage.setItem('attendent','0');
   
    this.pathname=window.location.href.split('#').pop();
    console.log("path:" +window.location.href.split('#').pop())
    console.log("pathname:" +decodeURIComponent(this.pathname));
    localStorage.setItem('address', decodeURIComponent(this.pathname));



    this.dateitem=document.getElementById('itemdate');
   
    
    this.apollo.watchQuery<any>({
      query: SHOW_TS,
      //pollInterval:100
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        // this.loading = loading;
        this.posts_ts = data;
       this.tsdata=this.posts_ts.getTktStatusData;
        console.log(this.posts_ts);
       //this.putdata(this.posts_ts);
      });


      this.route.params.forEach((params: any) => {
        this.id = params['id1'];
        console.log(this.id )
        this.apollo.watchQuery<any>({
          query: GET_EDITABLE,
          variables:{
             id: this.id,
              user_type:localStorage.getItem('user_Type'),
              user_id:localStorage.getItem('UserId')
             
          },
          pollInterval:500
          
        })
          .valueChanges
          .subscribe(({ data}) => {
  
            console.log(data);
  
            this.tkt_no=data.getSupportLogDtls[0].tkt_no;
            this.client_name=data.getSupportLogDtls[0].client_name;
             this.district_name=data.getSupportLogDtls[0].district_name;
            this.client_type=data.getSupportLogDtls[0].client_type;
            this.oprn_mode=data.getSupportLogDtls[0].oprn_mode;
            this.working_hrs=data.getSupportLogDtls[0].working_hrs;
            this.amc_upto=data.getSupportLogDtls[0].amc_upto;
            this.rental_upto=data.getSupportLogDtls[0].rental_upto;
            this.phone_no=data.getSupportLogDtls[0].phone_no;
            this.priority_status=data.getSupportLogDtls[0].priority;
            this.tkt_module=data.getSupportLogDtls[0].module;
            this.prob_reported=data.getSupportLogDtls[0].prob_reported;
            this.assign_engg=data.getSupportLogDtls[0].emp_name;
            this.Remarks=data.getSupportLogDtls[0].remarks;
            this.TktStatus=data.getSupportLogDtls[0].tktStatus;
            this.tktid=data.getSupportLogDtls[0].tkt_status;
            this.logDate=data.getSupportLogDtls[0].log_in;
            console.log( this.tkt_no)
           console.log(this.client_name);
           console.log( this.district_name);
           console.log(this.client_type);
           console.log(this.oprn_mode);

           if(this.prob_reported==''){
                        this.for_issue_error=true;
                        this.valid_issue=true;
           }
           else{
                this.for_issue_error=false;
                this.valid_issue=false;
           }
          
            
  
          })
        
      })

 }

 
  preventNonNumericalInput(e:any){}

  go_to_dashboard(v1:any,v2:any,v3:any,v4:any,v5:any,v6:any,v7:any,v8:any,v9:any,v10:any,v11:any,v12:any,v13:any,v14:any,v15:any,v16:any,v17:any,v18:any,v19:any){
    // console.log("Date:" +v1);
    // console.log("Tickitno:" +v2);
    // console.log("Client:" +v3);
    // console.log("District:" +v4);
    // console.log("Clienttype:" +v5);
    // console.log("operationalmode:" +v6);
    // console.log("workinghours:" +v7);
    // console.log("amcupto:" +v8);
    // console.log("rentalupto:" +v9);
    // console.log("phone:" +v10);
    // console.log("prioritystatus:" +v11);
    // console.log("module:" +v12);
    // console.log("issue:" +v13);
    // console.log("assignedto:" +v14);
    console.log("Attendantat:" +v15);
    console.log("Delivaryat:" +v16);
    console.log("tickitstatus:" +v17);
    // console.log("remarks:" +v18);
    console.log("workingstatus:" +v19);
    console.log(this.id);
    // if(v15<v16){
    //   console.log("Its Ok");
    // }
    // else{
    //   console.log("not Ok");
    // }

    this.apollo.mutate({
      mutation: EDITABLE,
      variables:{
        id:this.id,
        call_attend:v15, 
        delivery:v16.toString(),
        tkt_status:v17,
        remarks:v18,
        user_id:localStorage.getItem("UserId"),
        work_status:v19

      }
    }).subscribe(({data})=>{
      console.log(data);
      this.Attend=data;
      if( this.Attend.updateDeliverTkt.success==1){
        localStorage.setItem('attendent','1');
        this.router.navigate(['/operations/attendanddeliver']);
      }

      else
      this.showsnackbar();
      },error=>{ this.showsnackbar()
      });

    
  }
  showsnackbar() {
    // alert("error");
     this.x = document.getElementById("snackbar");
     this.x.className = "show";
     setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
   }
   wrk_select(v:any){
     console.log(v);
   
    if(v==''){
      this.wrork_stat=true;
      // this.valid_init_work=true;
      this.valid_init=true;
      this.work.style.border="solid red 1px";
    }
    else{
      this.work.style.border="solid lightgrey 1px";
      this.wrork_stat=false;
      // this.valid_init_work=false;
      this.valid_init=false;
    }

   }


  prevent_null(e:any){
    

     console.log(e.target.value);
    if(e.target.id=="itemattendedat")
    {
      if(e.target.value=='')
      {
        this.valid_init_at=true;
        // this.phone_val=true;
        // this.prevent_init_phone=true;
         this.mobile=true;
        this.input_attended.style.border="solid red 1px"
        //this.hide_val=true;
      }
      else

       {   
        
       this.mobile=false;
         this.valid_init_at=false;
       this.input_attended.style.border="solid lightgrey 1px"}

    }
    if(e.target.id=='itemdeliveryat')
    {
      if(e.target.value=='')
      {
        this.valid_init_de=true;
      //  this.issue_val=true;
       this.phonmobile=true;
        this.input_delivery.style.border="solid red 1px"
        console.log("phone")
        //this.hide_val=true;
      }
      else

       { 
        console.log(e.target.value)
        // this.input_delivery=document.getElementById('itemdeliveryat')
          
        // var iso1 = new Date().toISOString();
        // var minDate1 = iso1.substring(0,iso1.length-1);
        // this.input_delivery.value=minDate1;
        // this.input_delivery.min=minDate1;
         this.phonmobile=false; 
         this.valid_init_de=false;
       this.input_delivery.style.border="solid lightgrey 1px"}

    }
  
  }
  tkt_select(v:any){
    this.tickit=document.getElementById("tktstatus")
    if(v==''){
      this.tkt=true;
    this.valid_init=true;
     this.tickit.style.border="solid red 1px";
    }
    else{
      this.tickit.style.border="solid lightgrey 1px";
      this.tkt=false;
    this.valid_init=false;
    }
  }
  prevent_null_issue(e:any){
        if(e.target.value==''){
             this.issue.style.border="solid red 1px";
            this.for_issue_error=true;
            this.valid_issue=true;
          }
        else{
          this.issue.style.border="solid lightgrey 1px";
            this.for_issue_error=false;
            this.valid_issue=false;
          }
  }

}
