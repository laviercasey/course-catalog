const BADGE_CLASS = {
  'Marketing':    'card__badge--marketing',
  'Management':   'card__badge--management',
  'HR & Recruiting': 'card__badge--hr',
  'Design':       'card__badge--design',
  'Development':  'card__badge--development',
};

export function renderCard(course) {
  const badgeClass = BADGE_CLASS[course.category] ?? '';
  return `
    <article class="card" role="listitem">
      <img
        class="card__image"
        src="${course.image}"
        alt="${course.title}"
        loading="lazy"
        decoding="async"
        width="390"
        height="240"
      />
      <div class="card__content">
        <span class="card__badge ${badgeClass}">${course.category}</span>
        <h3 class="card__title">${course.title}</h3>
        <div class="card__info">
          <span class="card__price">${course.price}</span>
          <span class="card__divider" aria-hidden="true"></span>
          <span class="card__author">${course.author}</span>
        </div>
      </div>
    </article>
  `.trim();
}

export function renderCards(courses) {
  if (courses.length === 0) {
    return '<p class="grid__empty">No courses found.</p>';
  }
  return courses.map(renderCard).join('');
}

export function renderTabs(categories, activeId) {
  return categories.map((cat) => {
    const isActive = cat.id === activeId;
    const mod = isActive ? ' tabs__item--active' : '';
    return `
      <button
        class="tabs__item${mod}"
        data-category="${cat.id}"
        type="button"
        tabindex="${isActive ? '0' : '-1'}"
        ${isActive ? 'aria-pressed="true"' : 'aria-pressed="false"'}
      >
        <span class="tabs__item-inner">
          <span class="tabs__label">${cat.label}</span>
          <span class="tabs__count">${cat.count}</span>
        </span>
      </button>
    `.trim();
  }).join('');
}
