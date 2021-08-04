import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {Apollo, gql} from 'apollo-angular';
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
}`;
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
;
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
;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css',
   '../../../assets/css/font-awesome.css',
  '../../../assets/css/apps.css',
  '../../../assets/css/apps_inner.css',
   '../../../assets/css/res.css']
})
export class ViewComponent implements OnInit {
  tktno: any;
  phone: any;
  status: any;
  priority: any;
  assign_to: any;
  attendedat: any;
  deliveryat: any;
  work_status: any;
  district_name: any;
  client_type: any;
  oprn_mode: any;
  working_hrs: any;
  rental_upto: any;
  amc_upto: any;
  tkt_module: any;
  prob_reported: any;
  Remarks: any;

  constructor(private activatedroute:ActivatedRoute,private apollo:Apollo) { }
  id:any;
  posts:any;
  type:any;
  dt:any;
  client_name:any;
  ngOnInit(): void {
    this.id=this.activatedroute.snapshot.params['id1'];
    this.id=atob(this.id);
    this.type=this.activatedroute.snapshot.params['id2'];
    this.type=atob(this.type);
    this.apollo.watchQuery<any>({
      query: GET_DETAILS,
      variables:{
         id:this.id,
         user_type:localStorage.getItem('user_Type'),
         user_id:localStorage.getItem('UserId')

         
      },
      pollInterval: 500
      
      
    })
      .valueChanges
      .subscribe(({ data}) => {
       console.log(data);
       this.posts=data;
       this.dt=data.getSupportLogDtls[0].log_in;
       this.client_name=data.getSupportLogDtls[0].client_name;
       this.tktno=data.getSupportLogDtls[0].tkt_no;
       this.phone=data.getSupportLogDtls[0].phone_no;
       this.status=data.getSupportLogDtls[0].tktStatus;
       this.priority=data.getSupportLogDtls[0].priority;
        //  this.Tickite=data;
        //  console.log(this.Tickite.getSupportLogDtls[0].assign_engg)
        //  for(let i=0;i<this.Tickite.getSupportLogDtls.length;i++){
        //      if(this.Tickite.getSupportLogDtls[i].assign_engg>0 &&this.Tickite.getSupportLogDtls[i].assign_engg!=null){
        //            this.d_icon=document.getElementsByClassName('deleted') ;
        //            this.d_icon.style.color='grey';  
        //      }
        //  }
      
        //  this.putdata(this.Tickite);
      })
      this.apollo.watchQuery<any>({
        query: GET_EDITABLE,
        variables:{
           id:this.id,
           user_type:localStorage.getItem('user_Type'),
           user_id:localStorage.getItem('UserId')
        },
         pollInterval:500
      
        
      })
        .valueChanges
        .subscribe(({ data}) => {

          console.log(data);

          this.assign_to=data.getSupportLogDtls[0].emp_name;
          // this.tktstatus=data.getSupportLogDtls[0].tktStatus;
          this.attendedat=data.getSupportLogDtls[0].call_attend;
          this.deliveryat=data.getSupportLogDtls[0].delivery;
          this.work_status=data.getSupportLogDtls[0].work_status > 0 ? 'Done' : 'Pending';
         
          // this.client_name=data.getSupportLogDtls[0].client_name;
           this.district_name=data.getSupportLogDtls[0].district_name;
          this.client_type=data.getSupportLogDtls[0].client_type;
          this.oprn_mode=data.getSupportLogDtls[0].oprn_mode;
          this.working_hrs=data.getSupportLogDtls[0].working_hrs;
          this.amc_upto=data.getSupportLogDtls[0].amc_upto;
          this.rental_upto=data.getSupportLogDtls[0].rental_upto;
          // this.phone_no=data.getSupportLogDtls[0].phone_no;
          // this.priority_status=data.getSupportLogDtls[0].priority_status;
          this.tkt_module=data.getSupportLogDtls[0].module;
          this.prob_reported=data.getSupportLogDtls[0].prob_reported;
          this.Remarks=data.getSupportLogDtls[0].remarks;
          // this.logDate=data.getSupportLogDtls[0].log_in;
          // console.log(this.priority_status)

               
              // for(let i=0;i<this.posts_pm.getPriorityModeData.length;i++){
              //   console.log("status:" +this.priority_status);
              //   console.log("status:" +this.posts_pm.getPriorityModeData[i].priority_id)
              //       if(this.posts_pm.getPriorityModeData[i].priority_id== this.priority_status){
              //         this.Priority=this.posts_pm.getPriorityModeData[i].priority_mode;
              //         this.prio=this.posts_pm.getPriorityModeData[i].priority_id;
                        
              //       }
              // }

            //   for(let i=0;i<this.mod.getModuleTypeData.length;i++){
            //     console.log("Module:" +this.tkt_module);
            //     console.log("Module:" +this.mod.getModuleTypeData[i].module_id)
            //         if(this.mod.getModuleTypeData[i].module_id== this.tkt_module){
            //           this.modul=this.mod.getModuleTypeData[i].module_id;
            //           this.Module=this.mod.getModuleTypeData[i].module_type;
                        
            //         }
            //   }
                   
            //  console.log(this.assign_to);
              
          
         })
        

  }
}


