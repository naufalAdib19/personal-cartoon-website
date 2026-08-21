import { afterNextRender, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const LOADER_SESSION_KEY = 'portfolio-broadcast-seen';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly loaderVisible = signal(true);

  constructor() {
    afterNextRender(() => {
      if (
        sessionStorage.getItem(LOADER_SESSION_KEY) ||
        (typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      ) {
        this.loaderVisible.set(false);
      }
    });
  }

  protected finishLoader(event: AnimationEvent): void {
    if (event.target !== event.currentTarget) {
      return;
    }

    sessionStorage.setItem(LOADER_SESSION_KEY, 'true');
    this.loaderVisible.set(false);
  }
}
