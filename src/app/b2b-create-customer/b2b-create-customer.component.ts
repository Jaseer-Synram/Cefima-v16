import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import * as intlTelInput from 'intl-tel-input';
import { Observable, startWith, map, first } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-b2b-create-customer',
  templateUrl: './b2b-create-customer.component.html',
  styleUrls: ['./b2b-create-customer.component.css']
})
export class B2bCreateCustomerComponent {

  myControl = new FormControl();
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

  filteredOptions!: Observable<string[]>;

  mekFinanz_customer = false;
  showDisabled: boolean = false;
  addmoredata = false;
  realcustomer: boolean = false;
  phone_number!: "";
  customerno!: "";
  token: any;
  disable_button = true;
  companytypenew: any = "";
  countryName: any;
  localityName = "";
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

  password = "";
  title: any
  lastname: any
  firstname: any
  COMPANYNAME: any
  currentUserToParse: any = localStorage.getItem("currentUser")
  localdata = JSON.parse(this.currentUserToParse);
  id: any
  // loginRole = this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles;
  //customerNo = this.genFiorettoGmbHCustomerNo();
  loginRole = localStorage.getItem("currentActiveRole");
  isLinear = false;
  hide = true;
  // roleFormGroup: FormGroup;
  companyFormGroup!: FormGroup;
  companyNewFormGroup!: FormGroup;
  moveForward = true;
  livingaddressFormGroup!: FormGroup;
  personalInfoFormGroup!: FormGroup;
  addressFormGroup!: FormGroup;
  secondcompanyaddressFormGroup!: FormGroup;
  secondcompanyaddressFormGroup1!: FormGroup;
  secondcompanyaddressFormGroup2!: FormGroup;
  addedpersons: any = [];
  addedpersonsFirst: any = [];
  addedpersonsSecond: any = [];
  moreinfoFormGroup!: FormGroup;
  options: any;
  showmore = [false];
  type3count1: number = 0;
  showmore2 = [false];
  showmore1 = [false];
  ThirdTypeDocOptions!: Observable<any>;
  ThirdTypeDoc = new FormControl();
  askquestion = new FormControl('', Validators.required)
  customervalidemail = false;
  companytypevalue = false;
  registerDone = false;
  registraionError = false;

  //for design of first step

  isHoverUnternahman = false
  isHoverHaushalt = false
  itemToDisplayUnderKundenType = ''
  //DatePicker min and max date

