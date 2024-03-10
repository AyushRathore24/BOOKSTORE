
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BooksComponent } from './books/books.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { SubAdminComponent } from './sub-admin/sub-admin.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';



/**
 * added routing for the navigation purposes
 */
const routes: Routes = [
  { 
    path:'',
    component: HomeComponent
  },
  { 
    path:'home',
    component: HomeComponent
  },
  { 
    path:'subadmin',
    component: SubAdminComponent
  },
   {
    path:'login',
    component:LoginComponent
  },

  {
    path:'books',
    component:BooksComponent,
    canActivate:[AuthGuard]
  },{
    path:'register',
    component:RegisterComponent
  },
   {
    path:'forget',
    component:ForgetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
