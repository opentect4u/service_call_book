import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addclientraisetkt',
  templateUrl: './addclientraisetkt.component.html',
  styleUrls: ['./addclientraisetkt.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class AddclientraisetktComponent implements OnInit {
  public now: Date = new Date();
  constructor() {
    setInterval(() => {
      this.now = new Date();
    }, 1);
   }

  ngOnInit(): void {
  }

}
