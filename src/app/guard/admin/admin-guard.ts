import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core/primitives/di';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {from, map} from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  return from(supabase.getSession())
    .pipe(map(session => {
      if(session === null) return false;

      const roles = session.user.user_metadata['roles'] || [];

      if(roles.includes('ADMIN')) return true;

      return router.createUrlTree([''])
    }))
};
