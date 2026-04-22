import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { User } from '../model/user.model';

@Component({
  selector: 'app-verif-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verif-email.html',
  styleUrl: './verif-email.css'
})
export class VerifEmail implements OnInit {
  code: string = '';
  user: User = new User();
  err: string = '';

  constructor(private authService: Auth, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.registredUser;
  }

  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert('Email validé avec succès');
        this.authService.login(this.user).subscribe({
          next: (data) => {
            let jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      },
      error: (err: any) => {
        if (err.error.errorCode === 'INVALID_TOKEN')
          this.err = 'Code invalide!';
        if (err.error.errorCode === 'EXPIRED_TOKEN')
          this.err = 'Code a expiré!';
      }
    });
  }
}