import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { interval } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

//import {MatDialog} from '@angular/material/dialog';


const GET_USER_TYPE=gql`
query  getUserDetailsById($user_email:String!){
  getUserDetailsById(user_email:$user_email){
    user_type,
    user_status
  }
}
`
;
const conf_tkt=gql`query checkTktNo($tkt_no: String!){
  checkTktNo(tkt_no: $tkt_no){
    message
    success
  }
}`

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css',
  '../../../assets/css/bootstrap.css',
  '../../../assets/css/font-awesome.css',
  '../../../assets/css/apps.css',
  '../../../assets/css/apps_inner.css',
  '../../../assets/css/res.css'
]
})
export class SidebarComponent implements OnInit {
   u_type:any;
  store:any;
  marker:any;
  marker1:any;
  admindropdown:any;
  searchtkt:any;
  utype:boolean=true;
  Etype:boolean=true;
  Ctype:boolean=true;
  user:any;
  done_dt_frm=true;
  done_dt_to=true;
  done=true;
  prevent=false;
  old_u_type:any;

  tkt:any;
  ct=0;
  frm:any;
  done_dt=true;
  t:any;

  constructor(public toastr: ToastrManager,private router:Router,private apollo:Apollo) {


   }

  ngOnInit(): void {
    this.frm=document.getElementById('frm');
    this.t=document.getElementById('t');
      this.old_u_type=localStorage.getItem('user_Type');
       this.apollo.watchQuery<any>({
      query: GET_USER_TYPE,
      variables:{
        user_email:localStorage.getItem('user_email')
      },
      pollInterval:500


    }).valueChanges
    .subscribe(({ data}) => {
      console.log(data);
     localStorage.setItem('user_Type',data.getUserDetailsById[0].user_type) ;
      this.u_type=localStorage.getItem('user_Type');
            if(this.u_type=='C'){
              this.Ctype=true;
            }
            else{
              this.Ctype=false;
            }

        if(this.u_type=='T'){
        this.utype=true;
        }
        else{
            this.utype=false;
        }
        if(this.u_type=='E'){
            this.Etype=true;
        }
        else{
          this.Etype=false;
        }
        if(this.old_u_type!=this.u_type)
        {
          this.old_u_type=this.u_type;
          this.router.navigate(['/dashboard'])
        }



//  }
    })





    // setInterval(()=>{alert(localStorage.getItem('user_Type'));},6000)

  }
  make_date_true(){this.done_dt_frm=true;this.done_dt_to=true;this.ct=0; this.done_dt=true;
  this.frm=document.getElementById('frm');
  this.frm.value='';
  this.t=document.getElementById('t');
  this.t.value='';

  }
prevent_null_frm(){this.done_dt_frm=false;
if(this.t.value=='' || (this.frm.value>this.t.value))
this.done_dt=true;
else
this.done_dt=false;

}
prevent_null_to(){this.done_dt_to=false;
  if(this.frm.value=='' || (this.frm.value>this.t.value))
  this.done_dt=true;
  else
  this.done_dt=false;
}
 prevent_null(e:any){
   if(e.target.value=='')
   {this.done=true; this.prevent=true;}
   else
  { this.done=false;this.prevent=false;}
 }

make_true(){
  this.prevent=false;
  this.done=true;
  this.tkt=document.getElementById('tkt_no');
  this.tkt.value='';
}
srch_tkt(v:any){
//alert(v);
this.apollo
.watchQuery<any>({
  query:conf_tkt,
  variables: {
    tkt_no:v,
  },
})
.valueChanges.subscribe(({ data }) => {
    if(data.checkTktNo.success==1){
      this.router.navigate(['/search_ticket',btoa(v)]);

    }
    else{
        this.toastr.errorToastr('No Data Found','Error!')
    }
}, (error=>{
  this.toastr.errorToastr('Something went wrong!','Error!')
}))


}
srch_dt(v1:any,v2:any){
  this.router.navigate(['/search_date',btoa(v1),btoa(v2)])
}
  openclosedropdown1(){


    this.u_type=localStorage.getItem('user_Type');

    this.store=document.getElementById('openclose');
    console.log(this.store.style);
    this.marker1=document.getElementById('openclose1');
    this.admindropdown=document.getElementById('openclose_admin');
    this.searchtkt=document.getElementById('openclose_searchtkt');
    if( this.u_type=='A'||  this.u_type=='M' || this.u_type=='T'){
    if(this.store.style.display=='block'){
        this.store.style.display='none';


      this.marker=document.getElementById('down');


      console.log("block");
     }
     else{

      this.marker1.style.display='none';
      this.store.style.display='block';
      this.searchtkt.style.display='none';

      console.log(this.store);
      console.log("none");
      if( this.u_type=='A'||  this.u_type=='M'){
        this.admindropdown.style.display='none';

      }


     }
    }
    else{
      // this.admindropdown=document.getElementById('openclose_admin');
    this.searchtkt=document.getElementById('openclose_searchtkt');
    this.store=document.getElementById('openclose');
    if(this.store.style.display=='block'){
      this.store.style.display='none';


      this.marker=document.getElementById('down');


    console.log("block");
   }
   else{
       this.store.style.display='block';
       this.searchtkt.style.display='none';
      //  this.admindropdown.style.display='none';

   }

    }




    }

