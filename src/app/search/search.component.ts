import { Component, EventEmitter,  Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {

  constructor() { }

 

 /**
  *for the searching a on the given input passing emit events to another component.
  *
  * @type {string}
  * @memberof SearchComponent
  */
 enteredSearchValue:string = '';

 @Output()
 searchTextChanged : EventEmitter<string> = new EventEmitter<string>();

 onSearchTextChanged(){
 this.searchTextChanged.emit(this.enteredSearchValue);
 
 }
 
 }


 
 
 
