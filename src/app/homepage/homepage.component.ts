import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private jwtHelper:JwtHelperService, private router: Router){

  }

  isUserAuthenticated() {
var token = localStorage.getItem("Jwt");
if(token && !this.jwtHelper.isTokenExpired(token)){
return true
}
else{
  return false;
}
}
  public logOut = () => {
    localStorage.removeItem("jwt");
  }
}
