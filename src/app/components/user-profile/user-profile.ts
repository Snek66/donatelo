import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-green-100 to-green-200 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div class="md:flex">
          <div class="p-8 w-full">
            <div class="uppercase tracking-wide text-sm text-green-500 font-semibold mb-1">Perfil de Usuario</div>
            <h1 class="block mt-1 text-lg leading-tight font-medium text-black">Editar Perfil</h1>
            
            <div class="mt-4">
              <div class="flex items-center justify-center space-x-4">
                <div class="relative">
                  <img src="/assets/imagenes/userMen.jpg" alt="Foto de perfil" class="h-24 w-24 rounded-full object-cover">
                  <label for="profile-image" class="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <input id="profile-image" type="file" class="hidden" (change)="onFileSelected($event)" accept="image/*">
                  </label>
                </div>
              </div>
            </div>

            <form [formGroup]="profileForm" (ngSubmit)="saveProfile()" class="mt-6 space-y-4">
              <div>
                <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" id="nombre" formControlName="nombre" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50">
              </div>

              <div>
                <label for="apellido" class="block text-sm font-medium text-gray-700">Apellido</label>
                <input type="text" id="apellido" formControlName="apellido" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50">
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" formControlName="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50">
              </div>

              <div>
                <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="tel" id="telefono" formControlName="telefono" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50">
              </div>

              <div>
                <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección</label>
                <input type="text" id="direccion" formControlName="direccion" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50">
              </div>

              <div class="flex justify-between items-center mt-6">
                <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Guardar Cambios
                </button>
                <a routerLink="/donor-home" class="text-sm font-medium text-green-600 hover:text-green-500">
                  Volver
                </a>
              </div>
            </form>

            <div class="mt-8 border-t pt-6">
              <h3 class="text-lg font-medium text-gray-900">Cambiar Contraseña</h3>
              <form [formGroup]="passwordForm" (ngSubmit)="changePassword()" class="mt-4 space-y-4">
                <div>
                  <label for="currentPassword" class="block text-sm font-medium text-gray-700">Contraseña Actual</label>
                  <input type="password" id="currentPassword" formControlName="currentPassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                </div>

                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                  <input type="password" id="newPassword" formControlName="newPassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                </div>

                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Nueva Contraseña</label>
                  <input type="password" id="confirmPassword" formControlName="confirmPassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                </div>

                <div>
                  <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Cambiar Contraseña
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
  
  `]
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  profileImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  ngOnInit(): void {

    this.loadUserData();
  }

  loadUserData() {

    const userData = {
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@gmail.com',
      telefono: '123456789',
      direccion: 'Calle Principal 123',
      profileImage: 'https://example.com/path-to-image.jpg'
    };

    this.profileForm.patchValue(userData);
    this.profileImage = userData.profileImage;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      console.log('Perfil guardado:', this.profileForm.value);
    }
  }

  changePassword() {
    if (this.passwordForm.valid) {
      console.log('Contraseña cambiada:', this.passwordForm.value);
    }
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('newPassword')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }
}