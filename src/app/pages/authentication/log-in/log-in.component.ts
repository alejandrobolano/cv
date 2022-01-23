import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/service/authentication/auth.service';
import {TranslateComponent} from '../../../core/translate/translate.component';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../core/service/translate-wrapper.service';

@Component({
  selector: 'ambm-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.less']
})
export class LogInComponent extends TranslateComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
    super(translate, translateWrapperService);
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.authService.redirect();
    }
    this.validatorsForm();
  }

  validatorsForm(): void {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'VALID') {
      this.authService.signIn(this.validateForm.controls.email.value, this.validateForm.controls.password.value);
    }
  }

  sendVerificationEmail(): void {
    this.authService.sendVerificationMail();
  }
}
