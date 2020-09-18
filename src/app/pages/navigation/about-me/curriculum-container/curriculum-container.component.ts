import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ambm-curriculum-container',
  templateUrl: './curriculum-container.component.html',
  styleUrls: ['./curriculum-container.component.css']
})
export class CurriculumContainerComponent implements OnInit {
  @Input('curriculum-list') curriculumList = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
