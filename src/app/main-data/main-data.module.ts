import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainDataRoutingModule } from './main-data-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MatTimepickerModule } from 'mat-timepicker';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarUtils as BaseCalendarUtils } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MainDataComponent } from './main-data.component';


@Injectable()
export class CalendarUtils extends BaseCalendarUtils {

  constructor(private dateAdapter2: DateAdapter) {
    super(dateAdapter2)
  }

  // getWeekView(args: GetWeekViewArgs): WeekView {

  //   const milestoneEvents = args.events.filter(event => event.meta.type === 'holidayEvent');
  //   const calendarEvents = args.events.filter(event => event.meta.type !== 'holidayEvent');

  //   const milestoneView = getWeekView(this.dateAdapter2, {
  //     ...args,
  //     events: milestoneEvents
  //   })
  //   const calendarView = getWeekView(this.dateAdapter2, {
  //     ...args,
  //     events: calendarEvents
  //   })

  //   return {
  //     ...calendarView,
  //     allDayEventRows: [
  //       ...milestoneView.allDayEventRows,
  //       ...calendarView.allDayEventRows
  //     ]
  //   }

  // }
}

@NgModule({
  declarations: [MainDataComponent],
  imports: [
    CommonModule,
    MainDataRoutingModule,
    SharedModule,

    NgbModalModule,
    MatTimepickerModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }, {
      utils: {
        provide: BaseCalendarUtils,
        useClass: CalendarUtils
      }
    })
  ]
})
export class MainDataModule { }
function Injectable(): (target: typeof import("./main-data.module").CalendarUtils) => void | typeof import("./main-data.module").CalendarUtils {
  throw new Error('Function not implemented.');
}

