import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donor-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="flex h-screen bg-green-50">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-md">
        <div class="p-4">
          <h2 class="text-2xl font-bold text-green-600 mb-4">Donatelo</h2>
          <input
            type="text"
            [(ngModel)]="searchTerm"
            placeholder="Buscar usuario..."
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <nav class="mt-6 overflow-y-auto">
          <div *ngFor="let user of filteredUsers()" (click)="showBeneficiaryDetails(user)" class="flex items-center p-4 hover:bg-green-50 cursor-pointer">
            <img [src]="user.photo" [alt]="user.name" class="w-10 h-10 rounded-full mr-4">
            <div>
              <h3 class="text-sm font-medium text-gray-900">{{ user.name }}</h3>
            </div>
          </div>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-y-auto">
        <header class="bg-white shadow-sm">
          <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 class="text-2xl font-semibold text-gray-900">Bienvenido, Donante</h1>
            <div class="flex items-center space-x-4">
              <a routerLink="/user-profile" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
              <button (click)="toggleMyDonations()" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
              </button>
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
          <!-- Toggle between general donations and my donations -->
          <div class="mb-4">
            <button (click)="toggleMyDonations()" class="px-4 py-2 rounded-lg" [ngClass]="{'bg-green-500 text-white': showingMyDonations, 'bg-gray-200 text-gray-700': !showingMyDonations}">
              {{ showingMyDonations ? 'Ver Donaciones Generales' : 'Ver Mis Donaciones' }}
            </button>
          </div>

          <!-- General Donations Grid -->
          <div *ngIf="!showingMyDonations" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let donation of donations" class="bg-white shadow rounded-lg overflow-hidden">
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
              </div>
            </div>
          </div>

          <!-- My Donations Grid -->
          <div *ngIf="showingMyDonations" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let donation of myDonations" class="bg-white shadow rounded-lg overflow-hidden">
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
                <button (click)="showBeneficiarySelection(donation)" class="mt-2 text-sm text-blue-600 hover:text-blue-800">
                  {{ donation.beneficiaryRequests }} beneficiarios lo han pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Beneficiary Details Modal -->
      <div *ngIf="selectedBeneficiary && !showingBeneficiarySelection && !showingLocationSelection  && !showingDonationForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 class="text-lg font-semibold mb-4">Beneficiario</h2>
          <img [src]="selectedBeneficiary.photo" [alt]="selectedBeneficiary.name" class="w-24 h-24 rounded-full mx-auto mb-4">
          <p><strong>Nombre:</strong> {{ selectedBeneficiary.name }}</p>
          <p><strong>Apellido:</strong> {{ selectedBeneficiary.lastName }}</p>
          <p><strong>Descripción:</strong> {{ selectedBeneficiary.description }}</p>
          <p><strong>Dirección:</strong> {{ selectedBeneficiary.address }}</p>
          <div class="flex justify-between mt-6">
            <button (click)="continueToDonation()" class="bg-green-500 text-white py-2 px-4 rounded-lg">Continuar</button>
            <button (click)="cancel()" class="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- Beneficiary Selection Modal -->
      <div *ngIf="showingBeneficiarySelection" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 class="text-2xl font-semibold mb-4 text-green-600">{{ selectedDonation?.name }}</h2>
          <div class="relative flex items-center justify-center mb-4">
            <button (click)="previousBeneficiary()" class="absolute left-0 bg-gray-200 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="flex space-x-4">
              <div *ngFor="let beneficiary of visibleBeneficiaries; let i = index" 
                   [ngClass]="{'w-20 h-20': i === 1, 'w-16 h-16 opacity-50': i !== 1}"
                   class="flex-shrink-0">
                <img [src]="beneficiary.photo" [alt]="beneficiary.name" class="w-full h-full rounded-lg object-cover">
              </div>
            </div>
            <button (click)="nextBeneficiary()" class="absolute right-0 bg-gray-200 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div *ngIf="selectedBeneficiary" class="text-center mb-4">
            <h3 class="text-lg font-semibold">{{ selectedBeneficiary.name }}</h3>
            <p class="text-sm text-gray-600">{{ selectedBeneficiary.description }}</p>
            <p class="text-sm text-gray-600">Edad: {{ selectedBeneficiary.age }} años</p>
            <p class="text-sm text-gray-600">Dirección: {{ selectedBeneficiary.address }}</p>
          </div>
          <div class="mb-4">
            <h4 class="text-sm font-semibold mb-2">Elegir tipo de entrega:</h4>
            <div class="flex justify-between">
              <label class="inline-flex items-center">
                <input type="radio" class="form-radio" name="deliveryType" value="sede" [(ngModel)]="selectedDeliveryType">
                <span class="ml-2">Entrega a sede</span>
              </label>
              <label class="inline-flex items-center">
                <input type="radio" class="form-radio" name="deliveryType" value="directo" [(ngModel)]="selectedDeliveryType">
                <span class="ml-2">Envio directo</span>
              </label>
            </div>
          </div>
          <div class="flex justify-between">
            <button (click)="cancelBeneficiarySelection()" class="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg">Cancelar</button>
            <button (click)="chooseBeneficiary()" [disabled]="!selectedDeliveryType" [ngClass]="{'opacity-50 cursor-not-allowed': !selectedDeliveryType}" class="bg-green-500 text-white py-2 px-4 rounded-lg">Elegir</button>
          </div>
        </div>
      </div>

      <!-- Location Selection Modal -->
      <div *ngIf="showingLocationSelection" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 class="text-2xl font-semibold mb-4 text-green-600">Elegir sede de entrega</h2>
          <div class="relative flex items-center justify-center mb-4">
            <button  (click)="previousLocation()" class="absolute left-0 bg-gray-200 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <img [src]="currentLocation.image" [alt]="currentLocation.name" class="max-w-full max-h-full object-contain">
            </div>
            <button (click)="nextLocation()" class="absolute right-0 bg-gray-200 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div class="text-center mb-4">
            <h3 class="text-lg font-semibold">{{ currentLocation.name }}</h3>
            <p class="text-sm text-gray-600">{{ currentLocation.address }}</p>
          </div>
          <div class="flex justify-between">
            <button (click)="cancelLocationSelection()" class="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg">Cancelar</button>
            <button (click)="chooseLocation()" class="bg-green-500 text-white py-2 px-4 rounded-lg">Continuar</button>
          </div>
        </div>
      </div>

       <!-- Donaciones -->

       <div *ngIf="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 class="text-lg font-semibold mb-4 flex justify-between items-center">
            <input [(ngModel)]="newDonation.name" placeholder="Nueva donación" class="border p-2 rounded w-full" (input)="clearNameError()" />
            <button (click)="clearDonationName()" class="ml-2 text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </h2>
          
          <div *ngIf="errorMessageName" class="text-red-500 text-sm mb-4">
            {{ errorMessageName }}
          </div>

          <div class="relative mb-4">
            <label class="block w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer border border-gray-300 overflow-hidden">
              <input
                type="file"
                class="hidden"
                (change)="onImageSelected($event)"
              />
              <ng-container *ngIf="!newDonation.image; else selectedImage">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </ng-container>
              <ng-template #selectedImage>
                <img [src]="newDonation.image" class="w-full h-full object-cover"/>
                <button
                  (click)="clearImage($event)"
                  class="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </ng-template>
            </label>
            <div *ngIf="errorMessageImage" class="text-red-500 text-sm mb-4">
              {{ errorMessageImage }}
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Categoría</label>
            <select [(ngModel)]="newDonation.category" name="category" required class="w-full p-2 border border-gray-300 rounded-lg">
              <option value="Alimentos">Alimentos</option>
              <option value="Ropa">Ropa</option>
              <option value="Educación">Útiles</option>
            </select>
          </div>
          <div *ngIf="errorMessageCategory" class="text-red-500 text-sm mb-4">
            {{ errorMessageCategory }}
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Descripción</label>
            <textarea [(ngModel)]="newDonation.description" name="description" rows="3" class="w-full p-2 border border-gray-300 rounded-lg" (input)="clearDescriptionError()"></textarea>
          </div>
          <div *ngIf="errorMessageDescription" class="text-red-500 text-sm mb-4">
            {{ errorMessageDescription }}
          </div>

          <div class="flex justify-between">
            <button (click)="cancelDonation()" class="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2">Cancelar</button>
            <button (click)="saveDonation()" class="bg-green-500 text-white py-2 px-4 rounded-lg">Guardar</button>
          </div>
        </div>
      </div>
      <div *ngIf="showingDonationForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 class="text-2xl font-semibold mb-4 text-green-600">Nueva Donación para {{ selectedBeneficiary.name }}</h2>
          <form (ngSubmit)="saveDonationForBeneficiary()">
            <div class="mb-4">
              <label for="donationName" class="block text-sm font-medium text-gray-700">Nombre de la Donación</label>
              <input type="text" id="donationName" name="donationName" [(ngModel)]="newDonation.name" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
            </div>
            <div class="mb-4">
              <label for="donationCategory" class="block text-sm font-medium text-gray-700">Categoría</label>
              <select id="donationCategory" name="donationCategory" [(ngModel)]="newDonation.category" required class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                <option value="Alimentos">Alimentos</option>
                <option value="Ropa">Ropa</option>
                <option value="Educación">Útiles</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="donationDescription" class="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea id="donationDescription" name="donationDescription" rows="3" [(ngModel)]="newDonation.description" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Imagen de la Donación</label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                      <span>Subir un archivo</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" (change)="onImageSelected($event)">
                    </label>
                    <p class="pl-1">o arrastrar y soltar</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                </div>
              </div>
            </div>
            <div class="flex justify-between">
              <button type="button" (click)="cancelDonationForm()" class="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg">Cancelar</button>
              <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded-lg">Guardar Donación</button>
            </div>
          </form>
        </div>
      </div>

      <!-- notificacion Panel -->
      <div *ngIf="notificationsVisible" class="fixed right-0 top-16 bg-white shadow-lg rounded-lg p-4 w-80">
        <h3 class="text-lg font-semibold mb-4">Notificaciones</h3>
        <div *ngFor="let notification of notifications" class="flex justify-between items-center mb-2">
          <div class="text-sm text-gray-600">{{ notification.message }}</div>
          <button (click)="removeNotification(notification)" class="text-gray-400 hover:text-gray-600">X</button>
        </div>
        <button (click)="clearAllNotifications()" class="w-full text-center text-sm text-red-500 mt-4">Eliminar todas</button>
      </div>

      <!-- boton abrir formulario donacion-->
      <button (click)="openModal()" class="fixed bottom-8 right-8 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  `,
  styles: [``]
})
export class DonorHomeComponent {
  searchTerm: string = '';
  notificationsVisible = false;
  isModalOpen = false;
  selectedBeneficiary: any = null;
  showingDonationForm = false;
  
