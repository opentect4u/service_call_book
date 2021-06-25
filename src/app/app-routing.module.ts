import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
// import { AfterloginGuard } from './Gaurds/AfterLoginGaurds/afterlogin.guard';
// import { LoginGuard } from './Gaurds/LoginGaurds/login.guard';

import { ForgetpassComponent } from './login_reg_emp_client/forgetpass/forgetpass.component';
import { LoginComponent } from './login_reg_emp_client/login/login.component';
import { SignupComponent } from './login_reg_emp_client/signup/signup.component';
import { AdclComponent } from './master/addclient/addclientdashboard/adcl/adcl.component';
import { AddclientdashboardComponent } from './master/addclient/addclientdashboard/addclientdashboard.component';
import { ComponentNameComponent } from './master/addclient/component-name/component-name.component';

import { AddeComponent } from './master/addemp/adde/adde.component';
import { AddempdashboardComponent } from './master/addemp/addempdashboard/addempdashboard.component';
import { EditempComponent } from './master/addemp/editemp/editemp.component';
import { AddclienttypeComponent } from './master/clienttypemaster/ctmdashboard/addclienttype/addclienttype.component';
import { CtmdashboardComponent } from './master/clienttypemaster/ctmdashboard/ctmdashboard.component';
import { EditctmComponent } from './master/clienttypemaster/editctm/editctm.component';
import { AddmmComponent } from './master/modulemaster/addmm/addmm.component';
import { EditmmComponent } from './master/modulemaster/editmm/editmm.component';
import { MmdashboardComponent } from './master/modulemaster/mmdashboard/mmdashboard.component';
import { AddomComponent } from './master/operationalmode/addom/addom.component';
import { EditomComponent } from './master/operationalmode/editom/editom.component';
import { OmdashboardComponent } from './master/operationalmode/omdashboard/omdashboard.component';
import { AddpmComponent } from './master/prioritymode/addpm/addpm.component';
import { EditpmComponent } from './master/prioritymode/editpm/editpm.component';
import { PmdashboardComponent } from './master/prioritymode/pmdashboard/pmdashboard.component';
import { AddtsComponent } from './master/ticketstatus/addts/addts.component';
import { EdittsComponent } from './master/ticketstatus/editts/editts.component';
import { TsdashboardComponent } from './master/ticketstatus/tsdashboard/tsdashboard.component';
import { AssignticketComponent } from './operations/assignticket/assignticket/assignticket.component';
import { EditatComponent } from './operations/assignticket/editat/editat/editat.component';
import { AttendanddeliverComponent } from './operations/attendanddeliverticket/attendanddeliver/attendanddeliver.component';
import { EditadanddComponent } from './operations/attendanddeliverticket/attendanddeliver/edita&d/editadandd/editadandd.component';
import { AddrtComponent } from './operations/raiseticket/addrt/addrt/addrt.component';
import { RaiseticketComponent } from './operations/raiseticket/raiseticket/raiseticket.component';

const routes: Routes = [
  {
    path:'',
    //  canActivate:[LoginGuard],
    component:LoginComponent
   
  },
  {
    path:'signup',
    // canActivate:[LoginGuard],
   
    component:SignupComponent
  },
  {
    path:'forgetpassword',
    // canActivate:[LoginGuard],
    
    component:ForgetpassComponent
  },
  {
    path:'dashboard',
  
    // canActivate:[AfterloginGuard],
    component:DashboardComponent
  },
  {
    path:'clienttypemaster/dashboard',
    // canActivate:[AfterloginGuard],
    component: CtmdashboardComponent
  },
  {
    path:'clienttype/addctm',
    // canActivate:[AfterloginGuard],

    component:AddclienttypeComponent
  },
  {
    path:'clienttype/editctm/:id1/:id2',
    // canActivate:[AfterloginGuard],
    component:EditctmComponent,
  },
  {
    path:'operationmode/dashboard',
    // canActivate:[AfterloginGuard],
    component:OmdashboardComponent
  },
  {
    path:'operationmode/addom',
    // canActivate:[AfterloginGuard],
    component:AddomComponent
  },
  {
    path:'operationmode/editom/:id1/:id2',
    // canActivate:[AfterloginGuard],
    component:EditomComponent
  },
  {
    path:'ticketstatus/dashboard',
    // canActivate:[AfterloginGuard],
    component:TsdashboardComponent
  },
  {
    path:'ticketstatus/addts',
    // canActivate:[AfterloginGuard],
    component:AddtsComponent
  },
  {
    path:'ticketstatus/editts/:id1/:id2',
    // canActivate:[AfterloginGuard],
    component:EdittsComponent
  },
  {
    path:'prioritymode/dashboard',
    // canActivate:[AfterloginGuard],
    component:PmdashboardComponent
  },
  {
    path:'prioritymode/addpm',
    // canActivate:[AfterloginGuard],
    component:AddpmComponent,
  },
  {
    path:'prioritymodule/editpm/:id1/:id2',
    // canActivate:[AfterloginGuard],
    component:EditpmComponent
  },
  {
    path:'mastermodule/dashboard',
    // canActivate:[AfterloginGuard],
    component:MmdashboardComponent
  },
  {
    path:'mastermodule/addmm',
    // canActivate:[AfterloginGuard],
    component:AddmmComponent
  },
  {
    path:'mastermodule/editmm/:id1/:id2',
    // canActivate:[AfterloginGuard],
    component:EditmmComponent
  },
  {
    path:'addemp/dashboard',
    // canActivate:[AfterloginGuard],
    component:AddempdashboardComponent
  },
  {
    path:'addemp/adde',
    // canActivate:[AfterloginGuard],
    component:AddeComponent
  },
  {
    path:'addemp/editemp/:id1/:id2/:id3',
    // canActivate:[AfterloginGuard],
    component:EditempComponent
  },
  {
    path:'addclient/dashboard',
    // canActivate:[AfterloginGuard],
    component:AddclientdashboardComponent
  },
  {
    path:'addclient/addcl',
  
    // canActivate:[AfterloginGuard],
    component:AdclComponent
  },
  {
    path:'addclient/editclient/:id1',
    // canActivate:[AfterloginGuard],
    component:ComponentNameComponent
  },
  {
    path:'operations/assignticket',
    // canActivate:[AfterloginGuard],
    
    component:AssignticketComponent
  },
  {
    path:'operations/editassignticket',
    // canActivate:[AfterloginGuard],
    component:EditatComponent
  },
  {
    path:'operations/raiseticket',
    // canActivate:[AfterloginGuard],
    component:RaiseticketComponent
  },
  {
    path:'operations/addraiseticket',
    // canActivate:[AfterloginGuard],
    component:AddrtComponent
  },
  {
    path:'operations/attendanddeliver',
    // canActivate:[AfterloginGuard],
    component:AttendanddeliverComponent
  },
  {
    path:'operations/editattendanddeliver',
    // canActivate:[AfterloginGuard],
    component:EditadanddComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
