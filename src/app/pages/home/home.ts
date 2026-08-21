import { ChangeDetectionStrategy, Component } from '@angular/core';

import { About } from '../../components/about/about';
import { ContactCta } from '../../components/contact-cta/contact-cta';
import { Hero } from '../../components/hero/hero';
import { SelectedWork } from '../../components/selected-work/selected-work';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { SiteHeader } from '../../components/site-header/site-header';
import { profile } from '../../content/profile.content';
import { projects } from '../../content/projects.content';

@Component({
  selector: 'app-home',
  imports: [About, ContactCta, Hero, SelectedWork, SiteFooter, SiteHeader],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly profile = profile;
  protected readonly projects = projects;
}
