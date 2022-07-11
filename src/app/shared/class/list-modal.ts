import { FormGroup, FormControl } from '@angular/forms';
import { Output, EventEmitter, NgZone, Injectable } from '@angular/core';
import { IAgendar } from 'src/app/domain/agendar';

@Injectable()
export class ListModal<T>  {
    isVisible: boolean = false;
    loading: boolean = false;
    source: IAgendar[] = [];

    marcacao: any;
    
    @Output() new = new EventEmitter<T>();
    @Output() elements = new EventEmitter<T[]>();


    openModal() { this.isVisible = true; }
    cancelModal() { this.isVisible = false;}

    list(reset?: boolean) { }

    onAddedElement(t: T) { 
        this.marcacao.agendar = [...this.marcacao.agendar, t];
        this.new.emit(t);
      }

      selectElement(t: T) { }

      onDeletedElement(date:Date, info:string) {
        this.marcacao.agendar= this.marcacao.agendar.filter((a: IAgendar) => a.date!==date && a.informacao !== info);
      }
}
