import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookiesService} from '../../../../core/service/cookies.service';
import {VisibilityEnum} from '../../../../core/enum/visibility.enum';

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
    this.processVisibilityOfCookie();
  }

  processVisibilityOfCookie(): void {
    if (this.cookies.getCookie('modal') === '1') {
      this.show = true;
      this.setVisibilityOfCookie(false);
    } else if (!this.cookies.getCookie('modal')) {
      this.setVisibilityOfCookie(true);
    }
  }

  ngOnInit(): void {
    this.processVisibilityOfCookie();
  }

  setVisibilityOfCookie(showModal: boolean): void {
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
