import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

declare var showprofile: any;
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
   code_no:any;
   email_id:any;
   profile=false;
  constructor(private router:Router,public toastr: ToastrManager) { }

  ngOnInit(): void {
    setInterval(()=>{
      this.code_no=localStorage.getItem('UserId');
      this.email_id=localStorage.getItem('user_email');
      console.log(this.email_id);
      this.name = localStorage.getItem('user_name');
    this.emp_name= this.name == 'null' ? 'Admin' : localStorage.getItem('user_name');
    console.log(this.emp_name);
    var user_type = localStorage.getItem('user_Type');
    this.type= user_type =='A' ? 'Admin' : (user_type == 'M' ? 'Manager' : (user_type == 'T' ? 'Telecaller' : (user_type == 'E' ? 'Engineer' :  'Viewer')));
  },500);
  }
  logout(){
    localStorage.clear();
    localStorage.setItem('isLoggedIn',"false");
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });;
  }
 change_ps()
 {
   this.profile=false;
   console.log(this.profile)
 }
 change_cp(){
   this.profile=true;
   console.log(this.profile)
 }
 save(){
  this.toastr.successToastr('Profile updated successfully!', 'Done!');

 }
 change(){
  this.toastr.successToastr('Password changed successfully!', 'Done!');
 }

}
