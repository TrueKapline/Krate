import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme-service/theme-service.service';
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
export class ThemeSwitcherComponent implements OnInit {
  currentTheme!: 'light' | 'dark' | 'system';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  updateTheme() {
    this.themeService.setTheme(this.currentTheme);
  }

  // TODO: Удалить на продакшене
  switchTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(newTheme);
    this.currentTheme = newTheme;
  }
}
