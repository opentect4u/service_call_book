import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const GET_POST = gql`
mutation CreateUser($postId:String!,$userType:String!,$userId:String!,$Password:String!) {
  createUser(code_no: $postId, user_type: $userType, user_id: $userId, password: $Password ) {

    success
    message
  }
}`
;

const GET_SIGNUP = gql`
query checkUser($code_no: String!){
  checkUser(code_no: $code_no){
    success,
    message
  }
}
`;



// createUser(code_no: $postId, user_type: $userType, user_id: $userId, password: $Password ) {

//   success
//   message
// }

// {
// 	createUser(code_no: 132, user_type: "C", user_id: "sumanmitra0096@gmail.com", password: "1234" ){
//     success,
//     message
//   }
// }



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css',

  '../../../assets/Login_assets/css/apps.css',
  '../../../assets/Login_assets/css/apps_inner.css',
 '../../../assets/Login_assets/css/res.css'],




})
export class SignupComponent implements OnInit {
  x:any;
   recaptcha:any;
  show_Password:any;
  show_ConPassword:any;
  confirm:any;
  button_disabled:boolean=false;
  det:any;
  Name:any;
  Email:any;
  alerts:boolean=true;
  button:boolean=false;
  display:boolean=false;
  display1:boolean=true;
  val:any;
  show = true;
  LoginForm!: FormGroup;
  LoginForm_client!: FormGroup;
  login:boolean=false;
  login_c:boolean=false;
  inputValue:any='';
  details:any=[];
  captch_employee:boolean=false
  captch_cli:boolean=false;
  pass:any;
  conspass:any;
  // successfull_register:boolean=true;
  // messageSuccess:boolean=true;
  log_msg:any;
  modal:any;

  loader:boolean=true;
  constructor(private apollo: Apollo,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    var alpha=['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
    'O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '1','2','3','4','5','6','7','8','9','0',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v','w','x','y','z',];
    var a=alpha[Math.floor(Math.random()*62)]
    var b=alpha[Math.floor(Math.random()*62)]
    var c=alpha[Math.floor(Math.random()*62)]
    var d=alpha[Math.floor(Math.random()*62)]
    var e=alpha[Math.floor(Math.random()*62)]
    var f=alpha[Math.floor(Math.random()*62)]
    var g=alpha[Math.floor(Math.random()*62)]
    var sum=a+b+c+d+e+f+g;
    this.recaptcha=document.getElementById("capt");
    this.recaptcha.value=sum;
    this.recaptcha=document.getElementById("capt_client");
    this.recaptcha.value=sum;



    var alpha=['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
    'O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '1','2','3','4','5','6','7','8','9','0',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v','w','x','y','z',];
    var a=alpha[Math.floor(Math.random()*62)]
    var b=alpha[Math.floor(Math.random()*62)]
    var c=alpha[Math.floor(Math.random()*62)]
    var d=alpha[Math.floor(Math.random()*62)]
    var e=alpha[Math.floor(Math.random()*62)]
    var f=alpha[Math.floor(Math.random()*62)]
    var g=alpha[Math.floor(Math.random()*62)]
    var sum=a+b+c+d+e+f+g;
    this.recaptcha=document.getElementById("capt");
    this.recaptcha.value=sum;



    localStorage.setItem('address','/signup')
    localStorage.setItem("Employee_signup",'0')


    this.val=document.getElementById('home');
    this.val.className='active'

    this.LoginForm = this.fb.group({
      code:['',Validators.required],
      name:[''],
      type:['',Validators.required],
      Email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      pass:['',Validators.required],
      conpass:['',Validators.required],
      captcha_emp:['',Validators.required]
    }
    );

    this.LoginForm_client = this.fb.group({
      client_code:['',Validators.required],
      client_name:[''],
      client_email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      client_pass:['',Validators.required],
      client_conpass:['',Validators.required],
      captcha_client:['',Validators.required]

    }
    );
  }





  get c(){
    return this.LoginForm_client.controls;

  }


  get f(){

    return this.LoginForm.controls;
  }

  open_employee(){





    this.login_c=false;
    this.display=true;
    this.val=document.getElementById('menu1');
     this.val.className='active'
    this.display1=false;





  }
  open_client(){


    this.login=false;
    this.display=false;
    this.val=document.getElementById('home');
    this.val.className='active'
    this.display1=true;


  }

