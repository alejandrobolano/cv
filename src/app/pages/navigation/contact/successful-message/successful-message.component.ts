import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ambm-successful-message',
  templateUrl: './successful-message.component.html',
  styleUrls: ['./successful-message.component.css']
})
export class SuccessfulMessageComponent implements OnInit {
  @Input('new-value-id') newValueId: any;
  @Output('flag-message') flagMessageEmitter = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goHome(): void {
    this.router.navigate(['/navigation/home']).then(r => '');
  }

  changeFlagValue(newValue): void {
    this.flagMessageEmitter.emit(newValue);
  }
}
