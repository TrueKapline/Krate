import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme/theme.service';
import { KrateSelectComponent } from '../krate-select/krate-select.component';

@Component({
  selector: 'theme-switcher',
  imports: [
    FormsModule,
    KrateSelectComponent,
  ],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {
  protected themeService = inject(ThemeService);

  themeOptions = [
    { value: 'system', label: 'Системная' },
    { value: 'dark', label: 'Темная' },
    { value: 'light', label: 'Светлая' },
  ];
}
