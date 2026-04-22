import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.html',
  styles: ``
})
export class Login {
  user = new User();
  err: number = 0;
  message: string = 'Login ou mot de passe erronés..';
  constructor(private authService: Auth, private router: Router) {}

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
        if (err.error?.errorCause === 'disabled')
          this.message = 'Utilisateur désactivé, veuillez contacter votre administrateur';
      }
    });
  }
}