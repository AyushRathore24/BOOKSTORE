import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBook } from '../Ibook';
import { Iregister } from '../Iregister';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  bookForm:FormGroup;


  tomain=true;
  toshow=false;
  toEdit=false;
  toAdd=false;
  toaddnewbook=true;
  bookSubscription!: Subscription; // Declare bookSubscription as a Subscription


  bookObj :IBook ={
    id:'',
    title: '',
    author: '',
    publishedyear:'',
    genre:''
  }
 toggle(){
  this.bookForm.reset();
  this.toshow=true;
  this.tomain=false;
  this.toAdd=true;
  this.toEdit=false;
  this.toaddnewbook=false;

 }
  constructor(public authService: AuthService, private router: Router,private fb:FormBuilder) {
    this.bookForm = this.fb.group({
      id:[''],
      title:['',Validators.required],
      author:['',Validators.required],
      publishedyear:['',Validators.required],
      genre:['',Validators.required],
      
    })
  

  }

  ngOnInit(): void {

    this.getAllBooks();
  }

  bookData:any = [];
  bookDetails:any;
  // book-list.component.ts
  
  addBook(){
    this.toAdd=false;
    this.toshow=false;  
    this.tomain=true;
    bookSubscription: Subscription; // Declare bookSubscription as a Subscription

 
    const { value } = this.bookForm
    console.log(value);
    this.bookObj.id='',
    this.bookObj.title=value.title,
    this.bookObj.author=value.author,
    this.bookObj.publishedyear=value.publishedyear
    this.bookObj.genre=value.genre


    this.authService.addNote(this.bookObj).then((book)=>{
      if(book){
        alert("book added successfully");
        
      }
    })
    this.toaddnewbook=true;
    this.toEdit=true;
  }

 getAllBooks(){
   this.bookSubscription = this.authService.getBooks().subscribe((res:IBook[])=>{
   console.log(res);
    this.bookData =res;
  })}
     




logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  //for manual
  // deleteBook(id: number, i: number): void {
  //   this.books.splice(i, 1);
  //   // this.books = this.books.filter(book => book.id !== id);
  // }

deleteBook(book:IBook){
  let decision= confirm("Are Sure want to delete this Book ? ");
  if(decision ==true){
    this.authService.deleteBook(book);
  }
}



getAllDetails(book:IBook){
  this.toaddnewbook=false;
 const formValue = this.bookForm.patchValue(book)
  this.toAdd=false;
  this.toshow=true;
  this.toEdit=true;


  this.tomain=false;
 

 console.log(book)

}

toggleforCancel(){
  this.toaddnewbook=true;
  this.toshow=false;
  this.tomain=true;
  this.bookForm.reset();
  this.toAdd=false;
  this.toEdit=false;
}





//update data
updateBook() {

  const { value } = this.bookForm;
 console.log(value);
 
  // Create an updated book object

  (this.bookObj.id=value.id),
  (this.bookObj.title=value.title),
  (this.bookObj.author=value.author),
  (this.bookObj.publishedyear=value.publishedyear),
  (this.bookObj.genre=value.genre)

  this.authService.updateBook(value.id,this.bookObj).then(()=>{
    alert("book Updated Successfully");
  });
  // Reset the form and hide the edit form
  
  this.tomain=true;
  this.toshow=false;
  this.toaddnewbook=true;
}
 searchText:string = '';

 onSearchTextEntered(searchValue: string){
  this.searchText = searchValue;
 }


 ngOnDestroy(): void {
  if (this.bookSubscription) {
    this.bookSubscription.unsubscribe(); // Unsubscribe from the observable when the component is destroyed
  }
}

}
