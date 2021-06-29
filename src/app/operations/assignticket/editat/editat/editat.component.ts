import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
@Component({
  selector: 'app-editat',
  templateUrl: './editat.component.html',
  styleUrls: ['./editat.component.css', 
  '../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../assets/masters_css_js/css/res.css']
})
export class EditatComponent implements OnInit {

  constructor() { }
  today= new Date();
  todaysDataTime = '';
  ngOnInit(): void {
    setInterval(()=>{
      this.today= new Date();
      this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
      // this.dateitem.value=this.todaysDataTime;
     },1000);
    localStorage.setItem('address', '/operations/editassignticket');
  }  preventNonNumericalInput(e:any){}
}
