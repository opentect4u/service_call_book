import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addts',
  templateUrl: './addts.component.html',
  styleUrls: ['./addts.component.css', 
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddtsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  go_to_item(v:any){}
}
