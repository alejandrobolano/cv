import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ambm-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  avatar = '/assets/img/profile.png';
  @Output() knowhow  = new EventEmitter<string>();
  knowhowRadioValue = '';

  constructor() { }

  ngOnInit(): void {
  }

  emitKnowhow(): void {
    this.knowhow.emit(this.knowhowRadioValue);
  }
}
