import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  login(email: string, password: string, ip?, device_information?, location_details?) {

    let data: {
      email: string,
      password: string,
      ip_address?: any,
      location_details?: any,
      device_information?: any,
      brand_name :string
    } = {
      email: email,
      password: password,
      brand_name:'Cefima'
    };

    if (ip && ip != "Not found") { data.ip_address = ip; }
    if (device_information && Object.keys(device_information).length > 0) { data.device_information = device_information; }
    if (location_details && Object.keys(location_details).length > 0) { data.location_details = location_details; }

    console.log('Data:',data);
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

  logout(token_to_expire?){
    let user_info = JSON.parse(localStorage.getItem("currentUser"));
    let data = {
      user_id: user_info._id,
      token_to_expire: token_to_expire || localStorage.getItem("token")
    }
    return this.http.post(`${this.API_URL}login/logout`,data);
  }
  
}
