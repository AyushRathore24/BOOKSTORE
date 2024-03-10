import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iregister } from '../Iregister';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm!: FormGroup;
  regData: Iregister[]=[];

  constructor(
    private router:Router,
    private fb:FormBuilder,
    private authService:AuthService,
    // private afAuth: AngularFireAuth
    ) { }
  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      otp:['',[Validators.required]],
      email:['',[Validators.required]],
      password1:['',[Validators.required]],
      password2:['',[Validators.required]]

    })
  }
  cancel(){
    this.router.navigate(['login']);

  }
  userObj:Iregister ={
    id: '',
    password: '',
    email: '',
    role: ''
  }


  passwordsDoNotMatch(): boolean {
    if(this.forgetForm.controls['password2'].touched){    
    const password1 =   this.forgetForm.controls['password1'].value;
    const password2 =this.forgetForm.controls['password2'].value;
    return password1 !== password2;}
    else
      return false;
  }
  // sendResetEmail(email: string) {
  //   return this.afAuth.sendPasswordResetEmail(email)
  //     .then(() => {
  //       console.log('Password reset email sent successfully');
  //     })
  //     .catch((error: any) => {
  //       console.error('Error sending password reset email:', error);
  //     });
  // }
  passreset(){
    if (this.forgetForm.valid && !this.passwordsDoNotMatch()) {
      this.authService.getUsers().subscribe((res)=>{
        console.log(res);
          this.regData = res
      this.regData.forEach((each)=>{
      if(this.forgetForm.controls['email'].value === each.email)   {
        // this.sendResetEmail(each.email);


        this.authService.updateBookField(each.id,'password',this.forgetForm.controls['password1'].value)
      .then(() => {
        alert('Password updated successfully');
      })
      .catch((error) => {
        console.error('Error updating field:', error);
      });


      this.forgetForm.reset();
        this.router.navigate(['login']);




        // const {value} = this.forgetForm
        // console.log(value);
        // this.userObj.id = '',
        // this.userObj.password= value.password1
        // this.userObj.email =value.email
        // this.router.navigate(['/books'])
        // this.authService.adduser(this.userObj).then((note)=>{
        //  if (note){
        //     alert("User Updated Sucessfully");
        //     this.forgetForm.reset()
        //  }
        // })
        // each.password=this.forgetForm.controls['password1'].value;
        // alert("Password Updated Successfully");
        // this.router.navigate(['login']);
      }  
  })})
}
}
}
