import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [NgOptimizedImage],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly expanded = input(false);
  readonly toggleRequested = output<string>();

  protected readonly controlId = computed(() => `project-control-${this.project().slug}`);
  protected readonly panelId = computed(() => `project-panel-${this.project().slug}`);
  protected readonly titleId = computed(() => `project-title-${this.project().slug}`);
  protected readonly toggleLabel = computed(
    () => `${this.expanded() ? 'Close' : 'Open'} details for ${this.project().title}`,
  );

  protected requestToggle(): void {
    this.toggleRequested.emit(this.project().slug);
  }
}
