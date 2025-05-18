import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../krate-ui/card/card.component';
import { KrateButtonComponent } from '../../krate-ui/krate-button/krate-button.component';
import { ThemeSwitcherComponent } from '../../krate-ui/theme-switcher/theme-switcher.component';
import { AuthService } from '../../../services/auth/auth.service';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { Router } from '@angular/router';
import { ModalComponent } from '../../krate-ui/modal/modal.component';
import { KrateInputComponent } from '../../krate-ui/krate-input/krate-input.component';
import { KrateTextareaComponent } from '../../krate-ui/krate-textarea/krate-textarea.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditService } from '../../../services/edit/edit.service';

@Component({
  selector: 'app-profile',
  imports: [
    CardComponent,
    KrateButtonComponent,
    ThemeSwitcherComponent,
    NgxSkeletonLoaderComponent,
    ModalComponent,
    KrateInputComponent,
    KrateTextareaComponent,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  username?: string;
  email?: string;
  role?: 'user' | 'admin';

  isModalOpen = false;

  protected isSubmitted = false;

  constructor(
    private authService: AuthService,
    private editService: EditService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.profile().subscribe({
      next: (response) => {
        this.username = response.username;
        this.email = response.email;
        this.role = response.role;
      }
    })
  }

  logout() {
    this.authService.clearSession();
    localStorage.removeItem('token');
    this.router.navigate(['/']).then();
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  newCourseForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    description: new FormControl(''),
  });

  get name() {
    return this.newCourseForm.get('name')!;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.newCourseForm.valid) {
      const { name, description } = this.newCourseForm.value;

      this.editService.newCourse(name!, description!).subscribe({
        next: (response) => {
          console.log(response.name, response.description);
          this.router.navigate(['/edit/course', response.name]).then();
        }
      })
    }
  }
}
