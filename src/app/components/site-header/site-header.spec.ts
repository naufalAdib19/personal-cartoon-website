import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  let fixture: ComponentFixture<SiteHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteHeader);
    fixture.componentRef.setInput('displayName', 'Mohammad Naufal Adib Hamdany');
    await fixture.whenStable();
  });

  it('renders a compact personal mark with the full accessible name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brand = compiled.querySelector<HTMLAnchorElement>('.site-header__brand');

    expect(compiled.querySelector('.site-header__mark')?.textContent?.trim()).toBe('MH');
    expect(brand?.getAttribute('aria-label')).toBe('Mohammad Naufal Adib Hamdany home');
    expect(brand?.getAttribute('href')).toBe('/');
  });

  it('links directly to every homepage section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = [...compiled.querySelectorAll<HTMLAnchorElement>('nav a')].map((link) =>
      link.getAttribute('href'),
    );

    expect(links).toEqual(['#work', '#about', '#contact']);
  });
});
