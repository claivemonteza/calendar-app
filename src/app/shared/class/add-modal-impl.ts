import { FormGroup, FormControl } from '@angular/forms';
import { Output, EventEmitter, NgZone, Injectable } from '@angular/core';

@Injectable()
export class AddModalImpl<T>  {
    isVisible: boolean = false;
    loading: boolean = false;

    @Output() add = new EventEmitter<T>();
    @Output() adds = new EventEmitter<T[]>();


    buildForm() { }
    openModal() { this.isVisible = true; }
    submitForm() { }
    cancelModal() {
        this.isVisible = false;
    }
    
   
    noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }

    addedElement(t: T, msg: string) {
        this.loading = false;
        this.add.emit(t);
        this.cancelModal();
    }

    addedElements(t: T[], msg: string) {
        this.loading = false;
        this.adds.emit(t);
        this.cancelModal();
    }
}