  showingMyDonations = false;
  isDonationFormVisible = false;
  showingBeneficiarySelection = false;
  selectedDonation: any = null;
  visibleBeneficiaries: any[] = [];
  currentBeneficiaryIndex = 0;
  selectedDeliveryType: string = '';
  showingLocationSelection = false;
  locations = [
    { id: 1, name: 'Sede Central', address: 'Calle Principal 123', image: '/assets/imagenes/sede1.jpg' },
    { id: 2, name: 'Sede Norte', address: 'Avenida Norte 456', image: '/assets/imagenes/sede2.jpg' },
    { id: 3, name: 'Sede Sur', address: 'Bulevar Sur 789', image: '/assets/imagenes/sede3.jpg' },
  ];
  currentLocationIndex = 0;
  currentLocation = this.locations[0];
  

  showLocationSelection() {
    this.showingBeneficiarySelection = false;
    this.showingLocationSelection = true;
    this.currentLocationIndex = 0;
    this.currentLocation = this.locations[0];
  }
  chooseBeneficiary() {
    if (this.selectedDeliveryType) {
      if (this.selectedDeliveryType === 'sede') {
        this.showLocationSelection();
      } else {
        console.log(`Beneficiario ${this.selectedBeneficiary.name} elegido para la donación ${this.selectedDonation.name}. Tipo de entrega: Envío directo`);
        this.finalizeDonationProcess();
      }
    }
  }

