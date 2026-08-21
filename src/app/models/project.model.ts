export interface ProjectImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface ProjectLinks {
  readonly live?: string;
  readonly repository?: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly category: string;
  readonly role: string;
  readonly year: number;
  readonly technologies: readonly string[];
  readonly image: ProjectImage;
  readonly challenge: string;
  readonly approach: string;
  readonly outcome: string;
  readonly links?: ProjectLinks;
}
