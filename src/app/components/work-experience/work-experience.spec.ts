import { ComponentFixture, TestBed } from '@angular/core/testing';

import { workExperiences } from '../../content/work-experiences.content';
import { WorkExperience } from './work-experience';

describe('WorkExperience', () => {
  let fixture: ComponentFixture<WorkExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkExperience],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkExperience);
    fixture.componentRef.setInput('experiences', workExperiences);
    await fixture.whenStable();
  });

  it('renders three collapsed experience cards initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const toggles = compiled.querySelectorAll<HTMLButtonElement>('.experience-card__toggle');

    expect(toggles).toHaveLength(3);
    expect([...toggles].every((toggle) => toggle.getAttribute('aria-expanded') === 'false')).toBe(
      true,
    );
    expect(compiled.querySelectorAll('app-experience-card[data-motion-experience]')).toHaveLength(
      3,
    );
    expect(compiled.querySelector('[data-motion-experience-section]')).not.toBeNull();
    expect(compiled.querySelector('[data-motion-experience-progress]')).not.toBeNull();
    expect(compiled.querySelectorAll('[role="region"]')).toHaveLength(0);
  });

  it('opens one role at a time', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let toggles = compiled.querySelectorAll<HTMLButtonElement>('.experience-card__toggle');

    toggles[0].click();
    await fixture.whenStable();

    toggles = compiled.querySelectorAll<HTMLButtonElement>('.experience-card__toggle');
    expect(toggles[0].getAttribute('aria-expanded')).toBe('true');
    expect(compiled.querySelectorAll('[role="region"]')).toHaveLength(1);
    expect(compiled.querySelector('[role="region"]')?.textContent).toContain(
      workExperiences[0].responsibilities[0],
    );

    toggles[1].click();
    await fixture.whenStable();

    toggles = compiled.querySelectorAll<HTMLButtonElement>('.experience-card__toggle');
    expect(toggles[0].getAttribute('aria-expanded')).toBe('false');
    expect(toggles[1].getAttribute('aria-expanded')).toBe('true');
    expect(compiled.querySelectorAll('[role="region"]')).toHaveLength(1);
    expect(compiled.querySelector('[role="region"]')?.textContent).toContain(
      workExperiences[1].responsibilities[0],
    );
  });

  it('closes the active role when its control is selected again', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let toggle = compiled.querySelector<HTMLButtonElement>('.experience-card__toggle');

    toggle?.click();
    await fixture.whenStable();
    toggle = compiled.querySelector<HTMLButtonElement>('.experience-card__toggle');
    toggle?.click();
    await fixture.whenStable();

    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(compiled.querySelectorAll('[role="region"]')).toHaveLength(0);
  });
});
