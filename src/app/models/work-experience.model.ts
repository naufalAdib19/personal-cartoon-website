export interface WorkExperience {
  readonly slug: string;
  readonly company: string;
  readonly position: string;
  readonly employmentType: string;
  readonly period: string;
  readonly location: string;
  readonly summary: string;
  readonly technologies: readonly string[];
  readonly responsibilities: readonly string[];
  readonly achievements: readonly string[];
}
