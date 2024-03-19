import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  Renderer2,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { first, map, startWith } from "rxjs/operators";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
import { OwlOptions } from "ngx-owl-carousel-o";
import SignaturePad from "signature_pad"
import { DomSanitizer } from "@angular/platform-browser";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
  NgForm,
} from "@angular/forms";

import { AuthService } from "../auth.service";
import * as intlTelInput from "intl-tel-input";
import { UserService } from "../user.service";
import { Observable } from "rxjs";
// import '../../jquery-3.5.1.min.js';
import * as $ from "jquery";
import { GooglePlaceDirective } from "@barkhub/ngx-google-places-autocomplete";
// import { fullpageApi } from "fullpage.js/dist/fullpage.extensions.min";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements AfterViewInit, OnInit {
  @ViewChild("placesRef")
  placesRef!: GooglePlaceDirective;

  @ViewChild("aForm")
  aForm!: ElementRef;
  @ViewChild("productForm")
  productForm!: ElementRef;
  @ViewChild("fsa")
  fsa!: NgForm;
  brancheValue: any = [];
  setProductFocus(name: any) {
    const ele = this.productForm.nativeElement[name];

    if (ele) {
      ele.focus();
    } else {
    }
  }
  setFocus(name: any) {
    const ele = this.aForm.nativeElement[name];

    if (ele) {
      ele.focus();
    } else {
    }
  }
  private_Kunden!: string;
  private_Kunden_botton: boolean = false;
  year: any = new Date().getFullYear();
  O_P_K_S!: boolean;
  N_P_K_S!: boolean;
  public video!: ElementRef<HTMLVideoElement>;
  loginForm!: FormGroup;
  FilterBranchTypeOptions!: Observable<any>;
  branchTypeControl = new FormControl();
  contactForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  hide = true;
  activity_no: any = "";
  pdfname: any = "";
  pdfname1: any = "";
  customerno1: any;
  captchaError11 = false;
  loginError = false;
  forgotLink = false;
  enterTitle = false;
  enterTitlebroker = false;
  grecaptcha: any;
  showmore = false;
  captchaError = false;
  token: any;
  productpartnerlogoarray: any = [];
  roles: any;
  registercustomer: any = [];
  filteredProductsOptions!: Observable<any>;
  recaptchaButton: boolean = true;
  email_exists: boolean = true;
  ticket_no: any;
  ReadyProductsOptions: any = [];
  ProductsTypeControl = new FormControl();
  recaptchaButtonnew!: string;
  capcthdata = "";
  customerList: any = [];
  filteredProductsTypeOptionsWithBranch!: Observable<any>;
  ProductsTypeControlWithBranch = new FormControl();
  filteredProductsTypeOptions!: Observable<any>;
  BranchArray: [] = [];
  branchlisttotal: any = [];
  branchlist: any = [];
  recordCount!: number;
  ThirdTypeDocOptions!: Observable<any>;
  ThirdTypeDoc = new FormControl();
  forgotPasswordFormShow = false;
  loginSuccess = false;
  loginPhoneError = false;
  RegistrationGroup!: FormGroup;
  RegistrationGroupTwo!: FormGroup;
  RegistrationGroupfirma!: FormGroup;
  phoneFormGroup!: FormGroup;
  data: any;
  error: any;
  drawing = true;
  titlename: any;
  fname: any;
  lname: any;
  forgotClass = "";
  captchaResponse: boolean = false;
  enableCaptcha = true;
  goinsidediv: boolean = false;
  companyname1: any;
  companyname2: any;
  ReadyProductsTypeOptions: any[] = [];
  registerDone!: boolean;
  verificationData: any = [];
  registraionError!: boolean;
  selectfirma: boolean = true;
  enableWeiter: boolean = false;
  tokensession = localStorage.getItem("token");
  config: any;
  // fullpage_api: fullpageApi;
  contactfiles: any;
  otpError = false;
  TodayDate!: string;
  id = "";
  countryName: any;
  localdata: any = JSON.parse(localStorage.getItem("currentUser")!);
  Cefima_Starten: boolean = true;
  currentActiveRole = localStorage.getItem("currentActiveRole");
  otp = false;
  companykundevalidemail = false;
  otpSuccess = false;
  phoneData: any = [];
  DigiV: boolean = false;
  OfferV: boolean = false;
  showdivs: boolean = true;
  nothingForm!: FormGroup;
  closeButton: boolean = false;
  HideAndShow: boolean = true;
  ProductTypeArray: any = [];
  producttypenew: any = [];
  productpartnernew: any = [];

  dont_show_maine_firma: any = false;

  ProductTypeAndProductPartner: any = [];
  ShowProductsPartner: boolean = false;
  protypeAndpropartner!: FormGroup;
  ReadyProductsTypeOptionsWithBranch: string[] = [];
  ProductsControl = new FormControl();
  ShowButton!: boolean;
  addressFormGroup!: FormGroup;
  lastproducttypeid: any;
  company_name_exists: any = false;
  CompanyType: string[] = [
    "Einzelunternehmen",
    "Eingetragener Kaufmann (e.K.)",
    "Gesellschaft mit beschränkter Haftung (GmbH)",
    "Gesellschaft bürgerlichen Rechts (GbR)",
    "Offene Handelsgesellschaft (OHG)",
    "Kommanditgesellschaft (KG)",
    "GmbH & Co KG",
    "UG & Co. KG",
    "Kommanditgesellschaft auf Aktien (KGaA)",
    "Unternehmergesellschaft (haftungsbeschränkt)",
    "Aktiengesellschaft (AG)",
    "eingetragene Genossenschaft (eG)",
  ];


  @ViewChild("canvas", { read: SignaturePad })
  canvas!: ElementRef;
  signaturePad!: SignaturePad;


  // public signaturePadOptions: Object = {
  //   // passed through to szimek/signature_pad constructor
  //   minWidth: 2,
  //   canvasWidth: 765,
  //   canvasHeight: 300,
  // };

  @Input() public dotContent: any;
  customOptions: OwlOptions = {
    items: 1,
    loop: true,
    dotsData: true,
    nav: true,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    margin: 0,

    autoplay: true,

    autoplayTimeout: 4000,

    smartSpeed: 2000,

    mouseDrag: false,

    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  slidesStore = [
    {
      id: 0,
      text: "AAAA",
      src: "./assets/login/latest-logo/img/2015-02-01.jpg",
    },
    {
      id: 1,
      text: "BBBB",
      src: "./assets/login/latest-logo/img/2015-02-02.jpg",
    },

    {
      id: 2,
      text: "CCCC",
      src: "./assets/login/latest-logo/img/2015-02-02.jpg",
    },
    {
      id: 3,
      text: "DDDD",
      src: "./assets/login/latest-logo/img/2015-02-02.jpg",
    },
    {
      id: 4,
      text: "EEEE",
      src: "./assets/login/latest-logo/img/2015-02-02.jpg",
    },
    {
      id: 5,
      text: "FFFF",
      src: "./assets/login/latest-logo/img/2015-02-02.jpg",
    },
  ];
  ShowTitleDiv: boolean = true;
  bestand!: boolean;

  ppid: any = "";

  companytype: any = [];

  resolved(captchaResponse: string) {
    //console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  branchFiledAndProductType: string = "Branche";
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService,
    private userService: UserService,
    private renderer: Renderer2,
    private el: ElementRef,
    private sanitizer: DomSanitizer
  ) {
    this.route.queryParams.subscribe((param) => {
      this.ppid = param["ppid"];
      console.log(this.ppid);

    });

    // for more details on config options please visit fullPage.js docs

    this.config = {
      navigation: true,
      licenseKey: "YOUR LICENSE KEY HERE",
      anchors: [
        "finanzvermittler",
        "Angebot_bekommen",
        "private_Kunden",
        "Über_uns",
      ],

      keyboardScrolling: true,
      controlArrows: true,
      navigationTooltips: [
        "Finanzvermittler",
        "Gewerbekunden",
        "Privatkunden",
        "Mehr",
      ],

      afterResize: () => { },
      afterLoad: (origin: any, destination: any, direction: any) => {
        if (destination.anchor == "finanzvermittler") {
          this.private_Kunden_botton = true;

          //this.video.nativeElement.play();
          $(".arrow").css("margin-bottom", "-66px");
          $("#MuteOn").css("bottom", "60px");
          $("#MuteOff").css("bottom", "60px");
          $(".header-text").addClass("cool-link");
          $("#rotatebtn").css("margin-top", "0px");
          $("#rotatebtn").css("position", "");
          // $("#rotatebtn").css("bottom", "");
          $("#Finanzvermittlernew").addClass("cool-link-active");
          $("#Gewerbekunden").removeClass("cool-link-active");
          $("#Privatkunden").removeClass("cool-link-active");
          $("#MEHR").removeClass("cool-link-active");

          $(".tabactive").addClass("cool-link");
        } else if (destination.anchor == "Angebot_bekommen") {
          this.private_Kunden_botton = true;
          $("#rotatebtn").css("transform", "rotate(60deg)");
          $("#rotatebtn").css("transition", "all 0.5s");
          $("#Finanzvermittlernew").removeClass("cool-link-active");
          $("#Gewerbekunden").addClass("cool-link-active");
          $("#Privatkunden").removeClass("cool-link-active");
          $("#MEHR").removeClass("cool-link-active");

          $(".tabactive").addClass("cool-link");
        } else if (destination.anchor == "private_Kunden") {
          this.private_Kunden_botton = false;
          this.O_P_K_S = true;

          $("#rotatebtn").css("transform", "rotate(0deg)");
          $("#rotatebtn").css("transition", "all 0.5s");

          $("#rotatebtn").css("position", "absolute");
          // $("#rotatebtn").css("bottom", "-32%");
          $(".maincardimg").css("z-index", "9999");
          $("#Finanzvermittlernew").removeClass("cool-link-active");
          $("#Gewerbekunden").removeClass("cool-link-active");
          $("#Privatkunden").addClass("cool-link-active");
          $("#MEHR").removeClass("cool-link-active");

          $(".tabactive").addClass("cool-link");
        } else {
          this.private_Kunden_botton = true;
          $("#rotatebtn").css("transform", "rotate(70deg)");
          $("#rotatebtn").css("transition", "all 0.5s");

          $("#rotatebtn").css("position", "absolute");
          $(".maincardimg").css("z-index", "9999");
          $("#Finanzvermittlernew").removeClass("cool-link-active");
          $("#Gewerbekunden").removeClass("cool-link-active");
          $("#Privatkunden").removeClass("cool-link-active");
          $("#MEHR").addClass("cool-link-active");

          $(".tabactive").addClass("cool-link");

          $(".sectionbox .fp-tableCell").css("display", "flex");
          $(".sectionbox .fp-tableCell").css("flex-direction", "column");
        }
      },

      afterRender: () => { },

      afterSlideLoad: (
        section: any,
        origin: any,
        destination: any,
        direction: any
      ) => { },
    };

    if (window) {
      if (
        window.location.host.includes("localhost") ||
        window.location.host.includes(
          "ec2-3-66-32-132.eu-central-1.compute.amazonaws.com"
        )
      ) {
        this.enableCaptcha = false;
      }
    }

    var lastScrollTop = 0;
    // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.

    $("#rotated").click(function () {
      $("#rotatebtn").addClass("rotate");

      setTimeout(function () {
        $("#rotatebtn").removeClass("rotate");
        $("#rotatebtn").css("transform", "rotate(60deg)");
      }, 2000);

      // $('#rotatebtn').removeClass('rotate');

      // $(".leftsideimg").css({"transform": "rotate(360deg)", "transition": "transform 0.5s ease 0s%"});
    });

    $("#rotated").resize(function () {
      $("#rotatebtn").addClass("rotate");

      setTimeout(function () {
        $("#rotatebtn").removeClass("rotate");
        $("#rotatebtn").css("transform", "rotate(60deg)");
      }, 2000);

      // $('#rotatebtn').removeClass('rotate');

      // $(".leftsideimg").css({"transform": "rotate(360deg)", "transition": "transform 0.5s ease 0s%"});
    });

    window.addEventListener(
      "scroll",
      function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;

        if (st > lastScrollTop) {
          // Do scroll down code

          $("#rotatebtn").addClass("rotate");

          setTimeout(function () {
            $("#rotatebtn").removeClass("rotate");
            $("#rotatebtn").css("transform", "rotate(60deg)");
            $("#rotatebtn").css("transition", "all 0.5s");
          }, 100);
        } else {
          // Do scroll up code
          $("#rotatebtn").addClass("rotate1");
          // $('#rotatebtn').css("transform","rotate(0deg)");
          setTimeout(function () {
            $("#rotatebtn").removeClass("rotate1");
            $("#rotatebtn").css("transform", "rotate(0deg)");
            $("#rotatebtn").css("transition", "all 0.5s");
          }, 100);
        }

        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      },
      false
    );

    $(window).resize(function () {
      var height: any = $(window).height();
      var width: any = $(window).width();
      var correctwidth = width;

      $(".iconst").css("width", "6%");
      $("#icons6").css("top", "");

      // $('#heading').css("font-size", "40px");
      if (width > 545 && width <= 1500) {
        var actualwidthrotate = width;
        if (width > 767 && width <= 1200) {
          // $('#rotatebtn').css("width", "250px");
          // $('#rotatebtn').css("bottom", "-248px");
          // $('#heading').css("font-size", "25px");
        }
        width = 545;
        var newtoprotate = (height / 100) * 50;
        if (actualwidthrotate > 767 && actualwidthrotate <= 900) {
          var newtoprotate = (height / 100) * 51;
        } else if (actualwidthrotate > 900 && actualwidthrotate <= 1100) {
          var newtoprotate = (height / 100) * 53;
        } else if (actualwidthrotate > 1100 && actualwidthrotate <= 1200) {
          var newtoprotate = (height / 100) * 58;
        } else if (actualwidthrotate > 1200 && actualwidthrotate <= 1400) {
          var newtoprotate = (height / 100) * 55;
        }
      } else if (width > 1500) {
        //width = "100%";
        var actualwidthrotate = width;
        var widthrotate = width / 10;
        // var width = (width / 3) ;

        if (width > 1500 && width <= 2000) {
          width = 600;
          var newtoprotate = (height / 100) * 50;
        }
        if (width > 2000 && width <= 2500) {
          width = 700;
          var newtoprotate = (height / 100) * 50;
        }
        if (width > 2500) {
          width = 900;
          var newtoprotate = (height / 100) * 50;
        }

        // if(widthrotate<400)
        // {
        //     widthrotate='400';
        // }
      } else {
        var newwidth = (width * 100) / 545;
      }

      if (width >= 600 && width < 700) {
        var widthicon = "7%";
        $(".iconst").css("width", widthicon);

        var newwidth = 900 - width;

        var right = newwidth / 10 - 5 + "%";
        $("#icons1").css("right", right);

        var right = 50 + "%";
        $("#icons2").css("right", right);

        var right = newwidth / 10 + 25 + "%";
        $("#icons3").css("right", right);

        var right = newwidth / 10 + 13 + "%";
        $("#icons4").css("right", right);

        var right = newwidth / 10 - 10 + "%";
        $("#icons5").css("right", right);

        var right = 55 + "%";
        var top = 38 + "%";
        $("#icons6").css({ right: right, top: top });

        var right = newwidth / 10 + 0 + "%";
        $("#icons7").css("right", right);

        var right = 62 + "%";
        $("#icons8").css({ right: right });

        var right = 62 + "%";
        $("#icons9").css("right", right);

        var right = 27 + "%";
        $("#icons10").css("right", right);

        var right = newwidth / 10 + 5 + "%";
        $("#icons11").css("right", right);

        var right = 54 + "%";
        $("#icons12").css("right", right);

        var right = 44 + "%";
        $("#icons13").css("right", right);

        var right = 30 + "%";
        $("#icons14").css("right", right);

        var right = 57 + "%";
        $("#icons15").css("right", right);
      } else if (width >= 700 && width < 800) {
        var widthicon = "7%";
        $(".iconst").css("width", widthicon);

        var newwidth = 900 - width;

        var right = newwidth / 10 - 5 + "%";
        $("#icons1").css("right", right);

        var right = newwidth / 10 + 25 + "%";
        $("#icons2").css("right", right);

        var right = newwidth / 10 + 25 + "%";
        $("#icons3").css("right", right);

        var right = newwidth / 10 + 13 + "%";
        $("#icons4").css("right", right);

        var right = newwidth / 10 - 10 + "%";
        $("#icons5").css("right", right);

        var right = 48 + "%";
        $("#icons6").css({ right: right, top: 37 + "%" });

        var right = newwidth / 10 + 0 + "%";
        $("#icons7").css("right", right);

        var right = 54 + "%";
        $("#icons8").css({ right: right, top: 42 + "%" });

        var right = 57 + "%";
        $("#icons9").css("right", right);

        var right = 10 + "%";
        $("#icons10").css("right", right);

        var right = newwidth / 10 + 5 + "%";
        $("#icons11").css("right", right);

        var right = 48 + "%";
        $("#icons12").css("right", right);

        var right = 35 + "%";
        $("#icons13").css("right", right);

        var right = 18 + "%";
        $("#icons14").css("right", right);

        var right = newwidth / 10 + 30 + "%";
        $("#icons15").css("right", right);
      } else if (width >= 800) {
        var widthicon = "8%";
        $(".iconst").css("width", widthicon);

        var newwidth = 900 - width;

        var right = newwidth / 10 + "%";
        $("#icons1").css("right", right);

        var right = newwidth / 10 + 30 + "%";
        $("#icons2").css("right", right);

        var right = newwidth / 10 + 32 + "%";
        $("#icons3").css("right", right);

        var right = newwidth / 10 + 18 + "%";
        $("#icons4").css("right", right);

        var right = newwidth / 10 - 6 + "%";
        $("#icons5").css("right", right);

        var right = 37 + "%";
        $("#icons6").css("right", right);

        var right = 11 + "%";
        $("#icons7").css("right", right);

        var right = 42 + "%";
        $("#icons8").css("right", right);

        var right = newwidth / 10 + 50 + "%";
        $("#icons9").css("right", right);

        var right = -6 + "%";
        $("#icons10").css("right", right);

        var right = 15 + "%";
        $("#icons11").css("right", right);

        var right = 34 + "%";
        $("#icons12").css("right", right);

        var right = 19 + "%";
        $("#icons13").css("right", right);

        var right = 1 + "%";
        $("#icons14").css("right", right);

        var right = newwidth / 10 + 47 + "%";
        $("#icons15").css("right", right);
      } else {
        var widthicon = "6%";
        $(".iconst").css("width", widthicon);

        var right = "30%";
        $("#icons1").css("right", right);

        var right = "50%";
        $("#icons2").css("right", right);

        var right = "53%";
        $("#icons3").css("right", right);

        var right = "44%";
        $("#icons4").css("right", right);

        var right = "27%";
        $("#icons5").css("right", right);

        var right = "59%";
        $("#icons6").css("right", right);

        var right = "39%";
        $("#icons7").css("right", right);

        var right = "63%";
        $("#icons8").css("right", right);

        var right = "64%";
        $("#icons9").css("right", right);

        var right = "28%";
        $("#icons10").css("right", right);

        var right = "43%";
        $("#icons11").css("right", right);

        var right = "57%";
        $("#icons12").css("right", right);

        var right = "48%";
        $("#icons13").css("right", right);

        var right = "36%";
        $("#icons14").css("right", right);

        var right = "60%";
        $("#icons15").css("right", right);
      }

      var newheight = height - 80;
      var newheight1 = height - 210;
      $("#heightid").css("height", newheight);
      $("#scrolled").css("height", newheight1);
      if (correctwidth > 1100) {
        $(".section-fix").css("width", width);
        $(".section-fix").css("height", width);
        $("#rotatebtn").css("width", width - 100);
      } else {
        $(".section-fix").css("width", "100%");
        $(".section-fix").css("height", "100%");
        $("#rotatebtn").css("width", "100%");
      }

      // $("#rotatebtn").css("top", newtoprotate);
    });
  }

  photoURL(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  company_name_entered(event: any) {
    if (event.target.value != "") {
      this.company_name_exists = true;
    } else {
      this.company_name_exists = false;

      this.ThirdTypeDoc.reset();

      this.RegistrationGroupfirma.patchValue({
        companytype: "",
      });
    }
  }

  reset_company_type() {
    this.company_name_exists = false;

    this.ThirdTypeDoc.reset();

    this.RegistrationGroupfirma.patchValue({
      companytype: "",
    });
  }

  save() {
    $("#loaderouterid").css("display", "block");
    let bestandBoolean = this.bestand;
    let length = bestandBoolean
      ? this.ProductTypeAndProductPartner.length
      : this.ProductTypeArray.length;
    this.userService
      .getLastUser()
      .pipe(first())
      .subscribe(
        (data11: any) => {
          this.customerno1 = data11.toString() + "-40-ce";
          let that = this;
          let statusbrandarraynew = ["Cefima"];
          let statusarraynew = ["Kunde"];
          let brokerbrandarraynew: any = [];
          let brokerarraynew: any = [];
          let roles = ["customer"];
          let companies = ["cefima"];
          let rolesCompaniesArray = ["cefima_customer"];
          let data = {
            roles: roles,
            companies: companies,
            companies_with_roles: rolesCompaniesArray,

            title: this.RegistrationGroupfirma.controls["title"].value,

            usertitle: this.RegistrationGroupfirma.controls["usertitle"].value,

            companyname:
              this.RegistrationGroupfirma.controls["companyName"].value,
            firstname: this.RegistrationGroupfirma.controls["firstname"].value,
            lastname: this.RegistrationGroupfirma.controls["lastname"].value,
            email: this.addressFormGroup.controls["email"].value,
            mobile_number:
              this.addressFormGroup.controls["mobile_number"].value,
            fax_number: this.addressFormGroup.controls["fax_number"].value,
            dateofbirth: "",
            nationality: "",
            birth_place: "",
            customer_status: "Kunde",

            strassa: this.addressFormGroup.controls["street"].value,
            strno: this.addressFormGroup.controls["streetNumber"].value,
            plz: this.addressFormGroup.controls["postCode"].value,
            city: this.addressFormGroup.controls["city"].value,
            additionalReference:
              this.addressFormGroup.controls["additionalReference"].value,
            current_country:
              this.addressFormGroup.controls["countryOfResidence"].value,
            companytype: this.RegistrationGroupfirma.value.companytype,

            password: "Test",
            contactno: this.phoneFormGroup.controls["phone_number"].value,
            customerno: this.customerno1,
            emailsendornot: "1",
            statusbrandarray: statusbrandarraynew,
            statusarray: statusarraynew,
            brokerbrandarray: brokerbrandarraynew,
            brokerarray: brokerarraynew,
            status: "0",
            companycode: ["c42140_customer"],
            broker: "",
          };

          let msg =
            this.addressFormGroup.controls["street"].value +
            " , " +
            this.addressFormGroup.controls["streetNumber"].value +
            "<br>" +
            this.addressFormGroup.controls["postCode"].value +
            "," +
            this.addressFormGroup.controls["city"].value;
          $("#addressid").html(msg);
          $("#first1").html(
            this.RegistrationGroupfirma.controls["firstname"].value
          );
          $("#first2").html(
            this.RegistrationGroupfirma.controls["firstname"].value
          );
          $("#first3").html(
            this.RegistrationGroupfirma.controls["firstname"].value
          );
          $("#first31").html(
            this.RegistrationGroupfirma.controls["firstname"].value
          );
          $("#first4").html(
            this.RegistrationGroupfirma.controls["firstname"].value
          );
          $("#first5").html(
            this.RegistrationGroupfirma.controls["firstname"].value
          );
          $("#first6").html(
            this.RegistrationGroupfirma.controls["firstname"].value
          );
          $("#last").html(
            this.RegistrationGroupfirma.controls["lastname"].value
          );
          $("#last1").html(
            " " + this.RegistrationGroupfirma.controls["lastname"].value
          );
          $("#last2").html(
            this.RegistrationGroupfirma.controls["lastname"].value
          );
          $("#last3").html(
            " " + this.RegistrationGroupfirma.controls["lastname"].value
          );
          $("#last31").html(
            " " + this.RegistrationGroupfirma.controls["lastname"].value
          );
          $("#addressid1").html(msg);

          that.userService
            .directregisterUser(data)
            .pipe(first())
            .subscribe(
              (datanew: any) => {
                let customer_id = datanew["_id"];
                $("#imageid").attr("src", this.signaturePad.toDataURL());
                $("#bodydivdata").css("display", "block");

                $("#signdiv").css("border", "0");
                $("#parentDiv").css("display", "block");

                $("#loaderouterid").css("display", "block");
                let data = document.getElementById("MyDIvdata");

                let pdfnew: any = new jsPDF("portrait", "pt", "a4");

                var width = pdfnew.internal.pageSize.width;

                pdfnew.html(document.getElementById("MyDIvdata"), {
                  html2canvas: {
                    width: width,
                  },
                  callback: function (pdfnew: any) {
                    // pdfnew.save("MaklerVollmacht.pdf");

                    that.userService
                      .getLastdocument()
                      .pipe(first())
                      .subscribe((data: any) => {
                        that.ticket_no = "40-ce-" + data;

                        var values: any = {
                          image: "",
                          document_type: "",
                          document_sub_type: "",
                          user_id: "",
                          product_partner: "",
                          companycode: "",
                          brand: "",
                          tags: [],
                          upload_by: "",
                          ticket_no: "",
                          created_by: "",
                        };

                        this.pdffile = pdfnew.output("blob");

                        let typeofimage = "application/pdf";
                        let dateofdocument = new Date().getTime();
                        values.image = this.pdffile;
                        values.document_type = "Allgemeines Dokument";
                        values.document_sub_type = "Power of attorney";
                        values.user_id = customer_id;
                        values.product_partner = " ";

                        values.companycode = "42140 DFG Finanzprofi GmbH";
                        values.brand = "cefima";
                        values.upload_by = "cefima_document";
                        values.ticket_no = "40-ce-" + data;

                        values.tags.push(Math.round(this.pdffile.size / 1024));

                        values.tags.push(typeofimage);
                        values.tags.push(dateofdocument);
                        that.uploadDocumentforVollmacht(values, 1);
                        values.tags = [];
                      });

                    bestandBoolean
                      ? that.userService
                        .getLastdocument()
                        .pipe(first())
                        .subscribe((data: any) => {
                          for (let i = 0; i < length; i++) {
                            var values: any = {
                              image: "",
                              document_type: "",
                              document_sub_type: "",
                              user_id: "",
                              product_partner: "",
                              companycode: "",
                              brand: "",
                              tags: [],
                              upload_by: "",
                              ticket_no: "",
                              created_by: "",
                            };

                            let typeofimage = "application/pdf";
                            let dateofdocument = new Date().getTime();
                            values.image = "";
                            values.document_type = "bestandsübertragung";
                            values.document_sub_type =
                              that.producttypenew[i].id;
                            values.user_id = customer_id;
                            values.product_partner =
                              that.productpartnernew[i].id;

                            values.companycode = "42140 DFG Finanzprofi GmbH";
                            values.brand = "cefima";
                            values.upload_by = "cefima_document";
                            values.ticket_no = "40-ce-" + data;

                            values.tags.push(0);

                            values.tags.push(typeofimage);
                            values.tags.push(dateofdocument);
                            that.uploadDocumentforVollmachtnew(values, i + 2);
                            values.tags = [];
                          }
                        })
                      : that.userService
                        .getLastdocument()
                        .pipe(first())
                        .subscribe((data: any) => {
                          for (let i = 0; i < length; i++) {
                            var values: any = {
                              image: "",
                              document_type: "",
                              document_sub_type: "",
                              user_id: "",
                              product_partner: "",
                              companycode: "",
                              brand: "",
                              tags: [],
                              upload_by: "",
                              ticket_no: "",
                              created_by: "",
                              sparte: "",
                            };

                            let typeofimage = "application/pdf";
                            let dateofdocument = new Date().getTime();
                            values.image = "";
                            values.document_type = "Angebot bekommen";
                            values.document_sub_type =
                              that.producttypenew[i].id;
                            values.user_id = customer_id;
                            values.product_partner = " ";
                            values.sparte = " ";
                            values.companycode = "42140 DFG Finanzprofi GmbH";
                            values.brand = "cefima";
                            values.upload_by = "cefima_document";
                            values.ticket_no = "40-ce-" + data;

                            values.tags.push(0);

                            values.tags.push(typeofimage);
                            values.tags.push(dateofdocument);
                            that.uploadDocumentforVollmachtnew(values, i + 2);
                            values.tags = [];
                          }
                        });

                    $("#bodydivdata").css("display", "none");
                    $(".closeicon").trigger("click");
                    $("#imageidnew11").attr("src", "");
                    $("#parentDiv").css("display", "none");
                    // $("#parentDiv1").css("display", "none");
                    $("#signdiv").css("border", "1px solid");
                  },
                });
              },
              (error) => {
                $("#loaderouterid").css("display", "none");
                Swal.fire({
                  title: "Benutzer bereits registriert",
                  showCloseButton: true,
                  icon: "error",
                });
              },
              () => { }
            );
        },
        (err: any) => {
          $("#loaderouterid").css("display", "none");
          Swal.fire({
            title: "Some Error Occured!",
            showCloseButton: true,
            icon: "error",
          });
        },
        () => { }
      );
  }
  savepdf() {
    if (this.bestand == true) {
      this.pdfname = "MaklerVollmacht.pdf";
    } else {
      this.pdfname = "Ausschreibung von Gewerbeversicherungen.pdf";
    }

    // $("#loaderouterid").css("display", "block");
    this.BindValues();
    $("#imageid").attr("src", this.signaturePad.toDataURL());
    $("#bodydivdata").css("display", "block");

    $("#signdiv").css("border", "0");
    $("#parentDiv").css("display", "block");

    $("#loaderouterid").css("display", "block");

    this.exportAsPDF();
  }
  exportAsPDF() {
    let that = this;
    $("#loaderouterid").css("display", "block");
    let pdfnew: any = new jsPDF("portrait", "pt", "a4");

    var width = pdfnew.internal.pageSize.width;

    pdfnew.html(document.getElementById("MyDIvdata"), {
      html2canvas: {
        width: width,
      },
      callback: function (pdfnew: any) {
        pdfnew.save(that.pdfname);

        $("#loaderouterid").css("display", "none");
        $("#bodydivdata").css("display", "none");

        $("#imageidnew11").attr("src", "");
        $("#parentDiv").css("display", "none");

        $("#signdiv").css("border", "1px solid");
      },
    });
  }
  CasePost(T_N: any, D_C: any, U_B: any, user_id: any) {
    let newemployee = [];
    // newemployee.push('5fb56bfa3a90792ac8e4227c');
    newemployee.push(user_id);

    let projectdatanew = {
      employee_id: newemployee,
      Uploaded_By: U_B,
      Transaction_Type: D_C,
      uploaddate: new Date().toISOString(),
      updateticket_no: T_N,
      companyname: "42140 DFG Finanzprofi GmbH",
      Type: D_C,
    };
    this.userService
      .CaseListUpload(projectdatanew)
      .pipe(first())
      .subscribe(
        (data) => { },
        (error) => {
          $("#loaderouterid").css("display", "none");
        },
        () => {
          if (this.bestand == true) {
            this.pdfname1 = "MaklerVollmacht";
          } else {
            this.pdfname1 = "Ausschreibung von Gewerbeversicherungen";
          }
          Swal.fire({
            title: `Ihr Konto wurde erfolgreich erstellt. Bitte überprüfen Sie Ihre E-Mails und legen Sie Ihr Passwort fest. Ihre Vorgangs Nr. ist. : ${T_N}`,
            showConfirmButton: false,
            allowOutsideClick: false,
            html:
              `<div style="width:100%">
            <a id="buttonthree" style="color: #184397" class="btn "><i class="fa fa-file-pdf-o" aria-hidden="true"></i> ` +
              this.pdfname1 +
              ` <i class="fa fa-download" aria-hidden="true"></i> </a>

            <br><br>
            <button id="buttonFour" type="button" style="background: #184397" class="btn btn-primary">Zur Startseite <i class='fa fa-arrow-right'></i></button>
            </div>`,
            iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
            confirmButtonText: "Ok",
            confirmButtonColor: '#02a9ed',
            customClass: {
              icon: 'no-border'
            },
          }).then((result) => {
            if (result["isDismissed"]) {
              // this.logout();
              $("#loaderouterid").css("display", "none");
              // this.CloseFormDiv();
              this.closeicon2();

              this.registercustomer = [];
              // this.router.navigate([`/upload-document/${this.user_id}`], {
              //   queryParams: { user_id: this.user_id },
              // });
            } else {
              this.closeicon2();
              this.registercustomer = [];
              $("#loaderouterid").css("display", "none");
              // this.CloseFormDiv();
            }
          });
          const ButtonThree: any = document.getElementById("buttonthree");
          const ButtonFour: any = document.getElementById("buttonFour");
          ButtonThree.addEventListener(
            "click",
            function () {
              removepreview1("three");
            },
            false
          );
          ButtonFour.addEventListener(
            "click",
            function () {
              removepreview1("four");
            },
            false
          );
          const removepreview1 = (e: any) => {
            if (e == "four") {
              // this.backToLogin();
              $("#loaderouterid").css("display", "none");
              Swal.close();
              this.clear();

              // this.router.navigate(["./"]);
              this.closeicon2();
              //  window.location.href;
            }
            if (e == "three") {
              this.savepdf();
              $("#loaderouterid").css("display", "none");
            }
          };
        }
      );
  }
  doSomething() {
    // this.otp = true;
    // document.getElementById('focusfield').focus()
    //   setTimeout(function(){
    //     $('#focusfield').focus();
    // });
    // document.getElementById('focusfield').focus()
    // $("#verifybutton").trigger("click");
    // $("#focusfield").trigger("focus");
  }
  uploadDocumentforVollmachtnew(values: any, index: any) {
    // let length = this.filearray.length;
    //$("#loaderouterid").css("display", "block");
    const formData = new FormData();
    formData.append("document_type", values.document_type);
    formData.append("document_sub_type", values.document_sub_type); // product_type
    formData.append("product_partner", values.product_partner);
    formData.append("user", values.user_id);
    formData.append("companycode", values.companycode);
    formData.append("brand", values.brand);
    formData.append("tags", values.tags);
    formData.append("upload_by", values.upload_by);
    formData.append("ticket_no", values.ticket_no);
    formData.append("document_name", "No Document");

    // formData.append("created_by", values.created_by);

    if (values.image !== "") {
      formData.append("document", values.image);
    }
    // this.UploadDone = true;
    this.userService
      .callApidirectcustomer(formData)
      .pipe(first())
      .subscribe(
        (datanew1) => {
          // this.registercustomer=datanew1;
        },
        (error) => {
          $("#loaderouterid").css("display", "none");
          // this.UploadError = true;
          this.error = error;
        },
        () => {
          let finallength = this.producttypenew.length + 1;
          if (index == finallength) {
            this.CasePost(
              values.ticket_no,
              values.document_type,
              `${this.RegistrationGroupfirma.controls["firstname"].value} ${this.RegistrationGroupfirma.controls["lastname"].value}`,
              values.user_id
            );
          }
        }
      );
  }

  closeicon2() {
    this.resetformfirmakunde();
    $("#sidebar2").removeClass("active");

    $("#aboutus").addClass("active");
    $("#fp-nav").css("display", "block");
  }

  uploadDocumentforVollmacht(values: any, index: any) {
    // let length = this.filearray.length;
    //$("#loaderouterid").css("display", "block");
    const formData = new FormData();
    formData.append("document_type", values.document_type);
    formData.append("document_sub_type", values.document_sub_type); // product_type
    formData.append("product_partner", values.product_partner);
    formData.append("user", values.user_id);
    formData.append("companycode", values.companycode);
    formData.append("brand", values.brand);
    formData.append("tags", values.tags);
    formData.append("upload_by", values.upload_by);
    formData.append("ticket_no", values.ticket_no);
    formData.append("document_name", "MaklerVollmacht");
    // formData.append("created_by", values.created_by);

    if (values.image !== "") {
      formData.append("document", values.image);
    }
    // this.UploadDone = true;
    this.userService
      .callApidirectcustomerpoa(formData)
      .pipe(first())
      .subscribe(
        (data) => {
          $("#loaderouterid").css("display", "none");
        },
        (error) => {
          $("#loaderouterid").css("display", "none");
          // this.UploadError = true;
          this.error = error;
        },
        () => { }
      );
  }

  clear() {
    this.drawing = true;
    this.signaturePad.clear();
  }
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    $("#parentDiv1").css("display", "block");
    $("#imageid1").attr("src", this.signaturePad.toDataURL());
  }
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
  }
  submitsign() {
    this.drawing = false;
    $("#parentDiv1").css("display", "block");
    $("#imageid1").attr("src", this.signaturePad.toDataURL());
    $("#imageidnew11").attr("src", this.signaturePad.toDataURL());
  }

  DeleteProducValue(i: number) {
    if (this.ProductTypeAndProductPartner.length > 0) {
      this.protypeAndpropartner.patchValue({
        producttypelist: "",
      });
      this.protypeAndpropartner.patchValue({
        typeofpage: "",
      });
    }
    this.ProductTypeAndProductPartner.splice(i, 1);
    this.producttypenew.splice(i, 1);
    this.productpartnernew.splice(i, 1);
    this.lastproducttypeid = "";
  }
  // LoopingProductsListTypePatch(data: string | any[], type: string) {
  //   let ProductsList = [];

  //   for (let i = 0; i < data.length; i++) {

  //     for (let j = 0; j < data[i].spartedata.length; j++) {
  //       for (let k = 0; k < data[i].spartedata[j].product_type.length; k++) {
  //         if (type == data[i].spartedata[j].product_type[k]) {
  //           // this.url= data[i].url;
  //           ProductsList.push({
  //             name: data[i].company_name,
  //             url: data[i].url,
  //           });
  //         }
  //       }
  //     }
  //   }

  //   return [...new Set(ProductsList)];
  // }

  LoopingProductsListTypePatch(data: string | any[], type: string) {
    let ProductsList = [];

    for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].producttypesinfo.length; k++) {
        if (type == data[i].producttypesinfo[k]._id) {
          // this.url= data[i].url;
          ProductsList.push({
            id: data[i]._id,
            name: data[i].company_name,
            url: data[i].url,
          });
        }
      }
    }

    return [...new Set(ProductsList)];
  }
  checkValue(event: any) {
    if (event == "") {
      this.ShowProductsPartner = false;
    } else {
      if (
        this.ReadyProductsTypeOptions.find(
          (o) => o.name == event || o == event
        ) == undefined
      ) {
        this.ShowProductsPartner = false;
      } else {
        this.ShowProductsPartner = true;
        setTimeout(() => {
          this.setProductFocus("productpartner");
        }, 100);
      }
    }
  }

  patchProductTpyeValue(event: any) {
    this.ReadyProductsOptions = [];

    if (this.ProductsTypeControl.value != "") {
      if (this.ProductsTypeControl.value) {
        this.ReadyProductsOptions = this.LoopingProductsListTypePatch(
          this.customerList,
          this.ProductsTypeControl.value.id
        );
        // this.ProductTypeArray.push(this.ProductsTypeControl.value);
        // this.producttypenew.push(this.ProductsTypeControl.value);
        this.lastproducttypeid = this.ProductsTypeControl.value.id;
        this.ProductsTypeControl.setValue(this.ProductsTypeControl.value.name);
        this.ShowProductsPartner = true;
        setTimeout(() => {
          this.setProductFocus("productpartner");
        }, 100);
      }
    } else {
      this.ShowProductsPartner = false;
    }

    this.clickpp();
  }
  DeleteProducTypeValue(i: number) {
    this.ProductTypeArray.splice(i, 1);
    this.producttypenew.splice(i, 1);

    let newptarray: any = [];
    this.ProductTypeArray.forEach((element: any) => {
      newptarray.push(element.id);
    });

    this.productpartnerlogoarray = [];
    this.userService
      .getproductpartnerbyproducttypeid(newptarray)
      .subscribe((result: any) => {
        result.forEach((element: any) => {
          if (
            this.productpartnerlogoarray.find(
              (o: any) => o.id == element._id
            ) == undefined
          ) {
            this.productpartnerlogoarray.push({
              id: element._id,
              logo: element.logo,
            });
          }
        });
      });

    this.brancheValue.forEach((element: any) => {
      if (
        this.ProductTypeArray.find((o: any) => o.branch == element) == undefined
      ) {
        const index = this.brancheValue.indexOf(element);

        this.brancheValue.splice(index, 1);
      }
    });
  }

  clickpp() {
    this.filteredProductsOptions = this.ProductsControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  patchProductTpyeValueWithBranch(event: any) {
    this.ReadyProductsOptions = [];
    let selectedpt = this.ProductsTypeControlWithBranch.value;

    if (selectedpt != "") {
      if (selectedpt) {
        let obj = this.ProductTypeArray.find((o: any, i: any) => {
          if (o.id === selectedpt.id) {
            return true; // stop searching
          } else return false
        });
        if (!obj) {
          this.ProductTypeArray.push(selectedpt);
          this.producttypenew.push(selectedpt);

          this.ShowProductsPartner = true;
          setTimeout(() => {
            this.setProductFocus("productpartner");
          }, 100);
        } else {
          Swal.fire("Dieser Produkttyp wurde bereits hinzugefügt", "", "error");
        }
      }
    } else {
      this.ShowProductsPartner = false;
    }
    this.ProductsTypeControlWithBranch.setValue("");
    if (this.ProductTypeArray.length > 0) {
      this.protypeAndpropartner.patchValue({
        producttypelist: "Test",
      });
    }
    this.getproductpartnerbyproducttypeid();
  }
  ThirdTypeDocValue() {
    let match = 0;
    for (let j = 0; j < this.CompanyType.length; j++) {
      if (this.ThirdTypeDoc.value == this.CompanyType[j]) {
        match = 1;
      }
    }
    if (match == 0) {
      this.enableWeiter = false;
    } else {
      this.enableWeiter = true;
    }
    this.RegistrationGroupfirma.patchValue({
      companytype: this.ThirdTypeDoc.value,
    });
  }
  gotosessiondashboard() {
    if (this.tokensession != null) {
      console.log(this.tokensession);
      if (this.currentActiveRole == "b2b") {
        this.router.navigate(["./cefima/b2b-home"]);
      } else {
        this.router.navigate(["./cefima/kunde-home"], {
          queryParams: { id: this.localdata._id },
        });
      }
    } else {
      console.log('else');

      this.router.navigate(["/"]);
    }
  }

  gotosessionmaindata() {
    if (this.currentActiveRole == "b2b") {
      this.router.navigate(["./cefima/b2b-dashboard"], {
        queryParams: { id: this.localdata._id },
      });
    } else {
      this.router.navigate(["./cefima/kunde-home"], {
        queryParams: { id: this.localdata._id, tabname: 1 },
      });
    }
  }
  // ngAfterViewChecked() {
  //   (<any>$('[data-toggle="tooltip"]')).tooltip("show");
  // }
  ngAfterViewInit() {
    if (this.canvas?.nativeElement) {
      this.signaturePad = new SignaturePad(this.canvas.nativeElement);
    }
    $("#brokerhowitworkmodal").css("display", "none");
    var height: any = $(window).height();
    var width: any = $(window).width();
    var correctwidth = width;
    // var newhieght = height-80;
    $(".iconst").css("width", "6%");
    if (width > 545 && width <= 1500) {
      var actualwidthrotate = width;
      if (width > 767 && width <= 1200) {
      }
      width = 545;
      var newtoprotate = (height / 100) * 50;
      if (actualwidthrotate > 767 && actualwidthrotate <= 900) {
        var newtoprotate = (height / 100) * 51;
      } else if (actualwidthrotate > 900 && actualwidthrotate <= 1100) {
        var newtoprotate = (height / 100) * 53;
      } else if (actualwidthrotate > 1100 && actualwidthrotate <= 1200) {
        var newtoprotate = (height / 100) * 58;
      } else if (actualwidthrotate > 1200 && actualwidthrotate <= 1400) {
        var newtoprotate = (height / 100) * 55;
      }
    } else if (width > 1500) {
      var actualwidthrotate = width;
      var widthrotate = width / 10;

      if (width > 1500 && width <= 2000) {
        width = 600;
        var newtoprotate = (height / 100) * 50;
      }
      if (width > 2000 && width <= 2500) {
        width = 700;
        var newtoprotate = (height / 100) * 50;
      }
      if (width > 2500) {
        width = 900;
        var newtoprotate = (height / 100) * 50;
      }
    } else {
      var newwidth = (width * 100) / 545;
    }

    if (width > 600 && width < 800) {
      var widthicon = "8%";
      $(".iconst").css("width", widthicon);

      var newwidth = 900 - width;

      var right = newwidth / 10 - 5 + "%";
      $("#icons1").css("right", right);

      var right = newwidth / 10 + 25 + "%";
      $("#icons2").css("right", right);

      var right = newwidth / 10 + 25 + "%";
      $("#icons3").css("right", right);

      var right = newwidth / 10 + 13 + "%";
      $("#icons4").css("right", right);

      var right = newwidth / 10 - 10 + "%";
      $("#icons5").css("right", right);

      var right = newwidth / 10 + 35 + "%";
      $("#icons6").css("right", right);

      var right = newwidth / 10 + 0 + "%";
      $("#icons7").css("right", right);

      var right = newwidth / 10 + 45 + "%";
      $("#icons8").css("right", right);

      var right = newwidth / 10 + 44 + "%";
      $("#icons9").css("right", right);

      var right = newwidth / 10 - 15 + "%";
      $("#icons10").css("right", right);

      var right = newwidth / 10 + 5 + "%";
      $("#icons11").css("right", right);

      var right = newwidth / 10 + 30 + "%";
      $("#icons12").css("right", right);

      var right = newwidth / 10 + 6 + "%";
      $("#icons13").css("right", right);

      var right = newwidth / 10 - 12 + "%";
      $("#icons14").css("right", right);

      var right = newwidth / 10 + 30 + "%";
      $("#icons15").css("right", right);
    } else if (width > 800) {
      var widthicon = "8%";
      $(".iconst").css("width", widthicon);

      var newwidth = 900 - width;

      var right = newwidth / 10 + "%";
      $("#icons1").css("right", right);

      var right = newwidth / 10 + 30 + "%";
      $("#icons2").css("right", right);

      var right = newwidth / 10 + 32 + "%";
      $("#icons3").css("right", right);

      var right = newwidth / 10 + 18 + "%";
      $("#icons4").css("right", right);

      var right = newwidth / 10 - 6 + "%";
      $("#icons5").css("right", right);

      var right = newwidth / 10 + 45 + "%";
      $("#icons6").css("right", right);

      var right = newwidth / 10 + 4 + "%";
      $("#icons7").css("right", right);

      var right = newwidth / 10 + 53 + "%";
      $("#icons8").css("right", right);

      var right = newwidth / 10 + 50 + "%";
      $("#icons9").css("right", right);

      var right = newwidth / 10 - 10 + "%";
      $("#icons10").css("right", right);

      var right = newwidth / 10 + 10 + "%";
      $("#icons11").css("right", right);

      var right = newwidth / 10 + 36 + "%";
      $("#icons12").css("right", right);

      var right = newwidth / 10 + 12 + "%";
      $("#icons13").css("right", right);

      var right = newwidth / 10 - 7 + "%";
      $("#icons14").css("right", right);

      var right = newwidth / 10 + 47 + "%";
      $("#icons15").css("right", right);
    } else {
      var widthicon = "6%";
      $(".iconst").css("width", widthicon);

      var right = "30%";
      $("#icons1").css("right", right);

      var right = "50%";
      $("#icons2").css("right", right);

      var right = "53%";
      $("#icons3").css("right", right);

      var right = "44%";
      $("#icons4").css("right", right);

      var right = "27%";
      $("#icons5").css("right", right);

      var right = "59%";
      $("#icons6").css("right", right);

      var right = "39%";
      $("#icons7").css("right", right);

      var right = "63%";
      $("#icons8").css("right", right);

      var right = "64%";
      $("#icons9").css("right", right);

      var right = "28%";
      $("#icons10").css("right", right);

      var right = "43%";
      $("#icons11").css("right", right);

      var right = "57%";
      $("#icons12").css("right", right);

      var right = "48%";
      $("#icons13").css("right", right);

      var right = "36%";
      $("#icons14").css("right", right);

      var right = "60%";
      $("#icons15").css("right", right);
    }

    var newheight = height - 80;

    $("#heightid").css("height", newheight);

    let valuenew = $("#goinsidediv").val();
    if (valuenew == "0") {
      var newheight1 = height - 210;
      $("#scrolled").css("height", newheight1);
    } else {
      var newheight1: number = height;
      $("#scrolled").css("height", newheight1);
    }
    if (correctwidth > 1100) {
      $(".section-fix").css("width", width);
      $(".section-fix").css("height", width);
      $("#rotatebtn").css("width", width - 100);
    } else {
      $(".section-fix").css("width", "100%");
      $(".section-fix").css("height", "100%");
      $("#rotatebtn").css("width", "100%");
    }

    if (this.signaturePad != undefined) {
      this.signaturePad.minWidth = 2; // set szimek/signature_pad options at runtime
      this.signaturePad.clear();  // invoke functions from szimek/signature_pad API
    }

    let todaynew = new Date();
    var dd = String(todaynew.getDate()).padStart(2, "0");
    var mm = String(todaynew.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = todaynew.getFullYear();

    var todaynew1 = dd + "." + mm + "." + yyyy;
    this.TodayDate = todaynew1;
    $("#datedynamic").html(todaynew1);
    if (this.ppid != undefined) {
      $("#loginbtn").trigger("click");
      console.log(this.ppid);
    }

    let that = this;

    $("#closeform2").on("click", function () {
      $(".section2").removeClass("slideboxs2");
      // $('#content2').css("display", "none");

      Swal.fire({
        title:
          "Wenn Sie die den Eingabebereich verlassen werden Ihre Daten verworfen.",
        // allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: "Bleiben",
        cancelButtonText: "Verlassen &nbsp; <i class='fa fa-arrow-right'></i>",
      }).then((result) => {
        if (result.value) {
        } else if (result.dismiss === Swal.DismissReason.backdrop) {
          that.reset_company_type();
          // that.company_name_exists = false;

          // that.ThirdTypeDoc.reset();
          //  that.RegistrationGroupfirma.patchValue({
          //    companytype:""
          //  });
        } else {
          that.reset_company_type();
          // that.company_name_exists = false;
          // that.ThirdTypeDoc.reset();
          //  that.RegistrationGroupfirma.patchValue({
          //    companytype:""
          //  });

          $("#sidebar2").removeClass("active");

          $("#aboutus").addClass("active");
          $("#fp-nav").css("display", "block");
          $("#resetsecond").trigger("click");
          $("#formopen").val("0");
        }
      });

      // $('#Firstpage').css("display","block");
      //   $('#aboutus').css("display","block");
      //   $('#privatesection').css("display","block");
      //   $('#footersectionnew').css("display","block");
    });
  }

  captcha = "";
  resolvedcefima11(captchaResponse: string) {
    this.captcha = captchaResponse;
  }
  resetform() {
    this.contactForm.reset();
    this.nextPrev("reset");
  }
  resetformbroker() {
    this.enterTitlebroker = false;
  }
  resetformfirmakunde() {
    $("#checkemailerror").html("");
    $("#checkemailerror").css("background-color", "transparent");
    $("#checkemailerror").css("padding", "0px");

    this.company_name_exists = false;

    this.ThirdTypeDoc.reset();

    this.RegistrationGroupfirma.patchValue({
      companytype: "",
    });

    this.selectfirma = true;
    this.enableWeiter = false;

    // $("#loaderouterid").css("display", "block");

    this.otpSuccess = false;
    this.otp = false;
    $("#resetfirmakunde").trigger("click");

    this.ProductTypeArray = [];
    this.ProductTypeAndProductPartner = [];
    this.producttypenew = [];
    $("#imageidnew11").attr("src", "");

    $("#imageid1").attr("src", "");
    this.phoneFormGroup.patchValue({
      phone_number: "+49",
    });
    $("#innercloseicon").trigger("click");
    this.showmore = false;
    // this.ProductTypeArray=[];
    // this.branchFiledAndProductType='Branche'
    // this.RegistrationGroup.reset();
    // this.RegistrationGroupTwo.reset();
    // this.nextPrev('reset');
    this.enterTitle = true;

    this.RegistrationGroupfirma.patchValue({
      title: "Firma",
      usertitle: "",
    });
  }
  sendcontactdetails() {
    let first_name = this.contactForm.controls["first_name"].value;
    let last_name = this.contactForm.controls["last_name"].value;
    let phone_no = this.contactForm.controls["phone_no"].value;
    let email_address = this.contactForm.controls["email_address"].value;
    let type = this.contactForm.controls["type"].value;
    let message = this.contactForm.controls["message"].value;
    let fileupload = this.contactForm.controls["fileupload"].value;

    if (first_name == "") {
      $("#first_nameerror").html("Bitte Vornamen eingeben");
      $("#messageerror").html("");
      $("#last_nameerror").html("");
      $("#email_addresserror").html("");
      $("#phone_noerror").html("");
    } else if (last_name == "") {
      $("#last_nameerror").html("Bitte Nachnamen eingeben");
      $("#messageerror").html("");
      $("#first_nameerror").html("");
      $("#email_addresserror").html("");
      $("#phone_noerror").html("");
    } else if (email_address == "") {
      $("#email_addresserror").html("Bitte E-Mail-Adresse eingeben");
      $("#messageerror").html("");
      $("#first_nameerror").html("");
      $("#last_nameerror").html("");
      $("#phone_noerror").html("");
    } else if (phone_no == "") {
      $("#phone_noerror").html("Bitte Telefonnummer eingeben");
      $("#messageerror").html("");
      $("#first_nameerror").html("");
      $("#last_nameerror").html("");
      $("#email_addresserror").html("");
    } else if (this.captcha == "") {
      this.captchaError11 = true;
      $("#messageerror").html("");
      $("#first_nameerror").html("");
      $("#last_nameerror").html("");
      $("#email_addresserror").html("");
      $("#phone_noerror").html("");
    } else {
      this.captchaError11 = false;
      $("#messageerror").html("");
      $("#first_nameerror").html("");
      $("#last_nameerror").html("");
      $("#email_addresserror").html("");
      $("#phone_noerror").html("");

      let Data = {};
      $("#loaderouterid").css("z-index", "99999");
      $("#loaderouterid").css("display", "block");
      let formdata = new FormData();
      formdata.append("first_name", first_name);
      formdata.append("last_name", last_name);
      formdata.append("email_address", email_address);
      formdata.append("phone_no", phone_no);
      formdata.append("type", type);
      formdata.append("message", message);
      formdata.append("uploads", this.contactForm.get("img")!.value);

      this.userService.sendcontact(formdata).subscribe((result: any) => {
        if (result.status == "200") {
          this.activity_no = result.data.Activity_No;
          $("#loaderouterid").css("z-index", "9999");
          $("#loaderouterid").css("display", "none");
          this.nextPrev("2");
          this.contactForm.reset();

          $(".feature_item").removeClass("img1active");
          $(".feature_item").removeClass("img2active");
          $(".feature_item").removeClass("img3active");
          $(".feature_item").removeClass("img4active");
          $(".feature_item").removeClass("img5active");
        } else {
          Swal.fire(result.message, "", "error");
        }
      });
    }
  }

  // resetform()
  // {
  //   this.RegistrationGroup.reset();
  // }
  private _filtercompanytype(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.CompanyType.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  LoopingProductsListTypeWithBranch(data: string | any[]): string[] {
    let ProductsList = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].spartedata.length; j++) {
        if ("Gewerbesach" == data[i].spartedata[j].sparte && this.OfferV) {
          for (let k = 0; k < data[i].spartedata[j].product_type.length; k++) {
            let check = data[i].producttypesinfo.find(
              (result: any) =>
                result._id == data[i].spartedata[j].product_type[k]
            );

            if (check) {
              ProductsList.push({
                id: check._id,
                name: check.product_typename,
              });
            }
          }
        }
      }
    }

    // return [...new Set(ProductsList)];
    return [
      ...new Map(
        ProductsList.map((item: any) => [item["name"], item])
      ).values(),
    ];
  }
  // LoopingProductsListTypeWithBranch(data: string | any[]): string[] {

  //   let ProductsList = [];
  //   for (let i = 0; i < data.length; i++) {
  //     for (let j = 0; j < data[i].spartedata.length; j++) {

  //       if ('Gewerbesach' == data[i].spartedata[j].sparte && this.OfferV) {

  //       for (let k = 0; k < data[i].spartedata[j].product_type.length; k++) {

  //           ProductsList.push(data[i].spartedata[j].product_type[k]);
  //         }
  //       }
  //     }
  //   }

  //   return [...new Set(ProductsList)];
  // }

  Offer() {
    this.OfferV = true;
    this.closeButton = true;
    this.HideAndShow = false;
    this.ShowTitleDiv = false;
    this.bestand = false;
    // this.branchFiledAndProductType = "Branche";
    this.ProductTypeArray = [];
    this.ProductsControl.setValue(" ");
    this.protypeAndpropartner.patchValue({
      typeofpage: "test",
    });
    this.ReadyProductsTypeOptionsWithBranch =
      this.LoopingProductsListTypeWithBranch(this.customerList);
  }
  Digi() {
    this.protypeAndpropartner.patchValue({
      typeofpage: "test",
    });

    this.DigiV = true;
    this.closeButton = true;
    this.HideAndShow = false;
    this.ShowTitleDiv = false;
    this.bestand = true;
  }

  Back() {
    this.protypeAndpropartner.patchValue({
      typeofpage: "",
    });
    if (this.ProductTypeArray.length > 0) {
      this.protypeAndpropartner.patchValue({
        producttypelist: "",
      });
    }
    this.branchFiledAndProductType = "Branche";
    this.brancheValue = [];
    this.HideAndShow = true;
    this.OfferV = false;
    this.DigiV = false;
    this.closeButton = false;
  }
  // LoopingProductsListType(data: string | any[]): string[] {
  //   let ProductsList = [];
  //   for (let i = 0; i < this.customerList.length; i++) {

  //     for (let j = 0; j < data[i].spartedata.length; j++) {
  //       for (let k = 0; k < data[i].spartedata[j].product_type.length; k++) {

  //         ProductsList.push(data[i].spartedata[j].product_type[k]);
  //       }
  //     }
  //   }

  //   return [...new Set(ProductsList)];

  // }
  LoopingProductsListType(data: string | any[]): string[] {
    let ProductsList = [];
    for (let i = 0; i < this.customerList.length; i++) {
      for (let k = 0; k < data[i].producttypesinfo.length; k++) {
        // if(this.ReadyProductsTypeOptions.find(o => o.name == event || o == event)==undefined)
        // {

        //   this.ShowProductsPartner=false;
        // }
        ProductsList.push({
          id: data[i].producttypesinfo[k]._id,
          name: data[i].producttypesinfo[k].product_typename,
        });
      }
    }

    // return [...new Set(ProductsList)];
    return [
      ...new Map(
        ProductsList.map((item: any) => [item["name"], item])
      ).values(),
    ];
  }
  changeB_t(e: any) {
    this.branchFiledAndProductType = e;
  }
  sendit(event: any) { }
  senditwe(event: any) { }
  LoopingBrancheslistnew(data: any) {
    let ProductsList = [];

    for (let i = 0; i < data.length; i++) {
      // for (let j = 0; j < data[i].spartedata.length; j++) {
      ProductsList.push(data[i].BrancheAndProducttype[0].branch);

      // }
    }

    return [...new Set(ProductsList)];
  }

  patchBranchTpyeValue(event: any) {
    if (this.branchTypeControl.value != "") {
      for (let i = 0; i < this.branchlisttotal.length; i++)
        if (this.branchTypeControl.value) {
          for (let i = 0; i < this.branchlisttotal.length; i++) {
            if (
              this.branchlisttotal[i].branchname == this.branchTypeControl.value
            ) {
              for (
                let j = 0;
                j < this.branchlisttotal[i].producttypesinfo.length;
                j++
              ) {
                let obj = this.ProductTypeArray.find((o: any) => {
                  if (
                    o.id === this.branchlisttotal[i].producttypesinfo[j]._id
                  ) {
                    return true; // stop searching
                  } else return false
                });

                if (obj == undefined) {
                  this.ProductTypeArray.push({
                    id: this.branchlisttotal[i].producttypesinfo[j]._id,
                    name: this.branchlisttotal[i].producttypesinfo[j]
                      .product_typename,
                    branch: this.branchTypeControl.value,
                  });

                  this.producttypenew.push({
                    id: this.branchlisttotal[i].producttypesinfo[j]._id,
                    name: this.branchlisttotal[i].producttypesinfo[j]
                      .product_typename,
                    branch: this.branchTypeControl.value,
                  });

                  if (
                    this.brancheValue.find(
                      (o: any) => o == this.branchTypeControl.value
                    ) == undefined
                  ) {
                    this.brancheValue.push(this.branchTypeControl.value);
                  }

                  this.ShowProductsPartner = true;

                  setTimeout(() => {
                    this.setProductFocus("productpartner");
                  }, 100);
                }
              }
            }
          }

          this.protypeAndpropartner.patchValue({
            branch: this.branchTypeControl.value,
          });
          this.BranchArray = this.branchTypeControl.value;

          this.branchTypeControl.setValue("");

          if (this.ProductTypeArray.length > 0) {
            this.protypeAndpropartner.patchValue({
              producttypelist: "Test",
            });
          }
        }
    }

    this.getproductpartnerbyproducttypeid();
  }

  getproductpartnerbyproducttypeid() {
    let newptarray: any = [];
    this.ProductTypeArray.forEach((element: any) => {
      newptarray.push(element.id);
    });

    this.productpartnerlogoarray = [];

    this.userService
      .getproductpartnerbyproducttypeid(newptarray)
      .subscribe((result: any) => {
        result.forEach((element: any) => {
          if (
            this.productpartnerlogoarray.find(
              (o: any) => o.id == element._id
            ) == undefined
          ) {
            this.productpartnerlogoarray.push({
              id: element._id,
              logo: element.logo,
            });
          }
        });
      });
  }

  showfilled() {
    if (this.showmore) {
      this.showmore = false;
    } else {
      this.showmore = true;
    }
  }

  patchProductValue(event: any) {
    if (this.ProductsControl.value.name != "") {
      if (this.ProductsControl.value.name) {
        let obj = this.ProductTypeAndProductPartner.find((o: any, i: any) => {
          if (
            o.ProductType ===
            `${this.ProductsControl.value.name.toUpperCase()}   -->  Produkt  ${this.ProductsTypeControl.value
            }`
          ) {
            return true; // stop searching
          } else return false;
        });

        if (obj) {
          Swal.fire("Dieser Produkttyp wurde bereits hinzugefügt", "", "error");
          this.ProductsControl.setValue("");
        } else {
          this.ProductTypeAndProductPartner.push({
            ProductType: `${this.ProductsControl.value.name.toUpperCase()}   -->  Produkt  ${this.ProductsTypeControl.value
              }`,
            url: this.ProductsControl.value.url,
          });

          this.productpartnernew.push(this.ProductsControl.value);
          this.producttypenew.push({
            id: this.lastproducttypeid,
            name: this.ProductsTypeControl.value,
          });

          this.ProductsControl.setValue("");
          this.ProductsTypeControl.setValue("");
          this.ShowButton = false;
        }
      }
    } else {
      this.ProductsControl.setValue(" ");
      this.ShowButton = true;
    }
    if (this.ProductTypeAndProductPartner.length > 0) {
      this.protypeAndpropartner.patchValue({
        producttypelist: "Test",
      });
      this.protypeAndpropartner.patchValue({
        typeofpage: "test",
      });
    }
    // this.Links = `/upload-document/${this.user_id}/${this.document_type}/${this.ProductsControl.value.name}`;
  }
  private _filter(value: any): string[] {
    let filterValue = "";
    if (typeof value == "object") {
      filterValue = value.name.toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }
    return this.ReadyProductsOptions.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterTypeBranch(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.branchlist.filter((option: string) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  private _filterTypeProducts(value: string) {
    if (typeof value != "object") {
      const filterValue = value.toLowerCase();

      return this.ReadyProductsTypeOptions.filter((option: any) =>
        option.name.toLowerCase().includes(filterValue)
      );
    }
  }
  hidemodalbackdrop() {
    setTimeout(() => {
      $(".modal-backdrop").css("z-index", "-1");
    }, 100);
  }
  BindValues() {
    this.hidemodalbackdrop();
    let msg =
      this.addressFormGroup.controls["street"].value +
      " " +
      this.addressFormGroup.controls["streetNumber"].value +
      "<br>" +
      this.addressFormGroup.controls["postCode"].value +
      " " +
      this.addressFormGroup.controls["city"].value;
    $("#addressid").html(msg);
    $("#first1").html(this.RegistrationGroupfirma.controls["firstname"].value);
    $("#first2").html(this.RegistrationGroupfirma.controls["firstname"].value);
    $("#first3").html(this.RegistrationGroupfirma.controls["firstname"].value);
    $("#first31").html(this.RegistrationGroupfirma.controls["firstname"].value);
    $("#first4").html(this.RegistrationGroupfirma.controls["firstname"].value);
    $("#first5").html(this.RegistrationGroupfirma.controls["firstname"].value);
    $("#first6").html(this.RegistrationGroupfirma.controls["firstname"].value);
    $("#first7").html(this.RegistrationGroupfirma.controls["firstname"].value);
    $("#last").html(this.RegistrationGroupfirma.controls["lastname"].value);
    $("#last1").html(
      " " + this.RegistrationGroupfirma.controls["lastname"].value
    );
    $("#last2").html(this.RegistrationGroupfirma.controls["lastname"].value);
    $("#last3").html(
      " " + this.RegistrationGroupfirma.controls["lastname"].value
    );
    $("#last31").html(this.RegistrationGroupfirma.controls["lastname"].value);
    $("#last5").html(this.RegistrationGroupfirma.controls["lastname"].value);
    $("#last7").html(this.RegistrationGroupfirma.controls["lastname"].value);

    // if (this.SecDomChangenew == "show") {

    if (this.RegistrationGroupfirma.controls["title"].value == "Firma") {
      $("#companyname1").html(
        "<br>vertr.d " +
        this.RegistrationGroupfirma.controls["companyName"].value
      );
      $("#companyname3").html(
        "<br>vertr.d " +
        this.RegistrationGroupfirma.controls["companyName"].value
      );
      $("#companyname2").html(
        "<br>vertr.d " +
        this.RegistrationGroupfirma.controls["companyName"].value
      );
      this.companyname1 =
        this.RegistrationGroupfirma.controls["companyName"].value;
      this.companyname2 =
        this.RegistrationGroupfirma.controls["companyName"].value;
      $("#companyname").html(
        "<br>vertr.d " +
        this.RegistrationGroupfirma.controls["companyName"].value
      );
    }
    // }

    $("#addressid1").html(msg);
  }

  ngOnInit() {
    //   $(document).ready(function(){
    //     $("input").hover(function(){
    //         $("autofocus").appendTo("input");
    //     });
    // });

    if (this.localdata != null && this.localdata.companies_with_roles) {
      if (
        this.localdata.companies_with_roles.length == 1 &&
        this.localdata.companies_with_roles[0] == "cefima_customer"
      ) {
        this.dont_show_maine_firma = true;
      } else {
        this.dont_show_maine_firma = false;
      }
    }

    this.nothingForm = new FormGroup({
      hide: new FormControl(""),
    });
    $(document).ready(function () {
      $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
        $("#content").css("display", "block");

        $("#Firstpage").removeClass("active");
        $("#fp-nav").css("display", "none");
        $("#formopen").val("1");
        // $('#privatesection').css("display","none");
        // $('#footersectionnew').css("display","none");
      });

      $("#closeform").on("click", function () {
        Swal.fire({
          title:
            "Wenn Sie die den Eingabebereich verlassen werden Ihre Daten verworfen.",
          showCancelButton: true,
          confirmButtonText: "Bleiben",
          cancelButtonText:
            "Verlassen &nbsp; <i class='fa fa-arrow-right'></i>",
        }).then((result) => {
          let that = this;

          if (result.value) {
          } else if (result.dismiss === Swal.DismissReason.backdrop) {
          } else {
            $("#sidebar").removeClass("active");

            $("#Firstpage").addClass("active");
            $("#fp-nav").css("display", "block");

            //reset form

            $("#emailiderrorfirst").html("");
            $("#emailiderrorfirst").css("background-color", "transparent");
            $("#emailiderrorfirst").css("padding", "0px");
            $("#resetbrokerbutton").trigger("click");
            $("#formopen").val("0");
            $("#resetbrokerbuttonsecond").trigger("click");
          }
        });
        // $('#Firstpage').css("display","block");
        // $('#aboutus').css("display","block");
        // $('#privatesection').css("display","block");
        // $('#footersectionnew').css("display","block");
      });
      // let that = this;
      $("#sidebarCollapse2").on("click", function () {
        $("#sidebar2").addClass("active");
        // $('#content2').css("display", "block");

        $(".section2").addClass("slideboxs2");

        $("#aboutus").removeClass("active");
        $("#fp-nav").css("display", "none");
        $("#formopen").val("2");
        // $('#Firstpage').css("display","none");
        // $('#privatesection').css("display","none");
        // $('#footersectionnew').css("display","none");
      });

      /*
     $('#closeform2').on('click', function () {

      $('.section2').removeClass('slideboxs2');

      Swal.fire({
        title: "Wenn Sie die den Eingabebereich verlassen werden Ihre Daten verworfen.",
        showCancelButton: true,
        confirmButtonText: "Bleiben",
        cancelButtonText: "Verlassen &nbsp; <i class='fa fa-arrow-right'></i>"
      }).then(result => {

        if( result.value){

        }
       else if ( result.dismiss === Swal.DismissReason.backdrop) {

          that.reset_company_type();
        }else{
          that.reset_company_type();


          $('#sidebar2').removeClass('active');

          $('#aboutus').addClass("active");
            $('#fp-nav').css("display","block");
            $('#resetsecond').trigger('click');
            $('#formopen').val("0");

        }
      })



    });
    */

      $("#sidebarCollapse3").on("click", function () {
        $("#sidebar3").toggleClass("active");
        // $('#content3').css("display", "block");
        $(".section2").addClass("slideboxs2");
        $("#privatesection").removeClass("active");
        $("#fp-nav").css("display", "none");
        $("#formopen").val("3");
        // $('#Firstpage').css("display","none");
        // $('#aboutus').css("display","none");
        // $('#footersectionnew').css("display","none");
      });

      $("#closeform3").on("click", function () {
        $(".section2").removeClass("slideboxs2");
        // $('#content3').css("display", "none");

        Swal.fire({
          title:
            "Wenn Sie die den Eingabebereich verlassen werden Ihre Daten verworfen.",
          showCancelButton: true,
          confirmButtonText: "Bleiben",
          cancelButtonText:
            "Verlassen &nbsp; <i class='fa fa-arrow-right'></i>",
        }).then((result) => {
          if (result.value) {
          } else if (result.dismiss === Swal.DismissReason.backdrop) {
          } else {
            $("#sidebar3").removeClass("active");

            $("#privatesection").addClass("active");
            $("#fp-nav").css("display", "block");
            $("#resetthird").trigger("click");
            $("#formopen").val("0");
          }
        });

        // $('#Firstpage').css("display","block");
        //     $('#aboutus').css("display","block");
        //     $('#privatesection').css("display","block");
        //     $('#footersectionnew').css("display","block");
      });
    });

    this.contactForm = this.formBuilder.group({
      type: ["", [Validators.required]],
      message: ["", [Validators.required]],
      fileupload: ["", [Validators.required]],
      img: [null],
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      phone_no: ["", [Validators.required]],
      email_address: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    var url = window.location.pathname;
    // ===== 02. OffCanvasMenu
    // $(".homemenu").on("click", function () {

    //   $(".homemenu").removeClass("active");
    //   $(this).addClass("active");
    // });

    (function () {
      "use strict";

      $(".input-file1").each(function () {
        var $input = $(this),
          $label = $input.next(".js-labelFile1"),
          labelVal = $label.html();
        $input.on("change", function (element: any) {
          var fileName = "";
          if (element.target.value)
            fileName = element.target.value.split("\\").pop();
          fileName
            ? $label.addClass("has-file1").find(".js-fileName1").html(fileName)
            : $label.removeClass("has-file1").html(labelVal);
        });
      });
    })();

    (function offcanvasMenu() {
      // Set Click Function For open

      $(".offcanvas-toggler").on("click", function (e) {
        e.preventDefault();

        $(".offcanvas-wrapper").addClass("show-offcanvas");

        $(".offcanvas-overly").addClass("show-overly");
      });

      // Set Click Function For Close

      $(".offcanvas-close").on("click", function (e) {
        e.preventDefault();

        $(".offcanvas-overly").removeClass("show-overly");

        $(".offcanvas-wrapper").removeClass("show-offcanvas");
      });

      // Set Click Function on Overly For open on

      $(".offcanvas-overly").on("click", function (e) {
        $(this).removeClass("show-overly");

        $(".offcanvas-wrapper").removeClass("show-offcanvas");
      });
    })();

    if (window.location.pathname == "/") {
      document.body.classList.remove("main");
      document.body.classList.add("mainfist");
    }

    $(document).ready(function () {
      //@ts-ignore
      // $('[data-toggle="tooltip"]').tooltip();
    });
    function rescaleCaptcha() {
      var width: any = $(window).width();
      var newwidth = $(".login-form").width();

      if (width > 767 && width < 992) {
        var scalenew = 1.2;
      } else if (width > 620 && width <= 767) {
        var scalenew = 1.1;
      } else if (width > 530 && width <= 620) {
        var scalenew = 1;
      } else if (width > 410 && width <= 530) {
        var scalenew = 0.9;
      } else if (width > 320 && width <= 410) {
        var scalenew = 0.7;
      } else if (width > 200 && width <= 320) {
        var scalenew = 0.6;
      } else if (width > 0 && width <= 200) {
        var scalenew = 0.5;
      } else if (width > 1600) {
        var scalenew = 1.2;
      } else if (width > 992 && width <= 1150) {
        var scalenew = (width / 100) * 0.065;
      } else {
        var scalenew = (width / 100) * 0.075;
      }

      var newvar = "scale(" + scalenew + ")";
    }

    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    this.forgotPasswordForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    $("#newstep1").css("display", "block");

    this.phoneFormGroup = new FormGroup({
      phone_number: new FormControl("", Validators.required),
      otp: new FormControl("", Validators.required),
    });

    // this.phoneFormGroup = new FormGroup({
    //   phone_number: new FormControl(""),
    //   otp: new FormControl(""),
    // });

    this.RegistrationGroupfirma = new FormGroup({
      title: new FormControl("", Validators.required),

      usertitle: new FormControl("", Validators.required),

      firstname: new FormControl("", Validators.required),
      lastname: new FormControl("", Validators.required),
      companytype: new FormControl(""),
      companyName: new FormControl(""),
    });

    this.RegistrationGroup = new FormGroup({
      title: new FormControl("", Validators.required),
      firstname: new FormControl("", Validators.required),
      lastname: new FormControl("", Validators.required),
    });

    this.RegistrationGroupTwo = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern(
          "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
        ),
      ]),
    });

    this.addressFormGroup = this.formBuilder.group({
      street: ["", Validators.required],
      streetNumber: ["", Validators.required],
      postCode: ["", Validators.required],
      city: ["", Validators.required],
      additionalReference: [""],
      countryOfResidence: ["", Validators.required],
      mobile_number: [""],
      verified_number: [""],
      fax_number: [""],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
    });

    this.filteredProductsOptions = this.ProductsControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );

    this.filteredProductsTypeOptions =
      this.ProductsTypeControl.valueChanges.pipe(
        startWith(""),
        map((value) => this._filterTypeProducts(value))
      );

    this.filteredProductsTypeOptionsWithBranch =
      this.ProductsTypeControlWithBranch.valueChanges.pipe(
        startWith(""),
        map((value) => this._filterTypeProductsWithBranch(value))
      );

    this.FilterBranchTypeOptions = this.branchTypeControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterTypeBranch(value))
    );

    this.protypeAndpropartner = new FormGroup({
      producttype: new FormControl(""),
      productpartner: new FormControl(""),
      branch: new FormControl(""),
      typeofpage: new FormControl("", Validators.required),
      producttypelist: new FormControl("", Validators.required),
    });
    this.ThirdTypeDocOptions = this.ThirdTypeDoc.valueChanges.pipe(
      startWith(""),
      map((value) => this._filtercompanytype(value))
    );
    this.userService.getListBranch({}).subscribe((success: any) => {
      this.branchlisttotal = success;
      this.branchlist = this.LoopingBrancheslistnew(success);
    });

    const data = this.userService.getproductpartner().subscribe(
      (success: any) => {
        // if success and error give response

        if (success.status == "error") {
          this.error = success.message;
        } else {
          this.customerList = success;
          //this.setPage(1);
          this.recordCount = success.length;

          // this.ReadyBranchTypeOptions = this.LoopingBranchesList(success);

          this.ReadyProductsTypeOptions = this.LoopingProductsListType(success);

          this.ReadyProductsTypeOptionsWithBranch =
            this.LoopingProductsListTypeWithBranch(success);
        }
      },
      (rejected) => { }
    );

    this.RegistrationGroupfirma.patchValue({
      title: "Firma",
    });

    this.selectfirma = true;
  }

  checkemailnew() {
    $("#checkemailerror").html("");
    $("#checkemailerror").css("background-color", "transparent");
    $("#checkemailerror").css("padding", "0px");
    let datanew = { email: this.addressFormGroup.controls["email"].value };
    this.userService
      .checkemail(datanew)
      .pipe(first())
      .subscribe((data11: any) => {
        if (data11["status"] == "200") {
          this.companykundevalidemail = true;
          $("#checkemailerror").html("");
          $("#checkemailerror").css("background-color", "transparent");
          $("#checkemailerror").css("padding", "0px");
        } else {
          this.companykundevalidemail = false;
          $("#checkemailerror").html(data11["msg"]);
          $("#checkemailerror").css("background-color", "white");
          $("#checkemailerror").css("padding", "10px");
        }
      });
  }

  checkemailnew1() {
    $("#emailiderrorfirst").html("");
    $("#emailiderrorfirst").css("background-color", "transparent");
    $("#emailiderrorfirst").css("padding", "0px");
    let datanew = { email: this.RegistrationGroupTwo.controls["email"].value };
    this.userService
      .checkemail(datanew)
      .pipe(first())
      .subscribe((data11: any) => {
        if (data11["status"] == "200") {
          $("#emailiderrorfirst").html("");
          $("#emailiderrorfirst").css("background-color", "transparent");
          $("#emailiderrorfirst").css("padding", "0px");

          this.email_exists = false;
          if (
            this.capcthdata == "null" ||
            this.capcthdata == "" ||
            this.capcthdata == null
          ) {
            this.recaptchaButton = true;
          } else {
            this.recaptchaButton = false;
          }
        } else {
          $("#emailiderrorfirst").html(data11["msg"]);
          $("#emailiderrorfirst").css("background-color", "white");
          $("#emailiderrorfirst").css("padding", "10px");
          this.recaptchaButton = true;
          this.email_exists = true;
        }
      });
  }

  handleAllFields(data: any) {
    const splitArr = data.address_components;
    this.getAllFields(splitArr);
  }
  getCountryland(data: any): any {
    let that = this;
    const splitArr = data;

    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;

      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
          }

          let localityCountry = that.countryName;
          that.addressFormGroup.patchValue({
            countryOfResidence: localityCountry,
          });
        }
      }
    });
  }
  handleAddressChangeland(data: any) {
    const splitArr = data.address_components;
    this.getCountryland(splitArr);
  }
  getAllFields(data: any): any {
    let that = this;
    const splitArr = data;
    let str = "";
    this.showmore = false;

    splitArr.forEach(function (i: any, k: any) {
      that.showmore = true;
      let content: any = i.types;

      const found = content.find((element: any) => (element = "street_number"));
      if (found === "street_number") {
        that.addressFormGroup.patchValue({ streetNumber: i.short_name });
      } else if (found === "postal_code") {
        that.addressFormGroup.patchValue({ postCode: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;

        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.addressFormGroup.patchValue({
              countryOfResidence: i.long_name,
            });
          }
          if (countryArr[index] === "locality") {
            that.addressFormGroup.patchValue({ city: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      that.addressFormGroup.patchValue({ street: str });
    } else {
      that.addressFormGroup.patchValue({ street: "" });
    }
  }

  private _filterTypeProductsWithBranch(value: string): string[] {
    //const filterValue = value.toLowerCase();
    const filterValue = value.toString().toLowerCase();
    return this.ReadyProductsTypeOptionsWithBranch.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  showTitleError(event: any) {
    if (
      (event != "" &&
        this.RegistrationGroupfirma.controls["title"].value == "") ||
      this.RegistrationGroupfirma.controls["title"].value == null
    ) {
      this.enterTitle = true;
    } else {
      this.enterTitle = false;
    }
  }
  showBrokerTitleError(event: any) {
    if (
      (event != "" && this.RegistrationGroup.controls["title"].value == "") ||
      this.RegistrationGroup.controls["title"].value == null
    ) {
      this.enterTitlebroker = true;
    } else {
      this.enterTitlebroker = false;
    }
  }
  titleChangeBroker($event: any) {
    this.enterTitlebroker = false;
  }
  titleChange($event: any) {
    this.enterTitle = false;
    setTimeout(() => {
      if (this.RegistrationGroupfirma.controls["title"].value != "Firma") {
        this.enableWeiter = true;
        this.RegistrationGroupfirma.patchValue({ countryName: " " });
        this.selectfirma = false;

        this.RegistrationGroupfirma.get("companyName")!.clearValidators();
        this.RegistrationGroupfirma.get(
          "companyName"
        )!.updateValueAndValidity();

        this.RegistrationGroupfirma.get("companytype")!.clearValidators();
        this.RegistrationGroupfirma.get(
          "companytype"
        )!.updateValueAndValidity();
      } else {
        this.selectfirma = true;
        this.RegistrationGroupfirma.get("companyName")!.setValidators([
          Validators.required,
        ]);
        this.RegistrationGroupfirma.get(
          "companyName"
        )!.updateValueAndValidity();

        this.RegistrationGroupfirma.get("companytype")!.setValidators([
          Validators.required,
        ]);
        this.RegistrationGroupfirma.get(
          "companytype"
        )!.updateValueAndValidity();
      }
    }, 100);
  }

  navactiveset() {
    (function navactiveset() {
      $(".nav-link").on("click", function () {
        $(".active-link").removeClass("active-link");
        $(this).addClass("active-link");
      });
    })();
  }

  getRef(fullPageRef: any) {

    // this.fullpage_api = fullPageRef;
  }

  get f() {
    return this.loginForm.controls;
  }
  get for() {
    return this.forgotPasswordForm.controls;
  }
  forgotPassword() {
    this.forgotPasswordFormShow = true;
    this.loginError = false;
    this.forgotClass = "forgotCls";
    //this.router.navigate(['./forgot-password']);
  }

  palyVideo() {
    var w: any = $(window).width();
    var h: any = $(window).height();

    $("#video").css("display", "block");
    $("#div1").css("display", "none");
    $("#previewimg").css("display", "block");
    // @ts-ignore
    $("#video")[0].src =
      "https://www.youtube.com/embed/XsJPbKNo0V0?showinfo=0&controls=0&autoplay=1&loop=11";

    $("#video").css("height", h);
    $("#video").css("width", w);
    $("#video").trigger("play");
  }

  closeV() {
    $("#div1").css("display", "block");
    $("#video").css("display", "none");
    $("#previewimg").css("display", "none");
    // @ts-ignore
    $("#video")[0].src = "";
  }

  get RegistrationInfoFormTwo() {
    return this.RegistrationGroupTwo.controls;
  }

  checknumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }
  resolveduser(captchaResponse: string) {
    $("#emailiderrorfirst").html("");
    $("#emailiderrorfirst").css("background-color", "transparent");
    $("#emailiderrorfirst").css("padding", "0px");
    this.userService
      .checkemail({ email: this.RegistrationInfoFormTwo["email"].value })
      .pipe(first())
      .subscribe((data: any) => {
        if (data["status"] == 200) {
        } else {
          $("#emailiderrorfirst").html(data["msg"]);
          $("#emailiderrorfirst").css("background-color", "white");
          $("#emailiderrorfirst").css("padding", "10px");
          // let response:any = grecaptcha.getResponse();
          // response.reset();
        }

        this.capcthdata = captchaResponse;
        if (captchaResponse == null) {
          this.recaptchaButton = true;
        } else {
          let emailnew: any = this.RegistrationInfoFormTwo["email"].value;
          let result = this.validateEmail(emailnew);

          if (result && this.email_exists == false) {
            this.recaptchaButton = false;
          } else {
            this.recaptchaButton = true;
          }
        }
      });
  }
  public verify() {
    this.otpError = false;

    // this.phone_number = this.phoneFormGroup.value.phone_number;
    var width = $(window).width();
    this.phoneData["phoneNumber"] =
      this.phoneFormGroup.controls["phone_number"].value;
    this.userService.sendVerificationCode1(this.phoneData).subscribe(
      (success: any) => {
        // if success and error give response
        if (success) {
          this.otp = true;
          setTimeout(() => {
            this.setFocus("otp");
          }, 100);
          // document.getElementById('focusfield').focus()
          // $("#focusfield").attr("autofocus");
          localStorage.setItem("key", JSON.stringify(success));
          return true;
        } else {
          this.otp = false;
          return false;
        }
      },
      (rejected) => { }
    );
    //  this.otp = true;
    return true;
  }
  gotoaddress() {
    const input1: any = document.querySelector("#phonenum");
    intlTelInput(input1, {
      initialCountry: "de",
      geoIpLookup: function (callback) {
        $.get("http://ipinfo.io", function () { }, "jsonp").always(function (
          resp
        ) {
          var countryCode = resp && resp.country ? resp.country : "de";
          callback(countryCode);
        });
      },
    });
    const input2: any = document.querySelector("#verified_number");
    intlTelInput(input2, {
      initialCountry: "de",
      geoIpLookup: function (callback) {
        $.get("http://ipinfo.io", function () { }, "jsonp").always(function (
          resp
        ) {
          var countryCode = resp && resp.country ? resp.country : "de";
          callback(countryCode);
        });
      },
    });
    const input3: any = document.querySelector("#fax_number");
    intlTelInput(input3, {
      initialCountry: "de",
      geoIpLookup: function (callback) {
        $.get("http://ipinfo.io", function () { }, "jsonp").always(function (
          resp
        ) {
          var countryCode = resp && resp.country ? resp.country : "de";
          callback(countryCode);
        });
      },
    });
    this.addressFormGroup.patchValue({
      mobile_number: "+49",
      fax_number: "+49",
    });
    setTimeout(() => {
      if (this.OfferV) {
        $("#gotoaddressstep1").trigger("click");
      } else {
        $("#gotoaddressstep").trigger("click");
      }
    }, 100);
  }
  gotonexttab() {
    const input: any = document.querySelector("#phone");
    intlTelInput(input, {
      initialCountry: "de",
      geoIpLookup: function (callback) {
        $.get("http://ipinfo.io", function () { }, "jsonp").always(function (
          resp
        ) {
          var countryCode = resp && resp.country ? resp.country : "de";
          callback(countryCode);
        });
      },
    });
  }
  public sleep(ms: any) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  async Nextstep() {
    await this.sleep(2000);

    $("#nextstep").trigger("click");
    $("#loaderouterid").css("display", "none");
  }

  public verifyOtp() {
    var width = $(window).width();

    this.otpSuccess = false;
    this.otpError = false;

    $("#loaderouterid").css("display", "block");

    if (this.phoneFormGroup.controls["otp"].value == "") {
      this.otpError = true;
      this.otp = false;
      $("#loaderouterid").css("display", "none");
      return false;
    } else {
      //this.showCustomerOnly = true;
      this.renderer.setAttribute(this.el.nativeElement, "disabled", "true");
      this.otp = this.phoneFormGroup.controls["otp"].value;

      if (this.otp) {
        this.verificationData["otp"] = this.otp;
        this.verificationData["requestId"] = JSON.parse(
          localStorage.getItem("key")!
        );
        this.verificationData["userId"] = "";
        this.verificationData["phone_number"] =
          this.phoneFormGroup.controls["phone_number"].value;

        this.userService
          .checkVerificationverifyphoneforcustomerregister(
            this.verificationData
          )
          .subscribe(
            (success: any) => {
              // if success and error give response
              if (success == 0) {
                setTimeout(() => {
                  this.otpSuccess = true;

                  this.Nextstep();

                  return true;
                }, 2000);
              } else {
                setTimeout(() => {
                  // this.Nextstep();
                  this.otpError = true;
                  this.otp = false;
                  this.phoneFormGroup.patchValue({
                    otp: "",
                  });
                  $("#loaderouterid").css("display", "none");
                  return true;
                }, 2000);
              }
            },
            (rejected) => {
              $("#loaderouterid").css("display", "none");
            }
          );
        // $("#loaderouterid").css("display", "none");
        // this.Nextstep();
        // this.otpSuccess = true;

        return true;
      } else {
        this.otpError = true;
        $("#loaderouterid").css("display", "none");
        return false;
      }
    }
  }
  validateEmail(email: any) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  UpdateEmail(e: any) {
    let result = this.validateEmail(e.target.value);

    if (result) {
      if (
        this.capcthdata == "null" ||
        this.capcthdata == "" ||
        this.capcthdata == null
      ) {
        this.recaptchaButton = true;
      } else {
        this.recaptchaButton = false;
      }
    } else {
      this.recaptchaButton = true;
    }
  }

  get RegistrationInfoForm() {
    return this.RegistrationGroup.controls;
  }

  CasePostforbroker(projectdatanew: any, response: any) {
    this.userService
      .CaseListUpload(projectdatanew)
      .pipe(first())
      .subscribe(
        (data) => { },
        (error) => {
          $("#loaderouterid").css("display", "none");
        },
        () => {
          let dataObj: any = {};
          dataObj["id"] = response["user"]._id;
          Swal.fire({
            //title: `Benutzer erfolgreich hinzugefügt und Verifizierungs E-Mail versandt. Ihre Vorgangs Nr. ist: `+ response["user"].brokerregticketno,
            title:
              `Vermittler erfolgreich hinzugefügt und Verifizierungs E-Mail versandt. Ihre Vorgangs Nr. ist: ` +
              response["user"].brokerregticketno,
            showCloseButton: true,
            allowOutsideClick: false,
            confirmButtonText:
              "Zur Startseite <i class='fa fa-arrow-right'></i>",
            iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
            confirmButtonColor: '#02a9ed',
            customClass: {
              icon: 'no-border'
            },
          })
            .then((result) => {
              if (result["isDismissed"]) {
                $("#resetid").trigger("click");
                $("#resetbrokerbuttonsecond").trigger("click");
                this.CloseFormDiv(null);
              } else {
                $("#resetid").trigger("click");
                $("#resetbrokerbuttonsecond").trigger("click");

                this.CloseFormDiv(null);
              }
            })
            .catch((err) => { });
          $("#loaderouterid").css("display", "none");
        }
      );
  }

  register() {
    $("#emailiderrorfirst").html("");
    $("#emailiderrorfirst").css("background-color", "transparent");
    $("#emailiderrorfirst").css("padding", "0px");
    $("#loaderouterid").css("display", "block");
    let data = {
      // Personal Information
      title: this.RegistrationInfoForm["title"].value,
      companyName: " ",
      firstname: this.RegistrationInfoForm["firstname"].value,
      lastname: this.RegistrationInfoForm["lastname"].value,
      email: this.RegistrationInfoFormTwo["email"].value,
      contactno: "",
      password: "",
      termsandconditions: " ",
      broker_type: " ",
      industrial_customer: " ",
      indivisual_customer: " ",
      private_customer: " ",
      email_verify: "1",
      mobile_verify: "1",
    };

    this.userService
      .registerUserB2B(data)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data["status"] == "200" || data["status"] == 200) {
            let newemployee = [];
            newemployee.push("5fb56bfa3a90792ac8e4227c");
            newemployee.push(data["user"]._id);

            let projectdatanew = {
              employee_id: newemployee,
              Uploaded_By: `${this.RegistrationGroup.controls["firstname"].value} ${this.RegistrationGroup.controls["lastname"].value}`,
              Transaction_Type: "Vermittlerregistrierung",
              uploaddate: new Date().toISOString(),
              updateticket_no: data["user"].brokerregticketno,
              companyname: "42140 DFG Finanzprofi GmbH",
              Type: "Vermittlerregistrierung",
            };

            this.CasePostforbroker(projectdatanew, data);

            // let dataObj = {};
            // dataObj["id"] = data["user"]._id;
            // Swal.fire({
            //   title: `Benutzer erfolgreich hinzugefügt und Verifizierungs E-Mail versandt. Ihre Vorgangs Nr. ist: `+ data["user"].brokerregticketno,
            //   showCloseButton: true,
            //   allowOutsideClick: false,
            //   icon: "success",
            // })
            //   .then((result) => {

            //     if (result["isDismissed"]) {
            //       $("#resetid").trigger("click");

            //       // this.logout();
            //       this.CloseFormDiv(null);

            //       // this.router.navigate([`/upload-document/${this.user_id}`], {
            //       //   queryParams: { user_id: this.user_id },
            //       // });
            //     } else {
            //       $("#resetid").trigger("click");

            //       this.CloseFormDiv(null);
            //     }
            //   })
            //   .catch((err) => {});
            // $("#loaderouterid").css("display", "none");
          } else {
            Swal.fire({
              title: `E-Mail id ist bereits registriert. Bitte geben Sie eine andere E-Mail id ein`,
              showCloseButton: true,
              allowOutsideClick: false,
              icon: "error",
            });
            $("#loaderouterid").css("display", "none");
          }
        },
        (error) => {
          Swal.fire({
            title: "Etwas ist schief gelaufen!",
            showCloseButton: true,
            allowOutsideClick: false,
            icon: "error",
          });
          $("#loaderouterid").css("display", "none");
        }
      );
  }

  CloseFormDiv(e: any) {
    // $('#closeform').trigger('click');
    this.resetformfirmakunde();
    $("#sidebar").removeClass("active");

    $("#Firstpage").addClass("active");
    $("#fp-nav").css("display", "block");
  }

  OpenPreRegistration() {
    $(".video").removeClass("AnimateVideoBack");
    $(".main-div-close").removeClass("AnimateR");
    $(".video").addClass("AnimateVideo");

    setTimeout(() => {
      (function () {
        //$(".main-div-close").removeClass("Animate");
        $(".main-div-close").addClass("AnimateBack");
      })();

      $("#MuteOff").animate({
        width: "toggle",
      });
      $("#MuteOn").animate({
        width: "toggle",
      });
      $(".bottomtwobtn").animate({
        width: "toggle",
      });
      $("#box-side").css("display", "none");
      $(".video").css("display", "none");
      $("#box-sideparent").css("display", "none");
      $("#MuteOn").css("display", "none");
      $("#MuteOff").css("display", "none");
      $(".bottomtwobtn").css("display", "none");

      $("#B2B").css("display", "block");
      $("#brokerreg").css("display", "block");
      var width: any = $(window).width();
      if (width > 767) {
        $(".mat-horizontal-stepper-header-container").css("width", "31%");
      } else {
        $(".mat-horizontal-stepper-header-container").css("width", "100%");
      }

      $(".mat-horizontal-stepper-header-container").css("margin", "0 auto");
    }, 500);
  }

  OpenPreRegistrationWithKunde() {
    $("#box-side").animate({
      width: "toggle",
    });

    setTimeout(() => {
      $(".row1").removeClass("row");
      $("#box-side").css("display", "none");
      $("#box-sideparent").css("display", "none");
      // $("#sixicon").css("display", "none");
      // $("#side3").css("display", "none");
      // $("#box-side").css("display", "none");
      // $("#headerid").css("display", "none");
      // $("#heightid").css("display", "none");
      $("#CUSTOMER").css("display", "block");
      // var height = $(window).height();
      // setTimeout(() => {
      //   $("#formdiv").css("height", height);
      //   $("#scrolled").css("height", height);
      // }, 100);
      $(".mat-horizontal-stepper-header-container").css("width", "100%");
      $(".mat-horizontal-stepper-header-container").css("margin", "0 auto");
    }, 500);
  }
  // Openprivatkunde() {
  //   this.SecDomChangenew = "hide";
  //   this.HideAndShow = false;
  //   this.ByDefaultOpen = false;
  //   this.Title = "Privatkunde";
  //   this.ShowTitleDiv = false;
  //   this.privatkunde = true;
  //   this.TwoButtonDiv = false;
  // }

  // Openfirmakunde() {
  //   this.SecDomChangenew = "show";
  //   // if (this.private_Kunden == "private_Kunden") {
  //   //   this.Openprivatkunde();
  //   // }
  //   this.HideAndShow = true;
  //   this.privatkunde = true;
  //   this.Title = "Firmenkunde";
  //   this.ShowTitleDiv = true;
  //   this.TwoButtonDiv = false;
  // }

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
            this.loginError = false;
            this.authService
              .sendLinkForgotPassword(this.forgotPasswordForm.value.username)
              .pipe(first())
              .subscribe(
                (data: any) => {
                  if (data["status"] == 200) {
                    this.loginSuccess = true;
                    this.data = data;
                  }
                },
                (error) => {
                  this.loginPhoneError = true;
                  console.error(error.message);

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

  firstformvalue() {
    this.titlename = this.RegistrationGroup.get("title")!.value;
    this.fname = this.RegistrationGroup.get("firstname")!.value;
    this.lname = this.RegistrationGroup.get("lastname")!.value;
  }

  public login() {
    this.submitted = true;
    // this.authService.checkEmail(this.f.username.value).pipe(first()).subscribe(data => {

    //   if(data['status'] == 200){
    //     this.forgotLink = true;
    //   }else{
    //     this.forgotLink = false;
    //   }
    // });
    // capotcha Response cheack
    if (this.enableCaptcha) {
      const response = grecaptcha.getResponse();
      if (response.length === 0) {
        this.captchaError = true;

        return;
      }
    }

    if (this.loginForm.invalid) {
      return false;
    }

    this.loading = false;

    this.authService
      .login(this.f["username"].value, this.f["password"].value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.token = data["token"];
          localStorage.setItem("token", this.token);
          localStorage.setItem("currentUser", JSON.stringify(data["user"]));
          localStorage.setItem("UserType", "ProductAndSpecialist");

          if (
            data["user"].companies_with_roles.length == 1 &&
            data["user"].companies_with_roles[0] == "cefima_customer"
          ) {
            this.dont_show_maine_firma = true;
          } else {
            this.dont_show_maine_firma = false;
          }

          this.router.navigate(["./product-partner-cases"]);

          // let decodedData = this.userService.getDecodedAccessToken(
          //   localStorage.getItem("token")
          // );
          // if (decodedData.roles && decodedData.roles.includes("Superadmin")) {
          //   localStorage.setItem("currentActiveRole", "superadmin");
          //   localStorage.setItem("User", "NormalUser");
          //   this.router.navigate(["./superadmin-home"]);
          // } else if (decodedData.roles && decodedData.roles.includes("admin")) {
          //   localStorage.setItem("currentActiveRole", "admin");
          //   localStorage.setItem("User", "NormalUser");
          //   this.router.navigate(["./admin-home"]);
          // } else if (
          //   decodedData.roles &&
          //   decodedData.roles.includes("employee")
          // ) {
          //   localStorage.setItem("currentActiveRole", "employee");
          //   localStorage.setItem("User", "NormalUser");
          //   this.router.navigate(["./mitarbeiter-home"]);
          // } else if (decodedData.roles && decodedData.roles.includes("b2b")) {
          //   localStorage.setItem("currentActiveRole", "b2b");
          //   localStorage.setItem("User", "NormalUser");
          //   this.router.navigate(["./b2b-home"]);
          // } else if (
          //   decodedData.roles &&
          //   decodedData.roles.includes("customer")
          // ) {
          //   localStorage.setItem("currentActiveRole", "customer");
          //   localStorage.setItem("User", "NormalUser");
          //   this.router.navigate(["./kunde-home"]);
          // } else {
          //   localStorage.setItem("UserType", "ProductAndSpecialist");
          //   this.router.navigate(["./product-partner-cases"]);
          // }
        },

        (error) => {
          this.loginError = true;
          this.forgotLink = true;
          this.error = error;
          //this.message = error.message;

          this.router.navigate(["./"]);
        }
      );
    // return;
  }
  openNav() {
    $("#myNav").css("width", "100%");
  }

  /* Close when someone clicks on the "x" symbol inside the overlay */
  closeNav() {
    $("#myNav").css("width", "0%");
  }

  MuteOn() {
    $("#MuteOn").css("display", "none");
    $("#MuteOff").css("display", "block");
    $("#Volume").prop("muted", true);
  }
  MuteOff() {
    $("#MuteOn").css("display", "block");
    $("#MuteOff").css("display", "none");
    $("#Volume").prop("muted", false);
  }

  choosecontactfile(event: any) {
    let contactfiles = (event.target as HTMLInputElement).files![0];

    this.contactForm.patchValue({
      img: contactfiles,
    });
    this.contactForm.get("img")!.updateValueAndValidity();
  }

  nextPrev(digit: any, step?: any, classname?: any) {
    if (step) {
      this.contactForm.patchValue({
        type: step,
      });

      $(".feature_item").removeClass("img1active");
      $(".feature_item").removeClass("img2active");
      $(".feature_item").removeClass("img3active");
      $(".feature_item").removeClass("img4active");
      $(".feature_item").removeClass("img5active");
      $("#" + step).addClass(classname);
    }

    if (digit == "0") {
      $(".tabslide00").addClass("bounceInLeft");
      $(".tabslide00").css("display", "none");
      $(".tabslide01").css("display", "block");
    } else if (digit == "-0") {
      $(".tabslide00").css("display", "block");
      $(".tabslide01").css("display", "none");
      $(".Tablast").css("display", "none");
    } else if (digit == "reset") {
      $(".tabslide00").css("display", "block");
      $(".tabslide01").css("display", "none");
      $(".Tablast").css("display", "none");
      $(".successtab").css("display", "none");
    } else if (digit == "1") {
      let message = this.contactForm.controls["message"].value;

      if (message == "") {
        $("#messageerror").html("Bitte Nachricht eingeben");
      } else {
        $("#messageerror").html("");
        $(".tabslide00").css("display", "none");
        $(".tabslide01").css("display", "none");
        $(".Tablast").css("display", "block");
      }
    } else if (digit == "2") {
      $(".tabslide00").css("display", "none");
      $(".tabslide01").css("display", "none");
      $(".Tablast").css("display", "none");
      $(".successtab").css("display", "block");
    } else if (digit == "-1") {
      $(".tabslide00").css("display", "none");
      $(".tabslide01").css("display", "block");
      $(".Tablast").css("display", "none");
    }
  }

  setactive(id: any, ind: any) {
    if (id == "Gewerbekunden") {
      this.RegistrationGroupfirma.patchValue({
        title: "Firma",
      });

      this.selectfirma = true;

      this.RegistrationGroupfirma.get("companyName")!.setValidators([
        Validators.required,
      ]);
      this.RegistrationGroupfirma.get("companyName")!.updateValueAndValidity();

      this.RegistrationGroupfirma.get("companytype")!.setValidators([
        Validators.required,
      ]);
      this.RegistrationGroupfirma.get("companytype")!.updateValueAndValidity();
    }

    $(".tabactive").removeClass("cool-link-active");
    $(".tabactive").addClass("cool-link");
    $("#" + id).removeClass("cool-link");
    $("#" + id).addClass("cool-link-active");
    this.checkpopup(id);
  }

  navigatecareer(name: any) {
    let formopen = $("#formopen").val();
    console.log(formopen == undefined, formopen, ':', name);

    if (formopen == undefined || '0') {
      console.log('000000000000000000');

      this.router.navigate(["./" + name]);
    } else {

      if (formopen == "1") {
        Swal.fire({
          title:
            "Wenn Sie die den Eingabebereich verlassen werden Ihre Daten verworfen.",
          showCancelButton: true,
          confirmButtonText: "Bleiben",
          cancelButtonText:
            "Verlassen &nbsp; <i class='fa fa-arrow-right'></i>",
        }).then((result) => {
          let that = this;

          if (result.value) {
          } else if (result.dismiss === Swal.DismissReason.backdrop) {
          } else {
            $("#sidebar").removeClass("active");

            $("#Firstpage").addClass("active");
            $("#fp-nav").css("display", "block");

            //reset form

            $("#emailiderrorfirst").html("");
            $("#emailiderrorfirst").css("background-color", "transparent");
            $("#emailiderrorfirst").css("padding", "0px");
            $("#resetbrokerbutton").trigger("click");
            $("#formopen").val("0");

            this.router.navigate(["/" + name]);
          }
        });
      } else if (formopen == "2") {
        $(".section2").removeClass("slideboxs2");
        // $('#content2').css("display", "none");
        Swal.fire({
          title:
            "Wenn Sie die den Eingabebereich verlassen werden Ihre Daten verworfen.",
          showCancelButton: true,
          confirmButtonText: "Bleiben",
          cancelButtonText:
            "Verlassen &nbsp; <i class='fa fa-arrow-right'></i>",
        }).then((result) => {
          if (result.value) {
          } else if (result.dismiss === Swal.DismissReason.backdrop) {
          } else {
            $("#sidebar2").removeClass("active");

            $("#aboutus").addClass("active");
            $("#fp-nav").css("display", "block");
            $("#resetsecond").trigger("click");
            $("#formopen").val("0");
            this.router.navigate(["/" + name]);
          }
        });
      } else if (formopen == "3") {
        $(".section2").removeClass("slideboxs2");
        // $('#content3').css("display", "none");

        Swal.fire({
          title:
            "Wenn Sie die den Eingabebereich verlassen werden Ihre Daten verworfen.",
          showCancelButton: true,
          confirmButtonText: "Bleiben",
          cancelButtonText:
            "Verlassen &nbsp; <i class='fa fa-arrow-right'></i>",
        }).then((result) => {
          if (result.value) {
          } else if (result.dismiss === Swal.DismissReason.backdrop) {
          } else {
            $("#sidebar3").removeClass("active");

            $("#privatesection").addClass("active");
            $("#fp-nav").css("display", "block");
            $("#resetthird").trigger("click");
            $("#formopen").val("0");
            this.router.navigate(["/" + name]);
          }
        });
      }
    }
  }

  checkpopup(id: any) {
    let formopen = $("#formopen").val();
    if (formopen == "1") {
      Swal.fire({
        title:
          "Wenn Sie die den Eingabebereich verlassen werden Ihre Daten verworfen.",
        showCancelButton: true,
        confirmButtonText: "Bleiben",
        cancelButtonText: "Verlassen &nbsp; <i class='fa fa-arrow-right'></i>",
      }).then((result) => {
        let that = this;

        if (result.value) {
        } else if (result.dismiss === Swal.DismissReason.backdrop) {
        } else {
          $("#sidebar").removeClass("active");

          $("#Firstpage").addClass("active");
          $("#fp-nav").css("display", "block");

          //reset form

          $("#emailiderrorfirst").html("");
          $("#emailiderrorfirst").css("background-color", "transparent");
          $("#emailiderrorfirst").css("padding", "0px");
          $("#resetbrokerbutton").trigger("click");
          $("#formopen").val("0");

          // $('#menu li:first').trigger("click");
        }
      });
    } else if (formopen == "2") {
      $(".section2").removeClass("slideboxs2");
      // $('#content2').css("display", "none");
      Swal.fire({
        title:
          "Wenn Sie die den Eingabebereich verlassen werden Ihre Daten verworfen.",
        showCancelButton: true,
        confirmButtonText: "Bleiben",
        cancelButtonText: "Verlassen &nbsp; <i class='fa fa-arrow-right'></i>",
      }).then((result) => {
        if (result.value) {
        } else if (result.dismiss === Swal.DismissReason.backdrop) {
        } else {
          $("#sidebar2").removeClass("active");

          $("#aboutus").addClass("active");
          $("#fp-nav").css("display", "block");
          $("#resetsecond").trigger("click");
          $("#formopen").val("0");
          // $(' li').first().trigger('click');
        }
      });
    } else if (formopen == "3") {
      $(".section2").removeClass("slideboxs2");
      // $('#content3').css("display", "none");

      Swal.fire({
        title:
          "Wenn Sie die den Eingabebereich verlassen werden Ihre Daten verworfen.",
        showCancelButton: true,
        confirmButtonText: "Bleiben",
        cancelButtonText: "Verlassen &nbsp; <i class='fa fa-arrow-right'></i>",
      }).then((result) => {
        if (result.value) {
        } else if (result.dismiss === Swal.DismissReason.backdrop) {
        } else {
          $("#sidebar3").removeClass("active");

          $("#privatesection").addClass("active");
          $("#fp-nav").css("display", "block");
          $("#resetthird").trigger("click");
          $("#formopen").val("0");

          // $('#menu li:first').trigger("click");
        }
      });
    }
  }

  logout() {
    localStorage.removeItem("token");
    // this.router.navigate(["./"]);
    window.location.reload();
    document.body.classList.remove("modal-open");
  }

  Ontop(id: any) {
    // const mainDiv = document.getElementById("Firstpage") as HTMLElement;
    window.location.href = "#finanzvermittler";
    $(".tabactive").removeClass("cool-link-active");
    $(".tabactive").addClass("cool-link");
    $("#" + id).removeClass("cool-link");
    $("#" + id).addClass("cool-link-active");
  }
  privateKundenSection() {
    this.private_Kunden = "private_Kunden";
    this.Cefima_Starten = false;
    this.O_P_K_S = true;
    this.N_P_K_S = false;
  }

  buttonClicked() {
    console.log("button clicked");
  }
}
