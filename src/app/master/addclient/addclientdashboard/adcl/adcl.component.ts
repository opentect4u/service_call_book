import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adcl',
  templateUrl: './adcl.component.html',
  styleUrls: ['./adcl.component.css', 
  '../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../assets/masters_css_js/css/res.css']
})
export class AdclComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  preventNonNumericalInput(e:any){}

}
