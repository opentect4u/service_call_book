import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('address','/dashboard')
  }

}
