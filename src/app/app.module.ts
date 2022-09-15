import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchbooksComponent } from './searchbooks/searchbooks.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DigitalBooksService } from './services/digitalbooks.service';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import {ShowBooksComponent} from './searchbooks/show-books/show-books.component';
import { AuthorComponent } from './author/author.component';
import { AddbookComponent } from './addbook/addbook.component'
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PurchaseComponent } from './purchase/purchase.component';
import { ReaderDashboardComponent } from './reader-dashboard/reader-dashboard.component';
import { EditbookComponent } from './editbook/editbook.component';
@NgModule({
  declarations: [
    AppComponent,
    SearchbooksComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    ShowBooksComponent,
    AuthorComponent,
    AddbookComponent,
    PurchaseComponent,
    ReaderDashboardComponent,
    EditbookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},
    DigitalBooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
