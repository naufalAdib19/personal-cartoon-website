import { Profile } from '../models/profile.model';

// Replace every placeholder value before the public launch.
export const profile: Profile = {
  displayName: 'Mohammad Naufal Adib Hamdany',
  professionalTitle: 'Frontend Engineer',
  heroStatement:
    'I build scalable, maintainable, and user-focused web applications with a strong focus on frontend engineering.',

  about: [
    'I’m a Frontend Engineer specializing in Angular and TypeScript, with experience building complex enterprise applications and translating business requirements into reliable, intuitive interfaces.',
    'I care about clean architecture, maintainable code, thoughtful state management, and the small engineering decisions that make applications easier to scale and evolve.',
  ],

  focusAreas: [
    {
      title: 'Frontend architecture',
      description: 'Structure that stays understandable as product requirements grow.',
    },
    {
      title: 'Interface clarity',
      description: 'Responsive, accessible interactions that make the next action obvious.',
    },
    {
      title: 'Engineering care',
      description: 'Strict types, focused tests, and state that remains predictable.',
    },
  ],

  availability: 'Open to Frontend Engineer and Software Engineer opportunities.',
  email: 'naufal.adib.190403@gmail.com',
};
