import {Component, OnInit} from '@angular/core';
import {MatError, MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatError,
    MatLabel,
    NgIf,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      authKey: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const key = this.loginForm.value.authKey;
      this.authService.setToken(key);
      this.router.navigate(['/products']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
