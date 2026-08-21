import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { Project } from '../../models/project.model';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-selected-work',
  imports: [ProjectCard],
  templateUrl: './selected-work.html',
  styleUrl: './selected-work.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedWork {
  readonly projects = input.required<readonly Project[]>();

  protected readonly activeProjectSlug = signal<string | null>(null);

  protected toggleProject(projectSlug: string): void {
    this.activeProjectSlug.update((activeSlug) =>
      activeSlug === projectSlug ? null : projectSlug,
    );
  }
}
