import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-green-50">
      <header class="bg-white shadow-md">
        <div class="container mx-auto px-4 py-6 flex justify-between items-center">
          <div class="w-30 h-20 bg-green-200 flex items-center justify-center text-green-800 font-bold">
          <img src="/assets/imagenes/logo.jpg" alt="logo" style="max-width: 100%; max-height: 100%;">
          </div>
          <nav>
            <ul class="flex space-x-4">
              <li><a href="#about" class="text-green-600 hover:text-green-800">Acerca de</a></li>
              <li><a href="#how-it-works" class="text-green-600 hover:text-green-800">Cómo funciona</a></li>
              <li><a href="#contact" class="text-green-600 hover:text-green-800">Contacto</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main class="container mx-auto px-4 py-12">
        <section class="text-center mb-16">
          <h1 class="text-4xl font-bold text-green-800 mb-4">Bienvenido a Donatelo</h1>
          <p class="text-xl text-green-600 mb-8">Juntos podemos hacer la diferencia</p>
          <div class="flex justify-center space-x-4">
            <a routerLink="/donor-login" class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300">
              Donar ahora
            </a>
            <a routerLink="/beneficiary-login" class="bg-white text-green-500 border border-green-500 px-6 py-3 rounded-lg hover:bg-green-50 transition duration-300">
              Solicitar ayuda
            </a>
          </div>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="h-48 bg-green-200 flex items-center justify-center">
                <img src="https://st3.depositphotos.com/6462898/18901/i/450/depositphotos_189015208-stock-photo-men-holding-donate-box-clothes.jpg" alt="Imagen de donacion" class="w-full h-full object-cover">
              </div>
              <div class="p-4">
                <h3 class="text-xl font-semibold text-green-700 mb-2">Impacto de tu donación</h3>
                <p class="text-green-600"> La ropa que donas ayuda a familias en situación de vulnerabilidad a vestirse adecuadamente para cada temporada. Gracias a tus donaciones, muchas personas tendrán acceso a prendas de abrigo, ropa de trabajo y vestimenta diaria, mejorando su bienestar y dignidad. Juntos podemos hacer que más personas enfrenten los retos diarios con confianza y comodidad.</p>
              </div>
              
        </div>
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="h-48 bg-green-200 flex items-center justify-center">
                <img src="https://imagenes.eltiempo.com/files/image_1200_600/uploads/2023/12/25/6589e7158ab92.png" alt="Imagen de donacion" class="w-full h-full object-cover">
              </div>
              <div class="p-4">
                <h3 class="text-xl font-semibold text-green-700 mb-2">Impacto de tu donación</h3>
                <p class="text-green-600"> Tus donaciones de alimentos permiten que familias y personas necesitadas tengan acceso a comidas nutritivas. Cada donación ayuda a reducir el hambre y proporciona alimentos esenciales a quienes más lo necesitan. Con tu apoyo, estamos construyendo comunidades más fuertes y saludables, asegurando que nadie pase hambre.</p>
              </div>
              
        </div>
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="h-48 bg-green-200 flex items-center justify-center">
                <img src="https://www.ucr.ac.cr/medios/fotos/2013/IMG_2613-copia-00-nov-99.jpg" alt="Imagen de donacion" class="w-full h-full object-cover">
              </div>
              <div class="p-4">
                <h3 class="text-xl font-semibold text-green-700 mb-2">Impacto de tu donación</h3>
                <p class="text-green-600">Los útiles escolares que donas son una herramienta clave para el futuro de muchos niños. Gracias a tu generosidad, estudiantes de escasos recursos pueden acceder a cuadernos, mochilas, lápices y otros materiales esenciales para su educación. Cada donación abre la puerta a mejores oportunidades académicas y un futuro lleno de posibilidades.</p>
              </div>
              
        </div>
            
        </section>

        <section class="text-center mb-16">
          <h2 class="text-3xl font-bold text-green-800 mb-4">¿Cómo funciona?</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (step of ['Regístrate', 'Elige una persona', 'Haz tu donación']; track step; let i = $index) {
              <div class="bg-white rounded-lg shadow-md p-6">
                <div class="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  {{i + 1}}
                </div>
                <h3 class="text-xl font-semibold text-green-700 mb-2">{{step}}</h3> 
              </div>
            }
          </div>
        </section>

        <section class="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 class="text-3xl font-bold text-green-800 mb-4 text-center">Acceso para funcionarios</h2>
          <div class="flex justify-center">
            <a routerLink="/admin-login" class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300">
              Ingresa aquí
            </a>
          </div>
        </section>
      </main>

      <footer class="bg-green-800 text-white py-8">
        <div class="container mx-auto px-4 text-center">
          <p>&copy; 2024 Donatelo. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `

    
    `
  ]
})
export class MainPageComponent {}