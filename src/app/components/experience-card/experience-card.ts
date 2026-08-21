import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { WorkExperience } from '../../models/work-experience.model';

@Component({
  selector: 'app-experience-card',
  imports: [],
  templateUrl: './experience-card.html',
  styleUrl: './experience-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceCard {
  readonly experience = input.required<WorkExperience>();
  readonly order = input.required<number>();
  readonly expanded = input(false);
  readonly toggleRequested = output<string>();

  protected readonly companyMark = computed(() =>
    this.experience()
      .company.split(/\s+/)
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
  );
  protected readonly controlId = computed(() => `experience-control-${this.experience().slug}`);
  protected readonly ordinal = computed(() => String(this.order() + 1).padStart(2, '0'));
  protected readonly panelId = computed(() => `experience-panel-${this.experience().slug}`);
  protected readonly titleId = computed(() => `experience-title-${this.experience().slug}`);
  protected readonly toggleLabel = computed(
    () =>
      `${this.expanded() ? 'Close' : 'Open'} role details for ${this.experience().position} at ${this.experience().company}`,
  );

  protected requestToggle(): void {
    this.toggleRequested.emit(this.experience().slug);
  }
}
