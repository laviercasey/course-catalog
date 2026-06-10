import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterCourses } from '../js/filter.js';

const courses = [
  { id: 1, category: 'Marketing', title: 'Google Ads Mastery', price: '$100', author: 'Alice' },
  { id: 2, category: 'Design', title: 'UI Design Fundamentals', price: '$200', author: 'Bob' },
  { id: 3, category: 'Marketing', title: 'Brand Strategy', price: '$300', author: 'Carol' },
  { id: 4, category: 'Development', title: 'JavaScript for Beginners', price: '$150', author: 'Dave' },
];

test('filter by category returns only matching courses', () => {
  const result = filterCourses(courses, 'Marketing', '');
  assert.equal(result.length, 2);
  assert.ok(result.every((c) => c.category === 'Marketing'));
});

test('filter by substring search on title', () => {
  const result = filterCourses(courses, null, 'design');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 2);
});

test('search is case-insensitive', () => {
  const result = filterCourses(courses, null, 'BRAND');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 3);
});

test('combined filter: category AND search query (AND logic)', () => {
  const result = filterCourses(courses, 'Marketing', 'ads');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 1);
});

test('returns empty array when nothing matches', () => {
  const result = filterCourses(courses, 'Design', 'nonexistent');
  assert.equal(result.length, 0);
});

test('categoryName null returns all courses', () => {
  const result = filterCourses(courses, null, '');
  assert.equal(result.length, courses.length);
});
