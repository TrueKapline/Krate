import { Component, forwardRef, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'krate-input',
  imports: [
    NgClass
  ],
  templateUrl: './krate-input.component.html',
  styleUrl: './krate-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KrateInputComponent),
      multi: true
    }
  ]
})
export class KrateInputComponent implements ControlValueAccessor {
  @Input() type: 'password' | 'email' | 'text' = 'email';
  @Input() placeholder: string = 'Enter your email';
  @Input() size: 'small' | 'medium' | 'large' = 'large';
  @Input() invalid: boolean = false;
  @Input() autocomplete?: 'new-password' | 'current-password' | 'email' | 'nickname';

  value: string = '';
  disabled = false;
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
