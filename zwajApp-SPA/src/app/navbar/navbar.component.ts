import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { ErrorInterceptorProvider } from '../_services/error.interceptor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model:any ={};
  photoUrl:string;
  constructor(public authService:AuthService, private alertify:AlertifyService,private router:Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl=>this.photoUrl = photoUrl)
  }

  login(){
   // console.log(this.model);
   this.authService.login(this.model).subscribe(
     next =>{this.alertify.success('تم الدخول بنجاح')},
     error =>{this.alertify.error(error)},
     ()=>{
       this.router.navigate(['/members']);
     }
   )
  }

  // loggedIn(){
  //   const token = localStorage.getItem('token');
  //   return !! token
  // }
    loggedIn(){
    return this.authService.loggedIn();
  }
  loggedout(){
    localStorage.removeItem('token');
    this.authService.decodedToken = null;

    localStorage.removeItem('user');
    this.authService.currentUser=null;

    this.alertify.message('تم الخروج');
    this.router.navigate(['/home']);
  
  }
}
