class BlogManager {
  constructor() {
    this.posts = [];
    this.filteredPosts = [];
    this.currentCategory = null;
    this.currentTag = null;
    this.searchQuery = '';
    this.init();
  }

  async init() {
    try {
      await this.loadPosts();
      this.setupEventListeners();
      this.setupFilters();
      this.setupSearch();
    } catch (error) {
      console.error('Failed to initialize blog:', error);
      this.showError('加载文章失败，请稍后重试');
    }
  }

  async loadPosts() {
    try {
      const response = await fetch('data/posts.json');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      this.posts = await response.json();
      this.filteredPosts = [...this.posts];
    } catch (error) {
      console.error('Error loading posts:', error);
      const fallbackPosts = [
        {
          "id": "post-001",
          "title": "欢迎来到zyye博客",
          "excerpt": "这是我的第一篇博客文章，介绍了这个博客系统的功能和特点。欢迎浏览和交流！",
          "content": "<p>欢迎来到zyye博客！这是一个基于HTML、CSS和JavaScript开发的现代化博客系统。</p><h2>博客特点</h2><ul><li>响应式设计，支持移动端</li><li>深色/浅色主题切换</li><li>文章分类和标签</li><li>搜索功能</li></ul><p>希望你能在这里找到有趣的内容，也欢迎留言交流！</p>",
          "author": "博主",
          "date": "2024-01-15",
          "category": "生活",
          "tags": ["欢迎", "介绍", "博客"],
          "readTime": 3,
          "image": "https://placehold.co/600x400/007bff/ffffff?text=Blog+Post+1"
        },
        {
          "id": "post-002",
          "title": "JavaScript ES6+ 新特性详解",
          "excerpt": "深入了解JavaScript ES6+的新特性，包括箭头函数、解构赋值、Promise等现代JavaScript语法。",
          "content": "<p>JavaScript ES6+带来了许多令人兴奋的新特性，让我们的代码更加简洁和高效。</p><h2>主要特性</h2><ul><li>箭头函数</li><li>解构赋值</li><li>模板字符串</li><li>Promise和async/await</li><li>类和模块</li></ul><p>这些特性大大提升了JavaScript的开发体验。</p>",
          "author": "博主",
          "date": "2024-02-10",
          "category": "技术",
          "tags": ["JavaScript", "ES6", "前端"],
          "readTime": 8,
          "image": "https://placehold.co/600x400/28a745/ffffff?text=Blog+Post+2"
        },
        {
          "id": "post-003",
          "title": "CSS Grid 布局完全指南",
          "excerpt": "学习CSS Grid布局系统，掌握二维布局的强大功能，创建复杂的网页布局。",
          "content": "<p>CSS Grid是一个强大的二维布局系统，可以轻松创建复杂的网页布局。</p><h2>Grid基础</h2><ul><li>Grid容器和Grid项目</li><li>行和列的定义</li><li>网格区域</li><li>对齐和间距</li></ul><p>Grid让布局变得更加简单和灵活。</p>",
          "author": "博主",
          "date": "2024-03-05",
          "category": "技术",
          "tags": ["CSS", "Grid", "布局"],
          "readTime": 10,
          "image": "https://placehold.co/600x400/ffc107/ffffff?text=Blog+Post+3"
        },
        {
          "id": "post-004",
          "title": "响应式设计的最佳实践",
          "excerpt": "探讨响应式网页设计的最佳实践，包括媒体查询、弹性布局和移动优先策略。",
          "content": "<p>响应式设计是现代网页开发的核心技能之一。</p><h2>关键原则</h2><ul><li>移动优先</li><li>弹性布局</li><li>媒体查询</li><li>灵活的图片和媒体</li></ul><p>掌握这些原则，让你的网站在任何设备上都能完美展示。</p>",
          "author": "博主",
          "date": "2024-03-20",
          "category": "技术",
          "tags": ["响应式", "CSS", "设计"],
          "readTime": 7,
          "image": "https://placehold.co/600x400/dc3545/ffffff?text=Blog+Post+4"
        },
        {
          "id": "post-005",
          "title": "我的编程学习之路",
          "excerpt": "分享我从零开始学习编程的经历和心得，希望能给初学者一些启发和帮助。",
          "content": "<p>编程学习是一个持续的过程，每个人都有自己的学习路径。</p><h2>学习建议</h2><ul><li>打好基础</li><li>多动手实践</li><li>阅读优秀代码</li><li>参与开源项目</li></ul><p>保持学习的热情，你会收获很多。</p>",
          "author": "博主",
          "date": "2024-04-01",
          "category": "生活",
          "tags": ["学习", "编程", "经验"],
          "readTime": 5,
          "image": "https://placehold.co/600x400/17a2b8/ffffff?text=Blog+Post+5"
        },
        {
          "id": "post-006",
          "title": "Web性能优化技巧",
          "excerpt": "介绍提升网站性能的各种技巧，包括资源压缩、懒加载、缓存策略等。",
          "content": "<p>网站性能直接影响用户体验和SEO排名。</p><h2>优化策略</h2><ul><li>压缩资源文件</li><li>图片优化</li><li>懒加载</li><li>使用CDN</li><li>浏览器缓存</li></ul><p>性能优化是一个持续的过程，需要不断测试和改进。</p>",
          "author": "博主",
          "date": "2024-04-15",
          "category": "技术",
          "tags": ["性能", "优化", "Web"],
          "readTime": 9,
          "image": "https://placehold.co/600x400/6f42c1/ffffff?text=Blog+Post+6"
        }
      ];
      this.posts = fallbackPosts;
      this.filteredPosts = [...this.posts];
    }
  }

