import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  store:any;
  marker:any;
  marker1:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }



  // openclosedropdown(){
  //   this.store=document.getElementById('openclose');
  //   this.marker1=document.getElementById('openclose1');
  //   if(this.store.style.display=='block'){
  //       this.store.style.display='none';
  //     this.marker=document.getElementById('down');

    
  //     console.log("block");
  //    }
  //    else{
  //     this.marker1.style.display='none';
  //     this.store.style.display='block';
   
  //     console.log("none");

  //    }
    
  //   }

    openclosedropdown(){
      this.marker1=document.getElementById('openclose');
       this.store=document.getElementById('openclose1');
    if(this.store.style.display=='block'){
        this.store.style.display='none';
      this.marker=document.getElementById('down1');
    
      console.log("block");
     }
     else{
     // this.marker1.style.display='none';
      this.store.style.display='block';
   
      console.log("none");

     }
    



    }
    logout(){
      this.router.navigate(['/'])
    }

}
