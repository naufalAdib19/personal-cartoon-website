export type TProject = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: number;
  technologies: string[];
  coverImage: string;
  caseStudy: {
    challenge: string;
    approach: string;
    outcome: string;
    images: string[];
  };
  links?: {
    live?: string;
    repository?: string;
  };
};
