import { WorkExperience } from '../models/work-experience.model';

// Placeholder roles establish the content shape and must be replaced before public launch.
export const workExperiences: readonly WorkExperience[] = [
  {
    slug: 'northstar-systems',
    company: 'Northstar Systems',
    position: 'Frontend Engineer',
    employmentType: 'Full-time',
    period: '2024 - Present',
    location: 'Remote',
    summary:
      'Building and maintaining enterprise interfaces for teams working with complex operational workflows.',
    technologies: ['Angular', 'TypeScript', 'RxJS', 'Design systems'],
    responsibilities: [
      'Translate product requirements into maintainable frontend features and reusable components.',
      'Collaborate with design and backend teams to define clear interface contracts.',
      'Review frontend changes and improve shared engineering conventions.',
    ],
    achievements: [
      'Improved consistency across product surfaces through shared component patterns.',
      'Strengthened test coverage around critical user workflows.',
    ],
  },
  {
    slug: 'beacon-commerce',
    company: 'Beacon Commerce',
    position: 'Software Engineer',
    employmentType: 'Full-time',
    period: '2022 - 2024',
    location: 'Hybrid',
    summary:
      'Developed responsive commerce tooling focused on reliable state, accessible interactions, and clear data presentation.',
    technologies: ['Angular', 'JavaScript', 'REST APIs', 'SCSS'],
    responsibilities: [
      'Delivered responsive product features from technical planning through release.',
      'Integrated frontend workflows with REST services and documented edge cases.',
      'Partnered with quality engineers to resolve regressions before production releases.',
    ],
    achievements: [
      'Reduced duplicated interface code by consolidating recurring patterns.',
      'Improved keyboard behavior and semantic structure across core screens.',
    ],
  },
  {
    slug: 'relay-studio',
    company: 'Relay Studio',
    position: 'Frontend Developer Intern',
    employmentType: 'Internship',
    period: '2021 - 2022',
    location: 'On-site',
    summary:
      'Supported the delivery of marketing and product interfaces while developing practical frontend engineering habits.',
    technologies: ['TypeScript', 'HTML', 'CSS', 'Git'],
    responsibilities: [
      'Implemented interface sections from design specifications under senior guidance.',
      'Fixed responsive layout and browser compatibility issues.',
      'Participated in code reviews and documented implementation decisions.',
    ],
    achievements: [
      'Contributed reusable layout utilities to the team codebase.',
      'Progressed from scoped fixes to independently delivering complete interface sections.',
    ],
  },
];
