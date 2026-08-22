import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Profile } from '../../models/profile.model';
import { ArchitectureScene } from '../architecture-scene/architecture-scene';

@Component({
  selector: 'app-hero',
  imports: [ArchitectureScene],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  readonly profile = input.required<Profile>();
}
