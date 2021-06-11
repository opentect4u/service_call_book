import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adde',
  templateUrl: './adde.component.html',
  styleUrls: ['./adde.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  preventNonNumericalInput(e:any){}
}
