import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';


// For update data
const EDITABLE=gql`
mutation updateAssignTkt($id:String!,$assign_engg: String!,
  $remarks:String!,$user_id:String!) {
  
    updateAssignTkt(id: $id
      assign_engg: $assign_engg
      remarks: $remarks
      user_id: $user_id)  {

       success
       message

}
}`
;

// For getting employee list in dropdown of assigned To
const FOR_GET_EMPLOYEE=gql`
query getEmp($id:String!){
  getEmp(id:$id){
  id
  emp_name
}
}`
;




// For getting data automatically corrosponding id 
const GET_EDITABLE=gql`
query getSupportLogDtls($id:String!){
  getSupportLogDtls(id:$id){
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
    emp_name
    assign_engg
    remarks
  }
}` 


@Component({
  selector: 'app-editat',
  templateUrl: './editat.component.html',
  styleUrls: ['./editat.component.css', 
  '../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../assets/masters_css_js/css/res.css']
})
export class EditatComponent implements OnInit {
  emp:any;
   id:any;
   emplist:any;
   edit:any;
    tkt_no:any
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
    pathname:any;
    assss_id:any;
    emp_name:any;
    Remarks:any;
  constructor(private route:ActivatedRoute,private apollo:Apollo,private router:Router) { }
  today= new Date();
  todaysDataTime = '';
  valid_init=true;
  input_assigned:any;
  ngOnInit(): void {
    this.input_assigned=document.getElementById('assign1');
    console.log("value="+this.input_assigned.value)
  
    localStorage.setItem('edittickit','0');
    this.pathname=window.location.href.split('#').pop();
    console.log("path:" +window.location.href.split('#').pop())
    console.log("pathname:" +decodeURIComponent(this.pathname));
    localStorage.setItem('address', decodeURIComponent(this.pathname));

    this.apollo.watchQuery<any>({
      query: FOR_GET_EMPLOYEE,
      variables:{
         id:""
      }
      
    })
      .valueChanges
      .subscribe(({ data}) => {
        console.log(data);
        this.emplist=data.getEmp;
        console.log(this.emplist);
      })
     setInterval(()=>{
      this.today= new Date();
      this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
      // this.dateitem.value=this.todaysDataTime;
     },1000);

 

    

    this.route.params.forEach((params: any) => {
      this.id = params['id'];
      console.log(this.id )
      this.apollo.watchQuery<any>({
        query: GET_EDITABLE,
        variables:{
           id: this.id
        }
        
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
          this.emp_name=data.getSupportLogDtls[0].emp_name;
          this.assss_id=data.getSupportLogDtls[0].assign_engg;
          this.Remarks=data.getSupportLogDtls[0].remarks;
           console.log("value1="+this.assss_id);
          console.log( this.tkt_no)
         console.log(this.client_name);
         console.log( this.district_name);
         console.log(this.client_type);
         console.log(this.priority_status);

         for(let i=0;i<this.emplist.length;i++){

               if(this.assss_id== this.emplist[i].id)
               {
                this.emp_name=this.emplist[i].emp_name

               }
         }


        
         if(this.assss_id==null)
         this.valid_init=true;
        else
         this.valid_init=false;

        })
      
    })
  }  
  select_assigned(v:any){
    if(v=='')
     this.valid_init=true;
    else
     this.valid_init=false;
  }
  preventNonNumericalInput(e:any){}

  go_to_dashboard(v1:any,v2:any,v3:any,v4:any,v5:any,v6:any,v7:any,v8:any,v9:any,v10:any,v11:any,v12:any,v13:any,v14:any,v15:any){
   
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
    // console.log("remarks:" +v15);
    // console.log("id:" +this.id );
    
    this.apollo.mutate({
      mutation: EDITABLE,
      variables:{
        id:this.id,
        assign_engg:v14, 
        remarks:v15,
        user_id: localStorage.getItem("UserId")

      }
    }).subscribe(({data})=>{
      console.log(data);
      this.edit=data;
      if(this.edit.updateAssignTkt.success==1){
        localStorage.setItem('edittickit','1');
        this.router.navigate(['/operations/assignticket']);
      }
       
    });




    
  }




}
