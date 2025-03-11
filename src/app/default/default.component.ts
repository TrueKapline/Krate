import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { KrateButtonComponent } from '../../@libs/krate-button/krate-button.component';

@Component({
  selector: 'app-default',
  imports: [
    RouterLink,
    RouterLinkActive,
    KrateButtonComponent
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

}
