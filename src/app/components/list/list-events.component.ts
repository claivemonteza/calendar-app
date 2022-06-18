import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AgendarService } from 'src/app/service/agendar.service';
import { ListModal } from 'src/app/shared/class/list-modal';
import { EventExchanger } from './event-exchanger.service';




@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.less'],
})
export class AddComponent extends ListModal<any> implements OnInit, OnDestroy{
  
  marcacao: any;

  validateForm!: FormGroup;

  inputVisible = false;
  inputValue = ' ';

  visible = false;

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
    this.visible = false;
  }


  showInput(event:Event){
    event.preventDefault();
    this.visible = true;
  }


  buildForm(): void {
    this.validateForm = this.fb.group({
      information: []
    });
  }

  submitForm(){
    
    let data = {
      date: this.marcacao?.date,
      informacao: this.validateForm.value.information
    }
    console.log(data);
    this.visible = false;

    this.agendaService.add(data).subscribe((m) => {
      this.visible = false;
      this.marcacao=[m,...this.marcacao];
    });
    
  }

  handleOk(): void {
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }



/* Tags */


  deleteRow(info: string): void {
    this.agendaService.delete(info).subscribe((marcacao) => {
      this.marcacao.agendar=this.marcacao.agendar.filter((a: any) => a.informacao !== info);
    });
  }

}


