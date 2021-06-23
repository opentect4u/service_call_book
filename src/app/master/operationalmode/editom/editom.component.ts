import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
const EDIT_OP=gql`
mutation updateMaster($id:String, $name: String,$user_id: String) {
  updateMaster(id:$id,name: $name, user_id: $user_id, db_type: 2) {
   message
  }
}`;
@Component({
  selector: 'app-editom',
  templateUrl: './editom.component.html',
  styleUrls: ['./editom.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class EditomComponent implements OnInit {
  item1: any;
  item2: any;

  constructor(private route:ActivatedRoute,private router:Router,private apollo: Apollo) { }
  userdata:any;
  error=false;
  done=false;
  input_tag:any;
  msg='';
  disable_button=false;
  ngOnInit(): void {
    localStorage.setItem('address','/operationmode/editom'); 
    this.route.params.forEach((params: any) => {
      this.item1 = params['id1'];
      this.item2 = params['id2'];})
    this.input_tag=document.getElementById('itemtype');
  }
  prevent_null(e:any){
    if(e.target.value==''){
      this.done=false;
      this.error=true;
      this.disable_button=true;
      this.msg="please provide client type!"
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
  send_item(v1:any,v2:any){
    if(v2=='')
    {
      this.done=false;
      this.error=true;
      this.msg="Please provide Operational mode!"
      this.input_tag.style.border="solid red 1px"

    }
    else
     {this.apollo.mutate({
      mutation:EDIT_OP,
      variables:{
        id:v1,
        name:v2,
        user_id:localStorage.getItem("UserId")
      }
    }).subscribe(({data})=>{this.userdata=data;console.log(data);
      console.log("data:" +JSON.stringify(data))
      console.log(this.userdata.updateMaster.message)
      if(this.userdata.updateMaster.message=='Updated Successfully !!')
      //this.msg="Operational mode updated successfully!!"
      this.router.navigate(['/operationmode/dashboard'])
    });
      this.done=true;
      this.msg="Operational mode updated successfully!!"
     //this.input_tag.value='';
     this.disable_button=false;
     this.input_tag.style.border="1px solid lightgrey";
    }
  }
  clear_field(){
    this.input_tag.value='';
    this.error=false;
    this.done=false;
    this.input_tag.style.border="1px solid lightgrey";
      
  }
}
