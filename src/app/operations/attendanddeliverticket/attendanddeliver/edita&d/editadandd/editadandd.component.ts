import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editadandd',
  templateUrl: './editadandd.component.html',
  styleUrls: ['./editadandd.component.css', 
  '../../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../../assets/masters_css_js/css/res.css']
})
export class EditadanddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  preventNonNumericalInput(e:any){}
}
