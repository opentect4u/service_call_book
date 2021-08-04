import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientraisetkt',
  templateUrl: './clientraisetkt.component.html',
  styleUrls: ['./clientraisetkt.component.css',
  '../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../assets/masters_css_js/css/apps.css',
  '../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../assets/masters_css_js/css/res.css']
})
export class ClientraisetktComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log("client")
  }
  go_to_AddItem(){
          this.router.navigate(['/Add/clientraisetkt']);
  }

}
