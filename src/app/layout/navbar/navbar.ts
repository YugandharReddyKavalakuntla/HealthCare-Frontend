import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Token } from '../../core/services/token';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  role: string | null = '';

  constructor(
    private tokenService: Token,
    private router: Router,
  ) {
    this.role = this.tokenService.getRole();
  }

  logout() {
    this.tokenService.logout();

    this.router.navigate(['/login']);
  }
}
