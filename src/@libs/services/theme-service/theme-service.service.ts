import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: 'light' | 'dark' | 'system' = 'system';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    this.setTheme(savedTheme as 'light' | 'dark' | 'system' || 'system');
  }

  private applySystemTheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'light-theme');

    if (isDark) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
    }
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      this.applySystemTheme();
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => this.applySystemTheme());
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
      this.renderer.addClass(document.body, `${theme}-theme`);
    }
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}
