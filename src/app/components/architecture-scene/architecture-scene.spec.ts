import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureScene } from './architecture-scene';

describe('ArchitectureScene', () => {
  let fixture: ComponentFixture<ArchitectureScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureScene],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchitectureScene);
    await fixture.whenStable();
  });

  it('renders a canvas with a static architecture fallback', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('canvas')?.getAttribute('aria-hidden')).toBe('true');
    expect(compiled.querySelectorAll('.architecture-scene__fallback span')).toHaveLength(5);
    expect(compiled.querySelectorAll('.architecture-scene__legend li')).toHaveLength(5);
    expect(compiled.textContent).toContain('Interface');
    expect(compiled.textContent).toContain('Tests');
  });
});
