import { ComponentFixture, TestBed } from '@angular/core/testing';

import { workExperiences } from '../../content/work-experiences.content';
import { WorkExperience } from '../../models/work-experience.model';
import { ExperienceCard } from './experience-card';

describe('ExperienceCard', () => {
  let fixture: ComponentFixture<ExperienceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceCard);
    fixture.componentRef.setInput('experience', workExperiences[0]);
    fixture.componentRef.setInput('order', 0);
    await fixture.whenStable();
  });

  it('renders role metadata and collapsed semantics', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector<HTMLButtonElement>('.experience-card__toggle');

    expect(compiled.querySelector('h3')?.textContent).toContain(workExperiences[0].position);
    expect(compiled.querySelector('.experience-card__company')?.textContent).toContain(
      workExperiences[0].company,
    );
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(toggle?.getAttribute('aria-controls')).toBe(
      `experience-panel-${workExperiences[0].slug}`,
    );
    expect(compiled.querySelector('[data-motion-experience-mark]')).not.toBeNull();
    expect(compiled.querySelector('[data-motion-experience-content]')).not.toBeNull();
  });

  it('emits its experience slug when toggled', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let emittedSlug: string | undefined;
    fixture.componentInstance.toggleRequested.subscribe((slug) => (emittedSlug = slug));

    compiled.querySelector<HTMLButtonElement>('.experience-card__toggle')?.click();

    expect(emittedSlug).toBe(workExperiences[0].slug);
  });

  it('renders an associated detail region when expanded', async () => {
    fixture.componentRef.setInput('expanded', true);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const region = compiled.querySelector<HTMLElement>('[role="region"]');

    expect(region?.id).toBe(`experience-panel-${workExperiences[0].slug}`);
    expect(region?.getAttribute('aria-labelledby')).toBe(
      `experience-control-${workExperiences[0].slug}`,
    );
    expect(region?.textContent).toContain(workExperiences[0].responsibilities[0]);
    expect(region?.textContent).toContain(workExperiences[0].achievements[0]);
  });

  it('preserves card semantics with long experience content', async () => {
    const longExperience: WorkExperience = {
      ...workExperiences[0],
      position: 'A deliberately long frontend engineering position for narrow layouts',
      technologies: ['A-very-long-technology-name-that-must-wrap-within-the-card'],
    };

    fixture.componentRef.setInput('experience', longExperience);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h3')?.textContent).toContain(longExperience.position);
    expect(compiled.querySelector('.experience-card__technologies li')?.textContent).toContain(
      longExperience.technologies[0],
    );
    expect(compiled.querySelectorAll('.experience-card__toggle')).toHaveLength(1);
  });
});
