import { WorkExperience } from '../models/work-experience.model';

// Placeholder roles establish the content shape and must be replaced before public launch.
export const workExperiences: readonly WorkExperience[] = [
  {
    slug: 'kementerian-keuangan',
    company: 'Kementerian Keuangan',
    position: 'Frontend Engineer',
    employmentType: 'Independent Contractor',
    period: 'Oct 2025 - Present',
    location: 'Hybrid',
    summary:
      'Building and maintaining enterprise Angular applications that support complex operational workflows and serve more than 70,000 active users.',
    technologies: ['Angular', 'TypeScript', 'NgRx', 'RxJS', 'Angular Material', 'Tailwind CSS'],
    responsibilities: [
      'Maintained and enhanced enterprise Angular applications, focusing on reliability, performance, and maintainability.',
      'Engineered complex form workflows with dynamic validation, conditional rendering, and state synchronization across multiple user scenarios.',
      'Collaborated with backend developers and testers to diagnose issues, identify root causes, and validate fixes.',
      'Designed and implemented the Strategy Pattern with Angular Injection Tokens to decouple business logic and improve scalability.',
    ],
    achievements: [
      'Reduced API calls by 60%+ through a caching strategy.',
      'Wrote unit tests with 80–100% coverage on a core application module.',
      'Developed and maintained applications serving 70,000+ active users.',
    ],
  },

  {
    slug: 'sea-labs',
    company: 'Sea Labs',
    position: 'Software Engineer Trainee',
    employmentType: 'Bootcamp',
    period: 'Jul 2025 - Oct 2025',
    location: 'Indonesia',
    summary:
      'Expanded my software engineering foundation through hands-on backend development and scalable application architecture.',
    technologies: ['Golang', 'Gin', 'PostgreSQL', 'REST API', 'Git'],
    responsibilities: [
      'Developed backend applications using Golang, Gin, and PostgreSQL.',
      'Designed and implemented RESTful APIs for application features.',
      'Applied Clean Architecture and software design patterns to build maintainable applications.',
      'Practiced collaborative development workflows using Git and CLI tooling.',
    ],
    achievements: [
      'Expanded from frontend-focused development into backend engineering with Golang.',
      'Strengthened understanding of application architecture, API design, and maintainable software design.',
    ],
  },

  {
    slug: 'dot-indonesia',
    company: 'DOT Indonesia',
    position: 'Frontend Engineer Intern',
    employmentType: 'Internship',
    period: 'Nov 2024 - Feb 2025',
    location: 'Indonesia',
    summary:
      'Contributed to a web-based Management Information System using Next.js in a fast-paced Agile development team.',
    technologies: ['Next.js', 'React', 'JavaScript', 'Git'],
    responsibilities: [
      'Developed 10+ features for a web-based Management Information System using Next.js.',
      'Collaborated in daily syncs and sprint planning as part of an Agile development team.',
      'Implemented memoization using React.memo, useMemo, and useCallback to optimize frontend performance.',
      'Participated in code review sessions to improve code quality and maintainability.',
    ],
    achievements: [
      'Contributed to 95%+ sprint goal completion throughout the internship.',
      'Helped reduce post-merge bugs by 20% through collaborative code reviews.',
      'Successfully delivered 10+ production features.',
    ],
  },
];
