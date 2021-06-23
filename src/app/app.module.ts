import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { CtmdashboardComponent } from './master/clienttypemaster/ctmdashboard/ctmdashboard.component';
import { OmdashboardComponent } from './master/operationalmode/omdashboard/omdashboard.component';
import { TsdashboardComponent } from './master/ticketstatus/tsdashboard/tsdashboard.component';
import { PmdashboardComponent } from './master/prioritymode/pmdashboard/pmdashboard.component';
import { MmdashboardComponent } from './master/modulemaster/mmdashboard/mmdashboard.component';
import { AddempdashboardComponent } from './master/addemp/addempdashboard/addempdashboard.component';
import { AddclientdashboardComponent } from './master/addclient/addclientdashboard/addclientdashboard.component';
import { DatePipe } from '@angular/common'


import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from'@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
//import { AddctmComponent } from './master/addclient/addclientdashboard/addctm/addctm.component';
import { AddclienttypeComponent } from './master/clienttypemaster/ctmdashboard/addclienttype/addclienttype.component';
import { AddomComponent } from './master/operationalmode/addom/addom.component';
import { AddtsComponent } from './master/ticketstatus/addts/addts.component';
import { AddpmComponent } from './master/prioritymode/addpm/addpm.component';
import { AddmmComponent } from './master/modulemaster/addmm/addmm.component';
import { AddeComponent } from './master/addemp/adde/adde.component';
import { EditctmComponent } from './master/clienttypemaster/editctm/editctm.component';
import { EditomComponent } from './master/operationalmode/editom/editom.component';
import { EdittsComponent } from './master/ticketstatus/editts/editts.component';
import { EditpmComponent } from './master/prioritymode/editpm/editpm.component';
import { EditmmComponent } from './master/modulemaster/editmm/editmm.component';
import { EditempComponent } from './master/addemp/editemp/editemp.component';
import { AdclComponent } from './master/addclient/addclientdashboard/adcl/adcl.component';
import { LoginComponent } from './login_reg_emp_client/login/login.component';
import { ForgetpassComponent } from './login_reg_emp_client/forgetpass/forgetpass.component';
import { SignupComponent } from './login_reg_emp_client/signup/signup.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RaiseticketComponent } from './operations/raiseticket/raiseticket/raiseticket.component';
import { AssignticketComponent } from './operations/assignticket/assignticket/assignticket.component';
import { AttendanddeliverComponent } from './operations/attendanddeliverticket/attendanddeliver/attendanddeliver.component';
import { EditatComponent } from './operations/assignticket/editat/editat/editat.component';
import { EditadanddComponent } from './operations/attendanddeliverticket/attendanddeliver/edita&d/editadandd/editadandd.component';
import { AddrtComponent } from './operations/raiseticket/addrt/addrt/addrt.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentNameComponent } from './master/addclient/component-name/component-name.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    CtmdashboardComponent,
    OmdashboardComponent,
    TsdashboardComponent,
    PmdashboardComponent,
    MmdashboardComponent,
    AddempdashboardComponent,
    AddclientdashboardComponent,
    //AddctmComponent,
    AddclienttypeComponent,
    AddomComponent,
    AddtsComponent,
    AddpmComponent,
    AddmmComponent,
    AddeComponent,
    EditctmComponent,
    EditomComponent,
    EdittsComponent,
    EditpmComponent,
    EditmmComponent,
    EditempComponent,
    AdclComponent,
    LoginComponent,
    ForgetpassComponent,
    SignupComponent,
    RaiseticketComponent,
    AssignticketComponent,
    AttendanddeliverComponent,
    EditatComponent,
    EditadanddComponent,
    AddrtComponent,
    ComponentNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [{provide:LocationStrategy, useClass:HashLocationStrategy},DatePipe,CtmdashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }