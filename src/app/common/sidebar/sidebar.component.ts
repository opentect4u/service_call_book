import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { interval } from 'rxjs';
//import {MatDialog} from '@angular/material/dialog';


const GET_USER_TYPE=gql`
query  getUserDetailsById($user_id:String!){
  getUserDetailsById(user_id:$user_id){
    user_type,
    user_status
  }
}
`

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
  user:any;
  old_u_type:any;
  constructor(private router:Router,private apollo:Apollo) {
   
 
   }

  ngOnInit(): void {
      this.old_u_type=localStorage.getItem('user_Type');
       this.apollo.watchQuery<any>({
      query: GET_USER_TYPE,
      variables:{
        user_id:localStorage.getItem('UserId')
      },
      pollInterval:500

      
    }).valueChanges
    .subscribe(({ data}) => {
      console.log(data);
     localStorage.setItem('user_Type',data.getUserDetailsById[0].user_type) ;
      this.u_type=localStorage.getItem('user_Type');
      // if(data.getUserDetailsById[0].user_status=='D'){
      //   this.router.navigate(['/']);
      // }
      // else{

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
