import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {TranslateComponent} from '../../translate/translate.component';
import {TranslateWrapperService} from '../../service/translate-wrapper.service';

@Component({
  selector: 'ambm-page-under-construction',
  templateUrl: './page-under-construction.component.html',
  styleUrls: ['./page-under-construction.component.css']
})
export class PageUnderConstructionComponent extends TranslateComponent implements OnInit {

  constructor(private router: Router,
              public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService) {
    super(translate, translateWrapperService);
  }

  ngOnInit(): void {
  }

  goHome(): void {
    this.router.navigate(['/navigation/home']).then(() => '');
  }
}
