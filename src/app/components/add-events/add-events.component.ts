import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendarService } from 'src/app/shared/service/agendar.service';
import { AddModal } from 'src/app/shared/class/add-modal';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.less']
})
export class AddEventsComponent extends AddModal<any> implements OnInit {

  @Input() date!: Date;

  @Input()value: string = '';

  @Input() override isVisible: boolean = false;
  constructor(private agendaService: AgendarService, private fb: FormBuilder) {
    super();
    
  }

  ngOnInit(): void {
    this.buildForm();
  }

  override buildForm(): void {
    this.form = this.fb.group({
      information: [null, this.noWhitespaceValidator]
      //information: [null, Validators.required]
    });
  }

  override submitForm(){

    const isValidForm = this.isValidForm();
    if(isValidForm){
      let booking = {
        data: this.date,
        informacao: this.form?.value.information
      }
  
      this.agendaService.add(booking).subscribe((agendar) => {
        this.addedElement(agendar);
      })
    }
  }

}
