import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

function ValidateEqual( equals: string ) {
  return ( control: AbstractControl ): ValidationErrors | null => {

    const equalsField = control.root.get( equals )
    if ( equalsField ) {

      equalsField.valueChanges.subscribe( value => {
        console.log( 'observable fired', value );
        // control.updateValueAndValidity( { onlySelf: true  , emitEvent: false } );
      } );
      if ( control.value !== equalsField.value ) {
        return { equals: true };
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^\S*$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.?_&$%-/])[A-Za-z\d\.?_&$%-/]{8,20}/)]),
    passwordConfirmation: new FormControl(null, [Validators.required, ValidateEqual("password")]),
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    birthDate: new FormControl(undefined, Validators.required),
    birthPlace: new FormControl(null, Validators.required),
    sex: new FormControl(null, Validators.required),
  });

  loading: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(a: any) {
    console.log(a);
  }

}
