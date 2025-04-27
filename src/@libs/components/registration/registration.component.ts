import { Component } from '@angular/core';
import { KrateButtonComponent } from "../krate-button/krate-button.component";
import { KrateInputComponent } from '../krate-input/krate-input.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { EMAIL_REGEX } from './model/email-regex.model';

@Component({
  selector: 'app-registration',
    imports: [
      KrateButtonComponent,
      KrateInputComponent,
      ReactiveFormsModule,
    ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  protected isSubmitted = false;
  private emailRegex: RegExp = EMAIL_REGEX;

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirm = control.get('passwordConfirm');

    return password && confirm && password.value === confirm.value ? null : { passwordMismatch: true };
  }

  emailValidator(emailRegex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = emailRegex.test(control.value);
      return isValid ? null : { emailMismatch: true };
    }
  }

  registrationForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      this.emailValidator(this.emailRegex),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    passwordConfirm: new FormControl(''),
  }, { validators: this.passwordMatchValidator });

  get email() {
    return this.registrationForm.get('email')!;
  }

  get password() {
    return this.registrationForm.get('password')!;
  }

  get passwordConfirm() {
    return this.registrationForm.get('passwordConfirm')!;
  }

  onSubmit() {
    this.isSubmitted = true;
  }
}
