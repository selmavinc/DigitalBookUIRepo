import { Component, Input, OnInit } from '@angular/core';
import { purchase } from '../Model/purchasemodel';
import { DigitalBooksService } from '../services/digitalbooks.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
  purchaseForm! : FormGroup;
  isValidFormSubmitted = false;

  objpurchase : purchase={
    PurchaseId: 0,
    EmailId : '',
    BookId : 0,
    PaymentMode : '',
    IsRefunded : 'Y'
  }
  constructor(private services: DigitalBooksService ,public router:Router, private fb: FormBuilder) { 
    this.myForm();
  }

  ngOnInit(): void {
    
    let values = JSON.parse(localStorage.getItem("emailID") || '');
    if(values != null)
    {
      this.objpurchase.EmailId=values;
      this.loadBookHistory();
    }
    
  }

  myForm() {
    debugger;
    this.isValidFormSubmitted = false;
     
     
    this.purchaseForm = this.fb.group({
      Email: ['', [Validators.required, 
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")] ],
        paymentMode:['', Validators.required ]
    });
    
    
 }

  onSelected(value:string): void {
		this.objpurchase.PaymentMode = value;
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
    if (this.purchaseForm.invalid) {
      this.isValidFormSubmitted = false;
   }
   else
   {
    this.isValidFormSubmitted = true;
   }
   if(this.isValidFormSubmitted)
    {
    this.objpurchase.BookId = this.bookID;
    this.services.PurchaseBook(this.objpurchase).subscribe(
      response => {
        //  alert("Book Purchased Successfully.");
        this.message=response;
         alert(this.message.message); 
        //  if(this.message.message != 'Already Purchased')
        //  {
          
        //  }
      this.loadBookHistory();
      window.location.reload();
      if(this.objpurchase.EmailId !=null)
      {
        this.router.navigate([`${'reader-dashboard'}`]);

      }
      
     }
    )
      }
  }
  onFocusOutEvent(event: any){
    this.loadBookHistory();
 }
 
}
