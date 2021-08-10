import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {Chart } from 'chart.js';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Apollo, gql } from 'apollo-angular';




const GET_DATA_A = gql`
query getUserDetailsA($tag:String!){
  getUserDetailsA(tag:$tag){
    id
    user_name
    user_type
    user_status
    login_status
  }
}`;

const TKT=gql`
query openTktByStatus($user_type:String!, $user_id: String!){
  openTktByStatus(user_type:$user_type, user_id:$user_id){
    tkt_status
    status
  }
}`


const TOTAL_TKT=gql`
query  closeTkt($user_type: String!, $user_id: String!){
  closeTkt(user_type:$user_type,user_id:$user_id){
    today
    yesterday
    this_month
    last_month
    this_year
    lifetime
  }
}`

const OPEN_CLOSE_TKT=gql`
query  openCloseTkt($user_type: String!, $user_id: String!){
  openCloseTkt(user_type: $user_type, user_id: $user_id){
    opened
    closed
  }
}`






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',
  '../../assets/css/font-awesome.css',
  '../../assets/css/apps.css',
  '../../assets/css/apps_inner.css',
   '../../assets/css/res.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {

  displayedColumns1: string[] = ['Id','Status','Count'];
  dataSource1 = new MatTableDataSource<any>();
  displayedColumns: string[] = ['imge','Username','Login_Status'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



   bar:any;
   tkt:any;
   t:any;
  // myChart:any=[];
  user_data:any;
  breakpoint:any;
  today:any;
  yesterday:any;
  this_month:any;
  last_month:any;
  this_year:any;
  lifetime:any;


   u_type:any;
   op:any;
   clos:any;
  formattedDate : any;
  constructor(private router:Router,private apollo:Apollo) {

  }

  ngOnInit(): void {
    this.fetch_data();
    this.fetch_data1();


     this.u_type = localStorage.getItem('user_Type');

     localStorage.setItem('Active', '1');
     localStorage.setItem('address', '/dashboard');
     localStorage.setItem('updatectm', '0');
     localStorage.setItem('addctm', '0');
     localStorage.setItem('updateom', '0');
     localStorage.setItem('addom', '0');
     localStorage.setItem('updatets', '0');
     localStorage.setItem('addts', '0');
     localStorage.setItem('updatepm', '0');
     localStorage.setItem('addpm', '0');
     localStorage.setItem('updatemm', '0');
     localStorage.setItem('addmm', '0');
     localStorage.setItem('adde', '0');
     localStorage.setItem('updatee', '0');
     localStorage.setItem('updatec', '0');
     localStorage.setItem('addc', '0');

     this.apollo.watchQuery<any>({
      query:TOTAL_TKT,
      variables: {
        user_type:localStorage.getItem('user_Type'),
        user_id:localStorage.getItem('UserId')

      },
      pollInterval:500
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data);


        this.today = data.closeTkt[0].today;
        this.yesterday= data.closeTkt[0].yesterday;
        this.this_month= data.closeTkt[0].this_month;
        this.last_month= data.closeTkt[0].last_month;
        this.this_year= data.closeTkt[0].this_year;
        this.lifetime= data.closeTkt[0].lifetime;

      })




     this.apollo.watchQuery<any>({
      query:OPEN_CLOSE_TKT,
      variables: {
        user_type:localStorage.getItem('user_Type'),
        user_id:localStorage.getItem('UserId')

      },
      pollInterval:500
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data);

        this.tkt = data.openCloseTkt[0];
        this.op=this.tkt.opened;
         this.clos=this.tkt.closed;
         console.log( this.op,this.clos);

      })






//  For Bar Charts in Angular
    var myChart = new Chart('ctx', {
    type: 'bar',
     data: {
        labels: [ "Blue","Red", "Yellow", "Green", "Purple", "Orange","SkyBlue"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 20, 10, 15,20],
            backgroundColor: [
                'rgba(23, 162, 184, 1)',
                'rgba(220, 53, 69, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(40, 167, 69, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(22, 132, 226, 1)'
            ],
            borderColor: [
                 'rgba(255, 255, 255, 1)',
                 'rgba(255, 255, 255, 1)',
                 'rgba(255, 255, 255, 1)',
                 'rgba(255, 255, 255, 1)',
                 'rgba(255, 255, 255, 1)',
                 'rgba(255, 255, 255, 1)',
                 'rgba(255, 255, 255, 1)'
            ],


            // hoverBackgroundColor:['blue','yellow'],
            borderWidth: 1
        }]
    },

    options: {

     responsive:true,
      maintainAspectRatio:false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },

                gridLines: {
                  display: false,

              },

            }],

        }
    }
});

// For Line Charts
var myChart = new Chart("line", {
  type: 'line',
  data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 20, 10, 15],
          fill: false,

          borderColor: 'rgb(0, 112, 112)',
          pointBackgroundColor:['red', 'Yellow','pink','green','purple','Orange'],

          // pointHoverBackgroundColor:['red','blue','yellow','Green','purple','orange'],
          pointStyle:'rectRot',
          borderWidth: 1
      }],

  },
  options: {
   animation: {
      duration:1
  },
    responsive:true,
    maintainAspectRatio:false,
      scales: {
          yAxes: [{

              ticks: {
                  beginAtZero:true
              },
              gridLines:{
                display: false
              }

          }]
      }
  }
});

}


fetch_data() {

  this.apollo.watchQuery<any>({
    query:GET_DATA_A,
    variables: {
      tag: '1'
    },
    pollInterval:500
  })
    .valueChanges
    .subscribe(({ data, loading }) => {
      console.log(data);

      this.user_data = data;

      this.dataSource.sort = this.sort;
      this.putdata(this.user_data);

    })



}
public putdata(v:any){
  this.dataSource = new MatTableDataSource(v.getUserDetailsA);

}


fetch_data1() {


  this.apollo.watchQuery<any>({
    query:TKT,
    variables: {
      user_type:localStorage.getItem('user_Type'),
      user_id:localStorage.getItem('UserId')

    },
    pollInterval:500,

  })
    .valueChanges
    .subscribe(({ data, loading }) => {
      console.log("tkt:" ,data);
      this.t=data;

      this.putdata1(this.t);


    })





}

public putdata1(v1:any){
  this.dataSource1 = new MatTableDataSource(v1.openTktByStatus);
  this.dataSource1.paginator = this.paginator;
}



ngAfterViewInit() {
  this.dataSource.sort = this.sort;
  this.dataSource1.paginator = this.paginator;

}





go_to_page(){

  if(localStorage.getItem('user_Type')=='T'){
    this.router.navigate(['/operations/raiseticket']);
  }
  else{
    this.router.navigate(['/operations/attendanddeliver']);
  }


}

}

