import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any  = {    
      "userName": "",
      "password": ""    
  };

  users = [
    { userName: 'admin', password: 'admin', role:'admin' },
    { userName: 'user', password: 'user', role:'employee' },
  ];

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
       const foundUser = this.users.find(user => user.userName === this.loginObj.userName &&
        user.password === this.loginObj.password);

    if (foundUser) {     
      localStorage.setItem('role', foundUser.role);      
      if (foundUser.role === 'admin') {
        console.log('Sikeres bejelentkezés admin:', foundUser.role);
        this.router.navigate(['dashboard']);
      } else {
        console.log('Sikeres bejelentkezés user:', foundUser.role);
        this.router.navigate(['dashboard']);
      }
    } else {
      alert('Hibás felhasználónév vagy jelszó');
    }
  }

}

