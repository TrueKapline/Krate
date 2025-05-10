import { Component } from '@angular/core';
import { KrateButtonComponent } from '../../krate-ui/krate-button/krate-button.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [
    KrateButtonComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

}
