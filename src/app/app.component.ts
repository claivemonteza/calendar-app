import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'calendar-app';
  day = 8;
  visible = false;
  date!:Date;

  listDataMap = {
    eight: [
      { type: 'success', content: 'This is usual event.' }
    ],
    ten: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' }
    ],
    eleven: [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event........' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' }
    ]
  };

  getMonthData(date: Date): number | null {
    console.log(date.getDay().toString())
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  getDay(date: Date) {
    //console.log(date);
    //console.log(date.getDate());
   // this.day = date.getDate();
    this.date = date;
    this.visible = true;
  }
}
