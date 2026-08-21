import { ComponentFixture, TestBed } from '@angular/core/testing';

import { profile } from '../../content/profile.content';
import { About } from './about';

describe('About', () => {
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    fixture.componentRef.setInput('paragraphs', profile.about);
    fixture.componentRef.setInput('focusAreas', profile.focusAreas);
    fixture.componentRef.setInput('availability', profile.availability);
    await fixture.whenStable();
  });

  it('renders profile copy and availability', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const paragraphs = compiled.querySelectorAll('.about__copy p');

    expect(paragraphs).toHaveLength(profile.about.length);
    expect(compiled.querySelector('.about__availability')?.textContent).toContain(
      profile.availability,
    );
  });

  it('renders three engineering focus areas', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const focusAreas = compiled.querySelectorAll('.about__focus li');

    expect(focusAreas).toHaveLength(3);
    expect(focusAreas[0].textContent).toContain(profile.focusAreas[0].title);
    expect(focusAreas[0].textContent).toContain(profile.focusAreas[0].description);
    expect(compiled.querySelectorAll('[data-motion-reveal]')).toHaveLength(5);
  });
});
