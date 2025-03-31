import { Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme = signal<'light' | 'dark' | 'system'>('system');

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';
    this.setTheme(savedTheme);
  }

  private applySystemTheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'light-theme');
    this.renderer.addClass(document.body, isDark ? 'dark-theme' : 'light-theme');
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    this.currentTheme.set(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      this.applySystemTheme();
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
      this.renderer.addClass(document.body, `${theme}-theme`);
    }
  }
}
