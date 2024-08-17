import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {


  @Output() reload = new EventEmitter();

  @Input() errorTitle: any = '';

  constructor(){

  }


}
