import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ambm-navigation',
  template: `
      <router-outlet></router-outlet>`
})
export class NavigationComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
