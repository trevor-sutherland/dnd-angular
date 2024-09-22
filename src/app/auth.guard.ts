import { DNDService }                     from './dnd.service';
import { Router } from '@angular/router';
import { AuthService }                    from './auth.service';
import { inject }                         from '@angular/core';



export const authGuard = (): boolean =>
{
  const authService = inject(AuthService);
  const router = inject(Router);
  const myAuthorizeSubscription =
  {
    next: (response: unknown) =>
    {
      console.log('in auth next');
      console.log(response);
    },
    error: (error: unknown) => console.log(error)
  }
  authService.NODE_AUTHORIZE().subscribe(myAuthorizeSubscription)
  const loggedIn = !Number.isNaN(staffID) || !Number.isNaN(companyID);
  return loggedIn
}
