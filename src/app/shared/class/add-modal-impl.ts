import { FormGroup, FormControl } from '@angular/forms';
import { Output, EventEmitter, NgZone, Injectable } from '@angular/core';

@Injectable()
export class AddModalImpl<T>  {
    form!: FormGroup;
    isVisible: boolean = false;
    loading: boolean = false;

    @Output() add = new EventEmitter<T>();


    buildForm() { }
    openModal() { this.isVisible = true; }
    submitForm() { }
    cancelModal() {
        this.resetForm();
        this.isVisible = false;
    }
    resetForm() {
        this.form.reset();
    }

    addedElement(t: T) {
        this.loading = false;
        this.add.emit(t);
        this.cancelModal();
    }
   
    noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }


}
