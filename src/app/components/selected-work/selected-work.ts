import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
}
