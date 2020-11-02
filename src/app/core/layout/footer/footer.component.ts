import {Component, OnInit} from '@angular/core';
import {QUOTES} from './data/Quotes';
import {IQuote} from './data/IQuote';
import {WindowResizeService} from '../../service/window-resize.service';

@Component({
  selector: 'ambm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  title = 'Alejandro M. Bolaño M.';
  quote: IQuote;

  constructor(private windowResize: WindowResizeService) {
  }

  get isMobile(): boolean {
    return this.windowResize.IsMobile;
  }


  private static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  ngOnInit(): void {
    this.quote = this.getQuote();
  }

  getQuote(): IQuote {
    const quotes = QUOTES;
    const index = FooterComponent.getRandomInt(0, quotes.length);
    return quotes[index];
  }
}
