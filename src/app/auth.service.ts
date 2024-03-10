
import { Injectable } from '@angular/core';   //for the root
import { IBook } from './Ibook';              //used interface for the  storing form values
import { Firestore, collectionData } from '@angular/fire/firestore';    //used for angular fire and collection table
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';  //fireabse methods for CRUD
import { Observable } from 'rxjs';     //Observable
import { Router } from '@angular/router';   //using router for navigation
import { Iregister } from './Iregister';    //used this interface for the storing register email and password 
// import { AngularFireAuth } from '@angular/fire/compat/auth'
@Injectable({
  providedIn: 'root',
})
export class AuthService  { 

 /**
  *
  * used this variable to assign  roles
  * @type {boolean}
  * @memberof AuthService
  */
 isLoggedIn: boolean = false;
 isAdmin: boolean = false;
 isUser :boolean = false
  isSubAdmin:boolean =false;




constructor(private fs:Firestore,
  private router: Router,
  // private afAuth: AngularFireAuth
  ){
  const storeduser = localStorage.getItem('person')
  if(storeduser){
    const person = JSON.parse(storeduser)
    this.isLoggedIn = true
    this.isAdmin= person.isAdmin,
    this.isUser = person.isUser,
    this.isSubAdmin = person.isSubAdmin}}

/**
 * Authenticating by existing email and  password
 * @param username 
 * @param password 
 * @returns 
 */
login(username:any, password:any): boolean {
    
    if (username === 'user' && password === 'password') {
      this.isLoggedIn = true;
      this.isAdmin = true;
      this.isUser=false;
      this.isSubAdmin = false;
      localStorage.setItem('password',JSON.stringify({ 
      }))
      return true;
    }
  return false;
    }
  
  


/**
 * when any roles logged out
 */
  logout(): void {

    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isUser = false;
    this.isSubAdmin=false;

    localStorage.removeItem('person')
  }

 
/**
 * getting data from fire(firebase) from  Book collection
 * return promise used because we want to add single data at one time
 * @param book 
 * @returns 
 */
addNote(book:IBook){
  book.id = doc(collection(this.fs,'id')).id
  return addDoc(collection(this.fs,'Books'),book)
}

/**
 * used observable because we can access multiple data at a time 
 * @returns 
 */
getBooks():Observable<IBook[]>{
  let notesRef = collection(this.fs,'Books')
  return collectionData(notesRef,{idField:'id'}) as Observable<IBook[]>

}

/**
 *  taken id for the reference
 * @param book return promise used because we want to delete single data at one time
 * @returns 
 */
deleteBook(book : IBook){
  let docRef = doc(this.fs,`Books/${book.id}`);
  return deleteDoc(docRef)
}

/**
 * taken id for the reference
 * @param book return promise used because we want to update single data at one time
 * @param books 
 * @returns 
 */
updateBook(book:IBook,books:any){
  let docRef = doc(this.fs,`Books/${book}`);
  return updateDoc(docRef,books)
}

/**
 * for the NewUser for register i.e, they can register by any email,password
 * @param username 
 * @param password 
 * @returns 
 */
signin(username:any,password:any):boolean{
  if(username !== '' && password !== ''){
    this.isSubAdmin=false;
    this.isAdmin=false;
    this.isUser = true
    this.isLoggedIn = true
    localStorage.setItem('person',JSON.stringify({ 
      isUser:true
    }))
    return true
  }else{
    return false
  }
}
/**
 * for adding newuser to our database for easy retrival of their information
 * @param addreg 
 * @returns 
 */
adduser(addreg:Iregister){
  return addDoc(collection(this.fs,'Registration'),addreg)
}

/**
 * for accessing the email and password of that register person from  that databases 
 * @returns 
 */
getUsers():Observable<Iregister[]>{
  let notesRef = collection(this.fs,'Registration')
  
  return collectionData(notesRef,{idField:'id'}) as Observable<Iregister[]>
}

updateBookField(bookId: string, fieldName: string, newValue: string): Promise<void> {
  const bookDocRef = doc(this.fs, 'Registration', bookId);
  return updateDoc(bookDocRef, { [fieldName]: newValue });

}


}