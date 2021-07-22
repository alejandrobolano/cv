import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ambm-private',
  template: `
      <router-outlet></router-outlet>`
})
export class PrivateComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
