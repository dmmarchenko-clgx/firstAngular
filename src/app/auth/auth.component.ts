import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { LoginStart } from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('auth')
      .subscribe(authState => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
      });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      this.store.dispatch(new LoginStart({email, password}));
    } else {
      authObs = this.authService.signup(email, password);
    }

    //authObs
    //  .subscribe(response => {
    //    console.log(response);
    //    this.isLoading = false;
    //    this.error = null;
    //    this.router.navigate(['/recipes']);
    //  }, errorMessage => {
    //    console.log(errorMessage);
    //    this.error = errorMessage;
    //    this.isLoading = false;
    //  });
    form.reset();
  }

  onErrorHandled() {
    this.error = null;
  }
}
