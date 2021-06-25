import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    localStorage.setItem('address', '/operations/editassignticket');
  }  preventNonNumericalInput(e:any){}
}
