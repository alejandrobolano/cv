import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/service/authentication/auth.service';

@Component({
  selector: 'ambm-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.less']
})
export class LogInComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
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
