import {Component, OnInit} from '@angular/core';
import {QUOTES} from './data/Quotes';
import {IQuote} from './data/IQuote';

@Component({
  selector: 'ambm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  quote: IQuote;

  constructor() {
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
