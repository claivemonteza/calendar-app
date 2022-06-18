import { Injectable, EventEmitter } from '@angular/core';
import { IMarcacao } from 'src/app/domain/marcacao';

@Injectable({
  providedIn: 'root'
})
export class EventExchanger {
  ask = new EventEmitter<IMarcacao>();

  constructor() { }

  publishAsk(marcacao: IMarcacao) {
    this.ask.emit(marcacao);
  }

}
