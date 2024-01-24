import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cefima-login',
  templateUrl: './cefima-login.component.html',
  styleUrls: ['./cefima-login.component.css']
})
export class CefimaLoginComponent implements OnInit {

  @Input() ppid: any;
  enableCaptcha: boolean = false;
  forgotpass: boolean = false;
  captchaError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  showPassword: boolean = false;
  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  showsucc: String = "";
  showErr1: String = "";
  submitted = false;
  loading = false;
  loginSuccess = true;
  loginError = false;
  loginPhoneError = false;
  data: any;
  token: any;
  forgotLink = false;
  error = "";
  message = "";
  forgotPasswordFormShow = false;
  // loginid = this.userService.getDecodedAccessToken(localStorage.getItem("token")).id;
  documentList: any;
  id: String = "";
  captcha = "";
  // deviceService: any;
  resolvedcefima(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captcha = captchaResponse;
  }

  showCaptcha = true;

  grecaptcha: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private deviceService: DeviceDetectorService,
  ) {
    if (window) {
      if (
        window.location.host.includes("localhost")
        // ||
        // window.location.host.includes(
        //   "ec2-18-197-17-51.eu-central-1.compute.amazonaws.com"
        // )
      ) {
        // this.enableCaptcha = false;
      }
    }
  }
  showloginpopup() {
    console.log("ggggggggggggg");
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    this.forgotPasswordForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
    });

    // if (
    //   window.location.host.includes("localhost") ||
    //   window.location.host.includes(
    //     "ec2-18-197-17-51.eu-central-1.compute.amazonaws.com"
    //   )
    // ) {
    //   this.showCaptcha = false;
    // }
  }

  get f() {
    return this.loginForm.controls;
  }
  get for() {
    return this.forgotPasswordForm.controls;
  }


  newfunction() {
    this.forgotPasswordFormShow = false;
    this.loginError = false;
    this.forgotLink = false;
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log("modal close triggered");
  }

  forgotPassword() {
    this.forgotPasswordFormShow = true;
    this.loginError = false;
    //this.router.navigate(['./forgot-password']);
  }
  setState() {
    this.forgotPasswordFormShow = false;
    this.loginError = false;
    this.forgotLink = false;
  }
  public next() {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      this.router.navigate(["./"]);
    }
    this.loading = true;
    if (this.f["username"].value) {

      this.authService
        .checkEmail(this.forgotPasswordForm.value.username)
        .pipe(first())
        .subscribe((data: any) => {
          if (data["status"] == 200) {
            //this.loginSuccess=true;
            console.log(data);
            this.showsucc = data["msg"];
            this.authService
              .sendLinkForgotPassword(this.forgotPasswordForm.value.username)
              .pipe(first())
              .subscribe(
                (data: any) => {
                  console.log("data", data);
                  if (data["status"] == 200) {
                    this.loginSuccess = true;
                    this.showsucc = data["msg"];
                    console.log(this.showsucc);
                    this.data = data;
                  }
                },
                (error) => {
                  this.loginPhoneError = true;

                  //this.showErr1 = error.message;
                  if (
                    error.message ==
                    "Ungültiger Benutzername und oder Passwort S"
                  ) {
                    this.showErr1 =
                      "Ungültiger Benutzername oder falsches Passwort";
                  } else {
                    this.showErr1 = error.message;
                  }
                  console.log("Error", error["error"]);
                  this.router.navigate(["./"]);
                }
              );
          } else {
            this.loginError = true;
            this.loginSuccess = false;
          }
        });
    }
  }
  check_domain() {
    if (
      !window.location.host.includes("localhost") ||
      !window.location.host.includes(
        "ec2-3-66-32-132.eu-central-1.compute.amazonaws.com"
      )
    ) {
      return false;
    }
    return true;
  }

  async login() {
    $("#loaderouterid").css("display", "block");

    console.log("check");
    if (this.f["username"].value == "") {
      this.emailError = true;
      return false
    } else if (this.f["password"].value == "") {
      this.passwordError = true;
      return false
    } else if (
      !window.location.host.includes("localhost") &&
      !window.location.host.includes(
        "ec2-3-66-32-132.eu-central-1.compute.amazonaws.com"
      ) &&
      this.captcha == ""
    ) {
      this.captchaError = true;
      return false
    } else {
      if (this.loginForm.invalid) {
        return false;
      }

      this.loading = false;

      let device_information = { 'deviceType': '', 'os': '', 'os_version': '', 'browser': '', 'browser_version': '' }
      Object.keys(device_information).map(info => { device_information[info] = this.deviceService[info] });
      console.log(device_information, ':', this.deviceService);
      let ip_address: any = await this.detectIp();
      let location_details: any = await this.getLocationByIp(ip_address);
      console.log('Location Details : ', location_details);
      console.log('IP Details : ', ip_address);
      this.authService
        .login(this.f["username"].value, this.f["password"].value, ip_address, device_information, location_details)
        .pipe(first())
        .subscribe(
          (dataUSER: any) => {
            localStorage.removeItem("foo");

            // console.log(dataUSER);
            this.token = dataUSER["token"];
            localStorage.setItem("token", this.token);
            localStorage.setItem(
              "currentUser",
              JSON.stringify(dataUSER["user"])
            );


            localStorage.setItem("UserType", "ProductAndSpecialist");

            let localData = JSON.parse(localStorage.getItem("currentUser")!);
            // console.log("localData" , localData);
            let decodedData = this.userService.getDecodedAccessToken(
              localStorage.getItem("token")!
            );
            console.log('userDetails:', decodedData);


            setTimeout(() => {
              $(".modal-backdrop").removeClass("modal-backdrop");
              $('body').removeClass("mainfist");
            }, 500);
            $("#loginModalClose1").trigger("click");
            $("#loginModalClose2").trigger("click");
            if (
              localData.companies_with_roles &&
              localData.companies_with_roles.includes("cefima_b2b")
            ) {
              localStorage.setItem("currentActiveRole", "b2b");
            } else if (
              localData.companies_with_roles &&
              localData.companies_with_roles.includes("cefima_customer")
            ) {
              localStorage.setItem("currentActiveRole", "customer");

            } else if (localData.TypeOfUser == "Specialist") {

            }
            console.log('fromlocal', localData.frontend_home_page, 'brand,', environment.brand_id);

            let urlRed = localData.frontend_home_page.find((x: { id: string; }) => x.id == environment.brand_id)?.url
            console.log('urlRed', urlRed);

            $("body").css("padding-right", "0px");
            console.log('nav');

            $("#loaderouterid").css("display", "none");
            this.router.navigate(["/cefima"]);
            return true
          },

          (error) => {
            this.loginError = true;
            this.forgotLink = true;
            //this.showErr1 = error;
            if (error == "Ungültiger Benutzername und oder Passwort S") {
              this.showErr1 = "Ungültiger Benutzername oder falsches Passwort";
            } else {
              this.showErr1 = error;
            }
            this.error = error;
            console.log('Error:', error["message"]);
            console.log(error);
            
            $("#loaderouterid").css("display", "none");
            this.router.navigate(["./cefima"]);
            return false
          }
        );
      return false
    }
  }

  async detectIp() {
    return new Promise((resolve) => {
      this.userService.ipify().subscribe(
        (result: any) => {
          if (result.ip && result.ip != "" && result.ip != null) {
            resolve(result.ip);
          } else {
            this.userService.geolocation().subscribe((response: { IPv4 }) => {
              resolve(response.IPv4);
            });
          }
        },
        (error: any) => {
          console.log("This is the error came here");
          this.userService.geolocation().subscribe((response: any) => {
            resolve(response.IPv4);
          });
        }
      );
    });
  }

  async getLocationByIp(ip) {
    return new Promise((resolve) => {
      this.userService.getIpDetails(ip).subscribe((response: any) => {
        if (response?.countryName) {
          resolve({ country: response.countryName, countryCode: response.countryCode });
        } else {
          resolve({ country: "", countryCode: "" });
        }
      });
    });
  }

  HideAndShow() {
    console.log("ravi");
    if (this.showPassword == false) {
      this.showPassword = true;
    } else {
      this.showPassword = false;
    }
  }
}
