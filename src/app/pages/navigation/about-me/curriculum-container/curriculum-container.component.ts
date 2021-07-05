import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ambm-curriculum-container',
  templateUrl: './curriculum-container.component.html',
  styleUrls: ['./curriculum-container.component.less']
})
export class CurriculumContainerComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('curriculum-list') curriculumList = [];
  loading = true;

  constructor() {
  }

  ngOnInit(): void {
    this.loadDataFake();
  }

  loadDataFake(): void {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }


}
