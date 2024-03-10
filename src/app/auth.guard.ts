// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  /**
   * injected dependencies in constructor
   * @param authService 
   * @param router 
   */
  constructor(private authService: AuthService, private router: Router) {}

 
/**
 * used can active to protect navigation to a certain route(books)
 * @returns 
 */
  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      return true
    } 
    else if(this.authService.isUser,this.authService.isSubAdmin){
      return true}
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}
