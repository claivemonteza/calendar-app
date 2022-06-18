import { FormGroup, FormControl } from '@angular/forms';
import { Output, EventEmitter, NgZone, Injectable } from '@angular/core';

@Injectable()
export class ListModal<T>  {
    isVisible: boolean = false;
    loading: boolean = false;

    @Output() new = new EventEmitter<T>();


    openModal() { this.isVisible = true; }
    cancelModal() { this.isVisible = false;}

    list(reset?: boolean) { }

  
}
