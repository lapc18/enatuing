import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/core/stores/auth/auth.reducer';
import * as actions from 'src/app/core/stores/auth/auth.actions'
import { SignIn } from 'src/app/core/domain/auth/auth.models';
import { AlertFactory } from 'src/app/core/factory/alerts/alerts.factory';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, AfterViewInit {

  public loginForm: FormGroup;
  public isEmailValid: boolean;
  public isPwdValid: boolean;

  constructor(
    private store: Store<{ user: AuthState }>,
    private formBuilder: FormBuilder,
    // private alertFactory: AlertFactory
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    this.loginForm.valueChanges.subscribe(res => this.validateInputs());
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public validateInputs(): void {
    this.isEmailValid = this.loginForm.controls['email'].valid;
    this.isPwdValid = this.loginForm.controls['password'].valid;
  }

  public onSubmit() {
    const creds: SignIn = {
      email: this.loginForm.controls['email'].value || '',
      password: this.loginForm.controls['password'].value || ''
    }
    this.store.dispatch(actions.onLogin({ payload: creds }));
    // this.alertFactory.success(`User Logged In: ${JSON.stringify(creds)}`, { autoClose: true, keepAfterRouteChange: false,  });
  }

}
