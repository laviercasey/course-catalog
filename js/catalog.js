import { courses, categories } from './data.js';
import { renderCard, renderTabs } from './render.js';
import { filterCourses } from './filter.js';

const CATEGORY_ID_MAP = {
  'all':         null,
  'marketing':   'Marketing',
  'management':  'Management',
  'hr':          'HR & Recruiting',
  'design':      'Design',
  'development': 'Development',
};

const BATCH = 9;

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function initCatalog({ tabsEl, gridEl, searchEl, loadMoreBtnEl, loadMoreEl, statusEl }) {
  let activeCategory = 'all';
  let shown = BATCH;

  const allCardEls = courses.map((course) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderCard(course);
    return wrapper.firstElementChild;
  });
  allCardEls.forEach((el) => gridEl.appendChild(el));

  const emptyEl = gridEl.querySelector('.grid__empty');

  function apply() {
    const matched = filterCourses(courses, CATEGORY_ID_MAP[activeCategory], searchEl.value);
    const visibleCount = Math.min(shown, matched.length);

    const visibleIds = new Set(matched.slice(0, shown).map((c) => c.id));
    allCardEls.forEach((el, i) => {
      el.hidden = !visibleIds.has(courses[i].id);
    });

    emptyEl.hidden = matched.length > 0;

    if (loadMoreEl) {
      loadMoreEl.hidden = matched.length <= shown;
    }

    if (statusEl) {
      statusEl.textContent = matched.length === 0
        ? 'No courses found.'
        : `Showing ${visibleCount} of ${matched.length} courses`;
    }
  }

  tabsEl.innerHTML = renderTabs(categories, activeCategory);
  apply();

  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.tabs__item');
    if (!btn) return;

    activeCategory = btn.dataset.category;
    shown = BATCH;
    updateTabState(btn);
    apply();
  });

  tabsEl.addEventListener('keydown', (e) => {
    const tabs = Array.from(tabsEl.querySelectorAll('.tabs__item'));
    const focused = tabsEl.querySelector('.tabs__item:focus');
    if (!focused) return;

    const idx = tabs.indexOf(focused);
    let next = -1;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next = (idx + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      next = (idx - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      next = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      next = tabs.length - 1;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      focused.click();
      return;
    }

    if (next >= 0) {
      tabs.forEach((t, i) => { t.tabIndex = i === next ? 0 : -1; });
      tabs[next].focus();
    }
  });

  searchEl.addEventListener('input', debounce(() => {
    shown = BATCH;
    apply();
  }, 150));

  if (loadMoreBtnEl) {
    loadMoreBtnEl.addEventListener('click', () => {
      shown += BATCH;
      apply();
    });
  }

  function updateTabState(activeBtn) {
    tabsEl.querySelectorAll('.tabs__item').forEach((el) => {
      const isActive = el === activeBtn;
      el.classList.toggle('tabs__item--active', isActive);
      el.setAttribute('aria-pressed', String(isActive));
      el.tabIndex = isActive ? 0 : -1;
    });
  }
}
