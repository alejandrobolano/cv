import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ambm-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  avatar = '/assets/img/profile.png';

  constructor() { }

  ngOnInit(): void {
  }

}
