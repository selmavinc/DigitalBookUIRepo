import { Component, Input, OnInit } from '@angular/core';
import { purchase } from '../Model/purchasemodel';
import { DigitalBooksService } from '../services/digitalbooks.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  @Input() bookID:any;
  bookHistoryList : any =[];
  display = "none";
  bookName:any;
  message:any;

  objpurchase : purchase={
    PurchaseId: 0,
    EmailId : '',
    BookId : 0,
    PaymentMode : '',
    IsRefunded : 'Y'
  }
  constructor(private services: DigitalBooksService) { }

  ngOnInit(): void {
    
    let values = JSON.parse(localStorage.getItem("emailID") || '');
    if(values != null)
    {
      this.objpurchase.EmailId=values;
      this.loadBookHistory();
    }
    
  }

  //  getBookName(){
  //    
  //    console.log(this.bookID);
  //   this.services.GetbookName(this.bookID).subscribe(
  //     response => {
  //       
  //       console.log(response);
  //       this.bookName=response;
  //     }
  //   )
  // }

  loadBookHistory(){
    
    this.services.GetBookHistory(this.objpurchase.EmailId).subscribe(
      response => {
        console.log(response);
        
        this.bookHistoryList = response;
        this.display = "block";
      }
    )
  }



  onSubmit(){
    
    this.objpurchase.BookId = this.bookID;
    this.services.PurchaseBook(this.objpurchase).subscribe(
      response => {
        //  alert("Book Purchased Successfully.");
        this.message=response;
         alert(this.message.message); 
        //  if(this.message.message != 'Already Purchased')
        //  {
          
        //  }
      this.loadBookHistory(); }
    )
  }
  onFocusOutEvent(event: any){
    this.loadBookHistory();
 }
 
}
