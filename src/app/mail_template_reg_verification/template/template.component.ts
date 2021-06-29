import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations'
import { Router } from '@angular/router';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css',
    '../../../assets/masters_css_js/css/font-awesome.css',
    '../../../assets/masters_css_js/css/apps.css',
    '../../../assets/masters_css_js/css/apps_inner.css',
    '../../../assets/masters_css_js/css/res.css'
  ],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({ opacity: 0 })))
    ])
  ]

})
export class TemplateComponent implements OnInit {
  message = true;
  loginbtn = true;
  constructor(private router:Router) { }
  divwelcome = false;
  ngOnInit(): void {
    localStorage.setItem('address','/template');

  }
  confirm() {
    this.divwelcome = true;
    setTimeout(() => {
      this.message = false
    }, 1000);
    setTimeout(() => {
      this.loginbtn = false
    }, 2500);
   
  }
  go() {
    this.router.navigate(['/']);
  }
}
