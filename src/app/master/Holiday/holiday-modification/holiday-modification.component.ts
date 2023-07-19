import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef, gql } from 'apollo-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';

// For getting Holiday automatically corrosponding id
const GET_EDITABLE_HOLIDAY = gql`
query {
  holidayList(id:""){
    id,
    evnt_date,
    event
  }
}
`;

// For update Holidays
const EDITABLE_HOLIDAY = gql`
  mutation saveHoliday(
    $id: String!
    $evnt_date: String!
    $event: String!
    $code_no: String!
  ) {
    saveHoliday(id: $id, evnt_date: $evnt_date, event: $event, code_no: $code_no) {
      success
      message
    }
  }
`;
@Component({
  selector: 'app-holiday-modification',
  templateUrl: './holiday-modification.component.html',
  styleUrls: [
    './holiday-modification.component.css',
    '../../../../assets/masters_css_js/css/font-awesome.css',
    '../../../../assets/masters_css_js/css/apps.css',
    '../../../../assets/masters_css_js/css/apps_inner.css',
    '../../../../assets/masters_css_js/css/res.css'
  ],
})
export class HolidayModificationComponent implements OnInit {

  // queryRef!: QueryRef<Response>;
  constructor(
    private router: Router,
    private apollo: Apollo,
    public __actRT: ActivatedRoute,
    private toastr: ToastrManager,
    private date: DatePipe,
    private spinner: NgxSpinnerService
  ) {}

  holiday = new FormGroup({
    date: new FormControl('', [Validators.required]),
    event: new FormControl('', [Validators.required]),
    id: new FormControl(
      this.__actRT.snapshot.params.id ? this.__actRT.snapshot.params.id : 0
    ),
  });

  ngOnInit(): void {
    localStorage.setItem('address', this.router.url);
    if (this.__actRT.snapshot.params.id > 0) {
      this.setParticulatHoliday(this.__actRT.snapshot.params.id);
    }
  }
  submitHolidays() {
    this.spinner.show();
    this.apollo
      .mutate({
        mutation: EDITABLE_HOLIDAY,
        variables: {
          id: this.holiday.value.id,
          evnt_date: this.holiday.value.date,
          event: this.holiday.value.event,
          code_no: localStorage.getItem('UserId'),
        },
      })
      .subscribe(({data}) => {
        console.log(data);
        var dt: any = data;
        if (dt.saveHoliday.success == '1') {
          this.toastr.successToastr(this.__actRT.snapshot.params.id > 0 ? 'Event updated successfully' : 'Event added successfully');
          this.router.navigate(['holiday']).then(() => {
            // window.location.reload();
          })
        } else {
          this.toastr.errorToastr('Error!! something went wrong');
        }
        this.spinner.hide();
      });
  }
  setParticulatHoliday(__id: number) {
    this.apollo
      .watchQuery<any>({
        query: GET_EDITABLE_HOLIDAY,
        variables: {
          id: __id
        },
      })
      .valueChanges.subscribe(({ data }) => {
        const filteredDT = data.holidayList.filter((x: any) => Number(x.id) == __id)
        this.holiday.patchValue({
          date: this.date.transform(filteredDT[0].evnt_date,'YYYY-MM-dd'),
          event: filteredDT[0].event,
        });
        console.log(filteredDT);

      });
  }
}
