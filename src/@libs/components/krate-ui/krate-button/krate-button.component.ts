import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'krate-button',
  imports: [
    NgClass
  ],
  templateUrl: './krate-button.component.html',
  styleUrl: './krate-button.component.scss'
})
export class KrateButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
