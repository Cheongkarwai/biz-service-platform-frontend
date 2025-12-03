import {CanActivateFn, Router} from '@angular/router';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {inject} from '@angular/core/primitives/di';
import {from, map, of} from 'rxjs';

export const authenticatedGuard: CanActivateFn = (route, state) => {

  const supabase = inject(SupabaseService);
  const router = inject(Router);
  return supabase.isAuthenticated()
    .pipe(map(isAuthenticated => {
      return !isAuthenticated;
    }))
};
