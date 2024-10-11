// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers = [
    { username: 'donor@example.com', password: 'donor123', type: 'donor' },
    { username: 'beneficiary@example.com', password: 'beneficiary123', type: 'beneficiary' },
    { username: 'admin@example.com', password: 'admin123', type: 'admin' }
  ];

  login(username: string, password: string): { success: boolean, userType?: string } {
    const user = this.mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      return { success: true, userType: user.type };
    }
    return { success: false };
  }
}