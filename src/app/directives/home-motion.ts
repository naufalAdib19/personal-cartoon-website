import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  PendingTasks,
} from '@angular/core';

import { ArchitectureSceneController } from '../services/architecture-scene-controller';

@Directive({
  selector: '[appHomeMotion]',
})
export class HomeMotion {
  private readonly architectureScene = inject(ArchitectureSceneController);
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
          cinematic: '(min-width: 56rem) and (min-height: 40rem)',
          desktop: '(min-width: 56rem)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (mediaContext) => {
          const { cinematic, desktop, reduceMotion } = mediaContext.conditions as {
            cinematic: boolean;
            desktop: boolean;
            reduceMotion: boolean;
          };

          if (reduceMotion) {
            return;
          }

          const hero = scope.querySelector<HTMLElement>('[data-motion-hero]');
          const heroCopy = scope.querySelector<HTMLElement>('[data-motion-hero-copy]');
          const heroBrowser = scope.querySelector<HTMLElement>('[data-motion-hero-browser]');
          const heroScreenLabel = scope.querySelector<HTMLElement>(
            '[data-motion-hero-screen-label]',
          );
          const heroStamp = scope.querySelector<HTMLElement>('[data-motion-hero-stamp]');
          const heroStage = scope.querySelector<HTMLElement>('[data-motion-hero-stage]');
          const heroTitle = scope.querySelector<HTMLElement>('[data-motion-hero-title]');
          const signalChips = gsap.utils.toArray<HTMLElement>(
            '[data-motion-hero-signals] span',
            scope,
          );

          if (hero && heroCopy && heroBrowser && heroStamp) {
            if (cinematic && heroStage && heroTitle && heroScreenLabel) {
              const headerHeight = () =>
                document.querySelector<HTMLElement>('app-site-header')?.getBoundingClientRect()
                  .height ?? 0;

              const heroTimeline = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                  trigger: hero,
                  start: () => `top top+=${headerHeight()}`,
                  end: () => `+=${Math.max(window.innerHeight * 1.8, 1200)}`,
                  scrub: 0.8,
                  pin: true,
                  pinSpacing: true,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                },
              });

              heroTimeline.eventCallback('onUpdate', () => {
                this.architectureScene.setProgress(heroTimeline.progress());
              });

              heroTimeline
                .to(heroCopy, { autoAlpha: 0.38, xPercent: -6, yPercent: -10, duration: 1.1 }, 0)
                .to(heroStage, { scale: 1.06, xPercent: 3, duration: 1.1 }, 0)
                .to(heroBrowser, { rotation: 0.5, scale: 1.1, yPercent: -5, duration: 1.1 }, 0)
                .to(heroTitle, { yPercent: -16, duration: 0.9 }, 0.15)
                .to(
                  signalChips,
                  {
                    x: (index) => (index - 1) * 14,
                    y: (index) => (index % 2 === 0 ? -16 : 14),
                    rotation: (index) => (index - 1) * 3,
                    stagger: 0.06,
                    duration: 0.8,
                  },
                  0.18,
                )
                .to(
                  heroStamp,
                  {
                    rotation: -18,
                    scale: 1.18,
                    xPercent: -115,
                    yPercent: -135,
                    duration: 1.2,
                  },
                  0.1,
                )
                .to(heroCopy, { autoAlpha: 0, xPercent: -14, yPercent: -18, duration: 0.85 }, 1.05)
                .to(heroStage, { scale: 1.12, xPercent: 8, yPercent: -6, duration: 0.85 }, 1.05)
                .to(
                  heroBrowser,
                  { rotation: 1.5, scale: 1.04, yPercent: -12, duration: 0.85 },
                  1.05,
                )
                .to(
                  heroStamp,
                  {
                    rotation: -35,
                    scale: 0.9,
                    xPercent: -190,
                    yPercent: -235,
                    duration: 0.85,
                  },
                  1.05,
                )
                .to(heroScreenLabel, { autoAlpha: 0.45, xPercent: 35, duration: 0.85 }, 1.05);
            } else {
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
          }

          const experienceTargets = gsap.utils.toArray<HTMLElement>(
            '[data-motion-experience]',
            scope,
          );
          const revealTargets = gsap.utils
            .toArray<HTMLElement>('[data-motion-reveal]', scope)
            .filter((target) => !cinematic || !target.hasAttribute('data-motion-experience'));
          let experienceIndex = 0;

          gsap.set(revealTargets, { transition: 'none' });

          for (const target of revealTargets) {
            const isExperience = target.hasAttribute('data-motion-experience');
            const rotation = isExperience ? (experienceIndex++ % 2 === 0 ? -1.1 : 1.1) : 0;

            gsap.from(target, {
              autoAlpha: 0,
              duration: desktop ? 0.85 : 0.65,
              ease: 'power3.out',
              rotation,
              y: isExperience ? 56 : 36,
              clearProps: 'opacity,transform,transition,visibility',
              scrollTrigger: {
                trigger: target,
                start: 'top 88%',
                once: true,
              },
            });
          }

          if (cinematic) {
            experienceTargets.forEach((experience, index) => {
              const mark = experience.querySelector<HTMLElement>('[data-motion-experience-mark]');
              const content = experience.querySelector<HTMLElement>(
                '[data-motion-experience-content]',
              );
              const entryRotation = index % 2 === 0 ? -2.2 : 2.2;

              gsap
                .timeline({
                  defaults: { ease: 'none' },
                  scrollTrigger: {
                    trigger: experience,
                    start: 'top 94%',
                    end: 'bottom 8%',
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                  },
                })
                .fromTo(
                  experience,
                  { autoAlpha: 0.28, rotation: entryRotation, scale: 0.9, y: 110 },
                  { autoAlpha: 1, rotation: 0, scale: 1, y: 0, duration: 0.45 },
                )
                .to(
                  experience,
                  { autoAlpha: 0.58, rotation: -entryRotation * 0.35, scale: 0.965, y: -52 },
                  0.7,
                );

              if (mark) {
                gsap.fromTo(
                  mark,
                  { rotation: -4, scale: 0.94, yPercent: -5 },
                  {
                    rotation: 4,
                    scale: 1.04,
                    yPercent: 5,
                    ease: 'none',
                    scrollTrigger: {
                      trigger: experience,
                      start: 'top bottom',
                      end: 'bottom top',
                      scrub: 0.5,
                    },
                  },
                );
              }

              if (content) {
                gsap.fromTo(
                  content,
                  { y: 24 },
                  {
                    y: -12,
                    ease: 'none',
                    scrollTrigger: {
                      trigger: experience,
                      start: 'top 90%',
                      end: 'bottom 20%',
                      scrub: 0.55,
                    },
                  },
                );
              }
            });

            const experienceSection = scope.querySelector<HTMLElement>(
              '[data-motion-experience-section]',
            );
            const experienceProgress = scope.querySelector<HTMLElement>(
              '[data-motion-experience-progress]',
            );

            if (experienceSection && experienceProgress) {
              gsap.fromTo(
                experienceProgress,
                { scaleX: 0 },
                {
                  scaleX: 1,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: experienceSection,
                    start: 'top 70%',
                    end: 'bottom 80%',
                    scrub: 0.25,
                  },
                },
              );
            }
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
