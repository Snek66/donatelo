// src/app/components/beneficiary-login/beneficiary-login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beneficiary-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-green-900">Iniciar sesión como Beneficiario</h2>
        </div>
        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()">
          <input type="hidden" name="remember" value="true">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Correo electrónico</label>
              <input id="email-address" name="email" type="email" autocomplete="email" required 
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
                     placeholder="Correo electrónico" [(ngModel)]="email">
            </div>
            <div>
              <label for="password" class="sr-only">Contraseña</label>
              <input id="password" name="password" type="password" autocomplete="current-password" required 
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
                     placeholder="Contraseña" [(ngModel)]="password">
            </div>
          </div>

          <div>
            <button type="submit" 
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Iniciar sesión
            </button>
          </div>
        </form>
        <div class="text-center">
          <a routerLink="/beneficiary-registration" class="font-medium text-green-600 hover:text-green-500">
            ¿No tienes una cuenta? Regístrate
          </a>
        </div>
        <div *ngIf="errorMessage" class="mt-3 text-center text-sm text-red-600">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    /* You can add component-specific styles here */
    `
  ]
})
export class BeneficiaryLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, ingrese su correo electrónico y contraseña.';
      return;
    }

    if (this.mockLoginCheck(this.email, this.password)) {
      console.log('Login successful');
      this.router.navigate(['/beneficiary-home']);
    } else {
      this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
    }
  }

  private mockLoginCheck(email: string, password: string): boolean {
    const validEmail = 'snekb';
    const validPassword = '123456';
    return email === validEmail && password === validPassword;
  }
}