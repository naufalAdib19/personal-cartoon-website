import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-contact-cta',
  imports: [],
  templateUrl: './contact-cta.html',
  styleUrl: './contact-cta.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCta {
  readonly email = input.required<string>();
}
