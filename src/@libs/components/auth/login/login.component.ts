import { Component } from '@angular/core';
import { KrateButtonComponent } from "../../krate-ui/krate-button/krate-button.component";
import { KrateInputComponent } from '../../krate-ui/krate-input/krate-input.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { EMAIL_REGEX } from '../../../model/email-regex.model';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    KrateButtonComponent,
    KrateInputComponent,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected isSubmitted = false;
  protected isInputWrong = false;

  private emailRegex: RegExp = EMAIL_REGEX;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  emailValidator(emailRegex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = emailRegex.test(control.value);
      return isValid ? null : { emailMismatch: true };
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      this.emailValidator(this.emailRegex),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  });

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email!, password!).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/courses']);
        },
        error: (validationErrors: ValidationErrors[]) => {
          this.isInputWrong = true;
          console.error(validationErrors);
        }
      })
    }
  }
}
