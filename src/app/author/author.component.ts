import { Component, OnInit } from '@angular/core';
import { DigitalBooksService } from '../services/digitalbooks.service';
import { Router } from '@angular/router';
import { Book } from "src/app/Model/bookmodel";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  book :any;
  bookID : any;
  searchResult: any;
  ModalTitle:string="";
  display = "none";
  userID : string ='';
  message:any;
  constructor(private service:DigitalBooksService,public router:Router) { }

  ngOnInit(): void {
    
    this.service.CheckUserLoggedInOrNot();    
    this.GetUserID();
    this.loadBooks();    
    }

  GetUserID(){
    let values = JSON.parse(localStorage.getItem("user") || '');
    this.userID = values;
  }
  
  loadBooks(){
    
    this.service.SearchBooksforAuthor('0',this.userID,0).subscribe(
      response => {this.searchResult = response; console.log(this.searchResult);}
    );
    }

    refreshComponent(){
      
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
   }

    EditClick(item:Book){
      debugger;
      // this.ModalTitle ="Edit Book";
      this.book =item; 
      this.bookID= this.book.bookId;
      // this.display= 'block';
      this.refreshComponent();
      // this.router.navigate(['/editbook'], { queryParams: { bookId:this.bookID }});
      // this.router.navigate(['/author']);  
  }

  EnableClick(item:Book){
    
    this.book =item; 
    this.bookID= this.book.bookId;
  
    this.service.EnableBook(this.bookID,this.userID).subscribe(
      response => {
        
        this.message=response;
         alert(this.message.message); 
         this.refreshComponent();
      }
    );
    
    
}

DisableClick(item:Book){
  
  this.book =item; 
  this.bookID= this.book.bookId;
  
  this.service.DisableBook(this.bookID,this.userID).subscribe(
    response => {
      
      this.message=response;
         alert(this.message.message); 
         this.refreshComponent();
      }
  );
  
}

    openModal() {
      this.ModalTitle ="Add Book";
      this.display = "block";
    }
  
    onCloseHandled() {
      this.display = "none";
      this.refreshComponent();
    }
}