  previousLocation() {
    this.currentLocationIndex = (this.currentLocationIndex - 1 + this.locations.length) % this.locations.length;
    this.currentLocation = this.locations[this.currentLocationIndex];
  }

  nextLocation() {
    this.currentLocationIndex = (this.currentLocationIndex + 1) % this.locations.length;
    this.currentLocation = this.locations[this.currentLocationIndex];
  }

  cancelLocationSelection() {
    this.showingLocationSelection = false;
    this.showingBeneficiarySelection = true;
  }

  chooseLocation() {
    console.log(`Beneficiario ${this.selectedBeneficiary.name} elegido para la donación ${this.selectedDonation.name}. Tipo de entrega: Sede - ${this.currentLocation.name}`);
    this.showingLocationSelection = false;
    this.selectedDonation = null;
    this.selectedDeliveryType = '';
  }
  cancelDonationForm() {
    this.showingDonationForm = false;
    this.selectedBeneficiary = null;
    this.newDonation = {
      id: 0,
      name: '',
      image: '',
      category: '',
      description: '',
      donor: 'Usuario Actual',
      date: new Date().toISOString().split('T')[0],
      beneficiaryRequests: 0
    };
  }

  notifications = [
    { id: 1, message: 'Tienes una nueva donación de alimentos.' },
    { id: 2, message: 'Ropa de invierno disponible para donar.' },
    { id: 3, message: 'Nuevo usuario registrado en el sistema.' },
  ];

