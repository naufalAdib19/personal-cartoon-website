import { ComponentFixture, TestBed } from '@angular/core/testing';

import { projects } from '../../content/projects.content';
import { Project } from '../../models/project.model';
import { ProjectCard } from './project-card';

describe('ProjectCard', () => {
  let fixture: ComponentFixture<ProjectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', projects[0]);
    await fixture.whenStable();
  });

  it('renders optimized image metadata and collapsed semantics', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const image = compiled.querySelector<HTMLImageElement>('img');
    const toggle = compiled.querySelector<HTMLButtonElement>('.project-card__toggle');

    expect(image?.getAttribute('src')).toContain(projects[0].image.src);
    expect(image?.getAttribute('width')).toBe(String(projects[0].image.width));
    expect(image?.getAttribute('height')).toBe(String(projects[0].image.height));
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(toggle?.getAttribute('aria-controls')).toBe(`project-panel-${projects[0].slug}`);
  });

  it('emits its project slug when toggled', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let emittedSlug: string | undefined;
    fixture.componentInstance.toggleRequested.subscribe((slug) => (emittedSlug = slug));

    compiled.querySelector<HTMLButtonElement>('.project-card__toggle')?.click();

    expect(emittedSlug).toBe(projects[0].slug);
  });

  it('renders an associated detail region when expanded', async () => {
    fixture.componentRef.setInput('expanded', true);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const region = compiled.querySelector<HTMLElement>('[role="region"]');

    expect(region?.id).toBe(`project-panel-${projects[0].slug}`);
    expect(region?.getAttribute('aria-labelledby')).toBe(`project-control-${projects[0].slug}`);
    expect(region?.textContent).toContain(projects[0].challenge);
  });

  it('safely renders configured external links', async () => {
    const linkedProject: Project = {
      ...projects[0],
      links: {
        live: 'https://example.com/project',
        repository: 'https://github.com/example/project',
      },
    };

    fixture.componentRef.setInput('project', linkedProject);
    fixture.componentRef.setInput('expanded', true);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll<HTMLAnchorElement>('.project-card__links a');

    expect(links).toHaveLength(2);
    expect([...links].every((link) => link.rel === 'noopener noreferrer')).toBe(true);
  });
});
