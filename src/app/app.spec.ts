import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    sessionStorage.removeItem('portfolio-broadcast-seen');

    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the router outlet', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('renders and dismisses the broadcast loader', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const loader = compiled.querySelector<HTMLElement>('.broadcast-loader');

    expect(loader).not.toBeNull();
    expect(compiled.querySelectorAll('.broadcast-loader__number')).toHaveLength(3);
    expect(compiled.querySelectorAll('.broadcast-loader__status-line')).toHaveLength(3);

    loader?.dispatchEvent(new Event('animationend'));
    await fixture.whenStable();

    expect(compiled.querySelector('.broadcast-loader')).toBeNull();
    expect(sessionStorage.getItem('portfolio-broadcast-seen')).toBe('true');
  });
});
