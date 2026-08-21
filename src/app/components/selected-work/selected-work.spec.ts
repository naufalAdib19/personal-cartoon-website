import { ComponentFixture, TestBed } from '@angular/core/testing';

import { projects } from '../../content/projects.content';
import { SelectedWork } from './selected-work';

describe('SelectedWork', () => {
  let fixture: ComponentFixture<SelectedWork>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedWork],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedWork);
    fixture.componentRef.setInput('projects', projects);
    await fixture.whenStable();
  });

  it('renders three collapsed project cards initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const toggles = compiled.querySelectorAll<HTMLButtonElement>('.project-card__toggle');

    expect(toggles).toHaveLength(3);
    expect([...toggles].every((toggle) => toggle.getAttribute('aria-expanded') === 'false')).toBe(
      true,
    );
    expect(
      compiled.querySelector('.selected-work__intro')?.hasAttribute('data-motion-reveal'),
    ).toBe(true);
    expect(compiled.querySelectorAll('app-project-card[data-motion-project]')).toHaveLength(3);
    expect(compiled.querySelector('[data-motion-work-section]')).not.toBeNull();
    expect(compiled.querySelector('[data-motion-work-progress]')).not.toBeNull();
    expect(compiled.querySelectorAll('[role="region"]')).toHaveLength(0);
  });

  it('opens one project at a time', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let toggles = compiled.querySelectorAll<HTMLButtonElement>('.project-card__toggle');

    toggles[0].click();
    await fixture.whenStable();

    toggles = compiled.querySelectorAll<HTMLButtonElement>('.project-card__toggle');
    expect(toggles[0].getAttribute('aria-expanded')).toBe('true');
    expect(compiled.querySelectorAll('[role="region"]')).toHaveLength(1);
    expect(compiled.querySelector('[role="region"]')?.textContent).toContain(projects[0].challenge);

    toggles[1].click();
    await fixture.whenStable();

    toggles = compiled.querySelectorAll<HTMLButtonElement>('.project-card__toggle');
    expect(toggles[0].getAttribute('aria-expanded')).toBe('false');
    expect(toggles[1].getAttribute('aria-expanded')).toBe('true');
    expect(compiled.querySelectorAll('[role="region"]')).toHaveLength(1);
    expect(compiled.querySelector('[role="region"]')?.textContent).toContain(projects[1].challenge);
  });

  it('closes the active project when its control is selected again', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let toggle = compiled.querySelector<HTMLButtonElement>('.project-card__toggle');

    toggle?.click();
    await fixture.whenStable();
    toggle = compiled.querySelector<HTMLButtonElement>('.project-card__toggle');
    toggle?.click();
    await fixture.whenStable();

    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(compiled.querySelectorAll('[role="region"]')).toHaveLength(0);
  });
});
