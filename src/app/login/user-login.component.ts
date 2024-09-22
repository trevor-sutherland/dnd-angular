import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule }                     from '@angular/forms';
import { User }                            from '../../interfaces/user';
import { DNDService }                      from '../dnd.service';
import { Router }                          from '@angular/router';
@Component({
  selector:    'app-user-login',
  standalone:  true,
  imports:     [ FormsModule ],
  providers:   [ DNDService, Router ],
  templateUrl: './user-login.component.html',
  styleUrl:    './user-login.component.scss'
})
export class UserLoginComponent
{
  @Output() boolCreateAccount = new EventEmitter();
  @Output() boolShowLogin = new EventEmitter();
  myUsername: string;
  myPassword: string;
  myUser: User;

  constructor(
    private dndService: DNDService,
    private router: Router
  )
  {}

  UserLogin(event: MouseEvent): void
  {
    event.preventDefault();
    const EmailInput =  (<HTMLInputElement>document.querySelector("#input-username"))
    const PasswordInput = (<HTMLInputElement>document.querySelector("#input-password"))
    const myLoginSubscription =
    {
      next: (user: User[]) =>
      {
        this.myUser = user[0];
        if (this.myUser === undefined)
        {
          PasswordInput.classList.add("redBorder");
          EmailInput.classList.add("redBorder");
        }
        else
        {
          this.boolShowLogin.emit();
          this.router.navigate([ 'dashboard' ])
        }
      },
      error: (error: unknown) => console.log(error)
    }
    this.dndService.UserLogin(this.myUsername, this.myPassword).subscribe(myLoginSubscription);
  }

  CreateAccount(event: MouseEvent): void
  {
    event.preventDefault();

    this.boolCreateAccount.emit();
  }
}
