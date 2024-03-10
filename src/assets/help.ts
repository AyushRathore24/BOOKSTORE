
  login(): void {
 this.authService.getUsers().subscribe((res)=>{
  console.log(res);
    this.regData = res
this.regData.forEach((each)=>{
if(this.showForm.controls['username'].value === each.email && this.showForm.controls['password'].value === each.password){
  this.authService.isLoggedIn=true
console.log(each.role);
  if(each.role=='subadmin'){
    this.authService.isSubAdmin=true;
    localStorage.setItem('person',JSON.stringify({
      isLoggedin:true,
      isSubAdmin:true
    }));
  }else
  {  this.authService.isSubAdmin=true;
  
    localStorage.setItem('person',JSON.stringify({
      isLoggedin:true,
      isUser:true
    }));
  
  }
 
this.router.navigate(['/books']);
}

})})
  
 if (this.authService.login(this.showForm.value.username,this.showForm.value.password)) {
      alert("SuccessFully logged in....")
      if(this.showForm.value.username=== 'user' ){
        this.authService.isLoggedIn=true
      this.router.navigate(['/books']);
      localStorage.setItem('person',JSON.stringify({
        isLoggedIn:true,
        isAdmin:true,
       }))}
      // else{
      //   this.authService.isUser=true;
      //   this.authService.isLoggedIn=true;
      //   this.router.navigate(['/books']);
     
      // }
       
        

    } else {
      this.errorMessage = 'Invalid username or password';
    }
}