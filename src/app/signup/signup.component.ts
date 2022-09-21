import { Component, OnInit } from '@angular/core';
import { DigitalBooksService } from '../services/digitalbooks.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  requiredForm! : FormGroup;
  isValidFormSubmitted = false;

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
  


  constructor(private service: DigitalBooksService, public router:Router, private fb: FormBuilder) {
    this.myForm();
   }

  myForm() {
    debugger;
    this.isValidFormSubmitted = true;
     
     
    this.requiredForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname:['', Validators.required],
      UserName:['', [Validators.required, Validators.minLength(4)]],
      Email: ['', [Validators.required, 
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")] ],
      PassWord:['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      gender:['', Validators.required]
      // UserName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });
    
    
 }

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
    debugger;
    if (this.requiredForm.invalid) {
      this.isValidFormSubmitted = false;
   }
   else
   {
    this.isValidFormSubmitted = true;
   }
    if(this.isValidFormSubmitted)
    {
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
         this.router.navigate([`${'signin'}`]);


         if(this.message.message != 'Already Registered')
         {
          this.clearControls();
         }
         }
      
    )
        }
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
