import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import {MatDialog} from '@angular/material/dialog';


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
  constructor(private router:Router) {
   
 
   }

  ngOnInit(): void {
    this.u_type=localStorage.getItem('user_Type');
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
      this.router.navigate(['/']);
    }

}
