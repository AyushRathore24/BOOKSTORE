import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo2';
  regForm!: FormGroup;
  
  constructor(public authService:AuthService,private router:Router){}
  
  ngOnInit(): void {
   
  }

  logout(): void {
    this.authService.logout();

    // Redirect to login page or any other desired route
    // For example:
    this.router.navigate(['/login']);
  }
}
