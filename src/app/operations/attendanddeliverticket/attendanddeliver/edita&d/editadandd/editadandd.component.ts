import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
import {formatDate } from '@angular/common';
const SHOW_TS=gql`
query{
  getTktStatusData(id:"", db_type: 3){
    tkt_id
    tkt_status
  }
}`
@Component({
  selector: 'app-editadandd',
  templateUrl: './editadandd.component.html',
  styleUrls: ['./editadandd.component.css', 
  '../../../../../../assets/masters_css_js/css/font-awesome.css',
  '../../../../../../assets/masters_css_js/css/apps.css',
  '../../../../../../assets/masters_css_js/css/apps_inner.css',
  '../../../../../../assets/masters_css_js/css/res.css']
})
export class EditadanddComponent implements OnInit {

 
  posts_ts:any;
  tsdata:any;
  today= new Date();
  todaysDataTime = '';
  dateitem:any;
  constructor(private apollo:Apollo) {}
  ngOnInit(): void {
<<<<<<< HEAD
    this.dateitem=document.getElementById('itemdate');
    localStorage.setItem('address', '/operations/editattendanddeliver');
    setInterval(()=>{
      this.today= new Date();
     this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
     this.dateitem.value=this.todaysDataTime;
    },1000);
    this.apollo.watchQuery<any>({
      query: SHOW_TS,
      //pollInterval:100
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        // this.loading = loading;
        this.posts_ts = data;
       this.tsdata=this.posts_ts.getTktStatusData;
        console.log(this.posts_ts);
       //this.putdata(this.posts_ts);
      });
=======
    localStorage.setItem('address', '/operations/editattendanddeliver');
>>>>>>> 8547a9e9d0a8a7853df745fe8815809e31f326de
  }
  preventNonNumericalInput(e:any){}
}
