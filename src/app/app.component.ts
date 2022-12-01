import { Component, OnInit } from "@angular/core";
import { concatMapTo } from "rxjs";
import { EventExchanger } from "./shared/service/event-exchanger.service";
import { IAgendar } from "./domain/agendar";
import { IMarcacao } from "./domain/marcacao";
import { AgendarService } from "./shared/service/agendar.service";
import { ListModal } from "./shared/class/list-modal";
import { IAgendaResponse } from "./domain/agenda-response";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent implements OnInit {
  title = "calendar-app";

  marcacao: any;

  source?: IAgendaResponse[] = [];

  constructor(private agendarService: AgendarService, private eventExchanger: EventExchanger) {

  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.agendarService.getAll().subscribe((data) => {
      this.source = data;
    });
  }

  getMonthData(date: Date): number | null{
    const t = this.source?.filter(a=>
      a?.data?.split(" ")[1] === date.toDateString().split(" ")[1]);

    for (let index = 1; index < 12; index++) {
      if(date.getMonth()===index){
        return t!.length;
      }   
    }
    return null;
  }

  getDay(date: any) {
    //event.preventDefault();
   // event.stopPropagation();
    // date.toISOString().replace(/\T(?<=T).*/g,"");
    this.agendarService.findByDate(date.toString()).subscribe((data) => {
      this.marcacao = {
        date: date,
        agendamentos: data
      }
      this.eventExchanger.publishAsk(this.marcacao);
    });
  }

  check(data: any, date?: Date) {
    //toDateString()                 Fri Oct 07 2022
    //toISOString()|toJSON()         2022-10-06T22:00:00.000Z
    //toLocaleDateString()           10/7/2022
    //toLocaleString()               10/7/2022, 12:00:00 AM
    //toUTCString()                  Fri, 07 Oct 2022 22:00:00 GMT
    //toSring()                      Sat Oct 08 2022 00:00:00 GMT+0200 (Central Africa Time)
    return data === date?.toDateString();
  }
}