  setupEventListeners() {
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleLike(e));
    });

    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleShare(e));
    });
  }

  setupFilters() {
    const categoryButtons = document.querySelectorAll('[data-category]');
    categoryButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        this.filterByCategory(category);
      });
    });

    const tagButtons = document.querySelectorAll('[data-tag]');
    tagButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const tag = e.target.dataset.tag;
        this.filterByTag(tag);
      });
    });
  }

  setupSearch() {
    const searchInput = document.querySelector('.search-bar__input');
    if (!searchInput) return;

    const debouncedSearch = Utils.debounce((query) => {
      this.searchPosts(query);
    }, 300);

    searchInput.addEventListener('input', (e) => {
      debouncedSearch(e.target.value);
    });
  }

  filterByCategory(category) {
    this.currentCategory = category === 'all' ? null : category;
    this.applyFilters();
    this.updateActiveFilter('category', category);
  }

  filterByTag(tag) {
    this.currentTag = tag === 'all' ? null : tag;
    this.applyFilters();
    this.updateActiveFilter('tag', tag);
  }

  searchPosts(query) {
    this.searchQuery = query.trim().toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    this.filteredPosts = this.posts.filter(post => {
      let matchesCategory = true;
      let matchesTag = true;
      let matchesSearch = true;

      if (this.currentCategory) {
        matchesCategory = post.category === this.currentCategory;
      }

      if (this.currentTag) {
        matchesTag = post.tags.includes(this.currentTag);
      }

      if (this.searchQuery) {
        const searchFields = [
          post.title,
          post.excerpt,
          post.content
        ].join(' ').toLowerCase();
        matchesSearch = searchFields.includes(this.searchQuery);
      }

      return matchesCategory && matchesTag && matchesSearch;
    });

    this.renderPosts();
  }

  updateActiveFilter(type, value) {
    const selector = type === 'category' 
      ? `[data-category="${value}"]` 
      : `[data-tag="${value}"]`;
    
    document.querySelectorAll('.filter-button').forEach(button => {
      button.classList.remove('active');
    });

    const activeButton = document.querySelector(selector);
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }

  renderPosts() {
    const container = document.querySelector('.posts-grid');
    if (!container) return;

    if (this.filteredPosts.length === 0) {
      this.renderEmptyState(container);
      return;
    }

    container.innerHTML = this.filteredPosts.map(post => this.createPostCard(post)).join('');
  }

  createPostCard(post) {
    return `
      <article class="post-card" data-post-id="${post.id}" onclick="window.location.href='post.html?id=${post.id}'">
        <img src="${post.image}" alt="${post.title}" class="post-card__image" loading="lazy">
        <div class="post-card__content">
          <span class="post-card__category">${post.category}</span>
          <h3 class="post-card__title">${Utils.escapeHtml(post.title)}</h3>
          <p class="post-card__excerpt">${Utils.escapeHtml(post.excerpt)}</p>
          <div class="post-card__meta">
            <span>${Utils.formatDate(post.date)}</span>
            <span>${Utils.formatReadTime(post.readTime)}</span>
          </div>
          <div class="post-card__tags">
            ${post.tags.map(tag => `<span class="post-card__tag">${Utils.escapeHtml(tag)}</span>`).join('')}
          </div>
        </div>
      </article>
    `;
  }

  renderEmptyState(container) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">📭</div>
        <h3 class="empty-state__text">没有找到相关文章</h3>
        <p>尝试调整筛选条件或搜索关键词</p>
      </div>
    `;
  }

  async loadPostDetail(postId) {
    try {
      const post = this.posts.find(p => p.id === postId);
      if (!post) {
        throw new Error('Post not found');
      }
      this.renderPostDetail(post);
    } catch (error) {
      console.error('Error loading post detail:', error);
      this.showError('文章加载失败');
    }
  }

  renderPostDetail(post) {
    const container = document.querySelector('.post-detail');
    if (!container) return;

    container.innerHTML = `
      <div class="post-detail__header">
        <img src="${post.image}" alt="${post.title}" class="post-detail__image">
        <span class="post-detail__category">${post.category}</span>
        <h1 class="post-detail__title">${Utils.escapeHtml(post.title)}</h1>
        <div class="post-detail__meta">
          <span>👤 ${Utils.escapeHtml(post.author)}</span>
          <span>📅 ${Utils.formatDate(post.date)}</span>
          <span>⏱️ ${Utils.formatReadTime(post.readTime)}</span>
        </div>
      </div>
      <div class="post-detail__content">
        ${post.content}
      </div>
      <div class="post-actions">
        <button class="like-button" data-post-id="${post.id}">
          <span>❤️</span>
          <span>点赞</span>
        </button>
        <button class="share-button" data-post-id="${post.id}">
          <span>📤</span>
          <span>分享</span>
        </button>
      </div>
    `;

    this.setupEventListeners();
  }

  handleLike(event) {
    const button = event.currentTarget;
    const postId = button.dataset.postId;
    const isLiked = button.classList.contains('liked');

    if (isLiked) {
      button.classList.remove('liked');
      button.querySelector('span:last-child').textContent = '点赞';
    } else {
      button.classList.add('liked');
      button.querySelector('span:last-child').textContent = '已点赞';
      Utils.animateElement(button, 'pulse 0.3s ease-in-out');
    }

    this.saveLikeState(postId, !isLiked);
  }

  saveLikeState(postId, liked) {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (liked) {
      if (!likedPosts.includes(postId)) {
        likedPosts.push(postId);
      }
    } else {
      const index = likedPosts.indexOf(postId);
      if (index > -1) {
        likedPosts.splice(index, 1);
      }
    }
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }

  loadLikeStates() {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    likedPosts.forEach(postId => {
      const button = document.querySelector(`.like-button[data-post-id="${postId}"]`);
      if (button) {
        button.classList.add('liked');
        button.querySelector('span:last-child').textContent = '已点赞';
      }
    });
  }

  handleShare(event) {
    const button = event.currentTarget;
    const postId = button.dataset.postId;
    const post = this.posts.find(p => p.id === postId);
    
    if (!post) return;

    const url = window.location.href;
    const title = post.title;

    if (navigator.share) {
      navigator.share({
        title: title,
        text: post.excerpt,
        url: url
      }).catch(console.error);
    } else {
      Utils.copyToClipboard(url).then(() => {
        alert('链接已复制到剪贴板！');
      }).catch(() => {
        alert('复制失败，请手动复制链接');
      });
    }
  }

  getCategories() {
    return Utils.unique(this.posts, 'category').map(post => post.category);
  }

  getTags() {
    const allTags = this.posts.flatMap(post => post.tags);
    return Utils.unique(allTags);
  }

  getRecentPosts(count = 5) {
    return Utils.sortBy(this.posts, 'date', 'desc').slice(0, count);
  }

  getRelatedPosts(currentPost, count = 3) {
    const relatedPosts = this.posts.filter(post => {
      if (post.id === currentPost.id) return false;
      
      const hasSameCategory = post.category === currentPost.category;
      const hasCommonTag = post.tags.some(tag => currentPost.tags.includes(tag));
      
      return hasSameCategory || hasCommonTag;
    });

    return relatedPosts.slice(0, count);
  }

  showError(message) {
    const container = document.querySelector('.posts-grid') || document.querySelector('.post-detail');
    if (!container) return;

    container.innerHTML = `
      <div class="error">
        <div class="error__icon">⚠️</div>
        <h3 class="error__text">${message}</h3>
      </div>
    `;
  }
}

const blogManager = new BlogManager();