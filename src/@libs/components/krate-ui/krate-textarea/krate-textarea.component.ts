import { Component, forwardRef, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'krate-textarea',
  imports: [
    NgClass
  ],
  templateUrl: './krate-textarea.component.html',
  styleUrl: './krate-textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KrateTextareaComponent),
      multi: true
    }
  ]
})
export class KrateTextareaComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Ваш текст';
  @Input() size: 'small' | 'medium' | 'large' = 'large';
  @Input() id: string = 'empty';
  @Input() invalid: boolean = false;
  @Input() customValue?: string = '';

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
