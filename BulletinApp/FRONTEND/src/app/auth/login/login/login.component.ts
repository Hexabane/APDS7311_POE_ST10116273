import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent {
  show: boolean = false;
  constructor(public authservice: AuthServiceService, private router: Router) {
    router.canceledNavigationResolution = 'computed';
    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }




  onlogin(loginform: NgForm) {
    if (loginform.invalid) {
      loginform.reset();
      return alert(
        'Authentication Error, please enter password and username again'
      );
    } else {
      localStorage.setItem('email', loginform.value.enteredusername);
      this.authservice.login(
        loginform.value.enteredusername,
        loginform.value.enteredpassword
      );
    }
  }

  onsignup(signupform: NgForm) {
    if (signupform.invalid) {
      signupform.reset();
      return alert(
        'Authentication Error, please enter a valid password/email'
      );
    } else {
      this.authservice.signup(
        signupform.value.enteredusername1,
        signupform.value.enteredpassword1
      );

      alert('Account Created!!. Login');

      signupform.reset();
    }
  }

  password() {
    this.show = !this.show;
  }
}