  unreadNotifications = [...this.notifications];

  donations = [
    {
      id: 1,
      image: '/assets/imagenes/alimentos.jpg',
      name: 'Donación de alimentos',
      description: 'Alimentos no perecederos para familias necesitadas',
      category: 'Alimentos',
      donor: 'Juan Pérez',
      date: '2024-10-01',
    },
    {
      id: 2,
      image: '/assets/imagenes/DonaciónRopa.jpg',
      name: 'Ropa de invierno',
      description: 'Abrigos y chaquetas para personas sin hogar',
      category: 'Ropa',
      donor: 'María García',
      date: '2024-09-30',
    },
    {
      id: 3,
      image: '/assets/imagenes/DonacionUtiles.jpg',
      name: 'Útiles escolares',
      description: 'Cuadernos, lápices y otros útiles para estudiantes',
      category: 'Educación',
      donor: 'Carlos Rodríguez',
      date: '2024-09-29',
    },
  ];

  myDonations = [
    {
      id: 1,
      image: '/assets/imagenes/mydonation1.jpg',
      name: 'Donación de libros',
      description: 'Libros de texto para estudiantes de primaria',
      category: 'Educación',
      donor: 'Usuario Actual',
      date: '2024-10-05',
      beneficiaryRequests: 3
    },
    {
      id: 2,
      image: '/assets/imagenes/mydonation2.jpg',
      name: 'Donación de juguetes',
      description: 'Juguetes en buen estado para niños',
      category: 'Otros',
      donor: 'Usuario Actual',
      date: '2024-10-03',
      beneficiaryRequests: 5
    },
  ];

  users = [
    { id: 1, name: 'Juan Pérez', lastName: 'Pérez', photo: '/assets/imagenes/userMen.jpg', description: 'Beneficiario de donaciones', address: 'Calle 123, Ciudad', age: 35 },
    { id: 2, name: 'Ana López', lastName: 'López', photo: '/assets/imagenes/userWomen.jpg', description: 'Beneficiario de donaciones', address: 'Avenida 456, Ciudad', age: 28 },
    { id: 3, name: 'Carlos Rodríguez', photo: '/assets/imagenes/userMen.jpg', description: 'Estudiante universitario', address: 'Plaza 789, Ciudad', age: 22 },
    { id: 4, name: 'Laura Martínez', photo: '/assets/imagenes/userWomen.jpg', description: 'Madre soltera', address: 'Calle 012, Ciudad', age: 40 },
    { id: 5, name: 'Pedro Fernández', photo: '/assets/imagenes/userMen.jpg', description: 'Adulto mayor', address: 'Avenida 345, Ciudad', age: 65 }
  ];

  newDonation = {
    id: 0,
    name: 'Nueva donación',
    image: '',
    category: '',
    description: '',
    donor: 'Usuario Actual',
    date: new Date().toISOString().split('T')[0],
    beneficiaryRequests: 0
  };

  errorMessageName = '';
  errorMessageImage = '';
  errorMessageDescription = '';
  errorMessageCategory = '';

  toggleMyDonations() {
    this.showingMyDonations = !this.showingMyDonations;
  }

