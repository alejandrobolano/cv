import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ambm-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input('visible') isVisible = false;
  @Input('button-cancel') hasButtonCancel = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleOk(): void {
    this.isVisible = false;
    this.router.navigate(['/navigation/about-me']).then(r => '');
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
