import { Component, OnInit,ViewEncapsulation} from '@angular/core';
// import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const APPROVE=gql`
mutation resetPassword($pass:String!,$user_email:String!){
  resetPassword(password:$pass, user_email:$user_email){
    success
    message
  }
}`;

const GET_PROFILE=gql`
query getProfileDtls($user_email:String!,$user_type:String!){
  getProfileDtls(user_email:$user_email, user_type: $user_type){
    id
    user_type
    emp_code
    emp_name
    phone_no
    email
    emp_designation
    remarks
    client_name
    district_id
    client_type_id
    oprn_mode_id
    client_addr
    working_hrs
    amc_upto
    rental_upto
  }
}`;
const SHOW_DIST=gql`
query{
    getDistrict{
      id
      name
    }
  }`
  const SHOW_CLIENT_TYPE=gql`
  query{
    getClientTypeData(id:"", db_type: 1){
      client_id
      client_type
    }
  }`
const SHOW_OP=gql`
query{
  getOprnModeData(id:"", db_type: 2){
    oprn_id
    oprn_mode
  }
}`;
declare var showprofile: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
  '../../../assets/css/bootstrap.css',
  '../../../assets/css/font-awesome.css',
  '../../../assets/css/apps.css',
  '../../../assets/css/apps_inner.css',
  '../../../assets/css/res.css']
})
export class HeaderComponent implements OnInit {
  bgColor='primary';
  color='accent';
   emp_name:any;
   type:any;
   distdata:any;
   opdata:any;
   ctmdata:any;
   name:any;
    pn:any;
    Desig:any
   code_no:any;
   email_id:any;
   profile=false;
   District:any;
   client:any;
   client_addr:any
   op_mode:any;
   wrk_hrs:any;
   rental:any;
   amc:any;
   url:any;
   id:any;
   c_type:any
   success:any;
   modal:any;
   d_data:any;
   cl_type:any;
   oprn_mode:any;
   user_type:any
   conf_pass:boolean=false;
  constructor(private router:Router,public toastr: ToastrManager,private apollo:Apollo) { }

  ngOnInit(): void {
    setInterval(()=>{
      this.code_no=localStorage.getItem('UserId');
      this.email_id=localStorage.getItem('user_email');
      console.log(this.email_id);
      this.name = localStorage.getItem('user_name');
    this.emp_name= this.name == 'null' ? 'Admin' : localStorage.getItem('user_name');
    console.log(this.emp_name);
    this.user_type = localStorage.getItem('user_Type');
    this.type= this.user_type =='A' ? 'Admin' : (this.user_type == 'M' ? 'Manager' : (this.user_type == 'T' ? 'Telecaller' : (this.user_type == 'E' ? 'Engineer' :  this.user_type == 'C' ? 'Client' :  'Viewer')));
  },500);

  this.apollo.watchQuery<any>({
        query: GET_PROFILE,
        variables:{
          user_email:localStorage.getItem('user_email'),
          user_type:localStorage.getItem('user_Type')
        },
        pollInterval:500
      }).valueChanges
      .subscribe(({ data}) => {
        console.log(data);
        this.pn=data.getProfileDtls[0].phone_no;
        this.Desig=data.getProfileDtls[0].emp_designation;
        this.District=data.getProfileDtls[0].district_id;
        this.client=data.getProfileDtls[0].client_name;
        this.op_mode=data.getProfileDtls[0].oprn_mode_id;
        this.client_addr=data.getProfileDtls[0].client_addr;
        this.wrk_hrs=data.getProfileDtls[0]. working_hrs;;
        this.rental=data.getProfileDtls[0].rental_upto;
        this.amc=data.getProfileDtls[0].amc_upto;
        this.c_type=data.getProfileDtls[0].client_type_id;

        console.log(this.pn,this.Desig);
        this.apollo.watchQuery<any>({
          query: SHOW_DIST

        })
          .valueChanges
          .subscribe(({ data }) => {
            //this.loading = loading;
            // this.districts = data;
            console.log(data);
            this.distdata=data.getDistrict
            // console.log(this.ctmdata);
            for(let i=0;i<data.getDistrict.length;i++){
              if(this.District==data.getDistrict[i].id)
                this.d_data=data.getDistrict[i].name
            }

           //this.putdata(this.posts);
          });
          this.apollo.watchQuery<any>({
            query: SHOW_CLIENT_TYPE,
            variables:{
              id:""
            }
          })
            .valueChanges
            .subscribe(({ data }) => {
              //this.loading = loading;
              // this.posts = data;
              this.ctmdata=data.getClientTypeData
              // console.log(this.ctmdata);
              for(let i=0;i<data.getClientTypeData.length;i++){
                if( this.c_type==data.getClientTypeData[i].client_id)
                  this.cl_type=data.getClientTypeData[i].client_type
              }


             //this.putdata(this.posts);
            });
            this.apollo.watchQuery<any>({
              query: SHOW_OP,
              variables:{
                  id:""
                }
            })
              .valueChanges
              .subscribe(({ data }) => {
                //this.loading1 = loading;
                // this.posts1 = data;
                this.opdata=data.getOprnModeData
                console.log(this.opdata);

                for(let i=0;i<data.getOprnModeData.length;i++){
                  if(this.op_mode==data.getOprnModeData[i].oprn_id
                    )
                    this.oprn_mode=data.getOprnModeData[i].oprn_mode
                }


              // this.putdata(this.posts);
              });


      })

  }
  logout(){
    localStorage.clear();
    localStorage.setItem('isLoggedIn',"false");
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });;
  }
 change_ps()
 {
  console.log("1sttab")
   this.profile=false;
   console.log(this.profile)
 }
 change_cp(){
   console.log("2ndtab")
   this.profile=true;
   console.log(this.profile)
 }
 save(name:any,ph_no:any,designation:any){
   console.log(name+" "+" "+ph_no+" "+designation);

  this.toastr.successToastr('Profile updated successfully!', 'Done!');

 }
 change(v:any,v1:any){

  if(v==v1){
    this.conf_pass=false;
  console.log(v);
  this.id=localStorage.getItem('user_email');
  this.apollo
  .mutate({
    mutation: APPROVE,
    variables:{
      user_email:this.id,
      pass:v
    }
  }).subscribe(({data})=>{
    this.modal=document.getElementById('mymodal_profile')
        //  console.log("Success:" +data);
         this.url=data;
         console.log("Success:" +this.url.resetPassword.success);

         if(this.url.resetPassword.success==1)
         { this.toastr.successToastr('Password changed successfully!', 'Done!');}
          else
         { this.toastr.errorToastr('Error while changing password!','Error!!');  }
  },(
    error=>{
      this.toastr.errorToastr('Error while changing password!','Error!!');
      return false;
    })  )
 }
 else{
  this.conf_pass=true;
 }


}


getvalue_client(cl_code:any,cl_name:any,cl_email:any,cl_mobile:any,cl_district:any,cl_Type:any,cl_op_mode:any,cl_address:any,cl_wrk_hrs:any,cl_amc_date:any,cl_rental_date:any){
  console.log("clientid:" +cl_code);
  console.log("Clientname:" +cl_name);
  console.log("client_email:"+cl_email);
  console.log("client_mobile:"+cl_mobile)
  console.log("client_district:" +cl_district);
  console.log("client_type:"+cl_Type);
  console.log("client_OP_mode:"+cl_op_mode);
  console.log("address:" +cl_address)
  console.log("client_Work_hrs:" +cl_wrk_hrs);
  console.log("client_amc_date:" +cl_amc_date);
  console.log("rental:" +cl_rental_date);
  this.toastr.successToastr('Profile updated successfully!', 'Done!');


}

}
