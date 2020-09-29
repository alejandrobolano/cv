import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ambm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @Input() isCollapsed = false;
  theme = 'dark';
  title = 'Alejandro M. Bolaño M.';


  constructor() {
  }

  ngOnInit(): void {
  }


}
