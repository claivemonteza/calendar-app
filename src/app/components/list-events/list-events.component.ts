import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AgendarService } from 'src/app/shared/service/agendar.service';
import { ListModal } from 'src/app/shared/class/list-modal';
import { EventExchanger } from '../../shared/service/event-exchanger.service';


@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.less'],
})
export class ListEventsComponent extends ListModal<any> implements OnInit, OnDestroy{

  constructor(private eventExchanger: EventExchanger, private agendaService: AgendarService, private fb: FormBuilder) {
    super();
    this.eventExchanger.ask.subscribe(
      (marcacao) => {
        this.marcacao = marcacao;
        this.openModal();
      }
    );
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    
  }

  handleOk(): void {
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }

/* Tags */
  deleteRow(date:Date, info: string ): void {
    this.agendaService.delete(date.toString(), info).subscribe(() => {
      this.onDeletedElement(date, info);
    });
  }
}


