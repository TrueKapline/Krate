import {
  Component,
  ElementRef,
  forwardRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import loader from '@monaco-editor/loader';
import { ThemeService } from '../../../services/theme/theme.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'monaco-editor',
  imports: [],
  templateUrl: './monaco-editor.component.html',
  styleUrl: './monaco-editor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonacoEditorComponent),
      multi: true
    }
  ]
})
export class MonacoEditorComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;
  @Input() language: string = 'python';

  private themeService = inject(ThemeService);

  private editor: any;
  private resizeObserver?: ResizeObserver;
  private value: string = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  async ngOnInit() {
    const theme = this.themeService.currentTheme() === 'light' ? 'vs' : 'vs-dark'

    await loader.init();

    this.editor = (window as any).monaco.editor.create(this.container.nativeElement, {
      value: this.value,
      language: this.language,
      theme: theme,
      automaticLayout: true
    });

    this.editor.onDidChangeModelContent(() => {
      const newValue = this.editor.getValue();
      this.onChange(newValue);
      this.value = newValue;
    });

    this.setupResizeObserver();
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.editor.layout();
    });
    this.resizeObserver.observe(this.container.nativeElement);
  }

  ngOnDestroy() {
    this.editor?.dispose();
    this.resizeObserver?.disconnect();
  }

  writeValue(value: string): void {
    if (value !== this.value) {
      this.value = value || '';
      if (this.editor) {
        this.editor.setValue(this.value);
      }
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
