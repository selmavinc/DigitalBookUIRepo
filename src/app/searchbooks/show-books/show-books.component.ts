import { Component, Input, OnInit } from "@angular/core";
import { Book } from "src/app/Model/bookmodel";

@Component({
    selector : 'app-show-books',
    templateUrl:'./show-books.component.html'
})
export class ShowBooksComponent implements OnInit{
   
    @Input() searchResult:any;

    book :any;
    bookID : any;
    display : string = 'none';
    ModalTitle="Purchase Book";

    constructor(){}

    ngOnInit(): void {
    }
    purchaseClick(item:Book){
        
        this.book =item; 
        this.bookID= this.book.bookId;
        this.display= 'block';
    }
    onCloseHandled() {
        this.display = "none";
      }

}