import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
const ADD_MM=gql`
mutation insertMaster($mm: String,$user_id: String) {
  insertMaster(name: $mm, user_id: $user_id, db_type: 5) {
   message
  }
}`;
@Component({
  selector: 'app-addmm',
  templateUrl: './addmm.component.html',
  styleUrls: ['./addmm.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddmmComponent implements OnInit {

  constructor(private apollo: Apollo) { }
  userdata:any;
  disable_button=true;
  input_tag:any;
  msg='';
  error=false;
  done=false;
  ngOnInit(): void {
    this.input_tag=document.getElementById('itemname');
  }
  prevent_null(e:any){
    if(e.target.value==''){
      this.done=false;
      this.error=true;
      this.disable_button=true;
      this.msg="please provide module!"
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
      this.msg="Please provide module!"
      this.input_tag.style.border="solid red 1px"

    }
    else
     {this.apollo.mutate({
      mutation:ADD_MM,
      variables:{
        mm:v,
        user_id:'123'
      }
    }).subscribe(({data})=>{this.userdata=data;console.log(data);
      console.log("data:" +JSON.stringify(data))
      console.log(this.userdata.insertMaster.message)
      if(this.userdata.insertMaster.message=='Inserted Successfully !!')
      this.msg="Module added successfully!!"
    });
      this.done=true;
      
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