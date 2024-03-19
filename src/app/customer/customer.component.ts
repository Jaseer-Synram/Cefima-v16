import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import * as intlTelInput from 'intl-tel-input';
import { Observable, startWith, map, first } from 'rxjs';
import Swal from 'sweetalert2';
import { PagerService } from '../_services';
import { AuthService } from '../auth.service';
import { CompanySelectDialogComponent } from '../company-select-dialog/company-select-dialog.component';
import { UserService } from '../user.service';


export interface Broker {
  name: string;
  value: string;
}
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  token: any;
  title: any
  currentid: any
  customerno: any
  lastname: any
  firstname: any
  COMPANYNAME: any
  logged_in_users_companies_with_roles = JSON.parse(
    localStorage.getItem("currentUser")!
  ).companies_with_roles;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2020, 0, 1);
  // loginRole = this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles;
  loginRole = localStorage.getItem("currentActiveRole");
  brokerList: Broker[] = [];
  routeParams: any;
  routeParamsActive: any;
  year: any = new Date().getFullYear();
  error: { [index: string]: any } = {};
  customerList: any = [];
  values = "";
  localdata = JSON.parse(localStorage.getItem("currentUser")!);
  recordCount: any;
  userData: any;
  startRecord: any;
  endRecord: any;
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  id: any;
  disableEditSubmit: boolean = true;
  popupData: [] = [];
  roleCompanies: any = {
    admin: [],
    customer: [],
    b2b: [],
    employee: [],
  };
  admin = false;
  unreadcount: any = 0;
  employee = false;
  customer = false;
  b2b = false;
  user = false;
  customerFormGroup: FormGroup;
  roleFormGroup: FormGroup;
  companyFormGroup: FormGroup;
  myControl = new FormControl();
  myControlland = new FormControl();
  mekFinanz = false;
  fiorettoimmob = false;
  birema = false;
  fiorettomedia = false;
  airmage = false;
  horaidetektei = false;
  registerDone = false;
  registraionError = false;
  varioimport = false;
  coursula = false;
  Benutzer = false;
  cefima_b2b = false;
  sterbvorsoge = false;
  checkntrack = false;
  broker: any;
  nationality: string = "";
  brokerFormControl = new FormControl();
  companytitle = false;
  companyTitleShow = false;
  customerNo: string;

  filteredOptions: Observable<string[]>;
  filteredOptionsland: Observable<string[]>;
  brokerListOptions: Observable<Broker[]>;
  optionsValue: string[] = [
    "Afghanisch",
    "Ägyptisch",
    "Albanisch",
    "Algerisch",
    "Andorranisch",
    "Angolanisch",
    "Antiguanisch",
    "Äquatorialguineisch",
    "Argentinisch",
    "Armenisch",
    "Aserbaidschanisch",
    "Äthiopisch",
    "Australisch",
    "Bahamaisch",
    "Bahrainisch",
    "Bangladeschisch",
    "Barbadisch",
    "Belgisch",
    "Belizisch",
    "Beninisch",
    "Bhutanisch",
    "Bolivianisch",
    "Bosnisch herzegowinisch",
    "Botsuanisch",
    "Brasilianisch",
    "Bruneiisch",
    "Bulgarisch",
    "Burkinisch",
    "Burundisch",
    "Chilenisch",
    "Chinesisch",
    "Costa-ricanisch",
    "Dänisch",
    "Kongolesisch",
    "Deutsch",
    "Dominikanisch",
    "Dschibutisch",
    "Ecuadorianisch",
    "Salvadorianisch",
    "Ivorisch",
    "Englisch",
    "Eritreisch",
    "Estnisch",
    "Fidschianisch",
    "Finnisch",
    "Französisch",
    "Gabunisch",
    "Gambisch",
    "Georgisch",
    "Ghanaisch",
    "Grenadisch",
    "Griechisch",
    "Grönländisch",
    "Britisch",
    "Guatemaltekisch",
    "Guineisch",
    "Guinea-bissauisch",
    "Guyanisch",
    "Haitianisch",
    "Honduranisch",
    "Indisch",
    "Indonesisch",
    "Irakisch",
    "Iranisch",
    "Irisch",
    "Isländisch",
    "Israelisch",
    "Italienisch",
    "Jamaikanisch",
    "Japanisch",
    "Jemenitisch",
    "Jordanisch",
    "Kambodschanisch",
    "Kamerunisch",
    "Kanadisch",
    "Kapverdisch",
    "Kasachisch",
    "Katarisch",
    "Kenianisch",
    "Kirgisisch",
    "Kiribatisch",
    "Kolumbianisch",
    "Komorisch",
    "Kongolesisch",
    "Kosovarisch",
    "Kroatisch",
    "Kubanisch",
    "Kuwaitisch",
    "Laotisch",
    "Lesothisch",
    "Lettisch",
    "Libanesisch",
    "Liberianisch",
    "Libysch",
    "Liechtensteinisch",
    "Litauisch",
    "Luxemburgisch",
    "Madagassisch",
    "Malawisch",
    "Malaysisch",
    "Maledivisch",
    "Malisch",
    "Maltesisch",
    "Marokkanisch",
    "Marshallisch",
    "Mauretanisch",
    "Mauritisch",
    "Mazedonisch",
    "Mexikanisch",
    "Mikronesisch",
    "Moldauisch",
    "Monegassisch",
    "Mongolisch",
    "Montenegrinisch",
    "Mosambikanisch",
    "Myanmarisch",
    "Namibisch",
    "Nauruisch",
    "Nepalesisch",
    "Neuseeländisch",
    "Nicaraguanisch",
    "Niederländisch",
    "Nigrisch",
    "Nigerianisch",
    "Nordkoreanisch",
    "Norwegisch",
    "Ömanisch",
    "Österreichisch",
    "Pakistanisch",
    "Palästinensisch",
    "Palauisch",
    "Panamaisch",
    "Papua-neuguineisch",
    "Paraguayisch",
    "Peruanisch",
    "Philippinisch",
    "Polnisch",
    "Portugiesisch",
    "Puerto-ricanisch",
    "Kongolesisch",
    "Ruandisch",
    "Rumänisch",
    "Russisch",
    "Salomonisch",
    "Sambisch",
    "Samoanisch",
    "San-marinesisch",
    "Saudi-arabisch",
    "Schottisch",
    "Schwedisch",
    "Schweizerisch",
    "Senegalesisch",
    "Serbisch",
    "Seychellisch",
    "Sierra-leonisch",
    "Simbabwisch",
    "Singapurisch",
    "Slowenisch",
    "Somalisch",
    "Spanisch",
    "Sri-lankisch",
    "Lucianisch",
    "Vincentisch",
    "Südafrikanisch",
    "Sudanesisch",
    "Südkoreanisch",
    "Surinamisch",
    "Swasiländisch",
    "Syrisch",
    "São-toméisch",
    "Tadschikisch",
    "Taiwanisch",
    "Tansanisch",
    "Thailändisch",
    "Tibetisch",
    "Timoresisch",
    "Togoisch",
    "Tongaisch",
    "Tschadisch",
    "Tschechisch",
    "Tunesisch",
    "Türkisch",
    "Turkmenisch",
    "Tuvaluisch",
    "Ugandisch",
    "Ukrainisch",
    "Ungarisch",
    "Uruguayisch",
    "Amerikanisch",
    "Üsbekisch",
    "Vanuatuisch",
    "Vatikanisch",
    "Venezolanisch",
    "Vietnamesisch",
    "Walisisch",
    "Weißrussisch",
    "Zentralafrikanisch",
  ];

  optionsValueland: string[] = [
    "Afghanisch",
    "Ägyptisch",
    "Albanisch",
    "Algerisch",
    "Andorranisch",
    "Angolanisch",
    "Antiguanisch",
    "Äquatorialguineisch",
    "Argentinisch",
    "Armenisch",
    "Aserbaidschanisch",
    "Äthiopisch",
    "Australisch",
    "Bahamaisch",
    "Bahrainisch",
    "Bangladeschisch",
    "Barbadisch",
    "Belgisch",
    "Belizisch",
    "Beninisch",
    "Bhutanisch",
    "Bolivianisch",
    "Bosnisch herzegowinisch",
    "Botsuanisch",
    "Brasilianisch",
    "Bruneiisch",
    "Bulgarisch",
    "Burkinisch",
    "Burundisch",
    "Chilenisch",
    "Chinesisch",
    "Costa-ricanisch",
    "Dänisch",
    "Kongolesisch",
    "Deutsch",
    "Dominikanisch",
    "Dschibutisch",
    "Ecuadorianisch",
    "Salvadorianisch",
    "Ivorisch",
    "Englisch",
    "Eritreisch",
    "Estnisch",
    "Fidschianisch",
    "Finnisch",
    "Französisch",
    "Gabunisch",
    "Gambisch",
    "Georgisch",
    "Ghanaisch",
    "Grenadisch",
    "Griechisch",
    "Grönländisch",
    "Britisch",
    "Guatemaltekisch",
    "Guineisch",
    "Guinea-bissauisch",
    "Guyanisch",
    "Haitianisch",
    "Honduranisch",
    "Indisch",
    "Indonesisch",
    "Irakisch",
    "Iranisch",
    "Irisch",
    "Isländisch",
    "Israelisch",
    "Italienisch",
    "Jamaikanisch",
    "Japanisch",
    "Jemenitisch",
    "Jordanisch",
    "Kambodschanisch",
    "Kamerunisch",
    "Kanadisch",
    "Kapverdisch",
    "Kasachisch",
    "Katarisch",
    "Kenianisch",
    "Kirgisisch",
    "Kiribatisch",
    "Kolumbianisch",
    "Komorisch",
    "Kongolesisch",
    "Kosovarisch",
    "Kroatisch",
    "Kubanisch",
    "Kuwaitisch",
    "Laotisch",
    "Lesothisch",
    "Lettisch",
    "Libanesisch",
    "Liberianisch",
    "Libysch",
    "Liechtensteinisch",
    "Litauisch",
    "Luxemburgisch",
    "Madagassisch",
    "Malawisch",
    "Malaysisch",
    "Maledivisch",
    "Malisch",
    "Maltesisch",
    "Marokkanisch",
    "Marshallisch",
    "Mauretanisch",
    "Mauritisch",
    "Mazedonisch",
    "Mexikanisch",
    "Mikronesisch",
    "Moldauisch",
    "Monegassisch",
    "Mongolisch",
    "Montenegrinisch",
    "Mosambikanisch",
    "Myanmarisch",
    "Namibisch",
    "Nauruisch",
    "Nepalesisch",
    "Neuseeländisch",
    "Nicaraguanisch",
    "Niederländisch",
    "Nigrisch",
    "Nigerianisch",
    "Nordkoreanisch",
    "Norwegisch",
    "Ömanisch",
    "Österreichisch",
    "Pakistanisch",
    "Palästinensisch",
    "Palauisch",
    "Panamaisch",
    "Papua-neuguineisch",
    "Paraguayisch",
    "Peruanisch",
    "Philippinisch",
    "Polnisch",
    "Portugiesisch",
    "Puerto-ricanisch",
    "Kongolesisch",
    "Ruandisch",
    "Rumänisch",
    "Russisch",
    "Salomonisch",
    "Sambisch",
    "Samoanisch",
    "San-marinesisch",
    "Saudi-arabisch",
    "Schottisch",
    "Schwedisch",
    "Schweizerisch",
    "Senegalesisch",
    "Serbisch",
    "Seychellisch",
    "Sierra-leonisch",
    "Simbabwisch",
    "Singapurisch",
    "Slowenisch",
    "Somalisch",
    "Spanisch",
    "Sri-lankisch",
    "Lucianisch",
    "Vincentisch",
    "Südafrikanisch",
    "Sudanesisch",
    "Südkoreanisch",
    "Surinamisch",
    "Swasiländisch",
    "Syrisch",
    "São-toméisch",
    "Tadschikisch",
    "Taiwanisch",
    "Tansanisch",
    "Thailändisch",
    "Tibetisch",
    "Timoresisch",
    "Togoisch",
    "Tongaisch",
    "Tschadisch",
    "Tschechisch",
    "Tunesisch",
    "Türkisch",
    "Turkmenisch",
    "Tuvaluisch",
    "Ugandisch",
    "Ukrainisch",
    "Ungarisch",
    "Uruguayisch",
    "Amerikanisch",
    "Üsbekisch",
    "Vanuatuisch",
    "Vatikanisch",
    "Venezolanisch",
    "Vietnamesisch",
    "Walisisch",
    "Weißrussisch",
    "Zentralafrikanisch",
  ];

  secondsSinceEpoch: any;

  roleCompaniesbrand: any = {
    admin: [],
    customer: [],
    b2b: [],
    employee: [],
  };

  roleCompaniesbrandnew: any = [];

  roleCompaniescode: any = {
    admin: [],
    customer: [],
    b2b: [],
    employee: [],
  };

  brokerbrandarray: any = [];
  brokerarray: any = [];

  statusbrandarray: any = [];
  statusarray: any = [];

  employeebrandarray: any = [];
  employeearray: any = [];
  selectedUser: any = {
    customerno: "",
    _id: "",
    roles: [],
    companies_with_roles: [],
  };

  companytype: any

  opened_tab: any = {
    personal_data: true,
    official_residence: false,
    more_info: false,
  };

  broker_typenew: any;
  ThirdTypeDoc: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private pagerService: PagerService,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder
  ) {
    if (this.loginRole == "b2b") {
    } else {
      this.router.navigate(["./cefima/kunde-home"], {
        queryParams: { id: this.currentid },
      });
    }
  }
  filtercustomer(success: any, companyName: any) {
    let newsuccess = [];
    console.log("stringify" + JSON.stringify(success));
    console.log("ddd" + success.length);
    for (let i = 0; i < success.length; i++) {
      let brokerbrandarray = success[i].brokerbrandarray;
      let brokerarray = success[i].brokerarray;
      let a = brokerbrandarray.indexOf(
        companyName.charAt(0).toUpperCase() + companyName.slice(1)
      );
      console.log("i" + i);
      console.log("a" + a);

      if (a != -1) {
        let brokervaluenew = brokerarray[a];
        console.log("ddd" + brokervaluenew);
        console.log("ddd" + this.customerno);
        if (brokervaluenew == this.customerno) {
          console.log("ifke ander");
        } else {
          newsuccess.push(i);
          // success.splice(i,1);
          console.log("ifelse ke ander" + this.customerno);
        }
      } else {
        newsuccess.push(i);
        console.log("ifelseelse ke ander" + this.customerno);
      }
    }

    console.log("stringify" + JSON.stringify(success));

    for (let i1 = 0; i1 < newsuccess.length; i1++) {
      delete success[newsuccess[i1]];
      // success.splice(newsuccess[i1],1);
    }
    console.log(newsuccess);
    console.log("stringify" + JSON.stringify(success));
    success = success.filter(function () {
      return true;
    });
    console.log("stringify" + JSON.stringify(success));
    return success;
  }
  private _filter(value: string): string[] {
    console.log("_filter" + value);
    const filterValue = value.toLowerCase();
    return this.optionsValue.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterland(value: string): string[] {
    console.log("_filterland" + value);
    const filterValue = value.toLowerCase();
    return this.optionsValueland.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  ngOnInit() {
    this.brokerListOptions = this.brokerFormControl.valueChanges.pipe(
      startWith(""),
      map((value) => (typeof value === "string" ? value : value.name)),
      map((name) => (name ? this._brokerfilter(name) : this.brokerList.slice()))
    );

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );

    this.filteredOptionsland = this.myControlland.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterland(value))
    );

    this.companytype = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).companytype;
    this.title = this.userService.getDecodedAccessToken(localStorage.getItem("token")!).title;
    this.currentid = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).id;
    this.customerno = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).customerno;
    this.lastname = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).lastname;
    this.firstname = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).firstname;
    this.COMPANYNAME = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).companyname;

    var myCurrentDate = new Date();
    var myPastDate = new Date(myCurrentDate);
    myPastDate.setDate(myPastDate.getDate() - 1);

    let data = Math.round(myPastDate.getTime() / 1000);

    this.secondsSinceEpoch = data;
    console.log("hkjhhjjh" + this.secondsSinceEpoch);
    this.roleFormGroup = this._formBuilder.group({
      roles: this._formBuilder.array([], Validators.required),
    });

    this.companyFormGroup = this._formBuilder.group({
      companies: this._formBuilder.array([], Validators.required),
    });

    this.customerFormGroup = this._formBuilder.group({
      title: ["", Validators.required],
      status: ["", Validators.required],
      employeetype: ["", Validators.required],

      companyname: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      dob: ["", Validators.required],
      nationality: ["", Validators.required],
      birthPlace: ["", Validators.required],
      street: ["", Validators.required],
      streetNumber: ["", Validators.required],
      postCode: ["", Validators.required],
      city: ["", Validators.required],
      additionalReference: [""],
      countryOfResidence: ["", Validators.required],
      id: [""],
      password: ["", Validators.required],
      phone_number: ["", Validators.required],
      customerno: [""],
      broker: [""],
      brokerbrand: [""],
      statusbrand: [""],
      employeebrand: [""],
      registration_number: [""],
      Vermittlerstatus: [""],
      broker_type: [""],
    });
    this.routeParamsActive = this.route.snapshot.routeConfig!.path;
    this.routeParams = this.route.snapshot.params["company"];
    this.customerList = [];
    var companyName: any = "";
    if (this.routeParams == "benutzer-cnt") companyName = "checkntrack";
    if (this.routeParams == "finance") companyName = "cefima";
    if (this.routeParams == "real-estate") companyName = "fiorettoimmob";
    if (this.routeParams == "birema") companyName = "birema";
    if (this.routeParams == "fioretto-media") companyName = "fiorettomedia";
    if (this.routeParams == "airmage") companyName = "airmage";
    if (this.routeParams == "horaidetektei") companyName = "horaidetektei";
    if (this.routeParams == "vario-import") companyName = "varioimport";
    if (this.routeParams == "sterbevorsorgebymek") companyName = "sterbvorsoge";
    if (this.loginRole == "b2b") {
      $("#loaderouterid").css("display", "block");
      const data = this.userService.getCustomers("cefima", true).subscribe(
        (success: any) => {
          $("#loaderouterid").css("display", "none");
          // if success and error give response
          console.log("cefimaaaaaaaaaaaaa");
          if (success.status == "error") {
            this.error = success.message;
          } else {
            var success = this.filtercustomer(success, "cefima");
            this.getBrokersData(success);
            this.customerList = success;
            console.log(this.customerList);
            console.log("this.customerList" + JSON.stringify(success));
            console.log("this.customerno" + this.customerno);
            console.log(success);

            this.setPage(1);
            this.recordCount = success.length;
          }
        },
        (rejected: any) => {
          console.log(rejected);
        }
      );
    } else {
      const data = this.userService.getCustomers(companyName).subscribe(
        (success: any) => {
          // if success and error give response
          if (success.status == "error") {
            this.error = success.message;
          } else {
            this.getBrokersData(success);
            this.customerList = success;
            this.setPage(1);
            this.recordCount = success.length;
            console.log(this.customerList);
          }
        },
        (rejected: any) => {
          console.log(rejected);
        }
      );
    }
  }

  private _brokerfilter(name: string): Broker[] {
    console.log("_brokerfilter" + name);
    console.log("_broker" + JSON.stringify(this.brokerList));
    const filterValue = name.toLowerCase();
    return this.brokerList.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onSubmit(): void {
    const that = this;

    console.log("asghgdj" + this.values);
    if (this.values != "") {
      var companyName: any = "";
      if (this.routeParams == "benutzer-cnt") companyName = "checkntrack";
      if (this.routeParams == "finance") companyName = "cefima";
      if (this.routeParams == "real-estate") companyName = "fiorettoimmob";
      if (this.routeParams == "birema") companyName = "birema";
      if (this.routeParams == "fioretto-media") companyName = "fiorettomedia";
      if (this.routeParams == "airmage") companyName = "airmage";
      if (this.routeParams == "horaidetektei") companyName = "horaidetektei";
      if (this.routeParams == "vario-import") companyName = "varioimport";
      if (this.routeParams == "sterbevorsorgebymek")
        companyName = "sterbvorsoge";
      const data = this.userService
        .getCustomerssearch(this.values, companyName)
        .subscribe(
          (success: any) => {
            // if success and error give response
            if (success.status == "error") {
              this.error = success.message;
            } else {
              var success = this.filtercustomer(success, "cefima");
              this.getBrokersData(success);
              this.customerList = success;
              console.log(this.customerList);
              console.log("this.customerList" + this.customerList);
              console.log("this.customerno" + this.customerno);
              this.setPage(1);
              this.recordCount = success.length;
            }
          },
          (rejected: any) => {
            console.log(rejected);
          }
        );

      // this.userService.getSearch(this.values).subscribe(function (data1) {
      //   that.customerList = data1;
      //   that.setPage(1);
      //   that.recordCount = that.customerList.length;
      //   //this.customerList.push(data1);
      //   //return this.customerList.push(data1);
      // });
    } else {
      var companyName: any = "";
      if (this.routeParams == "benutzer-cnt") companyName = "checkntrack";
      if (this.routeParams == "finance") companyName = "cefima";
      if (this.routeParams == "real-estate") companyName = "fiorettoimmob";
      if (this.routeParams == "birema") companyName = "birema";
      if (this.routeParams == "fioretto-media") companyName = "fiorettomedia";
      if (this.routeParams == "airmage") companyName = "airmage";
      if (this.routeParams == "horaidetektei") companyName = "horaidetektei";
      if (this.routeParams == "vario-import") companyName = "varioimport";
      if (this.routeParams == "sterbevorsorgebymek")
        companyName = "sterbvorsoge";
      const data = this.userService.getCustomers(companyName).subscribe(
        (success: any) => {
          // if success and error give response
          if (success.status == "error") {
            this.error = success.message;
          } else {
            this.getBrokersData(success);
            that.customerList = success;
            that.setPage(1);
            that.recordCount = success.length;
            console.log(this.customerList);
          }
        },
        (rejected: any) => {
          console.log(rejected);
        }
      );
    }
  }
  saveCurrentSelectedUser(data: any) {
    //  window.location.reload();
    console.log("reload");
    console.log("data", data);
    this.selectedUser = data;
  }
  navigateWittcustomerID() {
    this.router.navigate(["./cefima/kunde-home"], {
      queryParams: { id: this.selectedUser._id },
    });
  }
  getnotidata(notidata: any) {
    this.unreadcount = notidata;
    console.log("sdfsfdsfsfsfsf" + notidata);
  }
  navigateWithb2bID() {
    if (this.loginRole == "b2b") {
      console.log("selecteduserid" + this.currentid);
      this.router.navigate(["./cefima/b2b-dashboard"], {
        queryParams: { id: this.currentid },
      });
    } else {
      this.router.navigate(["./cefima/kunde-home"], {
        queryParams: { id: this.currentid },
      });
    }
  }
  onKey(event: any) {
    // without type info
    this.values = event.target.value;
    var value = event.keyCode;
    console.log(value);
    if (value == "13") {
      const that = this;
      that.customerList = [];
      this.values = event.target.value;
      let { customerno } = JSON.parse(localStorage.getItem("currentUser")!);
      let CustomerNumbernew = customerno;
      if (this.values != "") {
        var companyName: any = "";
        if (this.routeParams == "benutzer-cnt") companyName = "checkntrack";
        if (this.routeParams == "finance") companyName = "cefima";
        if (this.routeParams == "real-estate") companyName = "fiorettoimmob";
        if (this.routeParams == "birema") companyName = "birema";
        if (this.routeParams == "fioretto-media") companyName = "fiorettomedia";
        if (this.routeParams == "airmage") companyName = "airmage";
        if (this.routeParams == "horaidetektei") companyName = "horaidetektei";
        if (this.routeParams == "vario-import") companyName = "varioimport";
        if (this.routeParams == "sterbevorsorgebymek")
          companyName = "sterbvorsoge";
        const data = this.userService
          .getSearch(this.values, CustomerNumbernew)
          .subscribe(
            (success: any) => {
              // if success and error give response
              if (success.status == "error") {
                this.error = success.message;
              } else {
                this.getBrokersData(success);
                that.customerList = success;
                that.setPage(1);
                that.recordCount = success.length;
                console.log(this.customerList);
              }
            },
            (rejected) => {
              console.log(rejected);
            }
          );

        // this.userService.getCustomerssearch(this.values).subscribe(function (data1) {
        //   that.customerList = data1;
        //   that.setPage(1);
        //   that.recordCount = that.customerList.length;
        //this.customerList.push(data1);
        //return this.customerList.push(data1);
        // });
      } else {
        var companyName: any = "";
        if (this.routeParams == "benutzer-cnt") companyName = "checkntrack";
        if (this.routeParams == "finance") companyName = "cefima";
        if (this.routeParams == "real-estate") companyName = "fiorettoimmob";
        if (this.routeParams == "birema") companyName = "birema";
        if (this.routeParams == "fioretto-media") companyName = "fiorettomedia";
        if (this.routeParams == "airmage") companyName = "airmage";
        if (this.routeParams == "horaidetektei") companyName = "horaidetektei";
        if (this.routeParams == "vario-import") companyName = "varioimport";
        if (this.routeParams == "sterbevorsorgebymek")
          companyName = "sterbvorsoge";
        const data = this.userService.getCustomers("cefima", "b2b").subscribe(
          (success: any) => {
            // if success and error give response
            if (success.status == "error") {
              this.error = success.message;
            } else {
              var success = this.filtercustomer(success, "cefima");
              this.getBrokersData(success);
              that.customerList = success;
              that.setPage(1);
              that.recordCount = success.length;
              console.log(this.customerList);
            }
          },
          (rejected: any) => {
            console.log(rejected);
          }
        );
      }
    }
  }
  getdivoutside() {
    let accordianId: any = "collapse";
    let accordian: HTMLElement = document.getElementById(accordianId)!;
    let element1new: HTMLElement = document.getElementById(
      "cardbodyid"
    ) as HTMLElement;
    element1new.after(accordian);
    accordian.classList.add("collapse");
    // accordian.classList.add("collapse");
    accordian.classList.remove("collapse-show");
  }
  setPage(page: number) {
    this.getdivoutside();
    // get pager object from service
    this.pager = this.pagerService.getPager(this.customerList.length, page);

    // get current page of items
    this.pagedItems = this.customerList.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    if (this.customerList.length > 0) {
      this.startRecord =
        this.pager.currentPage * this.pagerService.getDefaultPageSize() -
        this.pagerService.getDefaultPageSize() +
        1;
      this.endRecord =
        this.pager.currentPage * this.pagerService.getDefaultPageSize() >
          this.customerList.length
          ? this.customerList.length
          : this.pager.currentPage * this.pagerService.getDefaultPageSize();
    } else {
      this.startRecord = 0;
      this.endRecord = 0;
    }
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["./"]);
    document.body.classList.remove("modal-open");
  }
  isLoggedIn() {
    let redirectionRoute = this.authService.checkRouteRedirect(this.loginRole);
    this.router.navigate([redirectionRoute]);
    // if (this.authService.isAuthenticated()) {
    //   if (this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles == 'admin') {
    //     this.router.navigate(['./admin-home']);
    //   }
    //   else if (this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles == 'Superadmin') {
    //     this.router.navigate(['./superadmin-home']);
    //   }
    //   else if (this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles == 'employee') {
    //     this.router.navigate(['./mitarbeiter-home']);
    //   }
    //   else if (this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles == 'b2b') {
    //     this.router.navigate(['./b2b-home']);
    //   }
    //   else {
    //     this.router.navigate(['./kunde-home']);
    //   }
    // }
    // else {
    //   this.router.navigate(['./']);
    // }
  }

  currentUserData: any;

  getcurrentUser(id?: any, currentData?: any) {
    console.log("aftgetcurrentUserer" + this.disableEditSubmit);
    console.log("id" + id);
    this.disableEditSubmit = true;
    const that = this;
    this.b2b = false;
    this.employee = false;
    this.customer = false;
    this.admin = false;
    this.user = false;
    this.roleCompanies = {
      admin: [],
      customer: [],
      b2b: [],
      employee: [],
    };

    this.roleCompaniesbrand = {
      admin: [],
      customer: [],
      b2b: [],
      employee: [],
    };

    this.roleCompaniesbrandnew = [];

    this.roleCompaniescode = {
      admin: [],
      customer: [],
      b2b: [],
      employee: [],
    };
    this.mekFinanz = false;
    this.fiorettoimmob = false;
    this.birema = false;
    this.fiorettomedia = false;
    this.airmage = false;
    this.horaidetektei = false;
    this.varioimport = false;
    this.sterbvorsoge = false;
    this.checkntrack = false;
    this.coursula = false;

    this.cefima_b2b = false;
    this.brokerbrandarray = [];
    this.brokerarray = [];
    this.statusbrandarray = [];
    this.statusarray = [];
    this.employeebrandarray = [];
    this.employeearray = [];

    // console.log(id, currentData, "currentdata")
    console.log("idnew" + id);
    if (currentData && !id) {
      setData(currentData);
    } else {
      // console.log("call api")
      this.userService.getEditUser(id).subscribe(function (data1: any) {
        that.currentUserData = data1;
        console.log("editRecord" + data1);

        setData(data1);
      });
    }

    function setData(data1: any) {
      that.userData = data1;
      const roles = (<FormArray>that.roleFormGroup.get("roles")) as FormArray;
      const companies = (<FormArray>(
        that.companyFormGroup.get("companies")
      )) as FormArray;
      that.broker = data1.broker;
      that.nationality = data1.nationality;
      console.log("Brokerdata: " + data1.companycode);
      // if(!data1.contactno.includes('+')){

      // }
      let rwc = data1.companies_with_roles;
      for (let i = 0; i < rwc.length; i++) {
        console.log("rwc[i]", rwc[i]);
        let temp = rwc[i].split("_");
        if (that.roleCompanies[temp[1]]) {
          that.roleCompanies[temp[1]].push(temp[0]);
        }
      }
      that.roleCompaniesbrand["b2b"].push("Cefima");
      that.roleCompaniesbrand["customer"].push("Cefima");
      that.roleCompaniesbrandnew.push("Cefima");
      //       let rwcnew1 = data1.companies_with_roles;
      //       for (let i = 0; i < rwcnew1.length; i++) {
      //         let temp1 = rwcnew1[i].split("_");
      //         if (that.roleCompanies[temp1[1]]) {

      //          if(temp1[1]=='customer' || temp1[1]=='b2b')
      // {
      //   console.log("checknew"+temp1[0]);
      //   console.log("checknew"+that.roleCompaniesbrandnew);
      //   if(that.roleCompaniesbrandnew.includes(temp1[0].charAt(0).toUpperCase() + temp1[0].slice(1)))
      //   {
      // console.log("checknew"+temp1[0]);
      //   }
      //   else{
      //           that.roleCompaniesbrandnew.push('Cefima');
      //   }
      // }
      //         }
      //       }

      console.log(
        "datanewwwwwwwwwwwwww" +
        JSON.stringify(that.roleCompaniesbrand["customer"])
      );

      let rwcnew = data1.companycode;

      console.log("datanewwwwwwwwwwwwww" + rwcnew);
      for (let i = 0; i < rwcnew.length; i++) {
        console.log("rwcnew[i]", rwcnew[i]);
        let tempnew = rwcnew[i].split("_");
        if (that.roleCompaniescode[tempnew[1]]) {
          that.roleCompaniescode[tempnew[1]].push(tempnew[0]);
        }
      }

      if (data1.roles.includes("user") || data1.roles.includes("Benutzer")) {
        that.roleCompanies["user"] = ["checkntrack"];
        that.user = true;
      }
      if (data1.roles.includes("user") || data1.roles.includes("Benutzer")) {
        that.roleCompaniescode["user"] = ["c42130"];
      }
      // // console.log("data1",data1);
      data1.roles.forEach((role: any) => {
        if (role === "b2b") {
          that.b2b = true;
          roles.push(new FormControl(role));
        }
        if (role === "employee") {
          that.employee = true;
          roles.push(new FormControl(role));
        }
        if (role === "customer") {
          that.customer = true;
          roles.push(new FormControl(role));
        }
        if (role === "admin") {
          that.admin = true;
          roles.push(new FormControl(role));
        }
        if (role === "Benutzer") {
          that.Benutzer = true;
          roles.push(new FormControl(role));
        }
      });

      data1.companies.forEach((comp: any) => {
        console.log("compcompcompcompcompcomp" + comp);
        if (comp === "cefima") {
          that.mekFinanz = true;
          companies.push(new FormControl({ value: comp, disabled: true }));
        }
        if (comp === "fiorettoimmob") {
          that.fiorettoimmob = true;
          companies.push(new FormControl({ value: comp, disabled: true }));
        }
        if (comp === "birema") {
          that.birema = true;
          companies.push(new FormControl({ value: comp, disabled: true }));
        }
        if (comp === "fiorettomedia") {
          that.fiorettomedia = true;
          companies.push(new FormControl({ value: comp, disabled: true }));
        }
        if (comp === "airmage") {
          that.airmage = true;
          companies.push(new FormControl({ value: comp, disabled: true }));
        }
        if (comp === "horaidetektei") {
          that.horaidetektei = true;
          companies.push(new FormControl({ value: comp, disabled: true }));
        }
        if (comp === "varioimport") {
          that.varioimport = true;
          companies.push(new FormControl({ value: comp, disabled: true }));
        }
        if (comp === "sterbvorsoge") {
          that.sterbvorsoge = true;
          companies.push(new FormControl({ value: comp, disabled: true }));
        }
        if (comp === "checkntrack") {
          that.checkntrack = true;
          companies.push(new FormControl({ value: comp, disabled: true }));
        }
        if (comp === "coursula") {
          that.coursula = true;
          companies.push(new FormControl({ value: comp, disabled: true }));
        }
      });

      data1.companies_with_roles.forEach((comp: any) => {
        console.log("compcompcompcompcompcomp" + comp);
        if (comp === "cefima_b2b") {
          that.cefima_b2b = true;
        }
      });

      console.log("hjgjjhhjkjkh" + JSON.stringify(data1));
      // console.log("data1"+data1.brokerarray)
      // console.log("data1"+ this.brokerarray)
      // console.log("data1"+ data1.brokerarray.length)
      let brokerbrandnew = "";
      let brokerarraynew = "";
      if (data1.hasOwnProperty("brokerbrandarray")) {
        brokerbrandnew = data1.brokerbrandarray[0];
      } else {
        brokerbrandnew = "";
      }

      if (data1.hasOwnProperty("brokerarray")) {
        brokerarraynew = data1.brokerarray[0];
      } else {
        brokerarraynew = "";
      }

      /*Status Set data*/
      let statusbrandnew = "";
      let statusarraynew = "";
      let a = "";
      if (data1.hasOwnProperty("statusbrandarray")) {
        a = data1.statusbrandarray.indexOf("Cefima");
        statusbrandnew = "Cefima";
      } else {
        statusbrandnew = "";
      }

      if (data1.hasOwnProperty("statusarray")) {
        console.log("aaaaaaaaaaaa" + data1.statusarray);
        console.log("aaaaaaaaaaaa" + a);
        statusarraynew = data1.statusarray[a];
      } else {
        statusarraynew = "";
      }

      /*Employee Set data*/
      let employeebrandnew = "";
      let employeearraynew = "";
      let broker_type1 = "";
      let Vermittlerstatus = "";
      let registration_number = "";
      let ThirdTypeDoc = "";
      if (data1.hasOwnProperty("employeebrandarray")) {
        employeebrandnew = data1.employeebrandarray[0];
      } else {
        employeebrandnew = "";
      }

      if (data1.hasOwnProperty("employeearray")) {
        employeearraynew = data1.employeearray[0];
      } else {
        employeearraynew = "";
      }
      if (data1.hasOwnProperty("broker_type")) {
        broker_type1 = data1.broker_type;
      } else {
        broker_type1 = "";
      }
      if (data1.hasOwnProperty("registration_number")) {
        registration_number = data1.registration_number;
      } else {
        registration_number = "";
      }
      if (data1.hasOwnProperty("Vermittlerstatus")) {
        Vermittlerstatus = data1.Vermittlerstatus;
      } else {
        Vermittlerstatus = "";
      }
      if (data1.hasOwnProperty("ThirdTypeDoc")) {
        ThirdTypeDoc = data1.ThirdTypeDoc;
      } else {
        ThirdTypeDoc = "";
      }

      console.log("registration_number" + data1.registration_number);

      that.customerFormGroup.patchValue({
        title: data1.title,
        status: statusarraynew,
        employeetype: employeearraynew,
        companyname: data1.companyname,
        firstName: data1.firstname,
        lastName: data1.lastname,
        email: data1.email,
        dob: data1.dateofbirth,
        birthPlace: data1.birth_place,
        nationality: data1.nationality,
        customerNo: data1.customerno,
        street: data1.strassa,
        streetNumber: data1.strno,
        postCode: data1.plz,
        city: data1.city,
        additionalReference: data1.additionalReference,
        countryOfResidence: data1.current_country,
        id: data1._id,
        password: data1.password,
        phone_number: data1.contactno,
        customerno: data1.customerno,
        broker: data1.broker,
        brokerbrand: brokerbrandnew,
        statusbrand: statusbrandnew,
        employeebrand: employeebrandnew,
        registration_number: registration_number,
        Vermittlerstatus: Vermittlerstatus,
        broker_type: broker_type1,
      });
      if (broker_type1 != "") {
        that.broker_typenew = broker_type1;
      }
      console.log("ddddddddddgggggggggggg" + ThirdTypeDoc);
      if (ThirdTypeDoc != "") {
        that.ThirdTypeDoc.setValue(ThirdTypeDoc);
      }
      // this.brokerarraynew=data1.brokerarray;
      // this.brokerarray=["kjl"]
      console.log("brokerarray" + data1.brokerarray);
      if (data1.brokerarray) {
        for (let k = 0; k < data1.brokerarray.length; k++) {
          console.log("data1" + data1.brokerarray[k]);
          that.brokerarray.push(data1.brokerarray[k]);
        }
      }
      if (data1.brokerbrandarray) {
        for (let k1 = 0; k1 < data1.brokerbrandarray.length; k1++) {
          that.brokerbrandarray.push(data1.brokerbrandarray[k1]);
        }
      }

      if (data1.statusarray) {
        for (let k = 0; k < data1.statusarray.length; k++) {
          console.log("data1" + data1.statusarray[k]);
          that.statusarray.push(data1.statusarray[k]);
        }
      }
      if (data1.statusbrandarray) {
        for (let k1 = 0; k1 < data1.statusbrandarray.length; k1++) {
          that.statusbrandarray.push(data1.statusbrandarray[k1]);
        }
      }

      if (data1.employeearray) {
        for (let k = 0; k < data1.employeearray.length; k++) {
          console.log("data1" + data1.employeearray[k]);
          that.employeearray.push(data1.employeearray[k]);
        }
      }
      if (data1.employeebrandarray) {
        for (let k1 = 0; k1 < data1.employeebrandarray.length; k1++) {
          that.employeebrandarray.push(data1.employeebrandarray[k1]);
        }
      }

      // this..push(data1.brokerbrandarray)
      console.log("hjgjjhhjkjkh" + JSON.stringify(brokerarraynew));
      if (brokerarraynew) {
        for (let i = 0; i < that.brokerList.length; i++) {
          console.log(
            "hjgjjhhjkjkh" + JSON.stringify(that.brokerList[i].value)
          );
          if (that.brokerList[i].value == brokerarraynew) {
            that.brokerFormControl.setValue(that.brokerList[i]);
            console.log("that.brokerList[i]" + that.brokerList[i]);
          }
        }
      } else {
        that.brokerFormControl.setValue("");
      }

      if (data1.nationality) {
        console.log("data1.nationality" + data1.nationality);
        for (let i = 0; i < that.optionsValue.length; i++) {
          console.log("data1.nationality1" + data1.nationality);
          if (that.optionsValue[i] == data1.nationality) {
            that.myControl.setValue(data1.nationality);
          }
        }
      } else {
        that.myControl.setValue("");
      }

      if (data1.current_country) {
        for (let i = 0; i < that.optionsValue.length; i++) {
          if (that.optionsValueland[i] == data1.current_country) {
            that.myControlland.setValue(data1.current_country);
          }
        }
      } else {
        that.myControlland.setValue("");
      }

      that.customerNo = data1.customerno;
      that.companyTitleShow = data1.title === "Firma" ? true : false;
      console.log("CCC", data1);
      that.userData = data1;
    }
  }

  brokerDisplayFn(user: Broker): string {
    console.log("sadasdasdasd");
    console.log("befor" + this.disableEditSubmit);
    if (user) {
      if (user.name != "") {
        this.disableEditSubmit = false;
        console.log("after" + this.disableEditSubmit);
        return user && user.name ? user.name : "";
      }
    } else {
      this.disableEditSubmit = true;
      console.log("aftertest" + this.disableEditSubmit);
      return user && user.name ? user.name : "";
    }
  }

  // patchBrokerValue(event) {
  //   console.log(event);
  //   console.log("patchBrokerValue" + this.brokerFormControl.value.value);
  //   this.customerFormGroup.patchValue({
  //     broker: this.brokerFormControl.value.value
  //   });
  // }

  patchBrokerValue(event: any) {
    console.log(event);
    console.log("patchBrokerValue" + this.brokerFormControl.value.value);
    // this.customerFormGroup.patchValue({
    //   broker: this.brokerFormControl.value.value
    // });
    if (this.brokerFormControl.value.value) {
      let brokerbrand = this.customerFormGroup.value.brokerbrand;
      if (this.brokerbrandarray.length > 0) {
        console.log("patchBrokerValueif" + brokerbrand);
        let a = this.brokerbrandarray.indexOf(brokerbrand);
        console.log("patchBrokerValueif" + a);
        if (a != -1) {
          console.log("patchBrokerValueif" + this.brokerarray[a]);
          this.brokerarray[a] = this.brokerFormControl.value.value;
          console.log("patchBrokerValueif" + this.brokerarray[a]);
        } else {
          console.log("patchBrokerValueifelseif" + a);
          this.brokerbrandarray.push(brokerbrand);
          this.brokerarray.push(this.brokerFormControl.value.value);
        }
      } else {
        console.log("patchBrokerValueelse");
        this.brokerbrandarray.push(brokerbrand);
        this.brokerarray.push(this.brokerFormControl.value.value);
      }
    }
    // if (this.brokerFormControl.value.value) {
    // console.log("IF"+this.brokerFormControl.value.value)
    //   this.customerFormGroup.patchValue({
    //     broker: this.brokerFormControl.value.value
    //   })
    // }else{
    //   this.brokerFormControl.setValue("")
    // }
    console.log("patchBrokerValue" + this.brokerarray);
    console.log("patchBrokerValue" + this.brokerbrandarray);
    this.checkDataAndCreateUpdateData();
  }

  getBrokersData(userData?: any) {
    let brokerList: any = [];
    const data = this.userService
      .getCustomers("cefima")
      .subscribe((success: any) => {
        console.log("this.currentid" + this.currentid);
        for (let i = 0; i < success.length; i++) {
          if (this.currentid == success[i]._id) {
            brokerList.push({
              name:
                success[i].firstname +
                " " +
                success[i].lastname +
                "(" +
                success[i].customerno +
                ")",
              value: success[i].customerno,
              companynamenew: success[i].companies_with_roles,
            });
          }
        }
        this.brokerList = brokerList;
      });
    console.log(this.brokerList);
  }

  getBrokersDatanew(userData: any, company: any) {
    let brokerList = [];
    // console.log("broooker!!!!!!!!!!!!!!!!!!!!!"+JSON.stringify(userData));
    for (let i = 0; i < userData.length; i++) {
      // let companynew=
      if (userData[i].hasOwnProperty("companies_with_roles")) {
        console.log(
          "broooker!!!!!!!!!!!!!!!!!!!!!" + JSON.stringify(userData[i])
        );
        if (
          userData[i].companies_with_roles.includes(
            company.toLowerCase() + "_b2b"
          ) &&
          userData[i].status.includes("1")
        ) {
          brokerList.push({
            name:
              userData[i].firstname +
              " " +
              userData[i].lastname +
              "(" +
              userData[i].customerno +
              ")",
            value: userData[i].customerno,
            companynamenew: userData[i].companies_with_roles,
          });
        }
      }
    }

    console.log("broooker!!!!!!!!!!!!!!!!!!!!!" + JSON.stringify(brokerList));

    return brokerList;
  }

  changebrandbroker(event: any) {
    console.log(event);
    // this.brokerFormControl.value.value
    let brokerListnew = [];

    this.brokerList = this.getBrokersDatanew(
      this.customerList,
      this.customerFormGroup.value.brokerbrand
    );
    let a = this.brokerbrandarray.indexOf(
      this.customerFormGroup.value.brokerbrand
    );
    if (a != -1) {
      console.log("patchBrokerValue" + this.brokerarray[a]);
      if (this.brokerarray[a]) {
        console.log("patchBrokerValue" + JSON.stringify(this.brokerList));
        for (let i = 0; i < this.brokerList.length; i++) {
          console.log("patchBrokerValue" + this.brokerList[i].value);
          if (this.brokerList[i].value == this.brokerarray[a]) {
            this.brokerFormControl.setValue(this.brokerList[i]);
            console.log("patchBrokerValue" + this.brokerList[i]);
          }
        }
      }
    } else {
      console.log("patchBrokerValue" + this.brokerarray);
      this.brokerFormControl.setValue("");
    }
  }

  editRecord(id: any, accordianId: any, cl: any) {
    this.popupData = cl;
    console.log("editrrrrrrrrrrrr" + this.disableEditSubmit);
    accordianId = "collapse";
    event!.preventDefault();
    let element1: HTMLElement = document.getElementById(
      "ul" + id
    ) as HTMLElement;
    let element1new: HTMLElement = document.getElementById(
      "cardbodyid"
    ) as HTMLElement;
    let element: HTMLElement = document.getElementById(
      "click" + id
    ) as HTMLElement;
    let accordian: HTMLElement = document.getElementById(accordianId)!;
    console.log("element1new" + element.innerHTML);
    console.log("element" + element);
    console.log("else accordian1", accordian);
    if (element.innerHTML == "Schließen") {
      console.log("element", element1new);
      element1new.after(accordian);
      accordian.classList.remove("collapse-show");
      element.innerHTML = "Öffnen";

      let close = "close";
      console.log("elementelse0000000", element1);
      //this.checkDataAndCreateUpdateData(true, element, accordian,close)
    } else {
      setTimeout(() => {
        const input: any = document.querySelector("#phone");
        console.log("querySelector" + input.value);
        if (input) {
          intlTelInput(input, {
            // {
            //   initialCountry: "de",
            //   geoIpLookup: function (callback) {
            //     $.get("http://ipinfo.io", function () { }, "jsonp").always(function (
            //       resp: any
            //     ) {
            //       var countryCode = resp && resp.country ? resp.country : "de";
            //       callback(countryCode);
            //       console.log("countryCode" + countryCode);
            //     });
            //   },
            // }
          });
        }
      }, 500);

      if (this.id != "") {
        let elementnew1: HTMLElement = document.getElementById(
          "click" + this.id
        ) as HTMLElement;
        if (elementnew1) {
          console.log("elementelse", elementnew1);
          elementnew1.innerHTML = "Öffnen";
        }
      }
      console.log("else accordian", accordian);
      console.log("else element", element1);
      element1.after(accordian);
      // accordian.classList.remove("collapse");
      // accordian.classList.add("collapse-show");
      // element.innerHTML = "Schließen";
      $('#openpreviewmodel').trigger('click');
      this.open_modal('staticBackdrop')
      this.id = id;
      this.getcurrentUser(this.id);
    }
    // console.log(element.innerHTML);
  }

  statusCustomer(id: any) {
    Swal.fire({
      title: "Möchten Sie den Kundenstatus wirklich ändern?",
      showCancelButton: true,
      confirmButtonText: "Ja",
      cancelButtonText: "Nein",
    }).then((result) => {
      if (result.value) {
        const data = this.userService.statusCustomer({ id: id });

        if (data) {
          console.log(data);
          console.log(this.pagedItems);
          console.log("pageeee" + this.pager.currentPage);
          setTimeout(() => {
            if (this.loginRole == "b2b") {
              const data = this.userService
                .getCustomers("cefima", true)
                .subscribe(
                  (success: any) => {
                    // if success and error give response
                    console.log("cefimaaaaaaaaaaaaa");
                    if (success.status == "error") {
                      this.error = success.message;
                    } else {
                      var success = this.filtercustomer(success, "cefima");
                      this.getBrokersData(success);
                      this.customerList = success;
                      console.log(this.customerList);
                      console.log("this.customerList" + success);
                      console.log("this.customerno" + this.customerno);
                      console.log(success);

                      this.setPage(1);
                      this.recordCount = success.length;
                    }
                  },
                  (rejected: any) => {
                    console.log(rejected);
                  }
                );
            } else {
              const data = this.userService.getCustomers("cefima").subscribe(
                (success: any) => {
                  // if success and error give response
                  if (success.status == "error") {
                    this.error = success.message;
                  } else {
                    this.getBrokersData(success);
                    this.customerList = success;
                    this.setPage(1);
                    this.recordCount = success.length;
                    console.log(this.customerList);
                  }
                },
                (rejected: any) => {
                  console.log(rejected);
                }
              );
            }

            // const data1 = this.userService
            //   .getCustomers("cefima", true)
            //   .subscribe(
            //     (success: any) => {
            //       // if success and error give response
            //       if (success.status == "error") {
            //         this.error = success.message;
            //       } else {
            //         this.customerList = success;
            //         this.setPage(1);
            //         this.recordCount = success.length;
            //         console.log(this.customerList);
            //       }
            //     },
            //     (rejected) => {
            //       console.log(rejected);
            //     }
            //   );
          }, 1000);

          console.log("pageeee" + this.pager.currentPage);
          // this.setPage(this.pager.currentPage);
          // this.router.navigate(['./b2b']);
          // window.location.reload();
        }
      }
    });
  }
  gotonewuser() {
    console.log("newuser");
    this.router.navigate(["./cefima/new-user"], {
      queryParams: {
        OnlyNewUser: false,
      },
    });
  }
  statusCustomernew(id: any) {
    Swal.fire({
      title: "Möchten Sie den Kundenstatus wirklich ändern?",
      showCancelButton: true,
      confirmButtonText: "Ja",
      cancelButtonText: "Nein",
    }).then((result) => {
      if (result.value) {
        const data = this.userService.statusCustomernew({ id: id });

        if (data) {
          console.log(data);
          console.log(this.pagedItems);
          console.log("pageeee" + this.pager.currentPage);
          setTimeout(() => {
            if (this.loginRole == "b2b") {
              const data = this.userService
                .getCustomers("cefima", true)
                .subscribe(
                  (success: any) => {
                    // if success and error give response
                    console.log("cefimaaaaaaaaaaaaa");
                    if (success.status == "error") {
                      this.error = success.message;
                    } else {
                      var success = this.filtercustomer(success, "cefima");
                      this.getBrokersData(success);
                      this.customerList = success;
                      console.log(this.customerList);
                      console.log("this.customerList" + success);
                      console.log("this.customerno" + this.customerno);
                      this.setPage(1);
                      this.recordCount = success.length;
                    }
                  },
                  (rejected: any) => {
                    console.log(rejected);
                  }
                );
            } else {
              const data = this.userService.getCustomers("cefima").subscribe(
                (success: any) => {
                  // if success and error give response
                  if (success.status == "error") {
                    this.error = success.message;
                  } else {
                    this.getBrokersData(success);
                    this.customerList = success;
                    this.setPage(1);
                    this.recordCount = success.length;
                    console.log(this.customerList);
                  }
                },
                (rejected: any) => {
                  console.log(rejected);
                }
              );
            }

            // const data1 = this.userService
            //   .getCustomers("cefima", true)
            //   .subscribe(
            //     (success: any) => {
            //       // if success and error give response
            //       if (success.status == "error") {
            //         this.error = success.message;
            //       } else {
            //         this.customerList = success;
            //         this.setPage(1);
            //         this.recordCount = success.length;
            //         console.log(this.customerList);
            //       }
            //     },
            //     (rejected) => {
            //       console.log(rejected);
            //     }
            //   );
          }, 1000);

          console.log("pageeee" + this.pager.currentPage);
          // this.setPage(this.pager.currentPage);
          // this.router.navigate(['./b2b']);
          // window.location.reload();
        }
      }
    });
  }

  openCompanyDialog(role_name: any): void {
    let role = "";
    if (role_name == "admin") {
      role = "Admin";
    } else if (role_name == "customer") {
      role = "Kunde";
    } else if (role_name == "employee") {
      role = "Mitarbeiter";
    } else if (role_name == "b2b") {
      role = "B2B";
    } else if (role_name == "user") {
      role = "Benutzer";
    }
    let data: any = {
      roleName: role,
      companies: this.roleCompanies[role_name],
      calledFrom: "update",
    };
    console.log("openCompanyDialog" + JSON.stringify(data));
    if (this.loginRole == "admin") {
      let userCompanies: any = [];
      this.logged_in_users_companies_with_roles.map((item: any) => {
        if (item.includes("admin")) {
          let name = item.split("_")[0];
          userCompanies.push(name);
        }
      });
      data["disableCompanies"] = userCompanies;
    }
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(CompanySelectDialogComponent, {
      disableClose: true,
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.roleCompanies[role_name] = result;
      if (role_name == "admin") {
        this.admin = result.length == 0 ? false : true;
      } else if (role_name == "customer") {
        this.customer = result.length == 0 ? false : true;
      } else if (role_name == "employee") {
        this.employee = result.length == 0 ? false : true;
      } else if (role_name == "b2b") {
        this.b2b = result.length == 0 ? false : true;
      } else if (role_name == "user") {
        this.user = result.length == 0 ? false : true;
      }
      this.checkDataAndCreateUpdateData();
    });
  }
  gotosessionmaindata() {
    if (this.loginRole == "b2b") {
      this.router.navigate(["./cefima/b2b-dashboard"], {
        queryParams: { id: this.currentid },
      });
    } else {
      this.router.navigate(["./cefima/kunde-home"], {
        queryParams: { id: this.localdata._id, tabname: 1 },
      });
    }
  }

  checkDataAndCreateUpdateData(
    callSave?: any,
    element?: any,
    accordian?: any,
    close = ""
  ) {
    this.disableEditSubmit = true;
    console.log("disableEditSubmit" + this.disableEditSubmit);
    // console.log("inside check data" , this.customerFormGroup.value);
    let roles = [];
    let rolescode = [];
    let companies: any = new Set([]);
    let companiescode: any = new Set([]);
    let rolesCompaniesArray = [];
    let rolesCompaniescodeArray = [];
    let brokerbrandarraynew = [];
    let brokerarraynew = [];
    let statusbrandarraynew = [];
    let statusarraynew = [];
    let employeebrandarraynew = [];
    let employeearraynew = [];
    console.log("roleCompanies" + JSON.stringify(this.roleCompanies));
    for (let i in this.roleCompanies) {
      let role = i;
      let temp = this.roleCompanies[i];
      if (temp.length > 0) {
        if (role == "user") {
          roles.push("Benutzer");
        } else {
          roles.push(role);
        }
      }
      for (let j = 0; j < temp.length; j++) {
        companies.add(temp[j]);
        rolesCompaniesArray.push(temp[j] + `_${role}`);
      }
    }

    for (let i in this.roleCompaniescode) {
      let rolecode = i;
      let tempcode = this.roleCompaniescode[i];
      if (tempcode.length > 0) {
        if (rolecode == "user") {
          rolescode.push("Benutzer");
        } else {
          rolescode.push(rolecode);
        }
      }
      for (let j = 0; j < tempcode.length; j++) {
        companiescode.add(tempcode[j]);
        rolesCompaniescodeArray.push(tempcode[j] + `_${rolecode}`);
      }
    }
    console.log("roleCompanies" + JSON.stringify(rolesCompaniescodeArray));

    console.log("600" + this.customerFormGroup.value.phone_number);
    console.log("checkdata" + this.customerFormGroup.value.customerno);
    console.log("nationality" + this.customerFormGroup.value.nationality);
    console.log(
      "countryOfResidence" + this.customerFormGroup.value.countryOfResidence
    );
    let that = this;
    var serverrole = this.userData.roles;
    console.log("serverrolenew : " + this.userData.roles);
    console.log("serverrole: " + serverrole);
    console.log("serverrole: " + serverrole);
    if (serverrole.includes("Superadmin")) {
      roles.push("Superadmin");
    }

    brokerbrandarraynew = this.brokerbrandarray;
    brokerarraynew = this.brokerarray;

    statusbrandarraynew = this.statusbrandarray;
    statusarraynew = this.statusarray;

    employeebrandarraynew = this.employeebrandarray;
    employeearraynew = this.employeearray;

    console.log("companies" + Array.from(companies));
    let data: any = {
      roles: roles,
      companies: Array.from(companies),
      companies_with_roles: rolesCompaniesArray,
      companycode: rolesCompaniescodeArray,
      // Personal Information
      title: this.customerFormGroup.value.title,
      customer_status: this.customerFormGroup.value.status,
      employeetype: this.customerFormGroup.value.employeetype,
      companyname: this.customerFormGroup.value.companyname,
      firstname: this.customerFormGroup.value.firstName,
      lastname: this.customerFormGroup.value.lastName,
      email: this.customerFormGroup.value.email,
      dateofbirth: this.customerFormGroup.value.dob,
      nationality: this.customerFormGroup.value.nationality,
      birth_place: this.customerFormGroup.value.birthPlace,

      // Address Information
      strassa: this.customerFormGroup.value.street,
      strno: this.customerFormGroup.value.streetNumber,
      additionalReference: this.customerFormGroup.value.additionalReference,
      plz: this.customerFormGroup.value.postCode,
      city: this.customerFormGroup.value.city,
      current_country: this.customerFormGroup.value.countryOfResidence,

      //More Information
      _id: this.customerFormGroup.value.id,

      contactno: this.customerFormGroup.value.phone_number,
      customerno: this.customerFormGroup.value.customerno,
      broker: this.customerFormGroup.value.broker,
      brokerbrandarray: brokerbrandarraynew,
      brokerarray: brokerarraynew,

      statusbrandarray: statusbrandarraynew,
      statusarray: statusarraynew,

      employeebrandarray: employeebrandarraynew,
      employeearray: employeearraynew,

      // status: '1',
    };

    for (let i in data) {
      if (this.userData.hasOwnProperty(i)) {
        if (Array.isArray(data[i])) {
          // console.log(data[i], this.userData[i])
          if (
            i == "brokerarray" ||
            i == "brokerbrandarray" ||
            i == "statusbrandarray" ||
            i == "statusarray" ||
            i == "employeebrandarray" ||
            i == "employeearray"
          ) {
            if (JSON.stringify(data[i]) != JSON.stringify(this.userData[i])) {
              console.log(data[i], this.userData[i]);
              this.disableEditSubmit = false;
              console.log("if1");
            }
          } else {
            if (
              JSON.stringify(data[i].sort()) !=
              JSON.stringify(this.userData[i].sort())
            ) {
              console.log(data[i], this.userData[i]);
              this.disableEditSubmit = false;
              console.log("if1");
            }
          }
        } else {
          if (i == "contactno" && !this.userData[i].includes("+")) {
            if (data[i] != this.userData[i]) {
              console.log("if2");

              this.disableEditSubmit = false;
            }
          } else {
            if (data[i] != this.userData[i]) {
              console.log("if3");

              this.disableEditSubmit = false;
            }
          }
        }
      } else {
        if (data[i] != this.userData[i]) {
          console.log("if3");

          this.disableEditSubmit = false;
        } else {
          // this.disableEditSubmit = true
        }
        // console.log("else")
        //  this.disableEditSubmit = false
      }
    }
    console.log(this.disableEditSubmit, "disableEditSubmit");
    if (callSave) {
      console.log("hello");
      this.save(data, element, this.customerFormGroup.value.id, close);
    }
  }

  save(data: any, element?: any, accordian?: any, close?: any) {
    console.log("datasave", data);
    var current_id = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).id;
    console.log("current_id" + current_id);
    console.log("data_id" + data._id);
    var updateuserloginid = data._id;
    if (data._id == current_id) {
      localStorage.setItem("currentUser", JSON.stringify(data));
    }

    if (data.roles.length > 0) {
      if (close == "close") {
        Swal.fire({
          title: "Sind Sie sicher, dass Sie ein Update wünschen?",
          showCancelButton: true,
          confirmButtonText: "Speichern",
          cancelButtonText: "Verwerfen",
        }).then((result) => {
          console.log("result", result);
          if (result.value) {
            // let companies
            var customerno = data.customerno;
            var splitdata = customerno.split("-");
            var nums = [splitdata[0]];
            var tmp = data.companies;
            var nums1: any = [];
            var c_100 = [];
            var c_110 = [];
            var c_120 = [];
            var c_130 = [];
            var c_140 = [];
            var c_150 = [];
            if (tmp) {
              tmp.forEach(function (i: any, k: any) {
                var cusNo = i.substring(0, 2);
                if (cusNo == "ce" || cusNo == "st") {
                  c_140.push(cusNo);
                }
                if (cusNo == "fi" || cusNo == "fi" || cusNo == "ch") {
                  c_130.push(cusNo);
                }
                if (cusNo == "va" || cusNo == "bi") {
                  c_120.push(cusNo);
                }
                if (cusNo == "co") {
                  c_150.push(cusNo);
                }
              });
              if (c_140.length > 0) {
                c_140.unshift("40");
              }
              if (c_130.length > 0) {
                c_130.unshift("30");
              }
              if (c_120.length > 0) {
                c_120.unshift("20");
              }
              if (c_150.length > 0) {
                c_150.unshift("60");
              }
              nums1 = nums1.concat(c_150);
              nums1 = nums1.concat(c_140);
              nums1 = nums1.concat(c_130);
              nums1 = nums1.concat(c_120);
              nums1.unshift(splitdata[0]);

              // nums.push(cusNo);

              var cusNo = nums1.join("-");
              var customerNo = cusNo;
              console.log("CUSTOMERNO" + customerNo);
              data.customerno = customerNo;
            }

            $("#loaderouterid").css("display", "block");
            console.log(result, "inside save");
            this.userService
              .updateUser(data)
              .pipe(first())
              .subscribe(
                (data: any) => {
                  //var current_id=this.userService.getDecodedAccessToken(localStorage.getItem('token')).id;
                  console.log("current_id" + current_id);
                  console.log("data_id" + updateuserloginid);
                  if (updateuserloginid == current_id) {
                    console.log("updateuserloginid");
                    //localStorage.setItem('currentUser', JSON.stringify(data));
                    this.token = data["token"];
                    localStorage.setItem("token", this.token);
                    localStorage.setItem(
                      "currentUser",
                      JSON.stringify(data["user"])
                    );
                  }

                  console.log("POST Request is successful ", data);
                  //localStorage.setItem('currentUser', JSON.stringify(data['user']));
                  this.registerDone = true;
                  // window.location.reload();
                },
                (error) => {
                  console.log("POST Request is   error ", error);
                  this.registraionError = true;
                  // console.log("Error", error['error']);
                }
              );

            setTimeout(() => {
              this.registerDone = false;
              $("#loaderouterid").css("display", "none");
            }, 1000);
            // this.nextCompanies()
            // let accordian: HTMLElement = document.getElementById("collapse");
            // let element1: HTMLElement = document.getElementById('click' + data._id) as HTMLElement;
            // let element1new: HTMLElement = document.getElementById('cardbodyid') as HTMLElement;
            // accordian.classList.add("collapse");
            // accordian.classList.add("collapse");
            // accordian.classList.remove("collapse-show");
            // element1.innerHTML = "Öffnen";
            // element1new.after(accordian);
          } else {
            this.getcurrentUser(null, this.currentUserData);

            // if (element) {
            //   accordian.classList.add("collapse");
            //   accordian.classList.remove("collapse-show");
            //   element.innerHTML = "Öffnen";

            // }
          }

          console.log("paaaaaaaaaaaa" + this.pager);

          // console.log("without b2b");
          var searchid = $("#searchid").val();
          console.log("serachid" + searchid);
          if (searchid == "") {
            const data = this.userService
              .getCustomers("cefima", true)
              .subscribe(
                (success: any) => {
                  // if success and error give response
                  console.log("cefimaaaaaaaaaaaaa");
                  if (success.status == "error") {
                    this.error = success.message;
                  } else {
                    var success = this.filtercustomer(success, "cefima");
                    this.getBrokersData(success);
                    this.customerList = success;
                    console.log(this.customerList);
                    console.log("this.customerList" + success);
                    console.log("this.customerno" + this.customerno);
                    this.setPage(this.pager.currentPage);
                    this.recordCount = success.length;
                  }
                },
                (rejected: any) => {
                  console.log(rejected);
                }
              );
          } else {
            let { customerno } = JSON.parse(
              localStorage.getItem("currentUser")!
            );
            let CustomerNumbernew = customerno;

            const data = this.userService
              .getSearch(this.values, CustomerNumbernew)
              .subscribe(
                (success: any) => {
                  // if success and error give response
                  if (success.status == "error") {
                    this.error = success.message;
                  } else {
                    this.getBrokersData(success);
                    this.customerList = success;
                    this.setPage(this.pager.currentPage);
                    this.recordCount = success.length;
                    console.log(this.customerList);
                  }
                },
                (rejected) => {
                  console.log(rejected);
                }
              );
          }
          // window.location.reload();

          // $("#loaderouterid").css("display", "none");
        });
      } else {
        // Swal.fire({
        //   title: 'Sind Sie sicher, dass Sie ein Update wünschen?',
        //   showCancelButton: true,
        //   confirmButtonText: 'Speichern',
        //   cancelButtonText: 'Verwerfen'
        // }).then((result) => {
        //   console.log("result",result)
        //   if (result.value) {

        // let companies

        // let companies
        console.log("data.companies", data.companies);
        var customerno = data.customerno;
        var splitdata = customerno.split("-");
        var nums = [splitdata[0]];
        var tmp = data.companies;
        var nums1: any = [];
        var c_100 = [];
        var c_110 = [];
        var c_120 = [];
        var c_130 = [];
        var c_140 = [];
        var c_150 = [];
        if (tmp) {
          tmp.forEach(function (i: any, k: any) {
            var cusNo = i.substring(0, 2);
            if (cusNo == "ce" || cusNo == "st") {
              c_140.push(cusNo);
            }
            if (
              cusNo == "fi" ||
              cusNo == "fi" ||
              cusNo == "ch" ||
              cusNo == "ai"
            ) {
              c_130.push(cusNo);
            }
            if (cusNo == "va" || cusNo == "bi") {
              c_120.push(cusNo);
            }
          });
          if (c_140.length > 0) {
            c_140.unshift("40");
          }
          if (c_130.length > 0) {
            c_130.unshift("30");
          }
          if (c_120.length > 0) {
            c_120.unshift("20");
          }

          nums1 = nums1.concat(c_140);
          nums1 = nums1.concat(c_130);
          nums1 = nums1.concat(c_120);
          nums1.unshift(splitdata[0]);

          // nums.push(cusNo);

          var cusNo = nums1.join("-");
          var customerNo = cusNo;
          console.log("CUSTOMERNO" + customerNo);
          data.customerno = customerNo;
        }

        $("#loaderouterid").css("display", "block");

        this.userService
          .updateUser(data)
          .pipe(first())
          .subscribe(
            (data: any) => {
              if (updateuserloginid == current_id) {
                console.log("updateuserloginid");
                //localStorage.setItem('currentUser', JSON.stringify(data));
                this.token = data["token"];
                localStorage.setItem("token", this.token);
                localStorage.setItem(
                  "currentUser",
                  JSON.stringify(data["user"])
                );
              }
              console.log("POST Request is successful ", data);
              this.registerDone = true;
              // window.location.reload();
            },
            (error) => {
              console.log("POST Request is   error ", error);
              this.registraionError = true;
              // console.log("Error", error['error']);
            }
          );

        setTimeout(() => {
          this.registerDone = false;
          $("#loaderouterid").css("display", "none");
        }, 1000);

        console.log("paaaaaaaaaaaa" + this.pager);

        // console.log("without b2b");
        var searchid = $("#searchid").val();
        console.log("serachid" + searchid);
        if (searchid == "") {
          const data = this.userService.getCustomers("cefima", true).subscribe(
            (success: any) => {
              // if success and error give response
              console.log("cefimaaaaaaaaaaaaa");
              if (success.status == "error") {
                this.error = success.message;
              } else {
                var success = this.filtercustomer(success, "cefima");
                this.getBrokersData(success);
                this.customerList = success;
                console.log(this.customerList);
                console.log("this.customerList" + success);
                console.log("this.customerno" + this.customerno);
                this.setPage(this.pager.currentPage);
                this.recordCount = success.length;
              }
            },
            (rejected: any) => {
              console.log(rejected);
            }
          );
        } else {
          let { customerno } = JSON.parse(localStorage.getItem("currentUser")!);
          let CustomerNumbernew = customerno;

          const data = this.userService
            .getSearch(this.values, CustomerNumbernew)
            .subscribe(
              (success: any) => {
                // if success and error give response
                if (success.status == "error") {
                  this.error = success.message;
                } else {
                  this.getBrokersData(success);
                  this.customerList = success;
                  this.setPage(this.pager.currentPage);
                  this.recordCount = success.length;
                  console.log(this.customerList);
                }
              },
              (rejected) => {
                console.log(rejected);
              }
            );
        }
        // window.location.reload();

        // $("#loaderouterid").css("display", "none");

        // });
      }
    } else {
      Swal.fire("Bitte wählen Sie mindestens eine Rolle aus", "", "success");
    }

    // this.brokerarray=[];
    // this.brokerbrandarray=[];
  }

  handleAllFields(data: any) {
    const splitArr = data.address_components;
    this.getAllFields(splitArr);
  }

  patchnationalityValue(event: any) {
    console.log(event);
    console.log("patchnationalityValue" + this.myControl.value);
    this.customerFormGroup.patchValue({
      nationality: this.myControl.value,
    });
    // if (this.brokerFormControl.value.value) {
    // console.log("IF"+this.brokerFormControl.value.value)
    //   this.customerFormGroup.patchValue({
    //     broker: this.brokerFormControl.value.value
    //   })
    // }else{
    //   this.brokerFormControl.setValue("")
    // }
    this.checkDataAndCreateUpdateData();
  }

  getAllFields(data: any): any {
    let that = this;
    const splitArr = data;
    // console.log("splitArr", splitArr);
    splitArr.forEach(function (i: any, k: any) {
      //// console.log(i);
      let content: any = i.types;
      console.log("content", content);
      const found = content.find((element: any) => (element = "street_number"));
      if (found === "street_number") {
        that.customerFormGroup.patchValue({ streetNumber: i.short_name });
      }
      if (found === "postal_code") {
        that.customerFormGroup.patchValue({ postCode: i.short_name });
      }
      if (found === "route") {
        that.customerFormGroup.patchValue({ street: i.short_name });
      }
      //// console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        //// console.log(countryArr);
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.customerFormGroup.patchValue({
              countryOfResidence: i.short_name,
            });
          }
          if (countryArr[index] === "locality") {
            that.customerFormGroup.patchValue({ city: i.short_name });
          }
        }
      }
    });
  }

  open_modal(modal_id: any) {
    console.log(modal_id);

    $('#' + modal_id).appendTo("body");
  }
  close_modal(modal_id: any, append_to: any) {
    $('#' + modal_id).appendTo("#" + append_to);
  }

}
