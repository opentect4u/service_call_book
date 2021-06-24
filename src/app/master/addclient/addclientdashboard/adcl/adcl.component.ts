import { Component, OnDestroy, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router'
const ADD_CLIENT=gql`
mutation insertClient($client_name: String,
  $district_id: String,
  $client_type_id: String,
  $oprn_mode_id: String,
  $client_addr: String,
  $tech_person: String,
  $tech_designation: String,
  $phone_no: String,
  $email: String,
  $working_hrs: String,
  $support_mode: String,
  $amc_upto: String,
  $rental_upto: String,
  $support_status: String,
  $remarks: String) {
    insertClient(client_name: $client_name,
      district_id: $district_id,
      client_type_id: $client_type_id,
      oprn_mode_id: $oprn_mode_id,
      client_addr: $client_addr,
      tech_person: $tech_person,
      tech_designation: $tech_designation,
      phone_no: $phone_no,
      email: $email,
      working_hrs: $working_hrs,
      support_mode: $support_mode,
      amc_upto: $amc_upto,
      rental_upto: $rental_upto,
      support_status: $support_status,
      remarks: $remarks) {
     message
    }
  }`
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
@Component({
  selector: 'app-adcl',
  templateUrl: './adcl.component.html',
  styleUrls: ['./adcl.component.css', 
  '../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../assets/masters_css_js/css/res.css']
})
export class AdclComponent implements OnInit,OnDestroy {
  getamc:any;
  getrental:any;
  getactive:any;
  getinactive:any;
  loading: boolean=false;
  posts: any;
  loading1: boolean=false;
  posts1: any;
  done=false;
  notavalidemail: any;
  email_null: any;
  confirm_email: any;
  input_email: any;
  namevalid:any;
  distvalid:any;
  ctmvalid:any;
  oprnvalid:any;
  addressvalid:any;
  phonevalid:any;
  amcvalid:any;
  rentalvalid:any;
  input_name:any;
  input_phone:any;
  input_address:any;
  status:any;
  input_workinghours:any;
  input_technicalcontact:any;
  input_designation:any;
  input_rental:any;
  input_amc:any;
  radio_rental:any;
  radio_amc:any;
  radio_active:any;
  radio_inactive:any
  input_remarks:any;
  select_d: any;
  constructor(private router:Router,private apollo:Apollo) { }
  userdata:any;
  ctmdata:any=[];
  opdata:any=[];
  districts:any;
  distdata:any;
  mode_select:any;
  select_c:any;
  select_o:any;
  private querySubscription: Subscription = new Subscription;
  private querySubscription1: Subscription = new Subscription;
  ngOnInit(): void {
    this.email_null=false;
    this.namevalid=false;
    this.addressvalid=false;
    this.phonevalid=false;
    this.distvalid=false;
    this.ctmvalid=false;
    this.mode_select=true;
    this.oprnvalid=false;
    this.status=true
    // this.amcvalid=true;
    // this.rentalvalid=true;
    this.notavalidemail=true;
    this.select_d=document.getElementById('district');
    this.select_c=document.getElementById('ctm');
    this.select_o=document.getElementById('op');
    this.input_name=document.getElementById('itemname');
    this.input_phone=document.getElementById('itemphone');
    this.input_address=document.getElementById('itemaddress');
    this.input_designation=document.getElementById('itemdesig');
    this.input_technicalcontact=document.getElementById('itemcontact');
    this.input_remarks=document.getElementById('itemremarks');
    this.input_rental=document.getElementById('itemrental');
    this.input_amc=document.getElementById('itemamc');
    this.radio_active=document.getElementById('a');
    this.radio_inactive=document.getElementById('i');
    this.radio_amc=document.getElementById('AMC');
    this.radio_rental=document.getElementById('Rental');
    this.input_workinghours=document.getElementById('itemhours')
    this.fetch_ctm();
    this.fetch_op();
    this.input_email=document.getElementById('itememail')
    // this.fetch_op();
    // this.fetch_ctm();
    this.apollo.watchQuery<any>({
      query: SHOW_DIST
     
    })
      .valueChanges
      .subscribe(({ data }) => {
        //this.loading = loading;
        this.districts = data;
        console.log(data);
        this.distdata=this.districts.getDistrict
        console.log(this.ctmdata);
        
       
       //this.putdata(this.posts);
      });

  }
  select_status(){
    this.status=false;
  }
  // change_amcupto(v:any){
  //   if(v=='')
  //   this.amcvalid=true;
  //   else
  //   this.amcvalid=false;
  // }
  
  // change_rentalupto(v:any){
  //  // alert(v);
  //   if(v=='')
  //   this.rentalvalid=true;
  //   else
  //   this.rentalvalid=false;
  // }
  select_district(v:any){
    if(v=='')
    this.distvalid=true;
    else
    this.distvalid=false;
  }
  select_client_type(v:any){
    if(v=='')
    this.ctmvalid=true;
    else
    this.ctmvalid=false;
  }
  select_operation(v:any){
    if(v=='')
    this.oprnvalid=true;
    else
    this.oprnvalid=false;
  }
  select_mode(){
this.mode_select=false;
  }
  prevent_null(e:any){
    this.done=false;
    if(e.target.id=='itemname')
    {
      if(e.target.value=='')
      {
        this.namevalid=true;
        this.input_name.style.border="solid red 1px"
       // this.hide_val=true;
      }
      else
       {this.namevalid=false;this.input_name.style.border="solid lightgrey 1px"}
    }
    else if(e.target.id=='itemphone')
    {
      if(e.target.value=='')
      {
        this.phonevalid=true;
        this.input_phone.style.border="solid red 1px"
        //this.hide_val=true;
      }
      else
       {this.phonevalid=false;this.input_phone.style.border="solid lightgrey 1px"}
    }
    else if(e.target.id=='itemaddress')
    {
      if(e.target.value=='')
      {
        this.addressvalid=true;
        this.input_address.style.border="solid red 1px"
       // this.hide_val=true;
      }
      else
       {this.addressvalid=false;this.input_address.style.border="solid lightgrey 1px";}
    }
    
    else{}

  }
  check_email_validity(event: any) {
    var em = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!em.test(event.target.value)) { this.confirm_email = "*Not a valid Email ID";this.input_email.style.border="solid red 1px";this.notavalidemail=true; if(event.target.value==''){this.notavalidemail=false;this.email_null=true;this.input_email.style.border="solid red 1px"}}
    else { this.notavalidemail=false; this.email_null=false;this.input_email.style.border="solid lightgrey 1px"}
  }
  fetch_ctm(){
    this.apollo.watchQuery<any>({
      query: SHOW_CLIENT_TYPE,
      variables:{
        id:""
      }
    })
      .valueChanges
      .subscribe(({ data }) => {
        //this.loading = loading;
        this.posts = data;
        this.ctmdata=this.posts.getClientTypeData
        console.log(this.ctmdata);
        
       
       //this.putdata(this.posts);
      });
      
  }
  fetch_op(){ 
    this.apollo.watchQuery<any>({
    query: SHOW_OP,
    variables:{
        id:""
      }
  })
    .valueChanges
    .subscribe(({ data }) => {
      //this.loading1 = loading;
      this.posts1 = data;
      this.opdata=this.posts1.getOprnModeData
      console.log(this.opdata);
    // this.putdata(this.posts);
    });}
  send_data(name:any,dist:any,comp:any,ctm:any,address:any,contact:any,designation:any,phone:any,email:any,amcupto:any,rentalupto:any,remarks:any,amcrentalradio:any,activeinactiveradio:any,workinghours:any){
    this.getamc=document.getElementById('AMC');
    this.getrental=document.getElementById('Rental');
    this.getactive=document.getElementById('a');
    this.getinactive=document.getElementById('i');
    if(this.getamc.checked)
    amcrentalradio=this.getamc.value;
    if(this.getrental.checked)
    amcrentalradio=this.getrental.value;

    if(this.getactive.checked)
    activeinactiveradio=this.getactive.value;
    if(this.getinactive.checked)
    activeinactiveradio=this.getinactive.value;
    this.apollo.mutate({
      mutation:ADD_CLIENT,
      variables:{
        client_name: name,
        district_id: dist,
        client_type_id: ctm,
        oprn_mode_id: comp,
        client_addr: address,
        tech_person: contact,
        tech_designation: designation,
        phone_no: phone,
        email: email,
        working_hrs: workinghours,
        support_mode: amcrentalradio,
        amc_upto: amcupto,
        rental_upto: rentalupto,
        support_status:activeinactiveradio,
        remarks: remarks
        
      }
    }).subscribe(({data})=>{this.userdata=data;console.log(data);
      console.log("data:" +JSON.stringify(data))
      console.log(this.userdata.insertClient.message)
      if(this.userdata.insertClient.message=='Inserted Successfully !!!')
      { localStorage.setItem('updatec','1');
        this.router.navigate(['/addclient/dashboard'])
        this.done=true; this.email_null=false;
        this.namevalid=false;
        this.addressvalid=false;
        this.phonevalid=false;
        this.distvalid=false;
        this.ctmvalid=false;
        this.mode_select=true;
        this.oprnvalid=false;
        this.status=true
        this.amcvalid=true;
        this.rentalvalid=true;
        this.notavalidemail=true;
        //this.done=false;
        this.input_name.value='';
        this.input_phone.value='';
        this.input_technicalcontact.value='';
        this.input_workinghours.value='';
        this.input_remarks.value='';
        this.input_designation.value='';
        this.input_amc.value='';
        this.input_address.value='';
        this.input_rental.value='';
        this.input_email.value='';
        this.radio_active.checked=false;
        this.radio_inactive.checked=false;
        this.radio_amc.checked=false;
        this.radio_rental.checked=false;
        this.input_workinghours.value='';
        
        this.select_c.value='';
        this.select_d.value='';
        this.select_o.value='';}
      
    });
    //console.log(name+" "+dist+" "+comp+" "+ctm+" "+address+" "+contact+" "+designation+" "+phone+" "+email+" "+amcupto+" "+rentalupto+" "+remarks+" "+amcrentalradio+" "+activeinactiveradio)
  }
  preventNonNumericalInput(e:any){
    e = e || window.event;
    
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
     { e.preventDefault();}
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.querySubscription1.unsubscribe();
  }
  clearfield(){
    console.log(this.radio_amc);
    this.email_null=false;
    this.namevalid=false;
    this.addressvalid=false;
    this.phonevalid=false;
    this.distvalid=false;
    this.ctmvalid=false;
    this.mode_select=true;
    this.oprnvalid=false;
    this.status=true
    this.amcvalid=true;
    this.rentalvalid=true;
    this.notavalidemail=true;
    this.done=false;
    this.input_name.value='';
    this.input_phone.value='';
    this.input_technicalcontact.value='';
    this.input_workinghours.value='';
    this.input_remarks.value='';
    this.input_designation.value='';
    this.input_amc.value='';
    this.input_address.value='';
    this.input_rental.value='';
    this.input_email.value='';
    this.radio_active.checked=false;
    this.radio_inactive.checked=false;
    this.radio_amc.checked=false;
    this.radio_rental.checked=false;
    this.input_workinghours.value='';
    
    this.select_c.value='';
    this.select_d.value='';
    this.select_o.value='';
    //location.reload();
  }

  
    

  
}
