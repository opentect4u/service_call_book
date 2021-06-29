import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router'
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

  const SHOW_MM=gql`
  query{
    getModuleTypeData(id:"", db_type: 5){
      module_id
      module_type
    }
  }`
  const SHOW_PM=gql`
  query{
    getPriorityModeData(id:"", db_type: 4){
      priority_id
      priority_mode
    }
  }`
@Component({
  selector: 'app-addrt',
  templateUrl: './addrt.component.html',
  styleUrls: ['./addrt.component.css', 
  '../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../assets/masters_css_js/css/res.css']
})
export class AddrtComponent implements OnInit {

  constructor(private apollo:Apollo) { }
  mod:any;
  moddata:any;
  posts_pm:any;
  pmdata:any;
  posts:any;
  ctmdata:any;
  prevent_init_client=false;
  prevent_init_module=false;
  prevent_init_priority=false;
  prevent_init_issue=false;
  prevent_init_phone=false;
  cl_val=true;
  mm_val=true;
  prior_val=true;
  issue_val=true;
  phone_val=true;
  input_phone:any;
  input_issue:any;
  spinshow=false;
  ngOnInit(): void {
    this.input_phone=document.getElementById('itemphone');
    this.input_issue=document.getElementById('itemissue');

    localStorage.setItem('address','/operations/addraiseticket');
    this.apollo.watchQuery<any>({
      query: SHOW_MM
     
    })
      .valueChanges
      .subscribe(({ data }) => {
        //this.loading = loading;
        this.mod= data;
        console.log(data);
        this.moddata=this.mod.getModuleTypeData
        // console.log(this.ctmdata);
        
       
       //this.putdata(this.posts);
      });
     this.apollo.watchQuery<any>({
        query: SHOW_PM,
        
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
         
          this.posts_pm = data;
          this.pmdata=this.posts_pm.getPriorityModeData
          console.log(this.posts_pm);
        //  this.putdata(this.posts_pm);
        });

        this.apollo.watchQuery<any>({
          query: SHOW_CLIENT,
          //pollInterval:100,
          variables:{
            active:'1'
          }
        })
          .valueChanges
          .subscribe(({ data, loading }) => {
            
            this.posts = data;
           console.log(data)
           this.ctmdata=this.posts.getClient;
            console.log(this.posts);
          // this.putdata(this.posts);
          });
  
  }

  select_client(v:any){
    if(v=='')
    {
      this.cl_val=true;
      this.prevent_init_client=true;
    }
    else
    {
      this.cl_val=false;
      this.prevent_init_client=false;
    }
  }
  select_mm(v:any){
    if(v=='')
    {
      this.mm_val=true;
      this.prevent_init_module=true;
    }
    else
    {
      this.mm_val=false;
      this.prevent_init_module=false;
    }
  }
  select_priority(v:any){
    if(v=='')
    {
      this.prior_val=true;
      this.prevent_init_priority=true;
    }
    else
    {
      this.prior_val=false;
      this.prevent_init_priority=false;
    }
  }
  preventNonNumericalInput(e:any){e = e || window.event;
    
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
     { e.preventDefault();}}
  prevent_null(e:any){
    if(e.target.id=='itemphone')
    {
      if(e.target.value=='')
      {
        this.phone_val=true;
        this.prevent_init_phone=true;
        this.input_phone.style.border="solid red 1px"
        //this.hide_val=true;
      }
      else

       {
        this.prevent_init_phone=false;this.phone_val=false;this.input_phone.style.border="solid lightgrey 1px"}

    }
    if(e.target.id=='itemissue')
    {
      if(e.target.value=='')
      {
        this.issue_val=true;
        this.prevent_init_issue=true;
        this.input_issue.style.border="solid red 1px"
        //this.hide_val=true;
      }
      else

       {
        this.prevent_init_issue=false;this.issue_val=false;this.input_issue.style.border="solid lightgrey 1px"}

    }
  }
  clearfield(){this.spinshow=true;
    setTimeout(()=>{this.spinshow=false;;},1000);
    // this.spinshow=false;
  }

}
