import { workExperiences } from './work-experiences.content';

describe('workExperiences', () => {
  it('contains three roles with unique slugs', () => {
    expect(workExperiences).toHaveLength(3);
    expect(new Set(workExperiences.map((experience) => experience.slug)).size).toBe(
      workExperiences.length,
    );
  });

  it('provides complete placeholder content for every role', () => {
    for (const experience of workExperiences) {
      expect(experience.company.trim()).not.toBe('');
      expect(experience.position.trim()).not.toBe('');
      expect(experience.period.trim()).not.toBe('');
      expect(experience.technologies.length).toBeGreaterThan(0);
      expect(experience.responsibilities.length).toBeGreaterThan(0);
      expect(experience.achievements.length).toBeGreaterThan(0);
    }
  });
});
