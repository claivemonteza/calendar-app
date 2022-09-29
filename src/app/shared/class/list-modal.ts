import { Output, EventEmitter, Injectable, Input, Directive } from '@angular/core';
import { IAgendar } from 'src/app/domain/agendar';

@Directive()
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
    this.marcacao.agendamentos=[t,...this.marcacao.agendamentos];
    this.newEvent.emit(t);
  }

  selectElement(t: T) {
    this.updateVisible = true;
    this.value = '';
    this.value = t;
  }

  onDeletedElement(t:any) {
    this.marcacao.agendamentos = this.marcacao.agendamentos?.filter((a: IAgendar) => a.informacao !== t.informacao);
    this.value = '';
  }
}
