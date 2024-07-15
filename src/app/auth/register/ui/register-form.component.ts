import { Component, input, output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterStatus } from '../data-access/register.service';
import { Credentials } from '../../../shared/interfaces/credentials';

@Component({
  standalone: true,
  selector: 'app-register-form',
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" #form="ngForm">
      <mat-form-field appearance="fill">
        <mat-label>email</mat-label>
        <input
          matNativeControl
          formControlName="email"
          type="email"
          placeholder="email"
        />
        <mat-icon matPrefix>email</mat-icon>
      </mat-form-field>
      <mat-form-field>
        <mat-label>password</mat-label>
        <input
          matNativeControl
          formControlName="password"
          data-test="create-password-field"
          type="password"
          placeholder="password"
        />
        <mat-icon matPrefix>lock</mat-icon>
      </mat-form-field>
      <mat-form-field>
        <mat-label>confirm password</mat-label>
        <input
          matNativeControl
          formControlName="confirmPassword"
          type="password"
          placeholder="confirm password"
        />
        <mat-icon matPrefix>lock</mat-icon>
      </mat-form-field>

      <button
        mat-raised-button
        color="accent"
        type="submit"
        [disabled]="status() === 'creating'"
      >
        Submit
      </button>
    </form>
  `,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      button {
        width: 100%;
      }

      mat-error {
        margin: 5px 0;
      }

      mat-spinner {
        margin: 1rem 0;
      }
    `,
  ],
})
export class RegisterFormComponent {
  status = input.required<RegisterStatus>();
  register = output<Credentials>();

  private fb = inject(FormBuilder);

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...credentials } =
        this.registerForm.getRawValue();
      this.register.emit(credentials);
    }
  }
}
