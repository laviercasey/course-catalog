export function filterCourses(courses, categoryName, query) {
  const q = query.trim().toLowerCase();
  return courses.filter((course) => {
    const matchesCategory = categoryName === null || course.category === categoryName;
    const matchesSearch = q === '' || course.title.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
}
