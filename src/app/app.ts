import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet,RouterLink, Router } from '@angular/router';
import { Auth } from './services/auth';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('Joueurs');
  constructor (public authService: Auth, private router: Router) {}
  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken() == null || this.authService.isTokenExpired())
      this.router.navigate(['/login']);
  }
    
  onLogout(){
    this.authService.logout();
  }
    
}
