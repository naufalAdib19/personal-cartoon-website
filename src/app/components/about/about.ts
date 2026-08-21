import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  readonly paragraphs = input.required<readonly string[]>();
  readonly availability = input.required<string>();
}
