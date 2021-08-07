import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',
  '../../assets/css/font-awesome.css',
  '../../assets/css/apps.css',
  '../../assets/css/apps_inner.css',
   '../../assets/css/res.css']
})
export class DashboardComponent implements OnInit {




   u_type:any;
  formattedDate : any;
  constructor(private router:Router) {


   }

  ngOnInit(): void {

     this.u_type=localStorage.getItem('user_Type');

    localStorage.setItem('Active', '1');
     localStorage.setItem('address','/dashboard')
     localStorage.setItem('updatectm','0');
    localStorage.setItem('addctm','0');
    localStorage.setItem('updateom','0');
    localStorage.setItem('addom','0');
    localStorage.setItem('updatets','0');
    localStorage.setItem('addts','0');
    localStorage.setItem('updatepm','0');
    localStorage.setItem('addpm','0');
    localStorage.setItem('updatemm','0');
    localStorage.setItem('addmm','0');
    localStorage.setItem('adde','0');
    localStorage.setItem('updatee','0');
    localStorage.setItem('updatec','0');
    localStorage.setItem('addc','0');



}

}

