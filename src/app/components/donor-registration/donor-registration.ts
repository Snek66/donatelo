import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donor-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-green-900">Registro de Donante</h2>
        </div>
        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="firstName" class="sr-only">Nombre</label>
              <input id="firstName" name="firstName" type="text" required 
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
                     placeholder="Nombre" [(ngModel)]="firstName">
            </div>
            <div>
              <label for="lastName" class="sr-only">Apellido</label>
              <input id="lastName" name="lastName" type="text" required 
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
                     placeholder="Apellido" [(ngModel)]="lastName">
            </div>
            <div>
              <label for="documentNumber" class="sr-only">Número de Documento</label>
              <input id="documentNumber" name="documentNumber" type="text" required 
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
                     placeholder="Número de Documento" [(ngModel)]="documentNumber">
            </div>
            <div>
              <label for="phone" class="sr-only">Teléfono</label>
              <input id="phone" name="phone" type="tel" required 
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
                     placeholder="Teléfono" [(ngModel)]="phone">
            </div>
            <div>
              <label for="email" class="sr-only">Correo Electrónico</label>
              <input id="email" name="email" type="email" required 
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
                     placeholder="Correo Electrónico" [(ngModel)]="email">
            </div>
            <div>
              <label for="age" class="sr-only">Edad</label>
              <input id="age" name="age" type="number" required min="18"
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
                     placeholder="Edad" [(ngModel)]="age">
            </div>
            <div>
              <label for="address" class="sr-only">Dirección</label>
              <input id="address" name="address" type="text" required 
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
                     placeholder="Dirección" [(ngModel)]="address">
            </div>
          </div>

          <div>
            <button type="submit" 
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Registrarse
            </button>
          </div>
        </form>
        <div class="flex items-center justify-between mt-4">
          <a routerLink="/donor-login" class="text-sm text-green-600 hover:text-green-500">
            ¿Ya tienes una cuenta? Inicia sesión
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
    .min-h-screen {
      min-height: 100vh;
    }
    `
  ]
})
export class DonorRegistrationComponent {
  firstName: string = '';
  lastName: string = '';
  documentNumber: string = '';
  phone: string = '';
  email: string = '';
  age: number | null = null;
  address: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.validateForm()) {
      console.log('Form submitted:', {
        firstName: this.firstName,
        lastName: this.lastName,
        documentNumber: this.documentNumber,
        phone: this.phone,
        email: this.email,
        age: this.age,
        address: this.address
      });
      this.router.navigate(['/donor-login']);
    }
  }

  validateForm(): boolean {
    if (!this.firstName || !this.lastName || !this.documentNumber || !this.phone || !this.email || !this.age || !this.address) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return false;
    }
    if (this.age < 18) {
      this.errorMessage = 'Debe ser mayor de 18 años para registrarse.';
      return false;
    }
    this.errorMessage = '';
    return true;
  }

}