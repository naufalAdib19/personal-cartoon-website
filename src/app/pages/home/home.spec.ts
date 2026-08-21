import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the page landmarks in reading order', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const structure = [...compiled.children].map((element) => element.tagName.toLowerCase());

    expect(structure).toEqual(['a', 'app-site-header', 'main', 'app-site-footer']);
    expect(compiled.querySelector('app-site-header header')).not.toBeNull();
    expect(compiled.querySelector('app-site-footer footer')).not.toBeNull();
    expect(compiled.querySelector('.skip-link')?.getAttribute('href')).toBe('#main-content');
  });

  it('renders the required sections with a valid heading hierarchy', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelectorAll('h2')).toHaveLength(3);
    expect(compiled.querySelectorAll('app-project-card h3')).toHaveLength(3);
    expect(compiled.querySelector('#work')).not.toBeNull();
    expect(compiled.querySelector('#about')).not.toBeNull();
    expect(compiled.querySelector('#contact')).not.toBeNull();
  });

  it('renders all three typed projects', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('app-project-card')).toHaveLength(3);
  });
});
