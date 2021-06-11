import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css',

  '../../../assets/Login_assets/css/apps.css',
  '../../../assets/Login_assets/css/apps_inner.css',
 '../../../assets/Login_assets/css/res.css'],

 
 

})
export class SignupComponent implements OnInit {
  display:boolean=false;
  display1:boolean=true;
  val:any;
  show = true;
  constructor() { }

  ngOnInit(): void {
    this.val=document.getElementById('home');
    this.val.className='active'
  }

  open_employee(){
   
    this.display=true;
    this.val=document.getElementById('menu1');
     this.val.className='active'
    this.display1=false;


   
  }
  open_client(){
    this.display=false;
    this.val=document.getElementById('home');
    this.val.className='active'
    this.display1=true;
  
    
  }

}
