import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('address','/operations/addraiseticket');
  }

}
