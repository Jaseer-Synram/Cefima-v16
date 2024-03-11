import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
  ElementRef,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormGroupDirective,
  NgForm,
  FormControl,
  CheckboxControlValueAccessor,
} from "@angular/forms";
import { HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { first } from "rxjs/operators";
// import { error } from "@angular/compiler/src/util";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
// import { ShowUserCompaniesComponent } from "../show-user-companies/show-user-companies.component";
import Swal from "sweetalert2";
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from "ngx-intl-tel-input";
//import 'intl-tel-input/build/css/intlTelInput.css'
import * as intlTelInput from "intl-tel-input";
import { environment } from "src/environments/environment";
import SignaturePad from "signature_pad";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import { MatDialog } from "@angular/material/dialog";

export interface Broker {
  name: string;
  value: string;
}
type unit = 'bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';
type unitPrecisionMap = {
  [u in unit]: number;
};

const defaultPrecisionMap: unitPrecisionMap = {
  bytes: 0,
  KB: 0,
  MB: 1,
  GB: 1,
  TB: 2,
  PB: 2
};
@Component({
  selector: 'app-updated-profile',
  templateUrl: './updated-profile.component.html',
  styleUrls: ['./updated-profile.component.css']
})
export class UpdatedProfileComponent implements AfterViewInit, OnInit {
  private readonly units: unit[] = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  myControl = new FormControl();
  @Input() SecDomChange: string;
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
  pdffile: any;
  documents: any = '';
  signeddoc: any = [];
  defaultdoc: any = [];
  defaultdoclength: number;
  saveddoc: any = [];
  brokeresign: string;
  addedpersons: any = [];
  addedpersonsFirst: any = [];
  addedpersonsSecond: any = [];
  document_id: string;
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
  filteredOptions: Observable<string[]>;
  filteredOptionsland: Observable<string[]>;
  ThirdTypeDocOptions: Observable<any>;
  ThirdTypeDoc1Options: Observable<any>;
  personalInfoFormGroup: FormGroup;
  docFromGroup: FormGroup;
  agreementFromGroup: FormGroup;
  addressFormGroup: FormGroup;
  livingaddressFormGroup: FormGroup;
  secondcompanyaddressFormGroup: FormGroup;
  secondcompanyaddressFormGroup1: FormGroup;
  secondcompanyaddressFormGroup2: FormGroup;
  UploadDone: Boolean = false;
  UploadError: Boolean = false;
  filearraynew: any[] = [];
  filearray: any[] = [];
  filearraypassport: any[] = [];
  filearraypass: any[] = [];
  fileBase64: string;
  fileBase642: string;
  type3count1: number = 0;

  disableddocumentgmbh: any = true;

  api_url: string;
  ThirdTypeDoc = new FormControl();
  ThirdTypeDoc1 = new FormControl();
  showButton: boolean = false;
  brokersignsaved: boolean = false;
  admin = false;
  employee = false;
  customer = false;
  showmore = [false];
  showmore2 = [false];
  showmore1 = [false];
  b2b = false;
  saveprogressonnext: boolean = false;
  TicketNo: string = "";
  mekFinanz = false;
  fiorettoimmob = false;
  birema = false;
  fiorettomedia = false;
  airmage = false;
  addmoredata = false;
  moveForward = true;
  horaidetektei = false;
  varioimport = false;
  sterbvorsoge = false;
  checkntrack = false;
  companyfield = [];
  companyfield1 = [];
  usersadded = [];
  sharesfield = [];
  edited = false;
  documentid: any = [];
  documentlist: any = [];
  companytitle = false;
  companyTitleShow = false;
  registerDone = false;
  registraionError = false;
  fieldsDisable = true;
  fieldsDisablenew = true;
  companytypevalue = true;
  phone_number: "";
  customerno: any;
  broker: any;
  brokernew: any;
  password = "";
  companyArr = [];
  broker_type = "";
  editCompanyarr: any = [];
  replacedstring: any;
  editNumber = "";
  rolesArr = [];
  data: [];
  userData: any;
  sharesvalue: number = 100;
  index: any;
  calshares: any;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2020, 0, 1);
  options: any;
  //My Data Table
  //id: string = '';
  companytypenew = "";
  user_id: string = "";
  firstName: string = "";
  companyName: string = "";
  lastName: string = "";
  email: string = "";
  dob: string = "";
  passFromGroup: FormGroup;
  documentpassid: any = [];
  documentpasslist: any = [];
  birthPlace: string = "";
  filename: any = [];
  filenamepass: any = [];
  nationality: string = "";
  strassa: string = "";
  streetNo: string = "";
  city: string = "";
  additionalReference: string = "";
  currentCountry: string = "";
  companies: string = "";
  roles: string = "";
  postCode: string = "";
  editField: string = "";
  customerNo: string;
  customerFormGroup: FormGroup;
  roleFormGroup: FormGroup;
  companyFormGroup: FormGroup;
  checkedCompany: [];
  user = false;
  roleCompanies = {
    admin: [],
    customer: [],
    b2b: [],
    employee: [],
  };

  secondcompanyaddressFormGroupdata: any = [];
  uploadfile: number = 0;
  UserStatus: string = "";
  brokerList: Broker[] = [];
  brokerListOptions: Observable<Broker[]>;
  token: any;
  myControlland = new FormControl();
  brokerFormControl = new FormControl();
  id = this.userService.getDecodedAccessToken(localStorage.getItem("token")).id;
  title = this.userService.getDecodedAccessToken(localStorage.getItem("token"))
    .title;
  lastname = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).lastname;
  firstname = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).firstname;
  COMPANYNAME = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).companyname;
  //companyname = this.userService.getDecodedAccessToken(localStorage.getItem('token')).companyname;
  // loginRole = this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles;
  loginRole = localStorage.getItem("currentActiveRole");
  localData = JSON.parse(localStorage.getItem("currentUser"));


  documents_visible = JSON.parse(localStorage.getItem("currentUser"));
  //Roles:[] = localStorage.getItem('currentUser').roles[];

  error: { [index: string]: any } = {};
  customerList: [];
  countryName: any;
  localityName = "";
  routeParams: any;
  email_verify: false;
  phone_verify: false;
  licenseagreementsaved: boolean = false;
  showdisabledweiter1: boolean = false;
  disablesavebutton: boolean = true;
  disablesecondsavebutton: boolean = true;
  disablethirdsavebutton: boolean = true;
  disablefourthsavebutton: boolean = true;
  showfirststepsuccess: boolean = false;
  showsecondstepsuccess: boolean = false;
  showthirdstepsuccess: boolean = false;
  showfourthstepsuccess: boolean = false;
  showfifthstepsuccess: boolean = false;
  showfirststeperror: boolean = false;
  enablenextbutton: boolean;
  docuploaded: boolean = true;
  datasaved: boolean = false;
  licenseagreementurl: string = '';
  drawingnew = 0;
  TodayDate: any;
  separateDialCode = true;
  PhoneNumberFormat = PhoneNumberFormat;
  SearchCountryField = SearchCountryField;
  TooltipLabel: any;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  previewsrc: any = [];
  previewidandsrc: any = [];
  previewid: number = 0;

  preview_set_interval: any = [];

  previewpassportsrc: any = [];
  previewpassportidandsrc: any = [];
  previewpassportid: number = 0;

  passport_set_interval: any = [];


  detect_upload_changes: any = [];
  detect_passport_upload_changes: any = [];

  document_progressbar: number = 0;

  //skipfirstceo:any = [];

  @ViewChild("canvas") canvas: ElementRef;
  signaturePad: SignaturePad

  public signaturePadOptions: Object = {
    // passed through to szimek/signature_pad constructor
    minWidth: 2,
    canvasWidth: 750,
    canvasHeight: 300,
  };

  // phoneForm = new FormGroup({
  // 	phone: new FormControl(undefined, [Validators.required])
  // });

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  // public legalrepresentative: any[] = [{
  //   address: '',
  //   dateofbirth: ''
  // }];

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.getBrokersData();
    this.secondcompanyaddressFormGroup = this._formBuilder.group({
      legalrepresentativeform: this._formBuilder.array([]),
    });

    this.secondcompanyaddressFormGroup1 = this._formBuilder.group({
      legalrepresentativeform1: this._formBuilder.array([]),
    });

    this.secondcompanyaddressFormGroup2 = this._formBuilder.group({
      legalrepresentativeform2: this._formBuilder.array([]),
    });

  }

  showGMBHItemOne = 9999999999999999
  showGMBHItemTwo = 9999999999999999
  showGMBHItemThree = 9999999999999999

  isButtonDisabled(item: string) {

    if (item == 'one') {
      if (this.secondcompanyaddressFormGroup.status == "VALID") {
        return false
      } else {
        return true
      }
    }
    if (item == 'both') {
      if (this.secondcompanyaddressFormGroup.status == "VALID" && this.secondcompanyaddressFormGroup2.status == "VALID") {
        return true
      } else {
        return false
      }
    }
  }

  legalrepresentativeform(): FormArray {
    return this.secondcompanyaddressFormGroup.get(
      "legalrepresentativeform"
    ) as FormArray;

  }


  showUp() {
    const element = document.querySelector('#goUp');
    // if(element){
    element?.scrollIntoView();
    // }
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

  addlegalrepresentativeform(data) {
    if (data == 'tick') {
      let index = this.legalrepresentativeform().length - 1;
      console.log("lastfields3" + index);
      let firstname = this.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[index].firstname;
      console.log("values" + firstname);
      let lastname = this.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[index].lastname;
      console.log("values" + lastname);
      let newperson = firstname + " " + lastname;
      //let lastperson=this.addedpersons.value[index];
      //console.log("lastperson" + lastperson);

      if (this.legalrepresentativeform().length > this.addedpersonsFirst.length) {
        this.addedpersonsFirst.push(newperson);
      }
      console.log(this.addedpersonsFirst);
      $("#formidFirst" + index).css("display", "none");

      this.companyfield.push(false);
      this.companyfield1.push(false);
    } else {
      let index = this.legalrepresentativeform().length - 1;
      console.log("lastfields3" + index);
      let firstname = this.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[index].firstname;
      console.log("values" + firstname);
      let lastname = this.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[index].lastname;
      console.log("values" + lastname);
      let newperson = firstname + " " + lastname;
      //let lastperson=this.addedpersons.value[index];
      //console.log("lastperson" + lastperson);

      if (this.legalrepresentativeform().length > this.addedpersonsFirst.length) {
        this.addedpersonsFirst.push(newperson);
      }



      console.log(this.addedpersonsFirst);
      $("#formidFirst" + index).css("display", "none");
      this.legalrepresentativeform().push(this.newlegalrepresentativeform());
      this.companyfield.push(false);
      this.companyfield1.push(false);
    }

  }

  removelegalrepresentativeform(i: number) {
    this.legalrepresentativeform().removeAt(i);
  }
  titleChange($event, index) {
    console.log("helloindex" + index);
    setTimeout(() => {
      console.log(
        "hello" +
        this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2
          .value[index].title
      );
      if (
        this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2
          .value[index].title == "company"
      ) {
        this.companyfield[index] = false;
        this.companyfield1[index] = true;
      } else {
        this.companyfield[index] = true;
        this.companyfield1[index] = false;
      }
    }, 100);
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

  addlegalrepresentativeform1(data) {
    let index1 = this.legalrepresentativeform1().length;
    if (index1 == 0) {
      this.legalrepresentativeform1().push(this.newlegalrepresentativeform1());
    }
    else {
      if (data == 'tick') {
        let index = index1 - 1;
        console.log("lastfields3" + index);
        let firstname = this.secondcompanyaddressFormGroup1.controls.legalrepresentativeform1.value[index].firstname;
        console.log("values" + firstname);
        let lastname = this.secondcompanyaddressFormGroup1.controls.legalrepresentativeform1.value[index].lastname;
        console.log("values" + lastname);
        let newperson = firstname + " " + lastname;
        //let lastperson=this.addedpersons.value[index];
        //console.log("lastperson" + lastperson);

        if (this.legalrepresentativeform1().length > this.addedpersonsSecond.length) {
          this.addedpersonsSecond.push(newperson);
        }



        console.log(this.addedpersonsSecond);
        $("#formidSecond" + index).css("display", "none");

      } else {
        let index = index1 - 1;
        console.log("lastfields3" + index);
        let firstname = this.secondcompanyaddressFormGroup1.controls.legalrepresentativeform1.value[index].firstname;
        console.log("values" + firstname);
        let lastname = this.secondcompanyaddressFormGroup1.controls.legalrepresentativeform1.value[index].lastname;
        console.log("values" + lastname);
        let newperson = firstname + " " + lastname;
        //let lastperson=this.addedpersons.value[index];
        //console.log("lastperson" + lastperson);

        if (this.legalrepresentativeform1().length > this.addedpersonsSecond.length) {
          this.addedpersonsSecond.push(newperson);
        }



        console.log(this.addedpersonsSecond);
        $("#formidSecond" + index).css("display", "none");
        this.legalrepresentativeform1().push(this.newlegalrepresentativeform1());
      }
    }
  }

  removelegalrepresentativeform1(i: number) {
    this.legalrepresentativeform1().removeAt(i);
  }

  legalrepresentativeform2(): FormArray {
    return this.secondcompanyaddressFormGroup2.get(
      "legalrepresentativeform2"
    ) as FormArray;
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

  // opencheckbox(i: number){
  //   console.log("lastfields" + i);
  // }
  showhiddenfields(i: number) {
    console.log("show hidden fields" + i);
    let prop = $("#formid" + i).css("display");
    if (prop == "none") {
      $("#formid" + i).css("display", "block");
      // $("#arrowsettingheader"+i).removeClass("rightarrow");
      // $("#arrowsettingheader"+i).addClass("uparrow");
      $("#arrowsettingheader" + i).removeClass("down");
      $("#arrowsettingheader" + i).addClass("up");
      $('#showerrorr').css("display", "none");
    } else {

      $('#showerrorr').css("display", "block");

      $("#formid" + i).css("display", "none");
      // $("#arrowsettingheader"+i).removeClass("uparrow");
      // $("#arrowsettingheader"+i).addClass("rightarrow");
      $("#arrowsettingheader" + i).removeClass("up");
      $("#arrowsettingheader" + i).addClass("down");
    }

  }
  showhiddenfieldsSecond(i: number) {
    console.log("show hidden fields" + i);
    let prop = $("#formidSecond" + i).css("display");
    if (prop == "none") {
      $("#formidSecond" + i).css("display", "block");
      // $("#arrowsettingheader"+i).removeClass("rightarrow");
      // $("#arrowsettingheader"+i).addClass("uparrow");
      $("#arrowsettingheaderSecond" + i).removeClass("down");
      $("#arrowsettingheaderSecond" + i).addClass("up");
    } else {
      $("#formidSecond" + i).css("display", "none");
      // $("#arrowsettingheader"+i).removeClass("uparrow");
      // $("#arrowsettingheader"+i).addClass("rightarrow");
      $("#arrowsettingheaderSecond" + i).removeClass("up");
      $("#arrowsettingheaderSecond" + i).addClass("down");
    }

  }
  showhiddenfieldsFirst(i: number) {
    console.log("show hidden fields" + i);
    let prop = $("#formidFirst" + i).css("display");
    if (prop == "none") {
      $("#formidFirst" + i).css("display", "block");
      // $("#arrowsettingheader"+i).removeClass("rightarrow");
      // $("#arrowsettingheader"+i).addClass("uparrow");
      $("#arrowsettingheaderFirst" + i).removeClass("down");
      $("#arrowsettingheaderFirst" + i).addClass("up");
    } else {
      $("#formidFirst" + i).css("display", "none");
      // $("#arrowsettingheader"+i).removeClass("uparrow");
      // $("#arrowsettingheader"+i).addClass("rightarrow");
      $("#arrowsettingheaderFirst" + i).removeClass("up");
      $("#arrowsettingheaderFirst" + i).addClass("down");
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
  updateShares(i: number) {
    console.log("updateShareslenghth" + this.legalrepresentativeform2().length)
    console.log("updateSharesi" + i)
    let updatedshares: number = 0;

    let index = this.legalrepresentativeform2().length - 1;
    if (i < index) {
      for (let i = 0; i < index; i++) {
        updatedshares = updatedshares + parseInt(this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2
          .value[i].shares);
      }
      console.log("updateShares" + updatedshares)
      this.sharesvalue = 100 - updatedshares;
      console.log("updateShares" + this.sharesvalue)
      let taskListArrays = this.secondcompanyaddressFormGroup2.get(
        "legalrepresentativeform2"
      ) as FormArray;
      taskListArrays.controls[index].patchValue({
        shares: this.sharesvalue,
      });
    }

  }
  patchvalues() {
    console.log("neelampiu")
    return new Promise(async resolve => {
      this.clearForms();

      console.log("patchvalues");

      if (this.companytypenew == 'Einzelunternehmen' || this.companytypenew == 'Eingetragener Kaufmann (e.K.)') {
        this.livingaddressFormGroup.patchValue({ title: this.title })

        this.livingaddressFormGroup.patchValue({ firstname: this.localData.firstname })
        this.livingaddressFormGroup.patchValue({ lastname: this.lastname })
        this.livingaddressFormGroup.patchValue({ email: this.localData.email })

      }
      else {
        console.log("neelampiu")
        let taskListArrays = this.secondcompanyaddressFormGroup.get(
          "legalrepresentativeform"
        ) as FormArray;
        taskListArrays.controls[0].patchValue({
          firstname: this.localData.firstname, lastname: this.lastname, title: this.title,

        });

        if (this.localData.hasOwnProperty('type1')) {
          if (this.localData.type1.legalrepresentativeform.length > 0) {
            console.log("patchValueInit" + this.localData.type1.legalrepresentativeform.length)
            console.log("patchValueInit" + JSON.stringify(this.localData.type1))

            for (let i = 0; i < this.localData.type1.legalrepresentativeform.length; i++) {
              if (this.localData.type1.legalrepresentativeform[i].dateofbirth != '' || this.localData.type1.legalrepresentativeform[i].streetfirst != '' ||
                this.localData.type1.legalrepresentativeform[i].streetNumberfirst != '' || this.localData.type1.legalrepresentativeform[i].postCodefirst != ''
                || this.localData.type1.legalrepresentativeform[i].cityfirst != '' || this.localData.type1.legalrepresentativeform[i].additionalReferencefirst != '' ||
                this.localData.type1.legalrepresentativeform[i].countryOfResidencefirst != '') {
                let newperson = this.localData.type1.legalrepresentativeform[i].firstname + " " + this.localData.type1.legalrepresentativeform[i].lastname;
                this.addedpersonsFirst.push(newperson);
                let taskListArrays = this.secondcompanyaddressFormGroup.get(
                  "legalrepresentativeform"
                ) as FormArray;
                taskListArrays.controls[i].patchValue({
                  firstname: this.localData.type1.legalrepresentativeform[i].firstname,
                  lastname: this.localData.type1.legalrepresentativeform[i].lastname,
                  title: this.localData.type1.legalrepresentativeform[i].title,
                  dateofbirth: this.localData.type1.legalrepresentativeform[i].dateofbirth,
                  streetfirst: this.localData.type1.legalrepresentativeform[i].streetfirst,
                  streetNumberfirst: this.localData.type1.legalrepresentativeform[i].streetNumberfirst,
                  postCodefirst: this.localData.type1.legalrepresentativeform[i].postCodefirst,
                  cityfirst: this.localData.type1.legalrepresentativeform[i].cityfirst,
                  additionalReferencefirst: this.localData.type1.legalrepresentativeform[i].additionalReferencefirst,
                  countryOfResidencefirst: this.localData.type1.legalrepresentativeform[i].countryOfResidencefirst,

                });
                console.log("patchValueInitdisplay")

                console.log("patchValueInitpush")
                if (i < this.localData.type1.legalrepresentativeform.length - 1) {
                  this.legalrepresentativeform().push(this.newlegalrepresentativeform());
                }

              }
            }
          }
        }
        if (this.localData.hasOwnProperty('type2')) {
          if (this.localData.type2.legalrepresentativeform1.length > 0) {
            this.legalrepresentativeform1().push(this.newlegalrepresentativeform1());
            console.log("patchValueInit" + this.localData.type2.legalrepresentativeform1.length)
            console.log("patchValueInit" + JSON.stringify(this.localData.type2))

            for (let i = 0; i < this.localData.type2.legalrepresentativeform1.length; i++) {

              let newperson = this.localData.type2.legalrepresentativeform1[i].firstname + " " + this.localData.type2.legalrepresentativeform1[i].lastname;
              this.addedpersonsSecond.push(newperson);
              let taskListArrays = this.secondcompanyaddressFormGroup1.get(
                "legalrepresentativeform1"
              ) as FormArray;
              taskListArrays.controls[i].patchValue({
                firstname: this.localData.type2.legalrepresentativeform1[i].firstname,
                lastname: this.localData.type2.legalrepresentativeform1[i].lastname,
                title: this.localData.type2.legalrepresentativeform1[i].title,
                dateofbirth: this.localData.type2.legalrepresentativeform1[i].dateofbirth,
                streetsecond: this.localData.type2.legalrepresentativeform1[i].streetsecond,
                streetNumbersecond: this.localData.type2.legalrepresentativeform1[i].streetNumbersecond,
                postCodesecond: this.localData.type2.legalrepresentativeform1[i].postCodesecond,
                citysecond: this.localData.type2.legalrepresentativeform1[i].citysecond,
                additionalReferencesecond: this.localData.type2.legalrepresentativeform1[i].additionalReferencesecond,
                countryOfResidencesecond: this.localData.type2.legalrepresentativeform1[i].countryOfResidencesecond,

              });


              if (i < this.localData.type2.legalrepresentativeform1.length - 1) {
                this.legalrepresentativeform1().push(this.newlegalrepresentativeform1());
              }
            }

          }
        }
        if (this.localData.hasOwnProperty('type3')) {
          if (this.localData.type3.legalrepresentativeform2.length > 0) {
            let totalShares: number = 0;
            console.log("patchValueInit" + this.localData.type3.legalrepresentativeform2.length)
            console.log("patchValueInit" + JSON.stringify(this.localData.type3))
            for (let i = 0; i < this.localData.type3.legalrepresentativeform2.length; i++) {
              if (this.localData.type3.legalrepresentativeform2[i].dateofbirth != '' || this.localData.type3.legalrepresentativeform2[i].streetshare != '' ||
                this.localData.type3.legalrepresentativeform2[i].streetNumbershare != '' || this.localData.type3.legalrepresentativeform2[i].postCodeshare != ''
                || this.localData.type3.legalrepresentativeform2[i].cityshare != '' || this.localData.type3.legalrepresentativeform2[i].additionalReferenceshare != '' ||
                this.localData.type3.legalrepresentativeform2[i].countryOfResidenceshare != '' || this.localData.type3.legalrepresentativeform2[i].firstname != '' ||
                this.localData.type3.legalrepresentativeform2[i].lastname != '' || this.localData.type3.legalrepresentativeform2[i].title != '' || this.localData.type3.legalrepresentativeform2[i].shares != 100) {

                totalShares = totalShares + parseInt(this.localData.type3.legalrepresentativeform2[i].shares);
                console.log("patchValueInit" + totalShares)
                let newperson = this.localData.type3.legalrepresentativeform2[i].firstname + " " + this.localData.type3.legalrepresentativeform2[i].lastname;
                this.addedpersons.push(newperson);
                let taskListArrays = this.secondcompanyaddressFormGroup2.get(
                  "legalrepresentativeform2"
                ) as FormArray;
                taskListArrays.controls[i].patchValue({
                  firstname: this.localData.type3.legalrepresentativeform2[i].firstname,
                  lastname: this.localData.type3.legalrepresentativeform2[i].lastname,
                  title: this.localData.type3.legalrepresentativeform2[i].title,
                  dateofbirth: this.localData.type3.legalrepresentativeform2[i].dateofbirth,
                  streetshare: this.localData.type3.legalrepresentativeform2[i].streetshare,
                  shares: this.localData.type3.legalrepresentativeform2[i].shares,
                  streetNumbershare: this.localData.type3.legalrepresentativeform2[i].streetNumbershare,
                  postCodeshare: this.localData.type3.legalrepresentativeform2[i].postCodeshare,
                  cityshare: this.localData.type3.legalrepresentativeform2[i].cityshare,
                  additionalReferenceshare: this.localData.type3.legalrepresentativeform2[i].additionalReferenceshare,
                  countryOfResidenceshare: this.localData.type3.legalrepresentativeform2[i].countryOfResidenceshare,

                });

                console.log("patchValueInit" + totalShares)
                if (totalShares < 100) {
                  console.log("patchValueInit" + totalShares)

                  if (i < this.localData.type3.legalrepresentativeform2.length - 1) {
                    this.legalrepresentativeform2().push(this.newlegalrepresentativeform2());
                  }
                  console.log("addmoredata" + this.addmoredata)
                  this.addmoredata = true;
                  console.log("addmoredata" + this.addmoredata)

                }

              }

            }
          }
        }
        setTimeout(() => {
          if (this.localData.hasOwnProperty('type1')) {
            if (this.localData.type1.legalrepresentativeform.length > 0) {

              for (let i = 0; i < this.localData.type1.legalrepresentativeform.length; i++) {
                if (this.localData.type1.legalrepresentativeform[i].dateofbirth != '' || this.localData.type1.legalrepresentativeform[i].streetfirst != '' ||
                  this.localData.type1.legalrepresentativeform[i].streetNumberfirst != '' || this.localData.type1.legalrepresentativeform[i].postCodefirst != ''
                  || this.localData.type1.legalrepresentativeform[i].cityfirst != '' || this.localData.type1.legalrepresentativeform[i].additionalReferencefirst != '' ||
                  this.localData.type1.legalrepresentativeform[i].countryOfResidencefirst != '') {
                  $("#formidFirst" + i).css("display", "none");
                }
              }

            }
            if (this.localData.type2.legalrepresentativeform1.length > 0) {

              for (let i = 0; i < this.localData.type2.legalrepresentativeform1.length; i++) {

                $("#formidSecond" + i).css("display", "none");

              }

            }
            if (this.localData.type3.legalrepresentativeform2.length > 0) {

              for (let i = 0; i < this.localData.type3.legalrepresentativeform2.length; i++) {
                if (this.localData.type3.legalrepresentativeform2[i].dateofbirth != '' || this.localData.type3.legalrepresentativeform2[i].streetshare != '' ||
                  this.localData.type3.legalrepresentativeform2[i].streetNumbershare != '' || this.localData.type3.legalrepresentativeform2[i].postCodeshare != ''
                  || this.localData.type3.legalrepresentativeform2[i].cityshare != '' || this.localData.type3.legalrepresentativeform2[i].additionalReferenceshare != '' ||
                  this.localData.type3.legalrepresentativeform2[i].countryOfResidenceshare != '' || this.localData.type3.legalrepresentativeform2[i].firstname != '' ||
                  this.localData.type3.legalrepresentativeform2[i].lastname != '' || this.localData.type3.legalrepresentativeform2[i].title != '' || this.localData.type3.legalrepresentativeform2[i].shares != 100) {
                  $("#formid" + i).css("display", "none");

                  $('#showerrorr').css("display", "block");

                }
              }

            }
          }
        }, 100);


        console.log("neelampiu")
      }
      this.disablethirdsavebutton = true;
      console.log("neelampiu")
      this.checkTotalShares();
      console.log("neelampiu")
      console.log("neelampiu")
      resolve(true);
    });
  }
  calculateShares() {
    let index = this.legalrepresentativeform2().length - 1;
    console.log("calculateshares" + index);
    let newshares: number = 0;
    for (let i = 0; i <= index; i++) {
      newshares = newshares + parseInt(this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2
        .value[i].shares);
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
  checkTotalShares() {
    console.log("neelampiu")
    let index = this.legalrepresentativeform2().length - 1;
    console.log("checkTotalShares")
    let shares = this.calculateShares();
    console.log("checkTotalShares " + shares)
    $("#showerrorr").html("");
    if (shares < 95 || shares > 100) {
      console.log("checkTotalShares <95")
      if (shares < 95) {
        $("#showerror" + index).html("Sie müssen mindestens 95% aller wirtschaftlich Berechtigten angeben. Klicken Sie im unteren Verlauf auf ''Mehr hinzufügen'' um weitere wirtschaftlich Berechtigte hinzuzufügen.");
        $("#showerrorr").html("Sie müssen mindestens 95% aller wirtschaftlich Berechtigten angeben. Klicken Sie im unteren Verlauf auf ''Mehr hinzufügen'' um weitere wirtschaftlich Berechtigte hinzuzufügen.");
      }
      else {
        $("#showerror" + index).html("100% Unternehmensanteile ist das Maximum. Bitte geben Sie einen korrekten Wert an. ");
        $("#showerrorr").html("100% Unternehmensanteile ist das Maximum. Bitte geben Sie einen korrekten Wert an. ");

      }

    }
    else {
      console.log("nextstep");
      $("#showerror" + index).html("");
    }
    console.log("neelampiu")
  }

  addlegalrepresentativeform2(data) {
    if (data == 'tick') {
      console.log("lastfields1" + this.legalrepresentativeform2().length);
      let index = this.legalrepresentativeform2().length - 1;
      console.log(
        "shareschange" +
        this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2
          .value[index].shares
      );
      console.log(
        "length" +
        this.legalrepresentativeform2().length
      );
      let totalShares = this.calculateShares();
      console.log("totalshares" + totalShares);

      //  let lastfields = this.legalrepresentativeform2().value;
      //  console.log("lastfields2" + lastfields);

      this.sharesvalue = 100 - totalShares;
      console.log("lastfields3" + index);
      let firstname = this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2.value[index].firstname;
      console.log("values" + firstname);
      let lastname = this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2.value[index].lastname;
      console.log("values" + lastname);
      let newperson = firstname + " " + lastname;
      //let lastperson=this.addedpersons.value[index];
      //console.log("lastperson" + lastperson);

      if (this.legalrepresentativeform2().length > this.addedpersons.length) {
        this.addedpersons.push(newperson);
      }



      console.log(this.addedpersons);
      $("#formid" + index).css("display", "none");
      $('#showerrorr').css("display", "block");

      this.calculateShares();
    } else {


      console.log("lastfields1" + this.legalrepresentativeform2().length);
      let index = this.legalrepresentativeform2().length - 1;
      console.log(
        "shareschange" +
        this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2
          .value[index].shares
      );
      console.log(
        "length" +
        this.legalrepresentativeform2().length
      );
      let totalShares = this.calculateShares();
      console.log("totalshares" + totalShares);

      //  let lastfields = this.legalrepresentativeform2().value;
      //  console.log("lastfields2" + lastfields);
      if (totalShares < 100) {
        this.sharesvalue = 100 - totalShares;
        console.log("lastfields3" + index);
        let firstname = this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2.value[index].firstname;
        console.log("values" + firstname);
        let lastname = this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2.value[index].lastname;
        console.log("values" + lastname);
        let newperson = firstname + " " + lastname;
        //let lastperson=this.addedpersons.value[index];
        //console.log("lastperson" + lastperson);

        if (this.legalrepresentativeform2().length > this.addedpersons.length) {
          this.addedpersons.push(newperson);
        }



        console.log(this.addedpersons);
        $("#formid" + index).css("display", "none");
        $('#showerrorr').css("display", "none");
        //  this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2[index].hide;
        this.legalrepresentativeform2().push(this.newlegalrepresentativeform2());



      }
      this.calculateShares();
    }
  }

  removelegalrepresentativeform2(i: number) {
    this.legalrepresentativeform2().removeAt(i);
    this.calculateShares();

    $('#showerrorr').css('display', 'block');
  }

  telInputObject(obj) {
    console.log(obj);
    obj.setCountry("de");
  }

  ngAfterViewInit() {

    setTimeout(() => {
      if (this.canvas) {
        this.signaturePad = new SignaturePad(this.canvas?.nativeElement);
        this.signaturePad.minWidth = 2;
        this.signaturePad.clear();
      }
    });


    let todaynew = new Date();
    var dd = String(todaynew.getDate()).padStart(2, "0");
    var mm = String(todaynew.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = todaynew.getFullYear();

    var todaynew1 = dd + "." + mm + "." + yyyy;
    this.TodayDate = todaynew1;
    $("#datedynamic").html(todaynew1);


    this.patchValueInit();


  }

  drawComplete1() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
    let base64Data = this.signaturePad.toDataURL();
    let base64Datablob: any = this.dataURLtoBlob(base64Data);
    // let base64Datablob:any=this.urltoFile(base64Data,'hello.jpg','	image/jpeg');
    console.log(base64Datablob);

    this.drawingnew = 1;
    console.log(this.drawingnew);
    // $("#imageidnewshownew").attr("src", base64Datablob);
    $("#imageidnew").attr("src", this.signaturePad.toDataURL());
    $("#imageidnew1").attr("src", this.signaturePad.toDataURL());





  }
  uploadsign() {
    this.uploadbrokeresign();
  }
  drawStart1() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log("begin drawingnew");
  }



  exportAsPDFnew() {
    console.log("this.signaturePad.toDataURL()");
    // $("#loaderouterid").css("display", "block");
    $("#imageid").attr("src", this.signaturePad.toDataURL());
    console.log(this.signaturePad.toDataURL());
    $("#bodydiv").css("display", "block");
    $("#signdiv").css("border", "0");
    $("#parentDiv").css("display", "block");
    this.exportAsPDF();
  }

  exportAsPDF() {

    let that = this;
    $("#loaderouterid").css("display", "block");
    //  var doc= new jsPDF("portrait", "pt", "a4");
    //  let data: any = document.getElementById("MyDIv");
    //  let data1: any = document.getElementById("MyDIv3");

    //  var width = doc.internal.pageSize.width;
    //  doc.html(data, {

    //   margin: [100, 50, 40, 50],
    //   html2canvas: {
    //     width: width,

    //   },

    //   callback: function (doc) {
    //     doc.setProperties({
    //       title: 'Title',
    //       subject: 'This is the subject',
    //       author: 'Author Name',
    //       keywords: 'generated, javascript, web 2.0, ajax',
    //       creator: 'Creator Name'
    //      });
    //      var pageCount =2;

    //      for(var i = 0; i < pageCount; i++) {
    //         doc.setPage(i+1);
    //         doc.addImage("../assets/logo's-04.png", 'png', 485, 15, 57,40);

    //         doc.text('neelam', doc.internal.pageSize.getWidth()/2, 820, { align: "center" })
    //      }
    //     doc.save("Datenstammblatt mit Einwilligungserklärung.pdf");
    //   },
    // });
    let pdf = new jsPDF("portrait", "pt", "a4");

    var width = pdf.internal.pageSize.width;
    pdf.html(document.getElementById("MyDIv"), {
      html2canvas: {

        width: width,
      },
      callback: function (pdf) {
        pdf.save("Datenstammblatt mit Einwilligungserklärung.pdf");
        $("#loaderouterid").css("display", "none");
        $("#bodydiv").css("display", "none");
        $("#parentDiv").css("display", "none");
        $("#signdiv").css("border", "1px solid");


      },
    });
    // setTimeout(() => {
    //   $("#loaderouterid").css("display", "none");
    //     $("#bodydiv").css("display", "none");
    //     $("#parentDiv").css("display", "none");
    //     $("#signdiv").css("border", "1px solid");
    // }, 1000)
  }
  clear() {
    this.drawingnew = 0;
    this.signaturePad.clear();
    $("#imageidnew").attr("src", "");
    $("#imageidnew1").attr("src", "");
  }

  // Vollmacht
  uploadDocumentforVollmacht(values: any) {
    let length = this.filearray.length;
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
    formData.append("olddocument_id", values.olddocument_id);
    formData.append("ticket_no", values.ticket_no);
    formData.append("document_name", values.document_name);
    // formData.append("created_by", values.created_by);

    if (values.image !== "") {
      formData.append("document", values.image);
    }
    this.UploadDone = true;
    this.userService
      .callApiuploaddocumentnewsaveprogress(formData)
      .pipe(first())
      .subscribe(
        (data) => {
          if (values.olddocument_id != '') {
            let oldcheckdocindex = this.documents.findIndex((result) => result.element.id == values.olddocument_id)
            console.log("indexxxxxxxxx" + oldcheckdocindex);
            console.log("indexxxxxxxxx" + JSON.stringify(this.documents));
            this.documents = data;
            console.log("indexxxxxxxxx" + JSON.stringify(this.documents));
          }
          $("#Success").html(`<div class="alert alert-success" role="alert">
          Erfolgreich hochgeladen
        </div>`);
          $("#Success").css("text-align", "center");
          $("#Success").css("font-size", "30px");
          $("#loaderouterid").css("display", "none");
          console.log("POST Request is successful ", data);
          this.document_id = data["_id"];
          this.UploadDone = true;

          let timelines = [
            {
              message: `Ihre Vollmacht erfolgreich erstellt`,
              date: new Date(),
              user_id: this.id,
              created_by: this.id,
              document_id: this.document_id,
            },
          ];

          this.userService
            .usertimeline(timelines)
            .pipe(first())
            .subscribe((usertimeline: any) => { });
        },
        (error) => {
          $("#loaderouterid").css("display", "none");
          this.UploadError = true;
          this.error = error;

          console.log("Error", error);
        },
        () => { }
      );
  }

  // _handleImageUpload for Vollmacht
  _handleImageUploadVollmacht = () => {
    let that = this;
    let oldcheckdoc = this.documents.find((result) => result.element.document_name == "Datenstammblatt mit Einwilligungserklärung")
    let olddocument_id = '';
    if (oldcheckdoc) {
      olddocument_id = oldcheckdoc.element.id;
    }
    console.log("asdsadasdasdffffffffffffffffffffffffff" + JSON.stringify(oldcheckdoc));
    console.log("asdsadasdasdffffffffffffffffffffffffff" + JSON.stringify(olddocument_id));
    console.log("ticket_no" + this.localData.brokerregticketno);

    var values = {
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
      document_name: "",
      olddocument_id: olddocument_id,
    };
    $("#imageid").attr("src", this.signaturePad.toDataURL());
    $("#bodydiv").css("display", "block");
    $("#signdiv").css("border", "0");
    $("#parentDiv").css("display", "block");
    var doc = new jsPDF("portrait", "pt", "a4");
    var width = doc.internal.pageSize.width;
    doc.html(document.getElementById("MyDIv"), {
      html2canvas: {
        // insert html2canvas options here, e.g.
        width: width,
      },
      callback: function (doc) {
        this.pdffile = doc.output("blob");
        let typeofimage = "application/pdf";
        let dateofdocument = new Date().getTime();
        values.image = this.pdffile;
        values.document_type = "Allgemeines Dokument";
        values.document_sub_type = "Datenstammblatt mit Einwilligungserklärung";
        values.document_name = "Datenstammblatt mit Einwilligungserklärung";
        values.olddocument_id = olddocument_id;
        values.user_id = that.id;
        values.product_partner = " ";

        values.companycode = "42140 DFG Finanzprofi GmbH";
        values.brand = "cefima";
        values.upload_by = "cefima_document";
        values.ticket_no = that.localData.brokerregticketno;
        values.tags.push(Math.round(this.pdffile.size / 1024));
        values.tags.push(typeofimage);
        values.tags.push(dateofdocument);



        that.uploadDocumentforVollmacht(values);
        values.tags = [];

        console.log(values);
        $("#bodydiv").css("display", "none");
        $("#parentDiv").css("display", "none");
        $("#signdiv").css("border", "1px solid");
      },
    });

  };
  urltoFile(url, filename, mimeType) {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }
  uploadbrokeresign() {
    let base64Data = this.signaturePad.toDataURL();
    let base64Datablob: any = this.dataURLtoBlob(base64Data);



    // //Usage example:
    // urltoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt','text/plain')
    // .then(function(file){ console.log(file);});

    const formData = new FormData();
    formData.append("document", base64Datablob);
    this.userService.uploaddocumentwithoutticketno(
      formData
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {

        case HttpEventType.Sent:
          console.log('Request has been made!');

          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          break;
        case HttpEventType.Response:
          setTimeout(() => {
            let documentid = event.body.document_unique_id;

            this.userService.updateUserbrokeresign({ brokeresign: documentid, _id: this.localData._id }).subscribe(() => {

            })

          }, 1500);

      }
    })

  }
  dataURLtoBlob(dataurl: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  clickcheck(event) {
    if (event.target.checked) {
      $("#secondbutton").removeAttr("disabled");
      console.log("ddddddddddd");
    } else {
      $("#secondbutton").attr("disabled", "true");
    }
  }

  private _filterland(value: string): string[] {
    console.log("_filterland" + value);
    const filterValue = value.toLowerCase();
    return this.optionsValueland.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filtercompanytype(value: string): string[] {
    console.log("_filterland" + value);
    const filterValue = value.toLowerCase();
    return this.CompanyType.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _brokerfilter(name: string): Broker[] {
    console.log("_brokerfilter" + name);
    console.log("_broker" + JSON.stringify(this.brokerList));
    const filterValue = name.toLowerCase();
    return this.brokerList.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit() {
    // if(this.personalInfoFormGroup.value.responsible_ihk!=''){
    //   this.replacedstring = this.personalInfoFormGroup.value.responsible_ihk.replaceAll(',', ', ');
    //   console.log("replacedstring"+this.replacedstring);
    // }

    if (this.canvas) {
      this.signaturePad = new SignaturePad(this.canvas?.nativeElement);
    }

    console.log("updateprofile");
    this.api_url = environment.API_URL;
    console.log("localdata" + JSON.stringify(this.localData));
    console.log("localdata" + this.id);


    console.log("documents visible");
    console.log(this.documents_visible);


    if (this.localData.hasOwnProperty('companytype')) {
      if (this.localData.companytype == 'Einzelunternehmen' || this.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {
        if (this.localData.companytype == 'Einzelunternehmen') {
          this.type3count1 = 2;
          console.log("type31" + this.type3count1)
        }
        else {
          //this.type3count1 =  3;
          this.type3count1 = 2;
          console.log("type31" + this.type3count1)
        }


      }
      else {
        this.type3count1 = parseInt(this.localData.type3.legalrepresentativeform2.length) + 3

        //this.type3count1 = parseInt(this.localData.type3.legalrepresentativeform2.length) + 2 + this.addedpersonsFirst.length;
        console.log("type31" + this.type3count1)
      }
    }




    // setTimeout(() => {


    this.userService
      .getDocumentsByIds(
        this.id,
        "Allgemeines Dokument",
        "cefima_document"
      )
      .pipe(first())
      .subscribe(
        (result) => {
          console.log("localdataresult" + result);
          this.documents = result;
          console.log("localdataresult" + this.documents);





          if (this.localData.hasOwnProperty('companytype')) {
            if (this.localData.companytype == 'Einzelunternehmen' || this.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {


            }
            else {

              let ceo_length = this.localData.type1.legalrepresentativeform.length;
              let shareholder_length = this.localData.type3.legalrepresentativeform2.length;

              let doc_check = false;

              if (this.documents.length > 0) {

                console.log("docs found for this user");
                console.log(this.documents);
                console.log("ceo below");
                console.log(this.localData.type1.legalrepresentativeform);
                console.log("shareholder below");
                console.log(this.localData.type3.legalrepresentativeform2);

                let ceo_done = 0;
                let shareholder_done = 0;
                let geschaft_done = 0;
                let akt_done = 0;
                for (let doc_length = 0; doc_length < this.documents.length; doc_length++) {

                  let temp_ceo_length = parseInt(ceo_length) - 1;
                  if (ceo_length > 1 && this.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                    ceo_done = 1;

                  } else if (ceo_length == 1 && this.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person") {

                    ceo_done = 1;

                  }

                  for (let share_doc_length = 0; share_doc_length < this.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                    if (this.documents[doc_length].element.document_name ==
                      "Upload Ausweisdokument " + this.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                      " " + this.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                      shareholder_done += 1;
                    }

                  }


                  if (this.documents[doc_length].element.document_name == "Geschäftsanmeldung") {
                    geschaft_done = 1;
                  }


                  if (this.documents[doc_length].element.document_name == "Aktueller Auszug aus dem Handelsregister") {
                    akt_done = 1;
                  }


                }

                if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done) {
                  this.disableddocumentgmbh = false;
                  doc_check = false;
                } else {
                  this.disableddocumentgmbh = true;
                  doc_check = true;
                }


              }


            }
          }





        },
        (error) => {
          console.log(error);
        }
      );

    //  }, 500);

    // if(this.localData.companyname!='')
    // {
    //   this.addressFormGroup.patchValue({companyName: this.localData.companyname})


    // }
    $("button").click(function () {
      $(".check-icon").hide();
      setTimeout(function () {
        $(".check-icon").show();
      }, 10000);
    });
    this.passFromGroup = this._formBuilder.group({
      passportform: this._formBuilder.array([]),
    });
    this.legalrepresentativeform().push(this.newlegalrepresentativeform());
    this.legalrepresentativeform2().push(this.newlegalrepresentativeform2());
    this.companyfield.push(false);
    this.companyfield1.push(false);
    this.sharesfield.push(false);
    console.log("secvalue" + this.SecDomChange);
    if (this.SecDomChange == "show") {
      this.broker_type = "Gesellschaft";
      console.log("159" + "hellogeGesellschaft");
    }
    else {
      console.log("159" + "helloEinzelunternehmer");
      this.broker_type = "Einzelunternehmer";
    }


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );

    this.ThirdTypeDocOptions = this.ThirdTypeDoc.valueChanges.pipe(
      startWith(""),
      map((value) => this._filtercompanytype(value))
    );

    this.ThirdTypeDoc1Options = this.ThirdTypeDoc1.valueChanges.pipe(
      startWith(""),
      map((value) => this._filtercompanytype(value))
    );
    this.filteredOptionsland = this.myControlland.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterland(value))
    );
    this.brokerListOptions = this.brokerFormControl.valueChanges.pipe(
      startWith(""),
      map((value) => (typeof value === "string" ? value : value.name)),
      map((name) => (name ? this._brokerfilter(name) : this.brokerList.slice()))
    );
    this.routeParams = this.route.snapshot.routeConfig.path;

    if (this.loginRole != "superadmin") {
      this.fieldsDisable = false;
    }
    this.fieldsDisablenew = false;
    // this.fieldsDisable = 'disabled';

    this.roleFormGroup = this._formBuilder.group({
      roles: this._formBuilder.array([], Validators.required),
    });

    this.companyFormGroup = this._formBuilder.group({
      companies: this._formBuilder.array([], Validators.required),
    });

    // this.secondcompanyaddressFormGroup = this._formBuilder.group({
    //   legalrepresentative: this._formBuilder.array([]),
    //   // legalrepresentative: ["", Validators.required],
    // });

    this.addressFormGroup = this._formBuilder.group({
      companyName: ["", Validators.required],
      street: ["", Validators.required],
      streetNumber: ["", Validators.required],
      postCode: ["", Validators.required],
      city: ["", Validators.required],
      additionalReference: [""],
      countryOfResidence: ["", Validators.required],
    });

    this.livingaddressFormGroup = this._formBuilder.group({
      streetliving: ["", Validators.required],
      streetNumberliving: ["", Validators.required],
      postCodeliving: ["", Validators.required],
      cityliving: ["", Validators.required],
      additionalReferenceliving: [""],
      countryOfResidenceliving: ["", Validators.required],
      dob: ["", Validators.required],
      title: ["", Validators.required],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.required],
      birthPlace: ["", Validators.required],
    });

    console.log("aaaaaaaaaaaaaaaa" + this.SecDomChange);

    console.log("aaaaaaaaaaaaaaaahide");
    this.docFromGroup = this._formBuilder.group({
      // DocOne: ["", Validators.required],
      // DocTwo: ["", Validators.required],

      DocOne: [""],
      DocTwo: [""],
      DocThree: [""],
      // acceptcontrol:["",Validators.required]
    });

    this.personalInfoFormGroup = this._formBuilder.group({
      Vermittlerstatus: ["", Validators.required],
      registration_number: ["", Validators.required],
      responsible_ihk: ["", Validators.required],
      companytype: ["", Validators.required],
      // title: ["", Validators.required],
      // companyName: [" ", Validators.required],
      // firstName: ["", Validators.required],
      // lastName: ["", Validators.required],
      // email: [
      //   "",
      //   [
      //     Validators.required,
      //     Validators.email,
      //     Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      //   ],
      // ],
      // dob: ["", Validators.required],
      // nationality: ["", Validators.required],
      // birthPlace: ["", Validators.required],
    });

    // if(this.SecDomChange=="hide"){
    //   this.personalInfoFormGroup.patchValue({companytype:" "})
    // }

    this.customerFormGroup = this._formBuilder.group({
      title: ["", Validators.required],
      companyName: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
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
      brokernew: [""],
    });









    this.previewid = 0;



  }
  passportform(): FormArray {
    return this.passFromGroup.get(
      "passportform"
    ) as FormArray;

  }
  openpdfpopup(url) {
    console.log("openpdfpopup" + url)

    $("#openpdfmodel").trigger("click");


    $("#showsavedpdf").attr("src", url);





  }
  patchValueInit() {
    console.log("patchValueInit" + JSON.stringify(this.localData))
    if (this.localData.hasOwnProperty('companyname')) {
      console.log("patchValueInit" + this.localData.companyname)
      if (this.localData.companyname != '' && this.localData.companyname != " " && this.localData.companyname != null) {
        this.addressFormGroup.patchValue({ companyName: this.localData.companyname })
      }
    }
    if (this.localData.hasOwnProperty('companytype')) {
      console.log("patchValueInit" + this.localData.companytype)
      if (this.localData.companytype != '') {
        console.log("patchValueInit" + this.localData.companytype)
        this.ThirdTypeDoc.setValue(this.localData.companytype)
        this.companytypenew = this.localData.companytype;
      }
    }
    if (this.localData.hasOwnProperty('strassa')) {
      console.log("patchValueInit" + this.localData.strassa)
      if (this.localData.strassa != '' && this.localData.strassa != '-' && this.localData.strassa != " ") {
        this.addressFormGroup.patchValue({ street: this.localData.strassa })
      }
    }
    if (this.localData.hasOwnProperty('strno')) {
      console.log("patchValueInit" + this.localData.strno)
      if (this.localData.strno != '' && this.localData.strno != '-' && this.localData.strno != " ") {
        this.addressFormGroup.patchValue({ streetNumber: this.localData.strno })
      }
    }
    if (this.localData.hasOwnProperty('city')) {
      console.log("patchValueInit" + this.localData.city)
      if (this.localData.city != '' && this.localData.city != '-' && this.localData.city != " ") {
        this.addressFormGroup.patchValue({ city: this.localData.city })
      }
    }
    if (this.localData.hasOwnProperty('plz')) {
      console.log("patchValueInit" + this.localData.plz)
      if (this.localData.plz != '' && this.localData.plz != '-' && this.localData.plz != " ") {
        this.addressFormGroup.patchValue({ postCode: this.localData.plz })
      }
    }
    if (this.localData.hasOwnProperty('additionalReference')) {
      console.log("patchValueInit" + this.localData.additionalReference)
      if (this.localData.additionalReference != '' && this.localData.additionalReference != '-' && this.localData.additionalReference != " ") {
        this.addressFormGroup.patchValue({ additionalReference: this.localData.additionalReference })
      }
    }
    if (this.localData.hasOwnProperty('current_country')) {
      console.log("patchValueInit" + this.localData.current_country)
      if (this.localData.current_country != '' && this.localData.current_country != '-' && this.localData.current_country != " ") {
        this.addressFormGroup.patchValue({ countryOfResidence: this.localData.current_country })
      }
    }
    if (this.localData.hasOwnProperty('strassaliving')) {
      console.log("patchValueInit" + this.localData.strassaliving)
      if (this.localData.strassaliving != '' && this.localData.strassaliving != " ") {
        this.livingaddressFormGroup.patchValue({ streetliving: this.localData.strassaliving })
      }
    }
    if (this.localData.hasOwnProperty('strnoliving')) {
      console.log("patchValueInit" + this.localData.strnoliving)
      if (this.localData.strnoliving != '' && this.localData.strnoliving != " ") {
        this.livingaddressFormGroup.patchValue({ streetNumberliving: this.localData.strnoliving })
      }
    }
    if (this.localData.hasOwnProperty('cityliving')) {
      console.log("patchValueInit" + this.localData.cityliving)
      if (this.localData.cityliving != '' && this.localData.cityliving != " ") {
        this.livingaddressFormGroup.patchValue({ cityliving: this.localData.cityliving })
      }
    }
    if (this.localData.hasOwnProperty('plzliving')) {
      console.log("patchValueInit" + this.localData.plzliving)
      if (this.localData.plzliving != '' && this.localData.plzliving != " ") {
        this.livingaddressFormGroup.patchValue({ postCodeliving: this.localData.plzliving })
      }
    }
    if (this.localData.hasOwnProperty('additionalReferenceliving')) {
      console.log("patchValueInit" + this.localData.additionalReferenceliving)
      if (this.localData.additionalReferenceliving != '' && this.localData.additionalReferenceliving != " ") {
        this.livingaddressFormGroup.patchValue({ additionalReferenceliving: this.localData.additionalReferenceliving })
      }
    }
    if (this.localData.hasOwnProperty('current_countryliving')) {
      console.log("patchValueInit" + this.localData.current_countryliving)
      if (this.localData.current_countryliving != '' && this.localData.current_countryliving != " ") {
        this.livingaddressFormGroup.patchValue({ countryOfResidenceliving: this.localData.current_countryliving })
      }
    }
    if (this.localData.hasOwnProperty('Vermittlerstatus')) {
      console.log("patchValueInit" + this.localData.Vermittlerstatus)
      if (this.localData.Vermittlerstatus != '' && this.localData.Vermittlerstatus != " ") {
        this.personalInfoFormGroup.patchValue({ Vermittlerstatus: this.localData.Vermittlerstatus })
      }
    }
    if (this.localData.hasOwnProperty('registration_number')) {
      console.log("patchValueInit" + this.localData.registration_number)
      if (this.localData.registration_number != '' && this.localData.registration_number != " ") {
        this.personalInfoFormGroup.patchValue({ registration_number: this.localData.registration_number })
      }
    }
    if (this.localData.hasOwnProperty('responsible_ihk')) {
      console.log("patchValueInit" + this.localData.responsible_ihk)
      if (this.localData.responsible_ihk != '' && this.localData.responsible_ihk != " ") {
        this.personalInfoFormGroup.patchValue({ responsible_ihk: this.localData.responsible_ihk })
      }
    }
    if (this.localData.hasOwnProperty('dateofbirth')) {
      console.log("patchValueInit" + this.localData.dateofbirth)
      if (this.localData.dateofbirth != '' && this.localData.dateofbirth != " ") {
        this.livingaddressFormGroup.patchValue({ dob: this.localData.dateofbirth })
      }
    }
    if (this.localData.hasOwnProperty('birth_place')) {
      console.log("patchValueInit" + this.localData.birth_place)
      if (this.localData.birth_place != '' && this.localData.birth_place != " ") {
        this.livingaddressFormGroup.patchValue({ birthPlace: this.localData.birth_place })
      }
    }
    if (this.localData.hasOwnProperty('type1')) {
      if (this.localData.type1.legalrepresentativeform.length > 0) {
        console.log("patchValueInit" + this.localData.type1.legalrepresentativeform.length)
        console.log("patchValueInitype1" + JSON.stringify(this.localData.type1))

        for (let i = 0; i < this.localData.type1.legalrepresentativeform.length; i++) {
          if (this.localData.type1.legalrepresentativeform[i].dateofbirth != '' || this.localData.type1.legalrepresentativeform[i].streetfirst != '' ||
            this.localData.type1.legalrepresentativeform[i].streetNumberfirst != '' || this.localData.type1.legalrepresentativeform[i].postCodefirst != ''
            || this.localData.type1.legalrepresentativeform[i].cityfirst != '' || this.localData.type1.legalrepresentativeform[i].additionalReferencefirst != '' ||
            this.localData.type1.legalrepresentativeform[i].countryOfResidencefirst != '') {
            let newperson = this.localData.type1.legalrepresentativeform[i].firstname + " " + this.localData.type1.legalrepresentativeform[i].lastname;
            this.addedpersonsFirst.push(newperson);
            let taskListArrays = this.secondcompanyaddressFormGroup.get(
              "legalrepresentativeform"
            ) as FormArray;
            taskListArrays.controls[i].patchValue({
              firstname: this.localData.type1.legalrepresentativeform[i].firstname,
              lastname: this.localData.type1.legalrepresentativeform[i].lastname,
              title: this.localData.type1.legalrepresentativeform[i].title,
              dateofbirth: this.localData.type1.legalrepresentativeform[i].dateofbirth,
              streetfirst: this.localData.type1.legalrepresentativeform[i].streetfirst,
              streetNumberfirst: this.localData.type1.legalrepresentativeform[i].streetNumberfirst,
              postCodefirst: this.localData.type1.legalrepresentativeform[i].postCodefirst,
              cityfirst: this.localData.type1.legalrepresentativeform[i].cityfirst,
              additionalReferencefirst: this.localData.type1.legalrepresentativeform[i].additionalReferencefirst,
              countryOfResidencefirst: this.localData.type1.legalrepresentativeform[i].countryOfResidencefirst,

            });
            console.log("patchValueInitdisplay")

            console.log("patchValueInitpush")
            if (i < this.localData.type1.legalrepresentativeform.length - 1) {
              this.legalrepresentativeform().push(this.newlegalrepresentativeform());
            }

          }
        }
      }
    }
    if (this.localData.hasOwnProperty('type2')) {
      if (this.localData.type2.legalrepresentativeform1.length > 0) {
        this.legalrepresentativeform1().push(this.newlegalrepresentativeform1());
        console.log("patchValueInit" + this.localData.type2.legalrepresentativeform1.length)
        console.log("patchValueInit" + JSON.stringify(this.localData.type2))

        for (let i = 0; i < this.localData.type2.legalrepresentativeform1.length; i++) {

          let newperson = this.localData.type2.legalrepresentativeform1[i].firstname + " " + this.localData.type2.legalrepresentativeform1[i].lastname;
          this.addedpersonsSecond.push(newperson);
          let taskListArrays = this.secondcompanyaddressFormGroup1.get(
            "legalrepresentativeform1"
          ) as FormArray;
          taskListArrays.controls[i].patchValue({
            firstname: this.localData.type2.legalrepresentativeform1[i].firstname,
            lastname: this.localData.type2.legalrepresentativeform1[i].lastname,
            title: this.localData.type2.legalrepresentativeform1[i].title,
            dateofbirth: this.localData.type2.legalrepresentativeform1[i].dateofbirth,
            streetsecond: this.localData.type2.legalrepresentativeform1[i].streetsecond,
            streetNumbersecond: this.localData.type2.legalrepresentativeform1[i].streetNumbersecond,
            postCodesecond: this.localData.type2.legalrepresentativeform1[i].postCodesecond,
            citysecond: this.localData.type2.legalrepresentativeform1[i].citysecond,
            additionalReferencesecond: this.localData.type2.legalrepresentativeform1[i].additionalReferencesecond,
            countryOfResidencesecond: this.localData.type2.legalrepresentativeform1[i].countryOfResidencesecond,

          });


          if (i < this.localData.type2.legalrepresentativeform1.length - 1) {
            this.legalrepresentativeform1().push(this.newlegalrepresentativeform1());
          }
        }

      }
    }
    if (this.localData.hasOwnProperty('type3')) {
      if (this.localData.type3.legalrepresentativeform2.length > 0) {
        let totalShares: number = 0;
        console.log("patchValueInit" + this.localData.type3.legalrepresentativeform2.length)
        console.log("patchValueInit" + JSON.stringify(this.localData.type3))
        for (let i = 0; i < this.localData.type3.legalrepresentativeform2.length; i++) {
          if (this.localData.type3.legalrepresentativeform2[i].dateofbirth != '' || this.localData.type3.legalrepresentativeform2[i].streetshare != '' ||
            this.localData.type3.legalrepresentativeform2[i].streetNumbershare != '' || this.localData.type3.legalrepresentativeform2[i].postCodeshare != ''
            || this.localData.type3.legalrepresentativeform2[i].cityshare != '' || this.localData.type3.legalrepresentativeform2[i].additionalReferenceshare != '' ||
            this.localData.type3.legalrepresentativeform2[i].countryOfResidenceshare != '' || this.localData.type3.legalrepresentativeform2[i].firstname != '' ||
            this.localData.type3.legalrepresentativeform2[i].lastname != '' || this.localData.type3.legalrepresentativeform2[i].title != '' || this.localData.type3.legalrepresentativeform2[i].shares != 100) {
            totalShares = totalShares + parseInt(this.localData.type3.legalrepresentativeform2[i].shares);
            console.log("patchValueInit" + totalShares)
            let newperson = this.localData.type3.legalrepresentativeform2[i].firstname + " " + this.localData.type3.legalrepresentativeform2[i].lastname;
            this.addedpersons.push(newperson);
            let taskListArrays = this.secondcompanyaddressFormGroup2.get(
              "legalrepresentativeform2"
            ) as FormArray;
            taskListArrays.controls[i].patchValue({
              firstname: this.localData.type3.legalrepresentativeform2[i].firstname,
              lastname: this.localData.type3.legalrepresentativeform2[i].lastname,
              title: this.localData.type3.legalrepresentativeform2[i].title,
              dateofbirth: this.localData.type3.legalrepresentativeform2[i].dateofbirth,
              streetshare: this.localData.type3.legalrepresentativeform2[i].streetshare,
              shares: this.localData.type3.legalrepresentativeform2[i].shares,
              streetNumbershare: this.localData.type3.legalrepresentativeform2[i].streetNumbershare,
              postCodeshare: this.localData.type3.legalrepresentativeform2[i].postCodeshare,
              cityshare: this.localData.type3.legalrepresentativeform2[i].cityshare,
              additionalReferenceshare: this.localData.type3.legalrepresentativeform2[i].additionalReferenceshare,
              countryOfResidenceshare: this.localData.type3.legalrepresentativeform2[i].countryOfResidenceshare,

            });

            console.log("patchValueInit" + totalShares)
            if (totalShares < 100) {
              console.log("patchValueInit" + totalShares)

              if (i < this.localData.type3.legalrepresentativeform2.length - 1) {
                this.legalrepresentativeform2().push(this.newlegalrepresentativeform2());
              }
              console.log("addmoredata" + this.addmoredata)
              this.addmoredata = true;
              console.log("addmoredata" + this.addmoredata)

            }

          }

        }
      }
    }
    setTimeout(() => {
      if (this.localData.hasOwnProperty('type1')) {
        if (this.localData.type1.legalrepresentativeform.length > 0) {

          for (let i = 0; i < this.localData.type1.legalrepresentativeform.length; i++) {
            if (this.localData.type1.legalrepresentativeform[i].dateofbirth != '' || this.localData.type1.legalrepresentativeform[i].streetfirst != '' ||
              this.localData.type1.legalrepresentativeform[i].streetNumberfirst != '' || this.localData.type1.legalrepresentativeform[i].postCodefirst != ''
              || this.localData.type1.legalrepresentativeform[i].cityfirst != '' || this.localData.type1.legalrepresentativeform[i].additionalReferencefirst != '' ||
              this.localData.type1.legalrepresentativeform[i].countryOfResidencefirst != '') {
              $("#formidFirst" + i).css("display", "none");
            }
          }

        }
        if (this.localData.type2.legalrepresentativeform1.length > 0) {

          for (let i = 0; i < this.localData.type2.legalrepresentativeform1.length; i++) {

            $("#formidSecond" + i).css("display", "none");

          }

        }
        if (this.localData.type3.legalrepresentativeform2.length > 0) {

          for (let i = 0; i < this.localData.type3.legalrepresentativeform2.length; i++) {
            if (this.localData.type3.legalrepresentativeform2[i].dateofbirth != '' || this.localData.type3.legalrepresentativeform2[i].streetshare != '' ||
              this.localData.type3.legalrepresentativeform2[i].streetNumbershare != '' || this.localData.type3.legalrepresentativeform2[i].postCodeshare != ''
              || this.localData.type3.legalrepresentativeform2[i].cityshare != '' || this.localData.type3.legalrepresentativeform2[i].additionalReferenceshare != '' ||
              this.localData.type3.legalrepresentativeform2[i].countryOfResidenceshare != '' || this.localData.type3.legalrepresentativeform2[i].firstname != '' ||
              this.localData.type3.legalrepresentativeform2[i].lastname != '' || this.localData.type3.legalrepresentativeform2[i].title != '' || this.localData.type3.legalrepresentativeform2[i].shares != 100) {
              $("#formid" + i).css("display", "none");
              $('#showerrorr').css("display", "block");
            }
          }

        }
      }
    }, 100);
    setTimeout(() => {
      if (this.documents != '') {
        console.log("singed array documents")

        let k = 1;

        for (let i = 0; i < this.documents.length; i++) {

          if (this.documents[i].element.document_name == "Ausweisdokument Vertretungsberechtigte Person") {
            this.docFromGroup.get('DocOne').clearValidators();

            this.docFromGroup.get('DocOne').updateValueAndValidity();
            //  this.docFromGroup.patchValue({DocOne: " "})
            let obj = this.saveddoc.find((o, i) => {

              if (o.id == 'Ausweisdokument Vertretungsberechtigte Person' && o.index == 'DocOne') {
                return true; // stop searching
              }
            });

            if (obj) {
              console.log("singed array" + JSON.stringify(this.saveddoc))
            } else {
              this.saveddoc.push({ id: "Ausweisdokument Vertretungsberechtigte Person", index: 'DocOne' });

              console.log("singed array" + JSON.stringify(this.saveddoc))
            }
            console.log("localdataresult" + JSON.stringify(this.documents[i]));
            let StringTemple: string = '';
            let preview = "PerviewOne0";
            let ImageName;
            let docurl = this.documents[i].element.document_url;
            let extension = this.documents[i].element.document_unique_id.substr(this.documents[i].element.document_unique_id.lastIndexOf(".") + 1);
            if (extension == "doc" || extension == "docx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/docx.png";
              StringTemple =
                '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name +
                "</b> </div></div>";

              //$("#" + preview).html(StringTemple);
            }

            else if (extension == "pdf" || extension == "pdfx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/icons/file-upload-blue-pdf.svg";
              StringTemple =
                '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;cursor:pointer" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb" id="buttonFirst" style="width: 100%;height:210px" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name +
                "</b> </div></div>";
              //$("#" + preview).html(StringTemple);
              const ButtonOne = document.getElementById("buttonFirst");
              ButtonOne.addEventListener(
                "click",
                function () {
                  removepreview("one");
                },
                false
              );
              const removepreview = (e) => {
                if (e == "one") {
                  this.openpdfpopup(docurl);

                }
              }
            }

            else {
              StringTemple =
                '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                this.documents[i].element.document_url +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name +
                "</b> </div></div>";
              //$("#" + preview).html(StringTemple);
            }

            $("#removepreviewid" + preview).click(function () {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select new file!!',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
            });
          }




          if (this.documents[i].element.document_name != "Ausweisdokument Vertretungsberechtigte Person" &&
            this.documents[i].element.document_name.indexOf("Ausweisdokument Vertretungsberechtigte Person") != -1
          ) {
            //this.docFromGroup.get('DocOne'+i).clearValidators();

            //this.docFromGroup.get('DocOne'+i).updateValueAndValidity();

            let obj = this.saveddoc.find((o, i) => {

              if (o.id != 'Ausweisdokument Vertretungsberechtigte Person' &&
                o.id.indexof("Ausweisdokument Vertretungsberechtigte Person") != -1
                && o.index != 'DocOne' && o.index.indexof('DocOne') != -1) {
                return true; // stop searching
              }
            });

            if (obj) {
              console.log("singed array" + JSON.stringify(this.saveddoc))
            } else {
              this.saveddoc.push({ id: this.documents[i].element.document_name, index: 'DocOne' + k });

              console.log("singed array" + JSON.stringify(this.saveddoc))
            }
            console.log("localdataresult" + JSON.stringify(this.documents[i]));
            let StringTemple: string = '';
            let preview = "PerviewOne" + k; k = k + 1;
            let ImageName;
            let docurl = this.documents[i].element.document_url;
            let extension = this.documents[i].element.document_unique_id.substr(this.documents[i].element.document_unique_id.lastIndexOf(".") + 1);
            if (extension == "doc" || extension == "docx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/docx.png";
              StringTemple =
                '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name +
                "</b> </div></div>";
              //$("#" + preview).html(StringTemple);
            }

            else if (extension == "pdf" || extension == "pdfx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/icons/file-upload-blue-pdf.svg";
              StringTemple =
                '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;cursor:pointer" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb" id="buttonFirst1" style="width: 100%;height:210px" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name +
                "</b> </div></div>";
              //$("#" + preview).html(StringTemple);
              const ButtonOne = document.getElementById("buttonFirst1");
              ButtonOne.addEventListener(
                "click",
                function () {
                  removepreview("one");
                },
                false
              );
              const removepreview = (e) => {
                if (e == "one") {
                  this.openpdfpopup(docurl);

                }
              }
            }

            else {
              StringTemple =
                '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                this.documents[i].element.document_url +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name +
                "</b> </div></div>";
              //$("#" + preview).html(StringTemple);
            }

            $("#removepreviewid" + preview).click(function () {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select new file!!',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
            });
          }






          if (this.documents[i].element.document_name == "Geschäftsanmeldung") {
            this.docFromGroup.get('DocTwo').clearValidators();

            this.docFromGroup.get('DocTwo').updateValueAndValidity();
            // this.docFromGroup.patchValue({DocTwo: " "})
            let obj = this.saveddoc.find((o, i) => {

              if (o.id == 'Geschäftsanmeldung' && o.index == 'DocTwo') {
                return true; // stop searching
              }
            });

            if (obj) {
              console.log("singed array" + JSON.stringify(this.saveddoc))
            } else {
              this.saveddoc.push({ id: "Geschäftsanmeldung", index: 'DocTwo' });

              console.log("singed array" + JSON.stringify(this.saveddoc))
            }
            console.log("localdataresult" + JSON.stringify(this.documents[i]));
            let StringTemple: string = '';
            let preview = "PerviewTwo";
            let ImageName;
            let docurl = this.documents[i].element.document_url;
            let extension = this.documents[i].element.document_unique_id.substr(this.documents[i].element.document_unique_id.lastIndexOf(".") + 1);
            if (extension == "doc" || extension == "docx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/docx.png";
              StringTemple =
                '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name +
                "</b> </div></div>";
              //$("#" + preview).html(StringTemple);
            }

            else if (extension == "pdf" || extension == "pdfx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/icons/file-upload-blue-pdf.svg";
              StringTemple =
                '<div class="pip" id="buttonSecond" style="width: 290px;display: inline-block;margin: 8px;cursor:pointer" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name +
                "</b> </div></div>";
              //$("#" + preview).html(StringTemple);
              const ButtonOne = document.getElementById("buttonSecond");
              ButtonOne.addEventListener(
                "click",
                function () {
                  removepreview("one");
                },
                false
              );
              const removepreview = (e) => {
                if (e == "one") {
                  this.openpdfpopup(docurl);

                }
              }
            }

            else {
              StringTemple =
                '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                this.documents[i].element.document_url +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name +
                "</b> </div></div>";
              //$("#" + preview).html(StringTemple);
            }
            $("#removepreviewid" + preview).click(function () {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select new file!!',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
            });
          }
          if (this.documents[i].element.document_name == "Aktueller Auszug aus dem Handelsregister") {
            this.docFromGroup.get('DocThree').clearValidators();

            this.docFromGroup.get('DocThree').updateValueAndValidity();
            // this.docFromGroup.patchValue({DocThree: " "})
            let obj = this.saveddoc.find((o, i) => {

              if (o.id == 'Aktueller Auszug aus dem Handelsregister' && o.index == 'DocThree') {
                return true; // stop searching
              }
            });

            if (obj) {
              console.log("singed array" + JSON.stringify(this.saveddoc))
            } else {
              this.saveddoc.push({ id: "Aktueller Auszug aus dem Handelsregister", index: 'DocThree' });

              console.log("singed array" + JSON.stringify(this.saveddoc))
            }
            console.log("localdataresult" + JSON.stringify(this.documents[i]));
            let StringTemple: string = '';
            let preview = "PerviewThree";
            let ImageName;
            let docurl = this.documents[i].element.document_url;
            let extension = this.documents[i].element.document_unique_id.substr(this.documents[i].element.document_unique_id.lastIndexOf(".") + 1);
            if (extension == "doc" || extension == "docx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/docx.png";
              StringTemple =
                '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name +
                "</b> </div></div>";
              //$("#" + preview).html(StringTemple);
            }

            else if (extension == "pdf" || extension == "pdfx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/icons/file-upload-blue-pdf.svg";
              StringTemple =
                '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;cursor:pointer" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb"  id="buttonThird" style="width: 100%;height:210px" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name +
                "</b> </div></div>";
              //$("#" + preview).html(StringTemple);
              const ButtonOne = document.getElementById("buttonThird");
              ButtonOne.addEventListener(
                "click",
                function () {
                  removepreview("one");
                },
                false
              );
              const removepreview = (e) => {
                if (e == "one") {
                  this.openpdfpopup(docurl);

                }
              }
            }

            else {
              StringTemple =
                '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                this.documents[i].element.document_url +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name +
                "</b> </div></div>";
              //$("#" + preview).html(StringTemple);
            }
            $("#removepreviewid" + preview).click(function () {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select new file!!',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
            });
          }
          if (this.companytypenew != 'Einzelunternehmen' && this.companytypenew != 'Eingetragener Kaufmann (e.K.)') {

            for (let m = 0; m < this.legalrepresentativeform2().length; m++) {

              let name1 = "Upload Ausweisdokument" + " " + this.secondcompanyaddressFormGroup2.value.legalrepresentativeform2[m].firstname + " " + this.secondcompanyaddressFormGroup2.value.legalrepresentativeform2[m].lastname;

              if (this.documents[i].element.document_name == name1) {
                let obj = this.saveddoc.find((o, i) => {

                  if (o.id == 'passportpic' && o.index == m) {
                    return true; // stop searching
                  }
                });

                if (obj) {
                  console.log("singed array" + JSON.stringify(this.saveddoc))
                } else {
                  this.saveddoc.push({ id: "passportpic", index: m });

                  console.log("singed array" + JSON.stringify(this.saveddoc))
                }
                let ImageName;
                let StringTemple: string = '';
                let preview = "passportPerview" + m;
                console.log("Perview" + preview)
                let docurl = this.documents[i].element.document_url;
                let extension = this.documents[i].element.document_unique_id.substr(this.documents[i].element.document_unique_id.lastIndexOf(".") + 1);
                console.log("Perview" + docurl)


                if (extension == "doc" || extension == "docx") {

                  console.log("extension StringTemple" + extension);
                  ImageName = "../assets/docx.png";
                  StringTemple =
                    '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;text-align: center;" id="div3">' +
                    "" +
                    '<div class="removepreview" id="removepreviewid' +
                    preview +
                    '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                    "" +
                    '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                    ImageName +
                    '" title="' +
                    this.documents[i].element.document_name +
                    '"/>' +
                    "<div> <b>Dokumentenname: " +
                    this.documents[i].element.document_name +
                    "</b> </div></div>";
                  //$("#" + preview).html(StringTemple);
                }

                else if (extension == "pdf" || extension == "pdfx") {

                  console.log("extension StringTemple" + extension);
                  ImageName = "../assets/icons/file-upload-blue-pdf.svg";
                  StringTemple =
                    '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;cursor:pointer" id="div3">' +
                    "" +
                    '<div class="removepreview" id="removepreviewid' +
                    preview +
                    '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                    "" +
                    '<img class="imageThumb" id="buttonOne{{m}}" style="width: 100%;height:210px" src="' +
                    ImageName +
                    '" title="' +
                    this.documents[i].element.document_name +
                    '"/>' +
                    "<div> <b>Dokumentenname: " +
                    this.documents[i].element.document_name +
                    "</b> </div></div>";
                  //$("#" + preview).html(StringTemple);
                  const ButtonOne = document.getElementById("buttonOne{{m}}");
                  ButtonOne.addEventListener(
                    "click",
                    function () {
                      removepreview("one");
                    },
                    false
                  );
                  const removepreview = (e) => {
                    if (e == "one") {
                      this.openpdfpopup(docurl);

                    }
                  }
                }

                else {

                  console.log("extension StringTemple" + extension);
                  StringTemple =
                    '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
                    "" +
                    '<div class="removepreview" id="removepreviewid' +
                    preview +
                    '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                    "" +
                    '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                    this.documents[i].element.document_url +
                    '" title="' +
                    this.documents[i].element.document_name +
                    '"/>' +
                    "<div> <b>Dokumentenname: " +
                    this.documents[i].element.document_name +
                    "</b> </div></div>";
                  //$("#" + preview).html(StringTemple);
                }
                $("#removepreviewid" + preview).click(function () {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Select new file!!',
                    // footer: '<a href="">Why do I have this issue?</a>'
                  })
                });


              }
            }
          }
          if (this.documents[i].element.document_name == "Datenstammblatt mit Einwilligungserklärung") {
            this.licenseagreementsaved = true;
            this.licenseagreementurl = this.documents[i].element.document_url;
          }
        }
      }
    }, 100);
    setTimeout(() => {
      this.checkfirststepData();
    }, 50);
  }

  source = ''

  open_modal(modal_id: any) {
    $('#' + modal_id).appendTo("body");
  }
  close_modal(modal_id: any, append_to: any) {
    $('#' + modal_id).appendTo("#" + append_to);
  }
  async handlepassportImageChange(
    event: any,
    preview: string,
    docName: string,
    idname: any,
    fname = "",
    lname = "",
  ) {


    this.docuploaded = false;
    this.showfifthstepsuccess = false;
    console.log("documentpasslist" + JSON.stringify(this.documentpasslist));
    console.log("documentpassid" + JSON.stringify(this.documentpassid));
    for (let m = 0; m < this.legalrepresentativeform2().length; m++) {
      this.documentpasslist.push('');
      this.documentpassid.push('');
    }
    console.log("documentpasslist" + JSON.stringify(this.documentpasslist));
    console.log("documentpassid" + JSON.stringify(this.documentpassid));
    let that = this;
    event.preventDefault();

    console.log("dataaa" + preview);
    console.log("dataaa" + docName);
    console.log("dataaa" + idname);
    $("#result").html("");
    let StringTemple;
    let StringTemple1;


    const previewData = (j, modaltitle) => {
      let str = modaltitle
      let words = str.split(" ");
      let firstTwoWords = words.slice(0, 2);
      let result = firstTwoWords.join(" ");
      modaltitle = result

      console.log("previewData" + j);

      console.log("the source");
      console.log(this.previewpassportidandsrc.length);
      console.log(this.previewpassportidandsrc[j]);

      if (this.previewpassportidandsrc[j].indexOf('data:application/pdf;') != -1) {

        $("#openpreviewmodel").trigger("click");
        this.open_modal('exampleModalpreview')

        $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + modaltitle);

        $("#showpreviewdownload").attr("href", this.previewpassportidandsrc[j]);
        this.source = this.previewpassportidandsrc[j];
        setTimeout(() => {
          $("#showpreviewimg").attr("src", "");
          $("#showpreviewimg").css("display", "none");

          $("#showpreviewpdf").attr("src", "");
          $("#showpreviewpdf").css("display", "block");
          $("#showpreviewpdf").attr("src", this.previewpassportidandsrc[j]);
        }, 1000);

      } else {
        $("#openpreviewmodel").trigger("click");
        this.open_modal('exampleModalpreview')

        $('#showpreviewtitle').html("<b>Dokumentenname: </b>" + modaltitle);

        $('#showpreviewdownload').attr('href', this.previewpassportidandsrc[j]);

        $('#showpreviewpdf').attr('src', '');
        $('#showpreviewpdf').css('display', 'none');

        $('#showpreviewimg').attr('src', '');
        $('#showpreviewimg').css('display', 'block');
        $('#showpreviewimg').attr('src', this.previewpassportidandsrc[j]);
      }
    };


    const removeData = (j) => {
      this.filearraypassport.splice(j, 1);
      this.documentpassid[j] = "";
      this.documentpasslist[j] = "";
      //$("#" + idname).val("");

      this.filenamepass.splice(j, 1);
      console.log("removed passport");
      console.log(this.filenamepass);
      console.log(this.filearraypassport);
      console.log("documentpasslist" + JSON.stringify(this.documentpasslist));
      console.log("documentpassid" + JSON.stringify(this.documentpassid));
    };

    var files = event.target.files;
    console.log("events" + event.target.files);
    var filesLength = files.length;
    console.log("events" + filesLength);
    for (let i = 0; i < filesLength; i++) {

      this.document_progressbar += 1;

      this.previewpassportid += 1;

      let ppassportid = this.previewpassportid;


      let f = files[i];
      this.filearraypassport.push(f);
      console.log("events" + JSON.stringify(this.filearraypassport));
      //this.documentpassid[idname] = f;
      //this.documentpassid[that.previewpassportid] = f;
      this.documentpassid[ppassportid] = f;
      console.log("events" + JSON.stringify(this.documentpassid[that.previewpassportid]));
      console.log("events" + f);
      this.filenamepass.push(docName);
      this.filearraypass = this.filearraypassport;


      var fileReader = new FileReader();
      //var target:EventTarget;
      let Size = this.dataconvert(f.size);

      let Size_num = Math.round(f.size / 1024);

      fileReader.onload = function (e) {
        //var file = e.target;

        console.log(f.name.split("."));
        let extension = f.name.substr(f.name.lastIndexOf(".") + 1);
        console.log(extension);
        let ImageName;
        if (extension == "doc" || extension == "docx") {
          ImageName = "../assets/docx.png";
        } else if (extension == "pdf" || extension == "pdfx") {
          ImageName = "../assets/icons/file-upload-blue-pdf.svg";
        } else {
          ImageName = (e.target as any).result;
        }

        let Size111 = Math.round(f.size / 1024);

        that.previewpassportsrc = (e.target as any).result;



        //that.previewpassportidandsrc[that.previewpassportid] = that.previewpassportsrc;
        that.previewpassportidandsrc[ppassportid] = that.previewpassportsrc;


        console.log("signed and saved docs");
        console.log(that.signeddoc);


        let running_number = 0;
        for (let sign_count = 0; sign_count < that.signeddoc.length; sign_count++) {
          if (that.signeddoc[sign_count].docname == fname + " " + lname) {
            running_number += 1;
          }
        }


        let filename = f.name;
        if (fname != "") {
          if (running_number == 0) {
            filename = "Wirtschaftlich Berechtigte Upload Ausweisdokument: " + fname + " " + lname;
          } else {
            filename = "Wirtschaftlich Berechtigte Upload Ausweisdokument: " + fname + " " + lname + "-" + running_number;
          }
        }


        // StringTemple =
        //   '<div class="pip"  style=" margin: auto !important; position: relative;" id="div3">' +
        //   "" +
        //   '<div  class="removepreview" id="removepreviewid' +
        //   idname +
        //   '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px;padding: 6px;color: white;position: absolute;margin-top: 2px;   margin-left: auto;cursor: pointer;right:0; top:8px;text-align: center; ">X</div>' +
        //   "" +
        //   '<img class="imageThumb" style="width: 100%;height:210px;  margin-top: 10px; object-fit: contain;" src="' +
        //   ImageName +
        //   '" title="' +
        //   f.name +
        //   '"/>' +
        //   "<div " +'style=" height: 75px; text-align: center;overflow:hidden"'
        //  +"><div> <b>Dokumentenname: " +
        //   //f.name +
        //   filename +
        //   "</b> </div><div> <b>Dateigröße: " +
        //   Size +
        //   "</b> </div></div>"+
        //   '   <div class="progress form-group " id="progressnew'+idname+'" style="background-color: grey;width: 100%;"> <div class="percentageclass'+idname+' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage'+idname+'" [style.width.%]=""> </div> </div>'
        //   +
        //   " </div>"
        //   +"</div>";



        StringTemple = '<div class="pip d-flex flex-column col-md-12 p-0 upload-file bg-white" style="margin-top:10px;border-radius: 9px;">' +
          '<div class="d-flex flex-row col-md-12 p-0">' +
          '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center">' +
          '<img class="imageThumb" style="width: 50px;height:30px;" src="' +
          ImageName +
          '" title="' +
          f.name +
          '"/>' +
          '</div>' +

          '<div class="col-md-8 d-flex justify-content-center flex-column p-0" style="font-size:11px; padding:1px" style="font-size:14px;">' +
          '<span><b>Dokumentenname: ' + filename + '</b></span> ' +
          '<span><b>Dateigröße: ' + Size + '</b> </span>' +
          '</div>' +
          '</div>' +
          '<div class="col-md-12 text-right d-flex flex-row align-items-center justify-content-end py-1" >' +
          '<div class="removepreview btn bg-danger links mt-1 text-white" data-preview_id="' + ppassportid + '" id="removepreviewid' +
          ppassportid +
          '" style="cursor: pointer;padding:1px 4px" ><i class="fas fa-times text-white "  aria-hidden="true"></i>&nbsp;Entfernen</div>'
        ' <div class="previewImagee btn links mt-1 text-white" data-preview_id="' + ppassportid + '" id="previewimagee' + ppassportid +
        '" style="border:none;cursor: pointer; background: linear-gradient(#17459b, #02a9ed);padding:1px 4px;font-size:14px ">' +
        '<i class="text-white fa fa-eye" aria-hidden="true"></i>&nbsp;Sicht</div>' +

          '</div>' +


          '<div class="col-md-12">' +
          '<div class="progress form-group progressnew' + Size_num + i + '" id="progressnew' + Size_num + i + '" style="background-color: grey;width: 100%;"> <div class="percentageclass' + Size_num + i + ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' + Size_num + i + '" [style.width.%]=""> </div> </div>' +
          '</div>' +

          '</div>';






        StringTemple1 =
          ' <div style="border: 1px solid #d1d1d1; margin-top:10px;">' +
          "" +
          '<h3 style="margin: 0px;height: 176px;   display: grid;  align-items: center;     text-align: center; margin: auto; width: 100%;font-size: inherit;">Vorschau</h3></div>';
        //  $("#" + preview + idname).html(StringTemple);
        $("#" + preview + idname).append(StringTemple);

        $('.previewImagee').click(function (event) {
          previewData($(this).data('preview_id'), filename);
          event.stopPropagation();
          event.stopImmediatePropagation();
        })




        // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> KB </div>`).insertAfter(".pip")
        //$("#removepreviewid" + idname).click(function () {
        $(".removepreview").click(function (event) {
          removeData(i);

          //$(this).parent(".pip").remove();

          //$("#" + preview + idname).html("");



          //$("#showtick" + idname).hide();

          $("#showtick" + $(this).data('preview_id')).hide();


          that.saveddoc.forEach((value, index) => {
            //if(value.id=="passportpic" && value.index == idname) that.saveddoc.splice(index,1);
            if (value.id == "passportpic" && value.index == $(this).data('preview_id')) that.saveddoc.splice(index, 1);
          });

          that.signeddoc.forEach((value, index) => {
            //if(value.id=="passportpic" && value.index == idname) that.signeddoc.splice(index,1);
            if (value.id == "passportpic" && value.index == $(this).data('preview_id')) that.signeddoc.splice(index, 1);
          });

          $(this).parent().parent().remove();

          console.log("saved array" + JSON.stringify(that.saveddoc));
          console.log("singed array" + JSON.stringify(that.signeddoc));


          if (that.localData.hasOwnProperty('companytype')) {
            if (that.localData.companytype == 'Einzelunternehmen' || that.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {


            }
            else {

              let ceo_length = that.localData.type1.legalrepresentativeform.length;
              let shareholder_length = that.localData.type3.legalrepresentativeform2.length;

              let doc_check = false;

              let ceo_done = 0;
              let shareholder_done = 0;
              let geschaft_done = 0;
              let akt_done = 0;

              if (that.saveddoc.length > 0) {


                for (let doc_length = 0; doc_length < that.saveddoc.length; doc_length++) {

                  let temp_ceo_length = parseInt(ceo_length) - 1;
                  if (ceo_length > 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                    ceo_done = 1;

                  } else if (ceo_length == 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person") {

                    ceo_done = 1;

                  }


                  // if(this.saveddoc[doc_length].id == "passportpic"){
                  //   shareholder_done += 1;
                  // }



                  if (that.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                    geschaft_done = 1;
                  }


                  if (that.saveddoc[doc_length].id == "Aktueller Auszug aus dem Handelsregister") {
                    akt_done = 1;
                  }


                }


                for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                  for (let doc_length = 0; doc_length < that.signeddoc.length; doc_length++) {
                    if (that.signeddoc[doc_length].docname ==
                      that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                      " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                      shareholder_done += 1;
                      break;
                    }

                  }
                }





                if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done == 1) {
                  that.disableddocumentgmbh = false;
                } else {
                  that.disableddocumentgmbh = true;
                }



              }

              if (that.documents.length > 0) {

                for (let doc_length = 0; doc_length < that.documents.length; doc_length++) {

                  let temp_ceo_length = parseInt(ceo_length) - 1;
                  if (ceo_length > 1 && that.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                    ceo_done = 1;

                  } else if (ceo_length == 1 && that.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person") {

                    ceo_done = 1;

                  }

                  for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                    if (that.documents[doc_length].element.document_name ==
                      "Upload Ausweisdokument " + that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                      " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                      shareholder_done += 1;
                    }

                  }


                  if (that.documents[doc_length].element.document_name == "Geschäftsanmeldung") {
                    geschaft_done = 1;
                  }


                  if (that.documents[doc_length].element.document_name == "Aktueller Auszug aus dem Handelsregister") {
                    akt_done = 1;
                  }


                }

                if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done) {
                  that.disableddocumentgmbh = false;
                  doc_check = false;
                } else {
                  that.disableddocumentgmbh = true;
                  doc_check = true;
                }


              }






            }
          }





          event.stopPropagation();
          event.stopImmediatePropagation();

        });
      };
      fileReader.readAsDataURL(f);

      // that.previewpassportid += 1;






      ////////////To show custom progress bar for files under 30 mb code starts here//////////

      /*

      let size_number = Size;

      let size_array = size_number.split(" ");

      let size_extension = size_array[1];
      let size_num = parseFloat(size_array[0]);
      if((size_extension=="MB" && size_num <= 30) || (size_extension=="KB" && size_num <= 30000)){
        let progress = 0;
        this.detect_passport_upload_changes[this.previewpassportid] = setInterval(() => {
          progress += 1;
          if(progress <= 99){
            $('div.percentageclass'+idname).width(progress+"%");
            $('div.percentageclass'+idname).html(progress+"%");
          }

          if(progress >=99){
            if(this.docuploaded){
              $('div.percentageclass'+idname).width("100%");
              $('div.percentageclass'+idname).html("100%");
              setTimeout(()=>{
                $('#progressnew'+idname).css("display","none");
                $('#progressnew'+idname).css('width','0');
                $('div.percentageclass'+idname).width("0");
                $('div.percentageclass'+idname).css('width','0');
                $('div.percentageclass'+idname).html('');
                clearInterval(this.detect_passport_upload_changes[this.previewpassportid]);
              },1000);
            }

          }
        }, 150);
      }
    */
      ////////////To show custom progress bar for files under 30 mb code ends here//////////


      //let ppassportid = this.previewpassportid;

      const formData = new FormData();
      formData.append("document", f);
      this.userService.uploaddocumentwithoutticketno(
        formData
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {

          case HttpEventType.Sent:
            console.log('Request has been made!');

            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            console.log(event.total);
            console.log(event.loaded);

            // this.progress[newsize] = Math.round(event.loaded / event.total * 100);


            //$('div.percentageclass'+idname).width(Math.round((event.loaded / event.total) * 100)+"%");
            //$('div.percentageclass'+idname).html(Math.round((event.loaded / event.total) * 100)+"%");
            //if((size_extension=="MB" && size_num > 30) || (size_extension=="KB" && size_num > 30000)){
            $('div.percentageclass' + Size_num + i).width(Math.round((event.loaded / event.total) * 100) + "%");
            $('div.percentageclass' + Size_num + i).html(Math.round((event.loaded / event.total) * 100) + "%");
            //}

            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);


            this.docuploaded = true;


            $('div.percentageclass' + Size_num + i).width("0%");
            $('div.percentageclass' + Size_num + i).html('');
            $('.progressnew' + Size_num + i).css("display", "none");
            $('.progressnew' + Size_num + i).css('width', '0');


            // this.uploadingdoc=false;
            $("#showtick" + idname).show();
            let obj = this.signeddoc.find((o, i) => {

              if (o.id == 'passportpic' && o.index == idname) {
                return true; // stop searching
              }
            });

            // if(obj){
            //   console.log("singed array" + JSON.stringify(this.signeddoc))
            // }else{
            //   this.signeddoc.push({ id: "passportpic", index: idname });

            //   console.log("singed array" + JSON.stringify(this.signeddoc))
            // }




            // this.signeddoc.push({ id: "passportpic", index: that.previewpassportid });

            //this.signeddoc.push({ id: "passportpic", index: that.previewpassportid , docname: fname+" "+lname});
            this.signeddoc.push({ id: "passportpic", index: ppassportid, docname: fname + " " + lname });

            let obj1 = this.saveddoc.find((o, i) => {

              if (o.id == 'passportpic' && o.index == idname) {
                return true; // stop searching
              }
            });

            // if(obj1){
            //   console.log("singed array" + JSON.stringify(this.saveddoc))
            // }else{
            //   this.saveddoc.push({ id: "passportpic", index: idname });

            //   console.log("singed array" + JSON.stringify(this.saveddoc))
            // }

            //this.saveddoc.push({ id: "passportpic", index: that.previewpassportid });
            this.saveddoc.push({ id: "passportpic", index: ppassportid });


            console.log("passport saved doc new");
            console.log(this.saveddoc);
            console.log(this.signeddoc);
            console.log(this.filearraypass);



            if (this.localData.hasOwnProperty('companytype')) {
              if (this.localData.companytype == 'Einzelunternehmen' || this.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {


              }
              else {

                let ceo_length = this.localData.type1.legalrepresentativeform.length;
                let shareholder_length = this.localData.type3.legalrepresentativeform2.length;

                let doc_check = false;

                let ceo_done = 0;
                let shareholder_done = 0;
                let geschaft_done = 0;
                let akt_done = 0;


                if (this.saveddoc.length > 0) {


                  for (let doc_length = 0; doc_length < this.saveddoc.length; doc_length++) {

                    let temp_ceo_length = parseInt(ceo_length) - 1;
                    if (ceo_length > 1 && this.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                      ceo_done = 1;

                    } else if (ceo_length == 1 && this.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person") {

                      ceo_done = 1;

                    }


                    // if(this.saveddoc[doc_length].id == "passportpic"){
                    //   shareholder_done += 1;
                    // }



                    if (this.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                      geschaft_done = 1;
                    }


                    if (this.saveddoc[doc_length].id == "Aktueller Auszug aus dem Handelsregister") {
                      akt_done = 1;
                    }


                  }


                  for (let share_doc_length = 0; share_doc_length < this.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                    for (let doc_length = 0; doc_length < this.signeddoc.length; doc_length++) {
                      if (this.signeddoc[doc_length].docname ==
                        this.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                        " " + this.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                        shareholder_done += 1;
                        break;
                      }

                    }
                  }





                  if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done == 1) {
                    this.disableddocumentgmbh = false;
                  } else {
                    this.disableddocumentgmbh = true;
                  }



                }

                if (this.documents.length > 0) {

                  for (let doc_length = 0; doc_length < this.documents.length; doc_length++) {

                    let temp_ceo_length = parseInt(ceo_length) - 1;
                    if (ceo_length > 1 && this.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                      ceo_done = 1;

                    } else if (ceo_length == 1 && this.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person") {

                      ceo_done = 1;

                    }

                    for (let share_doc_length = 0; share_doc_length < this.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                      if (this.documents[doc_length].element.document_name ==
                        "Upload Ausweisdokument " + this.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                        " " + this.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                        shareholder_done += 1;
                      }

                    }


                    if (this.documents[doc_length].element.document_name == "Geschäftsanmeldung") {
                      geschaft_done = 1;
                    }


                    if (this.documents[doc_length].element.document_name == "Aktueller Auszug aus dem Handelsregister") {
                      akt_done = 1;
                    }


                  }

                  if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done) {
                    this.disableddocumentgmbh = false;
                    doc_check = false;
                  } else {
                    this.disableddocumentgmbh = true;
                    doc_check = true;
                  }


                }






              }
            }

          //that.previewpassportid += 1;







          //             setTimeout(() => {

          //               $('#progressnew'+idname).css("display","none");
          //             this.documentpassid[idname]=event.body.document_unique_id;
          //             // let StringTypeCasting:any = Math.round(
          //             //   this.filearray[newsize].size / 1024
          //             // );
          //             let Size111 = f.size;
          //             let StringTypeCasting = this.dataconvert(Size111);
          //             let typeofimage = f.type;
          //             let dateofdocument = f.lastModified;
          //             let tags=[]
          //             let newtage=StringTypeCasting+","+typeofimage+","+dateofdocument;
          //             tags.push(newtage);
          // let document_name = docName + idname;

          //             this.documentpasslist[idname]={
          //               document_unique_id:event.body.document_unique_id,
          //               document_type:  "Passport Document",
          //               document_sub_type: " ",
          //               user_id: this.id,
          //               companycode: "42140 DFG Finanzprofi GmbH",

          //               brand: "Cefima",
          //               tags: tags,
          //               upload_by: "cefima_document",
          //               product_partner:" ",
          //               document_name:document_name,
          //               created_by:this.id
          //             };
          //             console.log("documentpasslist"+JSON.stringify(this.documentpasslist));
          //             console.log("documentpassid"+JSON.stringify(this.documentpassid));
          //             }, 1500);

        }
      })
    }
    console.log("documentpasslist" + JSON.stringify(this.documentpasslist));
    console.log("documentpassid" + JSON.stringify(this.documentpassid));
    console.log("filearraypass" + JSON.stringify(this.filearraypass));
  }

  async savedocument() {
    console.log("saveonnext");
    console.log("savedocumentfunction");
    let that = this;
    $("#loaderouterid").css("display", "block");


    console.log("ticket_no" + this.localData.brokerregticketno);
    this.TicketNo = this.localData.brokerregticketno;

    for (let j = 0; j < this.signeddoc.length; j++) {
      let signname = this.signeddoc[j].id;
      let index = this.signeddoc[j].index;
      let shareholdername = this.signeddoc[j].docname;
      console.log("asdgysatdghsadjsadsa" + signname);
      console.log("saveonnext");
      let result = await this.uploaddocumnetnew(signname, index, shareholdername);
      console.log("saveonnext");
      console.log("asdgysatdghsadjsadsa" + signname);
      console.log("asdgysatdghsadjsadsa" + result);
    }


  }
  async uploaddocumnetnew(signname, index, shareholdername = '') {
    console.log("saveonnext");
    console.log("uploaddocumnetnew");
    console.log("asdgysatdghsadjsadsa123" + signname);

    console.log(this.documents);
    console.log(this.documents.length);

    return new Promise(async resolve => {
      let that = this;
      console.log("saveonnext");
      if (signname == 'passportpic') {
        console.log("saveonnext");
        //for (let i = 0; i < this.legalrepresentativeform2().length; i++) {
        for (let i = 0; i <= this.previewpassportid; i++) {
          console.log(index + " index and " + i);
          console.log("length " + this.legalrepresentativeform2().length);

          if (signname == 'passportpic' && index == i) {

            let docname1 = shareholdername;
            //let docname1=this.secondcompanyaddressFormGroup2.value.legalrepresentativeform2[i].firstname+" "+this.secondcompanyaddressFormGroup2.value.legalrepresentativeform2[i].lastname;
            console.log("docnamer" + docname1)

            let result = await this.uploadthirdpassportdoc(i, that.id, this.localData.brokerregticketno, docname1);
            console.log("etthjdshhfgsdfs" + result)
            console.log("saveonnext");
          }

        }
        resolve(true);
      }

    });
  }
  uploadthirdpassportdoc(i, user_id, ticket_no, docname) {
    console.log("saveonnext");
    return new Promise(resolve => {
      console.log("reached here uploadthirdpassportdoc");

      let oldcheckdoc;
      if (this.documents.length > 0) {
        oldcheckdoc = this.documents.find((result) => result.element.document_name == "Upload Ausweisdokument " + docname)
      }

      let olddocument_id = '';
      if (oldcheckdoc) {
        olddocument_id = oldcheckdoc.element.id;
      }


      olddocument_id = '';

      console.log("asdsadasdasdffffffffffffffffffffffffff" + JSON.stringify(oldcheckdoc));
      console.log("asdsadasdasdffffffffffffffffffffffffff" + JSON.stringify(olddocument_id));

      console.log("reached here");

      console.log("saveonnext");
      let that = this;
      var values3 = {
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
        document_name: "",
        olddocument_id: "",
      };

      console.log("saveonnext");

      let document_name = "Upload Ausweisdokument " + docname;
      console.log("reached here");
      values3.image = this.documentpassid[i];
      console.log("reached here");
      values3.document_type = "Allgemeines Dokument";
      console.log("reached here");
      values3.document_sub_type = "Upload Ausweisdokument";
      console.log("reached here");
      values3.document_name = document_name;
      console.log("reached here");
      values3.user_id = user_id;
      console.log("reached here");
      values3.product_partner = "" + i;
      console.log("reached here");
      values3.companycode = "42140 DFG Finanzprofi GmbH";
      values3.brand = "cefima";
      values3.upload_by = "cefima_document";
      values3.ticket_no = ticket_no;
      values3.olddocument_id = olddocument_id;
      //values3.created_by = this.id.toString()
      values3.tags.push(Math.round(this.documentpassid[i].size / 1024));
      //values3.tags.push(MainType);
      // values3.tags.push(Date);
      values3.tags.push("application/pdf");
      values3.tags.push(new Date().getTime());
      console.log("reached here");
      that.uploadDocumentforVollmachtpass(values3);
      console.log("reached here");
      console.log("saveonnext");
      values3.tags = [];
      resolve(true);

      console.log("saveonnext");
    });
  }
  uploadDocumentforVollmachtpass(values: any) {
    console.log("reached here");
    console.log("saveonnext");
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
    formData.append("olddocument_id", values.olddocument_id);
    // formData.append("created_by", values.created_by);
    formData.append("document_name", values.document_name);
    if (values.image !== "") {
      formData.append("document", values.image);
    }
    // let type3count1=parseInt(this.localData.type3.legalrepresentativeform2.length)+3;
    // if(type3count1==this.completeupload)
    // {
    //   formData.append("uploaddocument", '1');
    // }
    // else{
    //   formData.append("uploaddocument", '0');
    // }
    console.log("saveonnext");
    console.log("reached here");

    this.userService
      .callApiuploaddocumentnewsaveprogress(formData)
      .pipe(first())
      .subscribe(
        async (data) => {
          if (values.olddocument_id != '') {
            console.log("saveonnext");
            let oldcheckdocindex = this.documents.findIndex((result) => result.element.id == values.olddocument_id)
            console.log("indexxxxxxxxx" + oldcheckdocindex);
            console.log("indexxxxxxxxx" + JSON.stringify(this.documents));
            this.documents = data;
            console.log("indexxxxxxxxx" + JSON.stringify(this.documents));
          } console.log("saveonnext");
          this.uploadfile++;
          console.log("saveonnext" + this.uploadfile);
          console.log("uploadpassportdone" + this.uploadfile);
          // this.completeupload++;
          if (this.uploadfile == this.signeddoc.length) {
            console.log("saveonnext" + this.uploadfile);
            console.log("uploadpassportdone" + this.uploadfile);
            if (this.filearray.length != 0) {
              console.log("saveonnext" + this.uploadfile);
              await this._handleImageUpload();
            }
            else if (this.saveprogressonnext) {
              console.log("saveonnext" + this.uploadfile);
              $("#loaderouterid").css("display", "none");
              setTimeout(() => {
                this.showfifthstepsuccess = true;
              }, 500);

              this.saveprogressonnext = false;
            }
            else {
              console.log("saveonnext" + this.uploadfile);
              $("#loaderouterid").css("display", "none");
              this.showfifthstepsuccess = true;
              this.filearray = [];
              this.signeddoc = [];


            }

          }
        },
        (error) => {
          $("#loaderouterid").css("display", "none");

          console.log("Error", error);
        },
        () => { }
      );
  }
  DateRender() {

    console.log("demodate");
  }
  showCompanyType() {
    if (this.SecDomChange == "hide") {
      this.personalInfoFormGroup.patchValue({ companytype: " " });
    } else {
      this.personalInfoFormGroup.patchValue({
        companytype: this.personalInfoFormGroup.value.companytype,
      });
    }
  }

  showDocButtton() {
    if (this.SecDomChange == "hide") {
      this.docFromGroup.patchValue({ DocumentThree: " " });
    } else {
      this.docFromGroup.patchValue({
        companytype: this.docFromGroup.value.DocThree,
      });
    }
  }
  brokerDisplayFn(user: Broker): string {
    console.log("sadasdasdasd");
    console.log("befor" + this.edited);
    if (user.name != "") {
      this.edited = false;
      console.log("after" + this.edited);
      return user && user.name ? user.name : "";
    } else {
      this.edited = true;
      console.log("aftertest" + this.edited);
      return user && user.name ? user.name : "";
    }
  }
  patchlandValue(event) {
    console.log(event);
    console.log("patchnationalityValue" + this.myControlland.value);
    this.customerFormGroup.patchValue({
      countryOfResidence: this.myControlland.value,
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
  patchnationalityValue(event) {
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
  checkshares($event, index) {
    console.log(
      "buttonclick" +
      this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2
        .value[index].shares
    );
  }
  onSharesChange($event, index) {
    console.log(
      "shareschange" +
      this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2
        .value[index].shares
    );
    if (
      this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2
        .value[index].shares <= "100"
    ) {
      this.addmoredata = true;
      console.log(this.addmoredata);
    }
    else {
      this.addmoredata = false;
      console.log(this.addmoredata);
    }

    // if (
    //   this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2
    //     .value[index].shares < "95"
    // ) {
    //   this.sharesfield[index] = true;
    //   // this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2
    //   //   .get("shares1")
    //   //   .setValidators([Validators.required]);
    //   // this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2
    //   //   .get("shares1")
    //   //   .updateValueAndValidity();
    //   // const validators = [ Validators.required ];
    //   // this.form.addControl('optionBExtra', new FormControl('', validators));
    //     // let taskListArrays = this.secondcompanyaddressFormGroup2.get(
    //     //   "legalrepresentativeform2"
    //     // ) as FormArray;
    //     // taskListArrays.controls[index].get("shares1").setValidators([Validators.required]);
    //     // taskListArrays.controls[index].get("shares1").updateValueAndValidity();
    // } else {
    //   this.sharesfield[index] = false;
    //   //   this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2.get('shares1').clearValidators();
    //   //   this.secondcompanyaddressFormGroup2.controls.legalrepresentativeform2.get('shares1').updateValueAndValidity();
    // }

  }
  clearForms() {
    console.log("clear forms");
    let index = this.legalrepresentativeform().length;
    let index1 = this.legalrepresentativeform1().length;
    let index2 = this.legalrepresentativeform2().length;

    for (let i = index; i >= 0; i--) {
      console.log("index" + index);

      this.legalrepresentativeform().removeAt(i);
      console.log("clear forms" + i);
      console.log("length" + this.legalrepresentativeform().length);
    }
    for (let i = index1; i >= 0; i--) {
      this.legalrepresentativeform1().removeAt(i);

    }
    for (let i = index2; i >= 0; i--) {
      console.log("index2" + index);
      this.legalrepresentativeform2().removeAt(i);

      console.log("length2" + this.legalrepresentativeform2().length);

    }
    this.sharesvalue = 100;
    this.addedpersons = [];
    this.addedpersonsFirst = [];
    this.addedpersonsSecond = [];
    if (this.legalrepresentativeform().length == 0) {
      this.legalrepresentativeform().push(this.newlegalrepresentativeform());
    }
    if (this.legalrepresentativeform2().length == 0) {
      this.legalrepresentativeform2().push(this.newlegalrepresentativeform2());
    }
    //  this.legalrepresentativeform().push(this.newlegalrepresentativeform());
    //   this.legalrepresentativeform2().push(this.newlegalrepresentativeform2());


  }

  ThirdTypeDocValue() {

    console.log("ThirdTypeDoc" + this.ThirdTypeDoc.value);
    this.personalInfoFormGroup.patchValue({
      companytype: this.ThirdTypeDoc.value,
    });

    this.companytypenew = this.ThirdTypeDoc.value;
    this.checkfirststepData();
    if (this.companytypenew != 'Einzelunternehmen') {
      this.docFromGroup.get('DocThree').validator = <any>Validators.compose([Validators.required]);
    } else {
      this.docFromGroup.get('DocThree').clearValidators();
    }
    this.docFromGroup.get('DocThree').updateValueAndValidity();



    if (this.companytypenew == 'Einzelunternehmen') {
      this.defaultdoclength = 2;
    } else {
      this.defaultdoclength = 3;
    }
  }
  ThirdTypeDoc1Value(index) {
    console.log("ThirdTypeDoc1" + this.ThirdTypeDoc1.value);
    let taskListArrays = this.secondcompanyaddressFormGroup2.get(
      "legalrepresentativeform2"
    ) as FormArray;
    taskListArrays.controls[index].patchValue({
      companyType: this.ThirdTypeDoc1.value,
    });
    // this.personalInfoFormGroup.patchValue({
    //   companytype: this.ThirdTypeDoc1.value,
    // });

    // this.companytypenew = this.ThirdTypeDoc1.value;
  }
  getBrokersData() {
    this.userService.getUsers().subscribe(
      (userData: any) => {
        console.log("userData" + JSON.stringify(userData));
        // if success and error give response
        if (userData.status == "error") {
          this.error = userData.message;
        } else {
          let brokerList = [];
          for (let i = 0; i < userData.length; i++) {
            console.log("userDatanew" + JSON.stringify(userData));
            // console.log(userData[i].roles.includes('b2b') , userData[i].roles)
            if (userData[i].roles.includes("b2b")) {
              console.log("userDatanewwww" + userData[i].roles);
              brokerList.push({
                name:
                  userData[i].firstname +
                  " " +
                  userData[i].lastname +
                  "(" +
                  userData[i].customerno +
                  ")",
                value: userData[i].customerno,
              });
            }
          }
          this.brokerList = brokerList;
          this.getcurrentUser(this.id);
        }
      },
      (rejected) => {
        // console.log(rejected);
      }
    );

    // return brokerList;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsValue.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  get customerForm() {
    return this.customerFormGroup.controls;
  }
  showdata() {
    console.log("helloyhtrhyth");
  }


  async saveonnext(step: number) {
    console.log("showdisabledweiter1" + step)

    console.log("inside saveon next documents");
    console.log(this.documents);

    $("#loaderouterid").css("display", "block");

    setTimeout(() => {
      $("#loaderouterid").css("display", "none");
    }, 2000);

    if (step == 1) {

      this.patchvalues();
      this.showdisabledweiter1 = true;

      let datasaved = false;
      let data = {

        companyname: this.addressFormGroup.value.companyName,
        companytype: this.ThirdTypeDoc.value,
        strassa: this.addressFormGroup.value.street,
        strno: this.addressFormGroup.value.streetNumber,
        plz: this.addressFormGroup.value.postCode,
        city: this.addressFormGroup.value.city,
        additionalReference: this.addressFormGroup.value.additionalReference,
        current_country: this.addressFormGroup.value.countryOfResidence,

      };

      for (let i in data) {


        if (this.localData.hasOwnProperty(i)) {

          if (this.localData[i] == " " || this.localData[i] == "-") {
            if (data[i] != this.localData[i] && data[i] != '') {
              datasaved = false;
              break;
            }
            else {
              datasaved = true;
            }

          }
          else if (this.localData[i] != " " && this.localData[i] != "-") {
            if (data[i] == this.localData[i]) {
              console.log("if3disablesavebutton");

              datasaved = true;

            } else {
              datasaved = false;
              break;
            }
          }

        } else {

          datasaved = false;
          break;


        }
        console.log("datasaved" + datasaved)
      }
      this.showfirststepsuccess = true;
      if (datasaved) {
        setTimeout(() => {
          $("#firststepweiter").trigger("click");
          this.showfirststepsuccess = false;

        }, 100);


      } else {
        this.saveprogressonnext = true;
        let result = await this.saveprogress(step);
        console.log("saveonnext" + result);
        console.log("saveonnext" + this.saveprogressonnext);
        this.showfirststepsuccess = true;
        setTimeout(() => {
          $("#firststepweiter").trigger("click");
          this.showfirststepsuccess = false;
          //this.showfirststepsuccess=false;

        }, 500);

      }
      console.log("showdisabledweiter1" + this.showdisabledweiter1)

      this.showdisabledweiter1 = false;
      console.log("showdisabledweiter1" + this.showdisabledweiter1)

    }

    if (step == 2) {
      console.log("showdisabledweiter1" + this.showdisabledweiter1)
      this.showdisabledweiter1 = true;
      console.log("showdisabledweiter1" + this.showdisabledweiter1)
      let datasaved = false;
      let data = {


        title: this.livingaddressFormGroup.value.title,
        firstname: this.livingaddressFormGroup.value.firstname,
        lastname: this.livingaddressFormGroup.value.lastname,
        strassaliving: this.livingaddressFormGroup.value.streetliving,
        strnoliving: this.livingaddressFormGroup.value.streetNumberliving,
        plzliving: this.livingaddressFormGroup.value.postCodeliving,
        cityliving: this.livingaddressFormGroup.value.cityliving,
        additionalReferenceliving: this.livingaddressFormGroup.value.additionalReferenceliving,
        current_countryliving: this.livingaddressFormGroup.value.countryOfResidenceliving,
        dateofbirth: this.livingaddressFormGroup.value.dob,
        birth_place: this.livingaddressFormGroup.value.birthPlace,

      };

      for (let i in data) {


        if (this.localData.hasOwnProperty(i)) {

          if (this.localData[i] == " " || this.localData[i] == "-") {
            if (data[i] != this.localData[i] && data[i] != '') {
              datasaved = false;
              break;
            }
            else {
              datasaved = true;
            }

          }
          else if (this.localData[i] != " " && this.localData[i] != "-") {
            if (data[i] == this.localData[i]) {
              console.log("if3disablesavebutton");

              datasaved = true;

            } else {
              datasaved = false;
              break;
            }
          }
        } else {

          datasaved = false;
          break;


        }
        console.log("datasaved" + datasaved)
      }

      if (datasaved) {
        $("#secondstepweiter").trigger("click");
      } else {
        this.showdisabledweiter1 = true;
        this.saveprogressonnext = true;
        let result = await this.saveprogress(step);
        console.log("saveonnext" + result);
        console.log("saveonnext" + this.saveprogressonnext);
        this.showdisabledweiter1 = false;

        this.showsecondstepsuccess = true;
        setTimeout(() => {
          $("#secondstepweiter").trigger("click");
          this.showsecondstepsuccess = false;

        }, 500);
      }
      this.showdisabledweiter1 = false;
      console.log("showdisabledweiter1" + this.showdisabledweiter1)

    }
    if (step == 3) {

      console.log("showdisabledweiter1" + step)
      this.showdisabledweiter1 = true;
      let datasaved = false;
      let data = {


        type1: this.secondcompanyaddressFormGroup.value,
        type2: this.secondcompanyaddressFormGroup1.value,
        type3: this.secondcompanyaddressFormGroup2.value,


      };
      for (let i in data) {
        console.log("showdisabledweiter1" + step)

        if (this.localData.hasOwnProperty(i)) {

          if (JSON.stringify(data[i]) === JSON.stringify(this.localData[i])) {


            datasaved = true;

          }
          else {

            datasaved = false;
            break;
          }

        } else {

          datasaved = false;
          break;


        }

      }



      //this.skipfirstceo = this.addedpersonsFirst;
      //this.skipfirstceo.splice(0, 1);




      if (datasaved) {
        console.log("showdisabledweiter1" + step)

        console.log("showdisabledweiter1" + step)
        $("#thirdstepweiter").trigger("click");

        console.log("showdisabledweiter1" + step)

        console.log("showdisabledweiter1" + step)
      } else {
        console.log("showdisabledweiter1" + step)
        this.saveprogressonnext = true;
        let result = await this.saveprogress(step);
        console.log("saveonnext" + result);
        console.log("saveonnext" + this.saveprogressonnext);

        this.showthirdstepsuccess = true;

        setTimeout(() => {
          $("#thirdstepweiter").trigger("click");
          this.showthirdstepsuccess = false;

        }, 500);
      }
      console.log("showdisabledweiter1" + step)
      this.showdisabledweiter1 = false;
    }
    if (step == 4) {




      if (this.companytypenew == 'Einzelunternehmen' || this.companytypenew == 'Eingetragener Kaufmann (e.K.)') {
        if (this.companytypenew == 'Einzelunternehmen') {
          this.type3count1 = 2;
          console.log("type31" + this.type3count1)
        }
        else {
          //this.type3count1 =  3;
          this.type3count1 = 2;
          console.log("type31" + this.type3count1)
        }


      }
      else {
        this.type3count1 = parseInt(this.localData.type3.legalrepresentativeform2.length) + 3


        if (this.localData.hasOwnProperty('companytype')) {
          if (this.localData.companytype == 'Einzelunternehmen' || this.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {


          }
          else {

            let ceo_length = this.localData.type1.legalrepresentativeform.length;
            let shareholder_length = this.localData.type3.legalrepresentativeform2.length;

            let doc_check = false;

            if (this.documents.length > 0) {

              let ceo_done = 0;
              let shareholder_done = 0;
              let geschaft_done = 0;
              let akt_done = 0;
              for (let doc_length = 0; doc_length < this.documents.length; doc_length++) {

                let temp_ceo_length = parseInt(ceo_length) - 1;
                if (ceo_length > 1 && this.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                  ceo_done = 1;

                } else if (ceo_length == 1 && this.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person") {

                  ceo_done = 1;

                }

                for (let share_doc_length = 0; share_doc_length < this.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                  if (this.documents[doc_length].element.document_name ==
                    "Upload Ausweisdokument " + this.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                    " " + this.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                    shareholder_done += 1;
                  }

                }


                if (this.documents[doc_length].element.document_name == "Geschäftsanmeldung") {
                  geschaft_done = 1;
                }


                if (this.documents[doc_length].element.document_name == "Aktueller Auszug aus dem Handelsregister") {
                  akt_done = 1;
                }


              }

              if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done) {
                this.disableddocumentgmbh = false;
                doc_check = false;
              } else {
                this.disableddocumentgmbh = true;
                doc_check = true;
              }


            }



          }
        }











        //this.type3count1 = parseInt(this.localData.type3.legalrepresentativeform2.length) + 2 + this.addedpersonsFirst.length;
        console.log("type31" + this.type3count1)
        console.log("type31" + this.localData.type3.legalrepresentativeform2.length)
      }
      console.log("showdisabledweiter1" + this.showdisabledweiter1)
      this.showdisabledweiter1 = true;
      console.log("showdisabledweiter1" + this.showdisabledweiter1)
      if (this.documents != '') {
        console.log("singed array documents")
        let k = 1;
        for (let i = 0; i < this.documents.length; i++) {

          if (this.documents[i].element.document_name == "Ausweisdokument Vertretungsberechtigte Person") {
            this.docFromGroup.get('DocOne').clearValidators();

            this.docFromGroup.get('DocOne').updateValueAndValidity();
            //  this.docFromGroup.patchValue({DocOne: " "})
            let obj = this.saveddoc.find((o, i) => {

              if (o.id == 'Ausweisdokument Vertretungsberechtigte Person' && o.index == 'DocOne') {
                return true; // stop searching
              }
            });

            // if(obj){
            //   console.log("singed array" + JSON.stringify(this.saveddoc))
            // }else{

            this.previewid += 1;

            this.saveddoc.push({ id: "Ausweisdokument Vertretungsberechtigte Person", index: 'DocOne' + this.previewid });

            console.log("singed array" + JSON.stringify(this.saveddoc))
            //}
            console.log("localdataresult" + JSON.stringify(this.documents[i]));
            let StringTemple: string = '';
            let preview = "PerviewOne0";
            let ImageName;
            let docurl = this.documents[i].element.document_url;
            let extension = this.documents[i].element.document_unique_id.substr(this.documents[i].element.document_unique_id.lastIndexOf(".") + 1);



            this.previewsrc = docurl;
            this.previewidandsrc[this.previewid] = this.previewsrc;

            if (extension == "doc" || extension == "docx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/docx.png";
              /*
              StringTemple =
              '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
              "" +
              '<div class="removepreview" id="removepreviewid' +
              preview +
              '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
              "" +
              '<img class="imageThumb" style="width: 100%;height:210px" src="' +
              ImageName +
              '" title="' +
              this.documents[i].element.document_name +
              '"/>' +
              "<div> <b>Dokumentenname: " +
              //this.documents[i].element.document_name +
              "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[0]+
              "</b> </div></div>";
              */

              StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                '<div class="col-md-1">' +
                '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                '</div>' +

                '<div class="col-md-10" style="font-size:13.5px;">' +
                '<span><b>Dokumentenname: ' + "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[0] + '</b></span> ' +
                // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                '</div>' +

                '<div class="col-md-1">' +

                '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                '</div>' +

                '</div>';




              //$("#" + preview).html(StringTemple);

              //$("#" + preview).append(StringTemple);

              if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              } else {
                $("#" + preview).append(StringTemple);
              }







            } else if (extension == "xml" || extension == "svg") {


              StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                '<div class="col-md-1">' +
                '<embed class="imageThumb" style="height:30px;width:350%;" src="' +
                this.documents[i].element.document_url +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                '</div>' +

                '<div class="col-md-10" style="font-size:13.5px;">' +
                '<span><b>Dokumentenname: ' + "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[0] + '</b></span> ' +
                // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                '</div>' +

                '<div class="col-md-1">' +


                '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                '</div>' +

                '</div>';






              //$("#" + preview).html(StringTemple);

              //$("#" + preview).append(StringTemple);

              if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              } else {
                $("#" + preview).append(StringTemple);
              }

            }

            else if (extension == "pdf" || extension == "pdfx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/icons/file-upload-blue-pdf.svg";
              /*
              StringTemple =
              '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;cursor:pointer" id="div3">' +
              "" +
              '<div class="removepreview" id="removepreviewid' +
              preview +
              '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
              "" +
              '<img class="imageThumb" (click)="this.openpdfpopup(docurl)" id="buttonFirst" style="width: 100%;height:210px" src="' +
              ImageName +
              '" title="' +
              this.documents[i].element.document_name +
              '"/>' +
              "<div> <b>Dokumentenname: " +
              //this.documents[i].element.document_name +
              "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[0]+
              "</b> </div></div>";
              */


              // this.previewid += 1;

              // this.previewsrc = docurl;

              // this.previewidandsrc[this.previewid] = this.previewsrc;

              StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                '<div class="col-md-1">' +
                '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                '</div>' +

                '<div class="col-md-10" style="font-size:13.5px;">' +
                '<span><b>Dokumentenname: ' + "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[0] + '</b></span> ' +
                // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                '</div>' +

                '<div class="col-md-1">' +


                '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                '</div>' +

                '</div>';



              //$("#" + preview).html(StringTemple);

              //$("#" + preview).append(StringTemple);

              if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              } else {
                $("#" + preview).append(StringTemple);
              }

              const ButtonOne = document.getElementById("buttonFirst");
              // ButtonOne.addEventListener(
              //   "click",
              //   function () {
              //     removepreview("one");
              //   },
              //   false
              // );
              const removepreview = (e) => {
                if (e == "one") {
                  this.openpdfpopup(docurl);

                }
              }
            }

            else {
              /*
              StringTemple =
              '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
              "" +
              '<div class="removepreview" id="removepreviewid' +
              preview +
              '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
              "" +
              '<img class="imageThumb" style="width: 100%;height:210px" src="' +
              this.documents[i].element.document_url +
              '" title="' +
              this.documents[i].element.document_name +
              '"/>' +
              "<div> <b>Dokumentenname: " +
              //this.documents[i].element.document_name +
              "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[0]+
              "</b> </div></div>";
              */

              // this.previewid += 1;

              // this.previewsrc = docurl;

              // this.previewidandsrc[this.previewid] = this.previewsrc;


              StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                '<div class="col-md-1">' +
                '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
                this.documents[i].element.document_url +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                '</div>' +

                '<div class="col-md-10" style="font-size:13.5px;">' +
                '<span><b>Dokumentenname: ' + "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[0] + '</b></span> ' +
                // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                '</div>' +

                '<div class="col-md-1">' +


                '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                '</div>' +

                '</div>';


              //$("#" + preview).html(StringTemple);

              //$("#" + preview).append(StringTemple);

              if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              } else {
                $("#" + preview).append(StringTemple);
              }

            }

            $("#removepreviewid" + preview).click(function () {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select new file!!',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
            });

            let that = this;

            $('.previewImage').click(function (event) {
              previewData($(this).data('preview_id'), "Ausweisdokument Vertretungsberechtigte Person: " + that.addedpersonsFirst[0]);
              event.stopPropagation();
              event.stopImmediatePropagation();
            });

            const previewData = (j, modaltitle) => {
              let str = modaltitle
              let words = str.split(" ");
              let firstTwoWords = words.slice(0, 2);
              let result = firstTwoWords.join(" ");
              modaltitle = result
              console.log("previewData" + j);

              console.log("the source");
              console.log(this.previewidandsrc.length);
              console.log(this.previewidandsrc[j]);

              if (extension == "pdf" || extension == "pdfx" || extension == "xml" || extension == "svg") {

                $("#openpreviewmodel").trigger("click");
                this.open_modal('exampleModalpreview')

                $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + modaltitle);

                $("#showpreviewdownload").attr("href", this.previewidandsrc[j]);

                this.source = this.previewidandsrc[j];
                setTimeout(() => {
                  $("#showpreviewimg").attr("src", "");
                  $("#showpreviewimg").css("display", "none");

                  $("#showpreviewpdf").attr("src", "");
                  $("#showpreviewpdf").css("display", "block");
                  $("#showpreviewpdf").attr("src", this.previewidandsrc[j]);
                }, 1000);

              } else {
                $("#openpreviewmodel").trigger("click");
                this.open_modal('exampleModalpreview')

                $('#showpreviewtitle').html("<b>Dokumentenname: </b>" + modaltitle);

                $('#showpreviewdownload').attr('href', this.previewidandsrc[j]);

                $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + modaltitle);

                $("#showpreviewdownload").attr("href", this.previewidandsrc[j]);

                $('#showpreviewpdf').attr('src', '');
                $('#showpreviewpdf').css('display', 'none');

                $('#showpreviewimg').attr('src', '');
                $('#showpreviewimg').css('display', 'block');
                $('#showpreviewimg').attr('src', this.previewidandsrc[j]);
              }
            };



            if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              let data = {
                document_id: this.documents[i].element.id,
                document_name: this.documents[i].element.document_name,
              }

              this.userService.delete_registeration_document(data);

            }



            $(".removepreview").click(function (event) {


              Swal.fire({
                title: "Sind Sie sicher?",
                showCancelButton: true,
                confirmButtonText: "Ja",
                cancelButtonText: "Nein",
              }).then((result) => {
                if (result.value) {

                  let data = {
                    document_id: $(this).data('document_id'),
                    document_name: $(this).data('document_name')
                  }

                  that.userService.delete_registeration_document(data);

                  that.saveddoc.forEach((value, index) => {

                    if (value.id == "Ausweisdokument Vertretungsberechtigte Person" && value.index == 'DocOne' + $(this).data('preview_id')) that.saveddoc.splice(index, 1);

                  });



                  if (that.localData.hasOwnProperty('companytype')) {
                    if (that.localData.companytype == 'Einzelunternehmen' || that.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {


                    }
                    else {

                      let ceo_length = that.localData.type1.legalrepresentativeform.length;
                      let shareholder_length = that.localData.type3.legalrepresentativeform2.length;

                      let doc_check = false;

                      let ceo_done = 0;
                      let shareholder_done = 0;
                      let geschaft_done = 0;
                      let akt_done = 0;

                      if (that.saveddoc.length > 0) {


                        for (let doc_length = 0; doc_length < that.saveddoc.length; doc_length++) {

                          let temp_ceo_length = parseInt(ceo_length) - 1;
                          if (ceo_length > 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                            ceo_done = 1;

                          } else if (ceo_length == 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person") {

                            ceo_done = 1;

                          }


                          // if(this.saveddoc[doc_length].id == "passportpic"){
                          //   shareholder_done += 1;
                          // }



                          if (that.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                            geschaft_done = 1;
                          }


                          if (that.saveddoc[doc_length].id == "Aktueller Auszug aus dem Handelsregister") {
                            akt_done = 1;
                          }


                        }


                        for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                          for (let doc_length = 0; doc_length < that.signeddoc.length; doc_length++) {
                            if (that.signeddoc[doc_length].docname ==
                              that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                              " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                              shareholder_done += 1;
                              break;
                            }

                          }
                        }





                        if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done == 1) {
                          that.disableddocumentgmbh = false;
                        } else {
                          that.disableddocumentgmbh = true;
                        }



                      }

                      if (that.documents.length > 0) {

                        for (let doc_length = 0; doc_length < that.documents.length; doc_length++) {


                          for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                            if (that.documents[doc_length].element.document_name ==
                              "Upload Ausweisdokument " + that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                              " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                              shareholder_done += 1;
                            }

                          }


                        }

                        if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done) {
                          that.disableddocumentgmbh = false;

                        } else {
                          that.disableddocumentgmbh = true;

                        }


                      }






                    }
                  }






                  $(this).parent().parent().remove();
                  console.log("saved array" + JSON.stringify(that.saveddoc));

                } else {

                }
              });

              event.stopPropagation();
              event.stopImmediatePropagation();
            });



          }




          if (this.documents[i].element.document_name != "Ausweisdokument Vertretungsberechtigte Person" &&
            this.documents[i].element.document_name.indexOf("Ausweisdokument Vertretungsberechtigte Person") != -1
          ) {
            //this.docFromGroup.get('DocOne'+i).clearValidators();

            //this.docFromGroup.get('DocOne'+i).updateValueAndValidity();
            //  this.docFromGroup.patchValue({DocOne: " "})
            let obj = this.saveddoc.find((o, i) => {

              if (o.id != 'Ausweisdokument Vertretungsberechtigte Person' &&
                o.id.indexOf("Ausweisdokument Vertretungsberechtigte Person") != -1
                && o.index == 'DocOne' + i) {
                return true; // stop searching
              }
            });

            // if(obj){
            //   console.log("singed array" + JSON.stringify(this.saveddoc))
            // }else{
            //this.saveddoc.push({ id: "Ausweisdokument Vertretungsberechtigte Person"+i, index: 'DocOne'+i });

            this.previewid += 1;

            this.saveddoc.push({ id: this.documents[i].element.document_name, index: 'DocOne' + this.previewid });

            console.log("singed array" + JSON.stringify(this.saveddoc))

            let temp_doc_name = this.documents[i].element.document_name;

            let indexxx = temp_doc_name.replace("Ausweisdokument Vertretungsberechtigte Person", "");
            //}
            console.log("localdataresult" + JSON.stringify(this.documents[i]));
            let StringTemple: string = '';
            let preview = "PerviewOne" + indexxx; k = k + 1;
            let ImageName;
            let docurl = this.documents[i].element.document_url;
            let extension = this.documents[i].element.document_unique_id.substr(this.documents[i].element.document_unique_id.lastIndexOf(".") + 1);

            this.previewsrc = docurl;
            this.previewidandsrc[this.previewid] = this.previewsrc;

            if (extension == "doc" || extension == "docx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/docx.png";
              /*
              StringTemple =
              '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
              "" +
              '<div class="removepreview" id="removepreviewid' +
              preview +
              '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
              "" +
              '<img class="imageThumb" style="width: 100%;height:210px" src="' +
              ImageName +
              '" title="' +
              this.documents[i].element.document_name +
              '"/>' +
              "<div> <b>Dokumentenname: " +
              //this.documents[i].element.document_name +
              "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[k-1]+
              "</b> </div></div>";
              */


              StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                '<div class="col-md-1">' +
                '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                '</div>' +

                '<div class="col-md-10" style="font-size:13.5px;">' +
                '<span><b>Dokumentenname: ' + "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[indexxx] + '</b></span> ' +
                // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                '</div>' +

                '<div class="col-md-1">' +


                '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                '</div>' +

                '</div>';



              //$("#" + preview).html(StringTemple);

              //$("#" + preview).append(StringTemple);

              if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              } else {
                $("#" + preview).append(StringTemple);
              }



            } else if (extension == "xml" || extension == "svg") {



              StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                '<div class="col-md-1">' +
                '<embed class="imageThumb" style="height:30px;width:350%;" src="' +
                this.documents[i].element.document_url +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                '</div>' +

                '<div class="col-md-10" style="font-size:13.5px;">' +
                '<span><b>Dokumentenname: ' + "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[indexxx] + '</b></span> ' +
                // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                '</div>' +

                '<div class="col-md-1">' +


                '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                '</div>' +

                '</div>';





              //$("#" + preview).html(StringTemple);

              //$("#" + preview).append(StringTemple);

              if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              } else {
                $("#" + preview).append(StringTemple);
              }

            }

            else if (extension == "pdf" || extension == "pdfx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/icons/file-upload-blue-pdf.svg";
              /*
              StringTemple =
              '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;cursor:pointer" id="div3">' +
              "" +
              '<div class="removepreview" id="removepreviewid' +
              preview +
              '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
              "" +
              '<img class="imageThumb"  id="buttonFirst1" style="width: 100%;height:210px" src="' +
              ImageName +
              '" title="' +
              this.documents[i].element.document_name +
              '"/>' +
              "<div> <b>Dokumentenname: " +
              //this.documents[i].element.document_name +
              "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[k-1]+
              "</b> </div></div>";
              */

              StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                '<div class="col-md-1">' +
                '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                '</div>' +

                '<div class="col-md-10" style="font-size:13.5px;">' +
                '<span><b>Dokumentenname: ' + "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[indexxx] + '</b></span> ' +
                // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                '</div>' +

                '<div class="col-md-1">' +


                '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                '</div>' +

                '</div>';


              //$("#" + preview).html(StringTemple);

              //$("#" + preview).append(StringTemple);


              if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              } else {
                $("#" + preview).append(StringTemple);
              }

              const ButtonOne = document.getElementById("buttonFirst1");
              // ButtonOne.addEventListener(
              //   "click",
              //   function () {
              //     removepreview("one");
              //   },
              //   false
              // );
              const removepreview = (e) => {
                if (e == "one") {
                  this.openpdfpopup(docurl);

                }
              }
            }

            else {
              /*
              StringTemple =
              '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
              "" +
              '<div class="removepreview" id="removepreviewid' +
              preview +
              '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
              "" +
              '<img class="imageThumb" style="width: 100%;height:210px" src="' +
              this.documents[i].element.document_url +
              '" title="' +
              this.documents[i].element.document_name +
              '"/>' +
              "<div> <b>Dokumentenname: " +
              //this.documents[i].element.document_name +
              "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[k-1]+
              "</b> </div></div>";
              */


              StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                '<div class="col-md-1">' +
                '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
                this.documents[i].element.document_url +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                '</div>' +

                '<div class="col-md-10" style="font-size:13.5px;">' +
                '<span><b>Dokumentenname: ' + "Ausweisdokument Vertretungsberechtigte Person: " + this.addedpersonsFirst[indexxx] + '</b></span> ' +
                // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                '</div>' +

                '<div class="col-md-1">' +


                '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                '</div>' +

                '</div>';


              //$("#" + preview).html(StringTemple);

              //$("#" + preview).append(StringTemple);

              if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              } else {
                $("#" + preview).append(StringTemple);
              }

            }

            $("#removepreviewid" + preview).click(function () {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select new file!!',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
            });




            let that = this;



            $('.previewImage').click(function (event) {
              previewData($(this).data('preview_id'), "Ausweisdokument Vertretungsberechtigte Person: " + that.addedpersonsFirst[indexxx]);
              event.stopPropagation();
              event.stopImmediatePropagation();
            });

            const previewData = (j, modaltitle) => {
              let str = modaltitle
              let words = str.split(" ");
              let firstTwoWords = words.slice(0, 2);
              let result = firstTwoWords.join(" ");
              modaltitle = result
              console.log("previewData" + j);

              console.log("the source");
              console.log(this.previewidandsrc.length);
              console.log(this.previewidandsrc[j]);


              if (extension == "pdf" || extension == "pdfx" || extension == "xml" || extension == "svg") {

                $("#openpreviewmodel").trigger("click");
                this.open_modal('exampleModalpreview')

                $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + modaltitle);

                $("#showpreviewdownload").attr("href", this.previewidandsrc[j]);

                this.source = this.previewidandsrc[j];
                setTimeout(() => {
                  $("#showpreviewimg").attr("src", "");
                  $("#showpreviewimg").css("display", "none");

                  $("#showpreviewpdf").attr("src", "");
                  $("#showpreviewpdf").css("display", "block");
                  $("#showpreviewpdf").attr("src", this.previewidandsrc[j]);
                }, 1000);

              } else {

                $("#openpreviewmodel").trigger("click");
                this.open_modal('exampleModalpreview')

                $('#showpreviewtitle').html("<b>Dokumentenname: </b>" + modaltitle);

                $('#showpreviewdownload').attr('href', this.previewidandsrc[j]);

                $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + modaltitle);

                $("#showpreviewdownload").attr("href", this.previewidandsrc[j]);

                $('#showpreviewpdf').attr('src', '');
                $('#showpreviewpdf').css('display', 'none');

                $('#showpreviewimg').attr('src', '');
                $('#showpreviewimg').css('display', 'block');
                $('#showpreviewimg').attr('src', this.previewidandsrc[j]);
              }
            };


            if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {
              let data = {
                document_id: this.documents[i].element.id,
                document_name: this.documents[i].element.document_name,
              }

              that.userService.delete_registeration_document(data);

            }





            $(".removepreview").click(function (event) {

              Swal.fire({
                title: "Sind Sie sicher?",
                showCancelButton: true,
                confirmButtonText: "Ja",
                cancelButtonText: "Nein",
              }).then((result) => {
                if (result.value) {

                  let data = {
                    document_id: $(this).data('document_id'),
                    document_name: $(this).data('document_name')
                  }

                  that.userService.delete_registeration_document(data);

                  that.saveddoc.forEach((value, index) => {

                    if (value.id == that.documents[i].element.document_name && value.index == 'DocOne' + $(this).data('preview_id')) that.saveddoc.splice(index, 1);

                  });




                  if (that.localData.hasOwnProperty('companytype')) {
                    if (that.localData.companytype == 'Einzelunternehmen' || that.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {


                    }
                    else {

                      let ceo_length = that.localData.type1.legalrepresentativeform.length;
                      let shareholder_length = that.localData.type3.legalrepresentativeform2.length;

                      let doc_check = false;

                      let ceo_done = 0;
                      let shareholder_done = 0;
                      let geschaft_done = 0;
                      let akt_done = 0;

                      if (that.saveddoc.length > 0) {


                        for (let doc_length = 0; doc_length < that.saveddoc.length; doc_length++) {

                          let temp_ceo_length = parseInt(ceo_length) - 1;
                          if (ceo_length > 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                            ceo_done = 1;

                          } else if (ceo_length == 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person") {

                            ceo_done = 1;

                          }


                          // if(this.saveddoc[doc_length].id == "passportpic"){
                          //   shareholder_done += 1;
                          // }



                          if (that.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                            geschaft_done = 1;
                          }


                          if (that.saveddoc[doc_length].id == "Aktueller Auszug aus dem Handelsregister") {
                            akt_done = 1;
                          }


                        }


                        for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                          for (let doc_length = 0; doc_length < that.signeddoc.length; doc_length++) {
                            if (that.signeddoc[doc_length].docname ==
                              that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                              " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                              shareholder_done += 1;
                              break;
                            }

                          }
                        }





                        if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done == 1) {
                          that.disableddocumentgmbh = false;
                        } else {
                          that.disableddocumentgmbh = true;
                        }



                      }

                      if (that.documents.length > 0) {

                        for (let doc_length = 0; doc_length < that.documents.length; doc_length++) {


                          for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                            if (that.documents[doc_length].element.document_name ==
                              "Upload Ausweisdokument " + that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                              " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                              shareholder_done += 1;
                            }

                          }


                        }

                        if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done) {
                          that.disableddocumentgmbh = false;

                        } else {
                          that.disableddocumentgmbh = true;

                        }


                      }






                    }
                  }






                  $(this).parent().parent().remove();
                  console.log("saved array" + JSON.stringify(that.saveddoc));

                } else {

                }
              });

              event.stopPropagation();
              event.stopImmediatePropagation();
            });

          }



          if (this.documents[i].element.document_name == "Geschäftsanmeldung") {
            this.docFromGroup.get('DocTwo').clearValidators();

            this.docFromGroup.get('DocTwo').updateValueAndValidity();
            // this.docFromGroup.patchValue({DocTwo: " "})
            let obj = this.saveddoc.find((o, i) => {

              if (o.id == 'Geschäftsanmeldung' && o.index == 'DocTwo') {
                return true; // stop searching
              }
            });

            // if(obj){
            //   console.log("singed array" + JSON.stringify(this.saveddoc))
            // }else{

            this.previewid += 1;

            this.saveddoc.push({ id: "Geschäftsanmeldung", index: 'DocTwo' + this.previewid });

            console.log("singed array" + JSON.stringify(this.saveddoc))
            //}
            console.log("localdataresult" + JSON.stringify(this.documents[i]));
            let StringTemple: string = '';
            let preview = "PerviewTwo";
            let ImageName;
            let docurl = this.documents[i].element.document_url;
            let extension = this.documents[i].element.document_unique_id.substr(this.documents[i].element.document_unique_id.lastIndexOf(".") + 1);

            this.previewsrc = docurl;
            this.previewidandsrc[this.previewid] = this.previewsrc;

            if (extension == "doc" || extension == "docx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/docx.png";

              /*
              StringTemple =
              '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
              "" +
              '<div class="removepreview" id="removepreviewid' +
              preview +
              '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
              "" +
              '<img class="imageThumb" style="width: 100%;height:210px" src="' +
              ImageName +
              '" title="' +
              this.documents[i].element.document_name +
              '"/>' +
              "<div> <b>Dokumentenname: " +
              this.documents[i].element.document_name + " Der "+this.addressFormGroup.controls.companyName.value+
              "</b> </div></div>";
              */


              StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                '<div class="col-md-1">' +
                '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                '</div>' +

                '<div class="col-md-10" style="font-size:14px;">' +
                '<span><b>Dokumentenname: ' + "Gewerbeanmeldung Der " + this.addressFormGroup.controls.companyName.value + '</b></span> ' +
                // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                '</div>' +

                '<div class="col-md-1">' +


                '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                '</div>' +

                '</div>';


              //$("#" + preview).html(StringTemple);

              //$("#" + preview).append(StringTemple);

              if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              } else {
                $("#" + preview).append(StringTemple);
              }

            } else if (extension == "xml" || extension == "svg") {


              StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                '<div class="col-md-1">' +
                '<embed class="imageThumb" style="height:30px;width:350%;" src="' +
                this.documents[i].element.document_url +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                '</div>' +

                '<div class="col-md-10" style="font-size:14px;">' +
                '<span><b>Dokumentenname: ' + "Gewerbeanmeldung Der " + this.addressFormGroup.controls.companyName.value + '</b></span> ' +
                // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                '</div>' +

                '<div class="col-md-1">' +


                '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                '</div>' +

                '</div>';





              //$("#" + preview).html(StringTemple);

              //$("#" + preview).append(StringTemple);

              if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              } else {
                $("#" + preview).append(StringTemple);
              }


            }

            else if (extension == "pdf" || extension == "pdfx") {

              console.log("extension StringTemple" + extension);
              ImageName = "../assets/icons/file-upload-blue-pdf.svg";
              /*
              StringTemple =
              '<div class="pip" id="buttonSecond" style="width: 290px;display: inline-block;margin: 8px;cursor:pointer" id="div3">' +
              "" +
              '<div class="removepreview" id="removepreviewid' +
              preview +
              '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
              "" +
              '<img class="imageThumb" style="width: 100%;height:210px" src="' +
              ImageName +
              '" title="' +
              this.documents[i].element.document_name +
              '"/>' +
              "<div> <b>Dokumentenname: " +
              this.documents[i].element.document_name + " Der "+this.addressFormGroup.controls.companyName.value+
              "</b> </div></div>";
              */


              StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                '<div class="col-md-1">' +
                '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                '</div>' +

                '<div class="col-md-10" style="font-size:14px;">' +
                '<span><b>Dokumentenname: ' + "Gewerbeanmeldung Der " + this.addressFormGroup.controls.companyName.value + '</b></span> ' +
                // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                '</div>' +

                '<div class="col-md-1">' +


                '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                '</div>' +

                '</div>';


              //$("#" + preview).html(StringTemple);

              //$("#" + preview).append(StringTemple);

              if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              } else {
                $("#" + preview).append(StringTemple);
              }

              const ButtonOne = document.getElementById("buttonSecond");
              // ButtonOne.addEventListener(
              //   "click",
              //   function () {
              //     removepreview("one");
              //   },
              //   false
              // );
              const removepreview = (e) => {
                if (e == "one") {
                  this.openpdfpopup(docurl);

                }
              }
            }

            else {
              /*
              StringTemple =
              '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
              "" +
              '<div class="removepreview" id="removepreviewid' +
              preview +
              '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
              "" +
              '<img class="imageThumb" style="width: 100%;height:210px" src="' +
              this.documents[i].element.document_url +
              '" title="' +
              this.documents[i].element.document_name +
              '"/>' +
              "<div> <b>Dokumentenname: " +
              this.documents[i].element.document_name + " Der "+this.addressFormGroup.controls.companyName.value+
              "</b> </div></div>";
              */


              StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                '<div class="col-md-1">' +
                '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
                this.documents[i].element.document_url +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                '</div>' +

                '<div class="col-md-10" style="font-size:14px;">' +
                '<span><b>Dokumentenname: ' + "Gewerbeanmeldung Der " + this.addressFormGroup.controls.companyName.value + '</b></span> ' +
                // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                '</div>' +

                '<div class="col-md-1">' +


                '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                '</div>' +

                '</div>';


              //$("#" + preview).html(StringTemple);

              //$("#" + preview).append(StringTemple);

              if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              } else {
                $("#" + preview).append(StringTemple);
              }

            }
            $("#removepreviewid" + preview).click(function () {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select new file!!',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
            });



            let that = this;

            $('.previewImage').click(function (event) {
              //previewData($(this).data('preview_id'),that.documents[i].element.document_name + " Der "+that.addressFormGroup.controls.companyName.value);
              previewData($(this).data('preview_id'), "Gewerbeanmeldung Der " + that.addressFormGroup.controls.companyName.value);
              event.stopPropagation();
              event.stopImmediatePropagation();
            });

            const previewData = (j, modaltitle) => {
              let str = modaltitle
              let words = str.split(" ");
              let firstTwoWords = words.slice(0, 2);
              let result = firstTwoWords.join(" ");
              modaltitle = result
              console.log("previewData" + j);

              console.log("the source");
              console.log(this.previewidandsrc.length);
              console.log(this.previewidandsrc[j]);

              if (extension == "pdf" || extension == "pdfx" || extension == "xml" || extension == "svg") {

                $("#openpreviewmodel").trigger("click");
                this.open_modal('exampleModalpreview')

                $('#showpreviewtitle').html("<b>Dokumentenname: </b>" + modaltitle);

                $('#showpreviewdownload').attr('href', this.previewidandsrc[j]);

                this.source = this.previewidandsrc[j];
                setTimeout(() => {
                  $("#showpreviewimg").attr("src", "");
                  $("#showpreviewimg").css("display", "none");

                  $("#showpreviewpdf").attr("src", "");
                  $("#showpreviewpdf").css("display", "block");
                  $("#showpreviewpdf").attr("src", this.previewidandsrc[j]);
                }, 1000);

              } else {

                $("#openpreviewmodel").trigger("click");
                this.open_modal('exampleModalpreview')

                $('#showpreviewtitle').html("<b>Dokumentenname: </b>" + modaltitle);

                $('#showpreviewdownload').attr('href', this.previewidandsrc[j]);

                $('#showpreviewpdf').attr('src', '');
                $('#showpreviewpdf').css('display', 'none');

                $('#showpreviewimg').attr('src', '');
                $('#showpreviewimg').css('display', 'block');
                $('#showpreviewimg').attr('src', this.previewidandsrc[j]);
              }
            };



            if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

              let data = {
                document_id: this.documents[i].element.id,
                document_name: this.documents[i].element.document_name,
              }

              that.userService.delete_registeration_document(data);

            }





            $(".removepreview").click(function (event) {

              Swal.fire({
                title: "Sind Sie sicher?",
                showCancelButton: true,
                confirmButtonText: "Ja",
                cancelButtonText: "Nein",
              }).then((result) => {
                if (result.value) {

                  let data = {
                    document_id: $(this).data('document_id'),
                    document_name: $(this).data('document_name')
                  }

                  that.userService.delete_registeration_document(data);

                  that.saveddoc.forEach((value, index) => {

                    if (value.id == that.documents[i].element.document_name && value.index == 'DocTwo' + $(this).data('preview_id')) that.saveddoc.splice(index, 1);

                  });




                  if (that.localData.hasOwnProperty('companytype')) {
                    if (that.localData.companytype == 'Einzelunternehmen' || that.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {


                    }
                    else {

                      let ceo_length = that.localData.type1.legalrepresentativeform.length;
                      let shareholder_length = that.localData.type3.legalrepresentativeform2.length;

                      let doc_check = false;

                      let ceo_done = 0;
                      let shareholder_done = 0;
                      let geschaft_done = 0;
                      let akt_done = 0;

                      if (that.saveddoc.length > 0) {


                        for (let doc_length = 0; doc_length < that.saveddoc.length; doc_length++) {

                          let temp_ceo_length = parseInt(ceo_length) - 1;
                          if (ceo_length > 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                            ceo_done = 1;

                          } else if (ceo_length == 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person") {

                            ceo_done = 1;

                          }


                          // if(this.saveddoc[doc_length].id == "passportpic"){
                          //   shareholder_done += 1;
                          // }



                          if (that.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                            geschaft_done = 1;
                          }


                          if (that.saveddoc[doc_length].id == "Aktueller Auszug aus dem Handelsregister") {
                            akt_done = 1;
                          }


                        }


                        for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                          for (let doc_length = 0; doc_length < that.signeddoc.length; doc_length++) {
                            if (that.signeddoc[doc_length].docname ==
                              that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                              " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                              shareholder_done += 1;
                              break;
                            }

                          }
                        }





                        if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done == 1) {
                          that.disableddocumentgmbh = false;
                        } else {
                          that.disableddocumentgmbh = true;
                        }



                      }

                      if (that.documents.length > 0) {

                        for (let doc_length = 0; doc_length < that.documents.length; doc_length++) {


                          for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                            if (that.documents[doc_length].element.document_name ==
                              "Upload Ausweisdokument " + that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                              " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                              shareholder_done += 1;
                            }

                          }


                        }

                        if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done) {
                          that.disableddocumentgmbh = false;

                        } else {
                          that.disableddocumentgmbh = true;

                        }


                      }






                    }
                  }






                  $(this).parent().parent().remove();
                  console.log("saved array" + JSON.stringify(that.saveddoc));

                } else {

                }
              });



              event.stopPropagation();
              event.stopImmediatePropagation();
            });


          }
          if (this.companytypenew != "Einzelunternehmen") {
            if (this.documents[i].element.document_name == "Aktueller Auszug aus dem Handelsregister") {
              this.docFromGroup.get('DocThree').clearValidators();

              this.docFromGroup.get('DocThree').updateValueAndValidity();
              // this.docFromGroup.patchValue({DocThree: " "})
              let obj = this.saveddoc.find((o, i) => {

                if (o.id == 'Aktueller Auszug aus dem Handelsregister' && o.index == 'DocThree') {
                  return true; // stop searching
                }
              });

              // if(obj){
              //   console.log("singed array" + JSON.stringify(this.saveddoc))
              // }else{

              this.previewid += 1;
              this.saveddoc.push({ id: "Aktueller Auszug aus dem Handelsregister", index: 'DocThree' + this.previewid });

              console.log("singed array" + JSON.stringify(this.saveddoc))
              // }
              console.log("localdataresult" + JSON.stringify(this.documents[i]));
              let StringTemple: string = '';
              let preview = "PerviewThree";
              let ImageName;
              let docurl = this.documents[i].element.document_url;
              let extension = this.documents[i].element.document_unique_id.substr(this.documents[i].element.document_unique_id.lastIndexOf(".") + 1);

              this.previewsrc = docurl;
              this.previewidandsrc[this.previewid] = this.previewsrc;

              if (extension == "doc" || extension == "docx") {

                console.log("extension StringTemple" + extension);
                ImageName = "../assets/docx.png";
                /*
                StringTemple =
                '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name + " Der "+this.addressFormGroup.controls.companyName.value+
                "</b> </div></div>";
                */


                StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                  '<div class="col-md-1">' +
                  '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
                  ImageName +
                  '" title="' +
                  this.documents[i].element.document_name +
                  '"/>' +
                  '</div>' +

                  '<div class="col-md-10" style="font-size:13.5px;">' +
                  '<span><b>Dokumentenname: ' + this.documents[i].element.document_name + " Der " + this.addressFormGroup.controls.companyName.value + '</b></span> ' +
                  // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                  '</div>' +

                  '<div class="col-md-1">' +


                  '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                  this.previewid +
                  '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                  '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                  '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                  '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                  '</div>' +

                  '</div>';


                //$("#" + preview).html(StringTemple);

                //$("#" + preview).append(StringTemple);

                if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

                } else {
                  $("#" + preview).append(StringTemple);
                }

              } else if (extension == "xml" || extension == "svg") {


                StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                  '<div class="col-md-1">' +
                  '<embed class="imageThumb" style="height:30px;width:350%;" src="' +
                  this.documents[i].element.document_url +
                  '" title="' +
                  this.documents[i].element.document_name +
                  '"/>' +
                  '</div>' +

                  '<div class="col-md-10" style="font-size:13.5px;">' +
                  '<span><b>Dokumentenname: ' + this.documents[i].element.document_name + " Der " + this.addressFormGroup.controls.companyName.value + '</b></span> ' +
                  // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                  '</div>' +

                  '<div class="col-md-1">' +


                  '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                  this.previewid +
                  '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                  '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                  '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                  '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                  '</div>' +

                  '</div>';





                //$("#" + preview).html(StringTemple);

                //$("#" + preview).append(StringTemple);

                if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

                } else {
                  $("#" + preview).append(StringTemple);
                }

              }

              else if (extension == "pdf" || extension == "pdfx") {

                console.log("extension StringTemple" + extension);
                ImageName = "../assets/icons/file-upload-blue-pdf.svg";
                /*
                StringTemple =
                '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;cursor:pointer" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb"  id="buttonThird" style="width: 100%;height:210px" src="' +
                ImageName +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name + " Der "+this.addressFormGroup.controls.companyName.value+
                "</b> </div></div>";
                */


                StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                  '<div class="col-md-1">' +
                  '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
                  ImageName +
                  '" title="' +
                  this.documents[i].element.document_name +
                  '"/>' +
                  '</div>' +

                  '<div class="col-md-10" style="font-size:13.5px;">' +
                  '<span><b>Dokumentenname: ' + this.documents[i].element.document_name + " Der " + this.addressFormGroup.controls.companyName.value + '</b></span> ' +
                  // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                  '</div>' +

                  '<div class="col-md-1">' +


                  '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                  this.previewid +
                  '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                  '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                  '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                  '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                  '</div>' +

                  '</div>';


                //$("#" + preview).html(StringTemple);

                //$("#" + preview).append(StringTemple);

                if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

                } else {
                  $("#" + preview).append(StringTemple);
                }

                const ButtonOne = document.getElementById("buttonThird");
                // ButtonOne.addEventListener(
                //   "click",
                //   function () {
                //     removepreview("one");
                //   },
                //   false
                // );
                const removepreview = (e) => {
                  if (e == "one") {
                    this.openpdfpopup(docurl);

                  }
                }
              }

              else {
                /*
                StringTemple =
                '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
                "" +
                '<div class="removepreview" id="removepreviewid' +
                preview +
                '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                "" +
                '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                this.documents[i].element.document_url +
                '" title="' +
                this.documents[i].element.document_name +
                '"/>' +
                "<div> <b>Dokumentenname: " +
                this.documents[i].element.document_name + " Der "+this.addressFormGroup.controls.companyName.value+
                "</b> </div></div>";
                */


                StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                  '<div class="col-md-1">' +
                  '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
                  this.documents[i].element.document_url +
                  '" title="' +
                  this.documents[i].element.document_name +
                  '"/>' +
                  '</div>' +

                  '<div class="col-md-10" style="font-size:13.5px;">' +
                  '<span><b>Dokumentenname: ' + this.documents[i].element.document_name + " Der " + this.addressFormGroup.controls.companyName.value + '</b></span> ' +
                  // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                  '</div>' +

                  '<div class="col-md-1">' +


                  '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewid + '" id="removepreviewid' +
                  this.previewid +
                  '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                  '  <div class="previewImage" data-preview_id="' + this.previewid + '" id="previewimage' + this.previewid +
                  '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                  '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                  '</div>' +

                  '</div>';


                //$("#" + preview).html(StringTemple);

                //$("#" + preview).append(StringTemple);

                if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

                } else {
                  $("#" + preview).append(StringTemple);
                }

              }
              $("#removepreviewid" + preview).click(function () {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Select new file!!',
                  // footer: '<a href="">Why do I have this issue?</a>'
                })
              });




              let that = this;

              $('.previewImage').click(function (event) {
                previewData($(this).data('preview_id'), that.documents[i].element.document_name + " Der " + that.addressFormGroup.controls.companyName.value);
                event.stopPropagation();
                event.stopImmediatePropagation();
              });

              const previewData = (j, modaltitle) => {
                let str = modaltitle
                let words = str.split(" ");
                let firstTwoWords = words.slice(0, 2);
                let result = firstTwoWords.join(" ");
                modaltitle = result
                console.log("previewData" + j);

                console.log("the source");
                console.log(this.previewidandsrc.length);
                console.log(this.previewidandsrc[j]);



                if (extension == "pdf" || extension == "pdfx" || extension == "xml" || extension == "svg") {

                  $("#openpreviewmodel").trigger("click");
                  this.open_modal('exampleModalpreview')

                  $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + modaltitle);

                  $("#showpreviewdownload").attr("href", this.previewidandsrc[j]);

                  this.source = this.previewidandsrc[j];
                  setTimeout(() => {
                    $("#showpreviewimg").attr("src", "");
                    $("#showpreviewimg").css("display", "none");

                    $("#showpreviewpdf").attr("src", "");
                    $("#showpreviewpdf").css("display", "block");
                    $("#showpreviewpdf").attr("src", this.previewidandsrc[j]);
                  }, 1000);
                } else {
                  $("#openpreviewmodel").trigger("click");
                  this.open_modal('exampleModalpreview')

                  $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + modaltitle);

                  $("#showpreviewdownload").attr("href", this.previewidandsrc[j]);

                  $('#showpreviewpdf').attr('src', '');
                  $('#showpreviewpdf').css('display', 'none');

                  $('#showpreviewimg').attr('src', '');
                  $('#showpreviewimg').css('display', 'block');
                  $('#showpreviewimg').attr('src', this.previewidandsrc[j]);
                }
              };


              if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {
                let data = {
                  document_id: this.documents[i].element.id,
                  document_name: this.documents[i].element.document_name,
                }

                that.userService.delete_registeration_document(data);
              }





              $(".removepreview").click(function (event) {



                Swal.fire({
                  title: "Sind Sie sicher?",
                  showCancelButton: true,
                  confirmButtonText: "Ja",
                  cancelButtonText: "Nein",
                }).then((result) => {
                  if (result.value) {

                    let data = {
                      document_id: $(this).data('document_id'),
                      document_name: $(this).data('document_name')
                    }

                    that.userService.delete_registeration_document(data);

                    that.saveddoc.forEach((value, index) => {

                      if (value.id == that.documents[i].element.document_name && value.index == 'DocThree' + $(this).data('preview_id')) that.saveddoc.splice(index, 1);

                    });




                    if (that.localData.hasOwnProperty('companytype')) {
                      if (that.localData.companytype == 'Einzelunternehmen' || that.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {


                      }
                      else {

                        let ceo_length = that.localData.type1.legalrepresentativeform.length;
                        let shareholder_length = that.localData.type3.legalrepresentativeform2.length;

                        let doc_check = false;

                        let ceo_done = 0;
                        let shareholder_done = 0;
                        let geschaft_done = 0;
                        let akt_done = 0;

                        if (that.saveddoc.length > 0) {


                          for (let doc_length = 0; doc_length < that.saveddoc.length; doc_length++) {

                            let temp_ceo_length = parseInt(ceo_length) - 1;
                            if (ceo_length > 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                              ceo_done = 1;

                            } else if (ceo_length == 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person") {

                              ceo_done = 1;

                            }


                            // if(this.saveddoc[doc_length].id == "passportpic"){
                            //   shareholder_done += 1;
                            // }



                            if (that.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                              geschaft_done = 1;
                            }


                            if (that.saveddoc[doc_length].id == "Aktueller Auszug aus dem Handelsregister") {
                              akt_done = 1;
                            }


                          }


                          for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                            for (let doc_length = 0; doc_length < that.signeddoc.length; doc_length++) {
                              if (that.signeddoc[doc_length].docname ==
                                that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                                " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                                shareholder_done += 1;
                                break;
                              }

                            }
                          }





                          if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done == 1) {
                            that.disableddocumentgmbh = false;
                          } else {
                            that.disableddocumentgmbh = true;
                          }



                        }

                        if (that.documents.length > 0) {

                          for (let doc_length = 0; doc_length < that.documents.length; doc_length++) {


                            for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                              if (that.documents[doc_length].element.document_name ==
                                "Upload Ausweisdokument " + that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                                " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                                shareholder_done += 1;
                              }

                            }


                          }

                          if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done) {
                            that.disableddocumentgmbh = false;

                          } else {
                            that.disableddocumentgmbh = true;

                          }


                        }






                      }
                    }



                    $(this).parent().parent().remove();
                    console.log("saved array" + JSON.stringify(that.saveddoc));

                  } else {

                  }
                });

                event.stopPropagation();
                event.stopImmediatePropagation();
              });


            }
          }
          if (this.companytypenew != 'Einzelunternehmen' && this.companytypenew != 'Eingetragener Kaufmann (e.K.)') {

            for (let m = 0; m < this.legalrepresentativeform2().length; m++) {

              let name1 = "Upload Ausweisdokument" + " " + this.secondcompanyaddressFormGroup2.value.legalrepresentativeform2[m].firstname + " " + this.secondcompanyaddressFormGroup2.value.legalrepresentativeform2[m].lastname;

              if (this.documents[i].element.document_name == name1) {
                let obj = this.saveddoc.find((o, i) => {

                  if (o.id == 'passportpic' && o.index == m) {
                    return true; // stop searching
                  }
                });

                // if(obj){
                //   console.log("singed array" + JSON.stringify(this.saveddoc))
                // }else{
                this.previewpassportid += 1;
                //this.saveddoc.push({ id: "passportpic", index: m });
                this.saveddoc.push({ id: "passportpic", index: this.previewpassportid });

                console.log("singed array" + JSON.stringify(this.saveddoc))
                // }
                let ImageName;
                let StringTemple: string = '';
                let preview = "passportPerview" + m;
                console.log("Perview" + preview)
                let docurl = this.documents[i].element.document_url;
                let extension = this.documents[i].element.document_unique_id.substr(this.documents[i].element.document_unique_id.lastIndexOf(".") + 1);
                console.log("Perview" + docurl)


                this.previewpassportsrc = docurl;
                this.previewpassportidandsrc[this.previewpassportid] = this.previewpassportsrc;

                if (extension == "doc" || extension == "docx") {

                  console.log("extension StringTemple" + extension);
                  ImageName = "../assets/docx.png";
                  /*
                  StringTemple =
                  '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;text-align: center;" id="div3">' +
                  "" +
                  '<div class="removepreview" id="removepreviewid' +
                  preview +
                  '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                  "" +
                  '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                  ImageName +
                  '" title="' +
                  this.documents[i].element.document_name +
                  '"/>' +
                  "<div> <b>Dokumentenname: " +
                  this.documents[i].element.document_name +
                  "</b> </div></div>";
                  */


                  StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +

                    '<div class="col-md-1">' +
                    '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
                    ImageName +
                    '" title="' +
                    this.documents[i].element.document_name +
                    '"/>' +
                    '</div>' +

                    '<div class="col-md-10" style="font-size:13.5px;">' +
                    '<span><b>Dokumentenname: ' + this.documents[i].element.document_name + '</b></span> ' +
                    // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                    '</div>' +

                    '<div class="col-md-1">' +


                    '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewpassportid + '" id="removepreviewid' +
                    this.previewpassportid +
                    '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                    '  <div class="previewImage" data-preview_id="' + this.previewpassportid + '" id="previewimage' + this.previewpassportid +
                    '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                    '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                    '</div>' +

                    '</div>';


                  //$("#" + preview).html(StringTemple);

                  //$("#" + preview).append(StringTemple);

                  if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

                  } else {
                    $("#" + preview).append(StringTemple);
                  }

                } else if (extension == "xml" || extension == "svg") {

                  console.log("extension StringTemple" + extension);
                  ImageName = "../assets/icons/file-upload-blue-pdf.svg";
                  /*
                  StringTemple =
                  '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;cursor:pointer" id="div3">' +
                  "" +
                  '<div class="removepreview" id="removepreviewid' +
                  preview +
                  '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                  "" +
                  '<img class="imageThumb" id="buttonOne{{m}}" style="width: 100%;height:210px" src="' +
                  ImageName +
                  '" title="' +
                  this.documents[i].element.document_name +
                  '"/>' +
                  "<div> <b>Dokumentenname: " +
                  this.documents[i].element.document_name +
                  "</b> </div></div>";
                  */


                  StringTemple = '<div class="pip d-flex flex-column col-md-12 p-0 upload-file bg-white" style="margin-top:10px;border-radius: 9px;">' +

                  '<div class="d-flex flex-row col-md-12 p-0">' +
                  '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center">' +
                  '<img class="imageThumb" style="width: 50px;height:30px;" src="' +
                    this.documents[i].element.document_url +
                    '" title="' +
                    this.documents[i].element.document_name +
                    '"/>' +
                    '</div>' +

                    '<div class="col-md-10" style="font-size:13.5px;">' +
                    '<span><b>Dokumentenname: ' + this.documents[i].element.document_name + '</b></span> ' +
                    // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                    '</div>' +

                    '<div class="col-md-1">' +


                    '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewpassportid + '" id="removepreviewid' +
                    this.previewpassportid +
                    '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                    '  <div class="previewImage" data-preview_id="' + this.previewpassportid + '" id="previewimage' + this.previewpassportid +
                    '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                    '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                    '</div>' +
                    '</div>' +

                    '</div>';





                  //$("#" + preview).html(StringTemple);

                  //$("#" + preview).append(StringTemple);

                  if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

                  } else {
                    $("#" + preview).append(StringTemple);
                  }

                  const ButtonOne = document.getElementById("buttonOne{{m}}");
                  // ButtonOne.addEventListener(
                  //   "click",
                  //   function () {
                  //     removepreview("one");
                  //   },
                  //   false
                  // );
                  const removepreview = (e) => {
                    if (e == "one") {
                      this.openpdfpopup(docurl);

                    }
                  }
                }

                else if (extension == "pdf" || extension == "pdfx") {

                  console.log("extension StringTemple" + extension);
                  ImageName = "../assets/icons/file-upload-blue-pdf.svg";
                  /*
                  StringTemple =
                  '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;cursor:pointer" id="div3">' +
                  "" +
                  '<div class="removepreview" id="removepreviewid' +
                  preview +
                  '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                  "" +
                  '<img class="imageThumb" id="buttonOne{{m}}" style="width: 100%;height:210px" src="' +
                  ImageName +
                  '" title="' +
                  this.documents[i].element.document_name +
                  '"/>' +
                  "<div> <b>Dokumentenname: " +
                  this.documents[i].element.document_name +
                  "</b> </div></div>";
                  */


                  StringTemple = '<div class="pip d-flex flex-column col-md-12 p-0 upload-file bg-white" style="margin-top:10px;border-radius: 9px;">' +

                  '<div class="d-flex flex-row col-md-12 p-0">' +
                  '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center">' +
                  '<img class="imageThumb" style="width: 50px;height:30px;" src="' +
                    ImageName +
                    '" title="' +
                    this.documents[i].element.document_name +
                    '"/>' +
                    '</div>' +

                    '<div class="col-md-10" style="font-size:13.5px;">' +
                    '<span><b>Dokumentenname: ' + this.documents[i].element.document_name + '</b></span> ' +
                    // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                    '</div>' +

                    '<div class="col-md-1">' +


                    '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewpassportid + '" id="removepreviewid' +
                    this.previewpassportid +
                    '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                    '  <div class="previewImage" data-preview_id="' + this.previewpassportid + '" id="previewimage' + this.previewpassportid +
                    '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                    '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                    '</div>' +
                    '</div>' +

                    '</div>';





                  //$("#" + preview).html(StringTemple);

                  //$("#" + preview).append(StringTemple);

                  if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

                  } else {
                    $("#" + preview).append(StringTemple);
                  }

                  const ButtonOne = document.getElementById("buttonOne{{m}}");
                  // ButtonOne.addEventListener(
                  //   "click",
                  //   function () {
                  //     removepreview("one");
                  //   },
                  //   false
                  // );
                  const removepreview = (e) => {
                    if (e == "one") {
                      this.openpdfpopup(docurl);

                    }
                  }
                }

                else {

                  console.log("extension StringTemple" + extension);
                  /*
                  StringTemple =
                  '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
                  "" +
                  '<div class="removepreview" id="removepreviewid' +
                  preview +
                  '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
                  "" +
                  '<img class="imageThumb" style="width: 100%;height:210px" src="' +
                  this.documents[i].element.document_url +
                  '" title="' +
                  this.documents[i].element.document_name +
                  '"/>' +
                  "<div> <b>Dokumentenname: " +
                  this.documents[i].element.document_name +
                  "</b> </div></div>";
                  */


                  StringTemple = '<div class="pip d-flex flex-column col-md-12 p-0 upload-file bg-white" style="margin-top:10px;border-radius: 9px;">' +

                  '<div class="d-flex flex-row col-md-12 p-0">' +
                  '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center">' +
                  '<img class="imageThumb" style="width: 50px;height:30px;" src="' +
                    this.documents[i].element.document_url +
                    '" title="' +
                    this.documents[i].element.document_name +
                    '"/>' +
                    '</div>' +

                    '<div class="col-md-8 d-flex justify-content-center flex-column p-0" style="font-size:11px; padding:1px" style="font-size:14px;">' +
                    '<span><b>Dokumentenname: ' + this.documents[i].element.document_name + '</b></span> ' +
                    // '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
                    '</div>' +

                    '<div class="col-md-1">' +


                    '<div class="removepreview" data-document_name="' + this.documents[i].element.document_name + '" data-document_id="' + this.documents[i].element.id + '" data-preview_id="' + this.previewpassportid + '" id="removepreviewid' +
                    this.previewpassportid +
                    '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: -2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


                    '  <div class="previewImage" data-preview_id="' + this.previewpassportid + '" id="previewimage' + this.previewpassportid +
                    '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 0px;margin-right: 0 !important;cursor: pointer;">' +

                    '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +

                    '</div>' +
                    '</div>' +

                    '</div>';


                  // $("#" + preview).html(StringTemple);

                  //$("#" + preview).append(StringTemple);

                  if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

                  } else {
                    $("#" + preview).append(StringTemple);
                  }

                }
                $("#removepreviewid" + preview).click(function () {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Select new file!!',
                    // footer: '<a href="">Why do I have this issue?</a>'
                  })
                });



                let that = this;

                $('.previewImage').click(function (event) {
                  previewData($(this).data('preview_id'), that.documents[i].element.document_name);
                  event.stopPropagation();
                  event.stopImmediatePropagation();
                });

                const previewData = (j, modaltitle) => {
                  let str = modaltitle
                  let words = str.split(" ");
                  let firstTwoWords = words.slice(0, 2);
                  let result = firstTwoWords.join(" ");
                  modaltitle = result
                  console.log("previewData" + j);

                  console.log("the source");
                  console.log(this.previewpassportidandsrc.length);
                  console.log(this.previewpassportidandsrc[j]);


                  if (extension == "pdf" || extension == "pdfx" || extension == "xml" || extension == "svg") {
                    $("#openpreviewmodel").trigger("click");
                    this.open_modal('exampleModalpreview')

                    $('#showpreviewtitle').html("<b>Dokumentenname: </b>" + modaltitle);

                    $('#showpreviewdownload').attr('href', this.previewpassportidandsrc[j]);


                    this.source = this.previewpassportidandsrc[j];
                    setTimeout(() => {
                      $("#showpreviewimg").attr("src", "");
                      $("#showpreviewimg").css("display", "none");

                      $("#showpreviewpdf").attr("src", "");
                      $("#showpreviewpdf").css("display", "block");
                      $("#showpreviewpdf").attr("src", this.previewpassportidandsrc[j]);
                    }, 1000);
                  } else {
                    $("#openpreviewmodel").trigger("click");
                    this.open_modal('exampleModalpreview')

                    $('#showpreviewtitle').html("<b>Dokumentenname: </b>" + modaltitle);

                    $('#showpreviewdownload').attr('href', this.previewpassportidandsrc[j]);

                    $('#showpreviewpdf').attr('src', '');
                    $('#showpreviewpdf').css('display', 'none');

                    $('#showpreviewimg').attr('src', '');
                    $('#showpreviewimg').css('display', 'block');
                    $('#showpreviewimg').attr('src', this.previewpassportidandsrc[j]);
                  }
                };

                if (this.documents_visible && this.documents_visible.documents_visible && this.documents_visible.documents_visible == "no") {

                  let data = {
                    document_id: this.documents[i].element.id,
                    document_name: this.documents[i].element.document_name,
                  }

                  that.userService.delete_registeration_document(data);

                }



                $(".removepreview").click(function (event) {

                  Swal.fire({
                    title: "Sind Sie sicher?",
                    showCancelButton: true,
                    confirmButtonText: "Ja",
                    cancelButtonText: "Nein",
                  }).then((result) => {
                    if (result.value) {

                      let data = {
                        document_id: $(this).data('document_id'),
                        document_name: $(this).data('document_name')
                      }

                      that.userService.delete_registeration_document(data);

                      that.saveddoc.forEach((value, index) => {

                        console.log("inside saveddoc loop");
                        console.log(that.saveddoc);
                        console.log(that.signeddoc);

                        if (value.id == "passportpic" && value.index == $(this).data('preview_id')) that.saveddoc.splice(index, 1);

                      });



                      if (that.localData.hasOwnProperty('companytype')) {
                        if (that.localData.companytype == 'Einzelunternehmen' || that.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {


                        }
                        else {

                          let ceo_length = that.localData.type1.legalrepresentativeform.length;
                          let shareholder_length = that.localData.type3.legalrepresentativeform2.length;

                          let doc_check = false;

                          let ceo_done = 0;
                          let shareholder_done = 0;
                          let geschaft_done = 0;
                          let akt_done = 0;

                          if (that.saveddoc.length > 0) {


                            for (let doc_length = 0; doc_length < that.saveddoc.length; doc_length++) {

                              let temp_ceo_length = parseInt(ceo_length) - 1;
                              if (ceo_length > 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                                ceo_done = 1;

                              } else if (ceo_length == 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person") {

                                ceo_done = 1;

                              }


                              // if(this.saveddoc[doc_length].id == "passportpic"){
                              //   shareholder_done += 1;
                              // }



                              if (that.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                                geschaft_done = 1;
                              }


                              if (that.saveddoc[doc_length].id == "Aktueller Auszug aus dem Handelsregister") {
                                akt_done = 1;
                              }


                            }


                            for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                              for (let doc_length = 0; doc_length < that.signeddoc.length; doc_length++) {
                                if (that.signeddoc[doc_length].docname ==
                                  that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                                  " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                                  shareholder_done += 1;
                                  break;
                                }

                              }
                            }





                            if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done == 1) {
                              that.disableddocumentgmbh = false;
                            } else {
                              that.disableddocumentgmbh = true;
                            }



                          }

                          if (that.documents.length > 0) {

                            for (let doc_length = 0; doc_length < that.documents.length; doc_length++) {


                              for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                                if (that.documents[doc_length].element.document_name ==
                                  "Upload Ausweisdokument " + that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                                  " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                                  shareholder_done += 1;
                                }

                              }


                            }

                            if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done) {
                              that.disableddocumentgmbh = false;

                            } else {
                              that.disableddocumentgmbh = true;

                            }


                          }



                        }
                      }




                      $(this).parent().parent().remove();
                      console.log("saved array" + JSON.stringify(that.saveddoc));

                    } else {

                    }
                  });



                  event.stopPropagation();
                  event.stopImmediatePropagation();
                });









              }
            }
          }
          if (this.documents[i].element.document_name == "Datenstammblatt mit Einwilligungserklärung") {
            this.licenseagreementsaved = true;
            this.licenseagreementurl = this.documents[i].element.document_url;
          }
        }
      }
      let datasaved = false;
      let data = {


        Vermittlerstatus: this.personalInfoFormGroup.value.Vermittlerstatus,
        registration_number: this.personalInfoFormGroup.value.registration_number,
        responsible_ihk: this.personalInfoFormGroup.value.responsible_ihk,


      };

      for (let i in data) {


        if (this.localData.hasOwnProperty(i)) {
          if (this.localData[i] == " " || this.localData[i] == "-") {
            if (data[i] != this.localData[i] && data[i] != '') {
              datasaved = false;
              break;
            }
            else {
              datasaved = true;
            }

          }
          else if (this.localData[i] != " " && this.localData[i] != "-") {
            if (data[i] == this.localData[i]) {
              console.log("if3disablesavebutton");

              datasaved = true;

            } else {
              datasaved = false;
              break;
            }
          }


        } else {

          datasaved = false;
          break;


        }
        console.log("datasaved" + datasaved)
      }

      if (datasaved) {
        $("#fourthstepweiter").trigger("click");
      } else {
        this.saveprogressonnext = true;
        let result = await this.saveprogress(step);
        console.log("saveonnext" + result);
        console.log("saveonnext" + this.saveprogressonnext);

        this.showfourthstepsuccess = true;
        setTimeout(() => {
          $("#fourthstepweiter").trigger("click");

          this.showfourthstepsuccess = false;

        }, 1000);
      }
      console.log("showdisabledweiter1" + this.showdisabledweiter1)
      this.showdisabledweiter1 = false;
      console.log("showdisabledweiter1" + this.showdisabledweiter1)
    }
    if (step == 5) {
      this.saveprogressonnext = true;

      console.log("saveddata" + this.saveddoc.length)
      console.log("signed array" + this.signeddoc.length)
      console.log("filearray" + this.filearray.length)
      console.log(this.type3count1);

      //if(this.saveddoc.length == this.type3count1 && this.signeddoc.length==0 && this.filearray.length==0)
      if (this.saveddoc.length >= this.type3count1 && this.signeddoc.length == 0 && this.filearray.length == 0) {
        $("#fifthstepweiter").trigger("click");
      }
      else {
        let result = await this.saveprogress(step);
        console.log("saveonnext" + result);
        this.showfifthstepsuccess = true;

        setTimeout(() => {

          $("#fifthstepweiter").trigger("click");
          this.showfifthstepsuccess = false;

        }, 1000);
      }





    }


  }

  async saveprogress(step: number) {

    console.log("saveonnextstep" + step);
    return new Promise(async resolve => {
      console.log("saveonnext" + this.saveprogressonnext);
      $("#loaderouterid").css("display", "block");
      if (this.SecDomChange == "show") {
        if (this.companytypenew == 'Einzelunternehmen' || this.companytypenew == 'Eingetragener Kaufmann (e.K.)') {
          console.log(this.secondcompanyaddressFormGroup.value);
          console.log(this.secondcompanyaddressFormGroup1.value);
          console.log(this.secondcompanyaddressFormGroup2.value);

          let that = this;
          console.log(this.personalInfoFormGroup.value.Vermittlerstatus);
          let localData = JSON.parse(localStorage.getItem("currentUser"));
          var current_id = this.userService.getDecodedAccessToken(
            localStorage.getItem("token")
          ).id;
          var lastname = this.userService.getDecodedAccessToken(
            localStorage.getItem("token")
          ).lastname;
          var newtitle = '';
          var newfirstname = '';
          var newlastname = '';
          if (this.livingaddressFormGroup.value.title != '') {
            newtitle = this.livingaddressFormGroup.value.title;

          } else {
            newtitle = localData.title;
          }
          if (this.livingaddressFormGroup.value.firstname != '') {
            newfirstname = this.livingaddressFormGroup.value.firstname;

          } else {
            newfirstname = localData.firstname;
          }
          if (this.livingaddressFormGroup.value.lastname != '') {
            newlastname = this.livingaddressFormGroup.value.lastname;

          } else {
            newlastname = localData.lastname;
          }
          let data = {
            roles: ["b2b"],
            // companies: this.companyFormGroup.value.companies,
            // Personal Information

            title: newtitle,
            customerno: localData.customerno,
            firstname: newfirstname,
            lastname: newlastname,
            // companyname: this.customerFormGroup.value.companyName,

            email: localData.email,
            // dateofbirth: this.customerFormGroup.value.dob,
            // nationality: this.customerFormGroup.value.nationality,
            // birth_place: this.customerFormGroup.value.birthPlace,
            Vermittlerstatus: this.personalInfoFormGroup.value.Vermittlerstatus,
            registration_number:
              this.personalInfoFormGroup.value.registration_number,
            responsible_ihk: this.personalInfoFormGroup.value.responsible_ihk,
            companytype: this.personalInfoFormGroup.value.companytype,
            contactno: localData.contactno,
            // Address Information
            companyname: this.addressFormGroup.value.companyName,

            strassaliving: this.addressFormGroup.value.street,
            strnoliving: this.addressFormGroup.value.streetNumber,
            additionalReferenceliving:
              this.addressFormGroup.value.additionalReference,
            plzliving: this.addressFormGroup.value.postCode,
            cityliving: this.addressFormGroup.value.city,
            current_countryliving: this.addressFormGroup.value.countryOfResidence,
            strassa: this.livingaddressFormGroup.value.streetliving,
            strno: this.livingaddressFormGroup.value.streetNumberliving,
            additionalReference:
              this.livingaddressFormGroup.value.additionalReferenceliving,
            plz: this.livingaddressFormGroup.value.postCodeliving,
            city: this.livingaddressFormGroup.value.cityliving,
            current_country:
              this.livingaddressFormGroup.value.countryOfResidenceliving,

            dateofbirth: this.livingaddressFormGroup.value.dob,
            birth_place: this.livingaddressFormGroup.value.birthPlace,

            type1: { 'legalrepresentativeform': [] },
            type2: this.secondcompanyaddressFormGroup1.value,
            type3: { 'legalrepresentativeform2': [] },
            _id: current_id,
            broker_type: this.broker_type,

            status: "0",

            registeration_editable: "1",
          };
          let msg =
            this.addressFormGroup.value.street +
            " , " +
            this.addressFormGroup.value.streetNumber +
            " " +
            this.addressFormGroup.value.postCode +
            "," +
            this.addressFormGroup.value.city;
          $("#addressid").html(msg);
          $("#addressid1").html(msg);
          console.log("saveonnext" + this.saveprogressonnext);
          console.log("showdata" + JSON.stringify(data));
          console.log("companyname" + this.addressFormGroup.value.companyName);
          //  this.exportAsPDFnew();
          that.userService
            .updateUserb2b(data)
            .pipe(first())
            .subscribe(
              (data) => {
                console.log("updateuserloginid");
                console.log("saveonnext" + this.saveprogressonnext);
                // this.exportAsPDFnew();
                // if(this.drawingnew == 1){
                //   this._handleImageUploadVollmacht();
                // }
                console.log("saveonnext" + this.saveprogressonnext);
                localStorage.setItem("currentUser", JSON.stringify(data));
                this.token = data["token"];
                this.localData = data["user"];
                localStorage.setItem("token", this.token);
                localStorage.setItem("currentUser", JSON.stringify(data["user"]));

                console.log("POST Request is successful ", data);
                that.registerDone = true;
                this.edited = true;
                console.log("editededited" + this.edited);
              },
              (error) => {
                that.registraionError = true;
                console.log("Error", error["error"]);
              },
              async () => {
                console.log("saveonnext" + this.saveprogressonnext);
                if (this.filearray.length != 0) {
                  console.log("handleupload" + this.filearray.length)
                  let result = await this._handleImageUpload();
                  console.log("_handleImageUpload" + result);
                  resolve(true);
                }
                else if (this.saveprogressonnext == true) {
                  setTimeout(() => {
                    $("#loaderouterid").css("display", "none");
                    if (step == 1) {
                      console.log("iffffffelseestep==1" + this.saveprogressonnext);
                      this.showfirststepsuccess = true;
                      this.disablesavebutton = true;
                    }
                    else if (step == 2) {
                      console.log("iffffffelseestep==2" + this.saveprogressonnext);
                      this.showsecondstepsuccess = true;
                      this.disablesecondsavebutton = true;
                    }
                    else if (step == 3) {
                      console.log("iffffffelseestep==2" + this.saveprogressonnext);
                      this.showthirdstepsuccess = true;
                      this.disablethirdsavebutton = true;
                    }
                    else if (step == 4) {
                      console.log("iffffffelseestep==2" + this.saveprogressonnext);
                      this.showfourthstepsuccess = true;
                      this.disablefourthsavebutton = true;
                    }
                    else if (step == 5) {
                      this.showfifthstepsuccess = true;
                    }
                    this.saveprogressonnext = false;
                    resolve(true);
                  }, 2000);





                }
                else {
                  console.log("iffffffelsee" + this.saveprogressonnext);
                  setTimeout(() => {
                    $("#loaderouterid").css("display", "none");
                    if (step == 1) {
                      console.log("iffffffelseestep==1" + this.saveprogressonnext);
                      this.showfirststepsuccess = true;
                      this.disablesavebutton = true;
                    }
                    else if (step == 2) {
                      console.log("iffffffelseestep==2" + this.saveprogressonnext);
                      this.showsecondstepsuccess = true;
                      this.disablesecondsavebutton = true;
                    }
                    else if (step == 3) {
                      console.log("iffffffelseestep==2" + this.saveprogressonnext);
                      this.showthirdstepsuccess = true;
                      this.disablethirdsavebutton = true;
                    }
                    else if (step == 4) {
                      console.log("iffffffelseestep==2" + this.saveprogressonnext);
                      this.showfourthstepsuccess = true;
                      this.disablefourthsavebutton = true;
                    }
                    else if (step == 5) {
                      this.showfifthstepsuccess = true;
                    }
                    resolve(true);
                  }, 2000);




                }
              }
            );
        }
        else {
          console.log("saveonnext" + this.saveprogressonnext);
          console.log(this.secondcompanyaddressFormGroup.value);
          console.log(this.secondcompanyaddressFormGroup1.value);
          console.log(this.secondcompanyaddressFormGroup2.value);

          let that = this;
          console.log(this.personalInfoFormGroup.value.Vermittlerstatus);
          let localData = JSON.parse(localStorage.getItem("currentUser"));
          var current_id = this.userService.getDecodedAccessToken(
            localStorage.getItem("token")
          ).id;
          var lastname = this.userService.getDecodedAccessToken(
            localStorage.getItem("token")
          ).lastname;
          var newtitle = '';
          var newfirstname = '';
          var newlastname = '';
          if (this.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].title != '') {
            newtitle = this.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].title;

          } else {
            newtitle = localData.title;
          }
          if (this.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].firstname != '') {
            newfirstname = this.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].firstname;

          } else {
            newfirstname = localData.firstname;
          }
          if (this.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].lastname != '') {
            newlastname = this.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].lastname;

          } else {
            newlastname = localData.lastname;
          }
          let data = {
            roles: ["b2b"],
            // companies: this.companyFormGroup.value.companies,
            // Personal Information
            title: newtitle,
            customerno: localData.customerno,
            firstname: newfirstname,
            lastname: newlastname,
            // companyname: this.customerFormGroup.value.companyName,

            email: localData.email,
            // dateofbirth: this.customerFormGroup.value.dob,
            // nationality: this.customerFormGroup.value.nationality,
            // birth_place: this.customerFormGroup.value.birthPlace,
            Vermittlerstatus: this.personalInfoFormGroup.value.Vermittlerstatus,
            registration_number:
              this.personalInfoFormGroup.value.registration_number,
            responsible_ihk: this.personalInfoFormGroup.value.responsible_ihk,
            companytype: this.personalInfoFormGroup.value.companytype,
            contactno: localData.contactno,
            // Address Information
            companyname: this.addressFormGroup.value.companyName,

            strassaliving: this.addressFormGroup.value.street,
            strnoliving: this.addressFormGroup.value.streetNumber,
            additionalReferenceliving:
              this.addressFormGroup.value.additionalReference,
            plzliving: this.addressFormGroup.value.postCode,
            cityliving: this.addressFormGroup.value.city,
            current_countryliving: this.addressFormGroup.value.countryOfResidence,
            strassa: this.livingaddressFormGroup.value.streetliving,
            strno: this.livingaddressFormGroup.value.streetNumberliving,
            additionalReference:
              this.livingaddressFormGroup.value.additionalReferenceliving,
            plz: this.livingaddressFormGroup.value.postCodeliving,
            city: this.livingaddressFormGroup.value.cityliving,
            current_country:
              this.livingaddressFormGroup.value.countryOfResidenceliving,

            dateofbirth: this.livingaddressFormGroup.value.dob,
            birth_place: this.livingaddressFormGroup.value.birthPlace,

            type1: this.secondcompanyaddressFormGroup.value,
            type2: this.secondcompanyaddressFormGroup1.value,
            type3: this.secondcompanyaddressFormGroup2.value,
            _id: current_id,
            broker_type: this.broker_type,

            //More Information
            // _id: this.customerFormGroup.value.id,
            // contactno: this.customerFormGroup.value.phone_number,
            // customerno: this.customerFormGroup.value.customerno,
            // broker: this.customerFormGroup.value.broker,
            status: "0",

            registeration_editable: "1",
          };
          let msg =
            this.addressFormGroup.value.street +
            " , " +
            this.addressFormGroup.value.streetNumber +
            " " +
            this.addressFormGroup.value.postCode +
            "," +
            this.addressFormGroup.value.city;
          $("#addressid").html(msg);
          $("#addressid1").html(msg);
          console.log("saveonnext" + this.saveprogressonnext);
          console.log("showdata" + JSON.stringify(data));
          console.log("companyname" + this.addressFormGroup.value.companyName);
          //  this.exportAsPDFnew();
          that.userService
            .updateUserb2b(data)
            .pipe(first())
            .subscribe(
              (data) => {
                console.log("saveonnext" + this.saveprogressonnext);
                console.log("updateuserloginid");
                // this.exportAsPDFnew();
                // if(this.drawingnew == 1){
                //   this._handleImageUploadVollmacht();
                // }

                localStorage.setItem("currentUser", JSON.stringify(data));
                this.token = data["token"];
                this.localData = data["user"];
                localStorage.setItem("token", this.token);
                localStorage.setItem("currentUser", JSON.stringify(data["user"]));
                console.log("saveonnext" + this.saveprogressonnext);
                console.log("POST Request is successful ", data);
                that.registerDone = true;
                this.edited = true;
                console.log("editededited" + this.edited);
              },
              (error) => {
                that.registraionError = true;
                console.log("Error", error["error"]);
              },
              async () => {
                console.log("saveonnext" + this.saveprogressonnext);
                if (this.signeddoc.length != 0) {
                  console.log("saveonnext" + this.saveprogressonnext);
                  this.savedocument();
                  console.log("saveonnext" + this.saveprogressonnext);
                  resolve(true);
                  console.log("saveonnext" + this.saveprogressonnext);
                } else if (this.filearray.length != 0) {
                  console.log("saveonnext" + this.saveprogressonnext);
                  console.log("handleupload" + this.filearray.length)

                  console.log("lets see handle uploadddd");
                  console.log(this.filearray);

                  await this._handleImageUpload();
                  resolve(true);
                }
                else if (this.saveprogressonnext) {
                  console.log("saveonnext" + this.saveprogressonnext);
                  setTimeout(() => {
                    $("#loaderouterid").css("display", "none");
                    if (step == 1) {
                      this.showfirststepsuccess = true;
                      this.disablesavebutton = true;
                    }
                    else if (step == 2) {
                      this.showsecondstepsuccess = true;
                      this.disablesecondsavebutton = true;
                    }
                    else if (step == 3) {
                      console.log("iffffffelseestep==2" + this.saveprogressonnext);
                      this.showthirdstepsuccess = true;
                      this.disablethirdsavebutton = true;
                    }
                    else if (step == 4) {
                      console.log("iffffffelseestep==2" + this.saveprogressonnext);
                      this.showfourthstepsuccess = true;
                      this.disablefourthsavebutton = true;
                    }
                    else if (step == 5) {
                      console.log("saveonnext" + this.saveprogressonnext);
                      this.showfifthstepsuccess = true;
                      console.log("saveonnext" + this.saveprogressonnext);
                    }
                    this.saveprogressonnext = false;
                    resolve(true);
                  }, 2000);



                }
                else {
                  setTimeout(() => {
                    $("#loaderouterid").css("display", "none");
                    if (step == 1) {
                      this.showfirststepsuccess = true;
                      this.disablesavebutton = true;
                    }
                    else if (step == 2) {
                      this.showsecondstepsuccess = true;
                      this.disablesecondsavebutton = true;
                    }
                    else if (step == 3) {
                      console.log("iffffffelseestep==2" + this.saveprogressonnext);
                      this.showthirdstepsuccess = true;
                      this.disablethirdsavebutton = true;
                    }
                    else if (step == 4) {
                      console.log("iffffffelseestep==2" + this.saveprogressonnext);
                      this.showfourthstepsuccess = true;
                      this.disablefourthsavebutton = true;
                    }
                    else if (step == 5) {
                      this.showfifthstepsuccess = true;
                    }
                    resolve(true);
                  }, 2000);




                }

              }
            );
        }

      } else {
        let that = this;
        console.log(this.personalInfoFormGroup.value.Vermittlerstatus);
        let localData = JSON.parse(localStorage.getItem("currentUser"));
        var current_id = this.userService.getDecodedAccessToken(
          localStorage.getItem("token")
        ).id;
        var lastname = this.userService.getDecodedAccessToken(
          localStorage.getItem("token")
        ).lastname;

        let data = {
          roles: ["b2b"],
          // companies: this.companyFormGroup.value.companies,
          // Personal Information
          title: localData.title,
          customerno: localData.customerno,
          firstname: localData.firstname,
          // companyname: this.customerFormGroup.value.companyName,
          lastname: lastname,
          email: localData.email,
          // dateofbirth: this.customerFormGroup.value.dob,
          // nationality: this.customerFormGroup.value.nationality,
          // birth_place: this.customerFormGroup.value.birthPlace,
          Vermittlerstatus: this.personalInfoFormGroup.value.Vermittlerstatus,
          registration_number:
            this.personalInfoFormGroup.value.registration_number,
          responsible_ihk: this.personalInfoFormGroup.value.responsible_ihk,
          companytype: this.personalInfoFormGroup.value.companytype,
          contactno: localData.contactno,
          // Address Information
          strassa: this.livingaddressFormGroup.value.streetliving,
          strno: this.livingaddressFormGroup.value.streetNumberliving,
          additionalReference:
            this.livingaddressFormGroup.value.additionalReferenceliving,
          plz: this.livingaddressFormGroup.value.postCodeliving,
          city: this.livingaddressFormGroup.value.cityliving,
          current_country:
            this.livingaddressFormGroup.value.countryOfResidenceliving,
          current_countryliving:
            this.livingaddressFormGroup.value.countryOfResidence,
          // Address Information
          strassaliving: this.addressFormGroup.value.street,
          strnoliving: this.addressFormGroup.value.streetNumber,
          additionalReferenceliving:
            this.addressFormGroup.value.additionalReference,
          plzliving: this.addressFormGroup.value.postCode,
          cityliving: this.addressFormGroup.value.city,

          dateofbirth: this.livingaddressFormGroup.value.dob,
          birth_place: this.livingaddressFormGroup.value.birthPlace,

          _id: current_id,
          broker_type: this.broker_type,

          //More Information
          // _id: this.customerFormGroup.value.id,
          // contactno: this.customerFormGroup.value.phone_number,
          // customerno: this.customerFormGroup.value.customerno,
          // broker: this.customerFormGroup.value.broker,
          status: "0",
        };
        let msg =
          this.addressFormGroup.value.street +
          " , " +
          this.addressFormGroup.value.streetNumber +
          " " +
          this.addressFormGroup.value.postCode +
          "," +
          this.addressFormGroup.value.city;
        $("#addressid").html(msg);
        $("#addressid1").html(msg);

        that.userService
          .updateUserb2b(data)
          .pipe(first())
          .subscribe(
            (data) => {
              console.log("updateuserloginid");
              // this.exportAsPDFnew();
              this._handleImageUploadVollmacht();
              localStorage.setItem("currentUser", JSON.stringify(data));
              this.token = data["token"];
              localStorage.setItem("token", this.token);
              localStorage.setItem("currentUser", JSON.stringify(data["user"]));

              console.log("POST Request is successful ", data);
              that.registerDone = true;
              this.edited = true;
              console.log("editededited" + this.edited);
            },
            (error) => {
              that.registraionError = true;
              console.log("Error", error["error"]);
            },
            () => {
              this.savedocument();
            }
          );
      }


    });
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  checkfirststepData() {
    this.showfirststepsuccess = false;
    this.disablesavebutton = true;
    this.companytypevalue = true;
    console.log("disablesavebutton" + this.disablesavebutton);
    console.log("disablesavebuttonvalue" + this.addressFormGroup.value.companyName)
    console.log("disablesavebuttonvalue" + this.ThirdTypeDoc.value)
    console.log("disablesavebuttonvalue" + this.addressFormGroup.value.street)
    console.log("disablesavebuttonvalue" + this.addressFormGroup.value.streetNumber)
    console.log("disablesavebuttonvalue" + this.addressFormGroup.value.postCode)
    console.log("disablesavebuttonvalue" + this.addressFormGroup.value.city)
    console.log("disablesavebuttonvalue" + this.addressFormGroup.value.additionalReference)
    console.log("disablesavebuttonvalue" + this.addressFormGroup.value.countryOfResidence)




    let data = {


      companyname: this.addressFormGroup.value.companyName,
      companytype: this.ThirdTypeDoc.value,
      strassa: this.addressFormGroup.value.street,
      strno: this.addressFormGroup.value.streetNumber,
      plz: this.addressFormGroup.value.postCode,
      city: this.addressFormGroup.value.city,
      additionalReference: this.addressFormGroup.value.additionalReference,
      current_country: this.addressFormGroup.value.countryOfResidence,

    };

    for (let i in data) {
      console.log("disablesavebutton" + this.localData.hasOwnProperty(i));
      console.log("disablesavebutton" + i);

      console.log("disablesavebutton" + this.disablesavebutton);

      if (i == "companytype") {
        console.log("companytypevalue" + this.companytypevalue);
        let match = 0;
        for (let j = 0; j < this.CompanyType.length; j++) {
          if (data[i] == this.CompanyType[j]) {
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
      if (this.localData.hasOwnProperty(i)) {
        console.log("disablesavebutton" + data[i]);

        console.log("disablesavebutton" + this.localData[i]);

        if (this.localData[i] == "-" || this.localData[i] == " ") {

          console.log("if3disablesavebutton");

          if (data[i] != this.localData[i] && data[i] != '') {

            console.log("if3disablesavebutton");
            this.disablesavebutton = false;
            break;
          }

        } else if (data[i] == this.localData[i]) {
          console.log("if3disablesavebutton");

          this.disablesavebutton = true;

        }
        else if (data[i] != this.localData[i]) {
          console.log("if3disablesavebutton");
          this.disablesavebutton = false;
          break;
        }

      } else {
        console.log("if3disablesavebutton");
        this.disablesavebutton = false;
        break;


      }

    }
    console.log(this.disablesavebutton, "disablesavebutton");

  }
  checksecondstepData() {
    this.showsecondstepsuccess = false;
    this.disablesecondsavebutton = true;
    console.log("disablesecondsavebutton" + this.disablesecondsavebutton);
    console.log("disablesecondsavebuttonvalue" + this.livingaddressFormGroup.value.title)
    console.log("disablesecondsavebuttonvalue" + this.livingaddressFormGroup.value.firstname)
    console.log("disablesecondsavebuttonvalue" + this.livingaddressFormGroup.value.lastname)
    console.log("disablesecondsavebuttonvalue" + this.livingaddressFormGroup.value.streetliving)
    console.log("disablesecondsavebuttonvalue" + this.livingaddressFormGroup.value.streetNumberliving)
    console.log("disablesecondsavebuttonvalue" + this.livingaddressFormGroup.value.postCodeliving)
    console.log("disablesecondsavebuttonvalue" + this.livingaddressFormGroup.value.cityliving)
    console.log("disablesecondsavebuttonvalue" + this.livingaddressFormGroup.value.additionalReferenceliving)
    console.log("disablesecondsavebuttonvalue" + this.livingaddressFormGroup.value.countryOfResidenceliving)
    console.log("disablesecondsavebuttonvalue" + this.livingaddressFormGroup.value.dob)
    console.log("disablesecondsavebuttonvalue" + this.livingaddressFormGroup.value.birthPlace)




    let data = {


      title: this.livingaddressFormGroup.value.title,
      firstname: this.livingaddressFormGroup.value.firstname,
      lastname: this.livingaddressFormGroup.value.lastname,
      strassaliving: this.livingaddressFormGroup.value.streetliving,
      strnoliving: this.livingaddressFormGroup.value.streetNumberliving,
      plzliving: this.livingaddressFormGroup.value.postCodeliving,
      cityliving: this.livingaddressFormGroup.value.cityliving,
      additionalReferenceliving: this.livingaddressFormGroup.value.additionalReferenceliving,
      current_countryliving: this.livingaddressFormGroup.value.countryOfResidenceliving,
      dateofbirth: this.livingaddressFormGroup.value.dob,
      birth_place: this.livingaddressFormGroup.value.birthPlace,

    };

    for (let i in data) {
      console.log("disablesecondsavebutton" + this.localData.hasOwnProperty(i));
      console.log("disablesecondsavebutton" + i);

      console.log("disablesecondsavebutton" + this.disablesecondsavebutton);

      if (this.localData.hasOwnProperty(i)) {
        console.log("disablesecondsavebutton" + data[i]);

        console.log("disablesecondsavebutton" + this.localData[i]);
        if (this.localData[i] == "-" || this.localData[i] == " ") {
          console.log("if3disablesecondsavebutton");
          if (data[i] != this.localData[i] && data[i] != '') {
            console.log("if3disablesecondsavebutton");
            this.disablesecondsavebutton = false;
            break;
          }

        } else if (data[i] == this.localData[i]) {
          console.log("if3disablesecondsavebutton");

          this.disablesecondsavebutton = true;

        }
        else if (data[i] != this.localData[i]) {
          console.log("if3disablesecondsavebutton");
          this.disablesecondsavebutton = false;
          break;
        }

      } else {
        console.log("if3disablesecondsavebutton");
        this.disablesecondsavebutton = false;
        break;


      }

    }
    console.log(this.disablesecondsavebutton, "disablesecondsavebutton");

  }
  checkthirdstepdata() {
    this.showthirdstepsuccess = false;
    this.disablethirdsavebutton = true;
    console.log("disablethirdsavebutton" + this.disablethirdsavebutton);
    console.log("disablethirdsavebuttonvalue" + this.secondcompanyaddressFormGroup.value)
    console.log("disablethirdsavebuttonvalue" + this.secondcompanyaddressFormGroup1.value)
    console.log("disablethirdsavebuttonvalue" + this.secondcompanyaddressFormGroup2.value)


    let data = {


      type1: this.secondcompanyaddressFormGroup.value,
      type2: this.secondcompanyaddressFormGroup1.value,
      type3: this.secondcompanyaddressFormGroup2.value,


    };
    for (let i in data) {
      console.log("disablethirdsavebutton" + this.localData.hasOwnProperty(i));
      console.log("disablethirdsavebutton" + i);

      console.log("disablethirdsavebutton" + this.disablethirdsavebutton);

      if (this.localData.hasOwnProperty(i)) {
        console.log("disablethirdsavebutton" + JSON.stringify(data[i]));

        console.log("disablethirdsavebutton" + JSON.stringify(this.localData[i]));
        if (JSON.stringify(data[i]) === JSON.stringify(this.localData[i])) {
          console.log("if3disablethirdsavebutton");

          this.disablethirdsavebutton = true;

        }
        else {
          console.log("if3disablethirdsavebutton");
          this.disablethirdsavebutton = false;
          break;
        }

      } else {
        console.log("if3disablethirdsavebutton");
        this.disablethirdsavebutton = false;
        break;


      }

    }
    console.log(this.disablethirdsavebutton, "disablethirdsavebutton");
  }
  checkfourthstepData() {
    this.showfourthstepsuccess = false;
    this.disablefourthsavebutton = true;
    console.log("disablefourthsavebutton" + this.disablefourthsavebutton);
    console.log("disablefourthsavebuttonvalue" + this.personalInfoFormGroup.value.Vermittlerstatus)
    console.log("disablefourthsavebuttonvalue" + this.personalInfoFormGroup.value.registration_number)
    console.log("disablefourthsavebuttonvalue" + this.personalInfoFormGroup.value.responsible_ihk)


    let data = {


      Vermittlerstatus: this.personalInfoFormGroup.value.Vermittlerstatus,
      registration_number: this.personalInfoFormGroup.value.registration_number,
      responsible_ihk: this.personalInfoFormGroup.value.responsible_ihk,


    };

    for (let i in data) {
      console.log("disablefourthsavebutton" + this.localData.hasOwnProperty(i));
      console.log("disablefourthsavebutton" + i);

      console.log("disablefourthsavebutton" + this.disablefourthsavebutton);

      if (this.localData.hasOwnProperty(i)) {
        console.log("disablefourthsavebutton" + data[i]);

        console.log("disablefourthsavebutton" + this.localData[i]);
        if (this.localData[i] == "-" || this.localData[i] == " ") {
          console.log("if3disablefourthsavebutton");
          if (data[i] != this.localData[i] && data[i] != '') {
            console.log("if3disablefourthsavebutton");
            this.disablefourthsavebutton = false;
            break;
          }

        } else if (data[i] == this.localData[i]) {
          console.log("if3disablefourthsavebutton");

          this.disablefourthsavebutton = true;

        }
        else if (data[i] != this.localData[i]) {
          console.log("if3disablefourthsavebutton");
          this.disablefourthsavebutton = false;
          break;
        }

      } else {
        console.log("if3disablefourthsavebutton");
        this.disablefourthsavebutton = false;
        break;


      }

    }
    console.log(this.disablefourthsavebutton, "disablefourthsavebutton");

  }
  save() {
    $("#loaderouterid").css("display", "block");
    if (this.SecDomChange == "show") {
      if (this.companytypenew == 'Einzelunternehmen' || this.companytypenew == 'Eingetragener Kaufmann (e.K.)') {
        console.log(this.secondcompanyaddressFormGroup.value);
        console.log(this.secondcompanyaddressFormGroup1.value);
        console.log(this.secondcompanyaddressFormGroup2.value);

        let that = this;
        console.log(this.personalInfoFormGroup.value.Vermittlerstatus);
        let localData = JSON.parse(localStorage.getItem("currentUser"));
        var current_id = this.userService.getDecodedAccessToken(
          localStorage.getItem("token")
        ).id;
        var lastname = this.userService.getDecodedAccessToken(
          localStorage.getItem("token")
        ).lastname;

        let data = {
          roles: ["b2b"],
          // companies: this.companyFormGroup.value.companies,
          // Personal Information
          title: this.livingaddressFormGroup.value.title,
          customerno: localData.customerno,
          firstname: this.livingaddressFormGroup.value.firstname,
          lastname: this.livingaddressFormGroup.value.lastname,
          // companyname: this.customerFormGroup.value.companyName,

          email: localData.email,
          // dateofbirth: this.customerFormGroup.value.dob,
          // nationality: this.customerFormGroup.value.nationality,
          // birth_place: this.customerFormGroup.value.birthPlace,
          Vermittlerstatus: this.personalInfoFormGroup.value.Vermittlerstatus,
          registration_number:
            this.personalInfoFormGroup.value.registration_number,
          responsible_ihk: this.personalInfoFormGroup.value.responsible_ihk,
          companytype: this.personalInfoFormGroup.value.companytype,
          contactno: localData.contactno,
          // Address Information
          companyname: this.addressFormGroup.value.companyName,

          strassaliving: this.addressFormGroup.value.street,
          strnoliving: this.addressFormGroup.value.streetNumber,
          additionalReferenceliving:
            this.addressFormGroup.value.additionalReference,
          plzliving: this.addressFormGroup.value.postCode,
          cityliving: this.addressFormGroup.value.city,
          current_countryliving: this.addressFormGroup.value.countryOfResidence,
          strassa: this.livingaddressFormGroup.value.streetliving,
          strno: this.livingaddressFormGroup.value.streetNumberliving,
          additionalReference:
            this.livingaddressFormGroup.value.additionalReferenceliving,
          plz: this.livingaddressFormGroup.value.postCodeliving,
          city: this.livingaddressFormGroup.value.cityliving,
          current_country:
            this.livingaddressFormGroup.value.countryOfResidenceliving,

          dateofbirth: this.livingaddressFormGroup.value.dob,
          birth_place: this.livingaddressFormGroup.value.birthPlace,

          type1: { 'legalrepresentativeform': [] },
          type2: this.secondcompanyaddressFormGroup1.value,
          type3: { 'legalrepresentativeform2': [] },
          _id: current_id,
          broker_type: this.broker_type,

          //More Information
          // _id: this.customerFormGroup.value.id,
          // contactno: this.customerFormGroup.value.phone_number,
          // customerno: this.customerFormGroup.value.customerno,
          // broker: this.customerFormGroup.value.broker,
          status: "0",


          registeration_editable: "0",
        };
        let msg =
          this.addressFormGroup.value.street +
          " , " +
          this.addressFormGroup.value.streetNumber +
          " " +
          this.addressFormGroup.value.postCode +
          "," +
          this.addressFormGroup.value.city;
        $("#addressid").html(msg);
        $("#addressid1").html(msg);
        console.log("showdata" + JSON.stringify(data));
        console.log("companyname" + this.addressFormGroup.value.companyName);
        //  this.exportAsPDFnew();
        that.userService
          .updateUserb2b(data)
          .pipe(first())
          .subscribe(
            (data) => {
              console.log("updateuserloginid");
              // this.exportAsPDFnew();
              this._handleImageUploadVollmacht();
              localStorage.setItem("currentUser", JSON.stringify(data));
              this.token = data["token"];
              localStorage.setItem("token", this.token);
              localStorage.setItem("currentUser", JSON.stringify(data["user"]));

              console.log("POST Request is successful ", data);
              that.registerDone = true;
              this.edited = true;
              console.log("editededited" + this.edited);
            },
            (error) => {
              that.registraionError = true;
              console.log("Error", error["error"]);
            },
            () => {
              if (this.drawingnew == 1) {
                setTimeout(() => {
                  $("#loaderouterid").css("display", "none");
                  Swal.fire({
                    // title: `Wir überprüfen Ihre Daten innerhalb von einem Werktag und stellen Ihnen
                    // nach erfolgreicher Prüfung Ihren Vermittlervertrag zur Verfügung.
                    // Hierzu erhalten Sie eine E-Mail. Vorgangs Nr.: ${this.localData.brokerregticketno}.`,
                    title: `Die Prüfung Ihrer Daten ist im Regelfall in 1-2 Werktagen durchgeführt. Wir stellen Ihnen nach erfolgreicher Prüfung Ihren Vermittlervertrag zur Verfügung. Hierzu erhalten Sie eine E-Mail. Vorgangs Nr.: ${this.localData.brokerregticketno}.`,
                    showCloseButton: true,
                    allowOutsideClick: false,

                    //confirmButtonText: "Zur Startseite <i class='fa fa-arrow-right'></i>",
                    confirmButtonText: "Zum Dashboard <i class='fa fa-arrow-right'></i>",
                    icon: "success",
                    html: `<div>
              <a id="buttonOne" style="color:#184297;" class="btn"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>  Datenstammblatt mit Einwilligungserklärung
              <i class="fa fa-download" aria-hidden="true"></i> </a>

             </div>`,
                  })
                    .then((result) => {
                      console.log(result);
                      if (result["isDismissed"]) {
                        this.drawingnew = 0;
                        this.signaturePad.clear();
                        //this.logout();
                        this.localData.registeration_editable = 0;
                        localStorage.setItem("currentUser", JSON.stringify(this.localData));

                        this.router.navigate(['b2b-home']);
                        console.log("iffffff");
                        // this.router.navigate([`/upload-document/${this.user_id}`], {
                        //   queryParams: { user_id: this.user_id },
                        // });
                      } else {
                        console.log("elsesssssssss");
                        //this.logout();
                        this.localData.registeration_editable = 0;
                        localStorage.setItem("currentUser", JSON.stringify(this.localData));

                        this.router.navigate(['b2b-home']);
                      }
                    })
                    .catch((err) => { });
                  const ButtonOne = document.getElementById("buttonOne");
                  ButtonOne.addEventListener(
                    "click",
                    function () {
                      removepreview("one");
                    },
                    false
                  );
                  const removepreview = (e) => {
                    if (e == "one") {
                      this.exportAsPDFnew();

                    }

                  };
                }, 2000);

              }
            }
          );
      }
      else {
        console.log(this.secondcompanyaddressFormGroup.value);
        console.log(this.secondcompanyaddressFormGroup1.value);
        console.log(this.secondcompanyaddressFormGroup2.value);

        let that = this;
        console.log(this.personalInfoFormGroup.value.Vermittlerstatus);
        let localData = JSON.parse(localStorage.getItem("currentUser"));
        var current_id = this.userService.getDecodedAccessToken(
          localStorage.getItem("token")
        ).id;
        var lastname = this.userService.getDecodedAccessToken(
          localStorage.getItem("token")
        ).lastname;

        let data = {
          roles: ["b2b"],
          // companies: this.companyFormGroup.value.companies,
          // Personal Information
          title: this.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].title,
          customerno: localData.customerno,
          firstname: this.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].firstname,
          lastname: this.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].lastname,
          // companyname: this.customerFormGroup.value.companyName,

          email: localData.email,
          // dateofbirth: this.customerFormGroup.value.dob,
          // nationality: this.customerFormGroup.value.nationality,
          // birth_place: this.customerFormGroup.value.birthPlace,
          Vermittlerstatus: this.personalInfoFormGroup.value.Vermittlerstatus,
          registration_number:
            this.personalInfoFormGroup.value.registration_number,
          responsible_ihk: this.personalInfoFormGroup.value.responsible_ihk,
          companytype: this.personalInfoFormGroup.value.companytype,
          contactno: localData.contactno,
          // Address Information
          companyname: this.addressFormGroup.value.companyName,

          strassaliving: this.addressFormGroup.value.street,
          strnoliving: this.addressFormGroup.value.streetNumber,
          additionalReferenceliving:
            this.addressFormGroup.value.additionalReference,
          plzliving: this.addressFormGroup.value.postCode,
          cityliving: this.addressFormGroup.value.city,
          current_countryliving: this.addressFormGroup.value.countryOfResidence,
          strassa: this.livingaddressFormGroup.value.streetliving,
          strno: this.livingaddressFormGroup.value.streetNumberliving,
          additionalReference:
            this.livingaddressFormGroup.value.additionalReferenceliving,
          plz: this.livingaddressFormGroup.value.postCodeliving,
          city: this.livingaddressFormGroup.value.cityliving,
          current_country:
            this.livingaddressFormGroup.value.countryOfResidenceliving,

          dateofbirth: this.livingaddressFormGroup.value.dob,
          birth_place: this.livingaddressFormGroup.value.birthPlace,

          type1: this.secondcompanyaddressFormGroup.value,
          type2: this.secondcompanyaddressFormGroup1.value,
          type3: this.secondcompanyaddressFormGroup2.value,
          _id: current_id,
          broker_type: this.broker_type,

          //More Information
          // _id: this.customerFormGroup.value.id,
          // contactno: this.customerFormGroup.value.phone_number,
          // customerno: this.customerFormGroup.value.customerno,
          // broker: this.customerFormGroup.value.broker,
          status: "0",

          registeration_editable: "0",

          //registeration_total_count: parseInt(this.localData.registeration_total_count+1)
        };
        let msg =
          this.addressFormGroup.value.street +
          " , " +
          this.addressFormGroup.value.streetNumber +
          " " +
          this.addressFormGroup.value.postCode +
          "," +
          this.addressFormGroup.value.city;
        $("#addressid").html(msg);
        $("#addressid1").html(msg);
        console.log("showdata" + JSON.stringify(data));
        console.log("companyname" + this.addressFormGroup.value.companyName);
        //  this.exportAsPDFnew();


        let id_data = {
          broker_id: current_id
        };

        console.log("new function gonna be called");

        that.userService.removebrokerdata(id_data);

        that.userService.unverifybrokerdocs(id_data);

        that.userService
          .updateUserb2b(data)
          .pipe(first())
          .subscribe(
            (data) => {
              console.log("updateuserloginid");
              // this.exportAsPDFnew();
              this._handleImageUploadVollmacht();
              localStorage.setItem("currentUser", JSON.stringify(data));
              this.token = data["token"];
              localStorage.setItem("token", this.token);
              localStorage.setItem("currentUser", JSON.stringify(data["user"]));

              console.log("POST Request is successful ", data);
              that.registerDone = true;
              this.edited = true;
              console.log("editededited" + this.edited);
            },
            (error) => {
              that.registraionError = true;
              console.log("Error", error["error"]);
            },
            () => {
              if (this.drawingnew == 1) {
                setTimeout(() => {
                  $("#loaderouterid").css("display", "none");
                  Swal.fire({
                    // title: `Wir überprüfen Ihre Daten innerhalb von einem Werktag und stellen Ihnen
                    // nach erfolgreicher Prüfung Ihren Vermittlervertrag zur Verfügung.
                    // Hierzu erhalten Sie eine E-Mail. Vorgangs Nr.: ${this.localData.brokerregticketno}.`,
                    title: `Die Prüfung Ihrer Daten ist im Regelfall in 1-2 Werktagen durchgeführt. Wir stellen Ihnen nach erfolgreicher Prüfung Ihren Vermittlervertrag zur Verfügung. Hierzu erhalten Sie eine E-Mail. Vorgangs Nr.: ${this.localData.brokerregticketno}.`,
                    showCloseButton: true,
                    allowOutsideClick: false,

                    //confirmButtonText: "Zur Startseite <i class='fa fa-arrow-right'></i>",
                    confirmButtonText: "Zum Dashboard <i class='fa fa-arrow-right'></i>",
                    icon: "success",
                    html: `<div>
                  <a id="buttonOne" style="color:#184297;" class="btn"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>  Datenstammblatt mit Einwilligungserklärung
                  <i class="fa fa-download" aria-hidden="true"></i> </a>

                 </div>`,
                  })
                    .then((result) => {
                      console.log(result);
                      if (result["isDismissed"]) {
                        this.drawingnew = 0;
                        this.signaturePad.clear();
                        //this.logout();

                        this.localData.registeration_editable = 0;

                        //this.localData.registeration_total_count = parseInt(this.localData.registeration_total_count+1);

                        localStorage.setItem("currentUser", JSON.stringify(this.localData));

                        this.router.navigate(['b2b-home']);
                        console.log("iffffff");
                        // this.router.navigate([`/upload-document/${this.user_id}`], {
                        //   queryParams: { user_id: this.user_id },
                        // });
                      } else {
                        console.log("elsesssssssss");
                        //this.logout();

                        this.localData.registeration_editable = 0;

                        //this.localData.registeration_total_count = parseInt(this.localData.registeration_total_count+1);

                        localStorage.setItem("currentUser", JSON.stringify(this.localData));

                        this.router.navigate(['b2b-home']);
                      }
                    })
                    .catch((err) => { });
                  const ButtonOne = document.getElementById("buttonOne");
                  ButtonOne.addEventListener(
                    "click",
                    function () {
                      removepreview("one");
                    },
                    false
                  );
                  const removepreview = (e) => {
                    if (e == "one") {
                      this.exportAsPDFnew();

                    }

                  };
                }, 2000);

              }

            }
          );
      }

    } else {
      let that = this;
      console.log(this.personalInfoFormGroup.value.Vermittlerstatus);
      let localData = JSON.parse(localStorage.getItem("currentUser"));
      var current_id = this.userService.getDecodedAccessToken(
        localStorage.getItem("token")
      ).id;
      var lastname = this.userService.getDecodedAccessToken(
        localStorage.getItem("token")
      ).lastname;

      let data = {
        roles: ["b2b"],
        // companies: this.companyFormGroup.value.companies,
        // Personal Information
        title: localData.title,
        customerno: localData.customerno,
        firstname: localData.firstname,
        // companyname: this.customerFormGroup.value.companyName,
        lastname: lastname,
        email: localData.email,
        // dateofbirth: this.customerFormGroup.value.dob,
        // nationality: this.customerFormGroup.value.nationality,
        // birth_place: this.customerFormGroup.value.birthPlace,
        Vermittlerstatus: this.personalInfoFormGroup.value.Vermittlerstatus,
        registration_number:
          this.personalInfoFormGroup.value.registration_number,
        responsible_ihk: this.personalInfoFormGroup.value.responsible_ihk,
        companytype: this.personalInfoFormGroup.value.companytype,
        contactno: localData.contactno,
        // Address Information
        strassa: this.livingaddressFormGroup.value.streetliving,
        strno: this.livingaddressFormGroup.value.streetNumberliving,
        additionalReference:
          this.livingaddressFormGroup.value.additionalReferenceliving,
        plz: this.livingaddressFormGroup.value.postCodeliving,
        city: this.livingaddressFormGroup.value.cityliving,
        current_country:
          this.livingaddressFormGroup.value.countryOfResidenceliving,
        current_countryliving:
          this.livingaddressFormGroup.value.countryOfResidence,
        // Address Information
        strassaliving: this.addressFormGroup.value.street,
        strnoliving: this.addressFormGroup.value.streetNumber,
        additionalReferenceliving:
          this.addressFormGroup.value.additionalReference,
        plzliving: this.addressFormGroup.value.postCode,
        cityliving: this.addressFormGroup.value.city,

        dateofbirth: this.livingaddressFormGroup.value.dob,
        birth_place: this.livingaddressFormGroup.value.birthPlace,

        _id: current_id,
        broker_type: this.broker_type,

        //More Information
        // _id: this.customerFormGroup.value.id,
        // contactno: this.customerFormGroup.value.phone_number,
        // customerno: this.customerFormGroup.value.customerno,
        // broker: this.customerFormGroup.value.broker,
        status: "0",
      };
      let msg =
        this.addressFormGroup.value.street +
        " , " +
        this.addressFormGroup.value.streetNumber +
        " " +
        this.addressFormGroup.value.postCode +
        "," +
        this.addressFormGroup.value.city;
      $("#addressid").html(msg);
      $("#addressid1").html(msg);

      that.userService
        .updateUserb2b(data)
        .pipe(first())
        .subscribe(
          (data) => {
            console.log("updateuserloginid");
            // this.exportAsPDFnew();
            this._handleImageUploadVollmacht();
            localStorage.setItem("currentUser", JSON.stringify(data));
            this.token = data["token"];
            localStorage.setItem("token", this.token);
            localStorage.setItem("currentUser", JSON.stringify(data["user"]));

            console.log("POST Request is successful ", data);
            that.registerDone = true;
            this.edited = true;
            console.log("editededited" + this.edited);
          },
          (error) => {
            that.registraionError = true;
            console.log("Error", error["error"]);
          },
          () => {
            this.savedocument();
          }
        );
    }
  }
  onRoleChange(event) {
    console.log("on role change function", event);
    const roles = (<FormArray>this.roleFormGroup.get("roles")) as FormArray;
    if (event.target.checked) {
      roles.push(new FormControl(event.target.defaultValue));
    } else {
      this.roleCompanies[event.target.defaultValue] = [];
      const i = roles.controls.findIndex(
        (x) => x.value === event.target.defaultValue
      );
      roles.removeAt(i);
    }
    console.log("changeRole", roles);
  }
  onCompanyChange(event) {
    console.log("on company change function" + this.edited);

    let that = this;
    const companies = (<FormArray>(
      this.companyFormGroup.get("companies")
    )) as FormArray;

    if (event.target.checked) {
      if (this.edited === true) {
        console.log("ifif");
        setTimeout(() => {
          this.edited = false;
        }, 1000);
      } else {
        if (this.edited === false) {
          console.log("ififelse");
          setTimeout(() => {
            this.edited = false;
          }, 1000);
        } else {
          setTimeout(() => {
            this.edited = true;
          }, 1000);
        }
      }

      console.log("event.target.checked" + this.edited);
      companies.push(new FormControl(event.target.defaultValue));
    } else {
      if (this.edited === false) {
        console.log("elseif");
        setTimeout(() => {
          this.edited = false;
        }, 1000);
      } else {
        if (this.edited === true) {
          console.log("elseifelseif");
          setTimeout(() => {
            this.edited = false;
          }, 1000);
        } else {
          console.log("else");
          setTimeout(() => {
            this.edited = true;
          }, 1000);
        }
      }
      console.log("unchecked" + this.edited);
      const i = companies.controls.findIndex(
        (x) => x.value === event.target.defaultValue
      );
      companies.removeAt(i);
    }
    that.editCompanyarr = companies.value;

    console.log("that.editCompanyarr" + companies.value);
    that.userService.getEditUser(this.id).subscribe(function (user) {
      var custNo = user.customerno;
      var allSplitted = custNo.split("-");
      var originalCustomerNumber = custNo.split("-", 1);
      var companyInitials = [];
      var finalCustomerNumber = originalCustomerNumber;
      if (that.editCompanyarr.length > 0) {
        that.editCompanyarr.forEach(function (i, k) {
          var initial = i.substring(0, 2);
          companyInitials.push(initial);
        });
      }

      if (companyInitials.length > 0) {
        var allCompanyInitials = companyInitials.join("-");
        finalCustomerNumber = finalCustomerNumber + "-" + allCompanyInitials;
      }
      that.customerFormGroup.patchValue({
        customerno: finalCustomerNumber,
      });
    });
  }
  handleAddressChange(data) {
    const splitArr = data.address_components;
    this.getCountry(splitArr);
  }
  handleAddressChangeihk(data) {
    const splitArr = data.address_components;
    this.getCountryihk(splitArr);
  }

  handleAddressChangeland(data) {
    const splitArr = data.address_components;
    this.getCountryland(splitArr);
  }
  handleAddressChangelandShare(data, index) {
    const splitArr = data.address_components;
    this.getCountrylandShare(splitArr, index);
  }
  handleAddressChangelandfirst(data, index) {
    const splitArr = data.address_components;
    this.getCountrylandfirst(splitArr, index);
  }
  handleAddressChangelandsecond(data, index) {
    const splitArr = data.address_components;
    this.getCountrylandsecond(splitArr, index);
  }
  handleAddressChangelandliving(data) {
    const splitArr = data.address_components;
    this.getCountryland(splitArr);
  }
  handleAllFields(data) {
    const splitArr = data.address_components;
    this.getAllFields(splitArr);
  }
  handleAllFieldsShare(data, index) {
    console.log("imhere" + index);
    const splitArr = data.address_components;

    this.getAllFieldsShare(splitArr, index);
  }
  handleAllFieldsfirst(data, index) {
    console.log("imhere" + index);
    //$("#showfieldslink").html("");
    // $("#showfieldslink").css("display", "block");
    const splitArr = data.address_components;

    this.getAllFieldsfirst(splitArr, index);
  }
  handleAllFieldssecond(data, index) {
    console.log("imhere" + index);
    const splitArr = data.address_components;

    this.getAllFieldssecond(splitArr, index);
  }
  handleAllFieldsliving(data) {
    const splitArr = data.address_components;
    this.getAllFieldsliving(splitArr);
  }

  /*getCountry(data):any{
    let that=this;
    const splitArr = data;
    splitArr.forEach(function(i,k){
      let content: any = i.types;
      if(content.length > 1){
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if(countryArr[index] === 'country'){
            that.customerFormGroup.patchValue({nationality: i.short_name});
          }
        }
      }
    });
  }*/
  getCountry(data): any {
    let that = this;
    const splitArr = data;
    console.log(splitArr);
    splitArr.forEach(function (i, k) {
      let content: any = i.types;
      //console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
          }
          if (countryArr[index] === "locality") {
            that.localityName = i.short_name;
          }
          let localityCountry = that.localityName + "," + that.countryName;
          that.customerFormGroup.patchValue({ birthPlace: localityCountry });
        }
      }
    });
  }
  getCountryihk(data): any {
    let that = this;
    const splitArr = data;
    console.log(splitArr);
    splitArr.forEach(function (i, k) {
      let content: any = i.types;
      //console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
          }
          if (countryArr[index] === "locality") {
            that.localityName = i.short_name;
          }
          let localityCountry = that.localityName + "," + that.countryName;
          that.personalInfoFormGroup.patchValue({
            responsible_ihk: localityCountry,
          });
        }
      }
    });
  }

  getCountryland(data): any {
    let that = this;
    const splitArr = data;
    // console.log(splitArr);
    splitArr.forEach(function (i, k) {
      let content: any = i.types;
      //// console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
          }

          let localityCountry = that.countryName;
          that.customerFormGroup.patchValue({
            countryOfResidence: localityCountry,
          });
        }
      }
    });
    this.checkDataAndCreateUpdateData();
  }
  getCountrylandShare(data, index): any {
    let that = this;
    const splitArr = data;
    // console.log(splitArr);
    splitArr.forEach(function (i, k) {
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
    this.checkDataAndCreateUpdateData();
  }
  getCountrylandfirst(data, index): any {
    let that = this;
    const splitArr = data;
    // console.log(splitArr);
    splitArr.forEach(function (i, k) {
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
    this.checkDataAndCreateUpdateData();
  }
  getCountrylandsecond(data, index): any {
    let that = this;
    const splitArr = data;
    // console.log(splitArr);
    splitArr.forEach(function (i, k) {
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
    this.checkDataAndCreateUpdateData();
  }
  getCountrylandliving(data): any {
    let that = this;
    const splitArr = data;
    // console.log(splitArr);
    splitArr.forEach(function (i, k) {
      let content: any = i.types;
      //// console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
          }

          let localityCountry = that.countryName;
          that.customerFormGroup.patchValue({
            countryOfResidence: localityCountry,
          });
        }
      }
    });
    this.checkDataAndCreateUpdateData();
  }
  // getAllFields(data): any {
  //   let that = this;
  //   const splitArr = data;
  //   splitArr.forEach(function (i, k) {
  //     //console.log(i);
  //     let content: any = i.types;
  //     //console.log(content);
  //     const found = content.find((element) => (element = "street_number"));
  //     if (found === "street_number") {
  //       that.customerFormGroup.patchValue({ streetNumber: i.short_name });
  //     }
  //     if (found === "postal_code") {
  //       that.customerFormGroup.patchValue({ postCode: i.short_name });
  //     }
  //     if (found === "route") {
  //       console.log("route", i.short_name);
  //       that.customerFormGroup.patchValue({ street: i.short_name });
  //     }
  //     //console.log(content);
  //     if (content.length > 1) {
  //       const countryArr = content;
  //       //console.log(countryArr);
  //       for (let index = 0; index < content.length; index++) {
  //         if (countryArr[index] === "country") {
  //           that.customerFormGroup.patchValue({
  //             countryOfResidence: i.short_name,
  //           });
  //         }
  //         if (countryArr[index] === "locality") {
  //           that.customerFormGroup.patchValue({ city: i.short_name });
  //         }
  //       }
  //     }
  //   });
  // }
  showaddressfields1(data, index) {
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
  showaddressfields(data, index) {
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
  showaddressfields2(data, index) {
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
  getAllFields(data): any {
    let that = this;
    const splitArr = data;
    let str = "";
    //console.log("data", splitArr);
    splitArr.forEach(function (i, k) {
      let content: any = i.types;
      const found = content.find((element) => (element = "street_number"));
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
  getAllFieldsShare(data, index): any {
    console.log("imhre22");
    let that = this;
    const splitArr = data;
    let str = "";
    this.showmore2[index] = true;
    //console.log("data", splitArr);
    splitArr.forEach(function (i, k) {
      let content: any = i.types;
      const found = content.find((element) => (element = "street_number"));
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
  getAllFieldsfirst(data, index): any {
    console.log("imhre22" + index);
    let that = this;
    const splitArr = data;
    let str = "";
    this.showmore[index] = true;
    // showmore =true;
    //console.log("data", splitArr);
    splitArr.forEach(function (i, k) {
      let content: any = i.types;
      const found = content.find((element) => (element = "street_number"));
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
  getAllFieldssecond(data, index): any {
    console.log("imhre22" + index);
    let that = this;
    const splitArr = data;
    let str = "";
    this.showmore1[index] = true;
    // showmore =true;
    //console.log("data", splitArr);
    splitArr.forEach(function (i, k) {
      let content: any = i.types;
      const found = content.find((element) => (element = "street_number"));
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
  getAllFieldsliving(data): any {
    let that = this;
    const splitArr = data;
    let str = "";
    //console.log("data", splitArr);
    splitArr.forEach(function (i, k) {
      let content: any = i.types;
      const found = content.find((element) => (element = "street_number"));
      if (found === "street_number") {
        that.livingaddressFormGroup.patchValue({
          streetNumberliving: i.short_name,
        });
      } else if (found === "postal_code") {
        that.livingaddressFormGroup.patchValue({
          postCodeliving: i.short_name,
        });
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
              countryOfResidenceliving: i.long_name,
            });
          }
          if (countryArr[index] === "locality") {
            that.livingaddressFormGroup.patchValue({
              cityliving: i.short_name,
            });
          }
        }
      }
    });
    if (str.length > 0) {
      that.livingaddressFormGroup.patchValue({ streetliving: str });
    } else {
      that.livingaddressFormGroup.patchValue({ streetliving: "" });
    }
  }

  // titleChange($event) {
  //   //console.log("titleChange")
  //   this.companyTitleShow = false;
  //   if (this.customerFormGroup.get("title").value == "Firma") {
  //     console.log("titleChange");
  //     this.companyTitleShow = true;
  //     this.customerFormGroup.patchValue({
  //       companyname: this.customerFormGroup.value.companyname,
  //     });
  //   }
  //   this.checkDataAndCreateUpdateData();
  // }

  //My Data
  checkDataAndCreateUpdateData(callSave?, element?, accordian?, close = "") {
    this.edited = true;
    console.log("edited" + this.edited);
    // console.log("inside check data" , this.customerFormGroup.value);
    let roles = [];
    let companies = new Set([]);
    let rolesCompaniesArray = [];
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

    let data = {
      roles: ["b2b"],
      companies: this.companyFormGroup.value.companies,
      // Personal Information
      title: this.customerFormGroup.value.title,
      firstname: this.customerFormGroup.value.firstName,
      companyname: this.customerFormGroup.value.companyName,
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
    };

    for (let i in data) {
      console.log(this.userData.hasOwnProperty(i));
      console.log(i);
      console.log(this.userData);
      //localStorage.setItem('currentUser', JSON.stringify(this.userData));
      console.log("data" + JSON.stringify(data));
      console.log("edited" + this.edited);
      if (this.userData.hasOwnProperty(i)) {
        if (Array.isArray(data[i])) {
          // console.log(data[i], this.userData[i])
          if (
            JSON.stringify(data[i].sort()) !=
            JSON.stringify(this.userData[i].sort())
          ) {
            console.log(data[i], this.userData[i]);
            this.edited = false;
            console.log("if1");
          }
        } else {
          if (i == "contactno" && !this.userData[i].includes("+")) {
            if (data[i] != this.userData[i]) {
              console.log("if2");

              this.edited = false;
            }
          } else {
            if (data[i] != this.userData[i]) {
              console.log("if3");

              this.edited = false;
            }
          }
        }
      } else {
        if (data[i] != this.userData[i]) {
          console.log("if3");

          this.edited = false;
        } else {
          // this.edited = true
        }
        // console.log("else")
        //  this.edited = false
      }
    }
    console.log(this.edited, "edited");
    // if (callSave) {
    //   console.log("hello")
    //   this.save(data, element, this.customerFormGroup.value.id,close);

    // }
  }

  getcurrentUser(id) {
    const that = this;
    this.user = false;
    this.b2b = false;
    this.employee = false;
    this.customer = false;
    this.admin = false;
    this.roleCompanies = {
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

    this.userService.getEditUser(id).subscribe(function (data1: any) {
      console.log("data1 data1", data1);
      that.UserStatus = data1.status;
      //this.getBrokersData();
      that.email_verify = data1.email_verify;
      that.phone_verify = data1.mobile_verify;
      const roles = (<FormArray>that.roleFormGroup.get("roles")) as FormArray;
      const companies = (<FormArray>(
        that.companyFormGroup.get("companies")
      )) as FormArray;
      console.log("data1 data1", data1.companies);
      //this.brokerList = this.getBrokersData(data1)
      that.broker = data1.broker;
      let rwc = data1.companies_with_roles;
      for (let i = 0; i < rwc.length; i++) {
        console.log("rwc[i]", rwc[i]);
        let temp = rwc[i].split("_");
        if (that.roleCompanies[temp[1]]) {
          that.roleCompanies[temp[1]].push(temp[0]);
        }
      }

      if (data1.roles.includes("user") || data1.roles.includes("Benutzer")) {
        that.roleCompanies["user"] = ["checkntrack"];
        that.user = true;
      }
      data1.roles.forEach((role) => {
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
      });
      console.log("asd" + localStorage.getItem("currentActiveRole"));
      if (localStorage.getItem("currentActiveRole") == "superadmin") {
        console.log("dsfdsfasdsadas");
        that.mekFinanz = true;
        that.fiorettoimmob = true;
        that.birema = true;
        that.fiorettomedia = true;
        that.airmage = true;
        that.horaidetektei = true;
        that.varioimport = true;
        that.sterbvorsoge = true;
        that.checkntrack = true;

        companies.push(new FormControl("cefima"));
        companies.push(new FormControl("fiorettoimmob"));
        companies.push(new FormControl("birema"));
        companies.push(new FormControl("fiorettomedia"));
        companies.push(new FormControl("airmage"));
        companies.push(new FormControl("sterbvorsoge"));
        companies.push(new FormControl("varioimport"));
        companies.push(new FormControl("checkntrack"));
      } else {
        data1.companies.forEach((comp) => {
          if (comp === "cefima") {
            that.mekFinanz = true;
            companies.push(new FormControl(comp));
          }
          if (comp === "fiorettoimmob") {
            that.fiorettoimmob = true;
            companies.push(new FormControl(comp));
          }
          if (comp === "birema") {
            that.birema = true;
            companies.push(new FormControl(comp));
          }
          if (comp === "fiorettomedia") {
            that.fiorettomedia = true;
            companies.push(new FormControl(comp));
          }
          if (comp === "airmage") {
            that.airmage = true;
            companies.push(new FormControl(comp));
          }
          if (comp === "horaidetektei") {
            that.horaidetektei = true;
            companies.push(new FormControl(comp));
          }
          if (comp === "varioimport") {
            that.varioimport = true;
            companies.push(new FormControl(comp));
          }
          if (comp === "sterbvorsoge") {
            that.sterbvorsoge = true;
            companies.push(new FormControl(comp));
          }
          if (comp === "checkntrack") {
            that.checkntrack = true;
            companies.push(new FormControl(comp));
          }
        });
      }

      let brokername = "";
      if (data1.broker && data1.brokerinfo && data1.brokerinfo.length > 0) {
        // brokername = data1.brokerinfo[0].firstname + " " + data1.brokerinfo[0].lastname + "(" + data1.broker + ")";
        brokername =
          data1.brokerinfo[0].firstname +
          " " +
          data1.brokerinfo[0].lastname +
          "(" +
          data1.broker +
          ")";
      }
      console.log("Company Name" + data1.companyname);
      // this.companyname=data1.companyname;
      that.customerFormGroup.patchValue({
        title: data1.title,
        companyName: data1.companyname,
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
        //    brokernew: (brokername) ? brokername : data1.broker,
        broker: data1.broker,
      });
      if (data1.broker) {
        for (let i = 0; i < that.brokerList.length; i++) {
          if (that.brokerList[i].value == data1.broker) {
            that.brokerFormControl.setValue(that.brokerList[i]);
            console.log("that.brokerList[i]" + data1.broker);
          }
        }
      } else {
        that.brokerFormControl.setValue("");
      }
      if (data1.nationality) {
        for (let i = 0; i < that.optionsValue.length; i++) {
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
      that.userData = data1;
      that.roles = data1.roles;

      that.companyTitleShow = data1.title === "Firma" ? true : false;
      // if (that.roles.includes("superadmin")) {
      //   that.edited = true;
      // } else {
      //   that.edited = false;
      // }
    });
  }

  openShowCompanyDialog(role) {
    // const dialogRef = this.dialog.open(ShowUserCompaniesComponent, {
    //   disableClose: true,
    //   data: role,
    // });

    // dialogRef.afterClosed().subscribe((result) => {});
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["./"]);
    document.body.classList.remove("modal-open");
  }
  patchBrokerValue(event) {
    console.log(event);
    console.log("patchBrokerValue" + this.brokerFormControl.value.value);
    this.customerFormGroup.patchValue({
      broker: this.brokerFormControl.value.value,
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
  _handleImageUpload = async () => {
    console.log("saveonnext" + this.uploadfile);

    return new Promise(async resolve => {
      console.log("this.idthis.idthis.id" + this.id);
      // this.userService
      //   .getLastdocument()
      //   .pipe(first())
      //   .subscribe((data) => {
      this.TicketNo = this.localData.brokerregticketno;
      var values = {
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
        document_name: "",
        olddocument_id: "",
      };
      console.log("_handleImageUpload" + JSON.stringify(this.filearray));

      for (let i = 0; i < this.filearray.length; i++) {

        let oldcheckdoc;
        if (this.documents.length > 0) {
          oldcheckdoc = this.documents.find((result) => result.element.document_name == this.filename[i])
        }

        let olddocument_id = '';
        if (oldcheckdoc) {
          olddocument_id = oldcheckdoc.element.id;
        }


        olddocument_id = '';


        console.log("asdsadasdasdffffffffffffffffffffffffff" + JSON.stringify(oldcheckdoc));
        console.log("asdsadasdasdffffffffffffffffffffffffff" + JSON.stringify(olddocument_id));
        console.log("saveonnext" + this.uploadfile);
        console.log(Math.round(this.filearray[i].size / 1024));
        let MainType = this.filearray[i].type;
        let Date = this.filearray[i].lastModified;
        let StringTypeCasting = Math.round(this.filearray[i].size / 1024);
        //var document_type = "Allgemeines Dokument";
        values.image = this.filearray[i];
        values.document_type = "Allgemeines Dokument";
        values.document_sub_type = this.filename[i];
        values.document_name = this.filename[i];
        values.user_id = this.id;
        values.product_partner = " ";
        values.companycode = "42140 DFG Finanzprofi GmbH";
        values.brand = "cefima";
        values.upload_by = "cefima_document";
        values.ticket_no = this.localData.brokerregticketno;
        values.olddocument_id = olddocument_id;
        // tagssize.push({ size: Math.round(this.filearray[i].size / 1024) });
        values.tags.push(StringTypeCasting.toString());
        values.tags.push(MainType);
        values.tags.push(Date);
        console.log("asdsadasdasdffffffffffffffffffffffffff" + JSON.stringify(values));
        let result = await this.uploadDocument(values, i);
        console.log("_handleImageUpload" + result);
        values.tags = [];
        console.log(values);
        console.log("saveonnext" + this.uploadfile);
      }
      // $(".pip").remove();

      this.filearraynew = [];
      resolve(true);
    });
  };
  uploadDocument(values: any, index: any) {
    console.log("saveonnext" + this.uploadfile);
    return new Promise(async resolve => {
      let length = this.filearray.length;
      console.log("uploadDocument" + length + " " + index)
      $("#loaderouterid").css("display", "block");
      const formData = new FormData();
      formData.append("document_type", values.document_type);
      formData.append("document_sub_type", values.document_sub_type);
      formData.append("product_partner", values.product_partner);
      formData.append("user", values.user_id);
      formData.append("companycode", values.companycode);
      formData.append("brand", values.brand);
      formData.append("tags", values.tags);
      formData.append("upload_by", values.upload_by);
      formData.append("ticket_no", values.ticket_no);
      formData.append("document_name", values.document_name);
      formData.append("olddocument_id", values.olddocument_id);
      if (values.image !== "") {
        formData.append("document", values.image);
      }
      console.log("asdsadasdasdffffffffffffffffffffffffff" + JSON.stringify(formData));
      this.UploadDone = true;
      this.userService
        .callApiuploaddocumentnewsaveprogress(formData)
        .pipe(first())
        .subscribe(
          (data) => {
            console.log(length, index);
            if (values.olddocument_id != '') {
              let oldcheckdocindex = this.documents.findIndex((result) => result.element.id == values.olddocument_id)
              console.log("indexxxxxxxxx" + oldcheckdocindex);
              console.log("indexxxxxxxxx" + JSON.stringify(this.documents));
              this.documents = data;
              console.log("indexxxxxxxxx" + JSON.stringify(this.documents));
            }
            if (length == index + 1) {
              console.log("saveonnext" + length + " " + index);
              if (this.saveprogressonnext) {
                console.log("saveonnext" + length + " " + index);
                $("#loaderouterid").css("display", "none");
                this.showfifthstepsuccess = true;
                this.filearray = [];
                this.signeddoc = [];
                console.log("showfifthstepsuccess" + this.showfifthstepsuccess)
                this.saveprogressonnext = false;
              } else {
                console.log("saveonnext" + length + " " + index);
                $("#loaderouterid").css("display", "none");
                this.showfifthstepsuccess = true;
                this.filearray = [];
                this.signeddoc = [];
                console.log("saveonnext" + length + " " + index);
              }
            }

            $("#Success").html(`<div class="alert alert-success" role="alert">
          Erfolgreich hochgeladen
        </div>`);
            $("#Success").css("text-align", "center");
            $("#Success").css("font-size", "30px");
            console.log("POST Request is successful ", data);
            this.UploadDone = true;
          },
          (error) => {
            $("#loaderouterid").css("display", "none");
            this.UploadError = true;
            console.log("Error", error["error"]);
          },
          () => { }
        );
      resolve(true);
    });
  }


  DocumentOne() {
    $("#DocOne").trigger("click");
  }
  DocumentTwo() {
    $("#DocTwo").trigger("click");
  }
  DocumentThree() {
    $("#DocThree").trigger("click");
  }



  async handleImageChange(
    event: any,
    preview: string,
    docName: string,
    idname: string,
    dynamicceo = ''
  ) {


    // if(this.previewid >= 1){
    //   this.previewid += 1;
    // }else{
    //   this.previewid = 0;
    // }

    console.log("check previewid value");
    console.log(this.previewid);


    this.docuploaded = false;
    this.showfifthstepsuccess = false;
    let that = this;
    event.preventDefault();

    $("#result").html("");
    let StringTemple;
    this.showButton = true;
    console.log("includenote" + this.filename);
    console.log("includenote" + docName);

    const previewData = (j, modaltitle, src) => {
      let str = modaltitle
      let words = str.split(" ");
      let firstTwoWords = words.slice(0, 2);
      let result = firstTwoWords.join(" ");
      modaltitle = result

      console.log("previewData" + j);

      console.log("the source");
      console.log(this.previewidandsrc.length);
      console.log(this.previewidandsrc[j]);

      if (src.indexOf('data:application/pdf;') != -1) {

        $("#openpreviewmodel").trigger("click");
        this.open_modal('exampleModalpreview')

        $('#showpreviewtitle').html("<b>Dokumentenname: </b>" + modaltitle);

        $('#showpreviewdownload').attr('href', src);

        this.source = src;
        setTimeout(() => {
          $("#showpreviewimg").attr("src", "");
          $("#showpreviewimg").css("display", "none");

          $("#showpreviewpdf").attr("src", "");
          $("#showpreviewpdf").css("display", "block");
          $("#showpreviewpdf").attr("src", src);
        }, 1000);
      } else {
        $("#openpreviewmodel").trigger("click");
        this.open_modal('exampleModalpreview')

        $('#showpreviewtitle').html("<b>Dokumentenname: </b>" + modaltitle);

        $('#showpreviewdownload').attr('href', src);

        $('#showpreviewpdf').attr('src', '');
        $('#showpreviewpdf').css('display', 'none');

        $('#showpreviewimg').attr('src', '');
        $('#showpreviewimg').css('display', 'block');
        $('#showpreviewimg').attr('src', src);
      }
    };


    const removeData = (j) => {
      console.log("removeData" + j);
      console.log("removeData" + JSON.stringify(this.filearraynew.length));
      console.log("removeData" + JSON.stringify(this.filearraynew));
      console.log("removeData" + JSON.stringify(this.filearraynew[j]));
      this.filearraynew.splice(j, 1);

      this.filename.splice(j, 1);

      console.log("after removed Data");
      console.log(this.filearraynew);
      console.log("filenames");
      console.log(this.filename);

      $("#" + idname).val("");

      console.log(this.filearraynew.length);
      if (this.filearraynew.length == 0) {
        this.edited = true;
        console.log("dsfsfdsf");
      } else {
        this.showButton = false;
      }

      console.log("dsfsfdsf");
    };


    if (this.filename.includes(docName)) {

      //window.scrollTo(0,document.body.scrollHeight);

      console.log("include");


      let index = this.filename.indexOf(docName);
      var files = event.target.files; //FileList object
      var filesLength = files.length;
      console.log("fileslength" + filesLength);
      // for (let i = 0; i < filesLength; i++) {
      //   let f = files[i];
      //   this.filearraynew[index] = f;
      //   this.filearray = this.filearraynew;
      //   if (this.filearraynew.length == 3) {
      //     this.edited = false;
      //   } else {
      //     this.showButton = false;
      //   }


      for (let i = 0; i < filesLength; i++) {


        this.document_progressbar += 1;

        let f = files[i];
        this.filearraynew.push(f);
        this.filename.push(docName);
        this.filearray = this.filearraynew;
        if (this.filearraynew.length == 3) {
          this.edited = false;
        } else {
          this.showButton = false;
        }

        var fileReader = new FileReader();
        //var target:EventTarget;
        let Size = this.dataconvert(f.size);

        let Size_num = Math.round(f.size / 1024);


        fileReader.onload = function (e) {
          //var file = e.target;

          console.log(f.name.split("."));
          let extension = f.name.substr(f.name.lastIndexOf(".") + 1);
          console.log(extension);
          let ImageName;
          if (extension == "doc" || extension == "docx") {
            ImageName = "../assets/docx.png";
          } else if (extension == "pdf" || extension == "pdfx") {
            ImageName = "../assets/icons/file-upload-blue-pdf.svg";
          } else {
            ImageName = (e.target as any).result;
          }

          let Size12 = Math.round(f.size / 1024);

          that.previewsrc = (e.target as any).result;


          //that.previewidandsrc[that.previewid-1].previewid = that.previewid;
          //that.previewidandsrc[that.previewid-1].previewsrc = that.previewsrc;

          that.previewidandsrc[that.previewid] = that.previewsrc;

          let displayName = docName;

          let showname = "";
          if (docName == 'Ausweisdokument Vertretungsberechtigte Person') {

            let running_number = 0;
            for (let doc_count = 0; doc_count < that.saveddoc.length; doc_count++) {
              if (that.saveddoc[doc_count].id == "Ausweisdokument Vertretungsberechtigte Person") {
                running_number += 1;
              }
            }


            if (that.companytypenew != 'Einzelunternehmen' && that.companytypenew != 'Eingetragener Kaufmann (e.K.)') {
              if (running_number == 0) {
                displayName = "Ausweisdokument Vertretungsberechtigte Person: " + that.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].firstname + " " + that.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].lastname;
              } else {
                displayName = "Ausweisdokument Vertretungsberechtigte Person: " + that.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].firstname + " " + that.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].lastname + "-" + running_number;
              }

              showname = displayName;
            } else if (that.companytypenew == 'Einzelunternehmen' || that.companytypenew == 'Eingetragener Kaufmann (e.K.)') {
              if (running_number == 0) {
                displayName = "Ausweisdokument Vertretungsberechtigte Person: " + that.livingaddressFormGroup.value.firstname + that.livingaddressFormGroup.value.lastname;
              } else {
                displayName = "Ausweisdokument Vertretungsberechtigte Person: " + that.livingaddressFormGroup.value.firstname + that.livingaddressFormGroup.value.lastname + "-" + running_number;
              }

              showname = displayName;
            }

          } else if (docName == 'Geschäftsanmeldung') {

            let running_number = 0;
            for (let doc_count = 0; doc_count < that.saveddoc.length; doc_count++) {
              if (that.saveddoc[doc_count].id == "Geschäftsanmeldung") {
                running_number += 1;
              }
            }

            if (running_number == 0) {
              showname = "Gewerbeanmeldung Der " + that.addressFormGroup.controls.companyName.value;
            } else {
              showname = "Gewerbeanmeldung Der " + that.addressFormGroup.controls.companyName.value + "-" + running_number;
            }
            displayName = "Geschäftsanmeldung Der " + that.addressFormGroup.controls.companyName.value;

          } else if (docName == 'Aktueller Auszug aus dem Handelsregister') {
            let running_number = 0;
            for (let doc_count = 0; doc_count < that.saveddoc.length; doc_count++) {
              if (that.saveddoc[doc_count].id == "Aktueller Auszug aus dem Handelsregister") {
                running_number += 1;
              }
            }

            if (running_number == 0) {
              displayName = 'Aktueller Auszug aus dem Handelsregister Der ' + that.addressFormGroup.controls.companyName.value;
            } else {
              displayName = 'Aktueller Auszug aus dem Handelsregister Der ' + that.addressFormGroup.controls.companyName.value + "-" + running_number;
            }

            showname = displayName;
          } else {

            let running_number = 0;
            for (let doc_count = 0; doc_count < that.saveddoc.length; doc_count++) {
              if (that.saveddoc[doc_count].id == docName) {
                running_number += 1;
              }
            }

            if (running_number == 0) {
              displayName = "Ausweisdokument Vertretungsberechtigte Person: " + dynamicceo;
            } else {
              displayName = "Ausweisdokument Vertretungsberechtigte Person: " + dynamicceo + "-" + running_number;
            }

            showname = displayName;
          }

          /*
          StringTemple =
            '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
            "" +
            '<div class="removepreview" id="removepreviewid' +
            preview +
            '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
            "" +
            '<img class="imageThumb" style="width: 100%;height:210px" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            "<div> <b>Dokumentenname: " +
            //f.name +
            displayName +
            "</b> </div><div> <b>Dateigröße: " +
            Size +
            "</b> KB </div>"+
            '   <div class="progress form-group " id="progressnew'+idname+'" style="background-color: grey;width: 100%;"> <div class="percentageclass'+idname+' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage'+idname+'" [style.width.%]=""> </div> </div>' +
            " </div>"
            +"</div>";
            */

          console.log("see times");
          console.log(that.previewsrc);
          console.log("ends here");

          if (showname == "Gewerbeanmeldung Der " + that.addressFormGroup.controls.companyName.value) {

            // StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">'+

            //                 '<div class="col-md-1">' +
            //                   '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
            //                   ImageName +
            //                   '" title="' +
            //                   f.name +
            //                   '"/>' +
            //                 '</div>'+

            //                 '<div class="col-md-10" style="font-size:14px;">' +
            //                   //'<span><b>Dokumentenname: ' + displayName +'</b></span> ' +
            //                   '<span><b>Dokumentenname: ' + showname +'</b></span> ' +
            //                   '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
            //                 '</div>'+

            //                 '<div class="col-md-1">'+


            //                 '<div class="removepreview" data-preview_id="'+that.previewid+'" id="removepreviewid' +
            //                 that.previewid +
            //                 '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


            //                 '  <div class="previewImage" data-preview_id="'+that.previewid+'" id="previewimage'+that.previewid+
            //                 '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 5px;margin-right: 0 !important;cursor: pointer;">'+

            //                 '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +


            //                 '</div>'+


            //                 '<div class="col-md-12">'+
            //                     '<div class="progress form-group progressnew'+idname+'" id="progressnew'+idname+'" style="background-color: grey;width: 100%;">'+
            //                         '<div class="percentageclass'+idname+' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage'+idname+'" [style.width.%]=""> </div>'+
            //                     '</div>' +
            //                 '</div>'+

            //               '</div>';

            StringTemple = '<div class="pip d-flex flex-column col-md-12 p-0 upload-file bg-white" style="margin-top:10px;border-radius: 9px;">' +

              '<div class="d-flex flex-row col-md-12 p-0">' +
              '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center">' +
              '<img class="imageThumb" style="width: 50px;height:30px;" src="' +
              ImageName +
              '" title="' +
              f.name +
              '"/>' +
              '</div>' +


              '<div class="col-md-8 d-flex justify-content-center flex-column p-0" style="font-size:11px; padding:1px" style="font-size:14px;">' +
              //'<span><b>Dokumentenname: ' + displayName +'</b></span> ' +
              '<span><b>Dokumentenname: ' + showname + '</b></span> ' +
              '<span><b>Dateigröße: ' + Size + '</b></span>' +
              '</div>' +
              '</div>' +

              '<div class="col-md-12 text-right d-flex flex-row align-items-center justify-content-end py-1" >' +
              '<div class="removepreview btn bg-danger links text-white mr-2 " data-preview_id="' + that.previewid + '" id="removepreviewid' +
              that.previewid +
              '" style="cursor: pointer;padding:1px 4px" ><i class="fas fa-times text-white "  aria-hidden="true"></i>&nbsp;Entfernen</div>' +
              '  <div class="previewImage btn links text-white " data-preview_src="' + that.previewsrc + '" data-preview_id="' + that.previewid + '" id="previewimage' + that.previewid +
              '" style="border:none;cursor: pointer; background: linear-gradient(#17459b, #02a9ed);padding:1px 4px;font-size:14px ">' +
              '<i class="text-white fa fa-eye" aria-hidden="true"></i>&nbsp;Sicht</div>' +

              '</div>' +


              '<div class="col-md-12">' +
              '<div class="progress form-group progressnew' + Size_num + i + '" id="progressnew' + Size_num + i + '" style="background-color: grey;width: 100%;">' +
              '<div class="percentageclass' + Size_num + i + ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' + Size_num + i + '" [style.width.%]=""> </div>' +
              '</div>' +
              '</div>' +

              '</div>';
          } else {
            // StringTemple = '<div class="row" style="width: 380px;margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">'+

            //               '<div class="col-md-1">' +
            //                 '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
            //                 ImageName +
            //                 '" title="' +
            //                 f.name +
            //                 '"/>' +
            //               '</div>'+

            //               '<div class="col-md-10" style="font-size:13.5px;">' +
            //                 //'<span><b>Dokumentenname: ' + displayName +'</b></span> ' +
            //                 '<span><b>Dokumentenname: ' + showname +'</b></span> ' +
            //                 '<span><b>Dateigröße: ' + Size+ '</b> KB</span>'+
            //               '</div>'+

            //               '<div class="col-md-1">'+


            //               '<div class="removepreview" data-preview_id="'+that.previewid+'" id="removepreviewid' +
            //               that.previewid +
            //               '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +


            //               '  <div class="previewImage" data-preview_id="'+that.previewid+'" id="previewimage'+that.previewid+
            //               '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 5px;margin-right: 0 !important;cursor: pointer;">'+

            //               '<i class="text-white fa fa-eye" aria-hidden="true"></i></div>' +


            //               '</div>'+


            //               '<div class="col-md-12">'+
            //                   '<div class="progress form-group progressnew'+idname+'" id="progressnew'+idname+'" style="background-color: grey;width: 100%;">'+
            //                       '<div class="percentageclass'+idname+' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage'+idname+'" [style.width.%]=""> </div>'+
            //                   '</div>' +
            //               '</div>'+

            //             '</div>';
            StringTemple = '<div class="pip d-flex flex-column col-md-12 p-0 upload-file bg-white" style="margin-top:10px;border-radius: 9px;">' +

              '<div class="d-flex flex-row col-md-12 p-0">' +
              '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center">' +
              '<img class="imageThumb" style="width: 50px;height:30px;"  src="' +
              ImageName +
              '" title="' +
              f.name +
              '"/>' +
              '</div>' +

              '<div class="col-md-8 d-flex justify-content-center flex-column p-0" style="font-size:11px; padding:1px" style="font-size:14px;">' +
              //'<span><b>Dokumentenname: ' + displayName +'</b></span> ' +
              '<span><b>Dokumentenname: ' + showname + '</b></span> ' +
              '<span><b>Dateigröße: ' + Size + '</b></span>' +
              '</div>' +
              '</div>' +
              '<div class="col-md-12 text-right d-flex flex-row align-items-center justify-content-end py-1" >' +
              '<div class="removepreview btn bg-danger mr-2 links text-white" data-preview_id="' + that.previewid + '" id="removepreviewid' +
              that.previewid +
              '" style="cursor: pointer;padding:1px 4px" ><i class="fas fa-times text-white "  aria-hidden="true"></i>&nbsp;Entfernen</div>' +
              ' <div class="previewImage btn links text-white " data-preview_src="' + that.previewsrc + '" data-preview_id="' + that.previewid + '" id="previewimage' + that.previewid +
              '" style="border:none;cursor: pointer; background: linear-gradient(#17459b, #02a9ed);padding:1px 4px;font-size:14px ">' +
              '<i class="text-white fa fa-eye" aria-hidden="true"></i>&nbsp;Sicht</div>' +

              '</div>' +


              '<div class="col-md-12">' +
              '<div class="progress form-group progressnew' + Size_num + i + '" id="progressnew' + Size_num + i + '" style="background-color: grey;width: 100%;">' +
              '<div class="percentageclass' + Size_num + i + ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' + Size_num + i + '" [style.width.%]=""> </div>' +
              '</div>' +
              '</div>' +

              '</div>';
          }






          //$("#" + preview).html(StringTemple);
          $("#" + preview).append(StringTemple);
          // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> KB </div>`).insertAfter(".pip")

          // $('#previewimage'+that.previewid).click(function(){
          //   previewData(that.previewid);
          // })

          console.log("inside if handleimagechange");
          console.log(that.filearray);
          console.log("saveddoc if");
          console.log(that.saveddoc);


          $('.previewImage').click(function (event) {
            //previewData($(this).data('preview_id'),displayName);
            previewData($(this).data('preview_id'), showname, $(this).data('preview_src'));
            event.stopPropagation();
            event.stopImmediatePropagation();
          })

          // $("#removepreviewid" + preview).click(function () {
          //$("#removepreviewid" + that.previewid).click(function () {
          $(".removepreview").click(function (event) {
            removeData(i);
            // $("#pipremove" + i).remove();

            that.saveddoc.forEach((value, index) => {
              //if(value.id == docName && value.index == idname) that.saveddoc.splice(index,1);

              if (idname.indexOf('DocOne') != -1) {
                if (value.id == docName && value.index == 'DocOne' + $(this).data('preview_id')) that.saveddoc.splice(index, 1);
              } else if (idname.indexOf('DocTwo') != -1) {
                if (value.id == docName && value.index == 'DocTwo' + $(this).data('preview_id')) that.saveddoc.splice(index, 1);
              } else if (idname.indexOf('DocThree') != -1) {
                if (value.id == docName && value.index == 'DocThree' + $(this).data('preview_id')) that.saveddoc.splice(index, 1);
              }



            });




            if (that.localData.hasOwnProperty('companytype')) {
              if (that.localData.companytype == 'Einzelunternehmen' || that.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {


              }
              else {

                let ceo_length = that.localData.type1.legalrepresentativeform.length;
                let shareholder_length = that.localData.type3.legalrepresentativeform2.length;

                let doc_check = false;

                let ceo_done = 0;
                let shareholder_done = 0;
                let geschaft_done = 0;
                let akt_done = 0;

                if (that.saveddoc.length > 0) {


                  for (let doc_length = 0; doc_length < that.saveddoc.length; doc_length++) {

                    let temp_ceo_length = parseInt(ceo_length) - 1;
                    if (ceo_length > 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                      ceo_done = 1;

                    } else if (ceo_length == 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person") {

                      ceo_done = 1;

                    }


                    // if(this.saveddoc[doc_length].id == "passportpic"){
                    //   shareholder_done += 1;
                    // }



                    if (that.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                      geschaft_done = 1;
                    }


                    if (that.saveddoc[doc_length].id == "Aktueller Auszug aus dem Handelsregister") {
                      akt_done = 1;
                    }


                  }


                  for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                    for (let doc_length = 0; doc_length < that.signeddoc.length; doc_length++) {
                      if (that.signeddoc[doc_length].docname ==
                        that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                        " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                        shareholder_done += 1;
                        break;
                      }

                    }
                  }





                  if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done == 1) {
                    that.disableddocumentgmbh = false;
                  } else {
                    that.disableddocumentgmbh = true;
                  }



                }

                if (that.documents.length > 0) {

                  for (let doc_length = 0; doc_length < that.documents.length; doc_length++) {

                    let temp_ceo_length = parseInt(ceo_length) - 1;
                    if (ceo_length > 1 && that.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                      ceo_done = 1;

                    } else if (ceo_length == 1 && that.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person") {

                      ceo_done = 1;

                    }

                    for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                      if (that.documents[doc_length].element.document_name ==
                        "Upload Ausweisdokument " + that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                        " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                        shareholder_done += 1;
                      }

                    }


                    if (that.documents[doc_length].element.document_name == "Geschäftsanmeldung") {
                      geschaft_done = 1;
                    }


                    if (that.documents[doc_length].element.document_name == "Aktueller Auszug aus dem Handelsregister") {
                      akt_done = 1;
                    }


                  }

                  if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done) {
                    that.disableddocumentgmbh = false;

                  } else {
                    that.disableddocumentgmbh = true;

                  }


                }






              }
            }




            $(this).parent().parent().remove();
            console.log("saved array" + JSON.stringify(that.saveddoc));
            // $(this).parent(".pip").remove();
            event.stopPropagation();
            event.stopImmediatePropagation();
          });
        };








        ////////////To show custom progress bar for files under 30 mb code starts here//////////

        /*

         let size_number = Size;

         let size_array = size_number.split(" ");

         let size_extension = size_array[1];
         let size_num = parseFloat(size_array[0]);
         if((size_extension=="MB" && size_num <= 30) || (size_extension=="KB" && size_num <= 30000)){
           let progress = 0;
           this.detect_upload_changes[this.previewid] = setInterval(() => {
             progress += 1;
             if(progress <= 99){
               $('div.percentageclass'+idname).width(progress+"%");
               $('div.percentageclass'+idname).html(progress+"%");
             }

             if(progress >=99){
               if(this.docuploaded){
                 $('div.percentageclass'+idname).width("100%");
                 $('div.percentageclass'+idname).html("100%");
                 setTimeout(()=>{
                   $('#progressnew'+idname).css("display","none");
                   $('#progressnew'+idname).css('width','0');
                   $('div.percentageclass'+idname).width("0");
                   $('div.percentageclass'+idname).css('width','0');
                   $('div.percentageclass'+idname).html('');
                   clearInterval(this.detect_upload_changes[this.previewid]);
                 },1000);
               }

             }
           }, 150);
         }
       */
        ////////////To show custom progress bar for files under 30 mb code ends here//////////






        // that.previewid += 1;

        fileReader.readAsDataURL(f);

        const formData = new FormData();
        formData.append("document", f);
        this.userService.uploaddocumentwithoutticketno(
          formData
        ).subscribe((event: HttpEvent<any>) => {
          switch (event.type) {

            case HttpEventType.Sent:
              console.log('Request has been made!');

              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              console.log(event.total);
              console.log(event.loaded);

              // this.progress[newsize] = Math.round(event.loaded / event.total * 100);

              //$('div.percentageclass'+idname).width(Math.round((event.loaded / event.total) * 100)+"%");
              //$('div.percentageclass'+idname).html(Math.round((event.loaded / event.total) * 100)+"%");

              //if((size_extension=="MB" && size_num > 30) || (size_extension=="KB" && size_num > 30000)){
              // $('div.percentageclass'+idname).width(Math.round((event.loaded / event.total) * 100)+"%");
              // $('div.percentageclass'+idname).html(Math.round((event.loaded / event.total) * 100)+"%");
              //}

              $('div.percentageclass' + Size_num + i).width(Math.round((event.loaded / event.total) * 100) + "%");
              $('div.percentageclass' + Size_num + i).html(Math.round((event.loaded / event.total) * 100) + "%");

              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);

              let obj1 = this.saveddoc.find((o, i) => {

                //if (o.id == docName && o.index == idname) {
                let indexx;
                if (idname.indexOf('DocOne') != -1) {
                  indexx = 'DocOne' + that.previewid;
                } else if (idname.indexOf('DocTwo') != -1) {
                  indexx = 'DocTwo' + that.previewid;
                } else if (idname.indexOf('DocThree') != -1) {
                  indexx = 'DocThree' + that.previewid;
                }


                if (o.id == docName && o.index == indexx) {
                  return true; // stop searching
                }
              });

              if (obj1) {
                console.log("singed array" + JSON.stringify(this.saveddoc))
              } else {
                //this.saveddoc.push({ id: docName , index: idname });

                let indexx;
                if (idname.indexOf('DocOne') != -1) {
                  indexx = 'DocOne' + that.previewid;
                } else if (idname.indexOf('DocTwo') != -1) {
                  indexx = 'DocTwo' + that.previewid;
                } else if (idname.indexOf('DocThree') != -1) {
                  indexx = 'DocThree' + that.previewid;
                }

                this.saveddoc.push({ id: docName, index: indexx });

                console.log("photo saved doc");
                console.log(this.saveddoc);





                if (this.localData.hasOwnProperty('companytype')) {
                  if (this.localData.companytype == 'Einzelunternehmen' || this.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {


                  }
                  else {

                    let ceo_length = this.localData.type1.legalrepresentativeform.length;
                    let shareholder_length = this.localData.type3.legalrepresentativeform2.length;

                    let doc_check = false;

                    let ceo_done = 0;
                    let shareholder_done = 0;
                    let geschaft_done = 0;
                    let akt_done = 0;

                    if (this.saveddoc.length > 0) {


                      for (let doc_length = 0; doc_length < this.saveddoc.length; doc_length++) {

                        let temp_ceo_length = parseInt(ceo_length) - 1;
                        if (ceo_length > 1 && this.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                          ceo_done = 1;

                        } else if (ceo_length == 1 && this.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person") {

                          ceo_done = 1;

                        }


                        // if(this.saveddoc[doc_length].id == "passportpic"){
                        //   shareholder_done += 1;
                        // }



                        if (this.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                          geschaft_done = 1;
                        }


                        if (this.saveddoc[doc_length].id == "Aktueller Auszug aus dem Handelsregister") {
                          akt_done = 1;
                        }


                      }


                      for (let share_doc_length = 0; share_doc_length < this.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                        for (let doc_length = 0; doc_length < this.signeddoc.length; doc_length++) {
                          if (this.signeddoc[doc_length].docname ==
                            this.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                            " " + this.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                            shareholder_done += 1;
                            break;
                          }

                        }
                      }

                      if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done == 1) {
                        this.disableddocumentgmbh = false;
                      } else {
                        this.disableddocumentgmbh = true;
                      }

                    }

                    if (this.documents.length > 0) {

                      for (let doc_length = 0; doc_length < this.documents.length; doc_length++) {

                        let temp_ceo_length = parseInt(ceo_length) - 1;
                        if (ceo_length > 1 && this.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                          ceo_done = 1;

                        } else if (ceo_length == 1 && this.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person") {

                          ceo_done = 1;

                        }

                        for (let share_doc_length = 0; share_doc_length < this.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                          if (this.documents[doc_length].element.document_name ==
                            "Upload Ausweisdokument " + this.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                            " " + this.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                            shareholder_done += 1;
                          }

                        }


                        if (this.documents[doc_length].element.document_name == "Geschäftsanmeldung") {
                          geschaft_done = 1;
                        }


                        if (this.documents[doc_length].element.document_name == "Aktueller Auszug aus dem Handelsregister") {
                          akt_done = 1;
                        }


                      }

                      if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done) {
                        this.disableddocumentgmbh = false;
                        doc_check = false;
                      } else {
                        this.disableddocumentgmbh = true;
                        doc_check = true;
                      }
                    }
                  }
                }

                console.log("singed array" + JSON.stringify(this.saveddoc))
              }
              setTimeout(() => {
                this.docuploaded = true;

                $('.progressnew' + Size_num + i).css("display", "none");
                $('.progressnew' + Size_num + i).css('width', '0');
                $('div.percentageclass' + Size_num + i).width("0%");
                $('div.percentageclass' + Size_num + i).html('');

                //this.documentid[idname]=event.body.document_unique_id;

                let indexx;
                if (idname.indexOf('DocOne') != -1) {
                  indexx = 'DocOne' + that.previewid;
                } else if (idname.indexOf('DocTwo') != -1) {
                  indexx = 'DocTwo' + that.previewid;
                } else if (idname.indexOf('DocThree') != -1) {
                  indexx = 'DocThree' + that.previewid;
                }

                this.documentid[indexx] = event.body.document_unique_id;

                let Size111 = f.size;
                let StringTypeCasting = this.dataconvert(Size111);
                let typeofimage = f.type;
                let dateofdocument = f.lastModified;
                let tags = []
                let newtage = StringTypeCasting + "," + typeofimage + "," + dateofdocument;
                tags.push(newtage);
                let document_name = '';

                console.log("indexx " + indexx);

                //this.documentlist[idname]={
                this.documentlist[indexx] = {
                  document_unique_id: event.body.document_unique_id,
                  document_type: "Allgemeines Dokument",
                  document_sub_type: " ",
                  user_id: this.id,
                  companycode: "42140 DFG Finanzprofi GmbH",

                  brand: "Cefima",
                  tags: tags,
                  upload_by: "cefima_document",
                  product_partner: " ",
                  document_name: document_name,
                  created_by: this.id
                };

                console.log("documentlist");
                console.log(this.documentlist);

                this.previewid += 1;
                //  if(this.documentid[1]!='' && this.documentid[0]!=''  && this.documentid[2]!='')
                //  {
                //   this.personalInfoFormGroup.patchValue({
                //     allupload:"0,00"
                //    });

                //   this.allupload=true;
                //  }

                //}, 1500);
              }, 500);

          }

        })

      }

    } else {

      console.log("includenote");
      var files = event.target.files; //FileList object
      // var output = document.getElementById("result");
      console.log("events" + event.target.files);
      var filesLength = files.length;
      console.log("fileslength" + filesLength);
      for (let i = 0; i < filesLength; i++) {
        let f = files[i];
        this.filearraynew.push(f);
        this.filename.push(docName);
        this.filearray = this.filearraynew;
        if (this.filearraynew.length == 3) {
          this.edited = false;
        } else {
          this.showButton = false;
        }

        this.document_progressbar += 1;

        var fileReader = new FileReader();
        //var target:EventTarget;
        //let Sizee = this.dataconvert(f.size);

        let Size = this.dataconvert(f.size);

        let Size_num = Math.round(f.size / 1024);

        fileReader.onload = function (e) {
          //var file = e.target;

          console.log(f.name.split("."));
          let extension = f.name.substr(f.name.lastIndexOf(".") + 1);
          console.log(extension);
          let ImageName;
          if (extension == "doc" || extension == "docx") {
            ImageName = "../assets/docx.png";
          } else if (extension == "pdf" || extension == "pdfx") {
            ImageName = "../assets/icons/file-upload-blue-pdf.svg";
          } else {
            ImageName = (e.target as any).result;
          }

          that.previewsrc = (e.target as any).result;

          // that.previewidandsrc[that.previewid-1].previewid = that.previewid;
          // that.previewidandsrc[that.previewid-1].previewsrc = that.previewsrc;

          that.previewidandsrc[that.previewid] = that.previewsrc;

          let displayName = docName;

          let showname = "";
          if (docName == 'Ausweisdokument Vertretungsberechtigte Person') {

            let running_number = 0;
            for (let doc_count = 0; doc_count < that.saveddoc.length; doc_count++) {
              if (that.saveddoc[doc_count].id == "Ausweisdokument Vertretungsberechtigte Person") {
                running_number += 1;
              }
            }

            if (that.companytypenew != 'Einzelunternehmen' && that.companytypenew != 'Eingetragener Kaufmann (e.K.)') {
              if (running_number == 0) {
                displayName = "Ausweisdokument Vertretungsberechtigte Person: " + that.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].firstname + " " + that.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].lastname;
              } else {
                displayName = "Ausweisdokument Vertretungsberechtigte Person: " + that.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].firstname + " " + that.secondcompanyaddressFormGroup.controls.legalrepresentativeform.value[0].lastname + "(" + running_number + ")";
              }

              showname = displayName;
            } else if (that.companytypenew == 'Einzelunternehmen' || that.companytypenew == 'Eingetragener Kaufmann (e.K.)') {
              if (running_number == 0) {
                displayName = "Ausweisdokument Vertretungsberechtigte Person: " + that.livingaddressFormGroup.value.firstname + that.livingaddressFormGroup.value.lastname;
              } else {
                displayName = "Ausweisdokument Vertretungsberechtigte Person: " + that.livingaddressFormGroup.value.firstname + that.livingaddressFormGroup.value.lastname + "(" + running_number + ")";
              }

              showname = displayName;
            }

          } else if (docName == 'Geschäftsanmeldung') {

            let running_number = 0;
            for (let doc_count = 0; doc_count < that.saveddoc.length; doc_count++) {
              if (that.saveddoc[doc_count].id == "Geschäftsanmeldung") {
                running_number += 1;
              }
            }

            if (running_number == 0) {
              showname = "Gewerbeanmeldung Der " + that.addressFormGroup.controls.companyName.value;
            } else {
              showname = "Gewerbeanmeldung Der " + that.addressFormGroup.controls.companyName.value + "(" + running_number + ")";
            }
            displayName = "Geschäftsanmeldung Der " + that.addressFormGroup.controls.companyName.value;

          } else if (docName == 'Aktueller Auszug aus dem Handelsregister') {
            let running_number = 0;
            for (let doc_count = 0; doc_count < that.saveddoc.length; doc_count++) {
              if (that.saveddoc[doc_count].id == "Aktueller Auszug aus dem Handelsregister") {
                running_number += 1;
              }
            }

            if (running_number == 0) {
              displayName = 'Aktueller Auszug aus dem Handelsregister Der ' + that.addressFormGroup.controls.companyName.value;
            } else {
              displayName = 'Aktueller Auszug aus dem Handelsregister Der ' + that.addressFormGroup.controls.companyName.value + "(" + running_number + ")";
            }

            showname = displayName;
          } else {

            let running_number = 0;
            for (let doc_count = 0; doc_count < that.saveddoc.length; doc_count++) {
              if (that.saveddoc[doc_count].id == docName) {
                running_number += 1;
              }
            }

            if (running_number == 0) {
              displayName = "Ausweisdokument Vertretungsberechtigte Person: " + dynamicceo;
            } else {
              displayName = "Ausweisdokument Vertretungsberechtigte Person: " + dynamicceo + "(" + running_number + ")";
            }

            showname = displayName;
          }


          /* StringTemple =
             '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
             "" +
             '<div class="removepreview" id="removepreviewid' +
             preview +
             '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
             "" +
             '<img class="imageThumb" style="width: 100%;height:210px" src="' +
             ImageName +
             '" title="' +
             f.name +
             '"/>' +
             "<div> <b>Dokumentenname: " +
            // f.name +
            //docName +
            displayName +
             "</b> </div><div> <b>Dateigröße: " +
             Size +
             "</b> KB </div>"+
             '   <div class="progress form-group " id="progressnew'+idname+'" style="background-color: grey;width: 100%;"> <div class="percentageclass'+idname+' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage'+idname+'" [style.width.%]=""> </div> </div>' +
             " </div>"
             +"</div>"; */

          console.log("see times in else");
          console.log(that.previewsrc);
          console.log("ends here");

          if (showname == "Gewerbeanmeldung Der " + that.addressFormGroup.controls.companyName.value) {

            StringTemple = '<div class="pip d-flex flex-column col-md-12 p-0 upload-file bg-white" style="margin-top:10px;border-radius: 9px;">' +
              '<div class="d-flex flex-row col-md-12 p-0">' +
              '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center">' +
              '<img class="imageThumb" style="width: 50px;height:30px;" src="' +
              ImageName +
              '" title="' +
              f.name +
              '"/>' +
              '</div>' +

              '<div class="col-md-8 d-flex justify-content-center flex-column p-0" style="font-size:11px; padding:1px" style="font-size:14px;">' +
              //'<span><b>Dokumentenname: ' + displayName +'</b></span> ' +
              '<span><b>Dokumentenname: ' + showname + '</b></span> ' +
              '<span><b>Dateigröße: ' + Size + '</b></span>' +
              '</div>' +
              '</div>' +
              '<div class="col-md-12 text-right d-flex flex-row align-items-center justify-content-end py-1" >' +
              '<div class="removepreview btn bg-danger links  text-white mr-2" data-preview_id="' + that.previewid + '" id="removepreviewid' +
              that.previewid +
              '" style="cursor: pointer;padding:1px 4px" ><i class="fas fa-times text-white "  aria-hidden="true"></i>&nbsp;Entfernen</div>'
            ' <div class="previewImage btn links text-white " data-preview_src="' + that.previewsrc + '" data-preview_id="' + that.previewid + '" id="previewimage' + that.previewid +
            '" style="border:none;cursor: pointer; background: linear-gradient(#17459b, #02a9ed);padding:1px 4px;font-size:14px ">' +
            '<i class="text-white fa fa-eye" aria-hidden="true"></i>&nbsp;Sicht</div>' +


              '</div>' +


              '<div class="col-md-12">' +
              '<div class="progress form-group progressnew' + Size_num + i + '" id="progressnew' + Size_num + i + '" style="background-color: grey;width: 100%;">' +
              '<div class="percentageclass' + Size_num + i + ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' + Size_num + i + '" [style.width.%]=""> </div>' +
              '</div>' +
              '</div>' +

              '</div>';
          } else {

            StringTemple = '<div class="pip d-flex flex-column col-md-12 p-0 upload-file bg-white" style="margin-top:10px;border-radius: 9px;">' +
              '<div class="d-flex flex-row col-md-12 p-0">' +
              '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center">' +
              '<img class="imageThumb" style="width: 50px;height:30px;" src="' +
              ImageName +
              '" title="' +
              f.name +
              '"/>' +
              '</div>' +

              '<div class="col-md-8 d-flex justify-content-center flex-column p-0" style="font-size:11px; padding:1px" style="font-size:14px;">' +
              //'<span><b>Dokumentenname: ' + displayName +'</b></span> ' +
              '<span><b>Dokumentenname: ' + showname + '</b></span> ' +
              '<span><b>Dateigröße: ' + Size + '</b></span>' +
              '</div>' +
              '</div>' +

              '<div class="col-md-12 text-right d-flex flex-row align-items-center justify-content-end py-1" >' +
              '<div class="removepreview btn bg-danger  links  mr-2 text-white"  data-preview_id="' + that.previewid + '" id="removepreviewid' +
              that.previewid +
              '" style="cursor: pointer;padding:1px 4px;font-size:14px" ><i class="fas fa-times text-white "  aria-hidden="true"></i>&nbsp;Entfernen</div>' +
              ' <div class="previewImage btn links text-white" data-preview_src="' + that.previewsrc + '" data-preview_id="' + that.previewid + '" id="previewimage' + that.previewid +
              '" style="border:none;cursor: pointer; background: linear-gradient(#17459b, #02a9ed);padding:1px 4px;font-size:14px ">' +
              '<i class="text-white fa fa-eye" aria-hidden="true"></i>&nbsp;Sicht</div>' +


              '</div>' +


              '<div class="col-md-12">' +
              '<div class="progress form-group progressnew' + Size_num + i + '" id="progressnew' + Size_num + i + '" style="background-color: grey;width: 100%;">' +
              '<div class="percentageclass' + Size_num + i + ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' + Size_num + i + '" [style.width.%]=""> </div>' +
              '</div>' +
              '</div>' +

              '</div>';
          }







          //$("#" + preview).html(StringTemple);
          $("#" + preview).append(StringTemple);
          // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> KB </div>`).insertAfter(".pip")

          // $('#previewimage'+that.previewid).click(function(){
          //   previewData(that.previewid);
          // })

          console.log("inside else handleimagechange");
          console.log(that.filearray);
          console.log("saveddoc else");
          console.log(that.saveddoc);

          //$(document).on('click', '.addproduct', function () {

          $('.previewImage').click(function (event) {
            //previewData($(this).data('preview_id'),displayName);
            previewData($(this).data('preview_id'), showname, $(this).data('preview_src'));
            event.stopPropagation();
            event.stopImmediatePropagation();
          })

          // $("#removepreviewid" + preview).click(function () {
          // $("#removepreviewid" + that.previewid).click(function () {
          $(".removepreview").click(function (event) {
            removeData(i);

            // $("#pipremove" + i).remove();
            //$(this).parent(".pip").remove();

            that.saveddoc.forEach((value, index) => {
              //if(value.id == docName && value.index == idname) that.saveddoc.splice(index,1);

              //if(value.id == docName && value.index == idname) that.saveddoc.splice(index,1);

              if (idname.indexOf('DocOne') != -1) {
                if (value.id == docName && value.index == 'DocOne' + $(this).data('preview_id')) that.saveddoc.splice(index, 1);
              } else if (idname.indexOf('DocTwo') != -1) {
                if (value.id == docName && value.index == 'DocTwo' + $(this).data('preview_id')) that.saveddoc.splice(index, 1);
              } else if (idname.indexOf('DocThree') != -1) {
                if (value.id == docName && value.index == 'DocThree' + $(this).data('preview_id')) that.saveddoc.splice(index, 1);
              }



            });




            if (that.localData.hasOwnProperty('companytype')) {
              if (that.localData.companytype == 'Einzelunternehmen' || that.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {


              }
              else {

                let ceo_length = that.localData.type1.legalrepresentativeform.length;
                let shareholder_length = that.localData.type3.legalrepresentativeform2.length;

                let doc_check = false;

                let ceo_done = 0;
                let shareholder_done = 0;
                let geschaft_done = 0;
                let akt_done = 0;


                if (that.saveddoc.length > 0) {


                  for (let doc_length = 0; doc_length < that.saveddoc.length; doc_length++) {

                    let temp_ceo_length = parseInt(ceo_length) - 1;
                    if (ceo_length > 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                      ceo_done = 1;

                    } else if (ceo_length == 1 && that.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person") {

                      ceo_done = 1;

                    }


                    // if(this.saveddoc[doc_length].id == "passportpic"){
                    //   shareholder_done += 1;
                    // }



                    if (that.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                      geschaft_done = 1;
                    }


                    if (that.saveddoc[doc_length].id == "Aktueller Auszug aus dem Handelsregister") {
                      akt_done = 1;
                    }


                  }



                  for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                    for (let doc_length = 0; doc_length < that.signeddoc.length; doc_length++) {
                      if (that.signeddoc[doc_length].docname ==
                        that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                        " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                        shareholder_done += 1;
                        break;
                      }

                    }
                  }





                  if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done == 1) {
                    that.disableddocumentgmbh = false;
                  } else {
                    that.disableddocumentgmbh = true;
                  }



                }

                if (that.documents.length > 0) {

                  for (let doc_length = 0; doc_length < that.documents.length; doc_length++) {

                    let temp_ceo_length = parseInt(ceo_length) - 1;
                    if (ceo_length > 1 && that.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                      ceo_done = 1;

                    } else if (ceo_length == 1 && that.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person") {

                      ceo_done = 1;

                    }

                    for (let share_doc_length = 0; share_doc_length < that.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                      if (that.documents[doc_length].element.document_name ==
                        "Upload Ausweisdokument " + that.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                        " " + that.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                        shareholder_done += 1;
                      }

                    }


                    if (that.documents[doc_length].element.document_name == "Geschäftsanmeldung") {
                      geschaft_done = 1;
                    }


                    if (that.documents[doc_length].element.document_name == "Aktueller Auszug aus dem Handelsregister") {
                      akt_done = 1;
                    }


                  }

                  if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done) {
                    that.disableddocumentgmbh = false;
                    doc_check = false;
                  } else {
                    that.disableddocumentgmbh = true;
                    doc_check = true;
                  }


                }






              }
            }




            $(this).parent().parent().remove();
            console.log("saved array" + JSON.stringify(that.saveddoc))
            event.stopPropagation();
            event.stopImmediatePropagation();
          });
        };

        //that.previewid += 1;




        ////////////To show custom progress bar for files under 30 mb code starts here//////////

        /*

         let size_number = Sizee;

         let size_array = size_number.split(" ");

         let size_extension = size_array[1];
         let size_num = parseFloat(size_array[0]);
         if((size_extension=="MB" && size_num <= 30) || (size_extension=="KB" && size_num <= 30000)){
           let progress = 0;
           this.detect_upload_changes[this.previewid] = setInterval(() => {
             progress += 1;
             if(progress <= 99){
               $('div.percentageclass'+idname).width(progress+"%");
               $('div.percentageclass'+idname).html(progress+"%");
             }

             if(progress >=99){
               if(this.docuploaded){
                 $('div.percentageclass'+idname).width("100%");
                 $('div.percentageclass'+idname).html("100%");
                 setTimeout(()=>{
                   $('#progressnew'+idname).css("display","none");
                   $('#progressnew'+idname).css('width','0');
                   $('div.percentageclass'+idname).width("0");
                   $('div.percentageclass'+idname).css('width','0');
                   $('div.percentageclass'+idname).html('');
                   clearInterval(this.detect_upload_changes[this.previewid]);
                 },1000);
               }

             }
           }, 150);
         }
       */
        ////////////To show custom progress bar for files under 30 mb code ends here//////////




        fileReader.readAsDataURL(f);

        const element = document.querySelector('#goDown');
        element.scrollIntoView();

        window.scrollTo(0, document.body.scrollHeight);

        const formData = new FormData();
        formData.append("document", f);
        this.userService.uploaddocumentwithoutticketno(
          formData
        ).subscribe((event: HttpEvent<any>) => {


          switch (event.type) {

            case HttpEventType.Sent:
              console.log('Request has been made!');

              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:

              console.log(event.total);
              console.log(event.loaded);

              // $('#percentage'+idname).width(Math.round(event.loaded / event.total * 100)+"%");
              // $('#percentage'+idname).html(Math.round(event.loaded / event.total * 100)+"%");
              // this.progress[newsize] = Math.round(event.loaded / event.total * 100);




              //$('div.percentageclass'+idname).width(Math.round((event.loaded / event.total) * 100)+"%");
              //$('div.percentageclass'+idname).html(Math.round((event.loaded / event.total) * 100)+"%");

              //if((size_extension=="MB" && size_num > 30) || (size_extension=="KB" && size_num > 30000)){
              // $('div.percentageclass'+idname).width(Math.round((event.loaded / event.total) * 100)+"%");
              // $('div.percentageclass'+idname).html(Math.round((event.loaded / event.total) * 100)+"%");
              //}

              $('div.percentageclass' + Size_num + i).width(Math.round((event.loaded / event.total) * 100) + "%");
              $('div.percentageclass' + Size_num + i).html(Math.round((event.loaded / event.total) * 100) + "%");

              console.log("loading is above");

              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);

              let obj1 = this.saveddoc.find((o, i) => {

                //if (o.id == docName && o.index == idname) {
                let indexx;
                if (idname.indexOf('DocOne') != -1) {
                  indexx = 'DocOne' + that.previewid;
                } else if (idname.indexOf('DocTwo') != -1) {
                  indexx = 'DocTwo' + that.previewid;
                } else if (idname.indexOf('DocThree') != -1) {
                  indexx = 'DocThree' + that.previewid;
                }
                if (o.id == docName && o.index == indexx) {
                  return true; // stop searching
                }
              });

              if (obj1) {
                console.log("singed array" + JSON.stringify(this.saveddoc))
              } else {
                // this.saveddoc.push({ id: docName , index: idname });

                let indexx;
                if (idname.indexOf('DocOne') != -1) {
                  indexx = 'DocOne' + that.previewid;
                } else if (idname.indexOf('DocTwo') != -1) {
                  indexx = 'DocTwo' + that.previewid;
                } else if (idname.indexOf('DocThree') != -1) {
                  indexx = 'DocThree' + that.previewid;
                }

                this.saveddoc.push({ id: docName, index: indexx });

                console.log("photo saved doc");
                console.log(this.saveddoc);




                console.log("saved doc length in else handleinagechange");
                console.log(this.saveddoc.length);
                console.log(this.filearray);
                console.log(this.filearraypass);
                console.log(this.filearraypassport);





                if (this.localData.hasOwnProperty('companytype')) {
                  if (this.localData.companytype == 'Einzelunternehmen' || this.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {


                  }
                  else {

                    let ceo_length = this.localData.type1.legalrepresentativeform.length;
                    let shareholder_length = this.localData.type3.legalrepresentativeform2.length;

                    let doc_check = false;

                    let ceo_done = 0;
                    let shareholder_done = 0;
                    let geschaft_done = 0;
                    let akt_done = 0;


                    if (this.saveddoc.length > 0) {


                      for (let doc_length = 0; doc_length < this.saveddoc.length; doc_length++) {

                        let temp_ceo_length = parseInt(ceo_length) - 1;
                        if (ceo_length > 1 && this.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                          ceo_done = 1;

                        } else if (ceo_length == 1 && this.saveddoc[doc_length].id == "Ausweisdokument Vertretungsberechtigte Person") {

                          ceo_done = 1;

                        }


                        // if(this.saveddoc[doc_length].id == "passportpic"){
                        //   shareholder_done += 1;
                        // }



                        if (this.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                          geschaft_done = 1;
                        }


                        if (this.saveddoc[doc_length].id == "Aktueller Auszug aus dem Handelsregister") {
                          akt_done = 1;
                        }


                      }


                      for (let share_doc_length = 0; share_doc_length < this.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                        for (let doc_length = 0; doc_length < this.signeddoc.length; doc_length++) {
                          if (this.signeddoc[doc_length].docname ==
                            this.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                            " " + this.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                            shareholder_done += 1;
                            break;
                          }

                        }
                      }





                      if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done == 1) {
                        this.disableddocumentgmbh = false;
                      } else {
                        this.disableddocumentgmbh = true;
                      }



                    }

                    if (this.documents.length > 0) {


                      for (let doc_length = 0; doc_length < this.documents.length; doc_length++) {

                        let temp_ceo_length = parseInt(ceo_length) - 1;
                        if (ceo_length > 1 && this.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person" + temp_ceo_length) {

                          ceo_done = 1;

                        } else if (ceo_length == 1 && this.documents[doc_length].element.document_name == "Ausweisdokument Vertretungsberechtigte Person") {

                          ceo_done = 1;

                        }

                        for (let share_doc_length = 0; share_doc_length < this.localData.type3.legalrepresentativeform2.length; share_doc_length++) {

                          if (this.documents[doc_length].element.document_name ==
                            "Upload Ausweisdokument " + this.localData.type3.legalrepresentativeform2[share_doc_length].firstname +
                            " " + this.localData.type3.legalrepresentativeform2[share_doc_length].lastname) {

                            shareholder_done += 1;
                          }

                        }


                        if (this.documents[doc_length].element.document_name == "Geschäftsanmeldung") {
                          geschaft_done = 1;
                        }


                        if (this.documents[doc_length].element.document_name == "Aktueller Auszug aus dem Handelsregister") {
                          akt_done = 1;
                        }


                      }

                      if (ceo_done == 1 && shareholder_done >= shareholder_length && geschaft_done == 1 && akt_done) {
                        this.disableddocumentgmbh = false;
                        doc_check = false;
                      } else {
                        this.disableddocumentgmbh = true;
                        doc_check = true;
                      }


                    }






                  }
                }





                console.log("singed array" + JSON.stringify(this.saveddoc))
              }


              setTimeout(() => {

                // $('#progressnew'+idname).css("display","none");
                // $('#progressnew'+idname).css('width','0');

                this.docuploaded = true;
                // $('div.percentageclass'+idname).width("0%");
                // $('div.percentageclass'+idname).html('');
                // $('.progressnew'+idname).css("display","none");
                // $('.progressnew'+idname).css('width','0');

                //if((size_extension=="MB" && size_num > 30) || (size_extension=="KB" && size_num > 30000)){
                // $('div.percentageclass'+idname).width("0%");
                // $('div.percentageclass'+idname).html('');
                // $('.progressnew'+idname).css("display","none");
                // $('.progressnew'+idname).css('width','0');
                //}

                $('div.percentageclass' + Size_num + i).width("0%");
                $('div.percentageclass' + Size_num + i).html('');
                $('.progressnew' + Size_num + i).css("display", "none");
                $('.progressnew' + Size_num + i).css('width', '0');

                //this.documentid[idname]=event.body.document_unique_id;

                let indexx;
                if (idname.indexOf('DocOne') != -1) {
                  indexx = 'DocOne' + that.previewid;
                } else if (idname.indexOf('DocTwo') != -1) {
                  indexx = 'DocTwo' + that.previewid;
                } else if (idname.indexOf('DocThree') != -1) {
                  indexx = 'DocThree' + that.previewid;
                }

                this.documentid[indexx] = event.body.document_unique_id;

                let Size111 = f.size;
                let StringTypeCasting = this.dataconvert(Size111);
                let typeofimage = f.type;
                let dateofdocument = f.lastModified;
                let tags = []
                let newtage = StringTypeCasting + "," + typeofimage + "," + dateofdocument;
                tags.push(newtage);
                let document_name = '';

                console.log("indexx " + indexx);

                //this.documentlist[idname]={
                this.documentlist[indexx] = {
                  document_unique_id: event.body.document_unique_id,
                  document_type: "Allgemeines Dokument",
                  document_sub_type: " ",
                  user_id: this.id,
                  companycode: "42140 DFG Finanzprofi GmbH",

                  brand: "Cefima",
                  tags: tags,
                  upload_by: "cefima_document",
                  product_partner: " ",
                  document_name: document_name,
                  created_by: this.id
                };

                console.log("documentlist");
                console.log(this.documentlist);

                this.previewid += 1;
                //  if(this.documentid[1]!='' && this.documentid[0]!=''  && this.documentid[2]!='')
                //  {
                //   this.personalInfoFormGroup.patchValue({
                //     allupload:"0,00"
                //    });

                //   this.allupload=true;
                //  }

                //}, 1500);
              }, 500);

          }
        })
      }










    }
    console.log(this.filearray);

  }


  dataconvert(bytes: number = 0, precision: number | unitPrecisionMap = defaultPrecisionMap): string {

    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';

    let unitIndex = 0;

    while (bytes >= 1024) {
      bytes /= 1024;
      unitIndex++;
    }

    const unit = this.units[unitIndex];

    if (typeof precision === 'number') {
      return `${bytes.toFixed(+precision)} ${unit}`;
    }
    return `${bytes.toFixed(precision[unit])} ${unit}`;
  }
  changestatus($event) {
    if (
      this.personalInfoFormGroup.get("Vermittlerstatus").value ==
      "Handelsvertreter"
    ) {
      this.personalInfoFormGroup.patchValue({
        Vermittlerstatus: "Handelsvertreter",
      });
      this.showCompanyType();
    } else {
      this.personalInfoFormGroup.patchValue({
        Vermittlerstatus: "Versicherungsmakler",
      });
      this.showCompanyType();
    }
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
}
