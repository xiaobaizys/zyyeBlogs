class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.themeToggle = null;
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.setupThemeToggle();
    this.setupSystemThemeListener();
  }

  setupThemeToggle() {
    this.themeToggle = document.querySelector('.theme-toggle');
    if (!this.themeToggle) return;

    this.themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });

    this.updateThemeToggleIcon();
  }

  setupSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.updateThemeToggleIcon();
      }
    });
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    this.saveTheme(this.currentTheme);
    this.updateThemeToggleIcon();
    this.emitThemeChange(this.currentTheme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.add('theme-transition');
    
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);
  }

  saveTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  updateThemeToggleIcon() {
    if (!this.themeToggle) return;

    const lightIcon = this.themeToggle.querySelector('.theme-icon-light');
    const darkIcon = this.themeToggle.querySelector('.theme-icon-dark');

    if (this.currentTheme === 'dark') {
      if (lightIcon) lightIcon.style.display = 'none';
      if (darkIcon) darkIcon.style.display = 'inline-block';
    } else {
      if (lightIcon) lightIcon.style.display = 'inline-block';
      if (darkIcon) darkIcon.style.display = 'none';
    }
  }

  emitThemeChange(theme) {
    const event = new CustomEvent('themechange', { detail: { theme } });
    document.dispatchEvent(event);
  }

  getTheme() {
    return this.currentTheme;
  }

  setTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      this.currentTheme = theme;
      this.applyTheme(theme);
      this.saveTheme(theme);
      this.updateThemeToggleIcon();
      this.emitThemeChange(theme);
    }
  }

  resetToSystem() {
    localStorage.removeItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentTheme = prefersDark ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    this.updateThemeToggleIcon();
  }
}

const themeManager = new ThemeManager();