import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `<router-outlet></router-outlet>`
})
export class NavigationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
