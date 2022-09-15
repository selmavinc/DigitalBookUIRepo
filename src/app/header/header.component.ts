import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigitalBooksService } from '../services/digitalbooks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  constructor(private service:DigitalBooksService,public router:Router) {
   
   }

   userName:string="";
  ModalTitle:string="";
  ActivateSignupComp :boolean=false;

  userLoggedIn :boolean =false;
  showSignInSignUp : boolean = true;

  display = "none";
  SignupModaldisplay ="none";
  openModal() {
    this.ModalTitle ="Sign Up";
    this.SignupModaldisplay = "block";
    this.display = "none";
  }

  openSignInModal() {
    this.ModalTitle ="Sign In";
    this.display = "block";
    this.SignupModaldisplay = "none";
  }
  onCloseHandled() {
    this.display = "none";
    this.SignupModaldisplay = "none";
  }

  ngOnInit(): void {
    this.userLoggedIn = this.service.CheckUserLoggedInOrNot();
    let values = JSON.parse(localStorage.getItem("UserName") || '');
    if(values != null)
    {
      this.userName=values.substr(0,1).toUpperCase() + values.substr(1);
    }
    this.isUserLoggedIn(this.userLoggedIn);
     console.log("in ngonInit =" + this.userLoggedIn);
  }

  signOutClick() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('emailID');
    localStorage.removeItem('UserName');
    this.isUserLoggedIn(false);
    this.router.navigate(['/signin']);        
  } 

  isUserLoggedIn(loggedIn:boolean){
    if(loggedIn){
      this.showSignInSignUp =false;
    }
    else{
      this.showSignInSignUp =true;
    }
    console.log("showSignInSignUp =" + this.showSignInSignUp);
    console.log("loggedIn =" + loggedIn);
  }

}
