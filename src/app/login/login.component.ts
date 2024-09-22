import { Component }              from '@angular/core';
import { DNDService }             from '../dnd.service';
import { User }                   from '../../interfaces/user';
import { FormsModule }            from '@angular/forms';
import { Router }                 from '@angular/router';
import { UserLoginComponent }     from './user-login.component';
import { CreateAccountComponent } from './create-account.component';


@Component({
  selector:    'app-login',
  standalone:  true,
  imports:     [ FormsModule, UserLoginComponent, CreateAccountComponent ],
  providers:   [ DNDService, Router ],
  templateUrl: './login.component.html',
  styleUrl:    './login.component.scss'
})
export class LoginComponent
{
  boolShowCreateAccount = false;
  boolShowLogin = true;
  myUsername: string;
  myPassword: string;
  myUser: User;
  constructor(
    private dndService: DNDService,
    private router: Router
  )
  {}

  CreateAccount(event: MouseEvent): void
  {
    event.preventDefault();
    this.boolShowCreateAccount = true;
  }
  Authorize():void
  {
    const myAuthorizeSubscription =
    {
      next: (token: { accessToken: string }) =>
      {
        localStorage.setItem('user-token', JSON.stringify(token))
        console.log(localStorage.getItem('user-token'))
      },
      error: (error: unknown) => console.log(error)
    }
    this.dndService.Authorize(this.myUsername, this.myPassword).subscribe(myAuthorizeSubscription)
  }

  ShowCreateAccount(): void
  {
    this.boolShowCreateAccount = !this.boolShowCreateAccount;
    this.boolShowLogin = !this.boolShowLogin
  }

  ShowLogin(): void
  {
    this.boolShowLogin = !this.boolShowLogin;
  }

}
