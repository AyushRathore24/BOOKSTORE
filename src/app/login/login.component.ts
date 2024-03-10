import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iregister } from '../Iregister';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 regData:Iregister[]=[];
  errorMessage: string = '';
 showForm!:FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private fb:FormBuilder
    ){  }

    ngOnInit(): void {
    this.showForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
    this.authService.isLoggedIn=false
    localStorage.removeItem('person')
  }

  subad='subadmin';
  user='user';
forget=false;

  login(): void {
    this.authService.getUsers().subscribe((res)=>{
     console.log(res);
       this.regData = res
   this.regData.forEach((each)=>{
   if(this.showForm.controls['username'].value === each.email && this.showForm.controls['password'].value === each.password  &&  this.subad === each.role) {
     this.authService.isLoggedIn=true
       this.authService.isSubAdmin=true;
       this.router.navigate(['books']);
       localStorage.setItem('person',JSON.stringify({
         isLoggedin:true,
         isSubAdmin:true
       }));}
     else if(this.showForm.controls['username'].value === each.email && this.showForm.controls['password'].value === each.password && this.user === each.role){
   
     
       this.authService.isLoggedIn=true 
       this.authService.isUser= true
       this.router.navigate(['books'])
       localStorage.setItem('person',JSON.stringify({
        isLoggedIn:true,
        isUser:true,
   
       }));
   }
    else if (this.authService.login(this.showForm.value.username,this.showForm.value.password)) {
      
           this.authService.isLoggedIn=true
           this.authService.isAdmin=true
         this.router.navigate(['books']);
         localStorage.setItem('person',JSON.stringify({
           isLoggedIn:true,
           isAdmin:true,
          }))
    }   else if(this.showForm.controls['username'].value === each.email && this.showForm.controls['password'].value != each.password ){
   console.log(+"----------------");
   
     
      this.authService.isLoggedIn=false 
     this.forget=true;
      
  }
     else {
         this.errorMessage = 'Invalid username or password';
       }
     }) 
   })}

   forgetbtn(){
    this.router.navigate(['forget']);

   }
//   login(): void {
//  this.authService.getUsers().subscribe((res)=>{
//   console.log(res);
//     this.regData = res
// this.regData.forEach((each)=>{
// if(this.showForm.controls['username'].value === each.email && this.showForm.controls['password'].value === each.password){
//   this.authService.isLoggedIn=true
// console.log(each.role);
//   if(each.role=='subadmin'){
//     this.authService.isSubAdmin=true;
//     localStorage.setItem('person',JSON.stringify({
//       isLoggedin:true,
//       isSubAdmin:true
//     }));
//   }else
//   {  this.authService.isSubAdmin=true;
  
//     localStorage.setItem('person',JSON.stringify({
//       isLoggedin:true,
//       isUser:true
//     }));
  
//   }
 
// this.router.navigate(['/books']);
// }

// })})
  
//  if (this.authService.login(this.showForm.value.username,this.showForm.value.password)) {
//       alert("SuccessFully logged in....")
//       if(this.showForm.value.username=== 'user' ){
//         this.authService.isLoggedIn=true
//       this.router.navigate(['/books']);
//       localStorage.setItem('person',JSON.stringify({
//         isLoggedIn:true,
//         isAdmin:true,
//        }))}
//       // else{
//       //   this.authService.isUser=true;
//       //   this.authService.isLoggedIn=true;
//       //   this.router.navigate(['/books']);
     
//       // }
       
        

//     } else {
//       this.errorMessage = 'Invalid username or password';
//     }
//   }
  
  // logout(): void {
  //   this.authService.logout();
  //   this.authService.isSubAdmin=false
  //   this.authService.isLoggedIn=false
  //   this.router.navigate(['/login']);
  //   localStorage.removeItem('person')
  // }
 
}
