import { Component, OnInit } from '@angular/core';
import { Book } from '../Model/bookmodel';
import { DigitalBooksService } from '../services/digitalbooks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reader-dashboard',
  templateUrl: './reader-dashboard.component.html',
  styleUrls: ['./reader-dashboard.component.css']
})
export class ReaderDashboardComponent implements OnInit {

    searchResult:any;

    book :any;
    bookID : any;
    display : string = 'none';
    ModalTitle="Purchase Book";
    readBookdisplay : string ="none";
    ModalReadBookTitle : string ="Read Book";
    description : string ="";
    userEmailID : string ="";

    constructor(private services:DigitalBooksService,public router:Router){}

    ngOnInit(): void {
      this.GetUserID();
      this.loadBookHistory();
    }
    purchaseClick(item:Book){
      
        this.book =item; 
        this.bookID= this.book.bookId;
        this.display= 'block';
    }
      refreshComponent(){
    
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
 }
    onCloseHandled() {
        this.display = "none";
        this.readBookdisplay ="none";
        // this.refreshComponent();
      }

      GetUserID(){
        let values = JSON.parse(localStorage.getItem("emailID") || '');
        this.userEmailID = values;
        console.log(this.userEmailID);
      }

      loadBookHistory(){
    
        this.services.GetBookListReader(this.userEmailID).subscribe(
          response => {this.searchResult = response; }
        )
      }

      readBookClick(item:Book){
        
        this.book =item; 
        this.description= this.book.description;
        this.readBookdisplay= 'block';
      }
}
