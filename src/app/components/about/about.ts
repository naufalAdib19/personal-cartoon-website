import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ProfileFocusArea } from '../../models/profile.model';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  readonly paragraphs = input.required<readonly string[]>();
  readonly focusAreas = input.required<readonly ProfileFocusArea[]>();
  readonly availability = input.required<string>();
}
