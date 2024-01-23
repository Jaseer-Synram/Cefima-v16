import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";

import { LoginComponent } from './login/login.component';
import { CefimaLoginComponent } from './cefima-login/cefima-login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { VideoChatComponent } from './video-chat/video-chat.component';
import { CallInfoDialogComponent } from './call-info-dialog/call-info-dialog.component';
import { CompanySelectDialogComponent } from './company-select-dialog/company-select-dialog.component';
import { DataPolicyComponent } from './data-policy/data-policy.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FrontFooterComponent } from './front-footer/front-footer.component';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { JwtInterceptorService } from './jwt-inteceptor.service';
import { PagerService } from './_services/pager.service';


import { JwtModule } from "@auth0/angular-jwt";
import { SocketIoModule } from "ngx-socket-io";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';
// import { SignaturePad, SignaturePadModule } from 'angular2-signaturepad';

import { SharedModule } from './shared/shared.module';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { DEFAULT_PSM_OPTIONS } from 'angular-password-strength-meter/zxcvbn';
import { AboutUsComponent } from './about-us/about-us.component';


export const MY_FORMATS = {
  parse: {
    dateInput: "DD.MM.YYYY",
  },
  display: {
    dateInput: "DD.MM.YYYY",
    monthYearLabel: "MM YYYY",
    dateA11yLabel: "DD.MM.YYYY",
    monthYearA11yLabel: "MM YYYY",
  },
};
export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CefimaLoginComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    MainLayoutComponent,
    HomeComponent,
    VideoChatComponent,
    CallInfoDialogComponent,
    CompanySelectDialogComponent,
    DataPolicyComponent,
    AddProductComponent,
    NavBarComponent,
    FrontFooterComponent,
    AboutUsComponent,
    // B2bDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    SocketIoModule.forRoot({
      url: "https://fiorettosystems.com",
      options: {
        path: "/api/socket.io",
      },
    }),
    CarouselModule.forRoot(),
    PasswordStrengthMeterModule.forRoot(DEFAULT_PSM_OPTIONS),
  ],
  providers: [
    AuthService,
    UserService,
    DatePipe,
    PagerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: "de" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
