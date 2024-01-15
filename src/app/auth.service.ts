import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  login(email: String, password: String) {
    let data = {
      email: email,
      password: password,
    };

    return this.http.post(`${this.API_URL}login/login`, data);
  }

  // ProductPartnerlogin(email: String, password: String) {
  //   let data = {
  //     email: email,
  //     password: password,
  //   };

  //   return this.http.post(`${this.API_URL}partner/login`, data);
  // }

  checkEmail(email: String) {
    let data = {
      email: email,
    };

    return this.http.post(`${this.API_URL}checkEmail`, data);
  }

  checkPhone(contactno: String, email: String) {
    let data = {
      email: email,
      contactno: contactno,
    };

    return this.http.post(`${this.API_URL}checkPhone`, data);
  }

  sendLinkForgotPassword(email: String) {
    let data = {
      email: email,
    };

    return this.http.post(`${this.API_URL}sendLinkForgotPassword/cefima`, data);
  }

  checkRouteRedirect(currentRole: any) {
    if (this.isAuthenticated()) {
      if (currentRole == 'admin') {
        // return './admin-home';
        return './cefima';
      } else if (currentRole == 'Superadmin' || currentRole == 'superadmin') {
        // return './superadmin-home';
        return './cefima';
      } else if (currentRole == 'employee') {
        // return './mitarbeiter-home';
        return './cefima';
      } else if (currentRole == 'b2b') {
        // return './b2b-home';
        return './cefima';
      } else {
        // return './kunde-home';
        return './cefima';
      }
    } else {
      return './';
    }
  }
  // checking the token authentication
  public isAuthenticated(): boolean {
    const token: any = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }
}
