import { Component, Input, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Book } from '../Model/bookmodel';
import { DigitalBooksService } from '../services/digitalbooks.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {
  @Input() booksID:any;

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
    
    // console.log(this.booksID);
    let values = JSON.parse(localStorage.getItem("user") || '');
    this.book.userId = values;
  }

  onSelected(value:string): void {
		this.book.categoryId = Number.parseInt(value);
	}

  constructor(private service: DigitalBooksService,public router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    debugger;
    console.log(this.booksID);
    this.GetUserID();
    this.loadCategoryList();
  }

  

  // loadBooks(){
  //   this.service.GetBookDetail(this.data).subscribe(
  //     response => {this.books = response;}
  //   );
  //   }

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
    
    // // this.book.bookId = this.booksID;
    // console.log(this.data);
    // console.log(this.book);
    // if(this.data==null)
    // {
    //   this.service.SaveBook(this.book).subscribe(
    //   response => { 
    //     this.message=response;
    //      alert(this.message.message); 
    //      this.clearControls();
    //      this.GetUserID();
    //      this.loadCategoryList();
    //     // this.router.navigate(['/author']);     
    // }
    // );
    // }

    
  }

}
