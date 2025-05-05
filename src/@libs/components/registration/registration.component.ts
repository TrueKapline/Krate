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
import { EMAIL_REGEX } from '../../model/email-regex.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NAME_REGEX } from '../../model/name-regex.model';

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
  protected isEmailTaken = false;

  private emailRegex = EMAIL_REGEX;
  private nameRegex = NAME_REGEX;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

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

  nameValidator(nameRegex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = nameRegex.test(control.value);
      return isValid ? null : { nameMismatch: true };
    }
  }

  registrationForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      this.emailValidator(this.emailRegex),
    ]),
    username: new FormControl('', [
      Validators.required,
      this.nameValidator(this.nameRegex),
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

  get username() {
    return this.registrationForm.get('username')!;
  }

  get password() {
    return this.registrationForm.get('password')!;
  }

  get passwordConfirm() {
    return this.registrationForm.get('passwordConfirm')!;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.registrationForm.valid) {
      const { email, password, username } = this.registrationForm.value;

      this.authService.register(email!, password!, username!).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/courses']);
        },
        error: (validationErrors: ValidationErrors[]) => {
          this.isEmailTaken = true;
          console.error(validationErrors);
        }
      })
    }
  }
}