  Submit_client(){
    this.recaptcha=document.getElementById("capt_client");

    this.login_c=true;
    if(this.LoginForm_client.invalid){
    console.log("fire");
     return ;
      }
     else{




       if(this.c.client_pass.value == this.c.client_conpass.value){
           if(this.c.captcha_client.value == this.recaptcha.value){
            console.log("right captcha");
            console.log("water");
          }
           else{
            console.log("wrong captcha");
              this.captch_cli=true;
           }
        }
        else{
           console.log("wrong password");
          }
       }



  }
  Submit(){
    this.recaptcha=document.getElementById("capt");
    this.login=true;
    this.Email=document.getElementById("emp_email");

    console.log("Email:" +this.Email.value);

    //  this.f.Email.value=this.Email.value;
    // this.LoginForm.value.name=  this.Name.value;
    this.LoginForm.value.Email=  this.Email.value;
    this.f.Email.setValue(this.LoginForm.value.Email);
    // this.f.name.setValue(this.LoginForm.value.name);
    console.log(this.f);
    if(this.LoginForm.invalid){
     console.log("validation");
     return;
    }
    else{
      // console.log("alerts:" +this.alerts);
      if(this.f.pass.value == this.f.conpass.value)
      {
        if(this.recaptcha.value == this.f.captcha_emp.value){

        this.Email=document.getElementById("emp_email");
        console.log("Email3:" +this.Email.value);
        // console.log("alerts:" +this.alerts);
       this.apollo
      .mutate({
        mutation: GET_POST,
        variables:{
          postId:this.f.code.value,
           userType:this.f.type.value,
            userId:this.Email.value,
            Password:this.f.pass.value


        }
      }).subscribe(({data})=>{
         this.det= data;
         if(this.det.createUser.success == 2 || this.det.createUser.success == 0){
           alert(this.det.createUser.message);
            // this.router.navigate(['/']);
         }else if(this.det.createUser.success == 1 ){
           localStorage.setItem("Employee_signup",'1');
           console.log("Successfully Inserted");
          //  this.successfull_register=false;
           this.router.navigate(['/']);
         }

         else
         this.showsnackbar();
     },error=>{ this.showsnackbar()
     });
      }
      else{
        this.captch_employee=true;

      }



    }
    else{

      alert("Passwords are not matched,please check passwords");


    }
    }
   }

