import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayModificationComponent } from './holiday-modification.component';

describe('HolidayModificationComponent', () => {
  let component: HolidayModificationComponent;
  let fixture: ComponentFixture<HolidayModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayModificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
