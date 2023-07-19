import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

// For getting employee list in dropdown of assigned To
const FOR_GET_HOLIDAY_MST = gql`
  query {
    holidayList(id:""){
      id,
      evnt_date,
      event
    }
  }
`;

@Component({
  selector: 'app-holiday-dashboard',
  templateUrl: './holiday-dashboard.component.html',
  styleUrls: [
    './holiday-dashboard.component.css',
    '../../../../assets/masters_css_js/css/font-awesome.css',
    '../../../../assets/masters_css_js/css/apps.css',
    '../../../../assets/masters_css_js/css/apps_inner.css',
    '../../../../assets/masters_css_js/css/res.css'
  ],
})
export class HolidayDashboardComponent implements OnInit {
  constructor(private router: Router, private apollo: Apollo,private date: DatePipe) {}
  displayedColumns = ['sl_no','event','event_date','edit'];
  __holidaysMst = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    localStorage.setItem('address', this.router.url);
    this.getHolidays();
  }
  getHolidays() {
    this.apollo
      .watchQuery<any>({
        query: FOR_GET_HOLIDAY_MST,
      })
      .valueChanges.subscribe(({ data }) => {
        this.apollo
        .watchQuery<any>({
          query: FOR_GET_HOLIDAY_MST,
        }).refetch();
        this.__holidaysMst = new MatTableDataSource(data.holidayList);
        this.__holidaysMst.paginator = this.paginator;
        this.__holidaysMst.sort = this.sort;
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.__holidaysMst.filter = filterValue.trim().toLowerCase();
    if (this.__holidaysMst.paginator) {
      this.__holidaysMst.paginator.firstPage();
    }
  }
  ngAfterVIewInit(){
    this.__holidaysMst.sort = this.sort;

  }
}
