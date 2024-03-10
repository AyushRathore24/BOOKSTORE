import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Iregister } from '../Iregister';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // regData:any = [];

  regData:Iregister[]=[];
  regForm!:FormGroup;

  constructor(private fb:FormBuilder,private router:Router,private authService:AuthService) { }
  
   ngOnInit(): void {
    this.regForm = this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]*$/)]],
      phone:['',[Validators.required],Validators,Validators.pattern(/^[6-9]\d{9}$/)],

      
    });
    this.getAllUsers();
   

 
  }




  signupobj:Iregister ={
    id:'',
    email:'',
    password:'',
    role:''
  };


signup(){  
  // const{value} =this.regForm
  //   this.signupobj.email=value.email,
  //   this.signupobj.password=value.password



//  this.authService.adduser(this.signupobj).then(()=>{

//     alert("User added successfully");
//     this.regForm.reset();
  
// })
    if(this.authService.signin(this.regForm.controls['username'].value,this.regForm.controls['password'].value)){
    this.router.navigate(['/books'])
    window.alert("Registered Successfully")
    // console.log(this.regForm.value);
    
    }else{
      alert("please enter username and password")
    }
   
   
  }

    

  getAllUsers(){
    this.authService.getUsers().subscribe((res:Iregister[])=>{
      this.regData =res;
      console.log(res);

    })
  }
 }

