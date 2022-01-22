import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ambm-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
  @Input('error-message') errorMessage = [];
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
