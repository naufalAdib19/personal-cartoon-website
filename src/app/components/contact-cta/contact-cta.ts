import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { ProfileSocialLink } from '../../models/profile.model';

@Component({
  selector: 'app-contact-cta',
  imports: [],
  templateUrl: './contact-cta.html',
  styleUrl: './contact-cta.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCta {
  readonly email = input.required<string>();
  readonly socialLinks = input<readonly ProfileSocialLink[]>([]);

  protected readonly emailHref = computed(
    () => `mailto:${this.email()}?subject=Frontend%20opportunity`,
  );
}
