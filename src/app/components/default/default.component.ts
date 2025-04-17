import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { KrateButtonComponent } from '../../../@libs/components/krate-button/krate-button.component';
import { ThemeSwitcherComponent } from '../../../@libs/components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-default',
  imports: [
    RouterLink,
    RouterLinkActive,
    KrateButtonComponent,
    ThemeSwitcherComponent
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

}
