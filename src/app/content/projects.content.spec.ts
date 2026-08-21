import { projects } from './projects.content';

describe('project content', () => {
  it('contains exactly three projects with unique slugs', () => {
    expect(projects).toHaveLength(3);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
  });

  it('provides required project content and valid image dimensions', () => {
    for (const project of projects) {
      expect(project.slug.trim()).not.toBe('');
      expect(project.title.trim()).not.toBe('');
      expect(project.summary.trim()).not.toBe('');
      expect(project.category.trim()).not.toBe('');
      expect(project.role.trim()).not.toBe('');
      expect(project.challenge.trim()).not.toBe('');
      expect(project.approach.trim()).not.toBe('');
      expect(project.outcome.trim()).not.toBe('');
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.image.src.trim()).not.toBe('');
      expect(project.image.alt.trim()).not.toBe('');
      expect(project.image.width).toBeGreaterThan(0);
      expect(project.image.height).toBeGreaterThan(0);
    }
  });
});
