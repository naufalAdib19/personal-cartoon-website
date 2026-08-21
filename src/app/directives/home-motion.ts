import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  PendingTasks,
} from '@angular/core';

@Directive({
  selector: '[appHomeMotion]',
})
export class HomeMotion {
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly pendingTasks = inject(PendingTasks);
  private cleanup = () => undefined;

  constructor() {
    afterNextRender(() => {
      this.pendingTasks.run(() => this.initialize());
    });

    this.destroyRef.onDestroy(() => this.cleanup());
  }

  private async initialize(): Promise<void> {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]);

    if (this.destroyRef.destroyed) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const scope = this.host.nativeElement;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          desktop: '(min-width: 56rem)',
          mobile: '(max-width: 55.99rem)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (mediaContext) => {
          const { desktop, reduceMotion } = mediaContext.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduceMotion: boolean;
          };

          if (reduceMotion) {
            return;
          }

          const hero = scope.querySelector<HTMLElement>('[data-motion-hero]');
          const heroCopy = scope.querySelector<HTMLElement>('[data-motion-hero-copy]');
          const heroBrowser = scope.querySelector<HTMLElement>('[data-motion-hero-browser]');
          const heroStamp = scope.querySelector<HTMLElement>('[data-motion-hero-stamp]');

          if (hero && heroCopy && heroBrowser && heroStamp) {
            gsap
              .timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                  trigger: hero,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: desktop ? 0.8 : 0.35,
                  invalidateOnRefresh: true,
                },
              })
              .to(heroCopy, { autoAlpha: desktop ? 0.5 : 0.72, yPercent: desktop ? -9 : -5 }, 0)
              .to(
                heroBrowser,
                {
                  rotation: desktop ? 1.25 : 0,
                  scale: desktop ? 0.95 : 0.98,
                  yPercent: desktop ? 16 : 9,
                },
                0,
              )
              .to(heroStamp, { rotation: desktop ? -8 : -3, yPercent: desktop ? -34 : -18 }, 0);
          }

          const revealTargets = gsap.utils.toArray<HTMLElement>('[data-motion-reveal]', scope);
          let projectIndex = 0;

          gsap.set(revealTargets, { transition: 'none' });

          for (const target of revealTargets) {
            const isProject = target.hasAttribute('data-motion-project');
            const rotation = isProject ? (projectIndex++ % 2 === 0 ? -1.1 : 1.1) : 0;

            gsap.from(target, {
              autoAlpha: 0,
              duration: desktop ? 0.85 : 0.65,
              ease: 'power3.out',
              rotation,
              y: isProject ? 56 : 36,
              clearProps: 'opacity,transform,transition,visibility',
              scrollTrigger: {
                trigger: target,
                start: 'top 88%',
                once: true,
              },
            });
          }

          const contactBurst = scope.querySelector<HTMLElement>('[data-motion-contact-burst]');

          if (contactBurst) {
            gsap.from(contactBurst, {
              duration: 0.9,
              ease: 'back.out(1.8)',
              rotation: -18,
              scale: 0.55,
              clearProps: 'transform',
              scrollTrigger: {
                trigger: contactBurst,
                start: 'top 86%',
                once: true,
              },
            });
          }
        },
      );
    }, scope);

    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? undefined
        : new ResizeObserver(() => {
            clearTimeout(refreshTimer);
            refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 120);
          });

    resizeObserver?.observe(scope);
    this.cleanup = () => {
      clearTimeout(refreshTimer);
      resizeObserver?.disconnect();
      media.revert();
      context.revert();
    };
  }
}