  showBeneficiarySelection(donation: any) {
    this.selectedDonation = donation;
    this.showingBeneficiarySelection = true;
    this.currentBeneficiaryIndex = 0;
    this.updateVisibleBeneficiaries();
    this.selectedDeliveryType = '';
  }
  saveDonationForBeneficiary() {
    if (this.newDonation.name && this.newDonation.category && this.newDonation.description) {
      const donation = {
        ...this.newDonation,
        id: this.myDonations.length + 1,
        beneficiary: this.selectedBeneficiary.name
      };
      this.myDonations.push(donation);
      this.showingDonationForm = false;
      this.selectedBeneficiary = null;
      this.newDonation = {
        id: 0,
        name: '',
        image: '',
        category: '',
        description: '',
        donor: 'Usuario Actual',
        date: new Date().toISOString().split('T')[0],
        beneficiaryRequests: 0
      };
      // You might want to add a success message or notification here
    } else {
      // Handle validation errors
      console.error('Please fill all required fields');
    }
  }
  updateVisibleBeneficiaries() {
    this.visibleBeneficiaries = [
      this.users[(this.currentBeneficiaryIndex - 1 + this.users.length) % this.users.length],
      this.users[this.currentBeneficiaryIndex],
      this.users[(this.currentBeneficiaryIndex + 1) % this.users.length]
    ];
    this.selectedBeneficiary = this.visibleBeneficiaries[1];
  }

  previousBeneficiary() {
    this.currentBeneficiaryIndex = (this.currentBeneficiaryIndex - 1 + this.users.length) % this.users.length;
    this.updateVisibleBeneficiaries();
  }

  nextBeneficiary() {
    this.currentBeneficiaryIndex = (this.currentBeneficiaryIndex + 1) % this.users.length;
    this.updateVisibleBeneficiaries();
  }

  cancelBeneficiarySelection() {
    this.showingBeneficiarySelection = false;
    this.selectedDonation = null;
    this.selectedDeliveryType = '';
  }
  finalizeDonationProcess() {
    this.showingBeneficiarySelection = false;
    this.showingLocationSelection = false;
    this.selectedDonation = null;
    this.selectedDeliveryType = '';
    this.selectedBeneficiary = null;
  }
  
  toggleNotifications() {
    this.notificationsVisible = !this.notificationsVisible;
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

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newDonation = {
      id: 0,
      name: 'Nueva donación',
      image: '',
      category: '',
      description: '',
      donor: 'Usuario Actual',
      date: new Date().toISOString().split('T')[0],
      beneficiaryRequests: 0
    };
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newDonation.image = e.target.result;
        this.errorMessageImage = '';
      };
      reader.readAsDataURL(file);
    }
  }

  clearDescriptionError() {
    this.errorMessageDescription = '';
  }

  clearDonationName() {
    this.newDonation.name = '';
  }

  clearNameError() {
    this.errorMessageName = '';
  }

  clearImage(event: Event) {
    event.stopPropagation();
    this.newDonation.image = '';
  }

  saveDonation() {
    if (this.newDonation.name === '' || this.newDonation.name === 'Nueva donación') {
      this.errorMessageName = 'Por favor, ingresa un nombre para la donación.';
      return;
    }
    if (!this.newDonation.image) {
      this.errorMessageImage = 'Por favor, selecciona una imagen.';
      return;
    }
    if (!this.newDonation.category) {
      this.errorMessageCategory = 'Por favor, agrega una categoría.';
      return;
    }
    if (!this.newDonation.description) {
      this.errorMessageDescription = 'Por favor, agrega una descripción.';
      return;
    }
    
    this.donations.push({ ...this.newDonation, id: this.donations.length + 1 });
    this.closeModal();
  }

  cancelDonation() {
    this.closeModal();
  }



  continueToDonation() {
    this.selectedBeneficiary = null;
    this.isDonationFormVisible = true;
    this.showingDonationForm = true;
  }

  cancel() {
    this.selectedBeneficiary = null;
  }
  showBeneficiaryDetails(user: any) {
    if (!this.showingBeneficiarySelection && !this.showingLocationSelection) {
      this.selectedBeneficiary = user;
    }
  }

  filteredUsers() {
    if (!this.searchTerm) {
      return this.users;
    }
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}