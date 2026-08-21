export interface ProfileSocialLink {
  readonly label: string;
  readonly url: string;
}

export interface Profile {
  readonly displayName: string;
  readonly professionalTitle: string;
  readonly heroStatement: string;
  readonly about: readonly string[];
  readonly availability: string;
  readonly email: string;
  readonly socialLinks?: readonly ProfileSocialLink[];
}
