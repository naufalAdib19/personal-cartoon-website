import { profile } from './profile.content';

describe('profile content', () => {
  it('provides nonempty required profile fields', () => {
    expect(profile.displayName.trim()).not.toBe('');
    expect(profile.professionalTitle.trim()).not.toBe('');
    expect(profile.heroStatement.trim()).not.toBe('');
    expect(profile.availability.trim()).not.toBe('');
    expect(profile.email.trim()).not.toBe('');
    expect(profile.about.length).toBeGreaterThan(0);
    expect(profile.about.every((paragraph) => paragraph.trim() !== '')).toBe(true);
    expect(profile.focusAreas).toHaveLength(3);
    expect(
      profile.focusAreas.every(
        (focusArea) => focusArea.title.trim() !== '' && focusArea.description.trim() !== '',
      ),
    ).toBe(true);
  });
});
