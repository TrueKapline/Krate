import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme/theme.service';
import { KrateButtonComponent } from '../krate-button/krate-button.component';

@Component({
  selector: 'theme-switcher',
  imports: [
    FormsModule,
    KrateButtonComponent,
  ],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {
  private themeService = inject(ThemeService);

  currentTheme = this.themeService.currentTheme;

  switchTheme() {
    const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(newTheme);
  }
}
