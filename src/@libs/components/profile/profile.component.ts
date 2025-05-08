import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { KrateButtonComponent } from '../krate-button/krate-button.component';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { AuthService } from '../../services/auth/auth.service';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    CardComponent,
    KrateButtonComponent,
    ThemeSwitcherComponent,
    NgxSkeletonLoaderComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  @Input() username?: string;
  @Input() email?: string;

  theme = {
    height: '55px',
    width: '350px',
    'background-image': 'linear-gradient(90deg, #3a3a3a 25%, #3a3a3a 50%, #3a3a3a 75%) !important;'
  }

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.profile().subscribe({
      next: (response) => {
        this.username = response.username;
        this.email = response.email;
      }
    })
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
