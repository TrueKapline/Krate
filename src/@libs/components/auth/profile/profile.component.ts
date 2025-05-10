import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../krate-ui/card/card.component';
import { KrateButtonComponent } from '../../krate-ui/krate-button/krate-button.component';
import { ThemeSwitcherComponent } from '../../krate-ui/theme-switcher/theme-switcher.component';
import { AuthService } from '../../../services/auth/auth.service';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    CardComponent,
    KrateButtonComponent,
    ThemeSwitcherComponent,
    NgxSkeletonLoaderComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  username?: string;
  email?: string;
  role?: 'user' | 'admin';

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
        this.role = response.role;
      }
    })
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']).then();
  }
}