    openclosedropdown(){
      this.u_type=localStorage.getItem('user_Type');
      this.marker1=document.getElementById('openclose');
       this.store=document.getElementById('openclose1');
       this.admindropdown=document.getElementById('openclose_admin');
       this.searchtkt=document.getElementById('openclose_searchtkt');

       if(this.store.style.display=='block'){

        this.store.style.display='none';
        // this.admindropdown.style.dispaly='none'

      this.marker=document.getElementById('down1');

      console.log("block");
     }
     else{
      this.marker1.style.display='none';

      if(this.u_type=='A'||this.u_type=='M')
      this.admindropdown.style.display='none';

      this.searchtkt.style.display='none';

      this.store.style.display='block';


      console.log("none");

     }




    }
    opencloseadminsubmenu(){
      this.u_type=localStorage.getItem('user_Type');
      this.marker1=document.getElementById('openclose');
      this.store=document.getElementById('openclose1');
      this.admindropdown=document.getElementById('openclose_admin');
      this.searchtkt=document.getElementById('openclose_searchtkt');
      if( this.u_type=='A'||  this.u_type=='M'){
      if(this.admindropdown.style.display == 'block'){
        this.admindropdown.style.display='none';



      }
      else{
        this.store.style.display='none';
        this.marker1.style.display='none';
        this.searchtkt.style.display='none';
        this.admindropdown.style.display='block';


      }
    }
    // else{
    //   this.store=document.getElementById('openclose1');
    //   this.admindropdown=document.getElementById('openclose_admin');
    //   this.searchtkt=document.getElementById('openclose_searchtkt');
    //   if(this.admindropdown.style.display == 'block'){
    //     this.admindropdown.style.display='none';



    //   }
    //   else{
    //     this.store.style.display='none';

    //     this.searchtkt.style.display='none';
    //     this.admindropdown.style.display='block';


    //   }

    // }


    }

    openclosesearchticket(){
      this.u_type=localStorage.getItem('user_Type');
      this.marker1=document.getElementById('openclose');
      this.store=document.getElementById('openclose1');
      this.admindropdown=document.getElementById('openclose_admin');
      this.searchtkt=document.getElementById('openclose_searchtkt');
      if( this.u_type=='A' ||  this.u_type=='M' || this.u_type=='T'){
      if(this.searchtkt.style.display == 'block')
      {
        this.searchtkt.style.display='none';
      }
      else{
        this.store.style.display='none';
        this.marker1.style.display='none';
        // this.admindropdown.style.display='none';
        this.searchtkt.style.display='block';
        if(this.u_type=='A' || this.u_type=='M'){
          this.admindropdown.style.display='none';
        }


      }
    }
    else{
      this.marker1=document.getElementById('openclose');

      this.searchtkt=document.getElementById('openclose_searchtkt');
      if(this.searchtkt.style.display == 'block')
      {
        this.searchtkt.style.display='none';
      }
      else{
        this.marker1.style.display='none';

        this.searchtkt.style.display='block';

      }

    }


    }





    logout(){
      localStorage.clear();
      localStorage.setItem('isLoggedIn',"false");
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });;
    }

}
