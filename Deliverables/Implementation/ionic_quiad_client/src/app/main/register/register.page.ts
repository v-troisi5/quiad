import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegistrationAccount, RegistrationService } from 'src/app/account/services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registrationAccount: RegistrationAccount = {
    email: "",
    username: "",
    password: "",
    user: {
      residence: "",
      node: {
        birthdate: "",
        lastname: "",
        birthplace: "",
        firstname: "",
        sex: undefined
      }
    }
  };

  public usernameError?: string;
  public passwordError?: string;
  public confirmPasswordError?: string;
  public emailError?: string;
  public firstnameError?: string;
  public lastnameError?: string;
  public sexError?: string;

  public _confirmPassword: string = "";

  public isLoading: boolean = false;
  public error: string = "";

  constructor(
    private registrationService: RegistrationService,
    private navController: NavController
  ) { }

  validateEmail() {
    if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.registrationAccount.email)) {
      this.emailError = undefined;
    } else {
      this.emailError = "L'email non rispetta il formato standard \"mail@example.exa\"";
      return false;
    }
    return true;
  }

  validateFirstname() {
    if(/^[a-zA-Z ]{2,50}$/.test(this.registrationAccount.user.node.firstname)) {
      this.firstnameError = undefined;
    } else {
      this.firstnameError = "Il nome può contenere solo caratteri alfabetici e dev’essere compreso tra 2 e 50 caratteri"
      return false;
    }
    return true;
  }

  validateLastname() {
    if(/^[a-zA-Z ]{2,50}$/.test(this.registrationAccount.user.node.lastname)) {
      this.lastnameError = undefined;
    } else {
      this.lastnameError = "Il cognome può contenere solo caratteri alfabetici e dev’essere compreso tra 2 e 50 caratteri"
      return false;
    }
    return true;
  }

  validateConfirmPassword() {
    if(this.registrationAccount.password == this._confirmPassword) {
      this.confirmPasswordError = undefined;
    } else {
      this.confirmPasswordError = "La password immessa e quella di conferma non coincidono";
      return false;
    }
    return true;
  }

  validateSex() {
    if(this.registrationAccount.user.node.sex) {
      this.sexError = undefined;
    } else {
      this.sexError = "È necessario specificare il sesso";
      return false;
    }
    return true;
  }

  public validateUsername() {
    if(/^\S*$/.test(this.registrationAccount.username) && this.registrationAccount.username.length <= 20 && this.registrationAccount.username.length >= 4) {
      this.usernameError = undefined;
    } else {
      this.usernameError = "Lo username non deve contenere spazi, e deve prevedere da 4 a 20 caratteri";
      return false;
    }
    return true;
  }

  validatePassword() {
    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.?_&$%-/])[A-Za-z\d\.?_&$%-/]{8,20}/.test(this.registrationAccount.password)) {
      this.passwordError = undefined;
    } else {
      this.passwordError = "La password deve contenere da 8 a 20 caratteri, di cui almeno una lettera maiuscola, una minuscola, un numero ed un carattere speciale (?.-_/&%$)";
      return false;
    }
    return this.validateConfirmPassword();
  }


  ngOnInit() {
  }

  onSubmit(registrationAccount: RegistrationAccount) {
    console.log(registrationAccount);
    // this.registrationService
    //   .register(this.registrationAccount)
    //   .subscribe({
    //     next: account => {
    //       this.navController.navigateRoot("/main/login", {
    //         queryParams: {
    //           "username": account.username
    //         }
    //       })
    //     },
    //     error: error => {
    //       this.error = error.error.message;
    //     }
    //   });
  }

}
