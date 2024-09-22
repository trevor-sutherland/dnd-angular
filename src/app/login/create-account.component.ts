import { CheckIfValid }                                            from '../helpers/form-validators';
import { Component, EventEmitter, Output }                         from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DNDService }                                              from '../dnd.service';
import { MysqlError }                                              from 'mysql';
import { User }                                                    from '../../interfaces/user';

@Component({
  selector:    'app-create-account',
  standalone:  true,
  imports:     [ ReactiveFormsModule ],
  providers:   [ DNDService ],
  templateUrl: './create-account.component.html',
  styleUrl:    './create-account.component.scss'
})
export class CreateAccountComponent
{

  @Output() boolShowCreateAccount = new EventEmitter()
  CreateAccountForm = new FormGroup(
    {
      FirstName: new FormControl('', Validators.pattern('([A-Z][a-z]*)')),
      LastName:  new FormControl('', Validators.pattern('([A-Z][a-z]*)')),
      Username:  new FormControl('', Validators.required),
      Email:     new FormControl('', [ Validators.required, Validators.email ]),
      Password:  new FormControl('', [ Validators.required, Validators.minLength(8) ])
    })
  CheckIfValid = CheckIfValid;
  myUser: User;
  boolFormSubmitted = false;

  constructor(
      public dndService: DNDService
  )
  {}

  CreateAccount(event: MouseEvent): void
  {
    event.preventDefault();
    this.boolFormSubmitted = true;
    console.log('hi')
    console.log(this.CreateAccountForm);
    console.log(this.CreateAccountForm.valid)
    const valid = this.CreateAccountForm.valid;
    if (valid)
    {
      const { FirstName, LastName, Username, Email, Password } = this.CreateAccountForm.value;
      this.myUser =
      {
        UserID:    Number.NaN,
        Username:  Username || "",
        FirstName: FirstName || "",
        LastName:  LastName || "",
        Password:  Password || "",
        Email:     Email || ""
      }
      const myCreateAccountSubscription =
      {
        next: (results: unknown) =>
        {
          console.log(results)
          this.boolShowCreateAccount.emit();
        },
        error: (error: MysqlError) => console.log(error)
      }
      this.dndService.CreateAccount(this.myUser).subscribe(myCreateAccountSubscription)
    }
  }
  ShowCreateAccount(event: MouseEvent):void
  {
    event.preventDefault();
    this.boolShowCreateAccount.emit()
  }
}
