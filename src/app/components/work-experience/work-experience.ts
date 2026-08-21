import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { WorkExperience as WorkExperienceRecord } from '../../models/work-experience.model';
import { ExperienceCard } from '../experience-card/experience-card';

@Component({
  selector: 'app-work-experience',
  imports: [ExperienceCard],
  templateUrl: './work-experience.html',
  styleUrl: './work-experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkExperience {
  readonly experiences = input.required<readonly WorkExperienceRecord[]>();

  protected readonly activeExperienceSlug = signal<string | null>(null);

  protected toggleExperience(experienceSlug: string): void {
    this.activeExperienceSlug.update((activeSlug) =>
      activeSlug === experienceSlug ? null : experienceSlug,
    );
  }
}
