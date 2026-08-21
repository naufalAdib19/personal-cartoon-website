import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from './app.routes';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';

describe('application routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
  });

  it('loads the home page for the root route', async () => {
    const harness = await RouterTestingHarness.create();

    const component = await harness.navigateByUrl('/', Home);

    expect(component).toBeInstanceOf(Home);
  });

  it('loads the not-found page for an unknown route', async () => {
    const harness = await RouterTestingHarness.create();

    const component = await harness.navigateByUrl('/missing-panel', NotFound);

    expect(component).toBeInstanceOf(NotFound);
  });
});
