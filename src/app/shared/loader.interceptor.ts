import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SharedService } from './shared.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const sharedService = inject(SharedService);
  sharedService.isLoading.set(true);

  return next(req).pipe(
    finalize(() => {
      sharedService.isLoading.set(false);
    })
  );
};
