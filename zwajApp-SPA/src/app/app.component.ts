import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  jwtHelper = new JwtHelperService();
  title = 'zwajApp-SPA';
  constructor(public authService:AuthService){}
    ngOnInit() {
      const token:any =localStorage.getItem('token');
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
}