   showsnackbar() {
    // alert("error");
     this.x = document.getElementById("snackbar");
     this.x.className = "show";
     setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 3000);
   }




  sendTheNewValue(event: any) {
    // this.messageSuccess=true;

     if( event.target.value==''){
      this.Name=document.getElementById("emp_name");
      this.Email=document.getElementById("emp_email");
      this.Name.value= '';
      this.Email.value=''


     }
     else{
    // this.inputValue1 = '';
    this.button_disabled=false;
    this.inputValue = event.target.value;
    this.apollo.watchQuery<any>({
      query: GET_SIGNUP,
      variables:{
        code_no:this.f.code.value

      }

    })
      .valueChanges
      .subscribe(({ data, loading}) => {
        if(data.checkUser.success==1){



        // alert("Data already exists")


        console.log("data:" +JSON.stringify(data.checkUser.message));
        this.details=JSON.parse(data.checkUser.message);
       console.log("dta2:" +this.details[0].name);
       console.log("dta2:" +this.details[0].email);
       this.Name=document.getElementById("emp_name");
        this.Email=document.getElementById("emp_email");
       this.Name.value=this.details[0].name;
       this.Email.value=this.details[0].email;
       console.log("Email:" +this.Email.value);
       console.log("Email");
        // this.LoginForm.value.name=this.Name.value;
        this.LoginForm.value.Email=this.details[0].email;
        this.f.Email.setValue(this.LoginForm.value.Email);
        console.log(this.LoginForm.value);
            console.log(this.f.Email.value)
      //  console.log(this.f.Email.value);

        // this.button_disabled=true;
        }
      else if(data.checkUser.success==0 || data.checkUser.success==2){

          this.details=JSON.parse(JSON.stringify(data.checkUser.message));
          this.log_msg = data.checkUser.success==2 ? (JSON.parse(data.checkUser.message)[0].log_done>0 ? 'Already Registered' : 'Warning') :  data.checkUser.message;
          this.Name=document.getElementById("emp_name");
          this.Email=document.getElementById("emp_email");
          this.Name.value=data.checkUser.success==2 ? JSON.parse(data.checkUser.message)[0].name : '';
          this.Email.value=data.checkUser.success==2 ? JSON.parse(data.checkUser.message)[0].email : '';
          // alert(this.details);
          console.log("Email:" +this.Email.value)
          // alert(this.log_msg);
          this.modal=document.getElementById("openModalButton")
          this.modal.click();
          // this.messageSuccess=false;
          // console.log("success:"+this.messageSuccess);
          this.button_disabled=true;


        }


      })
    }




    // this.isReadonly = false;
    // this.inputValue1 = '';

    // this.inputValue = event.target.value;

    // console.log(this.inputValue);

    // this.service.getdata().subscribe(data => {
    //   this.Shown = data;
    //   this.inputValue1 = '';
    //   console.log(this.Shown);
    //   for (let i = 0; i < this.Shown.data.length; i++) {
    //     console.log(this.Shown.data[i].name);
    //     if (this.inputValue == this.Shown.data[i].id) {
    //       this.inputValue1 = this.Shown.data[i].name;
    //        alert('Client Already registered')

    //        console.log(this.inputValue);
    //        this.isReadonly = true;
    //        console.log(this.inputValue1);
    //     }
    //     else {
    //       console.log("success")
    //       console.log(this.inputValue1);


    //     }
      }



    // })
    // this.inputValue = event.target.value;
    // }

    // close_alert(){
    //   this.alerts=true;
    //  }


    preventNonNumericalInput(e: any) {
      e = e || window.event;
      var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
      var charStr = String.fromCharCode(charCode);

      if (!charStr.match(/^[0-9]+$/))
        e.preventDefault();
    }

    mypassword(){
      this.show_Password=document.getElementById('Passd_emp');
      if (this.show_Password.type === "password") {
        this.show_Password.type = "text";
      } else {
        this.show_Password.type = "password";
      }

    }
    myconfirm(){
      this.show_ConPassword=document.getElementById('conpasswd');
      if (this.show_ConPassword.type === "password") {
        this.show_ConPassword.type = "text";
      } else {
        this.show_ConPassword.type = "password";
      }


    }


    refresh_captcha_emp(){
      var alpha=['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
    'O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '1','2','3','4','5','6','7','8','9','0',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v','w','x','y','z',];
    var a=alpha[Math.floor(Math.random()*62)]
    var b=alpha[Math.floor(Math.random()*62)]
    var c=alpha[Math.floor(Math.random()*62)]
    var d=alpha[Math.floor(Math.random()*62)]
    var e=alpha[Math.floor(Math.random()*62)]
    var f=alpha[Math.floor(Math.random()*62)]
    var g=alpha[Math.floor(Math.random()*62)]
    var sum=a+b+c+d+e+f+g;
    this.recaptcha=document.getElementById("capt");
    this.recaptcha.value=sum;


    }

    refresh_captcha_client(){
      var alpha=['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
      'O','P','Q','R','S','T','U','V','W','X','Y','Z',
      '1','2','3','4','5','6','7','8','9','0',
      'a','b','c','d','e','f','g','h','i','j','k','l','m','n',
      'o','p','q','r','s','t','u','v','w','x','y','z',];
      var a=alpha[Math.floor(Math.random()*62)]
      var b=alpha[Math.floor(Math.random()*62)]
      var c=alpha[Math.floor(Math.random()*62)]
      var d=alpha[Math.floor(Math.random()*62)]
      var e=alpha[Math.floor(Math.random()*62)]
      var f=alpha[Math.floor(Math.random()*62)]
      var g=alpha[Math.floor(Math.random()*62)]
      var sum=a+b+c+d+e+f+g;
      this.recaptcha=document.getElementById("capt_client");
      this.recaptcha.value=sum;


    }


    client_password(){

      this.show_Password=document.getElementById('client_confirm');
      if (this.show_Password.type === "password") {
        this.show_Password.type = "text";
      } else {
        this.show_Password.type = "password";
      }

    }
    myconfirm_client_password(){
      this.show_ConPassword=document.getElementById('client');
      if (this.show_ConPassword.type === "password") {
        this.show_ConPassword.type = "text";
      } else {
        this.show_ConPassword.type = "password";
      }


    }
    // close_alert(){
    //  this.successfull_register=true;
    // }



  }




