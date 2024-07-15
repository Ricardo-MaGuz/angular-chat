import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/data-access/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LoginFormComponent } from './ui/login-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginService } from './data-access/login.service';

@Component({
  standalone: true,
  selector: 'app-login',
  template: `
    <div class="container gradient-bg">
      <app-login-form
        [loginStatus]="loginService.status()"
        (login)="loginService.login$.next($event)"
      />
      <a routerLink="/auth/register">Create account</a>
    </div>
  `,
  providers: [LoginService],
  imports: [RouterModule, LoginFormComponent, MatProgressSpinnerModule],
  styles: [
    `
      a {
        margin: 2rem;
        color: var(--accent-darker-color);
      }
    `,
  ],
})
export default class LoginComponent {
  public loginService = inject(LoginService);
  public authService = inject(AuthService);
  private router = inject(Router);
}
