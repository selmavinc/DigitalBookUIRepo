import { Component, OnInit } from '@angular/core';
import { DigitalBooksService } from '../services/digitalbooks.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  RoleList : any[] =[];
  message : any;
  radioSel:any;
  radioSelected:any;

  firstName :string="";
  lastName : string ="";
  userName : string ="";
  emailID : string = "";
  password : string = "";
  roleId : number =0;


  constructor(private service: DigitalBooksService) { }

  ngOnInit(): void {
    this.getRoleList();
  }


  getRoleList(){
    this.service.GetAllRoles().subscribe(
      response => {this.RoleList = response}
    )
  }

  getSelecteditem(){
    this.radioSelected = this.RoleList.find(Item => Item.value === this.radioSelected);
  }

  AddUser(){
    var val ={
      userName : this.userName,
      emailId: this.emailID,
      password: this.password,
      roleId: this.radioSelected,
      active: true,
      firstName: this.firstName,
      lastName: this.lastName
    }
    

    this.service.AddUser(val).subscribe(
      response => {
        
        this.message=response;
         alert(this.message.message); 
         if(this.message.message != 'Already Registered')
         {
          this.clearControls();
         }
         }
      
    )
  }

  clearControls(){
   this.userName ="",
   this.emailID ="",
   this.password = "",
   this.radioSelected ="",   
   this.firstName = "",
   this.lastName =""
  }

}
