import { Project } from '../models/project.model';

// These records establish the content shape and must be replaced before public launch.
export const projects: readonly Project[] = [
  {
    slug: 'atlas-dashboard',
    title: 'Atlas Dashboard',
    summary: 'A responsive dashboard concept for making operational information easier to scan.',
    category: 'Dashboard concept',
    role: 'Frontend developer',
    year: 2026,
    technologies: ['Angular', 'TypeScript', 'CSS'],
    image: {
      src: '/images/projects/atlas-dashboard-placeholder.svg',
      alt: 'Placeholder preview for the Atlas Dashboard project.',
      width: 1600,
      height: 1000,
    },
    challenge: 'Present dense operational data in a way that supports quick decisions.',
    approach:
      'Define a clear visual hierarchy, reusable data views, and responsive layouts for smaller screens.',
    outcome:
      'A placeholder case-study structure for documenting dashboard design and implementation decisions.',
  },
  {
    slug: 'market-street',
    title: 'Market Street',
    summary: 'A storefront concept focused on a clear browsing experience across devices.',
    category: 'Commerce concept',
    role: 'Frontend developer',
    year: 2026,
    technologies: ['Angular', 'TypeScript', 'Responsive CSS'],
    image: {
      src: '/images/projects/market-street-placeholder.svg',
      alt: 'Placeholder preview for the Market Street project.',
      width: 1600,
      height: 1000,
    },
    challenge:
      'Keep product discovery understandable while adapting the interface for narrow screens.',
    approach:
      'Use structured content, responsive layouts, and focused interaction states to support browsing.',
    outcome:
      'A placeholder case-study structure for explaining interface decisions without unsupported metrics.',
  },
  {
    slug: 'signal-notes',
    title: 'Signal Notes',
    summary: 'A focused note-taking concept with an interface designed for calm, repeatable use.',
    category: 'Productivity concept',
    role: 'Frontend developer',
    year: 2026,
    technologies: ['Angular', 'Signals', 'Accessible HTML'],
    image: {
      src: '/images/projects/signal-notes-placeholder.svg',
      alt: 'Placeholder preview for the Signal Notes project.',
      width: 1600,
      height: 1000,
    },
    challenge: 'Make recurring note creation feel lightweight without hiding important controls.',
    approach:
      'Prioritize semantic structure, local interaction state, and an interface that scales from mobile to desktop.',
    outcome:
      'A placeholder case-study structure for recording accessibility and interaction lessons.',
  },
];
