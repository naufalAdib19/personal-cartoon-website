import { ComponentFixture, TestBed } from '@angular/core/testing';

import { profile } from '../../content/profile.content';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  let fixture: ComponentFixture<SiteFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteFooter);
    fixture.componentRef.setInput('displayName', profile.displayName);
    fixture.componentRef.setInput('professionalTitle', profile.professionalTitle);
    await fixture.whenStable();
  });

  it('renders the profile identity and current year', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain(profile.displayName);
    expect(compiled.textContent).toContain(profile.professionalTitle);
    expect(compiled.textContent).toContain(String(new Date().getFullYear()));
  });

  it('links back to the top anchor', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('a')?.getAttribute('href')).toBe('#top');
  });
});
