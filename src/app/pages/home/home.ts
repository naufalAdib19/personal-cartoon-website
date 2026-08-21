import { ChangeDetectionStrategy, Component } from '@angular/core';

import { About } from '../../components/about/about';
import { ContactCta } from '../../components/contact-cta/contact-cta';
import { Hero } from '../../components/hero/hero';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { SiteHeader } from '../../components/site-header/site-header';
import { WorkExperience } from '../../components/work-experience/work-experience';
import { profile } from '../../content/profile.content';
import { workExperiences } from '../../content/work-experiences.content';
import { HomeMotion } from '../../directives/home-motion';

@Component({
  selector: 'app-home',
  imports: [About, ContactCta, Hero, HomeMotion, SiteFooter, SiteHeader, WorkExperience],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly profile = profile;
  protected readonly workExperiences = workExperiences;
}
