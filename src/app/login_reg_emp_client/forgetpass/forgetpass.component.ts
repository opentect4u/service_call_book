import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css',
  '../../../assets/Login_assets/css/apps.css',
  '../../../assets/Login_assets/css/apps_inner.css',
 '../../../assets/Login_assets/css/res.css']
})
export class ForgetpassComponent implements OnInit {
  LoginForm!: FormGroup;
  login:boolean=false;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    // localStorage.setItem("address",'/forgetpassword');

    this.LoginForm = this.fb.group({
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]})
  }

  get f() {
    // console.log("touched:" +this.LoginForm.touched);
    return this.LoginForm.controls;
    


  }
  Submit(){
     this.login = true;
    if (this.LoginForm.invalid) {
      // this.sent=true;
      console.log("asdasda");
      return;
    }
      else{


        // this.sent=false;
        console.log("Email ID:" +this.f.email.value);
      }
    }

}


