import { Component, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular'
import { Account } from '../models/Account'
import { RegisterService } from '../services/register.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      Validators.pattern(/^\S*$/),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.?_&$%-/])[A-Za-z\d\.?_&$%-/]{8,20}/,
      ),
    ]),
    passwordConfirmation: new FormControl(null, [
      Validators.required,
      ValidateEqual('password'),
    ]),
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    birthdate: new FormControl(undefined, Validators.required),
    birthplace: new FormControl(null, Validators.required),
    sex: new FormControl(null, Validators.required),
    residence: new FormControl(null, Validators.required),
  })

  loading: boolean = false

  constructor(
    private registerService: RegisterService,
    private route: Router,
    private toastController: ToastController,
  ) {}

  ngOnInit() {}

  onSubmit(registerAccount: any) {
    this.registerService
      .register(
        new Account({
          email: registerAccount.email,
          password: registerAccount.password,
          username: registerAccount.username,
          user: {
            residence: registerAccount.residence,
            node: {
              firstname: registerAccount.firstname,
              lastname: registerAccount.lastname,
              birthdate: new Date(registerAccount.birthdate),
              birthplace: registerAccount.birthplace,
            },
          },
        }),
      )
      .subscribe({
        next: (account) => {
          console.log(account)
        },
        error: (error) => {
          this.toastController
            .create({
              color: 'danger',
              message: error.message,
              duration: 3000,
            })
            .then((toast) => {
              toast.present()
            })
        },
      })
  }
}

function ValidateEqual(equals: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const equalsField = control.root.get(equals)
    if (equalsField) {
      equalsField.valueChanges.subscribe((value) => {
        console.log('observable fired', value)
        // control.updateValueAndValidity( { onlySelf: true  , emitEvent: false } );
      })
      if (control.value !== equalsField.value) {
        return { equals: true }
      }
    }
    return null
  }
}
