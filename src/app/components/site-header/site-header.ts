import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-site-header',
  imports: [],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  readonly displayName = input.required<string>();

  protected readonly homeLabel = computed(() => `${this.displayName()} home`);
  protected readonly initials = computed(() => {
    const names = this.displayName().trim().split(/\s+/);
    const firstInitial = names[0]?.charAt(0) ?? '';
    const lastInitial = names.length > 1 ? (names.at(-1)?.charAt(0) ?? '') : '';

    return `${firstInitial}${lastInitial}`.toUpperCase();
  });
}
