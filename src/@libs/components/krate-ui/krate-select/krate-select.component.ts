import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'krate-select',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KrateSelectComponent),
      multi: true
    }
  ],
  templateUrl: './krate-select.component.html',
  styleUrl: './krate-select.component.scss'
})
export class KrateSelectComponent implements ControlValueAccessor {
  @Input() options: { value: string; label: string }[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  selectedValue: string = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onSelectionChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.selectedValue = value;
    this.onChange(value);
    this.onTouched();
    this.selectionChange.emit(value);
  }
}
