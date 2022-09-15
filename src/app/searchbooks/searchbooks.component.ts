import { Component, Input, OnInit } from '@angular/core';
import { DigitalBooksService } from '../services/digitalbooks.service';
// import { Category } from '../models/categorymodel';

@Component({
  selector: 'app-searchbooks',
  templateUrl: './searchbooks.component.html',
  styleUrls: ['./searchbooks.component.css']
})
export class SearchbooksComponent implements OnInit {

  CategoryList:any[] =[];
  AuthorList:any[] =[];
  searchResult: any;
  fullName ="";

  selectedCategory = '';
  selectedAuthor = '';
  price:any;
	onSelected(value:string): void {
		this.selectedCategory = value;
	}
  onSelectedAuthor(value:string): void {
		this.selectedAuthor = value;
	}

  onPriceChange(value:number): void {
    if(value !== null || value !== undefined)
		this.price = value;
	}

  constructor(private service: DigitalBooksService) { 
  }

  ngOnInit(): void {
    this.loadCategoryList();    
    this.loadAuthorList();
  }

  loadCategoryList() {
    this.service.GetAllCategory()
    .subscribe(
      response => { this.CategoryList = response}
    );
  }

  loadAuthorList(){
    this.service.GetAllAuthors()
    .subscribe(
      response => {this.AuthorList =response}
    );
  }

  searchBooks(){
    this.service.SearchBooks(this.selectedCategory,this.selectedAuthor,this.price).subscribe(
      response => {this.searchResult = response; console.log(this.searchResult);}
    );
    }

    bindBooksData(){
      
    }
}
