import { Profile } from '../models/profile.model';

export const profile: Profile = {
  displayName: 'Naufal Adib',
  professionalTitle: 'Frontend Engineer',
  heroStatement:
    'Fresh graduate with nearly 2 years of experience building scalable, maintainable, and user-focused web applications.',

  about: [
    'I’m a Frontend Engineer and fresh Information Systems graduate with nearly 2 years of hands-on software engineering experience across internships, professional projects, and enterprise environments.',
    'I specialize in Angular and TypeScript, with experience building applications used by thousands of users, designing complex frontend workflows, optimizing performance, and turning business requirements into reliable and intuitive interfaces.',
    'Beyond shipping features, I care about how software is built, the clean architecture, predictable state management, thoughtful abstractions, testing, and engineering decisions that keep a codebase maintainable as the product grows.',
  ],

  focusAreas: [
    {
      title: 'Frontend Architecture',
      description:
        'Designing maintainable application structures that can evolve with growing product and business requirements.',
    },
    {
      title: 'Complex UI & Workflows',
      description:
        'Turning complex requirements, forms, states, and user flows into clear and reliable interfaces.',
    },
    {
      title: 'Engineering Quality',
      description:
        'Building with strong types, predictable state, focused testing, and performance in mind.',
    },
  ],

  availability: 'Open to Frontend Engineer and Software Engineer opportunities.',

  email: 'naufal.adib.190403@gmail.com',
};
