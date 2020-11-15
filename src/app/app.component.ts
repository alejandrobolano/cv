import {Component, OnInit} from '@angular/core';
import {WindowResizeService} from './core/service/window-resize.service';

@Component({
  selector: 'ambm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  isCollapsed = false;
  theme = 'dark';
  title = 'Alejandro M. Bolaño M.';


  constructor(private windowResize: WindowResizeService) {
  }

  ngOnInit(): void {
  }

  get isMobile(): boolean {
    return this.windowResize.IsMobile;
  }

}
