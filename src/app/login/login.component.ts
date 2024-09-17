import { Component, OnInit }                  from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DNDService }                         from '../dnd.service';

@Component({
  selector:    'app-login',
  standalone:  true,
  imports:     [],
  providers:   [ DNDService ],
  templateUrl: './login.component.html',
  styleUrl:    './login.component.scss'
})
export class LoginComponent implements OnInit
{

  LoginForm = new FormGroup(
    {
      Firstname: new FormControl('', Validators.pattern('([A-Z])')),
      LastName:  new FormControl('', Validators.pattern('([A-Z])')),
      Username:  new FormControl('', Validators.required),
      Email:     new FormControl('', [ Validators.required, Validators.email ]),
      Password:  new FormControl('', [ Validators.required, Validators.minLength(8) ])
    })

  constructor(private dndService: DNDService)
  {}

  ngOnInit(): void
  {
    console.log('hi')
  }

  Login(event: MouseEvent): void
  {
    event.preventDefault();
    console.log('button clicked')
  }
}
