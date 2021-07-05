import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'ambm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchEmitter = new EventEmitter();
  searchValue: string;

  constructor() { }

  ngOnInit(): void {
  }

  searchEvent(value: string): void {
    this.searchEmitter.emit(value);
  }

  resetEvent(): void {
    this.searchValue = '';
    this.searchEvent('');
  }

}
