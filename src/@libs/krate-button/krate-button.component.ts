import { Component, Input } from '@angular/core';

@Component({
  selector: 'krate-button',
  imports: [],
  templateUrl: './krate-button.component.html',
  styleUrl: './krate-button.component.scss'
})
export class KrateButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() btnWidth: number = 300;
  @Input() btnHeight: number = 50;
}
