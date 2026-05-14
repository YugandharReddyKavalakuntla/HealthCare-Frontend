import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Token {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): any {
    const token = this.getToken();

    if (!token) return null;

    return jwtDecode(token);
  }

  getRole(): string | null {
    const decoded = this.getDecodedToken();

    if (!decoded) return null;

    return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  logout() {
    localStorage.removeItem('token');
  }
}
