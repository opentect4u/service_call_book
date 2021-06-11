import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
              '../../../assets/Login_assets/css/apps.css',
               '../../../assets/Login_assets/css/apps_inner.css',
              '../../../assets/Login_assets/css/res.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goto_home(){
    console.log("dashboard");
     this.router.navigate(['/dashboard'])

  }

}
