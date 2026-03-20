class App {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupBackToTop();
    this.setupReadingProgress();
    this.setupSmoothScroll();
    this.setupImageLazyLoading();
    this.setupIntersectionObserver();
    this.handlePageLoad();
  }

  setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        }
      });
    }

    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  setupBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    const handleScroll = Utils.throttle(() => {
      const scrollPercentage = Utils.getScrollPercentage();
      
      if (scrollPercentage > 20) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  setupReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar) return;

    const updateProgress = Utils.throttle(() => {
      const scrollPercentage = Utils.getScrollPercentage();
      progressBar.style.width = `${scrollPercentage}%`;
    }, 50);

    window.addEventListener('scroll', updateProgress);
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = document.querySelector('header')?.offsetHeight || 0;
          Utils.scrollToElement(target, offset + 20);
        }
      });
    });
  }

  setupImageLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.src = img.dataset.src || img.src;
      });
    } else {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.post-card, .skill-item, .about-section__content').forEach(el => {
      observer.observe(el);
    });
  }

  handlePageLoad() {
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      this.setupInitialAnimations();
    });
  }

  setupInitialAnimations() {
    const elements = document.querySelectorAll('.hero, .posts-grid, .post-detail');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, index * 100);
    });
  }

  setupFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (this.validateForm(form)) {
          this.handleFormSubmit(form);
        }
      });
    });
  }

  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
      const value = input.value.trim();
      const required = input.hasAttribute('required');
      
      if (required && !value) {
        this.showInputError(input, '此字段为必填项');
        isValid = false;
      } else if (input.type === 'email' && value && !Utils.validateEmail(value)) {
        this.showInputError(input, '请输入有效的邮箱地址');
        isValid = false;
      } else if (input.type === 'url' && value && !Utils.validateUrl(value)) {
        this.showInputError(input, '请输入有效的URL');
        isValid = false;
      } else {
        this.clearInputError(input);
      }
    });

    return isValid;
  }

  showInputError(input, message) {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    input.classList.add('error');
  }

  clearInputError(input) {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
    input.classList.remove('error');
  }

  async handleFormSubmit(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = '提交中...';

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      console.log('Form data:', data);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.showSuccessMessage('提交成功！');
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      this.showErrorMessage('提交失败，请稍后重试');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  showSuccessMessage(message) {
    this.showToast(message, 'success');
  }

  showErrorMessage(message) {
    this.showToast(message, 'error');
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 1rem 2rem;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 9999;
      animation: slideUp 0.3s ease-out;
      background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideDown 0.3s ease-out';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            const searchInput = document.querySelector('.search-bar__input');
            if (searchInput) {
              searchInput.focus();
            }
            break;
          case '/':
            e.preventDefault();
            const firstInput = document.querySelector('input, textarea');
            if (firstInput) {
              firstInput.focus();
            }
            break;
        }
      }

      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
          activeModal.classList.remove('active');
        }

        const hamburger = document.querySelector('.hamburger.active');
        const navLinks = document.querySelector('.nav-links.active');
        if (hamburger && navLinks) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        }
      }
    });
  }

  setupAnalytics() {
    if (typeof gtag === 'function') {
      document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('http')) {
            gtag('event', 'click', {
              'event_category': 'outbound',
              'event_label': href,
              'transport_type': 'beacon'
            });
          }
        });
      });
    }
  }

  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful');
          })
          .catch(error => {
            console.log('ServiceWorker registration failed:', error);
          });
      });
    }
  }

  setupPWA() {
    let deferredPrompt;
    const installButton = document.querySelector('.install-pwa');

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;

      if (installButton) {
        installButton.style.display = 'block';
        installButton.addEventListener('click', () => {
          installButton.style.display = 'none';
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
          });
        });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});