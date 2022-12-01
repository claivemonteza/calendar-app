import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AgendarService } from 'src/app/shared/service/agendar.service';
import { ListModal } from 'src/app/shared/class/list-modal';
import { EventExchanger } from '../../shared/service/event-exchanger.service';
import { IAgendar } from 'src/app/domain/agendar';


@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.less'],
})
export class ListEventsComponent extends ListModal<any> implements OnInit, OnDestroy {
  form!: FormGroup;
  date!: any;

  constructor(private eventExchanger: EventExchanger, private agendaService: AgendarService, private fb: FormBuilder) {
    super();
    this.eventExchanger.ask.subscribe(
      (marcacao) => {
        this.marcacao = marcacao;
        this.date = marcacao.date;
        this.openModal();
      }
    );
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm(): void {
    this.form = this.fb.group({
      information: [null]
      //information: [null, Validators.required]
    });
  }

  submitForm() {
    const isValidForm = this.isValidForm();
    if (isValidForm) {
      let booking = {
        data: this.date.toDateString(),
        informacao: this.form?.value.information
      }
      this.agendaService.add(booking).subscribe((agendar) => {
        this.onAddedElement(agendar);
      })
    }
  }

  handleOk(): void {
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }

  update() {
    let id = null;
    for (let index = 1; index < this.marcacao.agendamentos.length; index+1) {
      const element = this.marcacao.agendamentos[index];
      console.log(element.informacao);
      if (element.informacao === this.value) {
        id=index;
        console.log(id);
        this.onDeletedElement(element);
      }
     // console.log(id);
    }
    console.log("Passou");
   /*
    const isValidForm = this.isValidForm();
    if (isValidForm) {
      let booking = {
        id:id,
        data: this.date.toDateString(),
        informacao: this.form?.value.information
      }
      this.agendaService.update(booking).subscribe((agendar) => {
        this.onAddedElement(agendar);
      })
    }*/
  }

  /* Tags */
  deleteRow(t: any): void {
    this.agendaService.delete(t.data.toString(), t.informacao).subscribe(() => {
      this.onDeletedElement(t);
    });
  }

  cancel() {
    this.form.reset();
    this.updateVisible = false;
  }

  isValidForm(): boolean {
    const valid = this.form.valid;
    Object.keys(this.form.controls).forEach(k => {
      const f = this.form.get(k);
      f?.markAsDirty();
      f?.updateValueAndValidity();
    });
    return valid;
  }
}