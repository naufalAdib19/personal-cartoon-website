import { ComponentFixture, TestBed } from '@angular/core/testing';

import { profile } from '../../content/profile.content';
import { Hero } from './hero';

describe('Hero', () => {
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    fixture.componentRef.setInput('profile', profile);
    await fixture.whenStable();
  });

  it('renders the profile identity and availability', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent).toContain(profile.displayName);
    expect(compiled.querySelector('.hero__role')?.textContent).toContain(profile.professionalTitle);
    expect(compiled.querySelector('.hero__availability')?.textContent).toContain(
      profile.availability,
    );
  });

  it('links to work and contact sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = [...compiled.querySelectorAll<HTMLAnchorElement>('.hero__actions a')].map(
      (link) => link.getAttribute('href'),
    );

    expect(links).toEqual(['#work', '#contact']);
  });

  it('keeps the browser composition decorative', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const stage = compiled.querySelector('.hero__stage');

    expect(stage?.getAttribute('aria-hidden')).toBe('true');
    expect(stage?.querySelectorAll('a, button, [tabindex]')).toHaveLength(0);
  });

  it('applies the orchestrated motion primitives without hiding content', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('.motion-reveal')).toHaveLength(5);
    expect(compiled.querySelector('.hero__stage')?.classList.contains('motion-pop')).toBe(true);
    expect(compiled.querySelectorAll('.hero__actions .comic-press')).toHaveLength(2);
    expect(compiled.querySelector('[data-motion-hero]')).not.toBeNull();
    expect(compiled.querySelector('[data-motion-hero-stage]')).not.toBeNull();
    expect(compiled.querySelector('[data-motion-hero-browser]')).not.toBeNull();
    expect(compiled.querySelector('[data-motion-hero-stamp]')).not.toBeNull();
    expect(compiled.querySelector('[data-motion-hero-title]')).not.toBeNull();
    expect(compiled.querySelectorAll('[data-motion-hero-signals] span')).toHaveLength(3);
    expect(compiled.querySelector('app-architecture-scene canvas')).not.toBeNull();
  });
});
