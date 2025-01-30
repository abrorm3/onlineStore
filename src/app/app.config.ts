import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './login/auth/auth.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {loaderInterceptor} from './shared/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(BrowserAnimationsModule), provideHttpClient(
    withInterceptors([authInterceptor, loaderInterceptor])
  )]
};
