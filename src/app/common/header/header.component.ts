import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
  '../../../assets/css/bootstrap.css',
  '../../../assets/css/font-awesome.css',
  '../../../assets/css/apps.css',
  '../../../assets/css/apps_inner.css',
  '../../../assets/css/res.css']
})
export class HeaderComponent implements OnInit {
   emp_name:any;
   type:any;
   name:any;
  constructor() { }

  ngOnInit(): void {
    setInterval(()=>{
      this.name = localStorage.getItem('user_name');
    this.emp_name= this.name == 'null' ? 'Admin' : localStorage.getItem('user_name');
    console.log(this.emp_name);
    var user_type = localStorage.getItem('user_Type');
    this.type= user_type =='A' ? 'Admin' : (user_type == 'M' ? 'Manager' : (user_type == 'T' ? 'Telecaller' : (user_type == 'E' ? 'Engineer' : (user_type == 'V' ? 'Viewer' : 'Client'))));
  },500);
  }

}
