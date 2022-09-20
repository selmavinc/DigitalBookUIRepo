import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../Model/bookmodel';
import { DigitalBooksService } from '../services/digitalbooks.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  @Input() booksID:any;
  addbookForm! : FormGroup;
  isValidFormSubmitted = false;

  CategoryList:any[] =[];
  message:any;
  books:Book[] = [];
  book : Book = {
    bookId: 0,
    bookName : '',
    categoryId : 0,
    price : 0,
    publisher : '',
    userId : 0,
    publishedDate : new Date(),
    description : '',
    active : true
  }

  GetUserID(){
    
    console.log(this.booksID);
    let values = JSON.parse(localStorage.getItem("user") || '');
    this.book.userId = values;
  }

  onSelected(value:string): void {
		this.book.categoryId = Number.parseInt(value);
	}

  constructor(private service: DigitalBooksService,public router:Router, private fb: FormBuilder) {
    
   }

  myForm() {
    debugger;
    this.isValidFormSubmitted = false;
     
    const selectedDate = { date: { year: 2022, month: 9, day: 21 } };
    this.addbookForm = this.fb.group({
      BookName:['', Validators.required ],
      categoryies:['', Validators.required ],
      price: [0, Validators.required],
      // price:[0, Validators.required ],
      Publisher:['', Validators.required],
      Desc:['', Validators.required],
      datepicker: ['dd-mm-yyyy', [Validators.required]]
    });
    
    
 }

  ngOnInit(): void {
    
    this.GetUserID();
    this.loadCategoryList();
    this.myForm();
    // console.log(history.state);
    // let values = JSON.parse(localStorage.getItem("emailID") || '');
    // if(values != null)
    // {
    //   
    //   var res = this.loadBooks();
      
    // }
  }

  loadBooks(){
    this.service.GetBookDetail(this.booksID).subscribe(
      response => {this.books = response;}
    );
    }

  loadCategoryList() {
    this.service.GetAllCategory()
    .subscribe(
      response => { this.CategoryList = response}
    );
  }

  clearControls(){
    this.book.bookId= 0,
    this.book.bookName = '',
    this.book.categoryId = 0,
    this.CategoryList = [],
    this.book.price = 0,
    this.book.publisher = '',
    this.book.userId = 0,
    this.book.publishedDate = new Date(),
    this.book.description = '',
    this.book.active = true
   }

  onSubmitClick(){
    debugger;
    if (this.addbookForm.invalid) {
      this.isValidFormSubmitted = false;
   }
   else
   {
    this.isValidFormSubmitted = true;
   }
   if(this.isValidFormSubmitted)
   {
    // this.book.bookId = this.booksID;
    console.log(this.booksID);
    console.log(this.book);
    if(this.booksID==null)
    {
      this.service.SaveBook(this.book).subscribe(
      response => { 
        this.message=response;
         alert(this.message.message); 
        //  this.clearControls();
        //  this.GetUserID();
        //  this.loadCategoryList();
        window.location.reload();
         this.router.navigate([`${'author'}`]);
        // this.router.navigate(['/author']);     
    }
    );
    }
    else
    {
      console.log("Edit");
      this.booksID=null;
    }
  }
    
  }

}
