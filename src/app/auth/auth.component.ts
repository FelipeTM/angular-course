import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  public isLoginMode = true;
  public isLoading = false;
  public error: string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;

      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      if (this.isLoginMode) {
        authObs = this.authService.loginUser(email, password);
      } else {
        authObs = this.authService.signupUser(email, password);
      }

      authObs.subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        (errorMessage) => {
          this.error = errorMessage;
          this.showErrorAlert(errorMessage);
          this.isLoading = false;
        }
      );

      form.reset();
    }
  }

  public onCloseAlert(): void {
    this.error = null;
  }

  private showErrorAlert(message: string): void {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
      this.closeSub.unsubscribe();
    });
  }

}
