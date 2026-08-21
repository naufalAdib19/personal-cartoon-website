import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  readonly profile = input.required<Profile>();
}
