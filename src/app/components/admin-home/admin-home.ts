import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-md">
        <div class="p-4">
          <h2 class="text-2xl font-bold text-green-600">Admin Panel</h2>
        </div>
        <nav class="mt-6">
          <a (click)="setActiveSection('reportes')" [class.bg-green-500]="activeSection === 'reportes'" [class.text-white]="activeSection === 'reportes'" class="block py-2 px-4 text-gray-600 hover:bg-green-500 hover:text-white cursor-pointer">Reportes</a>
          <a (click)="setActiveSection('donaciones')" [class.bg-green-500]="activeSection === 'donaciones'" [class.text-white]="activeSection === 'donaciones'" class="block py-2 px-4 text-gray-600 hover:bg-green-500 hover:text-white cursor-pointer">Donaciones</a>
          <a (click)="setActiveSection('sedes')" [class.bg-green-500]="activeSection === 'sedes'" [class.text-white]="activeSection === 'sedes'" class="block py-2 px-4 text-gray-600 hover:bg-green-500 hover:text-white cursor-pointer">Sedes</a>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-8 overflow-auto">
        <header class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Donatelo</h1>
          <button (click)="toggleProfileModal()" class="text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </header>

        <div class="bg-white shadow-md rounded-lg p-6">
          <div *ngIf="activeSection === 'reportes'">
            <h2 class="text-xl font-semibold mb-4">Generar Reporte</h2>
            <form (ngSubmit)="generateReport()">
              <div class="mb-4">
                <label for="reportType" class="block text-sm font-medium text-gray-700">Tipo de Reporte</label>
                <select id="reportType" [(ngModel)]="reportType" name="reportType" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                  <option value="donaciones">Donaciones</option>
                  <option value="usuarios">Usuarios</option>
                  <option value="sedes">Sedes</option>
                </select>
              </div>
              <div class="mb-4">
                <label for="dateRange" class="block text-sm font-medium text-gray-700">Rango de Fechas</label>
                <input type="date" id="dateRange" [(ngModel)]="dateRange" name="dateRange" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
              </div>
              <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Generar Reporte
              </button>
            </form>
          </div>

          <div *ngIf="activeSection === 'donaciones'">
            <h2 class="text-xl font-semibold mb-4">Donaciones</h2>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donante</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripcion</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let donation of donations">
                  <td class="px-6 py-4 whitespace-nowrap">{{ donation.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ donation.donor }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ donation.categoria }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ donation.descripcion }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ donation.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div *ngIf="activeSection === 'sedes'">
            <h2 class="text-xl font-semibold mb-4">Gestionar Sedes</h2>
            <form (ngSubmit)="addLocation()" class="mb-6">
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label for="locationName" class="block text-sm font-medium text-gray-700">Nombre de la Sede</label>
                  <input type="text" name="locationName" id="locationName" [(ngModel)]="newLocation.name" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="sm:col-span-3">
                  <label for="locationAddress" class="block text-sm font-medium text-gray-700">Dirección</label>
                  <input type="text" name="locationAddress" id="locationAddress" [(ngModel)]="newLocation.address" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="sm:col-span-6">
                  <label for="locationImage" class="block text-sm font-medium text-gray-700">Imagen de la Sede</label>
                  <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <div class="flex text-sm text-gray-600">
                        <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                          <span>Subir un archivo</span>
                          <input id="file-upload" name="file-upload" type="file" class="sr-only" (change)="onFileSelected($event)">
                        </label>
                        <p class="pl-1">o arrastrar y soltar</p>
                      </div>
                      <p class="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Agregar Sede
                </button>
              </div>
            </form>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let location of locations">
                  <td class="px-6 py-4 whitespace-nowrap">{{ location.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ location.address }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <img *ngIf="location.image" [src]="location.image" alt="Sede" class="h-10 w-10 rounded-full">
                    <span *ngIf="!location.image">No imagen</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <!-- Profile Modal -->
      <div *ngIf="showProfileModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" (click)="toggleProfileModal()">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" (click)="$event.stopPropagation()">
          <div class="mt-3 text-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Editar Perfil</h3>
            <div class="mt-2 px-7 py-3">
              <form (ngSubmit)="updateProfile()">
                <div class="mb-4">
                  <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                  <input type="text" name="name" id="name" [(ngModel)]="profile.name" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="mb-4">
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" id="email" [(ngModel)]="profile.email" class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
                  Actualizar Perfil
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
export class AdminHome {
  activeSection: 'reportes' | 'donaciones' | 'sedes' = 'reportes';
  showProfileModal = false;

  // Reports
  reportType = 'donaciones';
  dateRange = '';

  // Donations
  donations = [
    { id: 1, donor: 'Juan Pérez', categoria: 'Alimentos', descripcion: '5 kg', date: '2023-05-01' },
    { id: 2,    donor: 'María García', categoria: 'Ropa', descripcion: '3 prendas', date: '2023-05-02' },
    { id: 3, donor: 'Carlos Rodríguez', categoria: 'Comida', descripcion: '', date: '2023-05-03' },
  ];

  newLocation: { name: string; address: string; image: string } = { name: '', address: '', image: '/assets/imagenes/default-location.jpg' };
  locations: { name: string; address: string; image: string }[] = [
    { name: 'Sede Central', address: 'Calle Principal 123', image: '/assets/imagenes/userMen.jpg?height=40&width=40' },
    { name: 'Sede Norte', address: 'Avenida Norte 456', image: '/assets/imagenes/userMen.jpg?height=40&width=40' },
  ];

  // Profile
  profile = {
    name: 'Admin Istrador',
    email: 'admin@gmail.com'
  };

  setActiveSection(section: 'reportes' | 'donaciones' | 'sedes') {
    this.activeSection = section;
  }

  generateReport() {
    console.log(`Generating ${this.reportType} report for date: ${this.dateRange}`);
    // Implement report generation logic here
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newLocation.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addLocation() {
    if (this.newLocation.name && this.newLocation.address) {
      this.locations.push({
        name: this.newLocation.name,
        address: this.newLocation.address,
        image: this.newLocation.image || '/assets/imagenes/default-location.jpg'
      });
      this.newLocation = { name: '', address: '', image: '/assets/imagenes/default-location.jpg' };
      console.log('New location added:', this.locations[this.locations.length - 1]);
    } else {
      console.error('Location name and address are required');
    }
  }

  toggleProfileModal(): void {
    this.showProfileModal = !this.showProfileModal;
  }

  updateProfile() {
    console.log('Profile updated:', this.profile);
    this.toggleProfileModal();
  }
}