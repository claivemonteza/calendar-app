import { FormControl, FormGroup} from '@angular/forms';
import { Output, EventEmitter, Injectable, Input} from '@angular/core';

@Injectable()
export class AddModal<T>  {
    form!: FormGroup;
    
    loading: boolean = false;

    @Input() isVisible: boolean = false;
    @Output() add = new EventEmitter<T>();
    @Output() adds = new EventEmitter<T[]>();
    constructor() {}

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

    addedElements(t: T[], msg: string) {
        this.loading = false;
        this.adds.emit(t);
        this.cancelModal(); 
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

    noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }
}