import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
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
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'forgetpassword',
    component:ForgetpassComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'clienttypemaster/dashboard',
    component: CtmdashboardComponent
  },
  {
    path:'clienttype/addctm',
    component:AddclienttypeComponent
  },
  {
    path:'clienttype/editctm/:id1/:id2',
    component:EditctmComponent,
  },
  {
    path:'operationmode/dashboard',
    component:OmdashboardComponent
  },
  {
    path:'operationmode/addom',
    component:AddomComponent
  },
  {
    path:'operationmode/editom/:id1/:id2',
    component:EditomComponent
  },
  {
    path:'ticketstatus/dashboard',
    component:TsdashboardComponent
  },
  {
    path:'ticketstatus/addts',
    component:AddtsComponent
  },
  {
    path:'ticketstatus/editts/:id1/:id2',
    component:EdittsComponent
  },
  {
    path:'prioritymode/dashboard',
    component:PmdashboardComponent
  },
  {
    path:'prioritymode/addpm',
    component:AddpmComponent,
  },
  {
    path:'prioritymodule/editpm/:id1/:id2',
    component:EditpmComponent
  },
  {
    path:'mastermodule/dashboard',
    component:MmdashboardComponent
  },
  {
    path:'mastermodule/addmm',
    component:AddmmComponent
  },
  {
    path:'mastermodule/editmm/:id1/:id2',
    component:EditmmComponent
  },
  {
    path:'addemp/dashboard',
    component:AddempdashboardComponent
  },
  {
    path:'addemp/adde',
    component:AddeComponent
  },
  {
    path:'addemp/editemp/:id1/:id2/:id3',
    component:EditempComponent
  },
  {
    path:'addclient/dashboard',
    component:AddclientdashboardComponent
  },
  {
    path:'addclient/addcl',
    component:AdclComponent
  },
  {
    path:'addclient/editclient/:id1',
    component:ComponentNameComponent
  },
  {
    path:'operations/assignticket',
    component:AssignticketComponent
  },
  {
    path:'operations/editassignticket',
    component:EditatComponent
  },
  {
    path:'operations/raiseticket',
    component:RaiseticketComponent
  },
  {
    path:'operations/addraiseticket',
    component:AddrtComponent
  },
  {
    path:'operations/attendanddeliver',
    component:AttendanddeliverComponent
  },
  {
    path:'operations/editattendanddeliver',
    component:EditadanddComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
