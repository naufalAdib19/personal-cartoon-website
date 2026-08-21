export interface ProfileSocialLink {
  readonly label: string;
  readonly url: string;
}

export interface ProfileFocusArea {
  readonly title: string;
  readonly description: string;
}

export interface Profile {
  readonly displayName: string;
  readonly professionalTitle: string;
  readonly heroStatement: string;
  readonly about: readonly string[];
  readonly focusAreas: readonly ProfileFocusArea[];
  readonly availability: string;
  readonly email: string;
  readonly socialLinks?: readonly ProfileSocialLink[];
}
