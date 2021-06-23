import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
const ADD_OP=gql`
mutation insertMaster($op: String,$user_id: String) {
  insertMaster(name: $op, user_id: $user_id, db_type: 2) {
   message
  }
}`;
@Component({
  selector: 'app-addom',
  templateUrl: './addom.component.html',
  styleUrls: ['./addom.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddomComponent implements OnInit {

  constructor(private apollo:Apollo) { }

  input_tag:any;
  disable_button=true;
  msg='';
  userdata:any;
  error=false;
  done=false;
  ngOnInit(): void {
    this.input_tag=document.getElementById('itemname');
  }
  prevent_null(e:any){
    if(e.target.value==''){
      this.done=false;
      this.error=true;
      this.disable_button=true
      this.msg="please provide operational mode!"
      this.input_tag.style.border="solid red 1px"
    }
    else
    {
      console.log(e.target.value);
      this.error=false
      this.done=false
      this.disable_button=false;
      this.input_tag.style.border="1px solid lightgrey";
    }
  }
  send_item(v:any){
    if(v=='')
    {
      this.done=false;
      this.error=true;
      this.msg="Please provide operational mode!"
      this.input_tag.style.border="solid red 1px"

    }
    else
     {//alert(v);
      this.apollo.mutate({
        mutation:ADD_OP,
        variables:{
          op:v,
          user_id:'123'
        }
      }).subscribe(({data})=>{this.userdata=data;console.log(data);
        console.log("data:" +JSON.stringify(data))
        console.log(this.userdata.insertMaster.message)
        if(this.userdata.insertMaster.message=='Inserted Successfully !!')
        this.msg="Operational mode added successfully!!"
      });
      this.done=true;
     // this.msg="Operational mode added successfully!!"
     this.input_tag.value='';
     this.disable_button=true;
     this.input_tag.style.border="1px solid lightgrey";
    }
  }
  clear_field(){
    this.input_tag.value='';
    this.error=false;
    this.done=false;
    this.disable_button=true;
    this.input_tag.style.border="1px solid lightgrey";
      
  }
}
