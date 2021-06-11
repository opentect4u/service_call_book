import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addom',
  templateUrl: './addom.component.html',
  styleUrls: ['./addom.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  go_to_item(v:any){}
}
