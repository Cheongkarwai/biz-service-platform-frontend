import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core/primitives/di';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {map} from 'rxjs';

export const unauthenticatedGuard: CanActivateFn = (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  return supabase.isAuthenticated()
    .pipe(map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      }
      return router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      });
    }))
};
