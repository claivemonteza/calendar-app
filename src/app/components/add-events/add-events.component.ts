import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendarService } from 'src/app/shared/service/agendar.service';
import { AddModalImpl } from 'src/app/shared/class/add-modal-impl';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.less']
})
export class AddEventsComponent extends AddModalImpl<any> implements OnInit {

  @Input() date!: Date;

  constructor(private agendaService: AgendarService, private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  override buildForm(): void {
    this.form = this.fb.group({
      information: ['', [Validators.required]]
    });
  }

  override submitForm(){
    let booking = {
      data: this.date.toString(),
      informacao: this.form?.value.information
    }
    this.loading = true;
    console.log(booking);
    this.agendaService.add(booking).subscribe((a) => {
      this.addedElement(booking);
    });
    
  }

}
