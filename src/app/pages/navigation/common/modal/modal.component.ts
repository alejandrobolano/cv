import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookiesService} from '../../../../core/service/cookies.service';
import {VisibilityEnum} from '../../../../core/enum/VisibilityEnum';

@Component({
  selector: 'ambm-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  show = false;
  @Input('button-cancel') hasButtonCancel = false;

  constructor(private router: Router,
              public cookies: CookiesService) {
    this.process();
  }

  process(): void {
    if (this.cookies.getCookie('modal') === '1') {
      this.show = true;
      this.setVisibility(false);
    } else if (!this.cookies.getCookie('modal')) {
      this.setVisibility(true);
    }
  }

  ngOnInit(): void {
    this.process();
  }

  setVisibility(showModal: boolean): void {
    this.cookies.setCookie('modal',
      showModal ? VisibilityEnum.Visible : VisibilityEnum.NotVisible,
      7,
      '/');
  }

  handleOk(): void {
    this.show = false;
    this.router.navigate(['/navigation/about-me']).then(r => '');
  }

  handleCancel(): void {
    this.show = false;
  }

}
