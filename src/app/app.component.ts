import { Component, OnInit } from "@angular/core";
import { concatMapTo } from "rxjs";
import { EventExchanger } from "./shared/service/event-exchanger.service";
import { IAgendar } from "./domain/agendar";
import { IMarcacao } from "./domain/marcacao";
import { AgendarService } from "./shared/service/agendar.service";
import { ListModal } from "./shared/class/list-modal";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent implements OnInit {
  title = "calendar-app";
  day?: number;

  marcacao: any;
  
  source: IAgendar[] = [];


  constructor(private agendarService: AgendarService, private eventExchanger: EventExchanger) {
   
  }

  ngOnInit(): void {
    this.listt();
  }

  listt(){
    this.agendarService.getAll().subscribe((data) => {
      this.source = data;
    });
  }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  setDate(date: Date) {
    return (this.day = date.getDate());
  }

  getDay(date: Date) {
  //event.stopPropagation()
    // date.toISOString().replace(/\T(?<=T).*/g,"");
    this.agendarService.findByDate(date.toString()).subscribe((data) => {
      this.marcacao={
        date:date,
        agendamentos:data
      }
    
      this.eventExchanger.publishAsk(this.marcacao);
    });
  }
}
