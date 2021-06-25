import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addnotify',
  templateUrl: './addnotify.component.html',
  styleUrls: ['./addnotify.component.css',
  '../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../assets/masters_css_js/css/res.css']
})
export class AddnotifyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('address','/Admin/Addnotification/addnotify');
  }

}
