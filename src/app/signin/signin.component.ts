import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ShowBooksComponent } from '../searchbooks/show-books/show-books.component';
import { DigitalBooksService } from '../services/digitalbooks.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  response :any;
  token : string="";
  usernameC:any;
  passwordC:any;
  loginForm! : FormGroup;
  isValidFormSubmitted = false;
  constructor(private service: DigitalBooksService,public router:Router, private fb: FormBuilder) { 
    
  }

  myForm() {
    debugger;
    this.isValidFormSubmitted = false;
     
     
    this.loginForm = this.fb.group({
      UserName:['', Validators.required ],
      PassWord:['', Validators.required]
    });
    
    
 }

  ngOnInit(): void {
    this.myForm();
  }

  login(){
    debugger;
    

    if (this.loginForm.invalid) {
      this.isValidFormSubmitted = false;
   }
   else
   {
    this.isValidFormSubmitted = true;
   }
   if(this.isValidFormSubmitted)
    {
    var val = {
      userName : this.usernameC,
      password : this.passwordC
    }
    this.service.Login(val).subscribe(
      response => {  this.response = response; 
        
        if(this.response.token != ""){
          
          console.log(this.response);
           // store jwt token in local storage to keep user logged in between page refreshes
           localStorage.setItem('token', this.response.token);
           localStorage.setItem('user', JSON.stringify(this.response.user));
           localStorage.setItem('emailID', JSON.stringify(this.response.emailID));
           localStorage.setItem('UserName', JSON.stringify(this.response.username));
           let headerComponentObj = new HeaderComponent(this.service,this.router);
           headerComponentObj.ngOnInit();
          

          // this.nameEmitter.emit(true);  
          if(this.response.role == "Author") //This is Author
          {
          // this.router.navigate(['/author']);  
          
          this.router.navigate([`${'author'}`]);
          
          }
          else{ 
            // This is Reader
            // this.router.navigate(['/reader']);  
            
            this.router.navigate([`${'reader'}`]);
            
          }
          

        } 
        else
        {
           alert("Incorrect Username and Pasword");
        }
      }
    )   
    
    }

  }
}
