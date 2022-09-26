import { Output, EventEmitter, Injectable, Input } from '@angular/core';
import { IAgendar } from 'src/app/domain/agendar';

@Injectable()
export class ListModal<T>  {
  isVisible: boolean = false;
  loading: boolean = false;
  updateVisible: boolean = false;
  value: any = '';
  marcacao!: any;
  @Output() newEvent = new EventEmitter<T>();

  openModal() { this.isVisible = true; }
  cancelModal() { this.isVisible = false; this.value = ''; }

  list(reset?: boolean) { }

  onAddedElement(t: T) {
    this.marcacao.agendamentos.push(t);
    console.log(this.marcacao.agendamentos);
    /*this.newEvent.emit(t);*/
  }

  selectElement(t: T) {
    this.updateVisible = true;
    this.value = '';
    this.value = t;
  }

  onDeletedElement(date: Date, info: string) {
    this.marcacao.agendamentos = this.marcacao.agendamentos?.filter((a: IAgendar) => a.data !== date && a.informacao !== info);
    this.value = '';
  }
}
