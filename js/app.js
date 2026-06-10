import { initCatalog } from './catalog.js';

document.addEventListener('DOMContentLoaded', () => {
  initCatalog({
    tabsEl:        document.querySelector('[data-tabs]'),
    gridEl:        document.querySelector('[data-grid]'),
    searchEl:      document.querySelector('[data-search]'),
    loadMoreBtnEl: document.querySelector('[data-load-more-btn]'),
    loadMoreEl:    document.querySelector('[data-load-more]'),
    statusEl:      document.querySelector('[data-status]'),
  });
});
