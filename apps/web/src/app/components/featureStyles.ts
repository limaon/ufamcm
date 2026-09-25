const CATEGORY_COLORS: Record<string, string> = {
  building: '#2563eb',
  tree: '#16a34a',
  trail: '#f97316',
  forest_area: '#166534',
};

export function getCategoryColor(category: unknown): string {
  if (typeof category !== 'string') {
    return '#6b7280';
  }

  return CATEGORY_COLORS[category] ?? '#6b7280';
}
