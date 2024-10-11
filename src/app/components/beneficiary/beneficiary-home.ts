import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beneficiary-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="flex h-screen bg-green-50">
      <!-- Main content -->
      <main class="flex-1 overflow-y-auto">
        <header class="bg-white shadow-sm">
          <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 class="text-2xl font-semibold text-gray-900">Bienvenido, {{ profile.name }}</h1>
            <div class="flex items-center space-x-4">
              <button (click)="toggleProfileModal()" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <div class="relative">
                <button (click)="toggleFilterMenu()" class="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div *ngIf="isFilterMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div class="py-1">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" (click)="filterDonations('available', $event)">Donaciones Disponibles</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" (click)="filterDonations('applied', $event)">Historial Aplicados</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" (click)="filterDonations('received', $event)">Historial Recibidos</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" (click)="filterDonations('pending', $event)">Historial Pendientes</a>
                  </div>
                </div>
              </div>
              <button (click)="toggleNotifications()" class="relative text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span *ngIf="unreadNotifications.length" class="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">{{ unreadNotifications.length }}</span>
              </button>
            </div>
          </div>
        </header>

        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Alert message -->
          <div *ngIf="alertMessage" class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{{ alertMessage }}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3" (click)="closeAlert()">
              <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
          
          <!-- Donations Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let donation of filteredDonations" class="bg-white shadow rounded-lg overflow-hidden">
              <img [src]="donation.image" [alt]="donation.name" class="w-full h-48 object-cover">
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900">{{ donation.name }}</h3>
                <p class="text-sm text-gray-500 mt-1">{{ donation.description }}</p>
                <div class="mt-2 flex items-center justify-between">
                  <span class="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {{ donation.category }}
                  </span>
                  <span class="text-xs text-gray-500">{{ donation.date }}</span>
                </div>
                <p class="text-sm text-gray-600 mt-2">Donado por: {{ donation.donor }}</p>
                <button 
                  *ngIf="currentFilter === 'available'"
                  (click)="applyForDonation(donation)" 
                  class="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-200">
                  Solicitar Donación
                </button>
                <div *ngIf="currentFilter !== 'available'" class="mt-4 text-sm font-medium text-gray-700">
                  Estado: {{ getDonationStatus(donation) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Notifications Panel -->
      <div *ngIf="notificationsVisible" class="fixed right-0 top-16 bg-white shadow-lg rounded-lg p-4 w-80">
        <h3 class="text-lg font-semibold mb-4">Notificaciones</h3>
        <div *ngFor="let notification of notifications" class="flex justify-between items-center mb-2">
          <div class="text-sm text-gray-600">{{ notification.message }}</div>
          <button (click)="removeNotification(notification)" class="text-gray-400 hover:text-gray-600">X</button>
        </div>
        <button (click)="clearAllNotifications()" class="w-full text-center text-sm text-red-500 mt-4">Eliminar todas</button>
      </div>

      <!-- Profile Modal -->
      <div *ngIf="isProfileModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" (click)="toggleProfileModal()">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" (click)="$event.stopPropagation()">
          <div class="mt-3">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Editar Perfil</h3>
            <div class="mb-4 flex justify-center">
              <img [src]="profile.photo" alt="{{ profile.name }}" class="w-32 h-32 rounded-full object-cover">
            </div>
            <form (ngSubmit)="updateProfile()">
              <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" name="name" id="name" [(ngModel)]="profile.name" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
              <div class="mb-4">
                <label for="lastName" class="block text-sm font-medium text-gray-700">Apellido</label>
                <input type="text" name="lastName" id="lastName" [(ngModel)]="profile.lastName" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
              <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" [(ngModel)]="profile.email" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
              <div class="mb-4">
                <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="tel" name="phone" id="phone" [(ngModel)]="profile.phone" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
              <div class="mb-4">
                <label for="address" class="block text-sm font-medium text-gray-700">Dirección</label>
                <input type="text" name="address" id="address" [(ngModel)]="profile.address" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
              <div class="mb-4">
                <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea name="description" id="description" rows="3" [(ngModel)]="profile.description" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
              </div>
              <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
                Guardar Cambios
              </button>
            </form>
            <div class="mt-4">
              <h4 class="text-md font-medium text-gray-900 mb-2">Cambiar Contraseña</h4>
              <form (ngSubmit)="changePassword()">
                <div class="mb-4">
                  <label for="currentPassword" class="block text-sm font-medium text-gray-700">Contraseña Actual</label>
                  <input type="password" name="currentPassword" id="currentPassword" [(ngModel)]="passwordChange.currentPassword" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="mb-4">
                  <label for="newPassword" class="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                  <input type="password" name="newPassword" id="newPassword" [(ngModel)]="passwordChange.newPassword" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="mb-4">
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Nueva Contraseña</label>
                  <input type="password" name="confirmPassword" id="confirmPassword" [(ngModel)]="passwordChange.confirmPassword" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
                  Cambiar Contraseña
                </button>
              </form>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class BeneficiaryHomeComponent {
  notificationsVisible = false;
  isProfileModalOpen = false;
  isFilterMenuOpen = false;
  alertMessage = '';
  currentFilter = 'available';
  
  profile = {
    name: 'Juan',
    lastName: 'Beneficiario',
    email: 'juan@gmail.com',
    phone: '12345678',
    address: 'Calle Principal 123',
    description: 'Soy un beneficiario en busca de ayuda para mi comunidad.',
    photo: '/assets/imagenes/userMen.jpg'
  };

  passwordChange = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  allDonations = [
    {
      id: 1,
      image: '/assets/imagenes/alimentos.jpg',
      name: 'Donación de alimentos',
      description: 'Alimentos no perecederos para familias necesitadas',
      category: 'Alimentos',
      donor: 'Juan Pérez',
      date: '2024-10-01',
      status: 'available'
    },
    {
      id: 2,
      image: '/assets/imagenes/DonaciónRopa.jpg',
      name: 'Ropa de invierno',
      description: 'Abrigos y chaquetas para personas sin hogar',
      category: 'Ropa',
      donor: 'María García',
      date: '2024-09-30',
      status: 'applied'
    },
    {
      id: 3,
      image: '/assets/imagenes/DonacionUtiles.jpg',
      name: 'Útiles escolares',
      description: 'Cuadernos, lápices y otros útiles para estudiantes',
      category: 'Educación',
      donor: 'Carlos Rodríguez',
      date: '2024-09-29',
      status: 'received'
    },
    {
      id: 4,
      image: '/assets/imagenes/medicamentos.jpg',
      name: 'Medicamentos',
      description: 'Medicamentos básicos para el botiquín comunitario',
      category: 'Salud',
      donor: 'Ana Martínez',
      date: '2024-09-28',
      status: 'pending'
    },
    {
        id: 5,
        image: '/assets/imagenes/medicamentos.jpg',
        name: 'Medicamentos',
        description: 'Medicamentos básicos para el botiquín comunitario',
        category: 'Salud',
        donor: 'Snieder Serrano',
        date: '2024-09-30',
        status: 'available'
      },
  ];

  get filteredDonations() {
    return this.allDonations.filter(donation => donation.status === this.currentFilter);
  }

  notifications = [
    { id: 1, message: 'Nueva donación de alimentos disponible.' },
    { id: 2, message: 'Tu solicitud de ropa ha sido aprobada.' },
    { id: 3, message: 'Recordatorio: Recoge tu donación mañana.' },
  ];

  unreadNotifications = [...this.notifications];

  toggleNotifications() {
    this.notificationsVisible = !this.notificationsVisible;
  }

  toggleProfileModal() {
    this.isProfileModalOpen = !this.isProfileModalOpen;
  }

  toggleFilterMenu() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }

  filterDonations(filter: string, event: Event) {
    event.preventDefault();
    this.currentFilter = filter;
    this.isFilterMenuOpen = false;
  }

  removeNotification(notification: any) {
    const index = this.notifications.findIndex(n => n.id === notification.id);
    if (index > -1) {
      this.notifications.splice(index, 1);
      this.unreadNotifications = this.notifications;
    }
  }

  clearAllNotifications() {
    this.notifications = [];
    this.unreadNotifications = [];
  }

  applyForDonation(donation: any) {
    console.log(`Solicitud enviada para la donación: ${donation.name}`);
    donation.status = 'applied';
    this.alertMessage = `Has solicitado la donación: ${donation.name}`;
    this.notifications.push({
      id: this.notifications.length + 1,
      message: `Has solicitado la donación: ${donation.name}`
    });
    this.unreadNotifications = [...this.notifications];
  }

  getDonationStatus(donation: any) {
    switch (donation.status) {
      case 'applied':
        return 'Solicitud Enviada';
      case 'received':
        return 'Donación Recibida';
      case 'pending':
        return 'Pendiente de Aprobación';
      default:
        return 'Desconocido';
    }
  }

  closeAlert() {
    this.alertMessage = '';
  }

  updateProfile() {
    console.log('Profile updated:', this.profile);
    this.toggleProfileModal();
    this.alertMessage = 'Perfil actualizado exitosamente';
  }

  changePassword() {
    console.log('Password change requested');
    // Implement password change logic here
    this.alertMessage = 'Contraseña actualizada exitosamente';
    this.passwordChange = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }
}