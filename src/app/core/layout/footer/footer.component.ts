import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ambm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  title = 'Alejandro M. Bolaño M.';
  constructor() {}

  ngOnInit(): void {
  }

}
