import { ComponentFixture, TestBed } from '@angular/core/testing';

import { profile } from '../../content/profile.content';
import { ProfileSocialLink } from '../../models/profile.model';
import { ContactCta } from './contact-cta';

describe('ContactCta', () => {
  let fixture: ComponentFixture<ContactCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactCta],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactCta);
    fixture.componentRef.setInput('email', profile.email);
    await fixture.whenStable();
  });

  it('uses the configured email as the primary contact action', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailLink = compiled.querySelector<HTMLAnchorElement>('.contact__email');

    expect(emailLink?.getAttribute('href')).toBe(
      `mailto:${profile.email}?subject=Frontend%20opportunity`,
    );
    expect(emailLink?.textContent).toContain(profile.email);
    expect(emailLink?.classList.contains('comic-press')).toBe(true);
    expect(compiled.querySelector('.contact')?.hasAttribute('data-motion-reveal')).toBe(true);
    expect(compiled.querySelector('[data-motion-contact-burst]')).not.toBeNull();
    expect(compiled.querySelector('.contact__socials')).toBeNull();
  });

  it('safely renders social links only when configured', async () => {
    const socialLinks: readonly ProfileSocialLink[] = [
      { label: 'GitHub', url: 'https://github.com/example' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/example' },
    ];

    fixture.componentRef.setInput('socialLinks', socialLinks);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll<HTMLAnchorElement>('.contact__socials a');

    expect(links).toHaveLength(2);
    expect([...links].every((link) => link.target === '_blank')).toBe(true);
    expect([...links].every((link) => link.rel === 'noopener noreferrer')).toBe(true);
  });
});