  sharesvalue: number = 100;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2020, 0, 1);
  companyArr = [];
  customerFunction = this.nextCompanies();
  customerNo!: string;
  year: any = new Date().getFullYear();
  autoGeneratedCustomerNumber = this.getLastUser();
  selected!: string;
  public country: any;
  routeParams: any;
  companyTitle = false;
  companyTitleValue = '';
  roleCompanies: {
    employee: any[];
    admin: any[];
    customer: string[];
    b2b: any[];
  } = {
      employee: [],
      admin: [],
      customer: ["cefima_customer"],
      b2b: [],
    };
  user_id!: string;
  OnlyNewUser!: string;
  selectedUser = {
    id: "",
  };
  currentid: any
  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    if (this.loginRole == "b2b") {
    } else {
      this.router.navigate(["/kunde-home"], {
        queryParams: { id: this.currentid },
      });
    }
  }

  telInputObject(obj: any) {
    console.log(obj);
    obj.setCountry("de");
  }

  onStepChange(event: StepperSelectionEvent) {
    console.log(event);

    if (event.selectedIndex === 3) {
      console.log(event.selectedStep);
      this.intlTelInputShow();
    }
  }

  intlTelInputShow() {
    const input = document.getElementById("phone");
    console.log("querySelector" + input);
    if (input) {
      intlTelInput(input, {
        initialCountry: "de",
        geoIpLookup: function (callback) {
          $.get("http://ipinfo.io", function () { }, "jsonp").always(function (
            resp
          ) {
            var countryCode = resp && resp.country ? resp.country : "de";
            callback(countryCode);
            console.log("countryCode" + countryCode);
          });
        },
      });
    }
  };

  ngAfterViewInit() {

    // $('.firstlast').parent().css('overflow', 'none');
    // $(".firstlast").find('.mat-form-field-infix').css('width',"100%");
    $(".firstlast")
      .parent("div")
      .find(".mat-form-field-infix")
      .css("width", "100%");
    $(".stepnewclass")
      .parent("div")
      .find(".mat-stepper-horizontal-line")
      .css("min-width", "0px");
    $(".stepnewclass")
      .parent("div")
      .find(".mat-stepper-horizontal-line")
      .css("margin", "0px");
  }
  private _filtercompanytype(value: string): string[] {
    console.log("_filterland" + value);
    const filterValue = value.toLowerCase();
    return this.CompanyType.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  setnationality() {
    console.log(this.myControl.value);
    console.log("sadsad");
    this.personalInfoFormGroup.controls['nationality'].setValue(
      this.myControl.value
    );
    // this.personalInfoFormGroup.nationality=this.myControl.value
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.OnlyNewUser = params["OnlyNewUser"];
      console.log(typeof this.OnlyNewUser);
    });

    const token: any = localStorage.getItem("token")
    this.title = this.userService.getDecodedAccessToken(token)
      .title;
    this.lastname = this.userService.getDecodedAccessToken(token).lastname;
    this.firstname = this.userService.getDecodedAccessToken(token).firstname;
    this.COMPANYNAME = this.userService.getDecodedAccessToken(token).companyname;

    const currentUser: any = localStorage.getItem("currentUser")
    this.localdata = JSON.parse(currentUser);

    this.id = this.userService.getDecodedAccessToken(token).id;
    this.currentid = this.userService.getDecodedAccessToken(token).id;

    this.loginRole = this.loginRole;
    this.selectedUser.id = this.id;
    this.routeParams = this.activatedRoute.snapshot.routeConfig?.path;
    console.log("this.routeParams" + this.routeParams);
    console.log("loginRole" + this.loginRole);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
    this.autoPassword();
    this.nextCompanies();

    //Mat Stepper Control
    // this.roleFormGroup = this._formBuilder.group({
    //   roles: this._formBuilder.array([], Validators.required)
    // });

    this.companyFormGroup = this._formBuilder.group({
      companies: this._formBuilder.array([], Validators.required),
    });

    this.personalInfoFormGroup = this._formBuilder.group({

      status: ["", Validators.required],
      usertitle: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],


      dob: ["", Validators.required],
      nationality: ["", Validators.required],
      birthPlace: ["", Validators.required],
    });
    this.companyNewFormGroup = this._formBuilder.group({
      status: ["", Validators.required],

      companyName: ["", Validators.required],
      companytype: [" ", Validators.required],


      register_location: [""],
      registration_num: [""],

      founding_date: [""],

    });
    this.livingaddressFormGroup = this._formBuilder.group({
      title: ["", [Validators.required]],
      firstname: ["", [Validators.required]],

      lastname: ["", [Validators.required]],
      dob: [""],
      street: [""],
      streetNumber: [""],
      postCode: [""],
      birthPlace: [""],


      city: [""],
      additionalReference: [""],
      countryOfResidence: [""],



    });
    this.secondcompanyaddressFormGroup = this._formBuilder.group({
      legalrepresentativeform: this._formBuilder.array([]),
    });

    this.secondcompanyaddressFormGroup1 = this._formBuilder.group({
      legalrepresentativeform1: this._formBuilder.array([]),
    });

    this.secondcompanyaddressFormGroup2 = this._formBuilder.group({
      legalrepresentativeform2: this._formBuilder.array([]),
    });
    this.ThirdTypeDocOptions = this.ThirdTypeDoc.valueChanges.pipe(
      startWith(""),
      map((value) => this._filtercompanytype(value))
    );
    this.addressFormGroup = this._formBuilder.group({
      street: ["", Validators.required],
      streetNumber: ["", Validators.required],
      postCode: ["", Validators.required],
      city: ["", Validators.required],
      additionalReference: [""],
      countryOfResidence: ["", Validators.required],
    });

    this.moreinfoFormGroup = this._formBuilder.group({
      password: ["", Validators.required],
      phone_number: ["+49", Validators.required],
      customerno: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsValue.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  get personalInfoForm() {
    return this.personalInfoFormGroup.controls;
  }

  get addressInfoForm() {
    return this.addressFormGroup.controls;
  }

  get moreinfoForm() {
    return this.moreinfoFormGroup.controls;
  }
  legalrepresentativeform(): FormArray {
    return this.secondcompanyaddressFormGroup.get(
      "legalrepresentativeform"
    ) as FormArray;
  }

  newlegalrepresentativeform(): FormGroup {
    return this._formBuilder.group({
      // address: ["", Validators.required],
      dateofbirth: ["", Validators.required],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      title: ["", Validators.required],

      streetfirst: ["", Validators.required],
      streetNumberfirst: ["", Validators.required],
      postCodefirst: ["", Validators.required],
      cityfirst: ["", Validators.required],

      additionalReferencefirst: [""],
      countryOfResidencefirst: ["", Validators.required],
    });
  }

  addlegalrepresentativeform(data: any) {
    console.log("piyanshtithani" + data)
    if (data == 'tick') {
      let index = this.legalrepresentativeform().length - 1;
      console.log("lastfields3" + index);
      let firstname =
        this.secondcompanyaddressFormGroup.controls['legalrepresentativeform'].value[
          index
        ].firstname;
      console.log("values" + firstname);
      let lastname =
        this.secondcompanyaddressFormGroup.controls['legalrepresentativeform'].value[
          index
        ].lastname;
      console.log("values" + lastname);
      let newperson = firstname + " " + lastname;
      //let lastperson=this.addedpersons.value[index];
      //console.log("lastperson" + lastperson);

      if (this.legalrepresentativeform().length > this.addedpersonsFirst.length) {
        this.addedpersonsFirst.push(newperson);
      }

      console.log(this.addedpersonsFirst);
      $("#formidFirstCompany" + index).css("display", "none");
      $("#formidFirst" + index).css("display", "none");
    } else {
      let index = this.legalrepresentativeform().length - 1;
      console.log("lastfields3" + index);
      let firstname =
        this.secondcompanyaddressFormGroup.controls['legalrepresentativeform'].value[
          index
        ].firstname;
      console.log("values" + firstname);
      let lastname =
        this.secondcompanyaddressFormGroup.controls['legalrepresentativeform'].value[
          index
        ].lastname;
      console.log("values" + lastname);
      let newperson = firstname + " " + lastname;
      //let lastperson=this.addedpersons.value[index];
      //console.log("lastperson" + lastperson);

      if (this.legalrepresentativeform().length > this.addedpersonsFirst.length) {
        this.addedpersonsFirst.push(newperson);
      }

      console.log(this.addedpersonsFirst);
      $("#formidFirstCompany" + index).css("display", "none");
      $("#formidFirst" + index).css("display", "none");
      this.legalrepresentativeform().push(this.newlegalrepresentativeform());
    }

  }
  showhiddenfieldsSecond(i: number) {
    console.log("show hidden fields" + i);
    let prop = $("#formidSecond" + i).css("display");

    if (prop == "none") {


      $("#formidSecond" + i).css("display", "block");

      $("#arrowsettingheaderSecond" + i).removeClass("down");
      $("#arrowsettingheaderSecond" + i).addClass("up");
    } else {
      $("#formidSecond" + i).css("display", "none");

      $("#arrowsettingheaderSecond" + i).removeClass("up");
      $("#arrowsettingheaderSecond" + i).addClass("down");
    }
  }
  showhiddenfieldsFirst(i: number) {
    console.log("show hidden fields" + i);
    let prop = $("#formidFirst" + i).css("display");
    console.log(prop);
    if (prop == "none") {
      $("#formidFirst" + i).css("display", "block");

      // $("#arrowsettingheaderFirst" + i).removeClass("up");
      $("#arrowsettingheaderFirst" + i).addClass("down");
    } else {
      $("#formidFirst" + i).css("display", "none");

      $("#arrowsettingheaderFirst" + i).removeClass("down");
      // $("#arrowsettingheaderFirst" + i).addClass("up");
    }
  }
  calculateType3() {
    console.log("neelampiu" + this.companytypenew);

    if (
      this.companytypenew == "Einzelunternehmen" ||
      this.companytypenew == "Eingetragener Kaufmann (e.K.)"
    ) {
      if (this.companytypenew == "Einzelunternehmen") {
        this.type3count1 = 2;
        console.log("type31" + this.type3count1);
      } else {
        this.type3count1 = 3;
        console.log("type31" + this.type3count1);
      }
    } else {
      // this.type3count1 =
      //   parseInt(this.localData.type3.legalrepresentativeform2.length) + 3;
      // console.log("type31" + this.type3count1);
      // console.log(
      //   "type31" + this.localData.type3.legalrepresentativeform2.length
      // );
    }
  }
  updateShares(i: number) {
    console.log("updateShareslenghth" + this.legalrepresentativeform2().length);
    console.log("updateSharesi" + i);
    let updatedshares: number = 0;

    let index = this.legalrepresentativeform2().length - 1;
    if (i < index) {
      for (let i = 0; i < index; i++) {
        updatedshares =
          updatedshares +
          parseInt(
            this.secondcompanyaddressFormGroup2.controls['legalrepresentativeform2'].value[i].shares
          );
      }
      console.log("updateShares" + updatedshares);
      this.sharesvalue = 100 - updatedshares;
      console.log("updateShares" + this.sharesvalue);
      let taskListArrays = this.secondcompanyaddressFormGroup2.get(
        "legalrepresentativeform2"
      ) as FormArray;
      taskListArrays.controls[index].patchValue({
        shares: this.sharesvalue,
      });
    }
  }
  showhiddenfields(i: number) {
    console.log("show hidden fields" + i);
    let prop = $("#formid" + i).css("display");
    if (prop == "none") {
      $("#formid" + i).css("display", "block");

      $("#arrowsettingheader" + i).removeClass("down");
      $("#arrowsettingheader" + i).addClass("up");
    } else {
      $("#formid" + i).css("display", "none");

      $("#arrowsettingheader" + i).removeClass("up");
      $("#arrowsettingheader" + i).addClass("down");
    }
  }
  handleAllFieldsShare(data: any, index: any) {
    console.log("imhere" + index);
    const splitArr = data.address_components;

    this.getAllFieldsShare(splitArr, index);
  }
  getAllFieldsShare(data: any, index: any): any {
    console.log("imhre22");
    let that = this;
    const splitArr = data;
    let str = "";
    this.showmore2[index] = true;
    //console.log("data", splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      const found = content.find((element: any) => (element = "street_number"));
      if (found === "street_number") {
        console.log("imhre22" + i.short_name);
        let taskListArrays = that.secondcompanyaddressFormGroup2.get(
          "legalrepresentativeform2"
        ) as FormArray;
        taskListArrays.controls[index].patchValue({
          streetNumbershare: i.short_name,
        });
      } else if (found === "postal_code") {
        let taskListArrays = that.secondcompanyaddressFormGroup2.get(
          "legalrepresentativeform2"
        ) as FormArray;
        taskListArrays.controls[index].patchValue({
          postCodeshare: i.short_name,
        });
        // that.secondcompanyaddressFormGroup2.patchValue({ postCodeshare: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index1 = 0; index1 < content.length; index1++) {
          if (countryArr[index1] === "country") {
            //console.log("country", i);
            let taskListArrays = that.secondcompanyaddressFormGroup2.get(
              "legalrepresentativeform2"
            ) as FormArray;
            taskListArrays.controls[index].patchValue({
              countryOfResidenceshare: i.long_name,
            });
            // that.secondcompanyaddressFormGroup2.patchValue({
            //   countryOfResidenceshare: i.long_name,
            // });
          }
          if (countryArr[index1] === "locality") {
            let taskListArrays = that.secondcompanyaddressFormGroup2.get(
              "legalrepresentativeform2"
            ) as FormArray;
            taskListArrays.controls[index].patchValue({
              cityshare: i.short_name,
            });
            // that.secondcompanyaddressFormGroup2.patchValue({ cityshare: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      let taskListArrays = that.secondcompanyaddressFormGroup2.get(
        "legalrepresentativeform2"
      ) as FormArray;
      taskListArrays.controls[index].patchValue({ streetshare: str });
      //that.secondcompanyaddressFormGroup2.patchValue({ streetshare: str });
    } else {
      let taskListArrays = that.secondcompanyaddressFormGroup2.get(
        "legalrepresentativeform2"
      ) as FormArray;
      taskListArrays.controls[index].patchValue({ streetshare: "" });
      //that.secondcompanyaddressFormGroup2.patchValue({ streetshare: "" });
    }
    $("#message1" + index).html("Weniger Felder anzeigen");
    $("#arrowsetting" + index).removeClass("rightarrow");
    $("#arrowsetting" + index).addClass("uparrow");
    $("#arrowsetting" + index).removeClass("down");
    $("#arrowsetting" + index).addClass("up");
    this.showmore2[index] = true;
  }
  checkTotalShares() {
    console.log("neelampiu");
    let index = this.legalrepresentativeform2().length - 1;
    console.log("checkTotalShares");
    let shares = this.calculateShares();
    console.log("checkTotalShares " + shares);
    if (shares < 95 || shares > 100) {
      console.log("checkTotalShares <95");
      if (shares < 95) {
        $("#showerror" + index).html(
          "Sie müssen mindestens 95% aller wirtschaftlich Berechtigten angeben. Klicken Sie im unteren Verlauf auf ''Mehr hinzufügen'' um weitere wirtschaftlich Berechtigte hinzuzufügen."
        );
      } else {
        $("#showerror" + index).html(
          "100% Unternehmensanteile ist das Maximum. Bitte geben Sie einen korrekten Wert an. "
        );
      }
    } else {
      console.log("nextstep");
      $("#showerror" + index).html("");
    }
    console.log("neelampiu");
  }
  handleAllFieldssecond(data: any, index: any) {
    console.log("imhere" + index);
    const splitArr = data.address_components;

    this.getAllFieldssecond(splitArr, index);
  }
  removelegalrepresentativeform1(i: number) {
    this.legalrepresentativeform1().removeAt(i);
  }

  removelegalrepresentativeform(i: number) {
    this.legalrepresentativeform().removeAt(i);
  }
  legalrepresentativeform2(): FormArray {
    return this.secondcompanyaddressFormGroup2.get(
      "legalrepresentativeform2"
    ) as FormArray;
  }
  patchCEOvalues() {
    this.legalrepresentativeform().push(this.newlegalrepresentativeform());
    // if(  this.companytypenew == "Einzelunternehmen" ||
    // this.companytypenew == "Eingetragener Kaufmann (e.K.)"){
    //   this.livingaddressFormGroup.patchValue({

    //     title:this.companyNewFormGroup.controls.usertitle.value,
    //     firstname: this.companyNewFormGroup.controls.firstName.value,
    //     lastname: this.companyNewFormGroup.controls.lastName.value,
    //     email: this.companyNewFormGroup.controls.email.value

    //    })
    // }else{

    //   this.legalrepresentativeform().push(this.newlegalrepresentativeform());

    //   setTimeout(() => {
    //     let taskListArrays = this.secondcompanyaddressFormGroup.get(
    //       "legalrepresentativeform"
    //     ) as FormArray;
    //     taskListArrays.controls[0].patchValue({
    //       title:this.companyNewFormGroup.controls.usertitle.value,
    //       firstname: this.companyNewFormGroup.controls.firstName.value,
    //       lastname: this.companyNewFormGroup.controls.lastName.value,
    //       email: this.companyNewFormGroup.controls.email.value
    //     });
    //   }, 100);
    // }



  }
  newlegalrepresentativeform2(): FormGroup {
    return this._formBuilder.group({
      // address: ["", Validators.required],
      dateofbirth: ["", Validators.required],
      establishmentdate: [""],
      firstname: ["", Validators.required],
      companyName1: [""],
      //ThirdTypeDoc1: [""],
      companyType: [""],
      lastname: ["", Validators.required],
      streetshare: ["", Validators.required],
      streetNumbershare: ["", Validators.required],
      postCodeshare: ["", Validators.required],
      cityshare: ["", Validators.required],
      shares: [this.sharesvalue, Validators.required],
      shares1: [" "],
      //matcher :new MyErrorStateMatcher(),
      title: ["", Validators.required],
      //title: ["", Validators.required],
      additionalReferenceshare: [""],
      countryOfResidenceshare: ["", Validators.required],
    });
  }
  addlegalrepresentativeform2(data: any) {
    if (data == 'tick') {
      console.log("lastfields1" + this.legalrepresentativeform2().length);
      let index = this.legalrepresentativeform2().length - 1;
      console.log(
        "shareschange" +
        this.secondcompanyaddressFormGroup2.controls['legalrepresentativeform2']
          .value[index].shares
      );
      console.log("length" + this.legalrepresentativeform2().length);
      let totalShares = this.calculateShares();
      console.log("totalshares" + totalShares);

      //  let lastfields = this.legalrepresentativeform2().value;
      //  console.log("lastfields2" + lastfields);

      this.sharesvalue = 100 - totalShares;
      console.log("lastfields3" + index);
      let firstname =
        this.secondcompanyaddressFormGroup2.controls['legalrepresentativeform2']
          .value[index].firstname;
      console.log("values" + firstname);
      let lastname =
        this.secondcompanyaddressFormGroup2.controls['legalrepresentativeform2']
          .value[index].lastname;
      console.log("values" + lastname);
      let newperson = firstname + " " + lastname;
      //let lastperson=this.addedpersons.value[index];
      //console.log("lastperson" + lastperson);

      if (this.legalrepresentativeform2().length > this.addedpersons.length) {
        this.addedpersons.push(newperson);
      }

      console.log(this.addedpersons);
      $("#formidCompany" + index).css("display", "none");
      $("#formid" + index).css("display", "none");


      this.calculateShares();
    } else {
      console.log("lastfields1" + this.legalrepresentativeform2().length);
      let index = this.legalrepresentativeform2().length - 1;
      console.log(
        "shareschange" +
        this.secondcompanyaddressFormGroup2.controls['legalrepresentativeform2']
          .value[index].shares
      );
      console.log("length" + this.legalrepresentativeform2().length);
      let totalShares = this.calculateShares();
      console.log("totalshares" + totalShares);

      //  let lastfields = this.legalrepresentativeform2().value;
      //  console.log("lastfields2" + lastfields);
      if (totalShares < 100) {
        this.sharesvalue = 100 - totalShares;
        console.log("lastfields3" + index);
        let firstname =
          this.secondcompanyaddressFormGroup2.controls['legalrepresentativeform2']
            .value[index].firstname;
        console.log("values" + firstname);
        let lastname =
          this.secondcompanyaddressFormGroup2.controls['legalrepresentativeform2']
            .value[index].lastname;
        console.log("values" + lastname);
        let newperson = firstname + " " + lastname;
        //let lastperson=this.addedpersons.value[index];
        //console.log("lastperson" + lastperson);

        if (this.legalrepresentativeform2().length > this.addedpersons.length) {
          this.addedpersons.push(newperson);
        }

        console.log(this.addedpersons);
        $("#formidCompany" + index).css("display", "none");
        $("#formid" + index).css("display", "none");
        //  this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2[index].hide;
        this.legalrepresentativeform2().push(this.newlegalrepresentativeform2());
      }
      this.calculateShares();
    }

  }

  addlegalrepresentativeform21() {
    this.legalrepresentativeform2().push(this.newlegalrepresentativeform2());
  }

  removelegalrepresentativeform2(i: number) {
    this.legalrepresentativeform2().removeAt(i);
    this.calculateShares();
  }
  legalrepresentativeform1(): FormArray {
    return this.secondcompanyaddressFormGroup1.get(
      "legalrepresentativeform1"
    ) as FormArray;
  }
  newlegalrepresentativeform1(): FormGroup {
    return this._formBuilder.group({
      //address: ["", Validators.required],
      dateofbirth: ["", Validators.required],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      streetsecond: ["", Validators.required],
      streetNumbersecond: ["", Validators.required],
      postCodesecond: ["", Validators.required],
      citysecond: ["", Validators.required],
      title: ["", Validators.required],
      additionalReferencesecond: [""],
      countryOfResidencesecond: ["", Validators.required],
    });
  }
  calculateShares() {
    let index = this.legalrepresentativeform2().length - 1;
    console.log("calculateshares" + index);
    let newshares: number = 0;
    for (let i = 0; i <= index; i++) {
      newshares =
        newshares +
        parseInt(
          this.secondcompanyaddressFormGroup2.controls['legalrepresentativeform2']
            .value[i].shares
        );
    }
    console.log("newshares" + newshares);
    console.log("addmoreata" + this.addmoredata);
    if (newshares >= 100) {
      this.addmoredata = false;
      console.log("addmoreata" + this.addmoredata);
    } else {
      this.addmoredata = true;
      console.log("addmoreata" + this.addmoredata);
    }
    if (newshares < 95 || newshares > 100) {
      this.moveForward = false;
      console.log("moveForward" + this.moveForward);
      console.log("moveForward" + newshares);
    } else {
      this.moveForward = true;
      console.log("moveForward" + this.moveForward);
      console.log("moveForward" + newshares);
    }

    return newshares;
  }
  addlegalrepresentativeform1(data: any) {
    let index1 = this.legalrepresentativeform1().length;
    if (index1 == 0) {
      this.legalrepresentativeform1().push(this.newlegalrepresentativeform1());
    } else {
      if (data == 'tick') {
        let index = index1 - 1;
        console.log("lastfields3" + index);
        let firstname =
          this.secondcompanyaddressFormGroup1.controls['legalrepresentativeform1']
            .value[index].firstname;
        console.log("values" + firstname);
        let lastname =
          this.secondcompanyaddressFormGroup1.controls['legalrepresentativeform1']
            .value[index].lastname;
        console.log("values" + lastname);
        let newperson = firstname + " " + lastname;
        //let lastperson=this.addedpersons.value[index];
        //console.log("lastperson" + lastperson);

        if (
          this.legalrepresentativeform1().length > this.addedpersonsSecond.length
        ) {
          this.addedpersonsSecond.push(newperson);
        }

        console.log(this.addedpersonsSecond);
        $("#formidSecondCompany" + index).css("display", "none");
        $("#formidSecond" + index).css("display", "none");
      } else {
        let index = index1 - 1;
        console.log("lastfields3" + index);
        let firstname =
          this.secondcompanyaddressFormGroup1.controls['legalrepresentativeform1']
            .value[index].firstname;
        console.log("values" + firstname);
        let lastname =
          this.secondcompanyaddressFormGroup1.controls['legalrepresentativeform1']
            .value[index].lastname;
        console.log("values" + lastname);
        let newperson = firstname + " " + lastname;
        //let lastperson=this.addedpersons.value[index];
        //console.log("lastperson" + lastperson);

        if (
          this.legalrepresentativeform1().length > this.addedpersonsSecond.length
        ) {
          this.addedpersonsSecond.push(newperson);
        }

        console.log(this.addedpersonsSecond);
        $("#formidSecondCompany" + index).css("display", "none");
        $("#formidSecond" + index).css("display", "none");
        this.legalrepresentativeform1().push(this.newlegalrepresentativeform1());
      }

    }
  }
  showaddressfields1(data: any, index: any) {
    console.log("show address fields1" + index);
    console.log("showmorevalue" + this.showmore);
    setTimeout(() => {
      if (this.showmore[index]) {
        $("#message3" + index).html("Mehr Felder anzeigen");
        $("#arrowsetting3" + index).removeClass("uparrow");
        $("#arrowsetting3" + index).addClass("rightarrow");
        $("#arrowsetting3" + index).removeClass("up");
        $("#arrowsetting3" + index).addClass("down");
        this.showmore[index] = false;
      } else {
        $("#message3" + index).html("Weniger Felder anzeigen");
        $("#arrowsetting3" + index).removeClass("rightarrow");
        $("#arrowsetting3" + index).addClass("uparrow");
        $("#arrowsetting3" + index).removeClass("down");
        $("#arrowsetting3" + index).addClass("up");
        this.showmore[index] = true;
      }
    }, 100);
  }
  showaddressfields(data: any, index: any) {
    console.log("show address fields" + index);
    console.log("showmorevalue" + this.showmore1);
    setTimeout(() => {
      if (this.showmore1[index]) {
        $("#message2" + index).html("Mehr Felder anzeigen");
        $("#arrowsetting2" + index).removeClass("uparrow");
        $("#arrowsetting2" + index).addClass("rightarrow");
        $("#arrowsetting2" + index).removeClass("up");
        $("#arrowsetting2" + index).addClass("down");
        this.showmore1[index] = false;
      } else {
        $("#message2" + index).html("Weniger Felder anzeigen");
        $("#arrowsetting2" + index).removeClass("rightarrow");
        $("#arrowsetting2" + index).addClass("uparrow");
        $("#arrowsetting2" + index).removeClass("down");
        $("#arrowsetting2" + index).addClass("up");
        this.showmore1[index] = true;
      }
    }, 100);
  }
  showaddressfields2(data: any, index: any) {
    console.log("show address fields2");
    // $("#addressfields2").css("display", "block");
    //  $("#arrowsetting").removeClass("up");
    //  $("#arrowsetting").addClass("down");
    if (this.showmore2[index]) {
      $("#message1" + index).html("Mehr Felder anzeigen");
      $("#arrowsetting" + index).removeClass("uparrow");
      $("#arrowsetting" + index).addClass("rightarrow");
      $("#arrowsetting" + index).removeClass("up");
      $("#arrowsetting" + index).addClass("down");
      // $("#arrowsetting").removeClass("up");
      //$("#arrowsetting").addClass("down");

      this.showmore2[index] = false;
    } else {
      $("#message1" + index).html("Weniger Felder anzeigen");
      $("#arrowsetting" + index).removeClass("rightarrow");
      $("#arrowsetting" + index).addClass("uparrow");
      $("#arrowsetting" + index).removeClass("down");
      $("#arrowsetting" + index).addClass("up");
      this.showmore2[index] = true;
    }
  }
  removeaddedperson(i: number) {
    console.log("remove added person" + i);
    this.addedpersons.splice(i, 1);
  }
  removeaddedpersonFirst(i: number) {
    console.log("remove added person" + i);
    this.addedpersonsFirst.splice(i, 1);
  }
  removeaddedpersonSecond(i: number) {
    console.log("remove added person" + i);
    this.addedpersonsSecond.splice(i, 1);
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["./"]);
    document.body.classList.remove("modal-open");
  }
  setKeyval(event: any) {
    console.log("setKeyval" + event)
    this.companyTitle = false;
    this.companytypenew = '';
    this.companyTitleValue = event;

    if (event == "company") {
      this.companyTitle = true;
      this.itemToDisplayUnderKundenType = 'Unternehmen'
      console.log("setKeyval" + this.companyTitle)

    } else {
      console.log("setKeyval" + this.companyTitle)
      this.itemToDisplayUnderKundenType = 'Haushalt'
    }
    this.askquestion.setValue('value')
    setTimeout(() => {
      $('#movetonextstep').trigger("click");
    }, 100);

  }
  checkemailnewcompany() {
    $('#checkemailerrorcompany').html("")
    $('#checkemailerrorcompany').css("background-color", "transparent");
    $('#checkemailerrorcompany').css("padding", "0px");
    let datanew = { email: this.moreinfoFormGroup.controls['email'].value }
    console.log("checkemailnew" + datanew)
    this.userService
      .checkemail(datanew)
      .pipe(first())
      .subscribe((data11: any) => {
        console.log("checkemailnew" + datanew)
        if (data11['status'] == '200') {
          this.customervalidemail = true;
          $('#checkemailerrorcompany').html("")
          $('#checkemailerrorcompany').css("background-color", "transparent");
          $('#checkemailerrorcompany').css("padding", "0px");
        }
        else {
          this.customervalidemail = false;
          $('#checkemailerrorcompany').html(data11['msg'])
          $('#checkemailerrorcompany').css("background-color", "white");
          $('#checkemailerrorcompany').css("padding", "10px");
        }
      });
  }
  //Register New User
  register(EmailSendOrNot: any) {
    $("#loaderouterid").css("display", "block");
    this.disable_button = false;
    this.showDisabled = true;
    let title = '';
    let firstname = '';
    let lastname = '';
    let usertitle = '';
    let type1: any;
    let type2: any;
    let type3: any;
    let statusarraynew: any;
    if (this.companyTitle) {
      title = 'Firma';
      statusarraynew = [this.companyNewFormGroup.controls['status'].value];
      if (this.companytypenew == 'Einzelunternehmen' || this.companytypenew == 'Eingetragener Kaufmann (e.K.)') {
        usertitle = this.livingaddressFormGroup.value.title;
        firstname = this.livingaddressFormGroup.value.firstname;
        lastname = this.livingaddressFormGroup.value.lastname;

        type1 = { 'legalrepresentativeform': [] };
        type2 = this.secondcompanyaddressFormGroup1.value;
        type3 = { 'legalrepresentativeform2': [] };

      } else {
        usertitle = this.secondcompanyaddressFormGroup.controls['legalrepresentativeform'].value[0].title;
        firstname = this.secondcompanyaddressFormGroup.controls['legalrepresentativeform'].value[0].firstname;
        lastname = this.secondcompanyaddressFormGroup.controls['legalrepresentativeform'].value[0].lastname;
        type1 = this.secondcompanyaddressFormGroup.value;
        type2 = this.secondcompanyaddressFormGroup1.value;
        type3 = this.secondcompanyaddressFormGroup2.value;
      }
    } else {
      title = 'notFirma';
      statusarraynew = [this.personalInfoFormGroup.controls['status'].value];
    }

    console.log("registertitle" + title)
    let statusbrandarraynew = ["Cefima"];


    let brokerbrandarraynew = ["Cefima"];
    const token: any = localStorage.getItem("token")
    let brokerarraynew = [
      this.userService.getDecodedAccessToken(token)
        .customerno,
    ];
    let roles = ["customer"];
    let companies = ["cefima"];
    let rolesCompaniesArray = ["cefima_customer"];
    let data: any;
    if (this.companyTitle) {
      data = {
        // Roles & Companies
        roles: roles,
        companies: companies,
        companies_with_roles: rolesCompaniesArray,
        //companies: this.companyFormGroup.value.companies,

        // Personal Information
        title: title,
        companyname: this.companyNewFormGroup.controls['companyName'].value,
        companytype: this.ThirdTypeDoc.value,
        usertitle: usertitle,
        firstname: firstname,
        lastname: lastname,

        founding_date: this.companyNewFormGroup.controls['founding_date'].value,

        registration_num: this.companyNewFormGroup.controls['registration_num'].value,
        register_location: this.companyNewFormGroup.controls['register_location'].value,
        customer_status: this.companyNewFormGroup.controls['status'].value,

        //ceo and shareholder data

        type1: type1,
        type2: type2,
        type3: type3,

        strassaliving: this.livingaddressFormGroup.value.street,
        strnoliving: this.livingaddressFormGroup.value.streetNumber,
        additionalReferenceliving:
          this.livingaddressFormGroup.value.additionalReference,
        plzliving: this.livingaddressFormGroup.value.postCode,
        cityliving: this.livingaddressFormGroup.value.city,
        current_countryliving:
          this.livingaddressFormGroup.value.countryOfResidence,

        dateofbirth: this.livingaddressFormGroup.value.dob,
        birth_place: this.livingaddressFormGroup.value.birthPlace,

        // Address Information
        strassa: this.addressInfoForm['street'].value,
        strno: this.addressInfoForm['streetNumber'].value,
        plz: this.addressInfoForm['postCode'].value,
        city: this.addressInfoForm['city'].value,
        additionalReference: this.addressInfoForm['additionalReference'].value,
        current_country: this.addressInfoForm['countryOfResidence'].value,

        //More Information
        password: this.moreinfoForm['password'].value,
        email: this.moreinfoForm['email'].value,
        contactno: this.moreinfoForm['phone_number'].value,
        customerno: this.moreinfoForm['customerno'].value,
        emailsendornot: EmailSendOrNot,
        statusbrandarray: statusbrandarraynew,
        statusarray: statusarraynew,
        brokerbrandarray: brokerbrandarraynew,
        brokerarray: brokerarraynew,
        status: "1",
        companycode: ["c42140_customer"],
        broker: this.userService.getDecodedAccessToken(
          token
        ).customerno,
      };
    } else {
      data = {
        // Roles & Companies
        roles: roles,
        companies: companies,
        companies_with_roles: rolesCompaniesArray,
        //companies: this.companyFormGroup.value.companies,

        // Personal Information
        title: this.personalInfoForm['usertitle'].value,
        companyname: '',
        companytype: '',
        usertitle: this.personalInfoForm['usertitle'].value,
        firstname: this.personalInfoForm['firstName'].value,
        lastname: this.personalInfoForm['lastName'].value,

        dateofbirth: this.personalInfoForm['dob'].value,
        nationality: this.personalInfoForm['nationality'].value,
        birth_place: this.personalInfoForm['birthPlace'].value,
        customer_status: this.personalInfoFormGroup.controls['status'].value,

        // Address Information
        strassa: this.addressInfoForm['street'].value,
        strno: this.addressInfoForm['streetNumber'].value,
        plz: this.addressInfoForm['postCode'].value,
        city: this.addressInfoForm['city'].value,
        additionalReference: this.addressInfoForm['additionalReference'].value,
        current_country: this.addressInfoForm['countryOfResidence'].value,

        //More Information
        password: this.moreinfoForm['password'].value,
        email: this.moreinfoForm['email'].value,
        contactno: this.moreinfoForm['phone_number'].value,
        customerno: this.moreinfoForm['customerno'].value,
        emailsendornot: EmailSendOrNot,
        statusbrandarray: statusbrandarraynew,
        statusarray: statusarraynew,
        brokerbrandarray: brokerbrandarraynew,
        brokerarray: brokerarraynew,
        status: "1",
        companycode: ["c42140_customer"],
        broker: this.userService.getDecodedAccessToken(
          token
        ).customerno,
      };

    }

    console.log( "user data",data);
    // debugger
    this.userService
      .registerUser(data)
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log("POST Request is successful ", data);
          this.user_id = data["_id"];
          // this.registerDone = true;

          this.CasePost(
            `${this.userService.getDecodedAccessToken(
              token
            ).firstname
            } ${this.userService.getDecodedAccessToken(
              token
            ).lastname
            }`,
            data["_id"]
          );


        },
        (error) => {
          this.registraionError = true;
          $(document).ready(function () {
            $("#alert-dange").hide();

            $("#alert-dange")
              .fadeTo(2000, 500)
              .slideUp(2000, function () {
                $("#alert-dange").slideUp(2000);
              });
          });
          //console.log("Error", error['error']);
        }
      );
  }
  // register(EmailSendOrNot) {
  //   $("#loaderouterid").css("display", "block");
  //   this.disable_button=false;
  //   this.showDisabled = true;
  //   let statusbrandarraynew = ["Cefima"];
  //   let statusarraynew = [this.personalInfoForm.status.value];
  //   let brokerbrandarraynew = ["Cefima"];
  //   let brokerarraynew = [
  //     this.userService.getDecodedAccessToken(localStorage.getItem("token"))
  //       .customerno,
  //   ];
  //   let roles = ["customer"];
  //   let companies = ["cefima"];
  //   let rolesCompaniesArray = ["cefima_customer"];

  //   let data = {
  //     // Roles & Companies
  //     roles: roles,
  //     companies: companies,
  //     companies_with_roles: rolesCompaniesArray,
  //     //companies: this.companyFormGroup.value.companies,

  //     // Personal Information
  //     title: this.personalInfoForm.title.value,
  //     companyname: this.personalInfoForm.companyName.value,
  //     companytype: this.personalInfoForm.companytype.value,
  //     firstname: this.personalInfoForm.firstName.value,
  //     lastname: this.personalInfoForm.lastName.value,
  //     email: this.personalInfoForm.email.value,
  //     dateofbirth: this.personalInfoForm.dob.value,
  //     nationality: this.personalInfoForm.nationality.value,
  //     birth_place: this.personalInfoForm.birthPlace.value,
  //     customer_status: this.personalInfoForm.status.value,
  //     // Address Information
  //     strassa: this.addressInfoForm.street.value,
  //     strno: this.addressInfoForm.streetNumber.value,
  //     plz: this.addressInfoForm.postCode.value,
  //     city: this.addressInfoForm.city.value,
  //     additionalReference: this.addressInfoForm.additionalReference.value,
  //     current_country: this.addressInfoForm.countryOfResidence.value,

  //     //More Information
  //     password: this.moreinfoForm.password.value,
  //     contactno: this.moreinfoForm.phone_number.value,
  //     customerno: this.moreinfoForm.customerno.value,
  //     emailsendornot: EmailSendOrNot,
  //     statusbrandarray: statusbrandarraynew,
  //     statusarray: statusarraynew,
  //     brokerbrandarray: brokerbrandarraynew,
  //     brokerarray: brokerarraynew,
  //     status: "0",
  //     companycode: ["c42140_customer"],
  //     broker: this.userService.getDecodedAccessToken(
  //       localStorage.getItem("token")
  //     ).customerno,
  //   };
  //   // console.log(data, "user data");
  //   this.userService
  //     .registerUser(data)
  //     .pipe(first())
  //     .subscribe(
  //       (data) => {
  //         console.log("POST Request is successful ", data);
  //         this.user_id = data["_id"];
  //         // this.registerDone = true;

  //         this.CasePost(
  //           `${
  //             this.userService.getDecodedAccessToken(
  //               localStorage.getItem("token")
  //             ).firstname
  //           } ${
  //             this.userService.getDecodedAccessToken(
  //               localStorage.getItem("token")
  //             ).lastname
  //           }`,
  //           data["_id"]
  //         );


  //       },
  //       (error) => {
  //         this.registraionError = true;
  //         $(document).ready(function () {
  //           $("#alert-dange").hide();

  //           $("#alert-dange")
  //             .fadeTo(2000, 500)
  //             .slideUp(2000, function () {
  //               $("#alert-dange").slideUp(2000);
  //             });
  //         });
  //         //console.log("Error", error['error']);
  //       }
  //     );
  // }

  CasePost(U_B: any, user_id: any) {
    const token: any = localStorage.getItem("token")
    let newemployee = [];
    newemployee.push(this.userService.getDecodedAccessToken(
      token
    ).id);
    newemployee.push(user_id);

    let projectdatanew = {
      employee_id: newemployee,
      Uploaded_By: U_B,
      Transaction_Type: "Kundenregister",
      uploaddate: new Date().toISOString(),
      updateticket_no: new Date().getTime() + "_ce",
      companyname: "42140 DFG Finanzprofi GmbH",
      Type: "Kundenregister",
    };
    this.userService
      .CaseListUpload(projectdatanew)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          $("#loaderouterid").css("display", "none");
        },
        (error) => {
          console.log("Error", error);
          $("#loaderouterid").css("display", "none");
        },
        () => {

          Swal.fire({
            html: " Benutzer erfolgreich hinzugefügt und Verifizierungs E-Mail versandt. <br> <br>Möchten Sie weitere Kunden hinzufügen?",
            showCancelButton: true,
            confirmButtonText: "Ja",
            cancelButtonText: "Nein &nbsp; <i class='fa fa-arrow-right'></i>",
            iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
            confirmButtonColor: '#02a9ed',
            customClass: {
              icon: 'no-border'
            },
          }).then(result => {
            let that = this;
            console.log("result", result);
            if (result.value) {
              // this.ngOnInit();
              this.reloadCurrentRoute();
            }
            else {
              this.router.navigate(["/customer"]);
            }
          });

          $(document).ready(function () {
            $("#success-alert").hide();

            $("#success-alert")
              .fadeTo(2000, 500)
              .slideUp(2000, function () {
                $("#success-alert").slideUp(2000);
                setTimeout(() => {
                  $("#buttonreset").trigger("click");
                }, 100);
              });
          });
          if (this.OnlyNewUser == "true") {
            setTimeout(() => {
              this.GoToUploadDocument();
            }, 2000);
          }
        }
      );
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate(["/new-user"], {
        queryParams: { OnlyNewUser: false },
      });
    });
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
  GoToUploadDocument() {
    this.router.navigate(["/upload-document/" + this.user_id], {
      queryParams: { user_id: this.user_id },
    });
  }
  handleAddressChange(data: any) {
    console.log("getCountrylocality");
    const splitArr = data.address_components;
    this.getCountry(splitArr);
  }

  handleAddressChangeCompany(data: any) {
    const splitArr = data.address_components;
    this.getCountryCompany(splitArr);
  }
  handleAddressChangeland(data: any) {
    const splitArr = data.address_components;
    this.getCountryland(splitArr);
  }
  handleAddressChangelandShare(data: any, index: any) {
    const splitArr = data.address_components;
    this.getCountrylandShare(splitArr, index);
  }
  handleAddressChangelandfirst(data: any, index: any) {
    const splitArr = data.address_components;
    this.getCountrylandfirst(splitArr, index);
  }
  handleAddressChangelandsecond(data: any, index: any) {
    const splitArr = data.address_components;
    this.getCountrylandsecond(splitArr, index);
  }
  getCountrylandShare(data: any, index: any): any {
    let that = this;
    const splitArr = data;
    // console.log(splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      //// console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
          }

          let localityCountry = that.countryName;
          let taskListArrays = that.secondcompanyaddressFormGroup2.get(
            "legalrepresentativeform2"
          ) as FormArray;
          taskListArrays.controls[index].patchValue({
            countryOfResidenceshare: localityCountry,
          });

          // that.customerFormGroup.patchValue({
          //   countryOfResidenceshare: localityCountry,
          // });
        }
      }
    });
    // this.checkDataAndCreateUpdateData();
  }
  getCountrylandfirst(data: any, index: any): any {
    let that = this;
    const splitArr = data;
    // console.log(splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      //// console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
          }

          let localityCountry = that.countryName;
          let taskListArrays = that.secondcompanyaddressFormGroup.get(
            "legalrepresentativeform"
          ) as FormArray;
          taskListArrays.controls[index].patchValue({
            countryOfResidencefirst: localityCountry,
          });

          // that.customerFormGroup.patchValue({
          //   countryOfResidenceshare: localityCountry,
          // });
        }
      }
    });
    // this.checkDataAndCreateUpdateData();
  }
  getCountrylandsecond(data: any, index: any): any {
    let that = this;
    const splitArr = data;
    // console.log(splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      //// console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
          }

          let localityCountry = that.countryName;
          let taskListArrays = that.secondcompanyaddressFormGroup1.get(
            "legalrepresentativeform1"
          ) as FormArray;
          taskListArrays.controls[index].patchValue({
            countryOfResidencesecond: localityCountry,
          });

          // that.customerFormGroup.patchValue({
          //   countryOfResidenceshare: localityCountry,
          // });
        }
      }
    });
    // this.checkDataAndCreateUpdateData();
  }
  handleAllFieldsliving(data: any) {
    const splitArr = data.address_components;
    this.getAllFieldsliving(splitArr);
  }
  handleAllFieldsfirst(data: any, index: any) {
    console.log("imhere" + index);
    //$("#showfieldslink").html("");
    // $("#showfieldslink").css("display", "block");
    const splitArr = data.address_components;

    this.getAllFieldsfirst(splitArr, index);
  }
  getAllFieldsfirst(data: any, index: any): any {
    console.log("imhre22" + index);
    let that = this;
    const splitArr = data;
    let str = "";
    this.showmore[index] = true;
    // showmore =true;
    //console.log("data", splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      const found = content.find((element: string) => (element = "street_number"));
      if (found === "street_number") {
        //console.log("imhre22" + this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2.value[0].streetNumbershare);
        let taskListArrays = that.secondcompanyaddressFormGroup.get(
          "legalrepresentativeform"
        ) as FormArray;
        taskListArrays.controls[index].patchValue({
          streetNumberfirst: i.short_name,
        });
        console.log("imhre22" + i.short_name);
      } else if (found === "postal_code") {
        let taskListArrays = that.secondcompanyaddressFormGroup.get(
          "legalrepresentativeform"
        ) as FormArray;
        taskListArrays.controls[index].patchValue({
          postCodefirst: i.short_name,
        });
        // that.secondcompanyaddressFormGroup2.patchValue({ postCodeshare: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index1 = 0; index1 < content.length; index1++) {
          if (countryArr[index1] === "country") {
            //console.log("country", i);
            let taskListArrays = that.secondcompanyaddressFormGroup.get(
              "legalrepresentativeform"
            ) as FormArray;
            taskListArrays.controls[index].patchValue({
              countryOfResidencefirst: i.long_name,
            });
            // that.secondcompanyaddressFormGroup2.patchValue({
            //   countryOfResidenceshare: i.long_name,
            // });
          }
          if (countryArr[index1] === "locality") {
            let taskListArrays = that.secondcompanyaddressFormGroup.get(
              "legalrepresentativeform"
            ) as FormArray;
            taskListArrays.controls[index].patchValue({
              cityfirst: i.short_name,
            });
            //  that.secondcompanyaddressFormGroup2.patchValue({ cityshare: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      let taskListArrays = that.secondcompanyaddressFormGroup.get(
        "legalrepresentativeform"
      ) as FormArray;
      taskListArrays.controls[index].patchValue({ streetfirst: str });
      //that.secondcompanyaddressFormGroup2.patchValue({ streetshare: str });
    } else {
      let taskListArrays = that.secondcompanyaddressFormGroup.get(
        "legalrepresentativeform"
      ) as FormArray;
      taskListArrays.controls[index].patchValue({ streetfirst: "" });
      // that.secondcompanyaddressFormGroup2.patchValue({ streetshare: "" });
    }
    $("#message3" + index).html("Weniger Felder anzeigen");
    $("#arrowsetting3" + index).removeClass("rightarrow");
    $("#arrowsetting3" + index).addClass("uparrow");
    $("#arrowsetting3" + index).removeClass("down");
    $("#arrowsetting3" + index).addClass("up");
    this.showmore[index] = true;
  }
  getAllFieldssecond(data: any, index: any): any {
    console.log("imhre22" + index);
    let that = this;
    const splitArr = data;
    let str = "";
    this.showmore1[index] = true;
    // showmore =true;
    //console.log("data", splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      const found = content.find((element: string) => (element = "street_number"));
      if (found === "street_number") {
        //console.log("imhre22" + this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2.value[0].streetNumbershare);
        let taskListArrays = that.secondcompanyaddressFormGroup1.get(
          "legalrepresentativeform1"
        ) as FormArray;
        taskListArrays.controls[index].patchValue({
          streetNumbersecond: i.short_name,
        });
        console.log("imhre22" + i.short_name);
      } else if (found === "postal_code") {
        let taskListArrays = that.secondcompanyaddressFormGroup1.get(
          "legalrepresentativeform1"
        ) as FormArray;
        taskListArrays.controls[index].patchValue({
          postCodesecond: i.short_name,
        });
        // that.secondcompanyaddressFormGroup2.patchValue({ postCodeshare: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index1 = 0; index1 < content.length; index1++) {
          if (countryArr[index1] === "country") {
            //console.log("country", i);
            let taskListArrays = that.secondcompanyaddressFormGroup1.get(
              "legalrepresentativeform1"
            ) as FormArray;
            taskListArrays.controls[index].patchValue({
              countryOfResidencesecond: i.long_name,
            });
            // that.secondcompanyaddressFormGroup2.patchValue({
            //   countryOfResidenceshare: i.long_name,
            // });
          }
          if (countryArr[index1] === "locality") {
            let taskListArrays = that.secondcompanyaddressFormGroup1.get(
              "legalrepresentativeform1"
            ) as FormArray;
            taskListArrays.controls[index].patchValue({
              citysecond: i.short_name,
            });
            //  that.secondcompanyaddressFormGroup2.patchValue({ cityshare: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      let taskListArrays = that.secondcompanyaddressFormGroup1.get(
        "legalrepresentativeform1"
      ) as FormArray;
      taskListArrays.controls[index].patchValue({ streetsecond: str });
      //that.secondcompanyaddressFormGroup2.patchValue({ streetshare: str });
    } else {
      let taskListArrays = that.secondcompanyaddressFormGroup1.get(
        "legalrepresentativeform1"
      ) as FormArray;
      taskListArrays.controls[index].patchValue({ streetsecond: "" });
      // that.secondcompanyaddressFormGroup2.patchValue({ streetshare: "" });
    }
    $("#message2" + index).html("Weniger Felder anzeigen");
    $("#arrowsetting2" + index).removeClass("rightarrow");
    $("#arrowsetting2" + index).addClass("uparrow");
    $("#arrowsetting2" + index).removeClass("down");
    $("#arrowsetting2" + index).addClass("up");
    this.showmore1[index] = true;
  }
  getAllFieldsliving(data: any): any {
    let that = this;
    const splitArr = data;
    let str = "";
    //console.log("data", splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      const found = content.find((element: any) => (element = "street_number"));
      if (found === "street_number") {
        that.livingaddressFormGroup.patchValue({ streetNumber: i.short_name });
      } else if (found === "postal_code") {
        that.livingaddressFormGroup.patchValue({ postCode: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            //console.log("country", i);
            that.livingaddressFormGroup.patchValue({
              countryOfResidence: i.long_name,
            });
          }
          if (countryArr[index] === "locality") {
            that.livingaddressFormGroup.patchValue({ city: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      that.livingaddressFormGroup.patchValue({ street: str });
    } else {
      that.livingaddressFormGroup.patchValue({ street: "" });
    }

  }

  getCountryland(data: any): any {
    let that = this;
    const splitArr = data;
    // console.log(splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      //// console.log(content);
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



  getCountryCompany(data: any): any {
    let that = this;
    const splitArr = data;
    //console.log(splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      ////console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
            //that.countryName = i.short_name;
            ////console.log("country",i.short_name);
            //that.personalInfoFormGroup.patchValue({birthPlace: i.short_name});
          }
          if (countryArr[index] === "locality") {
            that.localityName = i.short_name;
            ////console.log("locality",i.short_name);
          }
          let localityCountry = that.localityName + "," + that.countryName;
          that.companyNewFormGroup.patchValue({
            register_location: localityCountry,
          });
          //that.personalInfoFormGroup.patchValue({nationality: that.countryName});
          /*if(countryArr[index] === 'country'){
            that.personalInfoFormGroup.patchValue({nationality: i.short_name});
          }*/
        }
      }
    });
  }
  getCountry(data: any): any {
    console.log("getCountrylocality" + this.companyTitle);
    let that = this;
    const splitArr = data;
    //console.log(splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      ////console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
            //that.countryName = i.short_name;
            ////console.log("country",i.short_name);
            //that.personalInfoFormGroup.patchValue({birthPlace: i.short_name});
          }
          if (countryArr[index] === "locality") {
            that.localityName = i.short_name;
            ////console.log("locality",i.short_name);
          }
          let localityCountry = that.localityName + "," + that.countryName;
          setTimeout(() => {
            console.log("getCountrylocality" + localityCountry);
            that.livingaddressFormGroup.patchValue({
              birthPlace: localityCountry,
            });
            console.log("getCountrylocality" + that.livingaddressFormGroup.controls['birthPlace'].value);

            console.log("getCountrylocality" + localityCountry);
            that.personalInfoFormGroup.patchValue({
              birthPlace: localityCountry,
            });
            console.log("getCountrylocality" + that.livingaddressFormGroup.controls['birthPlace'].value);
          }, 100);





          //that.personalInfoFormGroup.patchValue({nationality: that.countryName});
          /*if(countryArr[index] === 'country'){
            that.personalInfoFormGroup.patchValue({nationality: i.short_name});
          }*/
        }
      }
    });
  }


  //File Upload
  onFileSelected(event: any) {
    //console.log('in on File Select Function');
    //console.log(event);
  }
  ThirdTypeDocValue() {
    this.companytypenew = this.ThirdTypeDoc.value;
    console.log("ThirdTypeDoc" + this.ThirdTypeDoc.value);
    this.personalInfoFormGroup.patchValue({
      companytype: this.ThirdTypeDoc.value,
    });
    let match = 0;
    for (let j = 0; j < this.CompanyType.length; j++) {
      if (this.ThirdTypeDoc.value == this.CompanyType[j]) {
        match = 1;
      }
    }
    if (match == 0) {
      console.log("companytypevalue" + this.companytypevalue);
      this.companytypevalue = false;
      console.log("companytypevalue" + this.companytypevalue);
    } else {
      console.log("companytypevalue" + this.companytypevalue);
      this.companytypevalue = true;
      console.log("companytypevalue" + this.companytypevalue);
    }
  }
  //Generate Customer Number
  /*genFiorettoGmbHCustomerNo(){
    //console.log('pp');
     this.companyArr = this.companyArr;
    //console.log('in Generate Customer Number Function',this.companyArr);
    const fiorettoGroupGmbH = '-20-';
    const fiorettoMediaGmbH = '-30-';
    const dfgfinanzProfiGmbH = '-40-';
    const biremaGmbH = '-50';

    var nums = [10001];
    var j;
    for (j in nums){
      //console.log(nums);
    }
    var cusNo = nums.toString().concat(fiorettoGroupGmbH);
    //console.log(cusNo);
    return cusNo;
  }*/

  nextCompanies() {
    console.log(
      "in Generate Customer Number Function",
      this.companyArr,
      this.roleCompanies
    );
    let company_array: any[] = [];
    for (let i in this.roleCompanies) {
      company_array = company_array.concat(
        this.roleCompanies[i]);
    }
    // for (const company of Object.values(this.roleCompanies)) {
    //   company_array = company_array.concat(company);
    // }
    let temp_set = new Set(company_array);
    company_array = Array.from(temp_set);
    this.userService
      .getLastUser()
      .pipe(first())
      .subscribe((data: any) => {
        this.autoGeneratedCustomerNumber = data.toString();
        var nums = [this.autoGeneratedCustomerNumber];
        var tmp = company_array; //this.companyArr;
        // if (tmp) {
        //   tmp.forEach(function (i, k) {
        //     var cusNo = i.substring(0, 2);
        //     nums.push(cusNo);
        //   });
        //   var cusNo = nums.join("-");
        //   this.customerNo = cusNo;
        //   this.moreinfoFormGroup.patchValue({ customerno: this.customerNo });
        //   return this.customerNo;
        // }
        this.customerNo = this.autoGeneratedCustomerNumber + "-40-ce";
        this.moreinfoFormGroup.patchValue({ customerno: this.customerNo });
        return this.customerNo;
      });
  }

  getLastUser() {
    this.userService
      .getLastUser()
      .pipe(first())
      .subscribe((data: any) => {
        this.autoGeneratedCustomerNumber = data.toString();
        //return this.autoGeneratedCustomerNumber;
      });
  }

  //Get AutoGenerated Password
  autoPassword() {
    //console.log('in autopassword function');
    this.userService
      .getPassword()
      .pipe(first())
      .subscribe(
        (data) => {
          this.password = data.toString();
          this.moreinfoFormGroup.patchValue({ password: this.password });
          //console.log('password ====', data);
          return data;
        },
        (error) => {
          //console.error(error.message);
          //console.log("Error", error['error']);
        }
      );
  }





  handleAllFields(data: any) {
    //console.log("original data = ", data);
    const splitArr = data.address_components;
    this.getAllFields(splitArr);
  }
  checkemailnew() {
    $("#checkemailerror").html("");
    $("#checkemailerror").css("background-color", "transparent");
    $("#checkemailerror").css("padding", "0px");
    let datanew = { email: this.personalInfoFormGroup.controls['email'].value };
    this.userService
      .checkemail(datanew)
      .pipe(first())
      .subscribe((data11: any) => {
        if (data11["status"] == "200") {
          this.customervalidemail = true;
          $("#checkemailerror").html("");
          $("#checkemailerror").css("background-color", "transparent");
          $("#checkemailerror").css("padding", "0px");
        } else {
          this.customervalidemail = false;
          $("#checkemailerror").html(data11["msg"]);
          $("#checkemailerror").css("background-color", "white");
          $("#checkemailerror").css("padding", "10px");
        }
      });
  }


  getAllFields(data: any): any {
    let that = this;
    const splitArr = data;
    let str = "";
    //console.log("data", splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      const found = content.find((element: string) => (element = "street_number"));
      if (found === "street_number") {
        that.addressFormGroup.patchValue({ streetNumber: i.short_name });
      } else if (found === "postal_code") {
        that.addressFormGroup.patchValue({ postCode: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            //console.log("country", i);
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

  //Checking token Authentication
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
  titleChange($event: any) {
    this.companyTitle = false;
    if (this.personalInfoFormGroup.get("title")?.value == "Firma") {
      this.companyTitle = true;
      this.personalInfoFormGroup.patchValue({ companyName: "" });
      this.personalInfoFormGroup.patchValue({ companytype: "" });
    } else {
      this.personalInfoFormGroup.patchValue({ companyName: " " });
      this.personalInfoFormGroup.patchValue({ companytype: " " });
    }
  }

  // statuschange function
  changestatus($event: any) {
    this.realcustomer = false;
    if (this.companyTitle) {
      if (
        this.companyNewFormGroup.get("status")?.value == "Kunde (Interessent)"
      ) {
        console.log("changestatusfffff" + this.companyNewFormGroup.get("status")?.value);
        this.realcustomer = false;
        console.log("changestatusfffff" + this.realcustomer);

        // this.personalInfoFormGroup.get("email").clearValidators();
        // this.personalInfoFormGroup.get("email").updateValueAndValidity();
        // this.personalInfoFormGroup.get("dob").clearValidators();
        // this.personalInfoFormGroup.get("dob").updateValueAndValidity();
        // this.personalInfoFormGroup.get("nationality").clearValidators();
        // this.personalInfoFormGroup.get("nationality").updateValueAndValidity();
        // this.personalInfoFormGroup.get("birthPlace").clearValidators();
        // this.personalInfoFormGroup.get("birthPlace").updateValueAndValidity();
        // this.addressFormGroup.get("street").clearValidators();
        // this.addressFormGroup.get("street").updateValueAndValidity();
        // this.addressFormGroup.get("streetNumber").clearValidators();
        // this.addressFormGroup.get("streetNumber").updateValueAndValidity();
        // this.addressFormGroup.get("postCode").clearValidators();
        // this.addressFormGroup.get("postCode").updateValueAndValidity();
        // this.addressFormGroup.get("city").clearValidators();
        // this.addressFormGroup.get("city").updateValueAndValidity();
        // this.addressFormGroup.get("countryOfResidence").clearValidators();
        // this.addressFormGroup.get("countryOfResidence").updateValueAndValidity();
        // this.moreinfoFormGroup.get("password").clearValidators();
        // this.moreinfoFormGroup.get("password").updateValueAndValidity();
        // this.moreinfoFormGroup.get("phone_number").clearValidators();
        // this.moreinfoFormGroup.get("phone_number").updateValueAndValidity();
        // this.moreinfoFormGroup.get("customerno").clearValidators();
        // this.moreinfoFormGroup.get("customerno").updateValueAndValidity();
      } else {
        console.log("changestatusfffff" + this.companyNewFormGroup.get("status")?.value);


        //   this.companyNewFormGroup
        //   .get("email")
        //   .setValidators([Validators.required]);
        // this.companyNewFormGroup.get("email").updateValueAndValidity();
        // this.companyNewFormGroup
        //   .get("dob")
        //   .setValidators([Validators.required]);
        // this.companyNewFormGroup.get("dob").updateValueAndValidity();

        // this.companyNewFormGroup
        //   .get("nationality")
        //   .setValidators([Validators.required]);
        // this.companyNewFormGroup.get("nationality").updateValueAndValidity();

        // this.companyNewFormGroup
        //   .get("birthPlace")
        //   .setValidators([Validators.required]);
        // this.companyNewFormGroup.get("birthPlace").updateValueAndValidity();
        //   this.personalInfoFormGroup
        //     .get("email")
        //     .setValidators([Validators.required]);
        //   this.personalInfoFormGroup.get("email").updateValueAndValidity();
        //   this.personalInfoFormGroup
        //     .get("dob")
        //     .setValidators([Validators.required]);
        //   this.personalInfoFormGroup.get("dob").updateValueAndValidity();

        //   this.personalInfoFormGroup
        //     .get("nationality")
        //     .setValidators([Validators.required]);
        //   this.personalInfoFormGroup.get("nationality").updateValueAndValidity();

        //   this.personalInfoFormGroup
        //     .get("birthPlace")
        //     .setValidators([Validators.required]);
        //   this.personalInfoFormGroup.get("birthPlace").updateValueAndValidity();

        //   this.addressFormGroup.get("street").setValidators([Validators.required]);
        //   this.addressFormGroup.get("street").updateValueAndValidity();
        //   this.addressFormGroup
        //     .get("streetNumber")
        //     .setValidators([Validators.required]);
        //   this.addressFormGroup.get("streetNumber").updateValueAndValidity();
        //   this.addressFormGroup
        //     .get("postCode")
        //     .setValidators([Validators.required]);
        //   this.addressFormGroup.get("postCode").updateValueAndValidity();
        //   this.addressFormGroup.get("city").setValidators([Validators.required]);
        //   this.addressFormGroup.get("city").updateValueAndValidity();
        //   this.addressFormGroup
        //     .get("countryOfResidence")
        //     .setValidators([Validators.required]);
        //   this.addressFormGroup.get("countryOfResidence").updateValueAndValidity();
        //   this.moreinfoFormGroup
        //     .get("password")
        //     .setValidators([Validators.required]);
        //   this.moreinfoFormGroup.get("password").updateValueAndValidity();
        //   this.moreinfoFormGroup
        //     .get("phone_number")
        //     .setValidators([Validators.required]);
        //   this.moreinfoFormGroup.get("phone_number").updateValueAndValidity();
        //   this.moreinfoFormGroup
        //     .get("customerno")
        //     .setValidators([Validators.required]);
        //   this.moreinfoFormGroup.get("customerno").updateValueAndValidity();
        this.realcustomer = true;
        console.log("changestatusfffff" + this.realcustomer);
      }
    } else {
      if (
        this.personalInfoFormGroup.get("status")?.value == "Kunde (Interessent)"
      ) {

        console.log("changestatusfffff" + this.personalInfoFormGroup.get("status")?.value);
        this.realcustomer = false;
        console.log("changestatusfffff" + this.realcustomer);
        // this.personalInfoFormGroup.get("email").clearValidators();
        // this.personalInfoFormGroup.get("email").updateValueAndValidity();
        // this.personalInfoFormGroup.get("dob").clearValidators();
        // this.personalInfoFormGroup.get("dob").updateValueAndValidity();
        // this.personalInfoFormGroup.get("nationality").clearValidators();
        // this.personalInfoFormGroup.get("nationality").updateValueAndValidity();
        // this.personalInfoFormGroup.get("birthPlace").clearValidators();
        // this.personalInfoFormGroup.get("birthPlace").updateValueAndValidity();
        // this.addressFormGroup.get("street").clearValidators();
        // this.addressFormGroup.get("street").updateValueAndValidity();
        // this.addressFormGroup.get("streetNumber").clearValidators();
        // this.addressFormGroup.get("streetNumber").updateValueAndValidity();
        // this.addressFormGroup.get("postCode").clearValidators();
        // this.addressFormGroup.get("postCode").updateValueAndValidity();
        // this.addressFormGroup.get("city").clearValidators();
        // this.addressFormGroup.get("city").updateValueAndValidity();
        // this.addressFormGroup.get("countryOfResidence").clearValidators();
        // this.addressFormGroup.get("countryOfResidence").updateValueAndValidity();
        // this.moreinfoFormGroup.get("password").clearValidators();
        // this.moreinfoFormGroup.get("password").updateValueAndValidity();
        // this.moreinfoFormGroup.get("phone_number").clearValidators();
        // this.moreinfoFormGroup.get("phone_number").updateValueAndValidity();
        // this.moreinfoFormGroup.get("customerno").clearValidators();
        // this.moreinfoFormGroup.get("customerno").updateValueAndValidity();
      } else {
        console.log("changestatusfffff" + this.personalInfoFormGroup.get("status")?.value);

        //   this.companyNewFormGroup
        //   .get("email")
        //   .setValidators([Validators.required]);
        // this.companyNewFormGroup.get("email").updateValueAndValidity();
        // this.companyNewFormGroup
        //   .get("dob")
        //   .setValidators([Validators.required]);
        // this.companyNewFormGroup.get("dob").updateValueAndValidity();

        // this.companyNewFormGroup
        //   .get("nationality")
        //   .setValidators([Validators.required]);
        // this.companyNewFormGroup.get("nationality").updateValueAndValidity();

        // this.companyNewFormGroup
        //   .get("birthPlace")
        //   .setValidators([Validators.required]);
        // this.companyNewFormGroup.get("birthPlace").updateValueAndValidity();
        //   this.personalInfoFormGroup
        //     .get("email")
        //     .setValidators([Validators.required]);
        //   this.personalInfoFormGroup.get("email").updateValueAndValidity();
        //   this.personalInfoFormGroup
        //     .get("dob")
        //     .setValidators([Validators.required]);
        //   this.personalInfoFormGroup.get("dob").updateValueAndValidity();

        //   this.personalInfoFormGroup
        //     .get("nationality")
        //     .setValidators([Validators.required]);
        //   this.personalInfoFormGroup.get("nationality").updateValueAndValidity();

        //   this.personalInfoFormGroup
        //     .get("birthPlace")
        //     .setValidators([Validators.required]);
        //   this.personalInfoFormGroup.get("birthPlace").updateValueAndValidity();

        //   this.addressFormGroup.get("street").setValidators([Validators.required]);
        //   this.addressFormGroup.get("street").updateValueAndValidity();
        //   this.addressFormGroup
        //     .get("streetNumber")
        //     .setValidators([Validators.required]);
        //   this.addressFormGroup.get("streetNumber").updateValueAndValidity();
        //   this.addressFormGroup
        //     .get("postCode")
        //     .setValidators([Validators.required]);
        //   this.addressFormGroup.get("postCode").updateValueAndValidity();
        //   this.addressFormGroup.get("city").setValidators([Validators.required]);
        //   this.addressFormGroup.get("city").updateValueAndValidity();
        //   this.addressFormGroup
        //     .get("countryOfResidence")
        //     .setValidators([Validators.required]);
        //   this.addressFormGroup.get("countryOfResidence").updateValueAndValidity();
        //   this.moreinfoFormGroup
        //     .get("password")
        //     .setValidators([Validators.required]);
        //   this.moreinfoFormGroup.get("password").updateValueAndValidity();
        //   this.moreinfoFormGroup
        //     .get("phone_number")
        //     .setValidators([Validators.required]);
        //   this.moreinfoFormGroup.get("phone_number").updateValueAndValidity();
        //   this.moreinfoFormGroup
        //     .get("customerno")
        //     .setValidators([Validators.required]);
        //   this.moreinfoFormGroup.get("customerno").updateValueAndValidity();
        this.realcustomer = true;

        console.log("changestatusfffff" + this.realcustomer);
      }
    }

  }
  // changestatus($event) {
  //   this.realcustomer = false;

  //   if (
  //     this.personalInfoFormGroup.get("status").value == "Kunde (Interessent)"
  //   ) {
  //     console.log("fffff");
  //     this.realcustomer = false;
  //     this.personalInfoFormGroup.get("email").clearValidators();
  //     this.personalInfoFormGroup.get("email").updateValueAndValidity();
  //     this.personalInfoFormGroup.get("dob").clearValidators();
  //     this.personalInfoFormGroup.get("dob").updateValueAndValidity();
  //     this.personalInfoFormGroup.get("nationality").clearValidators();
  //     this.personalInfoFormGroup.get("nationality").updateValueAndValidity();
  //     this.personalInfoFormGroup.get("birthPlace").clearValidators();
  //     this.personalInfoFormGroup.get("birthPlace").updateValueAndValidity();
  //     this.addressFormGroup.get("street").clearValidators();
  //     this.addressFormGroup.get("street").updateValueAndValidity();
  //     this.addressFormGroup.get("streetNumber").clearValidators();
  //     this.addressFormGroup.get("streetNumber").updateValueAndValidity();
  //     this.addressFormGroup.get("postCode").clearValidators();
  //     this.addressFormGroup.get("postCode").updateValueAndValidity();
  //     this.addressFormGroup.get("city").clearValidators();
  //     this.addressFormGroup.get("city").updateValueAndValidity();
  //     this.addressFormGroup.get("countryOfResidence").clearValidators();
  //     this.addressFormGroup.get("countryOfResidence").updateValueAndValidity();
  //     this.moreinfoFormGroup.get("password").clearValidators();
  //     this.moreinfoFormGroup.get("password").updateValueAndValidity();
  //     this.moreinfoFormGroup.get("phone_number").clearValidators();
  //     this.moreinfoFormGroup.get("phone_number").updateValueAndValidity();
  //     this.moreinfoFormGroup.get("customerno").clearValidators();
  //     this.moreinfoFormGroup.get("customerno").updateValueAndValidity();
  //   } else {
  //     this.personalInfoFormGroup
  //       .get("email")
  //       .setValidators([Validators.required]);
  //     this.personalInfoFormGroup.get("email").updateValueAndValidity();
  //     this.personalInfoFormGroup
  //       .get("dob")
  //       .setValidators([Validators.required]);
  //     this.personalInfoFormGroup.get("dob").updateValueAndValidity();

  //     this.personalInfoFormGroup
  //       .get("nationality")
  //       .setValidators([Validators.required]);
  //     this.personalInfoFormGroup.get("nationality").updateValueAndValidity();

  //     this.personalInfoFormGroup
  //       .get("birthPlace")
  //       .setValidators([Validators.required]);
  //     this.personalInfoFormGroup.get("birthPlace").updateValueAndValidity();

  //     this.addressFormGroup.get("street").setValidators([Validators.required]);
  //     this.addressFormGroup.get("street").updateValueAndValidity();
  //     this.addressFormGroup
  //       .get("streetNumber")
  //       .setValidators([Validators.required]);
  //     this.addressFormGroup.get("streetNumber").updateValueAndValidity();
  //     this.addressFormGroup
  //       .get("postCode")
  //       .setValidators([Validators.required]);
  //     this.addressFormGroup.get("postCode").updateValueAndValidity();
  //     this.addressFormGroup.get("city").setValidators([Validators.required]);
  //     this.addressFormGroup.get("city").updateValueAndValidity();
  //     this.addressFormGroup
  //       .get("countryOfResidence")
  //       .setValidators([Validators.required]);
  //     this.addressFormGroup.get("countryOfResidence").updateValueAndValidity();
  //     this.moreinfoFormGroup
  //       .get("password")
  //       .setValidators([Validators.required]);
  //     this.moreinfoFormGroup.get("password").updateValueAndValidity();
  //     this.moreinfoFormGroup
  //       .get("phone_number")
  //       .setValidators([Validators.required]);
  //     this.moreinfoFormGroup.get("phone_number").updateValueAndValidity();
  //     this.moreinfoFormGroup
  //       .get("customerno")
  //       .setValidators([Validators.required]);
  //     this.moreinfoFormGroup.get("customerno").updateValueAndValidity();
  //     this.realcustomer = true;
  //   }
  // }

  navigateWithb2bID() {
    console.log(this.selectedUser);

    this.router.navigate(["/b2b-dashboard"], {
      queryParams: { id: this.selectedUser.id },
    });

    // this.queryID = this.selectedUser.customerno;
    // this.ngOnInit()
  }

}

