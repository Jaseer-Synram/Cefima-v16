import { DatePipe } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import * as intlTelInput from 'intl-tel-input';
import jsPDF from 'jspdf';
import { interval, Observable, Subscription, first, startWith, map } from 'rxjs';
import SignaturePad from 'signature_pad';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { PagerService } from '../_services';
import { AuthService } from '../auth.service';
import { EventEmitterService } from '../event-emitter.service';
import { UserService } from '../user.service';
import { VideoChatComponent } from '../video-chat/video-chat.component';


type unit = "bytes" | "KB" | "MB" | "GB" | "TB" | "PB";
type unitPrecisionMap = {
  [u in unit]: number;
};

const defaultPrecisionMap: unitPrecisionMap = {
  bytes: 0,
  KB: 0,
  MB: 1,
  GB: 1,
  TB: 2,
  PB: 2,
};
declare var $: any;
@Component({
  selector: 'app-customer-side',
  templateUrl: './customer-side.component.html',
  styleUrls: ['./customer-side.component.css']
})
export class CustomerSideComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {



  @ViewChild("canvas") canvas: ElementRef;
  signaturePad: SignaturePad

  video_chat_data: any = {};
  public intervallTimer = interval(1000);

  public age: number;
  defaultCenter = { lat: 55.5815245, lng: 36.8251383 };
  currentCenter = Object.assign({}, this.defaultCenter);
  zoom = 3;
  private readonly units: unit[] = ["bytes", "KB", "MB", "GB", "TB", "PB"];
  myControl = new FormControl();
  myControlland = new FormControl();


  hideValues = {
    hideHaushaltMain: true,
    hideHaushaltIn1: true,
    hideContainerMain: true,
    hideContainerIn: true,
    hidemultiCompanyprivatecustomerMain: true,
    hidemultiCompanyprivatecustomerIn: true,
    hideCompanyCustomerMain: true,
    hideCompanyCustomerIn: true,
    hidemultiCompanycustomerMain: true,
    hidemultiCompanycustomerIn: true,
    hidedisabledfamilyMain: true,
    hidedisabledfamilyIn:true,
    hideCompanyMain: true,
    hideCompanyIn: true,
    hidemultiCompanyMain: true,
    hidemultiCompanyIn: true
  };

  Vertrage = {
    Angebote: {
      Versicherungsgesellschaft: true,
      Geldanlagen: true,
      Bank: true
    },
    Laufende: {
      Versicherungsgesellschaft: true,
      Geldanlagen: true,
      Bank: true
    },
    Allgemeine: true
  }

  addKunden = {
    exampleModalLongnewfamilyPOA: true,
    exampleModalLongnewcompany: true,
    exampleModalLongnewcompanyoffices: true,
    exampleModalLongnewcompanycustomer: true
  }

  itemToDisplayUnderKunden = ''

  public signaturePadOptions: Object = {
    minWidth: 2,
    canvasWidth: 750,
    canvasHeight: 300,
  };

  @ViewChild("livingfso") familyForm: NgForm;
  @ViewChild("livingfso12") CEOform: NgForm;
  @ViewChild("livingfso123") OtherPersonform: NgForm;
  @ViewChild("livingfso1234") Shareholderform: NgForm;
  @ViewChild("livingfsooffice") officeForm: NgForm;
  @ViewChild("fso1") addressFormNew: NgForm;
  @ViewChild("livingfso1") personaladdressFormNew: NgForm;

  @ViewChild("fs1") docgroup: NgForm;
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
  familyRelationOptions: Observable<any>;
  documentid: any = [];
  type3count1: number = 0;
  documentlist: any = [];
  documentpassid: any = [];
  documentpasslist: any = [];
  martialStatusOptions: Observable<any>;

  sach: any = 0;
  renten: any = 0;
  kranken: any = 0;
  gewerbesach: any = 0;

  investment: any = 0;
  sachwerte: any = 0;

  immobilien: any = 0;
  verbraucher: any = 0;
  unternehmen: any = 0;
  kfz: any = 0;

  btnarr: any = ["Versicherungsgesellschaft", "Geldanlagen", "Bank"];
  Versicherungsgesellschaftarr1: any = [
    "Sach" + this.sach,
    "Renten/Leben " + this.renten,
    "Kranken " + this.kranken,
    "Gewerbesach " + this.gewerbesach,
  ];
  Geldanlagenarr1: any = [
    "Investment " + this.investment,
    "Sachwerte " + this.sachwerte,
  ];
  Bankarr1: any = [
    "Immobilienfinanzierung " + this.immobilien,
    "Verbraucherkredite " + this.verbraucher,
    "Unternehmensfinanzierung " + this.unternehmen,
    "KFZ Kredite " + this.kfz,
  ];

  sach2: any = 0;
  renten2: any = 0;
  kranken2: any = 0;
  gewerbesach2: any = 0;

  investment2: any = 0;
  sachwerte2: any = 0;

  immobilien2: any = 0;
  verbraucher2: any = 0;
  unternehmen2: any = 0;
  kfz2: any = 0;

  Versicherungsgesellschaftarr: any = [
    "Sach " + this.sach2,
    "Renten/Leben " + this.renten2,
    "Kranken " + this.kranken2,
    "Gewerbesach " + this.gewerbesach2,
  ];
  Geldanlagenarr: any = [
    "Investment " + this.investment2,
    "Sachwerte " + this.sachwerte2,
  ];
  Bankarr: any = [
    "Immobilienfinanzierung " + this.immobilien2,
    "Verbraucherkredite " + this.verbraucher2,
    "Unternehmensfinanzierung " + this.unternehmen2,
    "KFZ Kredite " + this.kfz2,
  ];

  ThirdTypeDocOptions: Observable<any>;
  filteredOptions: Observable<string[]>;
  filteredOptionsland: Observable<string[]>;
  docFromGroup: FormGroup;
  officedocFromGroup: FormGroup;
  showCustomer = false;
  options: any;
  BranchArray: [] = [];
  ProductTypeArray: any = [];
  familyData: any = [];
  officeData: any = [];
  userofficeData: any = [];
  addmoredata = false;
  moveForward = true;
  saveddoc: any = [];
  showmekFinanz = false;
  familyRelation = new FormControl();
  ThirdTypeDoc = new FormControl();
  martialStatusControl = new FormControl();
  showFiorettoImmob = false;
  showBirema = false;
  startRecordtype: any = [{ type1: "" }, { type2: "" }, { type3: "" }];
  endRecordtype: any = [{ type1: "" }, { type2: "" }, { type3: "" }];
  pagedItemstype: any[] = [{ type1: [] }, { type2: [] }, { type3: [] }];
  pagertype: any = [{ type1: "" }, { type2: "" }, { type3: "" }];
  type1: any = [];
  type2: any = [];
  error: { [index: string]: any } = {};
  type3: any = [];

  showFiorettoMedia = false;
  showAirmage = false;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2020, 0, 1);
  docuploaded: boolean = true;
  customerid: any = "";
  unreadcount: any = 0;
  lastcase_no: any = "";
  filename: any = [];
  filenamepass: any = [];
  year: any = new Date().getFullYear();
  showHoraiDetektei = false;
  personaldataform: FormGroup;
  familyFormGroup: FormGroup;
  officeFormGroup: FormGroup;

  officeaddressFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  addressFormGroupnew: FormGroup;
  askquestion: FormGroup;
  livingaddressFormGroup: FormGroup;
  companytypenew: any = "";
  producttypenew: any = [];
  addedpersons: any = [];
  addedpersonsFirst: any = [];
  addedpersonsSecond: any = [];
  familydataform: FormGroup;
  showVarioImport = false;
  companydataform: FormGroup;
  officedataform: FormGroup;
  FilterBranchTypeOptions: Observable<any>;
  showSterbVorsoge = false;
  branchlist: any = [];
  sharesvalue: number = 100;
  showCheckntrack = false;
  customerDocList: any = [];

  customerDocListunique: any = [];

  customerDocListsecond: any = [];

  customerDocListsecondunique: any = [];

  latitude: any;
  enterTitlebroker = false;
  drawingnew = 0;
  brokerfirstname: any = "";
  brokerlastname: any = "";
  brokerCOMPANYNAME: any = "";
  openid: any = "";
  brokertitle: any = "";
  brokerregistration_number: any = "";
  brokerplz: any = "";
  brokercontactno: any = "";
  brokerstreet: any = "";
  brokercity: any = "";
  brokerstreetNumber: any = "";
  wrongBranchValue: boolean = false;
  brokerlogo: any = "";
  brokerwelcomevideo: any = "";
  shareholdersindex: any = "";
  brokeresign: any = "";
  brokerCOMPANYTYPE: any = "";
  COMPANYTYPE: any = "";
  longitude: any;
  ptname: any;
  showCompanyname: boolean = false;
  Transaction_Type: any;
  token: any;
  setindex: any = 9999;
  responseobserve: Subscription;
  countryName: any;
  origin = {};
  messagelist: any = [];
  currentMemberId: any = "";
  selectedbroker: any = [];
  destination = {};
  brokerformtype2: FormGroup;
  brokerformtype3: FormGroup;
  newcaselistnew: any = [];
  pager: any = {};
  caselistnew: any = [];
  pagersecond: any = {};
  companyId: any = "";
  membertype1: any;
  membertype2: any;
  membertype3: any;
  companyData: any = [];
  brokername: any;
  pagerGDOC: any = {};
  customerCompanyId: any = "";
  alluserdetails: any = [];
  pagedItems: any[];
  loginRole = localStorage.getItem("currentActiveRole");
  pagedItemssecond: any[];

  pagedItemssecondunique: any = [];

  pagedItemsGDOC: any[];
  sentence = "    My     string     with     a        lot   of Whitespace.  "
    .replace(/\s+/g, "#")
    .trim();
  sentence1 = "    My     string     with     a        lot   of Whitespace.  ";

  editsendbutton: any = true;
  startRecord: any;
  endRecord: any;
  startRecordsecond: any;
  endRecordsecond: any;
  finalFirstname1: any = "";
  finalLastname1: any = "";
  familyOrCompany: any = "";
  startRecordGDOC: any;
  endRecordGDOC: any;
  agreementFromGroupFamily: FormGroup;
  ImgUrl: string = "";
  ceoDocList: any = [];
  customervalidemail = false;
  secondcompanyaddressFormGroup: FormGroup;
  secondcompanyaddressFormGroup1: FormGroup;
  secondcompanyaddressFormGroup2: FormGroup;
  CEOFormGroup: FormGroup;
  OtherPersonFormGroup: FormGroup;
  ShareholderFormGroup: FormGroup;
  href: string = "";
  ShowDiv: boolean = false;
  selectedptid: any = "";
  showceodoc = false;
  selectedppid: any = "";
  brokerformtype1: FormGroup;
  TimeLineData: any[] = [];
  OfferedDocWithTicket_No: any = [];
  Conversation: any[] = [];
  showmore = [false];
  showmore2 = [false];
  showmore1 = [false];
  GetAllConversation: any[] = [];
  branchlisttotal: any = [];
  particularConversation: string;
  currentid: any
  ReciverId: string;
  filearraynew: any[] = [];
  filearray: any[] = [];
  l = 0;

  title: any
  lastname: any
  firstname: any
  id: any
  COMPANYNAME: any

  header_title: any
  header_firstname: any
  header_lastname: any
  header_companyname: any

  tokensession = localStorage.getItem("token");
  localData: any = JSON.parse(localStorage.getItem("currentUser"));
  currentActiveRole = localStorage.getItem("currentActiveRole");
  documents: any;
  signeddoc: any = [];
  tags: any[] = [];
  agreementFromGroup: FormGroup;
  secondcompanyaddressFormGroupdata: any = [];
  api_url: string;
  previewid: string;
  OfferdDocUrl: string;
  TodayDate: any;
  P_type: any;
  CasenoId: any;
  T_N: any;
  companydataformadded: FormGroup;
  uploadfile: number = 0;
  routeParamsActive: any = "";
  NotConversation: boolean = true;
  enablebutton: boolean = true;
  StartConversation: boolean = false;
  messages: string;
  SenderId: string;
  branchTypeControl = new FormControl();
  tabname: any = false;
  filearraypass: any[] = [];
  filearraypassport: any[] = [];

  values_document: any = [];

  temporary_documents: any = [];

  relations: string[] = [
    "Mutter",
    "Vater",
    "Ehefrau",
    "Ehemann",
    "Sohn",
    "Tochter",
    "Eheähnliche Gemeinschaft",
    "Keines",
  ];
  martialStatus: string[] = [
    "Alleinstehend ",
    "Verheiratet",
    "Geschieden",
    "Eheähnliche Gemeinschaft",
  ];
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
  companytypevalue: boolean;
  brokercustomernum: any = "";
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  foundingdate: any = "";
  addMoreShareholder: boolean = true;
  cansaveShareholder: boolean = true;
  addMoreMemberShareholder: boolean = true;

  ReadyProductsOptions: any[];
  ReadyProductsTypeOptions: string[];

  filteredProductsOptions: Observable<any>;
  filteredProductsTypeOptions: Observable<any>;
  ProductsControl = new FormControl();
  ProductsTypeControl = new FormControl();

  ShowProductsPartner: any = false;

  customerList: [] = [];

  lastproducttypeid: any = "";

  lastproductpartnerid: any = "";

  ShowButton: boolean = false;

  uploadingdata: any = [];
  document_uploaded: any = [];

  pdffile: any;

  current_tab: any = [];

  document_number: number = 0;

  disableddocumentgmbh: any = true;

  preview_id: number = 0;
  previewidandsrc: any = [];
  previewsrc: any = [];

  previewpassportid: number = 0;
  previewpassportidandsrc: any = [];
  previewpassportsrc: any = [];

  edited: any = false;
  showButton: any = false;

  created_company_customer_id: any = [];

  customer_company_name: string = "";

  customer_street: any = [];
  customer_streetNumber: any = [];
  customer_postCode: any = [];
  customer_city: any = [];

  poa_src: any = [];

  consulting_data: any = [];

  objekte_questions: any = [];
  gesundheitsangaben_questions: any = [];
  einkommen_questions: any = [];

  objekte_answers: any = [];
  gesundheitsangaben_answers: any = [];
  einkommen_answers: any = [];

  tabList: any = [];
  selectedQuestionArray: any = [];
  opened_question: any = 0;
  selected_producttype: any = [];
  selected_producttype_questions: any = [];
  selected_producttype_answers: any = [];
  selected_answer_option_index: any = [];
  // selected_answer_option_index: any = 0;
  selectedQuestion: any = [];
  answered_question_id: any = [];

  uploaded_document_id: any = [];
  uploaded_document_tags: any = [];

  localFileUrl: any = [];
  API_URL = environment.API_URL;

  selectedTab: any = { id: "", name: "" };
  currentSignature: any = "";
  uploadedPdfData: any;
  selectedAnswers: any = [];
  currentQuestionId: any = "";
  currentAnswer: any = {};
  documentPdfList: any = [];

  branchList: any = [];

  currentTabUser: any = JSON.parse(localStorage.getItem("currentUser")!);
  opened_tab: any = {
    personal_data: true,
    official_residence: false,
    more_info: false,
  };

  isHoverUnternahman = false
  isHoverHaushalt = false
  indexOfHideValues:any = -1
  indexOfHideValuesj:any = -1

  constructor(
    private authService: AuthService,
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private userService: UserService,
    private form_builder: FormBuilder,
    private pagerService: PagerService, // private _socket: SocketService
    public dialog: MatDialog,
    public eventEmitterService: EventEmitterService
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => {
    //   return false;
    // };

    this.route.queryParams.subscribe((params) => {
      this.tabname = params["tabname"];
      this.customerid = params["id"];
      this.userService.invokeSideBarRouteFether.next(this.customerid)

    });
    this.secondcompanyaddressFormGroup = this.form_builder.group({
      legalrepresentativeform: this.form_builder.array([]),
    });

    this.secondcompanyaddressFormGroup1 = this.form_builder.group({
      legalrepresentativeform1: this.form_builder.array([]),
    });

    this.secondcompanyaddressFormGroup2 = this.form_builder.group({
      legalrepresentativeform2: this.form_builder.array([]),
    });
    this.routeParamsActive = this.route.snapshot.routeConfig?.path;

    this.userService.selectCustomerSideItem.subscribe(data => {
      console.log('hiden?', data);

      for (const key of Object.keys(this.Vertrage.Laufende)) {
        this.Vertrage.Laufende[key] = true
      }
      for (const key of Object.keys(this.Vertrage.Angebote)) {
        this.Vertrage.Angebote[key] = true
      }
      this.Vertrage.Allgemeine = true

      for (const key of Object.keys(this.addKunden)) {
        this.addKunden[key] = true
      }

      let itemString = `${data[0]}`

        console.log('data1',data[1])
        console.log('data2',data[2])
        this.indexOfHideValues = data[1]
        this.indexOfHideValuesj = data[2]


      for (const key of Object.keys(this.hideValues)) {
        if (key !== itemString) {
          this.hideValues[key] = true
        } else {
          this.hideValues[key] = false
        }
      }

      console.log(this.indexOfHideValues,this.indexOfHideValuesj,this.hideValues)


    })

    this.userService.selectVertrage.subscribe(data => {
      console.log('hiden?', data);

      for (const key of Object.keys(this.hideValues)) {
        this.hideValues[key] = true
      }

      for (const key of Object.keys(this.Vertrage.Laufende)) {
        this.Vertrage.Laufende[key] = true
      }
      for (const key of Object.keys(this.Vertrage.Angebote)) {
        this.Vertrage.Angebote[key] = true
      }
      this.Vertrage.Allgemeine = true

      for (const key of Object.keys(this.addKunden)) {
        this.addKunden[key] = true
      }

      if (data[0] == 'Laufende') {

        for (const key of Object.keys(this.Vertrage.Laufende)) {
          console.log(this.Vertrage.Laufende[`${key}`], data[1], key);

          if (key == data[1]) {
            this.Vertrage.Laufende[key] = false

          } else {
            this.Vertrage.Laufende[key] = true
          }
        }
      } else if (data[0] == 'Angebote') {
        for (const key of Object.keys(this.Vertrage.Angebote)) {
          if (key == data[1]) {
            this.Vertrage.Angebote[key] = false
          } else {
            this.Vertrage.Angebote[key] = true
          }
        }
      } else if (data[0] == 'Allgemeine') {
        this.Vertrage.Allgemeine = false
      }
      console.log(this.Vertrage);

    })

    this.userService.modalIdfromSidebar.subscribe((data) => {


      for (const key of Object.keys(this.hideValues)) {
        this.hideValues[key] = true
      }

      for (const key of Object.keys(this.Vertrage.Laufende)) {
        this.Vertrage.Laufende[key] = true
      }
      for (const key of Object.keys(this.Vertrage.Angebote)) {
        this.Vertrage.Angebote[key] = true
      }
      this.Vertrage.Allgemeine = true

      for (const key of Object.keys(this.addKunden)) {
        this.addKunden[key] = true
      }

      for (const key of Object.keys(this.addKunden)) {
        if (key !== data) {
          this.addKunden[key] = true
        } else {
          this.addKunden[key] = false
        }
      }


    })
  }


  openpdfpopup(url: any, showsecond = "") {
    console.log("openpdfpopup" + url);

    $("#openpdfmodel").trigger("click");

    if (showsecond == "") {
      $("#showsavedpdf").attr("src", url);
    } else {
      this.userService.getdocument_url(url).subscribe((result) => {
        console.log("api data received here");
        console.log(result);
        this.poa_src = result;
        $("#showsavedpdf").attr("src", this.poa_src.response);
      });
    }
  }

  isButtonDisabled(item:string){
    console.log('item: ',item)

    if(item == 'one'){
      if(this.secondcompanyaddressFormGroup.status == "VALID"){
        return false
      } else {
        return true
      }
    }
    if(item == 'both'){
      if(this.secondcompanyaddressFormGroup.status == "VALID" && this.secondcompanyaddressFormGroup2.status == "VALID"){
        return false
      } else {
        return true
      }
    }
  }

  legalrepresentativeform(): FormArray {
    return this.secondcompanyaddressFormGroup.get(
      "legalrepresentativeform"
    ) as FormArray;
  }

  newlegalrepresentativeform(): FormGroup {
    return this.form_builder.group({
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
    if (data == "tick") {
      let index = this.legalrepresentativeform().length - 1;
      console.log("lastfields3" + index);
      let firstname =
        this.secondcompanyaddressFormGroup.controls["legalrepresentativeform"]
          .value[index].firstname;
      console.log("values" + firstname);
      let lastname =
        this.secondcompanyaddressFormGroup.controls["legalrepresentativeform"]
          .value[index].lastname;
      console.log("values" + lastname);
      let newperson = firstname + " " + lastname;
      //let lastperson=this.addedpersons.value[index];
      //console.log("lastperson" + lastperson);

      if (
        this.legalrepresentativeform().length > this.addedpersonsFirst.length
      ) {
        this.addedpersonsFirst.push(newperson);
      }

      console.log(this.addedpersonsFirst);
      $("#formidFirstCompany" + index).css("display", "none");
      $("#formidFirst" + index).css("display", "none");
    } else {
      let index = this.legalrepresentativeform().length - 1;
      console.log("lastfields3" + index);
      let firstname =
        this.secondcompanyaddressFormGroup.controls["legalrepresentativeform"]
          .value[index].firstname;
      console.log("values" + firstname);
      let lastname =
        this.secondcompanyaddressFormGroup.controls["legalrepresentativeform"]
          .value[index].lastname;
      console.log("values" + lastname);
      let newperson = firstname + " " + lastname;
      //let lastperson=this.addedpersons.value[index];
      //console.log("lastperson" + lastperson);

      if (
        this.legalrepresentativeform().length > this.addedpersonsFirst.length
      ) {
        this.addedpersonsFirst.push(newperson);
      }

      console.log(this.addedpersonsFirst);
      $("#formidFirstCompany" + index).css("display", "none");
      $("#formidFirst" + index).css("display", "none");
      this.legalrepresentativeform().push(this.newlegalrepresentativeform());
    }
  }

  removelegalrepresentativeform(i: number) {
    this.legalrepresentativeform().removeAt(i);
  }

  addlegalrepresentativeform2(data: any) {
    if (data == "tick") {
      console.log("lastfields1" + this.legalrepresentativeform2().length);
      let index = this.legalrepresentativeform2().length - 1;
      console.log(
        "shareschange" +
        this.secondcompanyaddressFormGroup2.controls[
          "legalrepresentativeform2"
        ].value[index].shares
      );
      console.log("length" + this.legalrepresentativeform2().length);
      let totalShares = this.calculateShares();
      console.log("totalshares" + totalShares);

      //  let lastfields = this.legalrepresentativeform2().value;
      //  console.log("lastfields2" + lastfields);

      this.sharesvalue = 100 - totalShares;
      console.log("lastfields3" + index);
      let firstname =
        this.secondcompanyaddressFormGroup2.controls["legalrepresentativeform2"]
          .value[index].firstname;
      console.log("values" + firstname);
      let lastname =
        this.secondcompanyaddressFormGroup2.controls["legalrepresentativeform2"]
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
        this.secondcompanyaddressFormGroup2.controls[
          "legalrepresentativeform2"
        ].value[index].shares
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
          this.secondcompanyaddressFormGroup2.controls[
            "legalrepresentativeform2"
          ].value[index].firstname;
        console.log("values" + firstname);
        let lastname =
          this.secondcompanyaddressFormGroup2.controls[
            "legalrepresentativeform2"
          ].value[index].lastname;
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
        this.legalrepresentativeform2().push(
          this.newlegalrepresentativeform2()
        );
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
    return this.form_builder.group({
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

  addlegalrepresentativeform1(data: any) {
    let index1 = this.legalrepresentativeform1().length;
    if (index1 == 0) {
      this.legalrepresentativeform1().push(this.newlegalrepresentativeform1());
    } else {
      if (data == "tick") {
        let index = index1 - 1;
        console.log("lastfields3" + index);
        let firstname =
          this.secondcompanyaddressFormGroup1.controls[
            "legalrepresentativeform1"
          ].value[index].firstname;
        console.log("values" + firstname);
        let lastname =
          this.secondcompanyaddressFormGroup1.controls[
            "legalrepresentativeform1"
          ].value[index].lastname;
        console.log("values" + lastname);
        let newperson = firstname + " " + lastname;
        //let lastperson=this.addedpersons.value[index];
        //console.log("lastperson" + lastperson);

        if (
          this.legalrepresentativeform1().length >
          this.addedpersonsSecond.length
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
          this.secondcompanyaddressFormGroup1.controls[
            "legalrepresentativeform1"
          ].value[index].firstname;
        console.log("values" + firstname);
        let lastname =
          this.secondcompanyaddressFormGroup1.controls[
            "legalrepresentativeform1"
          ].value[index].lastname;
        console.log("values" + lastname);
        let newperson = firstname + " " + lastname;
        //let lastperson=this.addedpersons.value[index];
        //console.log("lastperson" + lastperson);

        if (
          this.legalrepresentativeform1().length >
          this.addedpersonsSecond.length
        ) {
          this.addedpersonsSecond.push(newperson);
        }

        console.log(this.addedpersonsSecond);
        $("#formidSecondCompany" + index).css("display", "none");
        $("#formidSecond" + index).css("display", "none");
        this.legalrepresentativeform1().push(
          this.newlegalrepresentativeform1()
        );
      }
    }
  }

  calculateShares() {
    let index = this.legalrepresentativeform2().length - 1;
    console.log("calculateshares" + index);
    let newshares: number = 0;
    for (let i = 0; i <= index; i++) {
      newshares =
        newshares +
        parseInt(
          this.secondcompanyaddressFormGroup2.controls[
            "legalrepresentativeform2"
          ].value[i].shares
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
  checkLeftShares(event: any) {
    if (this.companyId == "" || this.companyId == null) {
      console.log("shareholdershares" + event);
      console.log("shareholdershares" + this.companyId);
      let totalshares: number = 0;
      for (
        let i = 0;
        i < this.localData.type3.legalrepresentativeform2.length;
        i++
      ) {
        console.log(
          "shareholdershares" +
          this.localData.type3.legalrepresentativeform2[i].shares
        );
        totalshares =
          totalshares +
          parseInt(this.localData.type3.legalrepresentativeform2[i].shares);
      }
      console.log("shareholdershares" + totalshares);
      totalshares = totalshares + parseInt(event);
      console.log("shareholdersharesaddingevent" + totalshares);
      if (totalshares < 100) {
        $("#showerrorShareholder").html(
          "Sie müssen mindestens 95% aller wirtschaftlich Berechtigten angeben. Klicken Sie im unteren Verlauf auf ''Mehr hinzufügen'' um weitere wirtschaftlich Berechtigte hinzuzufügen."
        );
        this.cansaveShareholder = true;
      } else if (totalshares == 100) {
        $("#showerrorShareholder").html("");
        this.cansaveShareholder = true;
      } else {
        $("#showerrorShareholder").html(
          "100% Unternehmensanteile ist das Maximum. Bitte geben Sie einen korrekten Wert an. "
        );
        this.cansaveShareholder = false;
      }
    } else {
      console.log("shareholdershares" + event);
      console.log("shareholdershares" + this.companyId);
      let totalshares: number = 0;
      for (
        let i = 0;
        i < this.membertype3.legalrepresentativeform2.length;
        i++
      ) {
        console.log(
          "shareholdershares" +
          this.membertype3.legalrepresentativeform2[i].shares
        );
        totalshares =
          totalshares +
          parseInt(this.membertype3.legalrepresentativeform2[i].shares);
      }
      console.log("shareholdershares" + totalshares);
      totalshares = totalshares + parseInt(event);
      console.log("shareholdersharesaddingevent" + totalshares);
      if (totalshares < 100) {
        $("#showerrorShareholder").html(
          "Sie müssen mindestens 95% aller wirtschaftlich Berechtigten angeben. Klicken Sie im unteren Verlauf auf ''Mehr hinzufügen'' um weitere wirtschaftlich Berechtigte hinzuzufügen."
        );
        this.cansaveShareholder = true;
      } else if (totalshares == 100) {
        $("#showerrorShareholder").html("");
        this.cansaveShareholder = true;
      } else {
        $("#showerrorShareholder").html(
          "100% Unternehmensanteile ist das Maximum. Bitte geben Sie einen korrekten Wert an. "
        );
        this.cansaveShareholder = false;
      }
    }
  }
  finalFirstname() {
    if (
      this.companytypenew == "Einzelunternehmen" ||
      this.companytypenew == "Eingetragener Kaufmann (e.K.)"
    ) {
      this.showCompanyname = false;
      console.log("neelampiu");
      this.finalFirstname1 =
        this.livingaddressFormGroup.controls["firstname"].value;
      this.finalLastname1 =
        this.livingaddressFormGroup.controls["lastname"].value;
      console.log("neelampiu" + this.finalFirstname1 + this.finalLastname1);
    } else {
      this.showCompanyname = true;

      this.finalFirstname1 =
        this.secondcompanyaddressFormGroup.controls[
          "legalrepresentativeform"
        ].value[0].firstname;
      this.finalLastname1 =
        this.secondcompanyaddressFormGroup.controls[
          "legalrepresentativeform"
        ].value[0].lastname;
    }
  }
  patchBranchTpyeValue1(event: any) {
    console.log("patchBranchTpyeValue1" + JSON.stringify(this.branchlist));

    let datamatched: boolean = false;
    console.log("patchBranchTpyeValue1" + event);
    for (let i = 0; i < this.branchlist.length; i++) {
      console.log("patchBranchTpyeValue1" + this.branchlist[i]);
      if (event == this.branchlist[i]) {
        datamatched = true;
        break;
      }
    }
    if (datamatched == false) {
      $("#showbrancherror").html("please enter correct value");
      this.wrongBranchValue = false;
    } else {
      $("#showbrancherror").html(" ");
      this.wrongBranchValue = true;
    }
    console.log("patchBranchTpyeValue1" + datamatched);
    console.log("patchBranchTpyeValue1" + this.wrongBranchValue);
  }
  patchBranchTpyeValue(event: any) {
    console.log("ProductsTypeControl" + JSON.stringify(this.branchlisttotal));
    if (this.branchTypeControl.value != "") {
      if (this.branchTypeControl.value) {
        console.log(
          "ProductsTypeControl" + JSON.stringify(this.branchlisttotal)
        );
        for (let i = 0; i < this.branchlisttotal.length; i++) {
          console.log(
            "ProductsTypeControl" +
            JSON.stringify(this.branchlisttotal[i].branchname) +
            "asdsad" +
            this.branchTypeControl.value
          );
          console.log(
            "ProductsTypeControldfdsfdsfdsfdsf" +
            JSON.stringify(this.branchlisttotal[i].producttypesinfo)
          );

          if (
            this.branchlisttotal[i].branchname == this.branchTypeControl.value
          ) {
            console.log(
              "ProductsTypeControldfdsfdsfdsfdsf" +
              this.branchlisttotal[i].producttypesinfo.length
            );
            for (
              let j = 0;
              j < this.branchlisttotal[i].producttypesinfo.length;
              j++
            ) {
              console.log(
                "ProductsTypeControldfdsfdsfdsfdsf" +
                JSON.stringify(this.ProductTypeArray)
              );

              let obj = this.ProductTypeArray.find((o: any) => {
                console.log(
                  "ProductsTypeControldfdsfdsfdsfdsf" +
                  this.branchlisttotal[i].producttypesinfo[j]._id
                );
                if (o.id === this.branchlisttotal[i].producttypesinfo[j]._id) {
                  return true; // stop searching
                }
              });
              console.log(
                "ProductsTypeControldfdsfdsfdsfdsf" +
                this.branchlisttotal[i].producttypesinfo[j]._id
              );
              console.log("ProductsTypeControldfdsfdsfdsfdsf" + j);

              console.log("ProductsTypeControldfdsfdsfdsfdsf" + obj);
              if (obj == undefined) {
                this.ProductTypeArray.push({
                  id: this.branchlisttotal[i].producttypesinfo[j]._id,
                  name: this.branchlisttotal[i].producttypesinfo[j]
                    .product_typename,
                });

                this.producttypenew.push({
                  id: this.branchlisttotal[i].producttypesinfo[j]._id,
                  name: this.branchlisttotal[i].producttypesinfo[j]
                    .product_typename,
                });

                // this.ShowProductsPartner = true;
              }
              console.log(
                "ProductsTypeControldfdsfdsfdsfdsf" +
                JSON.stringify(this.ProductTypeArray)
              );
            }
          }
        }

        // this.protypeAndpropartner.patchValue({
        //   branch: this.branchTypeControl.value,
        // });
        this.BranchArray = this.branchTypeControl.value;
        this.branchTypeControl.setValue("");
        //         if(this.ProductTypeArray.length>0)
        // {
        //     this.protypeAndpropartner.patchValue({
        //       producttypelist:"Test"
        //      })
        //     }
        // this.ReadyProductsTypeOptionsWithBranch =
        //   this.LoopingProductsListTypeWithBranch(this.customerList);
      }
    }
    // this.getproductpartnerbyproducttypeid();
  }

  closeEsignModal() {
    // $('#esignmodel').modal('hide');
    $("#esignmodel").modal("hide");
    console.log("updateSharesi");
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
            this.secondcompanyaddressFormGroup2.controls[
              "legalrepresentativeform2"
            ].value[i].shares
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
  removelegalrepresentativeform1(i: number) {
    this.legalrepresentativeform1().removeAt(i);
  }

  legalrepresentativeform2(): FormArray {
    return this.secondcompanyaddressFormGroup2.get(
      "legalrepresentativeform2"
    ) as FormArray;
  }

  newlegalrepresentativeform2(): FormGroup {
    return this.form_builder.group({
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

      $("#arrowsettingheader" + i).removeClass("down");
      $("#arrowsettingheader" + i).addClass("up");
    } else {
      $("#formid" + i).css("display", "none");

      $("#arrowsettingheader" + i).removeClass("up");
      $("#arrowsettingheader" + i).addClass("down");
    }
  }
  showhiddenfieldsCompany(i: number) {
    console.log("show hidden fields" + i);
    let prop = $("#formidCompany" + i).css("display");
    if (prop == "none") {
      $("#formidCompany" + i).css("display", "block");

      $("#arrowsettingheaderCompany" + i).removeClass("down");
      $("#arrowsettingheaderCompany" + i).addClass("up");
    } else {
      $("#formidCompany" + i).css("display", "none");

      $("#arrowsettingheaderCompany" + i).removeClass("up");
      $("#arrowsettingheaderCompany" + i).addClass("down");
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
  showhiddenfieldsSecondCompany(i: number) {
    console.log("show hidden fields" + i);
    let prop = $("#formidSecondCompany" + i).css("display");
    if (prop == "none") {
      $("#formidSecondCompany" + i).css("display", "block");

      $("#arrowsettingheaderSecondCompany" + i).removeClass("down");
      $("#arrowsettingheaderSecondCompany" + i).addClass("up");
    } else {
      $("#formidSecondCompany" + i).css("display", "none");

      $("#arrowsettingheaderSecondCompany" + i).removeClass("up");
      $("#arrowsettingheaderSecondCompany" + i).addClass("down");
    }
  }
  showhiddenfieldsFirst(i: number) {
    console.log("show hidden fields" + i);
    let prop = $("#formidFirst" + i).css("display");
    if (prop == "none") {
      $("#formidFirst" + i).css("display", "block");

      $("#arrowsettingheaderFirst" + i).removeClass("down");
      $("#arrowsettingheaderFirst" + i).addClass("up");
    } else {
      $("#formidFirst" + i).css("display", "none");

      $("#arrowsettingheaderFirst" + i).removeClass("up");
      $("#arrowsettingheaderFirst" + i).addClass("down");
    }
  }
  showhiddenfieldsFirstCompany(i: number) {
    console.log("show hidden fields" + i);
    let prop = $("#formidFirstCompany" + i).css("display");
    if (prop == "none") {
      $("#formidFirstCompany" + i).css("display", "block");

      $("#arrowsettingheaderFirstCompany" + i).removeClass("down");
      $("#arrowsettingheaderFirstCompany" + i).addClass("up");
    } else {
      $("#formidFirstCompany" + i).css("display", "none");

      $("#arrowsettingheaderFirstCompany" + i).removeClass("up");
      $("#arrowsettingheaderFirstCompany" + i).addClass("down");
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
  gotosessiondashboard() {
    let url = window.location.href;
    console.log("url" + url);
    const middle = url.slice(url.indexOf("#") + 1, url.lastIndexOf("?"));
    console.log("url" + middle);
    if (this.tokensession != null) {
      if (this.currentActiveRole == "b2b") {
        this.router.navigate(["/b2b-home"]);
      } else {
        this.router.navigate(["/kunde-home"], { queryParams: { id: this.id } });
      }
    } else {
      this.router.navigate(["/"]);
    }
  }
  private _filtercompanytype(value: string): string[] {
    console.log("_filterland" + value);
    const filterValue = value.toLowerCase();
    return this.CompanyType.filter((option) =>
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
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsValue.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  LoopingBrancheslistnew(data: any) {
    return new Promise(async (resolve) => {
      let ProductsList = [];
      for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        // for (let j = 0; j < data[i].spartedata.length; j++) {
        ProductsList.push(data[i].BrancheAndProducttype[0].branch);
        // }
      }

      resolve([...new Set(ProductsList)]);
    });
  }
  ngOnInit() {


    console.log('haushalt if:', !this.localData.hasOwnProperty('companytype') ||
      this.localData.companytype == ' ' ||
      this.localData.companytype == '' ||
      this.localData.companytype == null);

    console.log('company if:', this.localData.companytype ==
      'Eingetragener Kaufmann (e.K.)' ||
      this.localData.companytype == 'Einzelunternehmen');


    this.currentid = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).id;

    this.title = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).title;
    this.lastname = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).lastname;
    this.firstname = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).firstname;
    this.id = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).id;
    this.COMPANYNAME = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).companyname;

    console.log("first name", this.firstname);

    this.header_title = this.title;
    this.header_firstname = this.firstname;
    this.header_lastname = this.lastname;
    this.header_companyname = this.COMPANYNAME;

    if (this.canvas) {
      this.signaturePad = new SignaturePad(this.canvas.nativeElement);
    }

    let todaynew = new Date();
    var dd = String(todaynew.getDate()).padStart(2, "0");
    var mm = String(todaynew.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = todaynew.getFullYear();

    var todaynew1 = dd + "." + mm + "." + yyyy;
    this.TodayDate = todaynew1;

    // this.form_builder.array({
    //   this.myControl,
    //   myControlland: new FormControl(),
    // });

    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar =
        this.eventEmitterService.invokeFirstComponentFunction.subscribe(
          (user: any) => {
            this.CurrentChat(user, 0);
          }
        );
    }

    if (this.eventEmitterService.unreadMessageOpen == undefined) {
      this.eventEmitterService.unreadMessageOpen =
        this.eventEmitterService.unreadChatMessageEvent.subscribe(() => {
          this.responseobserve = this.intervallTimer.subscribe(() => {
            this.get_unread_chat();
          });
        });
    }

    if (this.eventEmitterService.unreadMessageClose == undefined) {
      this.eventEmitterService.unreadMessageClose =
        this.eventEmitterService.unreadChatMessageCloseEvent.subscribe(() => {
          this.responseobserve.unsubscribe();
        });
    }

    this.firstFormGroup = this.form_builder.group({
      firstCtrl: ["", Validators.required],
    });
    this.secondFormGroup = this.form_builder.group({
      secondCtrl: ["", Validators.required],
    });
    let url = window.location.href;
    console.log("url" + url);
    const middle = url.slice(url.indexOf("#") + 1, url.lastIndexOf("?"));
    console.log("url" + middle);
    if (middle == "/kunde-home" && this.currentActiveRole == "customer") {
      $("#addstyle").addClass("showSelected");
    }
    this.userService.getListBranch({}).subscribe(async (success: any) => {
      this.branchlisttotal = success;
      console.log("branchlisttotal" + JSON.stringify(this.branchlisttotal));
      this.branchlist = await this.LoopingBrancheslistnew(success);
      console.log("branchlisttotal" + this.branchlist);
    });
    this.isDivisibleBy(35);
    this.companyData = [];
    this.api_url = environment.API_URL;
    this.legalrepresentativeform().push(this.newlegalrepresentativeform());
    console.log('customerid', this.customerid);

    // this.legalrepresentativeform2().push(this.newlegalrepresentativeform2());
    this.userService
      .getEditUser(this.customerid)
      .pipe(first())
      .subscribe((user: any) => {
        this.localData = user;
        console.log('localData', this.localData);

        this.getTabList();
        console.log("brokername1");
        console.log("this is user local data", this.localData);

        if (this.localData.title != "Firma") {
          this.fetch_consulting_data(this.localData._id);
        }
        console.log(this.localData.brokerinfo, '***********************************************************************');

        if (this.localData.brokerinfo && this.localData.brokerinfo.length > 0) {
          this.brokeresign = this.localData.brokerinfo[0].brokeresign;
          this.brokerCOMPANYTYPE = this.localData.brokerinfo[0].companytype;
          this.brokerfirstname = this.localData.brokerinfo[0].firstname;
          this.brokerlastname = this.localData.brokerinfo[0].lastname;
          this.brokerCOMPANYNAME = this.localData.brokerinfo[0].companyname;
        }

        console.log(
          "brokername2" + JSON.stringify(this.localData.hasOwnProperty("type1"))
        );

        if (this.localData.hasOwnProperty("type1")) {
          this.type1 = this.localData.type1.legalrepresentativeform;
          this.type2 = this.localData.type2.legalrepresentativeform1;
          this.type3 = this.localData.type3.legalrepresentativeform2;
          let totalshares: number = 0;
          for (
            let i = 0;
            i < this.localData.type3.legalrepresentativeform2?.length;
            i++
          ) {
            console.log(
              "shareholdershares" +
              this.localData.type3.legalrepresentativeform2[i].shares
            );
            totalshares =
              totalshares +
              parseInt(this.localData.type3.legalrepresentativeform2[i].shares);
          }
          console.log("shareholdershares" + totalshares);
          if (totalshares < 100) {
            let leftshares = 100 - totalshares;
            console.log("shareholdersharesleftshares" + leftshares);
            this.ShareholderFormGroup.patchValue({
              shares: leftshares,
            });
            this.addMoreShareholder = true;
          } else {
            this.addMoreShareholder = false;
          }
          console.log("brokername" + JSON.stringify(this.type1));
          console.log("brokername" + JSON.stringify(this.type2));
          console.log("brokername" + JSON.stringify(this.type3));
          setTimeout(() => {
            this.setPagetype(1, "type1");
            this.setPagetype(1, "type2");
            this.setPagetype(1, "type3");
            console.log("founding_dateneelam" + this.localData.founding_date);
            this.foundingdate = this.datePipe.transform(
              this.localData.founding_date,
              "dd.MM.yyyy"
            );
            console.log("founding_dateneelam" + this.foundingdate);
          }, 100);
        }

        let brokerbrandarraynew = this.localData.brokerbrandarray;
        let a = brokerbrandarraynew.indexOf("Cefima");
        if (a != -1) {
          this.brokername = this.localData.brokerarray[a];
          console.log("brokername3" + this.brokername);
        } else {
          this.brokername = "";
          console.log("brokername4" + this.brokername);
        }

        console.log("we are here");

        if (this.brokername != "") {
          console.log("brokername5" + this.brokername);
          this.userService
            .getUser1(this.brokername)
            .pipe(first())
            .subscribe((brokerdata: any) => {
              console.log("brokername6" + JSON.stringify(brokerdata));
              this.brokertitle = brokerdata[0].title;
              this.brokerlastname = brokerdata[0].lastname;
              this.brokerfirstname = brokerdata[0].firstname;
              this.brokerCOMPANYNAME = brokerdata[0].companyname;
              this.brokerCOMPANYTYPE = brokerdata[0].companytype;
              (this.brokerplz = brokerdata[0].plz),
                (this.brokercity = brokerdata[0].city),
                (this.brokerstreetNumber = brokerdata[0].strno);
              this.brokerlogo = brokerdata[0].logo;
              this.brokerwelcomevideo = brokerdata[0].welcomevideo;
              this.brokeresign = brokerdata[0].brokeresign;
              this.brokercustomernum = brokerdata[0].customerno;
              this.brokerstreet = brokerdata[0].strassa;
              this.brokercontactno = brokerdata[0].contactno;
              this.brokerregistration_number =
                brokerdata[0].registration_number;
              console.log("brokername" + this.brokerlastname);
              console.log("brokername" + this.brokercustomernum);
            });
        }
        console.log("brokername" + this.brokercustomernum);
        setTimeout(() => {
          console.log("brokername" + this.brokercustomernum);
          this.familyFormGroup.patchValue({
            street: this.localData.strassa,
            streetNumber: this.localData.strno,
            postCode: this.localData.plz,
            city: this.localData.city,
            additionalReference: this.localData.additionalReference,
            countryOfResidence: this.localData.current_country,
          });

          this.officeaddressFormGroup.patchValue({
            street: this.localData.strassa,
            streetNumber: this.localData.strno,
            postCode: this.localData.plz,
            city: this.localData.city,
            additionalReference: this.localData.additionalReference,
            countryOfResidence: this.localData.current_country,
          });

          this.addressFormGroupnew.patchValue({
            street: this.localData.strassa,
            streetNumber: this.localData.strno,
            postCode: this.localData.plz,
            city: this.localData.city,
            additionalReference: this.localData.additionalReference,
            countryOfResidence: this.localData.current_country,
          });
          this.companydataform.patchValue({
            title: this.localData.title,
            firstName: this.localData.firstname,
            email: this.localData.email,
            founding_date: this.datePipe.transform(
              this.localData.founding_date,
              "dd.MM.yyyy"
            ),
            lastName: this.localData.lastname,
            registration_num: this.localData.registration_num,
            street: this.localData.strassa,
            streetNumber: this.localData.strno,
            postCode: this.localData.plz,
            city: this.localData.city,
            additionalReference: this.localData.additionalReference,
            countryOfResidence: this.localData.current_country,
            register_location: this.localData.register_location,
            companyname: this.localData.companyname,
            companytype: this.localData.companytype,
            phoneno: this.localData.contactno,
            vermittlerstatus: this.localData.Vermittlerstatus,
            registrationsnummer: this.localData.registration_number,
            customerno: this.localData.customerno,
            ihk: this.localData.responsible_ihk,
          });

          this.officedataform.patchValue({
            street: this.localData.strassa,
            streetNumber: this.localData.strno,
            postCode: this.localData.plz,
            city: this.localData.city,
            additionalReference: this.localData.additionalReference,
            countryOfResidence: this.localData.current_country,

            phoneno: this.localData.contactno,
            vermittlerstatus: this.localData.Vermittlerstatus,
            registrationsnummer: this.localData.registration_number,
            customerno: this.localData.customerno,
            ihk: this.localData.responsible_ihk,
          });
          console.log("brokername" + this.brokercustomernum);
          this.personaldataform.patchValue({
            title: this.localData.title,
            firstName: this.localData.firstname,
            email: this.localData.email,
            lastName: this.localData.lastname,
            dob: this.localData.dateofbirth,
            street: this.localData.strassa,
            streetNumber: this.localData.strno,
            postCode: this.localData.plz,
            city: this.localData.city,
            contactno: this.localData.contactno,
            additionalReference: this.localData.additionalReference,
            countryOfResidence: this.localData.current_country,
            brokernumber: this.brokername,
            customerno: this.localData.customerno,
            birthPlace: this.localData.birth_place,
          });
          console.log("brokername" + this.brokercustomernum);
        }, 100);
        console.log("brokername" + this.brokercustomernum);
      });

    // console.log("session"+localStorage.getItem("currentActiveRole"))
    console.log("localdata" + JSON.stringify(this.localData));

    console.log("localdata" + JSON.stringify(this.currentActiveRole));
    this.docFromGroup = this.form_builder.group({
      DocOne: [""],
      DocTwo: [""],
      DocThree: [""],
      // acceptcontrol:["",Validators.required]
    });
    this.officedocFromGroup = this.form_builder.group({
      DocOne: [""],
      DocTwo: [""],
      DocThree: [""],
      // acceptcontrol:["",Validators.required]
    });

    this.brokerformtype1 = this.form_builder.group({
      title: ["", [Validators.required]],
      firstName: ["", [Validators.required]],

      lastName: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
    });
    this.CEOFormGroup = this.form_builder.group({
      title: ["", [Validators.required]],
      firstname: ["", [Validators.required]],

      lastname: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
    });
    this.OtherPersonFormGroup = this.form_builder.group({
      title: ["", [Validators.required]],
      firstname: ["", [Validators.required]],

      lastname: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
    });
    this.brokerformtype2 = this.form_builder.group({
      title: ["", [Validators.required]],
      firstName: ["", [Validators.required]],

      lastName: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
    });
    this.brokerformtype3 = this.form_builder.group({
      title: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      shares: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
    });
    this.ShareholderFormGroup = this.form_builder.group({
      title: ["", [Validators.required]],
      firstname: ["", [Validators.required]],
      shares: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
    });
    this.personaldataform = this.form_builder.group({
      title: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],
      contactno: ["", [Validators.required]],
      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
      birthPlace: ["", [Validators.required]],
      brokernumber: ["", [Validators.required]],
      customerno: ["", [Validators.required]],
    });
    this.familyFormGroup = this.form_builder.group({
      title: ["", [Validators.required]],
      firstname: ["", [Validators.required]],
      phone_number: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      lastname: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],

      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
    });
    this.officeFormGroup = this.form_builder.group({
      propertytype: ["", [Validators.required]],
      propertyarea: ["", [Validators.required]],
      phone_number: ["", [Validators.required]],
      numberofemployees: ["", [Validators.required]],
      officename: ["", [Validators.required]],
      rentorowner: ["", [Validators.required]],
      operatingmode: [""],
    });

    this.officeaddressFormGroup = this.form_builder.group({
      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],

      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
    });

    this.livingaddressFormGroup = this.form_builder.group({
      title: ["", [Validators.required]],
      firstname: ["", [Validators.required]],

      lastname: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],
      birthPlace: ["", [Validators.required]],
      email: ["", [Validators.required]],

      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
    });
    this.addressFormGroupnew = this.form_builder.group({
      companyname: ["", [Validators.required]],

      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],

      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
    });

    this.companydataform = this.form_builder.group({
      title: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      founding_date: [""],
      register_location: [""],
      registration_num: [""],
      lastName: ["", [Validators.required]],
      companyname: ["", [Validators.required]],
      companytype: ["", [Validators.required]],
      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
      phoneno: ["", [Validators.required]],
      vermittlerstatus: ["", [Validators.required]],
      registrationsnummer: ["", [Validators.required]],
      customerno: ["", [Validators.required]],
      ihk: ["", [Validators.required]],
    });
    this.companydataformadded = this.form_builder.group({
      title: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      companyname: ["", [Validators.required]],
      companytype: ["", [Validators.required]],
      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
    });
    this.officedataform = this.form_builder.group({
      street: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      postCode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
      phoneno: ["", [Validators.required]],
      vermittlerstatus: ["", [Validators.required]],
      registrationsnummer: ["", [Validators.required]],
      customerno: ["", [Validators.required]],
      ihk: ["", [Validators.required]],
    });

    this.familyRelationOptions = this.familyRelation.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterrelationtype(value))
    );

    this.martialStatusOptions = this.martialStatusControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filtermartialStatustype(value))
    );

    this.FilterBranchTypeOptions = this.branchTypeControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterTypeBranch(value))
    );

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
    this.filteredOptionsland = this.myControlland.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterland(value))
    );
    this.ThirdTypeDocOptions = this.ThirdTypeDoc.valueChanges.pipe(
      startWith(""),
      map((value) => this._filtercompanytype(value))
    );

    console.log(this.id);
    var company = JSON.parse(
      localStorage.getItem("currentUser")!
    ).companies_with_roles;
    this.userService
      .getusertimeline(this.id)
      .pipe(first())
      .subscribe(
        (data: any[]) => {
          this.TimeLineData = data;
          console.log(this.TimeLineData);
        },
        (err) => {
          console.log(err);
        }
      );
    if (this.loginRole == "b2b" && this.routeParamsActive != "kunde-home") {
      this.userService
        .getDocumentsByIds(
          this.localData._id,
          "Allgemeines Dokument",
          "cefima_document"
        )
        .pipe(first())
        .subscribe(
          (result: any) => {
            console.log(result[0]?.element.ticket_no);
            this.documents = result;
            this.MetaDataLooping();
            this.setPage(1, "general");
            this.show_doc_count();
            this.getcurrentUser(result[0]?.element.ticket_no);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.userService
        .getDocumentsByIds(
          this.customerid,
          "Allgemeines Dokument",
          "cefima_document"
        )
        .pipe(first())
        .subscribe(
          (result: any) => {
            console.log(result[0]?.element.ticket_no);
            this.documents = result;
            this.MetaDataLooping();
            this.setPage(1, "general");
            this.show_doc_count();
            this.getcurrentUser(result[0]?.element.ticket_no);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    this.userService
      .getDocumentsBYID(this.customerid, "bestandsübertragung")
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.MetaDataLoopingDocList();
          this.customerDocList = data;
          console.log("innerloop");
          console.log(this.customerDocList);

          for (let i = 0; i < this.customerDocList.length; i++) {
            let exists = 0;
            for (let j = 0; j < this.customerDocListunique.length; j++) {
              if (
                this.customerDocListunique[j].element.ticket_no ==
                this.customerDocList[i].element.ticket_no
              ) {
                exists = 1;
              }
            }
            console.log('exists******************');

            if (exists == 0) {
              this.customerDocListunique.push(this.customerDocList[i]);
            }
          }

          console.log("customer doc list unique");
          console.log(this.customerDocListunique);

          this.userService.dashboard_positions_list().subscribe((result) => {
            console.log("Dashboard Positions fetched");
            console.log(result);
          });

          this.setPage(1);
          this.show_doc_count();
        },
        (error) => {
          console.log(error);
        }
      );

    this.userService
      .getDocumentsBYIDnew(this.customerid, "fremdvertrag")
      // .getDocumentsBYIDnew(this.customerid, "Angebot bekommen")
      .pipe(first())
      .subscribe(
        (data11) => {
          console.log(data11);
          this.MetaDataLoopingDocListsecond();
          this.customerDocListsecond = data11;

          for (let i = 0; i < this.customerDocListsecond.length; i++) {
            let exists = 0;
            for (let j = 0; j < this.customerDocListsecondunique.length; j++) {
              if (
                this.customerDocListsecondunique[j].element.ticket_no ==
                this.customerDocListsecond[i].element.ticket_no
              ) {
                exists = 1;
              }
            }

            if (exists == 0) {
              this.customerDocListsecondunique.push(
                this.customerDocListsecond[i]
              );
            }
          }

          this.setPage(1, "second");
          this.show_doc_count();
        },
        (error) => {
          console.log(error);
        }
      );



    let strno = this.localData.strno;
    let strassa = this.localData.strassa;
    let city = this.localData.city;
    let current_country = this.localData.current_country;
    let plz = this.localData.plz;

    this.userService.getproductpartner().subscribe((success: any) => {
      // if success and error give response
      console.log(JSON.stringify(success));
      this.ReadyProductsOptions = this.LoopingProductsList(success);
      this.ReadyProductsTypeOptions = this.LoopingProductsListType(success);
      console.log("ReadyProductsTypeOptions" + this.ReadyProductsTypeOptions);
      if (success.status == "error") {
        this.error = success.message;
      } else {
        this.customerList = success;

        //this.recordCount = success.length;
        console.log(this.customerList);
      }
    });

    setTimeout(() => {
      this.filteredProductsOptions = this.ProductsControl.valueChanges.pipe(
        startWith(""),
        map((value) => this._filter2(value))
      );

      this.filteredProductsTypeOptions =
        this.ProductsTypeControl.valueChanges.pipe(
          startWith(""),
          map((value) => this._filterTypeProducts(value))
        );

      console.log(
        "this.ReadyProductsTypeOptions" +
        this.filteredProductsTypeOptions.subscribe(data => {
          JSON.stringify(data)
        })

      );
    }, 3000);
    this.responseobserve = this.intervallTimer.subscribe(() =>
      this.get_unread_chat()
    );

    this.hideValues = {
      hideHaushaltMain: true,
      hideHaushaltIn1: true,
      hideContainerMain: true,
      hideContainerIn: true,
      hidemultiCompanyprivatecustomerMain: true,
      hidemultiCompanyprivatecustomerIn: true,
      hideCompanyCustomerMain: true,
      hideCompanyCustomerIn: true,
      hidemultiCompanycustomerMain: true,
      hidemultiCompanycustomerIn: true,
      hidedisabledfamilyMain: true,
      hidedisabledfamilyIn:true,
      hideCompanyMain: true,
      hideCompanyIn: true,
      hidemultiCompanyMain: true,
      hidemultiCompanyIn: true
    };

    this.Vertrage = {
      Angebote: {
        Versicherungsgesellschaft: true,
        Geldanlagen: true,
        Bank: true
      },
      Laufende: {
        Versicherungsgesellschaft: true,
        Geldanlagen: true,
        Bank: true
      },
      Allgemeine: true
    }

  }

  getTabList() {
    this.userService.getAllTabs().subscribe((result: any) => {
      this.tabList = result
        .filter((item: any) => {
          if (
            this.localData.title.toLowerCase() !== "firma" &&
            item.dashboard_of === "haushalt"
          ) {
            return item;
          } else if (
            this.localData.title.toLowerCase() == "firma" &&
            item.dashboard_of === "firmenkunde"
          ) {
            return item;
          } else {
            return null;
          }
        })
        .map((item: any) => ({ ...item, data: [], loaded: false }));
    });
  }

  tabClicked(event: any) {
    console.log('companydata:',this.companyData)
    console.log('officedata:',this.officeData)
    console.log('familydata:',this.familyData)
    $("#loaderouterid").css("display", "block");
    const value = event.tab.textLabel;
    let tab = this.tabList.find((item: any) => item.tab === value);
    // this.selectedTab = tab.tab;
    if (tab) {
      this.selectedTab = { id: tab._id, name: tab.tab };
    } else {
      this.selectedTab = { id: value, name: value };
    }

    if (tab) {
      this.userService.getDocumentByTabId(tab._id).subscribe(
        (result: any) => {
          // console.log(JSON.stringify(result),'2464')
          this.documentPdfList = result.data;
          console.log(this.documentPdfList, '2466')
          $("#loaderouterid").css("display", "none");
        },
        (err) => {
          $("#loaderouterid").css("display", "none");
        }
      );
    }
    if (tab && tab.loaded === false) {
      this.userService
        .getQuestionsByTab({ dashboard_of: tab.dashboard_of, tab: tab.tab })
        .subscribe(
          (result) => {
            tab.data = result;
            tab.loaded = true;
            $("#loaderouterid").css("display", "none");
          },
          (err) => {
            $("#loaderouterid").css("display", "none");
          }
        );
    } else {
      $("#loaderouterid").css("display", "none");
    }
  }

  setQuestionArray(i: any) {
    this.selectedQuestionArray = [];
    this.selected_answer_option_index = [];
    this.tabList[i].data.map((item: any) => {
      this.selected_answer_option_index.push([]);
    });
    this.selectedQuestionArray = this.tabList[i].data.map((item: any) => ({
      ...item,
      answerKey: {},
      validated: false,
    }));
  }

  filling_answer(
    field: any,
    answer_index: any,
    option_index: any = "",
    value: any
  ) {

    if (field == "selected_option") {
      this.selectedQuestionArray[answer_index].answerKey.selected_option =
        value;

      this.selected_answer_option_index[answer_index].option_index =
        option_index;

      this.selectedQuestionArray[answer_index].answerKey.input = "";
      this.selectedQuestionArray[answer_index].answerKey.textarea = "";
      this.selectedQuestionArray[answer_index].answerKey.date = "";
      this.selectedQuestionArray[answer_index].answerKey.from_date = "";
      this.selectedQuestionArray[answer_index].answerKey.to_date = "";
      this.selectedQuestionArray[answer_index].answerKey.documents = [];
      $(".result" + answer_index).html("");
    } else if (field == "input") {
      this.selectedQuestionArray[answer_index].answerKey.input = value;
      console.log(this.selectedQuestionArray)
      console.log(this.selectedQuestionArray[answer_index].validated)
      // const isThere = this.selectedQuestionArray[answer_index].answerKey.some(item => field in item)
      // if (isThere) {
      //   this.selectedQuestionArray[answer_index].answerKey.input = value;
      // } else {
      //   this.selectedQuestionArray[answer_index].answerKey.push({ input: value })
      // }
      // console.log("the value", this.selectedQuestionArray[answer_index].answerKey.input = value)
      // this.selected_producttype_answers[answer_index].input = value;
    } else if (field == "textarea") {
      // this.selected_producttype_answers[answer_index].textarea = value;
      this.selectedQuestionArray[answer_index].answerKey.textarea = value;
    } else if (field == "date") {
      var d = new Date(value.value._d),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      let date = [year, month, day].join("-");

      // this.selected_producttype_answers[answer_index].date = date;
      this.selectedQuestionArray[answer_index].answerKey.date = date;
    } else if (field == "from_date") {
      var d = new Date(value.value._d),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      let date = [year, month, day].join("-");

      // this.selected_producttype_answers[answer_index].from_date = date;
      this.selectedQuestionArray[answer_index].answerKey.from_date = date;
    } else if (field == "to_date") {
      var d = new Date(value.value._d),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      let date = [year, month, day].join("-");
      // this.selected_producttype_answers[answer_index].to_date = date;
      this.selectedQuestionArray[answer_index].answerKey.to_date = date;
    }

    console.log('question data:',this.selectedQuestionArray)
  }

  async handleDocumentUpload(
    event: any,
    option_index: any = "",
    answer_index: any
  ) {
    event.preventDefault();

    const previewData = (source: any, modaltitle: any) => {
      $("#openpreviewmodel").trigger("click");

      $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + modaltitle);

      $("#showpreviewdownload").attr("href", source);

      if (source.indexOf("data:application/pdf;") != -1) {
        $("#showpreviewimg").attr("src", "");
        $("#showpreviewimg").css("display", "none");

        $("#showpreviewpdf").attr("src", "");
        $("#showpreviewpdf").css("display", "block");
        //  $('#showpreviewvideo').attr('src',source);
        $("#showpreviewpdf").attr("src", source);
      } else {
        $("#showpreviewpdf").attr("src", "");
        $("#showpreviewpdf").css("display", "none");

        $("#showpreviewimg").attr("src", "");
        $("#showpreviewimg").css("display", "block");
        $("#showpreviewimg").attr("src", source);
      }
    };

    const removeDocData = (j: any) => {
      for (
        let i = 0;
        i < this.selectedQuestionArray[answer_index].answerKey.documents.length;
        i++
      ) {
        if (
          this.uploaded_document_id[j] ==
          this.selectedQuestionArray[answer_index].answerKey.documents[i]
            .document_unique_id
        ) {
          this.selectedQuestionArray[answer_index].answerKey.documents.splice(
            i,
            1
          );
          break;
        }
      }

      this.uploaded_document_id.splice(j, 1);
      this.uploaded_document_tags.splice(j, 1);
    };

    var files = event.target.files; //FileList object

    var filesLength = files.length;
    for (let i = 0; i < filesLength; i++) {
      let f = files[i];

      let newsize: any = this.l;
      this.l = this.l + 1;

      let file_name = f.name;

      let Size1 = f.size;
      let Size = this.dataconvert(Size1);

      let extension = f.name.substr(f.name.lastIndexOf(".") + 1);

      var fileReader = new FileReader();
      let typeofimage = f.type;
      let dateofdocument = f.lastModified;
      var d = new Date(dateofdocument);
      var date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

      fileReader.onload = function (e) {
        let that = this;
        let ImageName = (e.target as any).result;

        let extension = f.name.substr(f.name.lastIndexOf(".") + 1);


        if (typeofimage.indexOf("pdf") != -1) {
          ImageName = "../assets/icons/file-upload-blue-pdf.svg";
        } else {
          ImageName = (e.target as any).result;
        }

        if (option_index == "") {
          $("#resultt" + answer_index).append(
            '<div class="pip col-md-4" style="display: inline-block;" "id=\'pipremove' +
            +i +
            Size1 +
            "'>" +
            '<div class="row">' +
            '<div class="col-md-12">' +
            '<div class="removepreview links" id="removepreviewid' +
            newsize +
            '" style="margin-bottom:-25px;background: #184297;border-radius: 3px;width:25px;height:25px;font-size: 14px; text-align: center; padding: 1px;color: white;margin-left: 260px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
            "</div>" +
            '<div class="col-md-2">' +
            '<img class="imageThumb" style="width: 170%;height:30px;margin-top: 20px;" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            "</div>" +
            '<div class="col-md-9" style="font-size:12px;">' +
            "<div> <b class='limitword' title='" +
            f.name +
            "'>Dokumentenname: " +
            f.name +
            "</b> </div>" +
            "<div> <b>Dateigröße: " +
            Size +
            "</b></div>" +
            "<div> <b>Dateityp: " +
            typeofimage +
            "</b> </div>" +
            //"<div> <b>Datum des Dokuments: " +date +"</b> </div>"+
            "</div>" +
            "<div class='col-md-12'>" +
            '<div class="previewdoc links" data-doc_name="' +
            f.name +
            '" data-preview_source="' +
            (e.target as any).result +
            '" id="previewdoc' +
            i +
            Size1 +
            '" style="background: #184297;border-radius: 3px;width:25px;height:25px;font-size: 14px; text-align: center; padding: 1px;color: white;margin-left: 260px;margin-top: -25px;margin-right: 0 !important;cursor: pointer;"><i class="fa fa-eye" aria-hidden="true"></i></div>' +
            "</div>" +
            "<div class='col-md-12 mt-2'>" +
            '<div class="progress form-group " id="progressnew' +
            i +
            Size1 +
            '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
            i +
            Size1 +
            ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
            i +
            Size1 +
            '" [style.width.%]=""> </div> </div>' +
            "</div>" +
            "</div>" +
            "</div>"
          );
        } else {
          $("#result" + option_index).append(
            '<div class="pip col-md-4" style="display: inline-block;" "id=\'pipremove' +
            +i +
            Size1 +
            "'>" +
            '<div class="row">' +
            '<div class="col-md-12">' +
            '<div class="removepreview links" id="removepreviewid' +
            newsize +
            '" style="margin-bottom:-25px;background: #184297;border-radius: 3px;width:25px;height:25px;font-size: 14px; text-align: center; padding: 1px;color: white;margin-left: 260px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
            "</div>" +
            '<div class="col-md-2">' +
            '<img class="imageThumb" style="width: 170%;height:30px;margin-top: 20px;" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            "</div>" +
            '<div class="col-md-9" style="font-size:12px;">' +
            "<div> <b class='limitword' title='" +
            f.name +
            "'>Dokumentenname: " +
            f.name +
            "</b> </div>" +
            "<div> <b>Dateigröße: " +
            Size +
            "</b></div>" +
            "<div> <b>Dateityp: " +
            typeofimage +
            "</b> </div>" +
            // "<div> <b>Datum des Dokuments: " +date +"</b> </div>"+
            "</div>" +
            "<div class='col-md-12'>" +
            '<div class="previewdoc links" data-doc_name="' +
            f.name +
            '" data-preview_source="' +
            (e.target as any).result +
            '" id="previewdoc' +
            i +
            Size1 +
            '" style="background: #184297;border-radius: 3px;width:25px;height:25px;font-size: 14px; text-align: center; padding: 1px;color: white;margin-left: 260px;margin-top: -25px;margin-right: 0 !important;cursor: pointer;"><i class="fa fa-eye" aria-hidden="true"></i></div>' +
            "</div>" +
            "<div class='col-md-12 mt-2'>" +
            '<div class="progress form-group " id="progressnew' +
            i +
            Size1 +
            '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
            i +
            Size1 +
            ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
            i +
            Size1 +
            '" [style.width.%]=""> </div> </div>' +
            "</div>" +
            "</div>" +
            "</div>"
          );
          //).insertAfter("#result"+option_index);
        }

        $(".previewdoc").click(function (event: any) {
          previewData($(that).data("preview_source"), $(that).data("doc_name"));
          event.stopPropagation();
          event.stopImmediatePropagation();
        });

        $("#removepreviewid" + newsize).click(function () {
          removeDocData(newsize);
          $(that).parent().parent().parent(".pip").remove();
        });

        //removing temorary created document div
        $("#removepreviewid2" + newsize).click(function () {
          $(that).parent().parent().parent(".pip").remove();
        });
      };
      fileReader.readAsDataURL(f);

      const formData = new FormData();
      formData.append("document", f);
      this.userService
        .uploaddocumentwithoutticketno(formData)
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log("Request has been made!");

              break;
            case HttpEventType.ResponseHeader:
              console.log("Response header has been received!");
              break;
            case HttpEventType.UploadProgress:
              console.log(event.total);
              console.log(event.loaded);

              // this.progress[newsize] = Math.round(event.loaded / event.total * 100);
              $("div.percentageclass" + i + Size1).width(
                Math.round((event.loaded / event.total!) * 100) + "%"
              );
              $("div.percentageclass" + i + Size1).html(
                Math.round((event.loaded / event.total!) * 100) + "%"
              );
              //console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              $("#result" + option_index)
                .find(".pip")
                .remove();
              $("#resultt" + answer_index)
                .find(".pip")
                .remove();

              let Size111 = f.size;
              let StringTypeCasting = this.dataconvert(Size111);
              let typeofimage = f.type;
              let dateofdocument = f.lastModified;
              let tags = [];
              let newtage =
                StringTypeCasting + "," + typeofimage + "," + dateofdocument;
              tags.push(newtage);
              let companycodenew = "";

              this.uploaded_document_id[newsize] =
                event.body.document_unique_id;
              this.uploaded_document_tags[newsize] = newtage;

              let data = {
                file_name: file_name,
                document_unique_id: event.body.document_unique_id,
                tags: newtage,
                url: event.body.image1,
                localUrl: URL.createObjectURL(f),
              };

              if (
                !this.selectedQuestionArray[answer_index].answerKey.documents
              ) {
                this.selectedQuestionArray[answer_index].answerKey.documents =
                  [];
              }
              this.selectedQuestionArray[answer_index].answerKey.documents.push(
                data
              );
              $("#progressnew" + i + Size1).css("display", "none");
          }
          console.log("after upload", this.selectedQuestionArray);
        });
    }
  }

  remove_uploaded_document(answer_index: any, document_unique_id: any) {
    for (
      let i = 0;
      i < this.selectedQuestionArray[answer_index].answerKey.documents.length;
      i++
    ) {
      if (
        document_unique_id ==
        this.selectedQuestionArray[answer_index].answerKey.documents[i]
          .document_unique_id
      ) {
        this.selectedQuestionArray[answer_index].answerKey.documents.splice(
          i,
          1
        );
        break;
      }
    }
  }

  open_modal(modal_id: any) {
    $('#' + modal_id).appendTo("body");
  }
  close_modal(modal_id: any, append_to: any) {
    $('#' + modal_id).appendTo("#" + append_to);
  }
  preview_uploaded_document(filename: any, url: any, datatype: any) {
    $("#openpreviewmodel").trigger("click");
    this.open_modal('exampleModalpreview');
    $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + filename);
    if (datatype.indexOf("application/pdf") != -1) {
      $("#showpreviewimg").attr("src", "");
      $("#showpreviewimg").css("display", "none");
      $("#showpreviewpdf").attr("src", "");
      $("#showpreviewpdf").css("display", "block");
      //  $('#showpreviewvideo').attr('src',source);
      $("#showpreviewpdf").attr("src", url);
    } else {
      $("#showpreviewpdf").attr("src", "");
      $("#showpreviewpdf").css("display", "none");
      $("#showpreviewimg").attr("src", "");
      $("#showpreviewimg").css("display", "block");
      $("#showpreviewimg").attr("src", url);
    }
  }

  check_nextbutton_validation(question: any, answer_index: any) {
    let validated: any = true;

    if (question.type == "mcq") {
      let input_validation = true;
      let date_validation = true;
      let document_validation = true;

      let selected_option_index: any = "false";

      for (let i = 0; i < question.option.length; i++) {
        if (
          this.selectedQuestionArray[answer_index].answerKey.selected_option ==
          question.option[i]
        ) {
          selected_option_index = i;
          break;
        }
      }

      if (selected_option_index == "false") {
        validated = false;
      }

      // checking input and textarea validation if they are mandatory fields for this question
      if (
        selected_option_index != "false" &&
        question.option_fields &&
        question.option_fields[selected_option_index] &&
        question.option_fields[selected_option_index].option &&
        question.option_fields[selected_option_index].option == "Erforderlich"
      ) {
        if (
          question.option_fields[selected_option_index].option3 ==
          "Kurze Antwort"
        ) {
          if (
            this.selectedQuestionArray[answer_index].answerKey.input &&
            this.selectedQuestionArray[answer_index].answerKey.input != ""
          ) {
            //validated = true;
            input_validation = true;
          } else {
            //validated = false;
            input_validation = false;
          }
        } else {
          if (
            this.selectedQuestionArray[answer_index].answerKey.textarea &&
            this.selectedQuestionArray[answer_index].answerKey.textarea != ""
          ) {
            //validated = true;
            input_validation = true;
          } else {
            //validated = false;
            input_validation = false;
          }
        }
      }

      // checking date validation if they are mandatory fields for this question

      if (
        selected_option_index != "false" &&
        question.option_fields &&
        question.option_fields[selected_option_index] &&
        question.option_fields[selected_option_index].option7 &&
        question.option_fields[selected_option_index].option7 == "Erforderlich"
      ) {
        if (
          question.option_fields[selected_option_index].option6 == "Date range"
        ) {
          if (
            this.selectedQuestionArray[answer_index].answerKey.from_date &&
            this.selectedQuestionArray[answer_index].answerKey.to_date &&
            this.selectedQuestionArray[answer_index].answerKey.from_date !=
            "" &&
            this.selectedQuestionArray[answer_index].answerKey.to_date != ""
          ) {
            //validated = true;
            date_validation = true;
          } else {
            //validated = false;
            date_validation = false;
          }
        } else {
          if (
            this.selectedQuestionArray[answer_index].answerKey.date &&
            this.selectedQuestionArray[answer_index].answerKey.date != ""
          ) {
            //validated = true;
            date_validation = true;
          } else {
            //validated = false;
            date_validation = false;
          }
        }
      }

      // checking document validation if they are mandatory fields for this question(remaining)
      if (
        selected_option_index != "false" &&
        question.option_fields &&
        question.option_fields[selected_option_index] &&
        question.option_fields[selected_option_index].option1 &&
        question.option_fields[selected_option_index].option1 == "Erforderlich"
      ) {
        if (
          this.selectedQuestionArray[answer_index].answerKey.documents &&
          this.selectedQuestionArray[answer_index].answerKey.documents.length >
          0
        ) {
          //validated = true;
          document_validation = true;
        } else {
          //validated = false;
          document_validation = false;
        }
      }

      if (
        input_validation == false ||
        date_validation == false ||
        document_validation == false ||
        validated == false
      ) {
        validated = false;
      } else {
        validated = true;
      }
    } else if (question.type == "input") {
      let input_validation = true;
      let date_validation = true;
      let document_validation = true;

      // checking input and textarea validation if they are mandatory fields for this question
      if (question.option[0] == "Erforderlich") {
        if (question.option3 == "Kurze Antwort") {
          if (
            this.selectedQuestionArray[answer_index].answerKey.input &&
            this.selectedQuestionArray[answer_index].answerKey.input != ""
          ) {
            //validated = true;
            input_validation = true;
          } else {
            //validated = false;
            input_validation = false;
          }
        } else {
          if (
            this.selectedQuestionArray[answer_index].answerKey.textarea &&
            this.selectedQuestionArray[answer_index].answerKey.textarea != ""
          ) {
            //validated = true;
            input_validation = true;
          } else {
            //validated = false;
            input_validation = false;
          }
        }
      }

      // checking date validation if they are mandatory fields for this question

      if (question.option7 == "Erforderlich") {
        if (question.option6 == "Date range") {
          if (
            this.selectedQuestionArray[answer_index].answerKey.from_date &&
            this.selectedQuestionArray[answer_index].answerKey.to_date &&
            this.selectedQuestionArray[answer_index].answerKey.from_date !=
            "" &&
            this.selectedQuestionArray[answer_index].answerKey.to_date != ""
          ) {
            //validated = true;
            date_validation = true;
          } else {
            //validated = false;
            date_validation = false;
          }
        } else {
          if (
            this.selectedQuestionArray[answer_index].answerKey.date &&
            this.selectedQuestionArray[answer_index].answerKey.date != ""
          ) {
            //validated = true;
            date_validation = true;
          } else {
            //validated = false;
            date_validation = false;
          }
        }
      }

      // checking document validation if they are mandatory fields for this question(remaining)
      if (question.option[1] == "Erforderlich") {
        if (
          this.selectedQuestionArray[answer_index].answerKey.documents &&
          this.selectedQuestionArray[answer_index].answerKey.documents.length >
          0
        ) {
          //validated = true;
          document_validation = true;
        } else {
          //validated = false;
          document_validation = false;
        }
      }

      if (
        input_validation == false ||
        date_validation == false ||
        document_validation == false ||
        validated == false
      ) {
        validated = false;
      } else {
        validated = true;
      }
    }

    this.selectedQuestionArray[answer_index].validated = validated;
    return validated;
  }

  submitValidation() {
    let disabled: boolean = false;
    for (let i = 0; i < this.selectedQuestionArray.length; i++) {
      if (this.selectedQuestionArray[i].validated === false) {
        disabled = true;
      }
    }
    return disabled;
  }

  answeredCount() {
    let count = 0;
    for (let i = 0; i < this.selectedQuestionArray.length; i++) {
      if (this.selectedQuestionArray[i].validated === true) {
        count = count + 1;
      }
    }
    return count;
  }

  generateQuestionPdf() {
    let pdfnew: any = new jsPDF("portrait", "pt", "a4");
    var width = pdfnew.internal.pageSize.width;
    let that = this;

    async function generateFooter(base64: any) {
      // pdfnew.setFontSize(10);
      // pdfnew.setTextColor(150);
      // pdfnew.text('Header Text', pdfnew.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
      // pdfnew.addImage(base64, 'PNG', 0, 750, pdfnew.internal.pageSize.getWidth(), 50);
      pdfnew.addImage(
        base64,
        "PNG",
        0,
        pdfnew.internal.pageSize.getHeight() - 45,
        pdfnew.internal.pageSize.getWidth(),
        40
      );
      // console.log("b64 outside", base64)
    }

    $("#loaderouterid").css("display", "block");
    $("#questionPdf").css("display", "block");
    pdfnew.html(document.getElementById("questionPdf"), {
      html2canvas: {
        width: width,
      },
      autoPaging: "text",
      margin: [10, 0, 45, 0],
      callback: async function (pdfnew: any) {
        let pages = pdfnew.getNumberOfPages();
        pdfnew.setPage(pages);
        const imageUrl = "../assets/footer.png";
        var image = new Image();
        image.src = imageUrl;
        image.crossOrigin = "Anonymous";
        image.onload = async function () {
          var canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          var context: any = canvas.getContext("2d");
          context.drawImage(image, 0, 0);
          await generateFooter(canvas.toDataURL("image/png").split(",")[1]);
          // pdfnew.save("Test.pdf");
          $("#questionPdf").css("display", "none");
          that.handlePdfUpload(pdfnew.output("blob"));
        };
        // this.pdffile = pdfnew.output("blob");
        // $('#questionPdf').css('display', 'none');
        // that.handlePdfUpload(pdfnew.output("blob"))
      },
    });
  }

  async handlePdfUpload(pdfFile: any) {
    let currentPdf = pdfFile;
    let that = this;

    const formData = new FormData();
    formData.append("document", currentPdf);
    this.userService
      .uploaddocumentwithoutticketno(formData)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log("Request has been made!");
            break;
          case HttpEventType.ResponseHeader:
            console.log("Response header has been received!");
            break;
          case HttpEventType.UploadProgress:
            console.log(event.total);
            console.log(event.loaded);
            break;
          case HttpEventType.Response:
            let Size111 = currentPdf.size;
            let StringTypeCasting = this.dataconvert(Size111);
            let typeofimage = currentPdf.type;
            let dateofdocument = currentPdf.lastModified;
            // let tags = [];
            let newtage =
              StringTypeCasting + "," + typeofimage + "," + dateofdocument;
            // tags.push(newtage);

            let data = {
              // document_unique_id: event.body.document_unique_id,
              tags: newtage,
              // url: event.body.image1,
              // localUrl: URL.createObjectURL(currentPdf),
              fileName: `${this.selectedTab.name}_Antworten`,
            };
            this.uploadedPdfData = data;
            let questionData = {
              tabId: this.selectedTab.id,
              userId: this.currentTabUser.id,
              addedBy: this.localData.brokerinfo[0]._id,
              questions: this.selectedQuestionArray,
              docId: event.body.document_unique_id,
              docDetails: data,
              userType:
                this.localData.title !== "Firma" &&
                  this.localData.companyname === ""
                  ? "haushalt"
                  : "comapny",
            };
            this.userService
              .addQuestionAnswer(questionData)
              .subscribe((result) => {
                $("#loaderouterid").css("display", "none");
                $("#signature1").attr("src", "");
                $("#signature2").attr("src", "");
                this.currentSignature = "";
                console.log("result it", result);
                Swal.fire({
                  position: "center",
                  allowOutsideClick: false,
                  title: "Ihre Daten wurden erfolgreich gespeichert.",
                  iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
                  confirmButtonText: "Ok",
                  confirmButtonColor: '#02a9ed',
                  customClass: {
                    icon: 'no-border'
                  },
                }).then(() => {
                  this.userService
                    .getDocumentByTabId(this.selectedTab.id)
                    .subscribe(
                      (result: any) => {
                        this.documentPdfList = result;
                        $("#loaderouterid").css("display", "none");
                        $("#QAModalClose").trigger("click");
                      },
                      (err) => {
                        $("#loaderouterid").css("display", "none");
                        $("#QAModalClose").trigger("click");
                      }
                    );
                });
              });
        }
      });
  }

  viewAnswers(item: any) {
    console.log(item)
    if ($("#click" + item._id).html() == "Öffnen") {
      this.selectedAnswers = [];
      $("#loaderouterid").css("display", "block");
      this.currentQuestionId = item._id;
      $(".click").html("Öffnen");
      $("#click" + item._id).html("Schließen");
      // $("#viewAnswerDiv").css("display", "block");
      this.userService
        .getAnswersByQuestionId({ questionId: item._id })
        .subscribe((result: any) => {
          $("#loaderouterid").css("display", "none");
          result.map((entry: any, i: any): any => {
            entry.questions.map((ques: any, j: any) => {
              if (ques._id === item._id) {
                this.selectedAnswers.push({
                  ...ques,
                  answerDate: entry.createdAt,
                });
              }
            });
          });
          // console.log("selected answers", this.selectedAnswers)
        });
    } else if ($("#click" + item._id).html() == "Schließen") {
      $(".click").html("Öffnen");
      this.currentQuestionId = "";
    }
  }

  viewAnswers2(item: any) {
    if ($("#click2" + item._id).html() == "Öffnen") {
      this.selectedAnswers = [];
      $("#loaderouterid").css("display", "block");
      this.currentQuestionId = item._id;
      $(".click").html("Öffnen");
      $("#click2" + item._id).html("Schließen");
      this.userService
        .getAnswersByQuestionId({ questionId: item._id })
        .subscribe((result: any) => {
          $("#loaderouterid").css("display", "none");
          result.map((entry: any, i: any) => {
            entry.questions.map((ques: any, j: any) => {
              if (ques._id === item._id) {
                this.selectedAnswers.push({
                  ...ques,
                  answerDate: entry.createdAt,
                });
              }
            });
          });
        });
    } else if ($("#click2" + item._id).html() == "Schließen") {
      $(".click").html("Öffnen");
      this.currentQuestionId = "";
    }
  }

  setPdfPreview(item: any) {
    // let fileName = item.docName.length ? item.docName[0] : "";
    // let fileTags = item.docTags.length ? item.docTags[0][0].split(",")[1] : "";
    // let fileUrl = item.docId ? item.docId : "";
    let fileName = item.document_info[0]?.document_name ? item.document_info[0]?.document_name : "";
    let fileTags = item.document_info[0]?.tags[0] ? item.document_info[0]?.tags[0] : "";
    let fileUrl = item.docId ? item.docId : "";

    if (fileName !== "" && fileTags !== "" && fileUrl !== "") {
      this.userService.viewDocument(fileUrl).subscribe((result: any) => {
        this.preview_uploaded_document(fileName, result.url, fileTags);
      });
    }
  }

  setCurrentAnswer(data: any) {
    // console.log("current answer prev", data)
    let newData = data;
    newData.answerKey.date = newData.answerKey.date
      ? new Date(newData.answerKey.date)
      : new Date();
    newData.answerKey.from_date = newData.answerKey.from_date
      ? new Date(newData.answerKey.from_date)
      : "";
    newData.answerKey.to_date = newData.answerKey.to_date
      ? new Date(newData.answerKey.to_date)
      : "";
    this.currentAnswer = newData;
    // console.log("current answer", this.currentAnswer)
  }

  setBranchList(event: any) {
    // this.countryFormGroup.controls.currency.setValue("");
    const getItem = this.branchList.find(
      (item: any) => item === event.option.value
    );
    if (!getItem) {
      this.branchList.push(event.option.value);
      // let matCurrency = document.getElementById("currencySelect");
      // matCurrency.blur();
    } else {
      Swal.fire({
        title: `Währung bereits hinzugefügt.`,
        showCloseButton: true,
        allowOutsideClick: false,
        icon: "error",
      });
    }
  }

  deleteBranchList(data: any) {
    this.branchList = this.branchList.filter((obj: any) => obj !== data);
  }

  deleteMemberFromList(index:number){
    console.log(index,this.branchList)

   this.branchList.splice(index,1);
    console.log(this.branchList)

  }

  setCurrentTabUser(office: any, type: any) {
    let id = "";
    let name = "";
    let email = "";
    let strno = "";
    let city = "";
    let country = "";

    if (type === "branch") {
      id = office._id;
      name = office.officename;
      email = "";
      strno = office.strno;
      city = office.city;
      country = office.current_country;
      this.currentTabUser = { id, name, email, strno, city, country };
    } else if (type === "company") {
      id = office._id;
      name = office.companyname;
      email = office.email;
      strno = office.strno;
      city = office.city;
      country = office.current_country;
      this.currentTabUser = { id, name, email, strno, city, country };
    } else if (type === "haushalt") {
      id = office._id;
      name = office.title + " " + office.firstname + " " + office.lastname;
      email = office.email;
      strno = office.strno;
      city = office.city;
      country = office.current_country;
      this.currentTabUser = { id, name, email, strno, city, country };
    }

    console.log("office data", office);
  }

  show_next_question(current_question_index: any) {
    let exists = 0;
    for (let i = 0; i < this.answered_question_id.length; i++) {
      if (
        this.answered_question_id[i] ==
        this.selectedQuestionArray[current_question_index]._id
      ) {
        exists = 1;
      }
    }

    if (exists == 0) {
      this.answered_question_id.push(
        this.selectedQuestionArray[current_question_index]._id
      );
    }

    this.opened_question = current_question_index + 1;
  }

  show_previous_question(current_question_index: any) {
    this.opened_question = current_question_index - 1;
  }

  navigate_to_question(index: any) {
    let exists = 0;
    for (let i = 0; i < this.answered_question_id.length; i++) {
      if (
        this.answered_question_id[i] ==
        this.selectedQuestionArray[this.opened_question]._id
      ) {
        exists = 1;
        // it means question is already answered and being edited now that's why it exists in this.answered_question_id
      }
    }

    if (
      exists == 1 &&
      this.check_nextbutton_validation(
        this.selectedQuestionArray[this.opened_question],
        this.opened_question
      ) == true
    ) {
      this.opened_question = index;

      // answered question is validated and can move to another answered questions
    } else if (exists == 0) {
      this.opened_question = index;
    }
  }

  get_unread_chat() {
    let message = {
      broker_id: this.customerid,
      case_no: this.lastcase_no,
    };
    // console.log("case no in customer side");
    this.userService.getchatunreadmessage(message).subscribe(
      (success: any) => {
        for (let i = 0; i < success.result.length; i++) {
          if (
            this.messagelist.findIndex(
              (x: any) => x._id == success.result[i]._id
            ) == -1
          ) {
            this.messagelist.push(success.result[i]);
          }
        }
      },
      (err) => {
        console.log("error5");
        console.log(err);
      },
      () => { }
    );
  }


  ngAfterViewInit() {
    console.log('aftervie *********************************');

    setTimeout(() => {
      this.signaturePad = new SignaturePad(this.canvas.nativeElement);
    });
    this.getalldocument();

    if (this.caselistnew.length > 0) {
      $("#li0").trigger("click");
    }
    if (this.lastcase_no != "") {
      console.log("sdfsfsdfs" + this.lastcase_no);
      this.userService
        .GetSingleDocument(this.lastcase_no, "", "")
        .subscribe((success: any) => {
          console.log("sdfsfsdfs" + JSON.stringify(success));
          this.CurrentChat(success[0], 0);
          // this.selectedbroker=success[0].employ_ids;
        });
    }

    setTimeout(() => {
      const input: any = document.querySelector("#phone_numberoffice");
      console.log("querySelector" + input);
      if (input)
        intlTelInput(input, {
          initialCountry: "de",
          geoIpLookup: function (callback) {
            $.get("http://ipinfo.io", function () { }, "jsonp").always(function (
              resp: any
            ) {
              var countryCode = resp && resp.country ? resp.country : "de";
              callback(countryCode);
              console.log("countryCode" + countryCode);
            });
          },
        });
    }, 500);
    setTimeout(() => {
      const input: any = document.querySelector("#phone_number");
      console.log("querySelector" + input);
      if (input)
        intlTelInput(input, {
          initialCountry: "de",
          geoIpLookup: function (callback) {
            $.get("http://ipinfo.io", function () { }, "jsonp").always(function (
              resp: any
            ) {
              var countryCode = resp && resp.country ? resp.country : "de";
              callback(countryCode);
              console.log("countryCode" + countryCode);
            });
          },
        });
    }, 500);
    setTimeout(() => {
      const input: any = document.querySelector("#phone_numbercustomer");
      console.log("querySelector" + input);
      if (input)
        intlTelInput(input, {
          initialCountry: "de",
          geoIpLookup: function (callback) {
            $.get("http://ipinfo.io", function () { }, "jsonp").always(function (
              resp: any
            ) {
              var countryCode = resp && resp.country ? resp.country : "de";
              callback(countryCode);
              console.log("countryCode" + countryCode);
            });
          }
        });
    }, 100);
    setTimeout(() => {
      if (this.familyData.length > 0) {
        console.log("querySelector1" + this.familyData.length);
        for (let i = 0; i < this.familyData.length; i++) {
          console.log("querySelector1" + this.familyData.length + i);
          const input: any = document.querySelector("#phoneno" + i);
          console.log("querySelector1" + input);
          if (input)
            intlTelInput(input, {
              initialCountry: "de",
              geoIpLookup: function (callback) {
                $.get("http://ipinfo.io", function () { }, "jsonp").always(
                  function (resp: any) {
                    var countryCode = resp && resp.country ? resp.country : "de";
                    callback(countryCode);
                    console.log("querySelector1countryCode" + countryCode);
                  }
                );
              },
            });
        };
      };
    }, 100);
    setTimeout(() => {
      const input: any = document.querySelector("#contactnum");
      console.log("querySelector" + input);
      if (input) {
        intlTelInput(input, {
          initialCountry: "de",
          geoIpLookup: function (callback) {
            $.get("http://ipinfo.io", function () { }, "jsonp").always(function (
              resp: any
            ) {
              var countryCode = resp && resp.country ? resp.country : "de";
              callback(countryCode);
              console.log("countryCode" + countryCode);
            });
          },
        })
      };
    }, 500);
    setTimeout(() => {
      this.signaturePad.minWidth = 2; // set szimek/signature_pad options at runtime
      this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    });


    this.userService
      .getCustomerCompanies(this.customerid)
      .pipe(first())
      .subscribe((companydata: any) => {
        this.companyData = companydata;

        console.log("company data received");
        console.log(this.companyData);

        for (
          let com_count = 0;
          com_count < this.companyData.length;
          com_count++
        ) {
          let poa_exists = 0;
          let poa_url: any;
          for (
            let doc_count = 0;
            doc_count < this.companyData[com_count].docs.length;
            doc_count++
          ) {
            if (
              this.companyData[com_count].docs[doc_count].document_name ==
              "Maklervollmacht"
            ) {
              poa_exists = 1;
              poa_url =
                this.companyData[com_count].docs[doc_count].document_unique_id;
              break;
            }
          }

          if (poa_exists == 1) {
            this.companyData[com_count].poa = "1";
            this.companyData[com_count].poa_url = poa_url;
          } else {
            this.companyData[com_count].poa = "0";
          }
        }
      });

    setTimeout(() => {
      this.userService
        .getfamilyMembers(this.customerid)
        .pipe(first())
        .subscribe((familydata11: any) => {
          console.log("familydata" + JSON.stringify(this.familyData));
          this.familyData = familydata11;
          setTimeout(() => {
            if (this.familyData.length > 0) {
              console.log("querySelector1" + this.familyData.length);
              for (let i = 0; i < this.familyData.length; i++) {
                console.log("querySelector1" + this.familyData.length + i);
                const input: any = document.querySelector("#phoneno" + i);
                console.log("querySelector1" + input);
                if (input)
                  intlTelInput(input, {
                    initialCountry: "de",
                    geoIpLookup: function (callback) {
                      $.get("http://ipinfo.io", function () { }, "jsonp").always(
                        function (resp: any) {
                          var countryCode =
                            resp && resp.country ? resp.country : "de";
                          callback(countryCode);
                          console.log("querySelector1countryCode" + countryCode);
                        }
                      );
                    },
                  });
              }
            }
          }, 100);

          console.log("familydata1" + JSON.stringify(this.familyData));
        });
    }, 500);

    this.userService
      .getUserCompanyOffices(this.customerid)
      .pipe(first())
      .subscribe((userofficedata: any) => {
        this.userofficeData = userofficedata;
        setTimeout(() => {
          if (this.userofficeData.length > 0) {
            console.log("querySelector1" + this.userofficeData.length);
            for (let i = 0; i < this.userofficeData.length; i++) {
              console.log("querySelector1" + this.userofficeData.length + i);
              const input: any = document.querySelector(
                "#userphonenoOffice" + i
              );
              console.log("querySelector1" + input);
              if (input)
                intlTelInput(input, {
                  initialCountry: "de",
                  geoIpLookup: function (callback) {
                    $.get("http://ipinfo.io", function () { }, "jsonp").always(
                      function (resp: any) {
                        var countryCode =
                          resp && resp.country ? resp.country : "de";
                        callback(countryCode);
                        console.log("querySelector1countryCode" + countryCode);
                      }
                    );
                  },
                });
            }
          }
        }, 500);
        console.log("userofficeData" + JSON.stringify(userofficedata));
      });

    this.userService.invokeFunctionInCustomerSide.subscribe(data => {
      if (data[0] == 'setCurrentTabUser') {
        this.setCurrentTabUser(data[1], data[2])
      } else if (data[0] == 'change_account_name') {
        this.change_account_name(data[1], data[2], data[3], data[4], data[5])
      } else if (data[0] == 'tabisclicked') {
        this.tabisclicked(data[1])
      } else if (data[0] == 'savecompanyId') {
        this.savecompanyId(data[1]);
      } else if (data[0] == 'remove_border') {
        this.remove_border(data[1])
      }
    })



  }


  ngAfterContentInit(): void {
    this.hideValues = {
      hideHaushaltMain: false,
      hideHaushaltIn1: true,
      hideContainerMain: true,
      hideContainerIn: true,
      hidemultiCompanyprivatecustomerMain: true,
      hidemultiCompanyprivatecustomerIn: true,
      hideCompanyCustomerMain: true,
      hideCompanyCustomerIn: true,
      hidemultiCompanycustomerMain: false,
      hidemultiCompanycustomerIn: true,
      hidedisabledfamilyMain: true,
      hidedisabledfamilyIn:true,
      hideCompanyMain: false,
      hideCompanyIn: true,
      hidemultiCompanyMain: false,
      hidemultiCompanyIn: true
    };

  }


  isDivisibleBy(num: any) {
    if (num % 5 == 0 && num % 7 == 0) console.log("isDivisibleByHello World");

    if (num % 5 == 0) console.log("isDivisibleByHello");

    if (num % 7 == 0) console.log("isDivisibleByWorld");
  }

  startloader() {
    console.log("startloader");
    $("#loaderouterid").css("display", "block");
  }
  checkmessage() {
    let inputmessage: any = $("#inputmessage").val();
    if (inputmessage == "") {
      this.editsendbutton = true;
    } else {
      this.editsendbutton = false;
    }
  }
  checkemailnewcompany() {
    $("#checkemailerrorcompany").html("");
    $("#checkemailerrorcompany").css("background-color", "transparent");
    $("#checkemailerrorcompany").css("padding", "0px");
    let datanew = { email: this.familyFormGroup.controls["email"].value };
    console.log("checkemailnew" + datanew);
    this.userService
      .checkemail(datanew)
      .pipe(first())
      .subscribe((data11: any) => {
        console.log("checkemailnew" + datanew);
        if (data11["status"] == "200") {
          this.customervalidemail = true;
          $("#checkemailerrorcompany").html("");
          $("#checkemailerrorcompany").css("background-color", "transparent");
          $("#checkemailerrorcompany").css("padding", "0px");
        } else {
          this.customervalidemail = false;
          $("#checkemailerrorcompany").html(data11["msg"]);
          $("#checkemailerrorcompany").css("background-color", "white");
          $("#checkemailerrorcompany").css("padding", "10px");
        }
      });
  }
  sendmessage() {
    // $('#inputmessage').attr("disabled","true");
    $("#inputmessage").attr("disabled", "true");

    let inputmessage: any = $("#inputmessage").val();

    console.log("moveforward" + JSON.stringify(this.selectedbroker));
    let index = this.selectedbroker.indexOf(this.localData._id);
    if (index != -1) {
      this.selectedbroker.splice(index, 1);
    }
    console.log("moveforward" + JSON.stringify(this.selectedbroker));

    let newdata = {
      broker_id: this.selectedbroker,
      case_no: this.T_N,
      company_name: "Cefima",
      message: inputmessage,
      CreatedBy: this.localData._id,
      ptid: this.selectedptid,
      ppid: this.selectedppid,
    };

    this.userService.sendmessage(newdata).subscribe((result: any) => {
      console.log("moveforward" + JSON.stringify(result));
      let data = {
        _id: result.result._id,
        company_name: result.result.company_name,
        case_no: result.result.case_no,
        message: result.result.message,
        type: result.result.type,
        question_id: result.result.question_id,
        ans: result.result.ans,
        mid: result.result.mid,
        createdAt: result.result.createdAt,
        userinfo: [
          {
            firstname: this.localData.firstname,
            lastname: this.localData.lastname,
          },
        ],
        specilistsinfo: [],
        ppinfo: [],
      };

      console.log("moveforward" + JSON.stringify(data));

      this.messagelist.push(data);
      $("#inputmessage").removeAttr("disabled");
      this.editsendbutton = true;
      $("#inputmessage").val("");
    });
  }

  getalldocument() {
    console.log(
      "caselistnewsdfdsfdfsdsfdsfdsfasdasdasd" +
      JSON.stringify(this.caselistnew)
    );
    this.userService
      .getlistbyuserid({ userid: this.customerid })
      .subscribe((result: any) => {
        console.log(
          "caselistnewsdfdsfdfsdsfdsfdsfasdasdasd" +
          JSON.stringify(this.caselistnew)
        );
        let success: any = [];
        if (result.length > 0) {
          result.forEach((data: any, i: number) => {
            if (
              success.find(
                (o: any) => o.Activity_No == data.documentdatanew[0].ticket_no
              ) == undefined
            ) {
              success.push({ case_no: data.casedata[0].Activity_No });
            }
          });
        }
        console.log(
          "caselistnewsdfdsfdfsdsfdsfdsfasdasdasd" +
          JSON.stringify(this.caselistnew)
        );
        this.userService
          .GetListbycaseno0("42140 DFG Finanzprofi GmbH", this.customerid)
          .subscribe((usercasenew: any) => {
            this.userService
              .GetSingleDocumentbycaseno(success)
              .subscribe((success: any) => {
                $("#loaderouterid").css("display", "none");
                console.log("success" + success);
                console.log("value haiin");
                this.caselistnew = success;
                console.log(
                  "caselistnewsdfdsfdfsdsfdsfdsf" +
                  JSON.stringify(this.caselistnew)
                );

                this.caselistnew.forEach((element: any) => {
                  let caseno = element.Activity_No;
                  let checkcase = result.filter(
                    (o: any) => o.casedata[0].Activity_No == caseno
                  );
                  console.log("sdfdsfdsfdsf" + JSON.stringify(checkcase));
                  if (checkcase.length > 0) {
                    checkcase.forEach((o: any) => {
                      console.log("sdfdsfdsfdsf" + JSON.stringify(element));

                      // let checkptname=checkcase.producttypeinfo.filter(o11 => o11._id==o.ptid)
                      // console.log("sdfdsfdsfdsf"+JSON.stringify(checkptname))
                      var newdata = {
                        employ_ids: element.employ_ids,
                        _id: element._id,
                        Activity_No: element.Activity_No,
                        Transaction_Type: element.Transaction_Type,
                        Uploaded_By: element.Uploaded_By,
                        Proces_Date: element.Proces_Date,
                        companyname: element.companyname,
                        ptid: o.producttypesinfo[0]._id,
                        ppid: o.productpartnersinfo[0]._id,
                        ptname: o.producttypesinfo[0].product_typename,
                        ppname:
                          o.productpartnersinfo[0].company_name.toUpperCase(),
                      };
                      // newdata.ptid=o.ptid;
                      this.newcaselistnew.push(newdata);
                      // newdata='';
                    });
                  }
                });

                if (usercasenew.length > 0) {
                  usercasenew.forEach((usercasenew11: any) => {
                    let newcase = usercasenew11.userinfo.find(
                      (o: any) => o._id != this.customerid
                    );
                    console.log(
                      "sdfdsfdsfdsfdfdhfsdhfghsdgfhjsdfsd" +
                      JSON.stringify(newcase)
                    );
                    let newdata: any = {
                      employ_ids: usercasenew11.employ_ids,
                      _id: usercasenew11._id,
                      Activity_No: usercasenew11.Activity_No,
                      Transaction_Type: "",
                      Uploaded_By: usercasenew11.Uploaded_By,
                      Proces_Date: usercasenew11.Proces_Date,
                      companyname: usercasenew11.companyname,
                      ptid: "",
                      ppid: "",
                      ptname: "",
                      ppname:
                        newcase.firstname.toUpperCase() +
                        " " +
                        newcase.lastname.toUpperCase(),
                    };
                    // newdata.ptid=o.ptid;
                    this.newcaselistnew.push(newdata);
                    // newdata='';
                  });
                }

                console.log(
                  "sdfdsfdsfdsf" + JSON.stringify(this.newcaselistnew)
                );
              });
          });
      });
  }
  CurrentChat(user: any, i: number) {
    this.lastcase_no = user.Activity_No;
    $(".nesteslist").removeClass("activediv");
    let message = {
      broker_id: this.customerid,
      case_no: user.Activity_No,
      ptid: user.ptid,
      ppid: user.ppid,
    };

    this.video_chat_data = {
      broker_id: this.customerid,
      user: user,
    };

    this.userService.getchatmessage(message).subscribe(
      (success: any) => {
        console.log(success);
        this.messagelist = success.result;
        $("#li" + user.Activity_No + user.ptid + user.ppid).addClass(
          "activediv"
        );
        this.userService
          .getbrokerbyuser_id(user.employ_ids)
          .subscribe((fidresult: any) => {
            console.log("sdfdsfdsdsffsfs" + JSON.stringify(fidresult));
            this.alluserdetails = fidresult;
            this.T_N = user.Activity_No;
            this.selectedbroker = user.employ_ids;
            this.ptname = user.ptname;
            this.Transaction_Type = user.Transaction_Type;
            this.selectedptid = user.ptid;
            this.selectedppid = user.ppid;
          });
      },
      (err) => {
        console.log(err);
      },
      () => { }
    );
  }
  getnotidata(notidata: any) {
    this.unreadcount = notidata;
    // console.log("sdfsfdsfsfsfsf" + notidata);
  }

  ngOnDestroy() {
    this.responseobserve.unsubscribe();
    this.userService.invokeSideBarRouteFether.next(null)
  }
  getcurrentUser(T_N: any) {
    console.log("getcurrentUser");
    this.userService.GetDocByInsurance(T_N).subscribe((success: any) => {
      console.log(success);
      for (let i = 0; i < success.length; i++) {
        if (success[i].document_type == "Angebot bekommen") {
          let obj = {
            URL: this.OfferdDocUrl,
          };
          this.ReciverId = success[i].user;
          let Final = Object.assign(obj, success[i]);

          this.OfferedDocWithTicket_No.push(Final);
        }
      }
    });
  }
  editRecord(type: any, index: any, data: any, cardindex?: any) {
    console.log("editRecord" + JSON.stringify(data) + "index" + index,type,cardindex);
    console.log("editRecordcardindex" + cardindex);
    let modalid = ''
    if(type.includes('type1')){
      modalid= `collapsetype1modal`
    } else if(type.includes('type2')){
      modalid= `collapsetype2modal`
    } else if(type.includes('type3')){
      modalid= `collapsetype3modal`
    } 
    
    console.log(modalid)
    if (type == "type1" && index == 0) {

      this.showceodoc = true;
    } else {
      this.showceodoc = false;
    }
    if (type == "type3") {
      this.shareholdersindex = index;
      console.log("shareholdersindex" + this.shareholdersindex);
    } else {
      this.shareholdersindex = "";
      console.log("shareholdersindex1" + this.shareholdersindex);
    }
    let accordianId = "";
    event!.preventDefault();
    let element1new: HTMLElement;
    let element1: HTMLElement;
    let element: HTMLElement;
    if (cardindex == undefined) {
      accordianId = "collapse" + type;
      element1new = document.getElementById("cardbodyid" + type) as HTMLElement;
      element1 = document.getElementById("ul" + type + index) as HTMLElement;
      element = document.getElementById("click" + type + index) as HTMLElement;
    } else {
      accordianId = "collapse" + type + cardindex;
      element1new = document.getElementById(
        "cardbodyid" + type + cardindex
      ) as HTMLElement;
      element1 = document.getElementById(
        "ul" + type + cardindex + index
      ) as HTMLElement;
      element = document.getElementById(
        "click" + type + cardindex + index
      ) as HTMLElement;

    }

    let accordian: HTMLElement = document.getElementById(accordianId)!;
    if (element.innerHTML == "Schließen") {
      console.log("element", element1new);
      element1new.after(accordian);
      // accordian.classList.add("collapse");
      // accordian.classList.add("collapse");
      // accordian.classList.remove("collapse-show");

      element.innerHTML = "Öffnen";

      let close = "close";
      console.log("elementelse0000000", element1);
      this.openid = "";
      //this.checkDataAndCreateUpdateData(true, element, accordian,close)
    } else {
      console.log('else')
      // setTimeout(() => {
      //   const input = document.querySelector("#phone");
      //   console.log("querySelector" + JSON.stringify(input));
      //   intlTelInput(input, {});
      // }, 500);

      if (this.openid != "") {
        let elementnew1: HTMLElement = document.getElementById(
          "click" + this.openid
        ) as HTMLElement;
        let accordian: HTMLElement = document.getElementById(this.openid)!;
        if (elementnew1) {
          // element1new.after(accordian);
          // accordian.classList.add("collapse");
          // // accordian.classList.add("collapse");
          // accordian.classList.remove("collapse-show");
          // elementnew1.innerHTML = "Öffnen";
        }
      }
      console.log(this.openid);
      element1.after(accordian);
      console.log(accordian);

      $(`#${modalid}btn`).trigger("click");
      this.open_modal(modalid)
      // accordian.classList.remove("collapse");
      // accordian.classList.add("collapse-show");
      // element.innerHTML = "Schließen";
      if (cardindex == undefined) {
        this.openid = type + index;
      } else {
        this.openid = type + cardindex + index;
      }

      console.log(this.openid);
      console.log(accordian);

      if (type == "type1company") {
        this.brokerformtype1.patchValue({
          title: data.title,
          firstName: data.firstname,
          lastName: data.lastname,
          dob: data.dateofbirth,
          street: data.streetfirst,
          streetNumber: data.streetNumberfirst,
          postCode: data.postCodefirst,
          city: data.cityfirst,
          additionalReference: data.additionalReferencefirst,
          countryOfResidence: data.countryOfResidencefirst,
        });
      }
      if (type == "type2company") {
        this.brokerformtype2.patchValue({
          title: data.title,
          firstName: data.firstname,
          lastName: data.lastname,
          dob: data.dateofbirth,
          street: data.streetsecond,
          streetNumber: data.streetNumbersecond,
          postCode: data.postCodesecond,
          city: data.citysecond,
          additionalReference: data.additionalReferencesecond,
          countryOfResidence: data.countryOfResidencesecond,
        });
      }
      if (type == "type3company") {
        this.brokerformtype3.patchValue({
          title: data.title,
          firstName: data.firstname,
          lastName: data.lastname,
          dob: data.dateofbirth,
          shares: data.shares,
          street: data.streetshare,
          streetNumber: data.streetNumbershare,
          postCode: data.postCodeshare,
          city: data.cityshare,
          additionalReference: data.additionalReferenceshare,
          countryOfResidence: data.countryOfResidenceshare,
        });
      }
      if (type == "type1") {
        this.brokerformtype1.patchValue({
          title: this.type1[index].title,
          firstName: this.type1[index].firstname,
          lastName: this.type1[index].lastname,
          dob: this.type1[index].dateofbirth,
          street: this.type1[index].streetfirst,
          streetNumber: this.type1[index].streetNumberfirst,
          postCode: this.type1[index].postCodefirst,
          city: this.type1[index].cityfirst,
          additionalReference: this.type1[index].additionalReferencefirst,
          countryOfResidence: this.type1[index].countryOfResidencefirst,
        });
      }
      if (type == "type2") {
        this.brokerformtype2.patchValue({
          title: this.type2[index].title,
          firstName: this.type2[index].firstname,
          lastName: this.type2[index].lastname,
          dob: this.type2[index].dateofbirth,
          street: this.type2[index].streetsecond,
          streetNumber: this.type2[index].streetNumbersecond,
          postCode: this.type2[index].postCodesecond,
          city: this.type2[index].citysecond,
          additionalReference: this.type2[index].additionalReferencesecond,
          countryOfResidence: this.type2[index].countryOfResidencesecond,
        });
      }
      if (type == "type3") {
        this.brokerformtype3.patchValue({
          title: this.type3[index].title,
          firstName: this.type3[index].firstname,
          lastName: this.type3[index].lastname,
          dob: this.type3[index].dateofbirth,
          shares: this.type3[index].shares,
          street: this.type3[index].streetshare,
          streetNumber: this.type3[index].streetNumbershare,
          postCode: this.type3[index].postCodeshare,
          city: this.type3[index].cityshare,
          additionalReference: this.type3[index].additionalReferenceshare,
          countryOfResidence: this.type3[index].countryOfResidenceshare,
        });
      }
    }
  }

  saveCustomerCompanyData() {
    console.log("saveCustomerCompanyData");
  }
  private _filterrelationtype(value: string): string[] {
    console.log("_filterland" + value);
    const filterValue = value.toLowerCase();
    return this.relations.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  private _filtermartialStatustype(value: string): string[] {
    console.log("_filterland" + value);
    const filterValue = value.toLowerCase();
    return this.martialStatus.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  private _filterTypeBranch(value: string): string[] {
    console.log(value);
    console.log(typeof value);
    const filterValue = value.toLowerCase();

    return this.branchlist.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  resetFamilyForm() {
    $("#resetStepper").trigger("click");
    this.familyForm.resetForm();
    this.familyRelation.setValue("");
    this.martialStatusControl.setValue("");

    this.familyFormGroup.patchValue({
      phone_number: "+49",

      street: this.localData.strassa,
      streetNumber: this.localData.strno,
      postCode: this.localData.plz,
      city: this.localData.city,
      additionalReference: this.localData.additionalReference,
      countryOfResidence: this.localData.current_country,
    });
  }
  resetFamilyFormesign() {
    this.currentMemberId = "";
  }
  exportAsPDFnew() {
    $("#loaderouterid").css("display", "block");
    console.log("this.signaturePad.toDataURL()");

    $("#familyWithBrokerpdf").attr("src", this.signaturePad.toDataURL());
    $("#familyNoBrokerpdf").attr("src", this.signaturePad.toDataURL());
    $("#familyWithBrokerpdfesign").attr("src", this.signaturePad.toDataURL());
    $("#familyNoBrokerpdfesign").attr("src", this.signaturePad.toDataURL());
    console.log(this.signaturePad.toDataURL());
    $("#bodydivfamily").css("display", "block");

    this.exportAsPDF();
  }
  showTitleError(event: any) {
    console.log("showTitleError" + event);
    console.log(
      "showTitleError" + this.familyFormGroup.controls["title"].value
    );
    console.log("showTitleError" + this.enterTitlebroker);

    if (
      (event != "" && this.familyFormGroup.controls["title"].value == "") ||
      this.familyFormGroup.controls["title"].value == null
    ) {
      this.enterTitlebroker = true;
    } else {
      this.enterTitlebroker = false;
    }
  }
  titleChangeBroker($event: any) {
    this.enterTitlebroker = false;
  }
  exportAsPDF() {
    let that = this;
    $("#loaderouterid").css("display", "block");

    let pdf: any = new jsPDF("portrait", "pt", "a4");

    var width = pdf.internal.pageSize.width;
    pdf.html(document.getElementById("MyDIvfamily"), {
      html2canvas: {
        width: width,
      },
      callback: function (pdf: any) {
        pdf.save("Maklervollmacht.pdf");
        $("#loaderouterid").css("display", "none");
        $("#bodydivfamily").css("display", "none");
        $("#loaderouterid").css("display", "none");
      },
    });
  }
  exportAsPDFnewCustomer() {
    $("#loaderouterid").css("display", "block");
    console.log("this.signaturePad.toDataURL()");

    $("#customerWithBrokerpdf").attr("src", this.signaturePad.toDataURL());
    $("#customerNoBrokerpdf").attr("src", this.signaturePad.toDataURL());
    console.log(this.signaturePad.toDataURL());
    $("#bodydivCustomer").css("display", "block");

    this.exportAsPDFCustomer();
  }

  exportAsPDFCustomer() {
    let that = this;
    $("#loaderouterid").css("display", "block");

    let pdf: any = new jsPDF("portrait", "pt", "a4");

    var width = pdf.internal.pageSize.width;
    pdf.html(document.getElementById("MyDIvCustomer"), {
      html2canvas: {
        width: width,
      },
      callback: function (pdf: any) {
        pdf.save("Maklervollmacht.pdf");
        $("#loaderouterid").css("display", "none");
        $("#bodydivCustomer").css("display", "none");
        $("#loaderouterid").css("display", "none");
      },
    });
  }
  calculateAge(event: any) {
    console.log("saveFamilyMember" + this.familyFormGroup.value.dob);
    var timeDiff = Math.abs(Date.now() - this.familyFormGroup.value.dob);
    //Used Math.floor instead of Math.ceil
    //so 26 years and 140 days would be considered as 26, not 27.
    this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
    console.log("saveFamilyMember" + this.age);
  }
  resetOfficeForm() {
    this.officeForm.resetForm();

    this.officeFormGroup.patchValue({
      phone_number: "+49",
    });
    this.officeaddressFormGroup.patchValue({
      street: this.localData.strassa,
      streetNumber: this.localData.strno,
      postCode: this.localData.plz,
      city: this.localData.city,
      additionalReference: this.localData.additionalReference,
      countryOfResidence: this.localData.current_country,
    });
  }

  savecompanyId(companydata: any) {
    if (companydata == "user") {
      console.log("savecompanyId" + companydata);
      this.customerCompanyId = companydata;
      console.log("savecompanyId" + this.customerCompanyId);
    } else {
      console.log("savecompanyId" + JSON.stringify(this.branchlist));
      console.log("savecompanyId" + JSON.stringify(companydata));
      this.customerCompanyId = companydata._id;
      console.log("savecompanyId" + this.customerCompanyId);
    }
    console.log("savecompanyId" + this.setindex);
    this.setindex = 99999;
    console.log("savecompanyId" + this.setindex);
  }
  tabisclicked(event: any) {
    this.header_title = "Firma";
    this.header_companyname = event.companyname;
    this.header_firstname = "";
    this.header_lastname = "";

    this.officeData = [];
    console.log("tabisclicked" + JSON.stringify(event));
    this.userService
      .getCompanyOffices(event._id)
      .pipe(first())
      .subscribe((officeData: any) => {
        this.officeData = officeData;
        setTimeout(() => {
          if (this.officeData.length > 0) {
            console.log("querySelector1" + this.officeData.length);
            for (let i = 0; i < this.officeData.length; i++) {
              console.log("querySelector1" + this.officeData.length + i);
              const input: any = document.querySelector("#phonenoOffice" + i);
              console.log("querySelector1" + input);
              if (input)
                intlTelInput(input, {
                  initialCountry: "de",
                  geoIpLookup: function (callback) {
                    $.get("http://ipinfo.io", function () { }, "jsonp").always(
                      function (resp: any) {
                        var countryCode =
                          resp && resp.country ? resp.country : "de";
                        callback(countryCode);
                        console.log("querySelector1countryCode" + countryCode);
                      }
                    );
                  },
                });
            };
          };
        }, 100);
        console.log("officeData" + JSON.stringify(officeData));
      });
  }
  mactive(event: any) {
    console.log("mactive" + JSON.stringify(event));
  }
  async saveCompanyOffice() {
    this.setindex = 9999;
    this.enablebutton = false;
    $("#loaderouterid").css("display", "block");
    console.log("saveCompanyOffice");
    let documentdata: any = "";
    if (this.filearray.length > 0) {
      console.log("_handleImageUploaddoc" + this.filearray.length);
      console.log("_handleImageUploaddoc" + JSON.stringify(this.filearray));

      documentdata = await this._handleImageUploaddoc();
      // documentdata = '';
      console.log("_handleImageUploaddoc" + documentdata);
    } else {
      documentdata = "";
    }
    let data = {
      _id: this.id,
      propertyarea: this.officeFormGroup.value.propertyarea,
      propertytype: this.officeFormGroup.value.propertytype,
      numberofemployees: this.officeFormGroup.value.numberofemployees,
      phone_number: this.officeFormGroup.value.phone_number,
      company_id: this.customerCompanyId,
      strassa: this.officeaddressFormGroup.value.street,
      strno: this.officeaddressFormGroup.value.streetNumber,
      additionalReference:
        this.officeaddressFormGroup.value.additionalReference,
      plz: this.officeaddressFormGroup.value.postCode,
      city: this.officeaddressFormGroup.value.city,
      current_country: this.officeaddressFormGroup.value.countryOfResidence,
      officename: this.officeFormGroup.value.officename,
      customerid: this.customerid,
      rentorowner: this.officeFormGroup.value.rentorowner,
      // operatingmode: this.branchTypeControl.value,
      operatingmode: this.branchList.toString(),
      documentdata: documentdata,
    };
    console.log("saveCompanyOffice" + JSON.stringify(data));

    this.userService.addCustomerOffice(data).subscribe(
      async (success: any) => {
        this.setindex = 999;
        this.enablebutton = true;
        $("#loaderouterid").css("display", "none");
        if (success.status == 200) {
          console.log("saveCompanyOffice" + success.status);

          Swal.fire({
            position: "center",
            allowOutsideClick: false,
            title: "Ihre Daten wurden erfolgreich gespeichert.",
            iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
            confirmButtonText: "Ok",
            confirmButtonColor: '#02a9ed',
            customClass: {
              icon: 'no-border'
            },
          })
            .then((result) => {
              console.log(result);
              if (result["isDismissed"]) {
                console.log("iffffff");
              } else {
                console.log("elsesssssssss");

                $("#closeModalOffice").trigger("click");
                this.setindex = 9999;
                this.officeForm.resetForm();

                this.officeFormGroup.patchValue({
                  phone_number: "+49",

                  street: this.localData.strassa,
                  streetNumber: this.localData.strno,
                  postCode: this.localData.plz,
                  city: this.localData.city,
                  additionalReference: this.localData.additionalReference,
                  countryOfResidence: this.localData.current_country,
                });

                this.userService
                  .getCompanyOffices(this.customerCompanyId)
                  .pipe(first())
                  .subscribe((officeData: any) => {
                    this.officeData = officeData;
                    setTimeout(() => {
                      if (this.officeData.length > 0) {
                        console.log("querySelector1" + this.officeData.length);
                        for (let i = 0; i < this.officeData.length; i++) {
                          console.log(
                            "querySelector1" + this.officeData.length + i
                          );
                          const input: any = document.querySelector(
                            "#phonenoOffice" + i
                          );
                          console.log("querySelector1" + input);
                          if (input)
                            intlTelInput(input, {
                              initialCountry: "de",
                              geoIpLookup: function (callback) {
                                $.get(
                                  "http://ipinfo.io",
                                  function () { },
                                  "jsonp"
                                ).always(function (resp: any) {
                                  var countryCode =
                                    resp && resp.country ? resp.country : "de";
                                  callback(countryCode);
                                  console.log(
                                    "querySelector1countryCode" + countryCode
                                  );
                                });
                              },
                            });
                        };
                      };
                    }, 100);
                    console.log("officeData" + JSON.stringify(officeData));
                  });
              }
            })
            .catch((err) => { });
        } else {
          console.log("saveCompanyOffice" + success.status);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Fill All Details!!",
          });
        }
      },
      (rejected) => {
        this.setindex = 9999;
        this.enablebutton = true;
        $("#loaderouterid").css("display", "none");
        console.log(rejected);
      }
    );
    this.enablebutton = true;
    this.setindex = 9999;
  }
  async saveUserCompanyOffice() {
    this.setindex = 9999;
    this.enablebutton = false;
    $("#loaderouterid").css("display", "block");
    console.log("saveUserCompanyOffice");
    let documentdata: any = "";
    if (this.filearray.length > 0) {
      console.log("_handleImageUploaddoc" + this.filearray.length);
      console.log("_handleImageUploaddoc" + JSON.stringify(this.filearray));

      documentdata = await this._handleImageUploaddoc();
      // documentdata = '';
      console.log("_handleImageUploaddoc" + documentdata);
    } else {
      documentdata = "";
    }
    let data = {
      _id: this.id,
      propertyarea: this.officeFormGroup.value.propertyarea,
      propertytype: this.officeFormGroup.value.propertytype,
      numberofemployees: this.officeFormGroup.value.numberofemployees,
      phone_number: this.officeFormGroup.value.phone_number,

      strassa: this.officeaddressFormGroup.value.street,
      strno: this.officeaddressFormGroup.value.streetNumber,
      additionalReference:
        this.officeaddressFormGroup.value.additionalReference,
      plz: this.officeaddressFormGroup.value.postCode,
      city: this.officeaddressFormGroup.value.city,
      current_country: this.officeaddressFormGroup.value.countryOfResidence,
      officename: this.officeFormGroup.value.officename,
      customerid: this.customerid,
      rentorowner: this.officeFormGroup.value.rentorowner,
      // operatingmode: this.branchTypeControl.value,
      operatingmode: this.branchList.toString(),
      documentdata: documentdata,
    };
    console.log("saveUserCompanyOffice" + JSON.stringify(data));

    this.userService.addUserOffice(data).subscribe(
      async (success: any) => {
        this.setindex = 999;
        this.enablebutton = true;
        $("#loaderouterid").css("display", "none");
        if (success.status == 200) {
          console.log("saveUserCompanyOffice" + success.status);

          Swal.fire({
            position: "center",
            allowOutsideClick: false,
            title: "Ihre Daten wurden erfolgreich gespeichert.",
            iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
            confirmButtonText: "Ok",
            confirmButtonColor: '#02a9ed',
            customClass: {
              icon: 'no-border'
            },
          })
            .then((result) => {
              console.log(result);
              if (result["isDismissed"]) {
                console.log("iffffff");
              } else {
                console.log("elsesssssssss");

                $("#closeModalOffice").trigger("click");
                this.setindex = 9999;
                this.officeForm.resetForm();

                this.officeFormGroup.patchValue({
                  phone_number: "+49",

                  street: this.localData.strassa,
                  streetNumber: this.localData.strno,
                  postCode: this.localData.plz,
                  city: this.localData.city,
                  additionalReference: this.localData.additionalReference,
                  countryOfResidence: this.localData.current_country,
                });

                this.userService
                  .getUserCompanyOffices(this.customerid)
                  .pipe(first())
                  .subscribe((userofficeData: any) => {
                    this.userofficeData = userofficeData;
                    setTimeout(() => {
                      if (this.userofficeData.length > 0) {
                        console.log(
                          "querySelector1" + this.userofficeData.length
                        );
                        for (let i = 0; i < this.userofficeData.length; i++) {
                          console.log(
                            "querySelector1" + this.userofficeData.length + i
                          );
                          const input: any = document.querySelector(
                            "#userphonenoOffice" + i
                          );
                          console.log("querySelector1" + input);
                          if (input)
                            intlTelInput(input, {
                              initialCountry: "de",
                              geoIpLookup: function (callback) {
                                $.get(
                                  "http://ipinfo.io",
                                  function () { },
                                  "jsonp"
                                ).always(function (resp: any) {
                                  var countryCode =
                                    resp && resp.country ? resp.country : "de";
                                  callback(countryCode);
                                  console.log(
                                    "querySelector1countryCode" + countryCode
                                  );
                                });
                              },
                            });
                        };
                      };
                    }, 100);
                    console.log(
                      "userofficeData" + JSON.stringify(userofficeData)
                    );
                  });
              }
            })
            .catch((err) => { });
        } else {
          console.log("saveUserCompanyOffice" + success.status);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Fill All Details!!",
          });
        }
      },
      (rejected) => {
        this.setindex = 9999;
        this.enablebutton = true;
        $("#loaderouterid").css("display", "none");
        console.log(rejected);
      }
    );
    this.enablebutton = true;
    this.setindex = 9999;
  }
  bindValues(member: any) {
    console.log("bindvalues" + JSON.stringify(member));
    console.log("bindValues" + member.dateofbirth);
    var timestamp = new Date(member.dateofbirth).getTime();
    console.log("bindValues" + timestamp);
    var timeDiff = Math.abs(Date.now() - timestamp);

    this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
    console.log("bindValues" + this.age);

    this.currentMemberId = member._id;
    console.log("bindValues" + this.currentMemberId);
    let address =
      member.strassa +
      "  " +
      member.strno +
      "" +
      member.plz +
      " " +
      member.city;
    $("#memberdetails1").html(address);
    $("#memberdetails2").html(address);
    $("#membername1").html(member.firstname + " " + member.lastname);
    $("#membername2").html(member.firstname + " " + member.lastname);
    $("#membername3").html(member.firstname + " " + member.lastname);
    $("#membername4").html(member.firstname + " " + member.lastname);
    $("#membername5").html(member.firstname + " " + member.lastname);

    $("#membername6").html(member.firstname + " " + member.lastname);
    $("#memberdetails1pdf").html(address);
    $("#memberdetails2pdf").html(address);
    $("#membername1pdf").html(member.firstname + " " + member.lastname);
    $("#membername2pdf").html(member.firstname + " " + member.lastname);
    $("#membername3pdf").html(member.firstname + " " + member.lastname);
    $("#membername4pdf").html(member.firstname + " " + member.lastname);
    $("#membername5pdf").html(member.firstname + " " + member.lastname);

    $("#membername6pdf").html(member.firstname + " " + member.lastname);
  }
  async saveFamilyMemberPOA() {
    console.log("saveFamilyMemberPOA");
    console.log("saveFamilyMemberPOA" + this.currentMemberId);
    let documentdata = await this._handleImageUploadesign();
    console.log("saveFamilyMemberPOA" + JSON.stringify(documentdata));

    let data = {
      memberId: this.currentMemberId,
      documentdata: documentdata,
    };
    this.userService.updateFamilyMember(data).subscribe(
      (data: any) => {
        console.log("saveFamilyMemberPOA" + JSON.stringify(data));

        if (data.status == "200") {
          $("#loaderouterid").css("display", "none");

          console.log("saveFamilyMemberPOA");
          Swal.fire({
            position: "center",
            allowOutsideClick: false,
            title: "Ihre Daten wurden erfolgreich gespeichert.",
            iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
            confirmButtonText: "Ok",
            confirmButtonColor: '#02a9ed',
            customClass: {
              icon: 'no-border'
            },
          })
            .then((result) => {
              console.log(result);
              if (result["isDismissed"]) {
                console.log("iffffff");
              } else {
                console.log("elsesssssssss");
                this.clear();
                $("#closeModalesign").trigger("click");

                this.userService
                  .getfamilyMembers(this.customerid)
                  .pipe(first())
                  .subscribe((familydata: any) => {
                    this.familyData = familydata;
                    setTimeout(() => {
                      if (this.familyData.length > 0) {
                        console.log("querySelector1" + this.familyData.length);
                        for (let i = 0; i < this.familyData.length; i++) {
                          console.log(
                            "querySelector1" + this.familyData.length + i
                          );
                          const input: any = document.querySelector(
                            "#phoneno" + i
                          );
                          console.log("querySelector1" + input);
                          if (input)
                            intlTelInput(input, {
                              initialCountry: "de",
                              geoIpLookup: function (callback) {
                                $.get(
                                  "http://ipinfo.io",
                                  function () { },
                                  "jsonp"
                                ).always(function (resp: any) {
                                  var countryCode =
                                    resp && resp.country ? resp.country : "de";
                                  callback(countryCode);
                                  console.log(
                                    "querySelector1countryCode" + countryCode
                                  );
                                });
                              },
                            });
                        };
                      };
                    }, 100);
                    console.log("familydata" + JSON.stringify(familydata));
                  });
              }
            })
            .catch((err) => { });
        } else {
          console.log("saveFamilyMemberPOA");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Fill All Details!!",
          });
        }
      },
      (error) => {
        console.log("POST Request is   error ", error);

        // console.log("Error", error['error']);
      }
    );
  }

  setKeyval(data: any) {
    console.log("setKeyval" + data);
    if (data == "") {
      // this.companytypenew='';
      // $("#loaderouterid").css("display", "block");
      this.reloadCurrentRoute();
      // $("#loaderouterid").css("display", "none");

      // setTimeout(() => {
      //   this.familyOrCompany=data;
      // }, 100);
    } else {
      this.familyOrCompany = data;

      setTimeout(() => {
        $("#movetonextstep").trigger("click");
      }, 100);
      setTimeout(() => {
        const input: any = document.querySelector("#phone_numbercustomer");
        console.log("querySelector" + input);
        if (input)
          intlTelInput(input, {
            initialCountry: "de",
            geoIpLookup: function (callback) {
              $.get("http://ipinfo.io", function () { }, "jsonp").always(function (
                resp: any
              ) {
                var countryCode = resp && resp.country ? resp.country : "de";
                callback(countryCode);
                console.log("countryCode" + countryCode);
              });
            },
          });
      }, 100);
    };
  }
  async saveFamilyMember() {
    this.enablebutton = false;
    $("#loaderouterid").css("display", "block");

    console.log("saveFamilyMember" + this.familyFormGroup.value.dob);
    var timeDiff = Math.abs(Date.now() - this.familyFormGroup.value.dob);

    this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
    console.log("saveFamilyMember" + this.age);
    let lastname: any = "";
    let relationship: any = "";
    if (
      this.localData.companytype == " " ||
      this.localData.companytype == "" ||
      this.localData.companytype == null
    ) {
      relationship = this.familyRelation.value;
    } else {
      if (this.familyData.length > 0) {
        relationship = this.familyRelation.value;
      } else {
        relationship = "mainmember";
      }
    }

    if (this.localData.title == "Firma") {
      lastname = this.localData.companyname;
    } else {
      lastname = this.localData.lastname;
    }

    if (this.currentActiveRole == "customer") {
      let documentdata = await this._handleImageUpload();

      console.log("apidocument" + JSON.stringify(documentdata));

      if (documentdata) {
        let data = {
          _id: this.id,
          email: this.localData.email,
          customer_title: this.localData.title,
          customer_lastname: this.localData.lastname,
          customer_nameused: lastname,
          documentdata: documentdata,
          title: this.familyFormGroup.value.title,
          firstname: this.familyFormGroup.value.firstname,
          phoneno: this.familyFormGroup.value.phone_number,
          personal_email: this.familyFormGroup.value.email,
          lastname: this.familyFormGroup.value.lastname,
          dateofbirth: this.familyFormGroup.value.dob,
          strassa: this.familyFormGroup.value.street,
          strno: this.familyFormGroup.value.streetNumber,
          additionalReference: this.familyFormGroup.value.additionalReference,
          plz: this.familyFormGroup.value.postCode,
          city: this.familyFormGroup.value.city,
          current_country: this.familyFormGroup.value.countryOfResidence,
          martialstatus: this.martialStatusControl.value,
          relationship: relationship,
          customerid: this.customerid,
        };

        console.log("saveFamilyMember" + JSON.stringify(data));

        // this.exportAsPDFnew();
        this.userService.addfamilymember(data).subscribe(
          async (success: any) => {
            // if success and error give response
            if (success.status == 200) {
              $("#loaderouterid").css("display", "none");

              console.log("saveFamilyMember" + success.status);

              Swal.fire({
                position: "center",
                allowOutsideClick: false,
                title: "Ihre Daten wurden erfolgreich gespeichert.",
                html: `<div>
                      <a id="buttonOne" style="color:#184297;" class="btn"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>  Maklervollmacht
                      <i class="fa fa-download" aria-hidden="true"></i> </a>

                     </div>`,
                iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
                confirmButtonText: "Ok",
                confirmButtonColor: '#02a9ed',
                customClass: {
                  icon: 'no-border'
                },
              })
                .then((result) => {
                  console.log(result);
                  if (result["isDismissed"]) {
                    console.log("iffffff");
                  } else {
                    console.log("elsesssssssss");
                    this.clear();
                    $("#closeModalCompanyCustomer").trigger("click");
                    this.familyOrCompany = "";
                    $("#closeModal").trigger("click");
                    this.enablebutton = true;
                    $("#resetStepper").trigger("click");
                    this.familyForm.resetForm();

                    this.familyRelation.setValue("");
                    this.martialStatusControl.setValue("");

                    this.familyFormGroup.patchValue({
                      phone_number: "+49",

                      street: this.localData.strassa,
                      streetNumber: this.localData.strno,
                      postCode: this.localData.plz,
                      city: this.localData.city,
                      additionalReference: this.localData.additionalReference,
                      countryOfResidence: this.localData.current_country,
                    });

                    this.userService
                      .getfamilyMembers(this.customerid)
                      .pipe(first())
                      .subscribe((familydata: any) => {
                        this.familyData = familydata;
                        setTimeout(() => {
                          if (this.familyData.length > 0) {
                            console.log(
                              "querySelector1" + this.familyData.length
                            );
                            for (let i = 0; i < this.familyData.length; i++) {
                              console.log(
                                "querySelector1" + this.familyData.length + i
                              );
                              const input: any = document.querySelector(
                                "#phoneno" + i
                              );
                              console.log("querySelector1" + input);
                              if (input)
                                intlTelInput(input, {
                                  initialCountry: "de",
                                  geoIpLookup: function (callback) {
                                    $.get(
                                      "http://ipinfo.io",
                                      function () { },
                                      "jsonp"
                                    ).always(function (resp: any) {
                                      var countryCode =
                                        resp && resp.country
                                          ? resp.country
                                          : "de";
                                      callback(countryCode);
                                      console.log(
                                        "querySelector1countryCode" + countryCode
                                      );
                                    });
                                  },
                                });
                            };
                          };
                        }, 100);
                        console.log("familydata" + JSON.stringify(familydata));
                      });
                  }
                })
                .catch((err) => { });
              const ButtonOne: any = document.getElementById("buttonOne");
              ButtonOne.addEventListener(
                "click",
                function () {
                  removepreview("one");
                },
                false
              );
              const removepreview = (e: any) => {
                if (e == "one") {
                  this.exportAsPDFnew();
                }
              };
            } else {
              this.enablebutton = true;
              console.log("saveFamilyMember" + success.status);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Fill All Details!!",
              });
            }
          },
          (rejected) => {
            this.enablebutton = true;
            console.log(rejected);
          }
        );
      }
    } else {
      let data = {
        _id: this.id,
        email: this.localData.email,
        customer_title: this.localData.title,
        customer_lastname: this.localData.lastname,
        customer_nameused: lastname,
        documentdata: "",
        title: this.familyFormGroup.value.title,
        personal_email: this.familyFormGroup.value.email,
        firstname: this.familyFormGroup.value.firstname,
        phoneno: this.familyFormGroup.value.phone_number,
        lastname: this.familyFormGroup.value.lastname,
        dateofbirth: this.familyFormGroup.value.dob,
        strassa: this.familyFormGroup.value.street,
        strno: this.familyFormGroup.value.streetNumber,
        additionalReference: this.familyFormGroup.value.additionalReference,
        plz: this.familyFormGroup.value.postCode,
        city: this.familyFormGroup.value.city,
        current_country: this.familyFormGroup.value.countryOfResidence,
        martialstatus: this.martialStatusControl.value,
        relationship: relationship,
        customerid: this.customerid,
      };

      console.log("saveFamilyMember" + JSON.stringify(data));

      // this.exportAsPDFnew();
      this.userService.addfamilymember(data).subscribe(
        async (success: any) => {
          // if success and error give response
          if (success.status == 200) {
            $("#loaderouterid").css("display", "none");

            console.log("saveFamilyMember" + success.status);
            Swal.fire({
              position: "center",
              allowOutsideClick: false,
              title: "Ihre Daten wurden erfolgreich gespeichert.",
              iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
              confirmButtonText: "Ok",
              confirmButtonColor: '#02a9ed',
              customClass: {
                icon: 'no-border'
              },
            })
              .then((result) => {
                console.log(result);
                if (result["isDismissed"]) {
                  console.log("iffffff");
                } else {
                  console.log("elsesssssssss");
                  this.clear();
                  $("#closeModalCompanyCustomer").trigger("click");
                  this.familyOrCompany = "";
                  $("#closeModal").trigger("click");
                  this.enablebutton = true;
                  $("#resetStepper").trigger("click");
                  this.familyForm.resetForm();

                  this.familyRelation.setValue("");
                  this.martialStatusControl.setValue("");

                  this.familyFormGroup.patchValue({
                    phone_number: "+49",

                    street: this.localData.strassa,
                    streetNumber: this.localData.strno,
                    postCode: this.localData.plz,
                    city: this.localData.city,
                    additionalReference: this.localData.additionalReference,
                    countryOfResidence: this.localData.current_country,
                  });

                  this.userService
                    .getfamilyMembers(this.customerid)
                    .pipe(first())
                    .subscribe((familydata: any) => {
                      this.familyData = familydata;
                      setTimeout(() => {
                        if (this.familyData.length > 0) {
                          console.log(
                            "querySelector1" + this.familyData.length
                          );
                          for (let i = 0; i < this.familyData.length; i++) {
                            console.log(
                              "querySelector1" + this.familyData.length + i
                            );
                            const input: any = document.querySelector(
                              "#phoneno" + i
                            );
                            console.log("querySelector1" + input);
                            if (input)
                              intlTelInput(input, {
                                initialCountry: "de",
                                geoIpLookup: function (callback) {
                                  $.get(
                                    "http://ipinfo.io",
                                    function () { },
                                    "jsonp"
                                  ).always(function (resp: any) {
                                    var countryCode =
                                      resp && resp.country ? resp.country : "de";
                                    callback(countryCode);
                                    console.log(
                                      "querySelector1countryCode" + countryCode
                                    );
                                  });
                                },
                              });
                          };
                        };
                      }, 100);
                      console.log("familydata" + JSON.stringify(familydata));
                    });
                }
              })
              .catch((err) => {
                console.log('Error', err);
              });
          } else {
            $("#loaderouterid").css("display", "none");
            console.log("saveFamilyMember" + success.status);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please Fill All Details!!",
            });
          }
        },
        (rejected) => {
          console.log(rejected);
        }
      );
    }
  }
  resetFirstStep() {
    this.addressFormNew.resetForm();
    this.ThirdTypeDoc.setValue("");

    this.companytypenew = "";
    this.addressFormGroupnew.patchValue({
      street: this.localData.strassa,
      streetNumber: this.localData.strno,
      postCode: this.localData.plz,
      city: this.localData.city,
      additionalReference: this.localData.additionalReference,
      countryOfResidence: this.localData.current_country,
    });
  }
  resetSecondStep() {
    this.personaladdressFormNew.resetForm();

    this.livingaddressFormGroup.patchValue({
      title: this.title,
      firstname: this.localData.firstname,
      lastname: this.localData.lastname,
      email: this.localData.email,
    });
  }
  resetThirdStep() {
    console.log("length" + this.legalrepresentativeform().length);
    console.log("length1" + this.legalrepresentativeform1().length);
    console.log("length2" + this.legalrepresentativeform2().length);
    for (let i = this.legalrepresentativeform().length; i >= 0; i--) {
      this.removelegalrepresentativeform(i);
    }
    for (let i = this.legalrepresentativeform1().length; i >= 0; i--) {
      this.removelegalrepresentativeform1(i);
    }
    for (let i = this.legalrepresentativeform2().length; i >= 0; i--) {
      this.removelegalrepresentativeform2(i);
    }
    this.addedpersons = [];
    this.addedpersonsFirst = [];
    this.addedpersonsSecond = [];
    this.legalrepresentativeform().push(this.newlegalrepresentativeform());

    let taskListArrays = this.secondcompanyaddressFormGroup.get(
      "legalrepresentativeform"
    ) as FormArray;
    taskListArrays.controls[0].patchValue({
      firstname: this.localData.firstname,
      lastname: this.localData.lastname,
      title: this.title,
    });
    this.sharesvalue = 100;
    console.log("length" + this.legalrepresentativeform().length);
    console.log("length1" + this.legalrepresentativeform1().length);
    console.log("length2" + this.legalrepresentativeform2().length);
  }
  resetFourthStep() {
    this.docgroup.resetForm();
  }

  setPagetype(page: number, data: any) {
    console.log("sadsadsad" + JSON.stringify(this.type1));
    // get pager object from service
    //this.getdivoutside();
    if (data == "type1") {
      console.log("sadsadsad" + JSON.stringify(this.type1));

      this.pagertype[0].type1 = this.pagerService.getPager(
        this.type1?.length,
        page
      );
      console.log("sadsadsad" + this.pagertype[0].type1);
      // get current page of items
      this.pagedItemstype[0].type1 = this.type1.slice(
        this.pagertype[0].type1.startIndex,
        this.pagertype[0].type1.endIndex + 1
      );
      console.log("sadsadsad" + JSON.stringify(this.pagedItemstype[0].type1));
      if (this.type1.length > 0) {
        this.startRecordtype[0].type1 =
          this.pagertype[0].type1.currentPage *
          this.pagerService.getDefaultPageSize() -
          this.pagerService.getDefaultPageSize() +
          1;
        this.endRecordtype[0].type1 =
          this.pagertype[0].type1.currentPage *
            this.pagerService.getDefaultPageSize() >
            this.type1.length
            ? this.type1.length
            : this.pagertype[0].type1.currentPage *
            this.pagerService.getDefaultPageSize();
      } else {
        this.startRecordtype[0].type1 = 0;
        this.endRecordtype[0].type1 = 0;
      }
    }
    if (data == "type2") {
      console.log("sadsadsad" + JSON.stringify(this.type2));

      this.pagertype[0].type2 = this.pagerService.getPager(
        this.type2.length,
        page
      );
      console.log("sadsadsad" + this.pagertype[0].type2);
      // get current page of items
      console.log(
        "sadsadsadneelam" + JSON.stringify(this.pagedItemstype[0].type2)
      );
      console.log("sadsadsadneelam" + JSON.stringify(this.type2));
      console.log("sadsadsadneelam" + this.pagertype[0].type2.startIndex);
      console.log("sadsadsadneelam" + this.pagertype[0].type2.endIndex);
      this.pagedItemstype[0].type2 = this.type2.slice(
        this.pagertype[0].type2.startIndex,
        this.pagertype[0].type2.endIndex + 1
      );
      console.log(
        "sadsadsadneelam" + JSON.stringify(this.pagedItemstype[0].type2)
      );
      if (this.type2.length > 0) {
        this.startRecordtype[0].type2 =
          this.pagertype[0].type2.currentPage *
          this.pagerService.getDefaultPageSize() -
          this.pagerService.getDefaultPageSize() +
          1;
        this.endRecordtype[0].type2 =
          this.pagertype[0].type2.currentPage *
            this.pagerService.getDefaultPageSize() >
            this.type2.length
            ? this.type2.length
            : this.pagertype[0].type2.currentPage *
            this.pagerService.getDefaultPageSize();
      } else {
        this.startRecordtype[0].type2 = 0;
        this.endRecordtype[0].type2 = 0;
      }
    }
    if (data == "type3") {
      console.log("sadsadsad" + JSON.stringify(this.type3));

      this.pagertype[0].type3 = this.pagerService.getPager(
        this.type3.length,
        page
      );
      console.log("sadsadsad" + this.pagertype[0].type3);
      // get current page of items
      this.pagedItemstype[0].type3 = this.type3.slice(
        this.pagertype[0].type3.startIndex,
        this.pagertype[0].type3.endIndex + 1
      );
      console.log("sadsadsad" + JSON.stringify(this.pagedItemstype[0].type3));
      if (this.type3.length > 0) {
        this.startRecordtype[0].type3 =
          this.pagertype[0].type3.currentPage *
          this.pagerService.getDefaultPageSize() -
          this.pagerService.getDefaultPageSize() +
          1;
        this.endRecordtype[0].type3 =
          this.pagertype[0].type3.currentPage *
            this.pagerService.getDefaultPageSize() >
            this.type3.length
            ? this.type3.length
            : this.pagertype[0].type3.currentPage *
            this.pagerService.getDefaultPageSize();
      } else {
        this.startRecordtype[0].type3 = 0;
        this.endRecordtype[0].type3 = 0;
      }
    }
  }
  saveCustomerCompany() {
    this.enablebutton = false;
    let data = {};
    $("#loaderouterid").css("display", "block");
    console.log("saveCustomerCompany");
    if (
      this.companytypenew == "Einzelunternehmen" ||
      this.companytypenew == "Eingetragener Kaufmann (e.K.)"
    ) {
      data = {
        _id: this.id,
        customerid: this.customerid,

        customer_title: this.localData.title,
        customer_lastname: this.localData.lastname,

        roles: ["b2b"],

        // Personal Information
        title: this.livingaddressFormGroup.value.title,

        firstname: this.livingaddressFormGroup.value.firstname,
        lastname: this.livingaddressFormGroup.value.lastname,
        // companyname: this.customerFormGroup.value.companyName,

        email: this.localData.email,

        // Address Information
        companyname: this.addressFormGroupnew.value.companyname,
        companytype: this.companytypenew,
        strassa: this.addressFormGroupnew.value.street,
        strno: this.addressFormGroupnew.value.streetNumber,
        additionalReference: this.addressFormGroupnew.value.additionalReference,
        plz: this.addressFormGroupnew.value.postCode,
        city: this.addressFormGroupnew.value.city,
        current_country: this.addressFormGroupnew.value.countryOfResidence,
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

        type1: { legalrepresentativeform: [] },
        type2: this.secondcompanyaddressFormGroup1.value,
        type3: { legalrepresentativeform2: [] },
      };
    } else {
      data = {
        _id: this.id,
        customerid: this.customerid,

        customer_title: this.localData.title,
        customer_lastname: this.localData.lastname,

        // Personal Information
        title:
          this.secondcompanyaddressFormGroup.controls["legalrepresentativeform"]
            .value[0].title,

        firstname:
          this.secondcompanyaddressFormGroup.controls["legalrepresentativeform"]
            .value[0].firstname,
        lastname:
          this.secondcompanyaddressFormGroup.controls["legalrepresentativeform"]
            .value[0].lastname,
        // companyname: this.customerFormGroup.value.companyName,

        email: this.localData.email,

        // Address Information
        companyname: this.addressFormGroupnew.value.companyname,
        companytype: this.companytypenew,
        strassa: this.addressFormGroupnew.value.street,
        strno: this.addressFormGroupnew.value.streetNumber,
        additionalReference: this.addressFormGroupnew.value.additionalReference,
        plz: this.addressFormGroupnew.value.postCode,
        city: this.addressFormGroupnew.value.city,
        current_country: this.addressFormGroupnew.value.countryOfResidence,
        strassaliving: " ",
        strnoliving: " ",
        additionalReferenceliving: " ",
        plzliving: " ",
        cityliving: " ",
        current_countryliving: " ",

        dateofbirth: this.livingaddressFormGroup.value.dob,
        birth_place: this.livingaddressFormGroup.value.birthPlace,

        type1: this.secondcompanyaddressFormGroup.value,
        type2: this.secondcompanyaddressFormGroup1.value,
        type3: this.secondcompanyaddressFormGroup2.value,
      };
    }

    console.log("saveCustomerCompany" + JSON.stringify(data));
    $("#loaderouterid").css("display", "block");
    this.userService.addCustomerCompany(data).subscribe(
      (success: any) => {
        // if success and error give response
        if (success.status == 200) {
          $("#loaderouterid").css("display", "none");
          console.log("saveCustomerCompany" + success.status);

          console.log("see result");
          console.log(success.result._id);

          this.created_company_customer_id = success.result._id;

          this.handleimageuploadcompanycustomer();
        } else {
          console.log("saveCustomerCompany" + success.status);
          this.enablebutton = true;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Fill All Details!!",
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate(["cefima/kunde-home"], {
        queryParams: {
          id: this.customerid,
          tabname: 1,
        },
      });
    });
  }
  MetaDataLooping() {
    for (let i = 0; i < this.documents.length; i++) {
      console.log("forloop");
      let date_of_uploadnew = this.documents[i].element.createdAt;
      let metadata = this.documents[i].element.tags[0].split(",");
      var d = new Date(date_of_uploadnew).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      var date_of_upload = d.replace(/[/]/g, ".");

      if (typeof metadata[2] != "undefined") {
        let dateofdocument = Number(metadata[2]);
        var date = new Date(dateofdocument).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        var date_of_document = date.replace(/[/]/g, ".");
      } else {
        var date_of_document = "";
      }
      var filetype = "";
      if (typeof metadata[1] != "undefined") {
        filetype = metadata[1];
      } else {
        filetype = "";
      }
      this.documents[i].size =
        metadata[0] > 1024 ? metadata[0].charAt(0) + "MB" : metadata[0] + "KB";
      this.documents[i].filetype = filetype;
      this.documents[i].date_of_document = date_of_document;
      this.documents[i].date_of_upload = date_of_upload;
    }
  }

  MetaDataLoopingDocList() {
    for (let i = 0; i < this.customerDocList.length; i++) {
      console.log("forloop");
      let SOC = this.customerDocList[i].element.Start_of_contract;
      let ContributionDate = this.customerDocList[i].element.Contribution;
      console.log("SOC" + SOC);
      console.log("ContributionDate" + ContributionDate);
      let metadata = this.customerDocList[i].element.tags[0].split(",");
      var d1 = new Date(SOC);
      var d2 = new Date(ContributionDate);
      var Start_of_contract =
        d1.getDate() + "." + (d1.getMonth() + 1) + "." + d1.getFullYear();
      var Contribution =
        d2.getDate() + "." + (d2.getMonth() + 1) + "." + d2.getFullYear();

      if (typeof metadata[2] != "undefined") {
        let dateofdocument = Number(metadata[2]);
        var date = new Date(dateofdocument);

        var date_of_document =
          date.getDate() +
          "." +
          (date.getMonth() + 1) +
          "." +
          date.getFullYear();
      } else {
        var date_of_document = "";
      }
      var filetype = "";
      if (typeof metadata[1] != "undefined") {
        filetype = metadata[1];
      } else {
        filetype = "";
      }
      this.customerDocList[i].size = metadata[0];
      this.customerDocList[i].filetype = filetype;
      this.customerDocList[i].Start_of_contract = Start_of_contract;
      this.customerDocList[i].Contribution = Contribution;
    }
  }
  clear() {
    this.drawingnew = 0;
    this.signaturePad.clear();
    this.currentSignature = "";
    $("#imageidnew").attr("src", "");
    $("#imageidnew1").attr("src", "");

    $("#imageidnewmodal").attr("src", "");

    $("#signature1").attr("src", "");
    $("#signature2").attr("src", "");
    // Modal

    $("#companyNoBroker").attr("src", "");
    $("#companyWithBroker").attr("src", "");
    $("#familyNoBroker").attr("src", "");
    $("#familyNoBrokeresign").attr("src", "");
    $("#familyWithBroker").attr("src", "");
    $("#familyWithBrokeresign").attr("src", "");
    $("#familyWithBrokerpdf").attr("src", "");
    $("#familyNoBrokerpdf").attr("src", "");
    $("#familyWithBrokerpdfesign").attr("src", "");
    $("#familyNoBrokerpdfesign").attr("src", "");
    $("#customerWithBrokerpdf").attr("src", "");
    $("#customerNoBrokerpdf").attr("src", "");
  }
  MetaDataLoopingDocListsecond() {
    for (let i = 0; i < this.customerDocListsecond.length; i++) {
      console.log("forloop");
      let SOC = this.customerDocListsecond[i].element.Start_of_contract;
      let ContributionDate = this.customerDocListsecond[i].element.Contribution;
      console.log("SOC" + SOC);
      console.log("ContributionDate" + ContributionDate);
      let metadata = this.customerDocListsecond[i].element.tags[0].split(",");
      var d1 = new Date(SOC);
      var d2 = new Date(ContributionDate);
      var Start_of_contract =
        d1.getDate() + "." + (d1.getMonth() + 1) + "." + d1.getFullYear();
      var Contribution =
        d2.getDate() + "." + (d2.getMonth() + 1) + "." + d2.getFullYear();

      if (typeof metadata[2] != "undefined") {
        let dateofdocument = Number(metadata[2]);
        var date = new Date(dateofdocument);

        var date_of_document =
          date.getDate() +
          "." +
          (date.getMonth() + 1) +
          "." +
          date.getFullYear();
      } else {
        var date_of_document = "";
      }
      var filetype = "";
      if (typeof metadata[1] != "undefined") {
        filetype = metadata[1];
      } else {
        filetype = "";
      }
      this.customerDocListsecond[i].size = metadata[0];
      this.customerDocListsecond[i].filetype = filetype;
      this.customerDocListsecond[i].Start_of_contract = Start_of_contract;
      this.customerDocListsecond[i].Contribution = Contribution;
    }
  }

  previethird(
    url?: any,
    tags?: any,
    imagename?: any,
    companycode?: any,
    brand?: any,
    document_name?: any,
    date_of_uploadnew?: any,
    id?: any,
    created_byname?: any,
    ticket_no?: any,
    preview_id?: any,
    click_id?: any
  ) {
    let that = this;
    this.previewid = id;
    console.log("date_of_uploadnewdate_of_uploadnew" + date_of_uploadnew);
    let element: HTMLElement = document.getElementById(
      //"click" + this.previewid
      click_id + this.previewid
    ) as HTMLElement;
    if (element.innerHTML == "Schließen") {
      element.innerHTML = "Öffnen";

      // $("#preview" + id).html("");
      $("#" + preview_id + id).html("");
    } else {
      $(".openclass").html("Öffnen");
      element.innerHTML = "Schließen";
      $(".previewclass").html("");
    }

    if (element.innerHTML == "Schließen") {
      // $("#imagediv").removeClass("col-md-12");
      // $("#imagediv").addClass("col-md-7");
      // console.log("tags" + JSON.stringify(tags));
      const removepreview = () => {
        let elementnew: HTMLElement = document.getElementById(
          //"click" + this.previewid
          click_id + this.previewid
        ) as HTMLElement;
        elementnew.innerHTML = "Öffnen";

        //$("#preview" + id).html("");
        $("#" + preview_id + id).html("");

        console.log("sadasda");
      };

      const result1 = this.getFileExtension(imagename);
      let metadata = tags[0].split(",");
      console.log("metadatametadata" + metadata[0]);
      let FileSize =
        metadata[0] > 1024 ? metadata[0].charAt(0) + "MB" : metadata[0] + "KB";
      var d = new Date(date_of_uploadnew).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      var date_of_upload = d.replace(/[/]/g, ".");
      if (typeof metadata[2] != "undefined") {
        let dateofdocument = Number(metadata[2]);
        var date = new Date(dateofdocument).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        var date_of_document = date.replace(/[/]/g, ".");
        //console.log("date_of_document" + date_of_upload);
      } else {
        //var date_of_document = "";
      }
      var filetype = "";
      if (typeof metadata[1] != "undefined") {
        filetype = metadata[1];
      } else {
        filetype = "";
      }

      let same_docs_list = "";
      let index = 1;

      for (let count = 0; count < this.customerDocListsecond.length; count++) {
        if (ticket_no == this.customerDocListsecond[count].element.ticket_no) {
          let metadata =
            this.customerDocListsecond[count].element.tags[0].split(",");

          var d = new Date(date_of_uploadnew).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          var date_of_upload = d.replace(/[/]/g, ".");

          if (typeof metadata[2] != "undefined") {
            let dateofdocument = Number(metadata[2]);
            var date = new Date(dateofdocument).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            var date_of_document = date.replace(/[/]/g, ".");
          } else {
            var date_of_document = "";
          }
          var filetype = "";
          if (typeof metadata[1] != "undefined") {
            filetype = metadata[1];
          } else {
            filetype = "";
          }

          if (index == 1) {
            same_docs_list +=
              '<div class="row document-row" id="document-row' +
              index +
              '" data-source="' +
              this.customerDocListsecond[count].element.document_url +
              '" data-file_type="' +
              filetype +
              '" data-index="' +
              index +
              '" data-doc_link="' +
              this.customerDocListsecond[count].element.document_unique_id +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11" >' +
              index +
              ". " +
              this.customerDocListsecond[count].element.document_name +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-right" id="angle-right' +
              index +
              '" style="display:none;font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-down" id="angle-down' +
              index +
              '" style="font-weight:bold;font-size:30px;margin-left: -5px;"></i>' +
              "</div>" +
              '<div class="col-md-12 documentdetails" id="documentdetails' +
              index +
              '" style="background-color: white;color:black;border: 1px solid darkgray;margin-bottom: -5px;border-radius: 0px 0px 10px 10px;padding: 20px;">' +
              "<h6>Dokumentenname: " +
              this.customerDocListsecond[count].element.document_name +
              "</h6><h6>Dateigröße: " +
              metadata[0] +
              " Kb</h6><h6>Vorgangs Nr.: " +
              ticket_no +
              "</h6><h6>Datum des Dokuments: " +
              date_of_document +
              "</h6><h6>Datum des Uploads: " +
              date_of_upload +
              "</h6><h6>Hochgeladen von: " +
              created_byname +
              "</h6><h6>Dateityp: " +
              filetype +
              "</h6><h6>Stichworte: " +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              companycode +
              "</span>" +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              brand +
              "</span>" +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          } else {
            same_docs_list +=
              '<div class="row document-row" id="document-row' +
              index +
              '" data-source="' +
              this.customerDocListsecond[count].element.document_url +
              '" data-file_type="' +
              filetype +
              '" data-index="' +
              index +
              '" data-doc_link="' +
              this.customerDocListsecond[count].element.document_unique_id +
              '" style="cursor: pointer;margin-top: 5px;background-color: #184195;color: white;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11" >' +
              index +
              ". " +
              this.customerDocListsecond[count].element.document_name +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-right" id="angle-right' +
              index +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-down" id="angle-down' +
              index +
              '" style="margin-left: -5px;display:none;font-weight:bold;font-size:30px;"></i>' +
              "</div>" +
              '<div class="col-md-12 documentdetails" id="documentdetails' +
              index +
              '" style="display:none;background-color: white;color:black;border: 1px solid darkgray;margin-bottom: -5px;border-radius: 0px 0px 10px 10px;padding: 20px;">' +
              "<h6>Dokumentenname: " +
              this.customerDocListsecond[count].element.document_name +
              "blob-" +
              index +
              "</h6><h6>Dateigröße: " +
              metadata[0] +
              " Kb</h6><h6>Vorgangs Nr.: " +
              ticket_no +
              "</h6><h6>Datum des Dokuments: " +
              date_of_document +
              "</h6><h6>Datum des Uploads: " +
              date_of_upload +
              "</h6><h6>Hochgeladen von: " +
              created_byname +
              "</h6><h6>Dateityp: " +
              filetype +
              "</h6><h6>Stichworte: " +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              companycode +
              "</span>" +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              brand +
              "</span>" +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          }

          index += 1;
        }
      }

      // $("#preview"+id).html(
      $("#" + preview_id + id).html(
        '<div style="background: #fff;padding: 33px;border-radius:10px;border:1px solid;margin-bottom: 15px;padding-bottom:8px !important;"><div class="col-md-4"  style="display: inline-block;    vertical-align: top;"><div class="line-heights">' +
        // '<div class="row" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">'+

        same_docs_list +
        //'</div>'+

        '</div><div class="col-md-12"> </div></div><div class="col-md-8" style="margin-top:-28px;display: inline-block;"><span class="side-icons"><i class="fa fa-times links" aria-hidden="true" style="margin-bottom:5px;position:relative;float:right;" aria-hidden="true"  id="previewimg" ></i></span><embed class="show-document" type="' +
        filetype +
        '" src="' +
        url +
        '" style=" width: 100%; height:1000px;object-fit: cover;"/><a id="document_link" href="' +
        environment.API_URL +
        "document/downloaddocument/" +
        imagename +
        '" ><span class="side-icons" ><i class="fa fa-download links" style="position:relative;float:right;padding-left: 8px;" aria-hidden="true"  ></i></span></a></div> </div>'
      );

      const someInput: any = document.getElementById("previewimg");
      someInput.addEventListener(
        "click",
        function () {
          removepreview();
        },
        false
      );

      $(".document-row").click(function (event: any) {
        let index = $(that).data("index");

        $(".documentdetails").css("display", "none");
        $(".fa-angle-right").css("display", "block");
        $(".fa-angle-down").css("display", "none");

        $(".document-row").css("background-color", "#184195");
        $(".document-row").css("color", "white");

        $("#documentdetails" + index).css("display", "block");
        $("#angle-right" + index).css("display", "none");
        $("#angle-down" + index).css("display", "block");

        $("#document-row" + index).css(
          "background-color",
          "rgb(181, 172, 172)"
        );
        $("#document-row" + index).css("color", "black");

        $(".show-document").attr("src", $(that).data("source"));

        $(".show-document").attr("type", $(that).data("file_type"));

        $("#document_link").attr(
          "href",
          environment.API_URL +
          "document/downloaddocument/" +
          $(that).data("doc_link")
        );

        event.stopPropagation();
        event.stopImmediatePropagation();
      });

      //   // $('#loaderouterid').css("display","none");
    }
  }

  previewSec(
    url?: any,
    tags?: any,
    imagename?: any,
    companycode?: any,
    brand?: any,
    document_name?: any,
    date_of_uploadnew?: any,
    id?: any,
    created_byname?: any,
    ticket_no?: any,
    preview_id?: any,
    click_id?: any
  ) {
    this.previewid = id;
    let that = this;
    console.log("date_of_uploadnewdate_of_uploadnew" + date_of_uploadnew);
    let element: HTMLElement = document.getElementById(
      // "click" + this.previewid
      click_id + this.previewid
    ) as HTMLElement;
    if (element.innerHTML == "Schließen") {
      element.innerHTML = "Öffnen";

      // $("#preview" + id).html("");
      $("#" + preview_id + id).html("");
    } else {
      $(".openclass").html("Öffnen");
      element.innerHTML = "Schließen";
      $(".previewclass").html("");
    }

    if (element.innerHTML == "Schließen") {
      // $("#imagediv").removeClass("col-md-12");
      // $("#imagediv").addClass("col-md-7");
      // console.log("tags" + JSON.stringify(tags));
      const removepreview = () => {
        let elementnew: HTMLElement = document.getElementById(
          //"click" + this.previewid
          click_id + this.previewid
        ) as HTMLElement;
        elementnew.innerHTML = "Öffnen";

        //$("#preview" + id).html("");
        $("#" + preview_id + id).html("");

        console.log("sadasda");
      };

      const result1 = this.getFileExtension(imagename);
      let metadata = tags[0].split(",");
      console.log("metadatametadata" + metadata[0]);
      let FileSize =
        metadata[0] > 1024 ? metadata[0].charAt(0) + "MB" : metadata[0] + "KB";
      var d = new Date(date_of_uploadnew).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      var date_of_upload = d.replace(/[/]/g, ".");
      if (typeof metadata[2] != "undefined") {
        let dateofdocument = Number(metadata[2]);
        var date = new Date(dateofdocument).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        var date_of_document = date.replace(/[/]/g, ".");
        //console.log("date_of_document" + date_of_upload);
      } else {
        //var date_of_document = "";
      }
      var filetype = "";
      if (typeof metadata[1] != "undefined") {
        filetype = metadata[1];
      } else {
        filetype = "";
      }

      console.log("previewsec function called");
      console.log(preview_id);

      let same_docs_list = "";
      let index = 1;

      for (let count = 0; count < this.customerDocList.length; count++) {
        if (ticket_no == this.customerDocList[count].element.ticket_no) {
          let metadata = this.customerDocList[count].element.tags[0].split(",");

          var d = new Date(date_of_uploadnew).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          var date_of_upload = d.replace(/[/]/g, ".");

          if (typeof metadata[2] != "undefined") {
            let dateofdocument = Number(metadata[2]);
            var date = new Date(dateofdocument).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            var date_of_document = date.replace(/[/]/g, ".");
          } else {
            var date_of_document = "";
          }
          var filetype = "";
          if (typeof metadata[1] != "undefined") {
            filetype = metadata[1];
          } else {
            filetype = "";
          }

          if (index == 1) {
            same_docs_list +=
              '<div class="row document-row" id="document-row' +
              index +
              '" data-source="' +
              this.customerDocList[count].element.document_url +
              '" data-file_type="' +
              filetype +
              '" data-index="' +
              index +
              '" data-doc_link="' +
              this.customerDocList[count].element.document_unique_id +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11" >' +
              index +
              ". " +
              this.customerDocList[count].element.document_name +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-right" id="angle-right' +
              index +
              '" style="display:none;font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-down" id="angle-down' +
              index +
              '" style="font-weight:bold;font-size:30px;margin-left: -5px;"></i>' +
              "</div>" +
              '<div class="col-md-12 documentdetails" id="documentdetails' +
              index +
              '" style="background-color: white;color:black;border: 1px solid darkgray;margin-bottom: -5px;border-radius: 0px 0px 10px 10px;padding: 20px;">' +
              "<h6>Dokumentenname: " +
              this.customerDocList[count].element.document_name +
              "</h6><h6>Dateigröße: " +
              metadata[0] +
              " Kb</h6><h6>Vorgangs Nr.: " +
              ticket_no +
              "</h6><h6>Datum des Dokuments: " +
              date_of_document +
              "</h6><h6>Datum des Uploads: " +
              date_of_upload +
              "</h6><h6>Hochgeladen von: " +
              created_byname +
              "</h6><h6>Dateityp: " +
              filetype +
              "</h6><h6>Stichworte: " +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              companycode +
              "</span>" +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              brand +
              "</span>" +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          } else {
            same_docs_list +=
              '<div class="row document-row" id="document-row' +
              index +
              '" data-source="' +
              this.customerDocList[count].element.document_url +
              '" data-file_type="' +
              filetype +
              '" data-index="' +
              index +
              '" data-doc_link="' +
              this.customerDocList[count].element.document_unique_id +
              '" style="cursor: pointer;margin-top: 5px;background-color: #184195;color: white;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11" >' +
              index +
              ". " +
              this.customerDocList[count].element.document_name +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-right" id="angle-right' +
              index +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-down" id="angle-down' +
              index +
              '" style="margin-left: -5px;display:none;font-weight:bold;font-size:30px;"></i>' +
              "</div>" +
              '<div class="col-md-12 documentdetails" id="documentdetails' +
              index +
              '" style="display:none;background-color: white;color:black;border: 1px solid darkgray;margin-bottom: -5px;border-radius: 0px 0px 10px 10px;padding: 20px;">' +
              "<h6>Dokumentenname: " +
              this.customerDocList[count].element.document_name +
              "blob-" +
              index +
              "</h6><h6>Dateigröße: " +
              metadata[0] +
              " Kb</h6><h6>Vorgangs Nr.: " +
              ticket_no +
              "</h6><h6>Datum des Dokuments: " +
              date_of_document +
              "</h6><h6>Datum des Uploads: " +
              date_of_upload +
              "</h6><h6>Hochgeladen von: " +
              created_byname +
              "</h6><h6>Dateityp: " +
              filetype +
              "</h6><h6>Stichworte: " +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              companycode +
              "</span>" +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              brand +
              "</span>" +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          }

          index += 1;
        }
      }

      //$("#preview"+id).html(
      $("#" + preview_id + id).html(
        '<div style="background: #fff;padding: 33px;border-radius:10px;border:1px solid;margin-bottom: 15px;padding-bottom:8px !important;"><div class="col-md-4"  style="display: inline-block;    vertical-align: top;"><div class="line-heights">' +
        // '<div class="row" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">'+

        same_docs_list +
        //'</div>'+

        '</div><div class="col-md-12"> </div></div><div class="col-md-8" style="margin-top:-28px;display: inline-block;"><span class="side-icons"><i class="fa fa-times links" aria-hidden="true" style="margin-bottom:5px;position:relative;float:right;" aria-hidden="true"  id="previewimg" ></i></span><embed class="show-document" type="' +
        filetype +
        '" src="' +
        url +
        '" style=" width: 100%; height:1000px;object-fit: cover;"/><a id="document_link" href="' +
        environment.API_URL +
        "document/downloaddocument/" +
        imagename +
        '" ><span class="side-icons" ><i class="fa fa-download links" style="position:relative;float:right;padding-left: 8px;" aria-hidden="true"  ></i></span></a></div> </div>'
      );

      const someInput: any = document.getElementById("previewimg");
      someInput.addEventListener(
        "click",
        function () {
          removepreview();
        },
        false
      );

      $(".document-row").click(function (event: any) {
        let index = $(that).data("index");

        $(".documentdetails").css("display", "none");
        $(".fa-angle-right").css("display", "block");
        $(".fa-angle-down").css("display", "none");

        $(".document-row").css("background-color", "#184195");
        $(".document-row").css("color", "white");

        $("#documentdetails" + index).css("display", "block");
        $("#angle-right" + index).css("display", "none");
        $("#angle-down" + index).css("display", "block");

        $("#document-row" + index).css(
          "background-color",
          "rgb(181, 172, 172)"
        );
        $("#document-row" + index).css("color", "black");

        $(".show-document").attr("src", $(that).data("source"));

        $(".show-document").attr("type", $(that).data("file_type"));

        $("#document_link").attr(
          "href",
          environment.API_URL +
          "document/downloaddocument/" +
          $(that).data("doc_link")
        );

        event.stopPropagation();
        event.stopImmediatePropagation();
      });
    }
  }
  openpopup(event: any) {
    console.log("openpopup");
  }
  navigateWithb2bID() {
    if (this.loginRole == "b2b") {
      console.log("selecteduserid" + this.currentid);
      this.router.navigate(["/b2b-dashboard"], {
        queryParams: { id: this.currentid },
      });
    } else {
      this.router.navigate(["/kunde-home"], {
        queryParams: { id: this.currentid },
      });
    }
  }

  elementforallgmei:HTMLElement ;

  changebuttonname(){
    this.elementforallgmei.innerHTML = "Öffnen"
  }


  preViewData:any
  preview(
    url: any,
    tags: any,
    imagename: any,
    companycode: any,
    brand: any,
    document_name: any,
    date_of_uploadnew: any,
    id: any,
    created_byname: any,
    ticket_no: any
  ) {
    this.previewid = id;
    console.log(id);
    let element: HTMLElement = document.getElementById(
      "click" + this.previewid
    ) as HTMLElement;
    this.elementforallgmei = element
    if (element.innerHTML == "Schließen") {
      element.innerHTML = "Öffnen";
      $("#preview" + id).html("");
      // $("#imagediv").removeClass("col-md-7");
      // $("#imagediv").addClass("col-md-12");
      // $("#preview" + id).html("");
    } else {
      $(".openclass").html("Öffnen");
      this.elementforallgmei = element
      element.innerHTML = "Schließen";
      $(".previewclass").html("");
    }

    if (element.innerHTML == "Schließen") {
      // $("#imagediv").removeClass("col-md-12");
      // $("#imagediv").addClass("col-md-7");
      console.log("tags" + JSON.stringify(tags));
      const removepreview = () => {
        let elementnew: HTMLElement = document.getElementById(
          "click" + this.previewid
        ) as HTMLElement;
        elementnew.innerHTML = "Öffnen";

        // $("#imagediv").removeClass("col-md-7");
        // $("#imagediv").addClass("col-md-12");
        $("#preview" + id).html("");

        console.log("sadasda");
      };

      const result1 = this.getFileExtension(imagename);
      let metadata = tags[0].split(",");
      var d = new Date(date_of_uploadnew).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      var date_of_upload = d.replace(/[/]/g, ".");
      if (typeof metadata[2] != "undefined") {
        let dateofdocument = Number(metadata[2]);
        var date = new Date(dateofdocument).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        var date_of_document = date.replace(/[/]/g, ".");
      } else {
        var date_of_document = "";
      }
      var filetype = "";
      if (typeof metadata[1] != "undefined") {
        filetype = metadata[1];
      } else {
        filetype = "";
      }

      /*
      $("#preview" + id).html(
        '<div style="background:white;padding: 33px;border:1px solid;margin-bottom: 15px;"><div class="col-md-6"  style="display: inline-block;vertical-align: top;"><div class="line-heights"><h3>Dokumentenname: ' +
          document_name +
          "</h3><h3>Dateigröße: " +
          metadata[0] +
          " Kb</h3><h3>Vorgangs Nr.: " +
          ticket_no +
          "</h3><h3>Datum des Dokuments: " +
          date_of_document +
          "</h3><h3>Datum des Uploads: " +
          date_of_upload +
          "</h3><h3>Hochgeladen von: " +
          created_byname +
          "</h3><h3>Dateityp: " +
          filetype +
          "</h3><h3>Stichworte: " +
          '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 13.5px;">'+companycode+'</span>'+
          //"," +
          '&nbsp;&nbsp;'+
          '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 13.5px;">'+brand+'</span>'+
          // "," +
          '&nbsp;&nbsp;'+
          '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 13.5px;">'+ticket_no+'</span>'+
          '</h3></div><div class="col-md-12"> </div></div><div class="col-md-6" style="display: inline-block;"><span class="side-icons"><i class="fa fa-times" aria-hidden="true" style="position:relative;float:right;" aria-hidden="true"  id="previewimg" ></i></span><embed  type="' +
          filetype +
          '" src="' +
          url +
          '" style=" width: 100%; height:818px;object-fit: cover; "/><a href="' +
          environment.API_URL +
          "document/downloaddocument/" +
          imagename +
          '" ><span class="side-icons" ><i class="fa fa-download" style="position:relative;float:right;padding: 9px;font-size:14px;" aria-hidden="true"  ></i></span></a></div> </div>'
      );
      */
      this.preViewData = {
        document_name:document_name,
        metadata:metadata,
        ticket_no:ticket_no,
        date_of_document:date_of_document,
        date_of_upload:date_of_upload,
        created_byname:created_byname,
        filetype:filetype,
        companycode:companycode,
        brand:brand,
        url:url,
        imagename:imagename,
        href:`${environment.API_URL}document/downloaddocument/${imagename}`
      }
      console.log(this.preViewData)


      $("#showpreviewdocument").css("display", "block");

      $("#openAllgemeinePreiveiwmodal").trigger("click");
      this.open_modal('openAllgemeinePreiveiw');

      $("#showpreviewdocument").attr("src", url);

      /*
      $("#preview" + id).html(
        '<div style="border-radius:10px;background:white;padding: 33px;border:1px solid;margin-bottom: 15px;"><div class="col-md-4"  style="display: inline-block;vertical-align: top;"><div class="line-heights">' +
        '<div class="row" style="margin-top:36px;cursor: pointer;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;"><div class="col-md-11" >' +
        "1." +
        document_name +
        "-1" +
        '</div><div class="col-md-1"><i class="fa fa-angle-down" style="font-weight:bold;font-size:25px;"></i></div>' +
        '<div class="col-md-12" style="background-color: white;border: 1px solid darkgray;margin-bottom: -5px;border-radius: 0px 0px 10px 10px;padding: 20px">' +
        "<h6>Dokumentenname: " +
        document_name +
        "</h6><h6>Dateigröße: " +
        metadata[0] +
        " Kb</h6><h6>Vorgangs Nr.: " +
        ticket_no +
        "</h6><h6>Datum des Dokuments: " +
        date_of_document +
        "</h6><h6>Datum des Uploads: " +
        date_of_upload +
        "</h6><h6>Hochgeladen von: " +
        created_byname +
        "</h6><h6>Dateityp: " +
        filetype +
        "</h6><h6>Stichworte: " +
        '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
        companycode +
        "</span>" +
        //"," +
        "&nbsp;" +
        '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
        brand +
        "</span>" +
        // "," +
        "&nbsp;" +
        '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
        ticket_no +
        "</span>" +
        "</h6></div></div></div>" +
        '<div class="col-md-12"> </div></div><div class="col-md-8" style="display: inline-block;"><span class="side-icons"><i class="fa fa-times" aria-hidden="true" style="position:relative;float:right;" aria-hidden="true" id="previewimg" ></i></span><embed  type="' +
        filetype +
        '" src="' +
        url +
        '" style=" width: 100%; height:818px;object-fit: cover; "/><a href="' +
        environment.API_URL +
        "document/downloaddocument/" +
        imagename +
        '" ><span class="side-icons" ><i class="fa fa-download" style="position:relative;float:right;padding: 9px;font-size:14px;" aria-hidden="true"  ></i></span></a></div> </div>'
      );  */
      const someInput: any = document.getElementById("previewimg");
      someInput.addEventListener(
        "click",
        function () {
          removepreview();
        },
        false
      );

      //   // $('#loaderouterid').css("display","none");
    }
  }
  getFileExtension(filename: any) {
    // get file extension
    const extension =
      filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
      filename;
    return extension;
  }

  //Check for Displaying Companies for which the Customer is Registered
  cusCompany() {
    var company = JSON.parse(
      localStorage.getItem("currentUser")!
    ).companies_with_roles;
    this.setCompanyCondition(company);

    return;
  }

  onKeyup(event: any) {
    this.values_document = event.target.value;

    var value = event.keyCode;

    if (value == "13") {
      this.temporary_documents.length = 0;
      this.temporary_documents = [];

      this.pagedItemsGDOC.length = 0;
      this.pagedItemsGDOC = [];

      if (this.values_document == "" || this.values_document == " ") {
        //this.setPage(1, true);
        this.setPage(1, "general");
        this.show_doc_count();
      } else {
        for (
          let doc_count = 0;
          doc_count < this.documents.length;
          doc_count++
        ) {
          if (
            this.documents[doc_count].element.document_name
              .toLowerCase()
              .indexOf(this.values_document.toLowerCase()) != -1
          ) {
            this.temporary_documents.push(this.documents[doc_count]);
          }
        }

        this.pagerGDOC = this.pagerService.getPagerGDOC(
          this.temporary_documents.length,
          1,
          10
        );
        // get current page of items
        this.pagedItemsGDOC = this.temporary_documents.slice(
          this.pagerGDOC.startIndex,
          this.pagerGDOC.endIndex + 1
        );

        if (this.temporary_documents.length > 0) {
          this.startRecordGDOC = this.pagerGDOC.currentPage * 10 - 10 + 1;
          this.endRecordGDOC =
            this.pagerGDOC.currentPage * 10 > this.temporary_documents.length
              ? this.temporary_documents.length
              : this.pagerGDOC.currentPage * 10;
        } else {
          this.startRecordGDOC = 0;
          this.endRecordGDOC = 0;
        }
      }
    }
  }

  // pagination

  setPage(page: number, Double?: any) {
    // get pager object from service
    //this.getdivoutside();
    if (Double == "general") {
      this.pagerGDOC = this.pagerService.getPagerGDOC(
        this.documents.length,
        page,
        10
      );
      // get current page of items
      this.pagedItemsGDOC = this.documents.slice(
        this.pagerGDOC.startIndex,
        this.pagerGDOC.endIndex + 1
      );
      console.log("AAAAAAAAA" + JSON.stringify(this.pagedItems));
      if (this.documents.length > 0) {
        this.startRecordGDOC =
          // this.pagerGDOC.currentPage * this.pagerService.getDefaultPageSize() -
          // this.pagerService.getDefaultPageSize() +
          this.pagerGDOC.currentPage * 10 - 10 + 1;
        this.endRecordGDOC =
          //this.pagerGDOC.currentPage * this.pagerService.getDefaultPageSize() >
          this.pagerGDOC.currentPage * 10 > this.documents.length
            ? this.documents.length
            : this.pagerGDOC.currentPage *
            // this.pagerService.getDefaultPageSize();
            10;
      } else {
        this.startRecordGDOC = 0;
        this.endRecordGDOC = 0;
      }
    } else if (Double == "second") {
      this.pagersecond = this.pagerService.getPager(
        //this.customerDocListsecond.length,
        this.customerDocListsecondunique.length,
        page
      );
      // get current page of items

      //this.pagedItemssecond = this.customerDocListsecond.slice(
      this.pagedItemssecond = this.customerDocListsecondunique.slice(
        this.pagersecond.startIndex,
        this.pagersecond.endIndex + 1
      );
      console.log("AAAAAAAAA" + JSON.stringify(this.pagedItemssecond));
      //if (this.customerDocListsecond.length > 0) {
      if (this.customerDocListsecondunique.length > 0) {
        this.startRecordsecond =
          this.pagersecond.currentPage *
          this.pagerService.getDefaultPageSize() -
          this.pagerService.getDefaultPageSize() +
          1;
        this.endRecordsecond =
          this.pagersecond.currentPage *
            this.pagerService.getDefaultPageSize() >
            //this.customerDocListsecond.length
            this.customerDocListsecondunique.length
            ? //? this.customerDocListsecond.length
            this.customerDocListsecondunique.length
            : this.pagersecond.currentPage *
            this.pagerService.getDefaultPageSize();
      } else {
        this.startRecordsecond = 0;
        this.endRecordsecond = 0;
      }
    } else {
      this.pager = this.pagerService.getPager(
        // this.customerDocList.length,
        this.customerDocListunique.length,
        page
      );
      // get current page of items
      // this.pagedItems = this.customerDocList.slice(
      this.pagedItems = this.customerDocListunique.slice(
        this.pager.startIndex,
        this.pager.endIndex + 1
      );

      console.log("paged items doc");
      console.log(this.pagedItems);

      //if (this.customerDocList.length > 0) {
      if (this.customerDocListunique.length > 0) {
        this.startRecord =
          this.pager.currentPage * this.pagerService.getDefaultPageSize() -
          this.pagerService.getDefaultPageSize() +
          1;
        this.endRecord =
          this.pager.currentPage * this.pagerService.getDefaultPageSize() >
            // this.customerDocList.length
            //   ? this.customerDocList.length
            this.customerDocListunique.length
            ? this.customerDocListunique.length
            : this.pager.currentPage * this.pagerService.getDefaultPageSize();
      } else {
        this.startRecord = 0;
        this.endRecord = 0;
      }
    }
  }

  show_doc_count() {
    this.sach = 0;
    this.renten = 0;
    this.kranken = 0;
    this.gewerbesach = 0;

    this.investment = 0;
    this.sachwerte = 0;

    this.immobilien = 0;
    this.verbraucher = 0;
    this.unternehmen = 0;
    this.kfz = 0;

    if (this.pagedItems) {
      if (this.pagedItems.length > 0) {
        for (let i = 0; i < this.pagedItems.length; i++) {
          for (
            let j = 0;
            j < this.pagedItems[i].element.inventorydata.length;
            j++
          ) {
            if (this.pagedItems[i].element.inventorydata[j].Sparte == "Sach") {
              this.sach += 1;
            } else if (
              this.pagedItems[i].element.inventorydata[j].Sparte ==
              "Renten/Leben"
            ) {
              this.renten += 1;
            } else if (
              this.pagedItems[i].element.inventorydata[j].Sparte == "Kranken"
            ) {
              this.kranken += 1;
            } else if (
              this.pagedItems[i].element.inventorydata[j].Sparte ==
              "Gewerbesach"
            ) {
              this.gewerbesach += 1;
            } else if (
              this.pagedItems[i].element.inventorydata[j].Sparte == "Investment"
            ) {
              this.investment += 1;
            } else if (
              this.pagedItems[i].element.inventorydata[j].Sparte == "Sachwerte"
            ) {
              this.sachwerte += 1;
            } else if (
              this.pagedItems[i].element.inventorydata[j].Sparte ==
              "Immobilienfinanzierung"
            ) {
              this.immobilien += 1;
            } else if (
              this.pagedItems[i].element.inventorydata[j].Sparte ==
              "Verbraucherkredite"
            ) {
              this.verbraucher += 1;
            } else if (
              this.pagedItems[i].element.inventorydata[j].Sparte ==
              "Unternehmensfinanzierung"
            ) {
              this.unternehmen += 1;
            } else if (
              this.pagedItems[i].element.inventorydata[j].Sparte ==
              "KFZ Kredite"
            ) {
              this.kfz += 1;
            }
          }
        }
      }
    }

    this.Versicherungsgesellschaftarr1 = [
      "Sach " + this.sach,
      "Renten/Leben " + this.renten,
      "Kranken " + this.kranken,
      "Gewerbesach " + this.gewerbesach,
    ];
    this.Geldanlagenarr1 = [
      "Investment " + this.investment,
      "Sachwerte " + this.sachwerte,
    ];
    this.Bankarr1 = [
      "Immobilienfinanzierung " + this.immobilien,
      "Verbraucherkredite " + this.verbraucher,
      "Unternehmensfinanzierung " + this.unternehmen,
      "KFZ Kredite " + this.kfz,
    ];

    this.sach2 = 0;
    this.renten2 = 0;
    this.kranken2 = 0;
    this.gewerbesach2 = 0;

    this.investment2 = 0;
    this.sachwerte2 = 0;

    this.immobilien2 = 0;
    this.verbraucher2 = 0;
    this.unternehmen2 = 0;
    this.kfz2 = 0;

    if (this.pagedItemssecond) {
      if (this.pagedItemssecond.length > 0) {
        for (let i = 0; i < this.pagedItemssecond.length; i++) {
          if (this.pagedItemssecond[i].element.protype.sparte == "Sach") {
            this.sach2 += 1;
          } else if (
            this.pagedItemssecond[i].element.protype.sparte == "Renten/Leben"
          ) {
            this.renten2 += 1;
          } else if (
            this.pagedItemssecond[i].element.protype.sparte == "Kranken"
          ) {
            this.kranken2 += 1;
          } else if (
            this.pagedItemssecond[i].element.protype.sparte == "Gewerbesach"
          ) {
            console.log("gew see" + i);
            this.gewerbesach2 += 1;
          } else if (
            this.pagedItemssecond[i].element.protype.sparte == "Investment"
          ) {
            this.investment2 += 1;
          } else if (
            this.pagedItemssecond[i].element.protype.sparte == "Sachwerte"
          ) {
            this.sachwerte2 += 1;
          } else if (
            this.pagedItemssecond[i].element.protype.sparte ==
            "Immobilienfinanzierung"
          ) {
            this.immobilien2 += 1;
          } else if (
            this.pagedItemssecond[i].element.protype.sparte ==
            "Verbraucherkredite"
          ) {
            this.verbraucher2 += 1;
          } else if (
            this.pagedItemssecond[i].element.protype.sparte ==
            "Unternehmensfinanzierung"
          ) {
            this.unternehmen2 += 1;
          } else if (
            this.pagedItemssecond[i].element.protype.sparte == "KFZ Kredite"
          ) {
            this.kfz2 += 1;
          }
        }
      }
    }

    this.Versicherungsgesellschaftarr = [
      "Sach " + this.sach2,
      "Renten/Leben " + this.renten2,
      "Kranken " + this.kranken2,
      "Gewerbesach " + this.gewerbesach2,
    ];
    this.Geldanlagenarr = [
      "Investment " + this.investment2,
      "Sachwerte " + this.sachwerte2,
    ];
    this.Bankarr = [
      "Immobilienfinanzierung " + this.immobilien2,
      "Verbraucherkredite " + this.verbraucher2,
      "Unternehmensfinanzierung " + this.unternehmen2,
      "KFZ Kredite " + this.kfz2,
    ];
  }

  drawStart1() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log("begin drawingnew");
  }
  setCompanyCondition(company: any) {
    console.log("adsasdsadasdasdas");
    if (company.includes("cefima_customer")) {
      console.log("compaaaanyyyyy");
      this.showmekFinanz = true;
    }

    if (company.includes("fiorettoimmob_customer")) {
      this.showFiorettoImmob = true;
    }

    if (company.includes("birema_customer")) {
      this.showBirema = true;
    }

    if (company.includes("fiorettomedia_customer")) {
      this.showFiorettoMedia = true;
    }

    if (company.includes("airmage_customer")) {
      this.showAirmage = true;
    }

    if (company.includes("horaidetektei_customer")) {
      this.showHoraiDetektei = true;
    }

    if (company.includes("varioimport_customer")) {
      this.showVarioImport = true;
    }

    if (company.includes("sterbvorsoge_customer")) {
      this.showSterbVorsoge = true;
    }

    if (company.includes("checkntrack_customer" || "checkntrack_user")) {
      this.showCheckntrack = true;
    }
  }

  //Kunde
  Cus() {
    if (
      this.userService.getDecodedAccessToken(localStorage.getItem("token")!)
        .roles == "customer"
    ) {
      this.showCustomer = false;
    }
  }

  //User Logout
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["./"]);
  }

  //OpenPreview function
  OpenPreview(ID: any, INDEX: any, DATA: any) {
    console.log(ID);
    console.log(INDEX);
    console.log(DATA);
    this.ShowDiv = true;
    this.ImgUrl = DATA;
    this.href = DATA;
    setTimeout(() => {
      console.log("dsfsdfsdafafdasda");
      if (DATA.search("docx") !== -1) {
        $("#showdivdoc").attr("src", this.ImgUrl);
        $("#showdivdoc").css("display", "block");
        $("#showdivpdf").css("display", "none");
        $("#showdivimg").css("display", "none");
      } else if (DATA.search("pdf") !== -1) {
        $("#showdivpdf").attr("src", this.href);
        $("#showdivpdf").css("display", "block");
        $("#showdivimg").css("display", "none");
        $("#showdivdoc").css("display", "none");
      } else {
        $("#showdivimg").attr("src", this.href);
        $("#showdivimg").css("display", "block");
        $("#showdivpdf").css("display", "none");
        $("#showdivdoc").css("display", "none");
      }
    }, 100);
  }

  // handleImageChange  In Chat
  handleImageChange(event: any) {
    let that = this;
    event.preventDefault();
    const removeData = (j: any) => {
      delete this.filearraynew[j];
      let newfilearray = this.filearraynew.filter(function () {
        return true;
      });
      this.filearray = newfilearray;
    };

    var files = event.target.files; //FileList object

    var filesLength = files.length;

    for (let i = 0; i < filesLength; i++) {
      let f = files[i];
      let newsize = this.l;
      this.l = this.l + 1;
      this.filearraynew.push(f);
      let Size1 = f.size;
      let Size = this.dataconvert(Size1);
      this.filearray = this.filearraynew;

      var fileReader = new FileReader();
      //var target:EventTarget;
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

        let typeofimage = f.type;
        let dateofdocument = f.lastModified;

        let Size = Math.round(f.size / 1024);
        $(`<div class="pip" style="width: 290px;display: inline-block;margin: 8px;" id="pipremove"

      >
        <div class="removepreview" id="removepreviewid${newsize}"

       style="background: #184297;
       border-radius: 50%;
       width: 30px;
       height: 30px;
       font-size: 14px;
       text-align: center;
       padding: 4px;
       color: white;
       position: absolute;
       margin-left: 142px;
       margin-top: 0px;
       margin-right: 0 !important;
       cursor: pointer;">X</div>

        <img class="imageThumb" style="width: 60%;height:210px" src=${ImageName}

   /></div>`).insertAfter("#result");
        $("#removepreviewid" + newsize).click(function () {
          removeData(newsize);

          $(that).parent(".pip").remove();
        });
      };
      fileReader.readAsDataURL(f);
    }
    console.log(this.filearraynew);
  }

  patchcompanyid(data: any, mode: any) {
    console.log("patchcompanyid" + JSON.stringify(data));

    this.companyId = data._id;
    this.membertype1 = data.type1;
    this.membertype2 = data.type2;
    this.membertype3 = data.type3;
    console.log("patchcompanyid" + this.companyId);
    console.log("patchcompanyid" + JSON.stringify(this.membertype1));
    console.log("patchcompanyid" + JSON.stringify(this.membertype2));
    console.log("patchcompanyid" + JSON.stringify(this.membertype3));
    if (mode == "shareholder") {
      let totalshares: number = 0;
      for (
        let i = 0;
        i < this.membertype3.legalrepresentativeform2.length;
        i++
      ) {
        console.log(
          "shareholdershares" +
          this.membertype3.legalrepresentativeform2[i].shares
        );
        totalshares =
          totalshares +
          parseInt(this.membertype3.legalrepresentativeform2[i].shares);
      }
      console.log("shareholdershares" + totalshares);
      if (totalshares < 100) {
        let leftshares = 100 - totalshares;
        console.log("shareholdersharesleftshares" + leftshares);
        this.ShareholderFormGroup.patchValue({
          shares: leftshares,
        });
        this.addMoreMemberShareholder = true;
        $("#openshareholdermodel").trigger("click");
        this.open_modal('exampleModalShareholder')
      } else {
        this.addMoreMemberShareholder = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not Possible!!",
        });
        this.companyId = "";
        this.membertype1 = {};
        this.membertype2 = {};
        this.membertype3 = {};
      }
    }
  }
  patchsharesvalue() {
    let totalshares: number = 0;
    for (
      let i = 0;
      i < this.localData.type3.legalrepresentativeform2.length;
      i++
    ) {
      console.log(
        "shareholdershares" +
        this.localData.type3.legalrepresentativeform2[i].shares
      );
      totalshares =
        totalshares +
        parseInt(this.localData.type3.legalrepresentativeform2[i].shares);
    }
    console.log("shareholdershares" + totalshares);
    if (totalshares < 100) {
      let leftshares = 100 - totalshares;
      console.log("shareholdersharesleftshares" + leftshares);
      this.ShareholderFormGroup.patchValue({
        shares: leftshares,
      });
      this.addMoreShareholder = true;
      $("#openshareholdermodel").trigger("click");
      this.open_modal('exampleModalShareholder')
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Not Possible!!",
      });
      this.addMoreShareholder = false;
    }
  }
  handleAddressChange(data: any) {
    const splitArr = data.address_components;
    this.getCountry(splitArr);
  }
  handleAllFieldsShare(data: any, index: any) {
    console.log("imhere" + index);
    const splitArr = data.address_components;

    this.getAllFieldsShare(splitArr, index);
  }
  handleAllFieldsfirst(data: any, index: any) {
    console.log("imhere" + index);
    //$("#showfieldslink").html("");
    // $("#showfieldslink").css("display", "block");
    const splitArr = data.address_components;

    this.getAllFieldsfirst(splitArr, index);
  }
  handleAllFieldssecond(data: any, index: any) {
    console.log("imhere" + index);
    const splitArr = data.address_components;

    this.getAllFieldssecond(splitArr, index);
  }
  handleAllFields(data: any) {
    const splitArr = data.address_components;
    this.getAllFields(splitArr);
  }
  handleAllFieldsCEO(data: any) {
    const splitArr = data.address_components;
    this.getAllFieldsCEO(splitArr);
  }
  handleAllFieldsOtherPerson(data: any) {
    const splitArr = data.address_components;
    this.getAllFieldsOtherPerson(splitArr);
  }
  handleAllFieldsShareholder(data: any) {
    const splitArr = data.address_components;
    this.getAllFieldsShareholder(splitArr);
  }
  handleAllFieldsOffice(data: any) {
    const splitArr = data.address_components;
    this.getAllFieldsOffice(splitArr);
  }
  handleAllFieldsliving(data: any) {
    const splitArr = data.address_components;
    this.getAllFieldsliving(splitArr);
  }
  handleAllFieldsnew(data: any) {
    const splitArr = data.address_components;
    this.getAllFieldsnew(splitArr);
  }
  handleAddressChangeland(data: any) {
    const splitArr = data.address_components;
    this.getCountryland(splitArr);
  }
  handleAddressChangelandShareholder(data: any) {
    const splitArr = data.address_components;
    this.getCountrylandShareholder(splitArr);
  }
  handleAddressChangelandCEO(data: any) {
    const splitArr = data.address_components;
    this.getCountrylandCEO(splitArr);
  }
  handleAddressChangelandOtherPerson(data: any) {
    const splitArr = data.address_components;
    this.getCountrylandOtherPerson(splitArr);
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
      const found = content.find((element: any) => (element = "street_number"));
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
      const found = content.find((element: any) => (element = "street_number"));
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
  showaddressfields13(data: any, index: any) {
    console.log("show address fields13" + index);
    console.log("showmorevalue" + this.showmore);
    setTimeout(() => {
      if (this.showmore[index]) {
        $("#message33" + index).html("Mehr Felder anzeigen");
        $("#arrowsetting33" + index).removeClass("uparrow");
        $("#arrowsetting33" + index).addClass("rightarrow");
        $("#arrowsetting33" + index).removeClass("up");
        $("#arrowsetting33" + index).addClass("down");
        this.showmore[index] = false;
      } else {
        $("#message33" + index).html("Weniger Felder anzeigen");
        $("#arrowsetting33" + index).removeClass("rightarrow");
        $("#arrowsetting33" + index).addClass("uparrow");
        $("#arrowsetting33" + index).removeClass("down");
        $("#arrowsetting33" + index).addClass("up");
        this.showmore[index] = true;
      }
    }, 100);
  }
  showaddressfields3(data: any, index: any) {
    console.log("show address fields3" + index);
    console.log("showmorevalue" + this.showmore1);
    setTimeout(() => {
      if (this.showmore1[index]) {
        $("#message23" + index).html("Mehr Felder anzeigen");
        $("#arrowsetting23" + index).removeClass("uparrow");
        $("#arrowsetting23" + index).addClass("rightarrow");
        $("#arrowsetting23" + index).removeClass("up");
        $("#arrowsetting23" + index).addClass("down");
        this.showmore1[index] = false;
      } else {
        $("#message23" + index).html("Weniger Felder anzeigen");
        $("#arrowsetting23" + index).removeClass("rightarrow");
        $("#arrowsetting23" + index).addClass("uparrow");
        $("#arrowsetting23" + index).removeClass("down");
        $("#arrowsetting23" + index).addClass("up");
        this.showmore1[index] = true;
      }
    }, 100);
  }
  showaddressfields23(data: any, index: any) {
    console.log("show address fields23");
    // $("#addressfields2").css("display", "block");
    //  $("#arrowsetting").removeClass("up");
    //  $("#arrowsetting").addClass("down");
    if (this.showmore2[index]) {
      $("#message13" + index).html("Mehr Felder anzeigen");
      $("#arrowsetting3" + index).removeClass("uparrow");
      $("#arrowsetting3" + index).addClass("rightarrow");
      $("#arrowsetting3" + index).removeClass("up");
      $("#arrowsetting3" + index).addClass("down");
      // $("#arrowsetting").removeClass("up");
      //$("#arrowsetting").addClass("down");

      this.showmore2[index] = false;
    } else {
      $("#message13" + index).html("Weniger Felder anzeigen");
      $("#arrowsetting3" + index).removeClass("rightarrow");
      $("#arrowsetting3" + index).addClass("uparrow");
      $("#arrowsetting3" + index).removeClass("down");
      $("#arrowsetting3" + index).addClass("up");
      this.showmore2[index] = true;
    }
  }
  getCountry(data: any): any {
    let that = this;
    const splitArr = data;
    console.log(splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      //console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
          }
          // if (countryArr[index] === "locality") {
          //   that.localityName = i.short_name;
          // }
          // let localityCountry = that.localityName + "," + that.countryName;
          // that.customerFormGroup.patchValue({ birthPlace: localityCountry });
        }
      }
    });
  }
  saveCEO() {
    $("#loaderouterid").css("display", "block");
    console.log("type1data" + JSON.stringify(this.type1));
    console.log("type1data" + this.customerid);

    let data = {
      title: this.CEOFormGroup.value.title,
      firstname: this.CEOFormGroup.value.firstname,

      lastname: this.CEOFormGroup.value.lastname,
      dateofbirth: this.CEOFormGroup.value.dob,
      streetfirst: this.CEOFormGroup.value.street,
      streetNumberfirst: this.CEOFormGroup.value.streetNumber,
      additionalReferencefirst: this.CEOFormGroup.value.additionalReference,
      postCodefirst: this.CEOFormGroup.value.postCode,
      cityfirst: this.CEOFormGroup.value.city,
      countryOfResidencefirst: this.CEOFormGroup.value.countryOfResidence,
    };

    this.localData.type1.legalrepresentativeform.push(data);

    console.log("type1data" + JSON.stringify(this.localData.type1));

    let data1 = {
      type1: this.localData.type1,
      type2: this.localData.type2,
      type3: this.localData.type3,
      _id: this.customerid,
    };
    this.userService.updateBrokerCEO(data1).subscribe(
      async (success: any) => {
        // if success and error give response
        if (success.status == 200) {
          setTimeout(() => {
            $("#loaderouterid").css("display", "none");

            console.log("type1data" + success.status);

            Swal.fire({
              position: "center",
              allowOutsideClick: false,
              title: "Ihre Daten wurden erfolgreich gespeichert.",
              iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
              confirmButtonText: "Ok",
              confirmButtonColor: '#02a9ed',
              customClass: {
                icon: 'no-border'
              },
            })
              .then((result) => {
                console.log(result);
                if (result["isDismissed"]) {
                  console.log("iffffff");
                } else {
                  this.CEOform.resetForm();
                  $("#closeCEOModal").trigger("click");
                  this.setPagetype(1, "type1");
                  //  this.reloadCurrentRoute();
                }
              })
              .catch((err) => { });
          }, 1000);
        } else {
          setTimeout(() => {
            $("#loaderouterid").css("display", "none");
            console.log("type1data" + success.status);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please Fill All Details!!",
            });
          }, 100);
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
  }
  resetCEOForm() {
    this.CEOform.resetForm();
    this.companyId = "";
    this.membertype1 = {};
    this.membertype2 = {};
    this.membertype3 = {};
  }
  resetOtherPersonForm() {
    this.OtherPersonform.resetForm();
    this.companyId = "";
    this.membertype1 = {};
    this.membertype2 = {};
    this.membertype3 = {};
  }
  resetShareholderForm() {
    this.Shareholderform.resetForm();
    this.companyId = "";
    this.membertype1 = {};
    this.membertype2 = {};
    this.membertype3 = {};
  }
  saveMemberCEO() {
    $("#loaderouterid").css("display", "block");
    console.log("saveMemberCEO" + JSON.stringify(this.companyId));
    console.log("type1data" + this.customerid);

    let data = {
      title: this.CEOFormGroup.value.title,
      firstname: this.CEOFormGroup.value.firstname,

      lastname: this.CEOFormGroup.value.lastname,
      dateofbirth: this.CEOFormGroup.value.dob,
      streetfirst: this.CEOFormGroup.value.street,
      streetNumberfirst: this.CEOFormGroup.value.streetNumber,
      additionalReferencefirst: this.CEOFormGroup.value.additionalReference,
      postCodefirst: this.CEOFormGroup.value.postCode,
      cityfirst: this.CEOFormGroup.value.city,
      countryOfResidencefirst: this.CEOFormGroup.value.countryOfResidence,
    };

    this.membertype1.legalrepresentativeform.push(data);

    console.log("type1data" + JSON.stringify(this.localData.type1));

    let data1 = {
      type1: this.membertype1,
      type2: this.membertype2,
      type3: this.membertype3,
      _id: this.companyId,
    };
    this.userService.updatecustomercompanyCEO(data1).subscribe(
      async (success: any) => {
        // if success and error give response
        if (success.status == 200) {
          setTimeout(() => {
            $("#loaderouterid").css("display", "none");

            console.log("type1data" + success.status);

            Swal.fire({
              position: "center",
              allowOutsideClick: false,
              title: "Ihre Daten wurden erfolgreich gespeichert.",
              iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
              confirmButtonText: "Ok",
              confirmButtonColor: '#02a9ed',
              customClass: {
                icon: 'no-border'
              },
            })
              .then((result) => {
                console.log(result);
                if (result["isDismissed"]) {
                  console.log("iffffff");
                } else {
                  this.companyId = "";
                  this.membertype1 = {};
                  this.membertype2 = {};
                  this.membertype3 = {};
                  this.CEOform.resetForm();
                  $("#closeCEOModal").trigger("click");
                  //  this.setPagetype(1,'type1');
                  //  this.reloadCurrentRoute();
                }
              })
              .catch((err) => { });
          }, 1000);
        } else {
          setTimeout(() => {
            $("#loaderouterid").css("display", "none");
            console.log("type1data" + success.status);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please Fill All Details!!",
            });
          }, 100);
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
  }
  saveMemberOtherPerson() {
    $("#loaderouterid").css("display", "block");
    console.log("type2data" + JSON.stringify(this.companyId));
    console.log("type2data" + this.customerid);

    let data = {
      title: this.OtherPersonFormGroup.value.title,
      firstname: this.OtherPersonFormGroup.value.firstname,

      lastname: this.OtherPersonFormGroup.value.lastname,
      dateofbirth: this.OtherPersonFormGroup.value.dob,
      streetsecond: this.OtherPersonFormGroup.value.street,
      streetNumbersecond: this.OtherPersonFormGroup.value.streetNumber,
      additionalReferencesecond:
        this.OtherPersonFormGroup.value.additionalReference,
      postCodesecond: this.OtherPersonFormGroup.value.postCode,
      citysecond: this.OtherPersonFormGroup.value.city,
      countryOfResidencesecond:
        this.OtherPersonFormGroup.value.countryOfResidence,
    };

    this.membertype2.legalrepresentativeform1.push(data);

    console.log("type1data" + JSON.stringify(this.localData.type2));

    let data1 = {
      type1: this.membertype1,
      type2: this.membertype2,
      type3: this.membertype3,
      _id: this.companyId,
    };
    this.userService.updatecustomercompanyCEO(data1).subscribe(
      async (success: any) => {
        // if success and error give response
        if (success.status == 200) {
          setTimeout(() => {
            $("#loaderouterid").css("display", "none");

            console.log("type2data" + success.status);

            Swal.fire({
              position: "center",
              allowOutsideClick: false,
              title: "Ihre Daten wurden erfolgreich gespeichert.",
              iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
              confirmButtonText: "Ok",
              confirmButtonColor: '#02a9ed',
              customClass: {
                icon: 'no-border'
              },
            })
              .then((result) => {
                console.log(result);
                if (result["isDismissed"]) {
                  console.log("iffffff");
                } else {
                  this.companyId = "";
                  this.membertype1 = {};
                  this.membertype2 = {};
                  this.membertype3 = {};
                  this.OtherPersonform.resetForm();
                  $("#closeOtherPersonModal").trigger("click");
                  //  this.setPagetype(1,'type2');
                  //  this.reloadCurrentRoute();
                }
              })
              .catch((err) => { });
          }, 1000);
        } else {
          setTimeout(() => {
            $("#loaderouterid").css("display", "none");
            console.log("type2data" + success.status);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please Fill All Details!!",
            });
          }, 100);
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
  }
  saveOtherPerson() {
    $("#loaderouterid").css("display", "block");
    console.log("type2data" + JSON.stringify(this.type2));
    console.log("type2data" + this.customerid);

    let data = {
      title: this.OtherPersonFormGroup.value.title,
      firstname: this.OtherPersonFormGroup.value.firstname,

      lastname: this.OtherPersonFormGroup.value.lastname,
      dateofbirth: this.OtherPersonFormGroup.value.dob,
      streetsecond: this.OtherPersonFormGroup.value.street,
      streetNumbersecond: this.OtherPersonFormGroup.value.streetNumber,
      additionalReferencesecond:
        this.OtherPersonFormGroup.value.additionalReference,
      postCodesecond: this.OtherPersonFormGroup.value.postCode,
      citysecond: this.OtherPersonFormGroup.value.city,
      countryOfResidencesecond:
        this.OtherPersonFormGroup.value.countryOfResidence,
    };

    this.localData.type2.legalrepresentativeform1.push(data);

    console.log("type1data" + JSON.stringify(this.localData.type2));

    let data1 = {
      type1: this.localData.type1,
      type2: this.localData.type2,
      type3: this.localData.type3,
      _id: this.customerid,
    };
    this.userService.updateBrokerCEO(data1).subscribe(
      async (success: any) => {
        // if success and error give response
        if (success.status == 200) {
          setTimeout(() => {
            $("#loaderouterid").css("display", "none");

            console.log("type2data" + success.status);

            Swal.fire({
              position: "center",
              allowOutsideClick: false,
              title: "Ihre Daten wurden erfolgreich gespeichert.",
              iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
              confirmButtonText: "Ok",
              confirmButtonColor: '#02a9ed',
              customClass: {
                icon: 'no-border'
              },
            })
              .then((result) => {
                console.log(result);
                if (result["isDismissed"]) {
                  console.log("iffffff");
                } else {
                  this.OtherPersonform.resetForm();
                  $("#closeOtherPersonModal").trigger("click");
                  this.setPagetype(1, "type2");
                  //  this.reloadCurrentRoute();
                }
              })
              .catch((err) => { });
          }, 1000);
        } else {
          setTimeout(() => {
            $("#loaderouterid").css("display", "none");
            console.log("type2data" + success.status);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please Fill All Details!!",
            });
          }, 100);
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
  }
  saveMemberShareholder() {
    $("#loaderouterid").css("display", "block");
    console.log("type3data" + JSON.stringify(this.membertype3));
    console.log("type3data" + this.customerid);

    let data = {
      title: this.ShareholderFormGroup.value.title,
      firstname: this.ShareholderFormGroup.value.firstname,
      shares: this.ShareholderFormGroup.value.shares,
      lastname: this.ShareholderFormGroup.value.lastname,
      dateofbirth: this.ShareholderFormGroup.value.dob,
      streetshare: this.ShareholderFormGroup.value.street,
      streetNumbershare: this.ShareholderFormGroup.value.streetNumber,
      additionalReferenceshare:
        this.ShareholderFormGroup.value.additionalReference,
      postCodeshare: this.ShareholderFormGroup.value.postCode,
      cityshare: this.ShareholderFormGroup.value.city,
      countryOfResidenceshare:
        this.ShareholderFormGroup.value.countryOfResidence,
    };

    this.membertype3.legalrepresentativeform2.push(data);

    console.log("type3data" + JSON.stringify(this.localData.type3));

    let data1 = {
      type1: this.membertype1,
      type2: this.membertype2,
      type3: this.membertype3,
      _id: this.companyId,
    };
    this.userService.updatecustomercompanyCEO(data1).subscribe(
      async (success: any) => {
        // if success and error give response
        if (success.status == 200) {
          setTimeout(() => {
            $("#loaderouterid").css("display", "none");

            console.log("type3data" + success.status);

            Swal.fire({
              position: "center",
              allowOutsideClick: false,
              title: "Ihre Daten wurden erfolgreich gespeichert.",
              iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
              confirmButtonText: "Ok",
              confirmButtonColor: '#02a9ed',
              customClass: {
                icon: 'no-border'
              },
            })
              .then((result) => {
                console.log(result);
                if (result["isDismissed"]) {
                  console.log("iffffff");
                } else {
                  this.companyId = "";
                  this.membertype1 = {};
                  this.membertype2 = {};
                  this.membertype3 = {};
                  this.Shareholderform.resetForm();
                  $("#closeShareholderModal").trigger("click");
                  let totalshares: number = 0;
                  for (
                    let i = 0;
                    i < this.membertype3.legalrepresentativeform2.length;
                    i++
                  ) {
                    console.log(
                      "shareholdershares" +
                      this.membertype3.legalrepresentativeform2[i].shares
                    );
                    totalshares =
                      totalshares +
                      parseInt(
                        this.membertype3.legalrepresentativeform2[i].shares
                      );
                  }
                  console.log("shareholdershares" + totalshares);
                  if (totalshares < 100) {
                    let leftshares = 100 - totalshares;
                    console.log("shareholdersharesleftshares" + leftshares);
                    this.ShareholderFormGroup.patchValue({
                      shares: leftshares,
                    });
                    this.addMoreMemberShareholder = true;
                  } else {
                    this.addMoreMemberShareholder = false;
                  }

                  //  this.setPagetype(1,'type3');
                  //  this.reloadCurrentRoute();
                }
              })
              .catch((err) => { });
          }, 1000);
        } else {
          setTimeout(() => {
            $("#loaderouterid").css("display", "none");
            console.log("type2data" + success.status);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please Fill All Details!!",
            });
          }, 100);
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
  }
  saveShareholder() {
    $("#loaderouterid").css("display", "block");
    console.log("type3data" + JSON.stringify(this.type3));
    console.log("type3data" + this.customerid);

    let data = {
      title: this.ShareholderFormGroup.value.title,
      firstname: this.ShareholderFormGroup.value.firstname,
      shares: this.ShareholderFormGroup.value.shares,
      lastname: this.ShareholderFormGroup.value.lastname,
      dateofbirth: this.ShareholderFormGroup.value.dob,
      streetshare: this.ShareholderFormGroup.value.street,
      streetNumbershare: this.ShareholderFormGroup.value.streetNumber,
      additionalReferenceshare:
        this.ShareholderFormGroup.value.additionalReference,
      postCodeshare: this.ShareholderFormGroup.value.postCode,
      cityshare: this.ShareholderFormGroup.value.city,
      countryOfResidenceshare:
        this.ShareholderFormGroup.value.countryOfResidence,
    };

    this.localData.type3.legalrepresentativeform2.push(data);

    console.log("type3data" + JSON.stringify(this.localData.type3));

    let data1 = {
      type1: this.localData.type1,
      type2: this.localData.type2,
      type3: this.localData.type3,
      _id: this.customerid,
    };
    this.userService.updateBrokerCEO(data1).subscribe(
      async (success: any) => {
        // if success and error give response
        if (success.status == 200) {
          setTimeout(() => {
            $("#loaderouterid").css("display", "none");

            console.log("type3data" + success.status);

            Swal.fire({
              position: "center",
              allowOutsideClick: false,
              title: "Ihre Daten wurden erfolgreich gespeichert.",
              iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
              confirmButtonText: "Ok",
              confirmButtonColor: '#02a9ed',
              customClass: {
                icon: 'no-border'
              },
            })
              .then((result) => {
                console.log(result);
                if (result["isDismissed"]) {
                  console.log("iffffff");
                } else {
                  this.Shareholderform.resetForm();
                  let totalshares: number = 0;
                  for (
                    let i = 0;
                    i < this.localData.type3.legalrepresentativeform2.length;
                    i++
                  ) {
                    console.log(
                      "shareholdershares" +
                      this.localData.type3.legalrepresentativeform2[i].shares
                    );
                    totalshares =
                      totalshares +
                      parseInt(
                        this.localData.type3.legalrepresentativeform2[i].shares
                      );
                  }
                  console.log("shareholdershares" + totalshares);
                  if (totalshares < 100) {
                    let leftshares = 100 - totalshares;
                    console.log("shareholdersharesleftshares" + leftshares);
                    this.ShareholderFormGroup.patchValue({
                      shares: leftshares,
                    });
                    this.addMoreShareholder = true;
                  } else {
                    this.addMoreShareholder = false;
                  }

                  $("#closeShareholderModal").trigger("click");
                  this.setPagetype(1, "type3");
                  //  this.reloadCurrentRoute();
                }
              })
              .catch((err) => { });
          }, 1000);
        } else {
          setTimeout(() => {
            $("#loaderouterid").css("display", "none");
            console.log("type2data" + success.status);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please Fill All Details!!",
            });
          }, 100);
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
  }
  getAllFieldsCEO(data: any): any {
    let that = this;
    const splitArr = data;
    let str = "";
    //console.log("data", splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      const found = content.find((element: any) => (element = "street_number"));
      if (found === "street_number") {
        that.CEOFormGroup.patchValue({ streetNumber: i.short_name });
      } else if (found === "postal_code") {
        that.CEOFormGroup.patchValue({ postCode: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            //console.log("country", i);
            that.CEOFormGroup.patchValue({
              countryOfResidence: i.long_name,
            });
          }
          if (countryArr[index] === "locality") {
            that.CEOFormGroup.patchValue({ city: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      that.CEOFormGroup.patchValue({ street: str });
    } else {
      that.CEOFormGroup.patchValue({ street: "" });
    }
  }
  getAllFieldsShareholder(data: any): any {
    let that = this;
    const splitArr = data;
    let str = "";
    //console.log("data", splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      const found = content.find((element: any) => (element = "street_number"));
      if (found === "street_number") {
        that.ShareholderFormGroup.patchValue({ streetNumber: i.short_name });
      } else if (found === "postal_code") {
        that.ShareholderFormGroup.patchValue({ postCode: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            //console.log("country", i);
            that.ShareholderFormGroup.patchValue({
              countryOfResidence: i.long_name,
            });
          }
          if (countryArr[index] === "locality") {
            that.ShareholderFormGroup.patchValue({ city: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      that.ShareholderFormGroup.patchValue({ street: str });
    } else {
      that.ShareholderFormGroup.patchValue({ street: "" });
    }
  }
  getAllFieldsOtherPerson(data: any): any {
    let that = this;
    const splitArr = data;
    let str = "";
    //console.log("data", splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      const found = content.find((element: any) => (element = "street_number"));
      if (found === "street_number") {
        that.OtherPersonFormGroup.patchValue({ streetNumber: i.short_name });
      } else if (found === "postal_code") {
        that.OtherPersonFormGroup.patchValue({ postCode: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            //console.log("country", i);
            that.OtherPersonFormGroup.patchValue({
              countryOfResidence: i.long_name,
            });
          }
          if (countryArr[index] === "locality") {
            that.OtherPersonFormGroup.patchValue({ city: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      that.OtherPersonFormGroup.patchValue({ street: str });
    } else {
      that.OtherPersonFormGroup.patchValue({ street: "" });
    }
  }
  getAllFields(data: any): any {
    let that = this;
    const splitArr = data;
    let str = "";
    //console.log("data", splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      const found = content.find((element: any) => (element = "street_number"));
      if (found === "street_number") {
        that.familyFormGroup.patchValue({ streetNumber: i.short_name });
      } else if (found === "postal_code") {
        that.familyFormGroup.patchValue({ postCode: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            //console.log("country", i);
            that.familyFormGroup.patchValue({
              countryOfResidence: i.long_name,
            });
          }
          if (countryArr[index] === "locality") {
            that.familyFormGroup.patchValue({ city: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      that.familyFormGroup.patchValue({ street: str });
    } else {
      that.familyFormGroup.patchValue({ street: "" });
    }
  }
  getAllFieldsOffice(data: any): any {
    let that = this;
    const splitArr = data;
    let str = "";
    //console.log("data", splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      const found = content.find((element: any) => (element = "street_number"));
      if (found === "street_number") {
        that.officeaddressFormGroup.patchValue({ streetNumber: i.short_name });
      } else if (found === "postal_code") {
        that.officeaddressFormGroup.patchValue({ postCode: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            //console.log("country", i);
            that.officeaddressFormGroup.patchValue({
              countryOfResidence: i.long_name,
            });
          }
          if (countryArr[index] === "locality") {
            that.officeaddressFormGroup.patchValue({ city: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      that.officeaddressFormGroup.patchValue({ street: str });
    } else {
      that.officeaddressFormGroup.patchValue({ street: "" });
    }
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

  _handleImageUpload = () => {
    console.log("apidocument");
    return new Promise(async (resolve) => {
      let that = this;

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
        document_name: "",
      };

      $("#bodydivfamily").css("display", "block");
      let pdfnew = new jsPDF("portrait", "pt", "a4");
      var width = pdfnew.internal.pageSize.width;
      pdfnew.html(document.getElementById("MyDIvfamily")!, {
        html2canvas: {
          // insert html2canvas options here, e.g.
          width: width,
        },
        callback: async function (pdfnew) {
          that.pdffile = pdfnew.output("blob");
          values.image = that.pdffile;
          values.document_type = "Allgemeines Dokument";
          values.document_sub_type = "Power of attorney";
          values.document_name = "Maklervollmacht";
          values.user_id = that.id;
          values.product_partner = " ";

          values.companycode = "42140 DFG Finanzprofi GmbH";
          values.brand = "cefima";
          values.upload_by = "cefima_document";

          values.tags.push(Math.round(that.pdffile.size / 1024));

          values.tags.push("application/pdf");
          values.tags.push(new Date().getTime());
          let data = await that.uploadDocument(values);
          console.log("apidocument" + data);

          values.tags = [];

          $("#bodydivfamily").css("display", "none");
          if (data) {
            resolve(data);
          }
        },
      });
    });
  };
  uploadDocument(values: any) {
    console.log("apidocument");
    // let length = this.filearray.length;
    $("#loaderouterid").css("display", "block");
    return new Promise(async (resolve) => {
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
      formData.append("document_name", values.document_name);
      // formData.append("created_by", values.created_by);

      if (values.image !== "") {
        formData.append("document", values.image);
      }

      this.userService
        .callApi2(formData)
        .pipe(first())
        .subscribe(
          (data) => {
            console.log("apidocument" + JSON.stringify(data));

            $("#loaderouterid").css("display", "none");
            if (data) {
              resolve(data);
            }
          },
          (error) => {
            $("#loaderouterid").css("display", "none");

            if (error) {
              resolve(true);
            }
            console.log("Error", error);
          }
        );
    });
  }
  _handleImageUploadesign = () => {
    console.log("apidocument");
    return new Promise(async (resolve: any) => {
      let that = this;

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
        document_name: "",
      };

      $("#bodydivfamilyesign").css("display", "block");
      let pdfnew = new jsPDF("portrait", "pt", "a4");
      var width = pdfnew.internal.pageSize.width;
      pdfnew.html(document.getElementById("MyDIvfamilyesign")!, {
        html2canvas: {
          // insert html2canvas options here, e.g.
          width: width,
        },
        callback: async function (pdfnew) {
          that.pdffile = pdfnew.output("blob");
          values.image = that.pdffile;
          values.document_type = "Allgemeines Dokument";
          values.document_sub_type = "Power of attorney";
          values.document_name = "Maklervollmacht";
          values.user_id = that.id;
          values.product_partner = " ";

          values.companycode = "42140 DFG Finanzprofi GmbH";
          values.brand = "cefima";
          values.upload_by = "cefima_document";
          // values.ticket_no = "40-ce-" + data;
          //values.created_by = this.id.toString()
          values.tags.push(Math.round(that.pdffile.size / 1024));
          //values.tags.push(MainType);
          // values.tags.push(Date);
          values.tags.push("application/pdf");
          values.tags.push(new Date().getTime());
          let data = await that.uploadDocument(values);
          console.log("apidocument" + data);

          values.tags = [];

          $("#bodydivfamilyesign").css("display", "none");
          if (data) {
            resolve(data);
          }
        },
      });
    });
  };
  uploadDocumentesign(values: any) {
    console.log("apidocument");
    // let length = this.filearray.length;
    $("#loaderouterid").css("display", "block");
    return new Promise(async (resolve) => {
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
      formData.append("document_name", values.document_name);
      // formData.append("created_by", values.created_by);

      if (values.image !== "") {
        formData.append("document", values.image);
      }

      this.userService
        .callApi2(formData)
        .pipe(first())
        .subscribe(
          (data) => {
            console.log("apidocument" + JSON.stringify(data));

            $("#loaderouterid").css("display", "none");
            if (data) {
              resolve(data);
            }
          },
          (error) => {
            $("#loaderouterid").css("display", "none");

            if (error) {
              resolve(true);
            }
            console.log("Error", error);
          }
        );
    });
  }
  ThirdTypeDocValue() {
    console.log("ThirdTypeDoc" + this.ThirdTypeDoc.value);
    // this.personalInfoFormGroup.patchValue({
    //   companytype: this.ThirdTypeDoc.value,
    // });
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
    console.log("neelampiu" + this.ThirdTypeDoc.value);

    this.companytypenew = this.ThirdTypeDoc.value;
    console.log("neelampiu" + this.companytypenew);

    //   if(this.companytypenew != 'Einzelunternehmen'){
    //     this.docFromGroup.get('DocThree').validator = <any>Validators.compose([Validators.required]);
    // } else {
    //     this.docFromGroup.get('DocThree').clearValidators();
    // }
    // this.docFromGroup.get('DocThree').updateValueAndValidity();
    console.log("neelampiu" + this.companytypenew);
    if (
      this.companytypenew == "Einzelunternehmen" ||
      this.companytypenew == "Eingetragener Kaufmann (e.K.)"
    ) {
      console.log("neelampiu");
      this.livingaddressFormGroup.patchValue({ title: this.title });

      this.livingaddressFormGroup.patchValue({
        firstname: this.localData.firstname,
      });
      this.livingaddressFormGroup.patchValue({
        lastname: this.localData.lastname,
      });
      this.livingaddressFormGroup.patchValue({ email: this.localData.email });
    } else {
      console.log("neelampiu");
      let taskListArrays = this.secondcompanyaddressFormGroup.get(
        "legalrepresentativeform"
      ) as FormArray;
      taskListArrays.controls[0].patchValue({
        firstname: this.localData.firstname,
        lastname: this.localData.lastname,
        title: this.title,
      });

      console.log("neelampiu");
    }
  }
  calculateType3() {
    console.log("neelampiu" + this.companytypenew,this.secondcompanyaddressFormGroup);

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
      this.type3count1 =
        parseInt(this.localData.type3.legalrepresentativeform2.length) + 3;
      console.log("type31" + this.type3count1);
      console.log(
        "type31" + this.localData.type3.legalrepresentativeform2.length
      );
    }
  }
  handleImageChangeoffice(
    event: any,
    preview: string,
    docName: string,
    idname: string
  ) {
    this.docuploaded = false;

    let that = this;
    event.preventDefault();

    $("#result").html("");
    let StringTemple;

    console.log("includenote" + this.filename);
    console.log("includenote" + docName);
    const removeData = (j: any) => {
      console.log("removeData" + j);
      console.log("removeData" + JSON.stringify(this.filearraynew.length));
      console.log("removeData" + JSON.stringify(this.filearraynew));
      console.log("removeData" + JSON.stringify(this.filearraynew[j]));
      this.filearraynew.splice(j, 1);
      console.log("removeData" + this.filearraynew);
      $("#" + idname).val("");
      console.log(this.filearraynew.length);

      console.log("dsfsfdsf");
    };
    if (this.filename.includes(docName)) {
      console.log("include");
      let index = this.filename.indexOf(docName);
      var files = event.target.files; //FileList object
      var filesLength = files.length;
      for (let i = 0; i < filesLength; i++) {
        let f = files[i];
        this.filearraynew[index] = f;
        this.filearray = this.filearraynew;

        var fileReader = new FileReader();
        //var target:EventTarget;
        let Size = this.dataconvert(f.size);
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
            f.name +
            "</b> </div><div> <b>Dateigröße: " +
            Size +
            "</b> KB </div>" +
            '   <div class="progress form-group " id="progressnew' +
            idname +
            '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
            idname +
            ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
            idname +
            '" [style.width.%]=""> </div> </div>' +
            " </div>" +
            "</div>";
          $("#" + preview).html(StringTemple);
          // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> KB </div>`).insertAfter(".pip")
          $("#removepreviewid" + preview).click(function () {
            removeData(i);
            // $("#pipremove" + i).remove();
            that.saveddoc.forEach((value: any, index: any) => {
              if (value.id == docName && value.index == idname)
                that.saveddoc.splice(index, 1);
            });
            console.log("saved array" + JSON.stringify(that.saveddoc));
            $(that).parent(".pip").remove();
          });
        };
        fileReader.readAsDataURL(f);

        const formData = new FormData();
        formData.append("document", f);
        this.userService
          .uploaddocumentwithoutticketno(formData)
          .subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                console.log("Request has been made!");

                break;
              case HttpEventType.ResponseHeader:
                console.log("Response header has been received!");
                break;
              case HttpEventType.UploadProgress:
                console.log(event.total);
                console.log(event.loaded);

                // this.progress[newsize] = Math.round(event.loaded / event.total * 100);
                $("div.percentageclass" + idname).width(
                  Math.round((event.loaded / event.total!) * 100) + "%"
                );
                $("div.percentageclass" + idname).html(
                  Math.round((event.loaded / event.total!) * 100) + "%"
                );

                break;
              case HttpEventType.Response:
                console.log("User successfully created!", event.body);

                let obj1 = this.saveddoc.find((o: any, i: any) => {
                  if (o.id == docName && o.index == idname) {
                    return true; // stop searching
                  }
                });

                if (obj1) {
                  console.log("singed array" + JSON.stringify(this.saveddoc));
                } else {
                  this.saveddoc.push({ id: docName, index: idname });

                  console.log("singed array" + JSON.stringify(this.saveddoc));
                }
                setTimeout(() => {
                  $("#progressnew" + idname).css("display", "none");
                  $("#progressnew" + idname).css("width", "0");
                  this.docuploaded = true;
                  $("div.percentageclass" + idname).width("0%");
                  $("div.percentageclass" + idname).html("");
                  this.documentid[idname] = event.body.document_unique_id;
                  // let StringTypeCasting:any = Math.round(
                  //   this.filearray[newsize].size / 1024
                  // );
                  let Size111 = f.size;
                  let StringTypeCasting = this.dataconvert(Size111);
                  let typeofimage = f.type;
                  let dateofdocument = f.lastModified;
                  let tags = [];
                  let newtage =
                    StringTypeCasting +
                    "," +
                    typeofimage +
                    "," +
                    dateofdocument;
                  tags.push(newtage);
                  let document_name = "";

                  this.documentlist[idname] = {
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
                    created_by: this.id,
                  };
                  console.log(
                    "documentlist" + JSON.stringify(this.documentlist)
                  );
                  //  if(this.documentid[1]!='' && this.documentid[0]!=''  && this.documentid[2]!='')
                  //  {
                  //   this.personalInfoFormGroup.patchValue({
                  //     allupload:"0,00"
                  //    });

                  //   this.allupload=true;
                  //  }
                }, 1500);
            }
          });
      }
    } else {
      console.log("includenote");
      var files = event.target.files; //FileList object
      // var output = document.getElementById("result");
      console.log("events" + event.target.files);
      var filesLength = files.length;

      for (let i = 0; i < filesLength; i++) {
        let f = files[i];
        this.filearraynew.push(f);
        this.filename.push(docName);
        this.filearray = this.filearraynew;

        var fileReader = new FileReader();
        //var target:EventTarget;
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

          let Size = Math.round(f.size / 1024);
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
            f.name +
            "</b> </div><div> <b>Dateigröße: " +
            Size +
            "</b> KB </div>" +
            '   <div class="progress form-group " id="progressnew' +
            idname +
            '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
            idname +
            ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
            idname +
            '" [style.width.%]=""> </div> </div>' +
            " </div>" +
            "</div>";
          $("#" + preview).html(StringTemple);
          // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> KB </div>`).insertAfter(".pip")
          $("#removepreviewid" + preview).click(function () {
            removeData(i);

            // $("#pipremove" + i).remove();
            $(that).parent(".pip").remove();
            that.saveddoc.forEach((value: any, index: any) => {
              if (value.id == docName && value.index == idname)
                that.saveddoc.splice(index, 1);
            });

            console.log("saved array" + JSON.stringify(that.saveddoc));
          });
        };
        fileReader.readAsDataURL(f);

        const formData = new FormData();
        formData.append("document", f);
        this.userService
          .uploaddocumentwithoutticketno(formData)
          .subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                console.log("Request has been made!");

                break;
              case HttpEventType.ResponseHeader:
                console.log("Response header has been received!");
                break;
              case HttpEventType.UploadProgress:
                console.log(event.total);
                console.log(event.loaded);

                // this.progress[newsize] = Math.round(event.loaded / event.total * 100);
                $("div.percentageclass" + idname).width(
                  Math.round((event.loaded / event.total!) * 100) + "%"
                );
                $("div.percentageclass" + idname).html(
                  Math.round((event.loaded / event.total!) * 100) + "%"
                );

                break;
              case HttpEventType.Response:
                console.log("User successfully created!", event.body);

                let obj1 = this.saveddoc.find((o: any, i: any) => {
                  if (o.id == docName && o.index == idname) {
                    return true; // stop searching
                  }
                });

                if (obj1) {
                  console.log("singed array" + JSON.stringify(this.saveddoc));
                } else {
                  this.saveddoc.push({ id: docName, index: idname });

                  console.log("singed array" + JSON.stringify(this.saveddoc));
                }
                setTimeout(() => {
                  $("#progressnew" + idname).css("display", "none");
                  $("#progressnew" + idname).css("width", "0");
                  this.docuploaded = true;
                  $("div.percentageclass" + idname).width("0%");
                  $("div.percentageclass" + idname).html("");
                  this.documentid[idname] = event.body.document_unique_id;
                  // let StringTypeCasting:any = Math.round(
                  //   this.filearray[newsize].size / 1024
                  // );
                  let Size111 = f.size;
                  let StringTypeCasting = this.dataconvert(Size111);
                  let typeofimage = f.type;
                  let dateofdocument = f.lastModified;
                  let tags = [];
                  let newtage =
                    StringTypeCasting +
                    "," +
                    typeofimage +
                    "," +
                    dateofdocument;
                  tags.push(newtage);
                  let document_name = "";

                  this.documentlist[idname] = {
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
                    created_by: this.id,
                  };
                  console.log(
                    "documentlist" + JSON.stringify(this.documentlist)
                  );
                }, 1500);
            }
          });
      }
    }
    console.log(this.filearray);
  }
  _handleImageUploaddoc = async () => {
    console.log("_handleImageUploaddoc" + this.uploadfile);
    return new Promise(async (resolve) => {
      console.log("_handleImageUploaddoc" + this.id);
      let documentdata: any = [];
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
        document_name: "",
      };
      console.log("_handleImageUploaddoc" + JSON.stringify(this.filearray));

      for (let i = 0; i < this.filearray.length; i++) {
        console.log("_handleImageUploaddoc" + this.uploadfile);
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

        // tagssize.push({ size: Math.round(this.filearray[i].size / 1024) });
        values.tags.push(StringTypeCasting.toString());
        values.tags.push(MainType);
        values.tags.push(Date);
        console.log("_handleImageUploaddoc" + JSON.stringify(values));
        let result = await this.uploadDocumentdoc(values, i);
        console.log("_handleImageUploaddoc" + JSON.stringify(result));
        if (result) {
          documentdata.push(result);
        }

        values.tags = [];
        console.log(values);
        console.log("_handleImageUploaddoc" + this.uploadfile);
      }
      // $(".pip").remove();

      this.filearraynew = [];
      resolve(documentdata);
    });
  };
  uploadDocumentdoc(values: any, index: any) {
    console.log("_handleImageUploaddoc" + this.uploadfile);
    return new Promise(async (resolve) => {
      let length = this.filearray.length;
      console.log("_handleImageUploaddoc" + length + " " + index);
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

      if (values.image !== "") {
        formData.append("document", values.image);
      }
      console.log("_handleImageUploaddoc" + JSON.stringify(formData));
      // this.UploadDone = true;
      this.userService
        .callApi2(formData)
        .pipe(first())
        .subscribe(
          (data) => {
            console.log(length, index);
            console.log(
              "_handleImageUploaddocPOST Request is successful " +
              JSON.stringify(data)
            );
            if (length == index + 1) {
              console.log(
                "_handleImageUploaddocsaveonnext" + length + " " + index
              );
            }

            $("#Success").html(`<div class="alert alert-success" role="alert">
            Erfolgreich hochgeladen
          </div>`);
            $("#Success").css("text-align", "center");
            $("#Success").css("font-size", "30px");
            console.log(
              "_handleImageUploaddocPOST Request is successful " +
              JSON.stringify(data)
            );
            resolve(data);
          },
          (error) => {
            $("#loaderouterid").css("display", "none");
            // this.UploadError = true;
            console.log("Error", error["error"]);
          },
          () => { }
        );
    });
  }

  async handleImageChangecustomer(
    event: any,
    preview: string,
    docName: string,
    idname: string,
    dynamicceo = ""
  ) {
    console.log("check localdata");
    console.log(this.localData);
    console.log(this.legalrepresentativeform());
    console.log(this.legalrepresentativeform2());

    console.log("check previewid value");
    console.log(this.preview_id);


    console.log('event:',event);
    console.log('preview:',preview);
    console.log('docName:',docName);
    console.log('idname:',idname);
    console.log('dynamicceo:',dynamicceo);
    

    this.docuploaded = false;
    //this.showfifthstepsuccess=false;
    let that = this;
    event.preventDefault();

    $("#result").html("");
    let StringTemple;
    this.showButton = true;
    console.log("includenote" + this.filename);
    console.log("includenote" + docName);

    const previewData = (j: any, modaltitle: any, src: any) => {
      console.log("previewData" + j);

      console.log("the source");
      console.log(this.previewidandsrc.length);
      console.log(this.previewidandsrc[j]);

      $("#openpreviewmodel").trigger("click");

      //$('#showpreviewpdf').attr('src',this.previewidandsrc[j]);

      $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + modaltitle);

      //$('#showpreviewdownload').attr('href',this.previewidandsrc[j]);
      $("#showpreviewdownload").attr("href", src);

      //if(this.previewidandsrc[j].indexOf('data:application/pdf;') != -1){
      if (src.indexOf("data:application/pdf;") != -1) {
        $("#showpreviewimg").attr("src", "");
        $("#showpreviewimg").css("display", "none");

        $("#showpreviewpdf").attr("src", "");
        $("#showpreviewpdf").css("display", "block");
        //$('#showpreviewpdf').attr('src',this.previewidandsrc[j]);
        $("#showpreviewpdf").attr("src", src);
      } else {
        $("#showpreviewpdf").attr("src", "");
        $("#showpreviewpdf").css("display", "none");

        $("#showpreviewimg").attr("src", "");
        $("#showpreviewimg").css("display", "block");
        // $('#showpreviewimg').attr('src',this.previewidandsrc[j]);
        $("#showpreviewimg").attr("src", src);
      }
    };

    const removeData = (j: number) => {
      console.log("removeData" + j);
      console.log("removeData" + JSON.stringify(this.filearraynew.length));
      console.log("removeData" + JSON.stringify(this.filearraynew));
      console.log("removeData" + JSON.stringify(this.filearraynew[j]));

      console.log("removeData" + JSON.stringify(this.filename));
      console.log("removeData" + JSON.stringify(this.filename.length));

      this.filearraynew.splice(j, 1);

      this.filename.splice(j, 1);

      console.log("after removed Data");
      console.log(this.filearraynew);
      console.log("filenames");
      console.log(this.filename);
      console.log('idname:',idname)
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

      for (let i = 0; i < filesLength; i++) {
        //this.document_progressbar+=1;

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

          that.previewidandsrc[that.preview_id] = that.previewsrc;

          let displayName = docName;

          let showname = "";
          if (docName == "Ausweisdokument Vertretungsberechtigte Person") {
            let running_number = 0;
            for (
              let doc_count = 0;
              doc_count < that.saveddoc.length;
              doc_count++
            ) {
              if (
                that.saveddoc[doc_count].id ==
                "Ausweisdokument Vertretungsberechtigte Person"
              ) {
                running_number += 1;
              }
            }

            if (
              that.companytypenew != "Einzelunternehmen" &&
              that.companytypenew != "Eingetragener Kaufmann (e.K.)"
            ) {
              if (running_number == 0) {
                displayName =
                  "Ausweisdokument Vertretungsberechtigte Person: " +
                  that.secondcompanyaddressFormGroup.controls[
                    "legalrepresentativeform"
                  ].value[0].firstname +
                  " " +
                  that.secondcompanyaddressFormGroup.controls[
                    "legalrepresentativeform"
                  ].value[0].lastname;
              } else {
                displayName =
                  "Ausweisdokument Vertretungsberechtigte Person: " +
                  that.secondcompanyaddressFormGroup.controls[
                    "legalrepresentativeform"
                  ].value[0].firstname +
                  " " +
                  that.secondcompanyaddressFormGroup.controls[
                    "legalrepresentativeform"
                  ].value[0].lastname +
                  "-" +
                  running_number;
              }

              showname = displayName;
            } else if (
              that.companytypenew == "Einzelunternehmen" ||
              that.companytypenew == "Eingetragener Kaufmann (e.K.)"
            ) {
              if (running_number == 0) {
                displayName =
                  "Ausweisdokument Vertretungsberechtigte Person: " +
                  that.livingaddressFormGroup.value.firstname +
                  that.livingaddressFormGroup.value.lastname;
              } else {
                displayName =
                  "Ausweisdokument Vertretungsberechtigte Person: " +
                  that.livingaddressFormGroup.value.firstname +
                  that.livingaddressFormGroup.value.lastname +
                  "-" +
                  running_number;
              }

              showname = displayName;
            }
          } else if (docName == "Geschäftsanmeldung") {
            let running_number = 0;
            for (
              let doc_count = 0;
              doc_count < that.saveddoc.length;
              doc_count++
            ) {
              if (that.saveddoc[doc_count].id == "Geschäftsanmeldung") {
                running_number += 1;
              }
            }

            if (running_number == 0) {
              showname =
                "Gewerbeanmeldung Der " +
                that.addressFormGroupnew.controls["companyname"].value;
            } else {
              showname =
                "Gewerbeanmeldung Der " +
                that.addressFormGroupnew.controls["companyname"].value +
                "-" +
                running_number;
            }
            displayName =
              "Geschäftsanmeldung Der " +
              that.addressFormGroupnew.controls["companyname"].value;
          } else if (docName == "Aktueller Auszug aus dem Handelsregister") {
            let running_number = 0;
            for (
              let doc_count = 0;
              doc_count < that.saveddoc.length;
              doc_count++
            ) {
              if (
                that.saveddoc[doc_count].id ==
                "Aktueller Auszug aus dem Handelsregister"
              ) {
                running_number += 1;
              }
            }

            if (running_number == 0) {
              displayName =
                "Aktueller Auszug aus dem Handelsregister Der " +
                that.addressFormGroupnew.controls["companyname"].value;
            } else {
              displayName =
                "Aktueller Auszug aus dem Handelsregister Der " +
                that.addressFormGroupnew.controls["companyname"].value +
                "-" +
                running_number;
            }

            showname = displayName;
          } else {
            let running_number = 0;
            for (
              let doc_count = 0;
              doc_count < that.saveddoc.length;
              doc_count++
            ) {
              if (that.saveddoc[doc_count].id == docName) {
                running_number += 1;
              }
            }

            if (running_number == 0) {
              displayName =
                "Ausweisdokument Vertretungsberechtigte Person: " + dynamicceo;
            } else {
              displayName =
                "Ausweisdokument Vertretungsberechtigte Person: " +
                dynamicceo +
                "-" +
                running_number;
            }

            showname = displayName;
          }
          
          console.log("see times");
          console.log(that.previewsrc);
          console.log("ends here");

          if (
            showname ==
            "Gewerbeanmeldung Der " +
            that.addressFormGroupnew.controls["companyname"].value
          ) {
            StringTemple =
              '<div class="pip row" style="margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +
              '<div class="col-md-1">' +
              '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
              ImageName +
              '" title="' +
              f.name +
              '"/>' +
              "</div>" +
              '<div class="col-md-10" style="font-size:14px;">' +
              //'<span><b>Dokumentenname: ' + displayName +'</b></span>' +
              "<span><b>Dokumentenname: " +
              showname +
              "</b></span>" +
              "<span><b>Dateigröße: " +
              Size +
              "</b></span>" +
              "</div>" +
              '<div class="col-md-1" style="margin-left:-20px;">' +
              '<div class="removepreview" data-preview_id="' +
              that.preview_id +
              '" id="removepreviewid' +
              that.preview_id +
              '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
              ' <div class="previewImage" data-preview_src="' +
              that.previewsrc +
              '" data-preview_id="' +
              that.preview_id +
              '" id="previewimage' +
              that.preview_id +
              '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 5px;margin-right: 0 !important;cursor: pointer;">' +
              '<i class="fa fa-eye" aria-hidden="true"></i></div>' +
              "</div>" +
              '<div class="col-md-12">' +
              '<div class="progress form-group progressnew' +
              Size_num +
              i +
              '" id="progressnew' +
              Size_num +
              i +
              '" style="background-color: grey;width: 100%;">' +
              '<div class="percentageclass' +
              Size_num +
              i +
              ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
              Size_num +
              i +
              '" [style.width.%]=""> </div>' +
              "</div>" +
              "</div>" +
              "</div>";
          } else {
            StringTemple =
              '<div class="pip row" style="margin-top:10px;border-bottom: 1px solid silver;padding-bottom: 5px;">' +
              '<div class="col-md-1">' +
              '<img class="imageThumb" style="height:30px;width:350%;cursor:pointer;" src="' +
              ImageName +
              '" title="' +
              f.name +
              '"/>' +
              "</div>" +
              '<div class="col-md-10" style="font-size:13.5px;">' +
              //'<span><b>Dokumentenname: ' + displayName +'</b></span>' +
              "<span><b>Dokumentenname: " +
              showname +
              "</b></span>" +
              "<span><b>Dateigröße: " +
              Size +
              "</b></span>" +
              "</div>" +
              '<div class="col-md-1" style="margin-left:-20px;">' +
              '<div class="removepreview" data-preview_id="' +
              that.preview_id +
              '" id="removepreviewid' +
              that.preview_id +
              '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 11px; text-align: center; padding: 3px;color: white;position: absolute;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
              ' <div class="previewImage" data-preview_src="' +
              that.previewsrc +
              '" data-preview_id="' +
              that.preview_id +
              '" id="previewimage' +
              that.preview_id +
              '" style="background: #184297;border-radius: 50%;width:20px;height:20px;font-size: 10px; text-align: center;color: white; padding: 3px;position: absolute;margin-top: 5px;margin-right: 0 !important;cursor: pointer;">' +
              '<i class="fa fa-eye" aria-hidden="true"></i></div>' +
              "</div>" +
              '<div class="col-md-12">' +
              '<div class="progress form-group progressnew' +
              Size_num +
              i +
              '" id="progressnew' +
              Size_num +
              i +
              '" style="background-color: grey;width: 100%;">' +
              '<div class="percentageclass' +
              Size_num +
              i +
              ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
              Size_num +
              i +
              '" [style.width.%]=""> </div>' +
              "</div>" +
              "</div>" +
              "</div>";
          }

          //$("#" + preview).html(StringTemple);
          $("#" + preview).append(StringTemple);
          // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> KB </div>`).insertAfter(".pip")

          console.log("inside if handleimagechange");
          console.log(that.filearray);
          console.log("saveddoc if");
          console.log(that.saveddoc);

          $(".previewImage").click(function (event: any) {
            //previewData($(this).data('preview_id'),displayName);
            previewData(
              $(that).data("preview_id"),
              showname,
              $(that).data("preview_src")
            );
            event.stopPropagation();
            event.stopImmediatePropagation();
          });

          $(".removepreview").click(function (event: any) {
            removeData(i);

              console.log(i)
            that.saveddoc.forEach((value: any, index: any) => {
              //if(value.id == docName && value.index == idname) that.saveddoc.splice(index,1);

              if (idname.indexOf("DocOne") != -1) {
                if (
                  value.id == docName &&
                  value.index == "DocOne" + $(that).data("preview_id")
                )
                  that.saveddoc.splice(index, 1);
              } else if (idname.indexOf("DocTwo") != -1) {
                if (
                  value.id == docName &&
                  value.index == "DocTwo" + $(that).data("preview_id")
                )
                  that.saveddoc.splice(index, 1);
              } else if (idname.indexOf("DocThree") != -1) {
                if (
                  value.id == docName &&
                  value.index == "DocThree" + $(that).data("preview_id")
                )
                  that.saveddoc.splice(index, 1);
              }
            });

            if (that.localData.hasOwnProperty("companytype")) {
              if (
                that.localData.companytype == "Einzelunternehmen" ||
                that.localData.companytype == "Eingetragener Kaufmann (e.K.)"
              ) {
              } else {
                //let ceo_length = that.localData.type1.legalrepresentativeform.length;
                //let shareholder_length = that.localData.type3.legalrepresentativeform2.length;

                let ceo_length = that.legalrepresentativeform().value.length;
                let shareholder_length =
                  that.legalrepresentativeform2().value.length;

                let doc_check = false;

                let ceo_done = 0;
                let shareholder_done = 0;
                let geschaft_done = 0;
                let akt_done = 0;

                if (that.saveddoc.length > 0) {
                  for (
                    let doc_length = 0;
                    doc_length < that.saveddoc.length;
                    doc_length++
                  ) {
                    let temp_ceo_length = parseInt(ceo_length) - 1;
                    if (
                      ceo_length > 1 &&
                      that.saveddoc[doc_length].id ==
                      "Ausweisdokument Vertretungsberechtigte Person" +
                      temp_ceo_length
                    ) {
                      ceo_done = 1;
                    } else if (
                      ceo_length == 1 &&
                      that.saveddoc[doc_length].id ==
                      "Ausweisdokument Vertretungsberechtigte Person"
                    ) {
                      ceo_done = 1;
                    }

                    if (that.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                      geschaft_done = 1;
                    }

                    if (
                      that.saveddoc[doc_length].id ==
                      "Aktueller Auszug aus dem Handelsregister"
                    ) {
                      akt_done = 1;
                    }
                  }

                  for (
                    let share_doc_length = 0;
                    share_doc_length <
                    that.legalrepresentativeform2().value.length;
                    share_doc_length++
                  ) {
                    for (
                      let doc_length = 0;
                      doc_length < that.signeddoc.length;
                      doc_length++
                    ) {
                      if (
                        that.signeddoc[doc_length].docname ==
                        that.legalrepresentativeform2().value[share_doc_length]
                          .firstname +
                        " " +
                        that.legalrepresentativeform2().value[
                          share_doc_length
                        ].lastname
                      ) {
                        shareholder_done += 1;
                        break;
                      }
                    }
                  }

                  if (
                    ceo_done == 1 &&
                    shareholder_done >= shareholder_length &&
                    geschaft_done == 1 &&
                    akt_done == 1
                  ) {
                    that.disableddocumentgmbh = false;
                  } else {
                    that.disableddocumentgmbh = true;
                  }
                }

                if (that.documents.length > 0) {
                  for (
                    let doc_length = 0;
                    doc_length < that.documents.length;
                    doc_length++
                  ) {
                    let temp_ceo_length = parseInt(ceo_length) - 1;
                    if (
                      ceo_length > 1 &&
                      that.documents[doc_length].element.document_name ==
                      "Ausweisdokument Vertretungsberechtigte Person" +
                      temp_ceo_length
                    ) {
                      ceo_done = 1;
                    } else if (
                      ceo_length == 1 &&
                      that.documents[doc_length].element.document_name ==
                      "Ausweisdokument Vertretungsberechtigte Person"
                    ) {
                      ceo_done = 1;
                    }

                    for (
                      let share_doc_length = 0;
                      share_doc_length <
                      that.legalrepresentativeform2().value.length;
                      share_doc_length++
                    ) {
                      if (
                        that.documents[doc_length].element.document_name ==
                        "Upload Ausweisdokument " +
                        that.legalrepresentativeform2().value[
                          share_doc_length
                        ].firstname +
                        " " +
                        that.legalrepresentativeform2().value[
                          share_doc_length
                        ].lastname
                      ) {
                        shareholder_done += 1;
                      }
                    }

                    if (
                      that.documents[doc_length].element.document_name ==
                      "Geschäftsanmeldung"
                    ) {
                      geschaft_done = 1;
                    }

                    if (
                      that.documents[doc_length].element.document_name ==
                      "Aktueller Auszug aus dem Handelsregister"
                    ) {
                      akt_done = 1;
                    }
                  }

                  if (
                    ceo_done == 1 &&
                    shareholder_done >= shareholder_length &&
                    geschaft_done == 1 &&
                    akt_done
                  ) {
                    that.disableddocumentgmbh = false;
                  } else {
                    that.disableddocumentgmbh = true;
                  }
                }
              }
            }

            $(this).parent().parent().parent(".pip").remove();
            console.log("saved array" + JSON.stringify(that.saveddoc));
            // $(this).parent(".pip").remove();
            event.stopPropagation();
            event.stopImmediatePropagation();
          });
        };

        fileReader.readAsDataURL(f);

        const formData = new FormData();
        formData.append("document", f);
        this.userService
          .uploaddocumentwithoutticketno(formData)
          .subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                console.log("Request has been made!");

                break;
              case HttpEventType.ResponseHeader:
                console.log("Response header has been received!");
                break;
              case HttpEventType.UploadProgress:
                console.log(event.total);
                console.log(event.loaded);

                $("div.percentageclass" + Size_num + i).width(
                  Math.round((event.loaded / event.total!) * 100) + "%"
                );
                $("div.percentageclass" + Size_num + i).html(
                  Math.round((event.loaded / event.total!) * 100) + "%"
                );

                break;
              case HttpEventType.Response:
                console.log("User successfully created!", event.body);

                let obj1 = this.saveddoc.find((o: any, i: any) => {
                  //if (o.id == docName && o.index == idname) {
                  let indexx;
                  if (idname.indexOf("DocOne") != -1) {
                    indexx = "DocOne" + that.preview_id;
                  } else if (idname.indexOf("DocTwo") != -1) {
                    indexx = "DocTwo" + that.preview_id;
                  } else if (idname.indexOf("DocThree") != -1) {
                    indexx = "DocThree" + that.preview_id;
                  }

                  if (o.id == docName && o.index == indexx) {
                    return true; // stop searching
                  }
                });

                //if(obj1){
                if (false) {
                  console.log("singed array" + JSON.stringify(this.saveddoc));
                } else {
                  //this.saveddoc.push({ id: docName , index: idname });

                  let indexx;
                  if (idname.indexOf("DocOne") != -1) {
                    indexx = "DocOne" + that.preview_id;
                  } else if (idname.indexOf("DocTwo") != -1) {
                    indexx = "DocTwo" + that.preview_id;
                  } else if (idname.indexOf("DocThree") != -1) {
                    indexx = "DocThree" + that.preview_id;
                  }

                  let Size111 = f.size;
                  let StringTypeCasting = this.dataconvert(Size111);
                  let typeofimage = f.type;
                  let dateofdocument = f.lastModified;
                  let tags = [];
                  let newtage =
                    StringTypeCasting +
                    "," +
                    typeofimage +
                    "," +
                    dateofdocument;
                  tags.push(newtage);

                  this.saveddoc.push({
                    id: docName,
                    index: indexx,
                    tags: tags,
                    document_unique_id: event.body.document_unique_id,
                  });

                  console.log("photo saved doc");
                  console.log(this.saveddoc);

                  console.log("localdata here");
                  console.log(this.localData);

                  if (this.localData.hasOwnProperty("companytype")) {
                    if (
                      this.localData.companytype == "Einzelunternehmen" ||
                      this.localData.companytype ==
                      "Eingetragener Kaufmann (e.K.)"
                    ) {
                    } else {
                      // let ceo_length = this.localData.type1.legalrepresentativeform.length;
                      // let shareholder_length = this.localData.type3.legalrepresentativeform2.length;

                      let ceo_length =
                        that.legalrepresentativeform().value.length;
                      let shareholder_length =
                        that.legalrepresentativeform2().value.length;

                      let doc_check = false;

                      let ceo_done = 0;
                      let shareholder_done = 0;
                      let geschaft_done = 0;
                      let akt_done = 0;

                      if (this.saveddoc.length > 0) {
                        for (
                          let doc_length = 0;
                          doc_length < this.saveddoc.length;
                          doc_length++
                        ) {
                          let temp_ceo_length = parseInt(ceo_length) - 1;
                          if (
                            ceo_length > 1 &&
                            this.saveddoc[doc_length].id ==
                            "Ausweisdokument Vertretungsberechtigte Person" +
                            temp_ceo_length
                          ) {
                            ceo_done = 1;
                          } else if (
                            ceo_length == 1 &&
                            this.saveddoc[doc_length].id ==
                            "Ausweisdokument Vertretungsberechtigte Person"
                          ) {
                            ceo_done = 1;
                          }

                          if (
                            this.saveddoc[doc_length].id == "Geschäftsanmeldung"
                          ) {
                            geschaft_done = 1;
                          }

                          if (
                            this.saveddoc[doc_length].id ==
                            "Aktueller Auszug aus dem Handelsregister"
                          ) {
                            akt_done = 1;
                          }
                        }

                        for (
                          let share_doc_length = 0;
                          share_doc_length <
                          this.legalrepresentativeform2().value.length;
                          share_doc_length++
                        ) {
                          for (
                            let doc_length = 0;
                            doc_length < this.signeddoc.length;
                            doc_length++
                          ) {
                            if (
                              this.signeddoc[doc_length].docname ==
                              this.legalrepresentativeform2().value[
                                share_doc_length
                              ].firstname +
                              " " +
                              this.legalrepresentativeform2().value[
                                share_doc_length
                              ].lastname
                            ) {
                              shareholder_done += 1;
                              break;
                            }
                          }
                        }

                        if (
                          ceo_done == 1 &&
                          shareholder_done >= shareholder_length &&
                          geschaft_done == 1 &&
                          akt_done == 1
                        ) {
                          this.disableddocumentgmbh = false;
                        } else {
                          this.disableddocumentgmbh = true;
                        }
                      }

                      if (this.documents.length > 0) {
                        for (
                          let doc_length = 0;
                          doc_length < this.documents.length;
                          doc_length++
                        ) {
                          let temp_ceo_length = parseInt(ceo_length) - 1;
                          if (
                            ceo_length > 1 &&
                            this.documents[doc_length].element.document_name ==
                            "Ausweisdokument Vertretungsberechtigte Person" +
                            temp_ceo_length
                          ) {
                            ceo_done = 1;
                          } else if (
                            ceo_length == 1 &&
                            this.documents[doc_length].element.document_name ==
                            "Ausweisdokument Vertretungsberechtigte Person"
                          ) {
                            ceo_done = 1;
                          }

                          for (
                            let share_doc_length = 0;
                            share_doc_length <
                            this.legalrepresentativeform2().value.length;
                            share_doc_length++
                          ) {
                            if (
                              this.documents[doc_length].element
                                .document_name ==
                              "Upload Ausweisdokument " +
                              this.legalrepresentativeform2().value[
                                share_doc_length
                              ].firstname +
                              " " +
                              this.legalrepresentativeform2().value[
                                share_doc_length
                              ].lastname
                            ) {
                              shareholder_done += 1;
                            }
                          }

                          if (
                            this.documents[doc_length].element.document_name ==
                            "Geschäftsanmeldung"
                          ) {
                            geschaft_done = 1;
                          }

                          if (
                            this.documents[doc_length].element.document_name ==
                            "Aktueller Auszug aus dem Handelsregister"
                          ) {
                            akt_done = 1;
                          }
                        }

                        if (
                          ceo_done == 1 &&
                          shareholder_done >= shareholder_length &&
                          geschaft_done == 1 &&
                          akt_done
                        ) {
                          this.disableddocumentgmbh = false;
                          doc_check = false;
                        } else {
                          this.disableddocumentgmbh = true;
                          doc_check = true;
                        }
                      }
                    }
                  }

                  console.log("singed array" + JSON.stringify(this.saveddoc));
                }
                setTimeout(() => {
                  this.docuploaded = true;

                  $(".progressnew" + Size_num + i).css("display", "none");
                  $(".progressnew" + Size_num + i).css("width", "0");
                  $("div.percentageclass" + Size_num + i).width("0%");
                  $("div.percentageclass" + Size_num + i).html("");

                  //this.documentid[idname]=event.body.document_unique_id;

                  let indexx: any;
                  if (idname.indexOf("DocOne") != -1) {
                    indexx = "DocOne" + that.preview_id;
                  } else if (idname.indexOf("DocTwo") != -1) {
                    indexx = "DocTwo" + that.preview_id;
                  } else if (idname.indexOf("DocThree") != -1) {
                    indexx = "DocThree" + that.preview_id;
                  }

                  this.documentid[indexx] = event.body.document_unique_id;

                  let Size111 = f.size;
                  let StringTypeCasting = this.dataconvert(Size111);
                  let typeofimage = f.type;
                  let dateofdocument = f.lastModified;
                  let tags = [];
                  let newtage =
                    StringTypeCasting +
                    "," +
                    typeofimage +
                    "," +
                    dateofdocument;
                  tags.push(newtage);
                  let document_name = "";

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
                    created_by: this.id,
                  };

                  console.log("documentlist");
                  console.log(this.documentlist);

                  this.preview_id += 1;
                }, 500);
            }
          });
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

        //this.document_progressbar += 1;

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

          that.previewidandsrc[that.preview_id] = that.previewsrc;

          let displayName = docName;

          let showname = "";
          if (docName == "Ausweisdokument Vertretungsberechtigte Person") {
            let running_number = 0;
            for (
              let doc_count = 0;
              doc_count < that.saveddoc.length;
              doc_count++
            ) {
              if (
                that.saveddoc[doc_count].id ==
                "Ausweisdokument Vertretungsberechtigte Person"
              ) {
                running_number += 1;
              }
            }

            if (
              that.companytypenew != "Einzelunternehmen" &&
              that.companytypenew != "Eingetragener Kaufmann (e.K.)"
            ) {
              if (running_number == 0) {
                displayName =
                  "Ausweisdokument Vertretungsberechtigte Person: " +
                  that.secondcompanyaddressFormGroup.controls[
                    "legalrepresentativeform"
                  ].value[0].firstname +
                  " " +
                  that.secondcompanyaddressFormGroup.controls[
                    "legalrepresentativeform"
                  ].value[0].lastname;
              } else {
                displayName =
                  "Ausweisdokument Vertretungsberechtigte Person: " +
                  that.secondcompanyaddressFormGroup.controls[
                    "legalrepresentativeform"
                  ].value[0].firstname +
                  " " +
                  that.secondcompanyaddressFormGroup.controls[
                    "legalrepresentativeform"
                  ].value[0].lastname +
                  "(" +
                  running_number +
                  ")";
              }

              showname = displayName;
            } else if (
              that.companytypenew == "Einzelunternehmen" ||
              that.companytypenew == "Eingetragener Kaufmann (e.K.)"
            ) {
              if (running_number == 0) {
                displayName =
                  "Ausweisdokument Vertretungsberechtigte Person: " +
                  that.livingaddressFormGroup.value.firstname +
                  that.livingaddressFormGroup.value.lastname;
              } else {
                displayName =
                  "Ausweisdokument Vertretungsberechtigte Person: " +
                  that.livingaddressFormGroup.value.firstname +
                  that.livingaddressFormGroup.value.lastname +
                  "(" +
                  running_number +
                  ")";
              }

              showname = displayName;
            }
          } else if (docName == "Geschäftsanmeldung") {
            let running_number = 0;
            for (
              let doc_count = 0;
              doc_count < that.saveddoc.length;
              doc_count++
            ) {
              if (that.saveddoc[doc_count].id == "Geschäftsanmeldung") {
                running_number += 1;
              }
            }

            if (running_number == 0) {
              showname =
                "Gewerbeanmeldung Der " +
                that.addressFormGroupnew.controls["companyname"].value;
            } else {
              showname =
                "Gewerbeanmeldung Der " +
                that.addressFormGroupnew.controls["companyname"].value +
                "(" +
                running_number +
                ")";
            }
            displayName =
              "Geschäftsanmeldung Der " +
              that.addressFormGroupnew.controls["companyname"].value;
          } else if (docName == "Aktueller Auszug aus dem Handelsregister") {
            let running_number = 0;
            for (
              let doc_count = 0;
              doc_count < that.saveddoc.length;
              doc_count++
            ) {
              if (
                that.saveddoc[doc_count].id ==
                "Aktueller Auszug aus dem Handelsregister"
              ) {
                running_number += 1;
              }
            }

            if (running_number == 0) {
              displayName =
                "Aktueller Auszug aus dem Handelsregister Der " +
                that.addressFormGroupnew.controls["companyname"].value;
            } else {
              displayName =
                "Aktueller Auszug aus dem Handelsregister Der " +
                that.addressFormGroupnew.controls["companyname"].value +
                "(" +
                running_number +
                ")";
            }

            showname = displayName;
          } else {
            let running_number = 0;
            for (
              let doc_count = 0;
              doc_count < that.saveddoc.length;
              doc_count++
            ) {
              if (that.saveddoc[doc_count].id == docName) {
                running_number += 1;
              }
            }

            if (running_number == 0) {
              displayName =
                "Ausweisdokument Vertretungsberechtigte Person: " + dynamicceo;
            } else {
              displayName =
                "Ausweisdokument Vertretungsberechtigte Person: " +
                dynamicceo +
                "(" +
                running_number +
                ")";
            }

            showname = displayName;
          }

          console.log("see times in else");
          console.log(that.previewsrc);
          console.log("ends here");
          console.log("showname:",showname);

          debugger

          if (
            showname ==
            "Gewerbeanmeldung Der " +
            that.addressFormGroupnew.controls["companyname"].value
          ) {
            StringTemple =
              '<div class="pip d-flex flex-column col-md-12 p-0" style="margin-top:10px;border: 1px solid silver;border-radius: 9px;">' +
              '<div class="d-flex flex-row col-md-12 p-0">' +
              '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center">' +
              '<img class="imageThumb" style="width: 50px;height:30px;" src="' +
              ImageName +
              '" title="' +
              f.name +
              '"/>' +
              "</div>" +
              '<div class="col-md-8 d-flex justify-content-center flex-column p-0" style="font-size:11px; padding:1px" style="font-size:14px;">' +
              "<span><b>Dokumentenname: " +
              showname +
              "</b></span>" +
              "<span><b>Dateigröße: " +
              Size +
              "</b></span>" +
              "</div>" +
              '<div class="col-md-2 text-right d-flex flex-column px-0 py-1 align-items-center justify-content-center " >' +
              '<div class="removepreview btn bg-danger links mt-1" data-preview_id="' +
              that.preview_id +
              '" id="removepreviewid' +
              that.preview_id +
              '" style="cursor: pointer;padding:1px 4px" ><i class="fas fa-times text-white "  aria-hidden="true"></i></div>' +
              ' <div class="previewImage btn links mt-1 " data-preview_src="' +
              that.previewsrc +
              '" data-preview_id="' +
              that.preview_id +
              '" id="previewimage' +
              that.preview_id +
              '" style="cursor: pointer; background: linear-gradient(#17459b, #02a9ed);padding:1px ">' +
              '<i class="fa fa-eye" aria-hidden="true"></i></div>' +
              "</div>" +
              "</div>" +

              '<div class="col-md-12">' +
              '<div class="progress form-group progressnew' +
              Size_num +
              i +
              '" id="progressnew' +
              Size_num +
              i +
              '" style="background-color: grey;width: 100%;">' +
              '<div class="percentageclass' +
              Size_num +
              i +
              ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
              Size_num +
              i +
              '" [style.width.%]=""> </div>' +
              "</div>" +
              "</div>" +
              "</div>";
          } else {
            StringTemple =
            '<div class="pip d-flex flex-column col-md-12 p-0" style="margin-top:10px;border: 1px solid silver;border-radius: 9px;">' +
              '<div class="d-flex flex-row col-md-12 p-0">' +
              '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center">' +
              '<img class="imageThumb" style="width: 50px;height:30px;"  src="' +
              ImageName +
              '" title="' +
              f.name +
              '"/>' +
              "</div>" +
              '<div class="col-md-8 d-flex justify-content-center flex-column p-0" style="font-size:11px; padding:1px" style="font-size:14px;">' +
              "<span><b>Dokumentenname: " +
              showname +
              "</b></span>" +
              "<span><b>Dateigröße: " +
              Size +
              "</b></span>" +
              "</div>" +
              '<div class="col-md-2 text-right d-flex flex-column px-0 py-1 align-items-center justify-content-center">' +
              '<div class="removepreview btn bg-danger links" data-preview_id="' +
              that.preview_id +
              '" id="removepreviewid' +
              that.preview_id +
              '" style="cursor: pointer;padding:1px 4px" ><i class="fas fa-times text-white "  aria-hidden="true"></i></div>' +
              ' <div class="previewImage btn links mt-1" data-preview_src="' +
              that.previewsrc +
              '" data-preview_id="' +
              that.preview_id +
              '" id="previewimage' +
              that.preview_id +
              '" style="cursor: pointer; background: linear-gradient(#17459b, #02a9ed);padding:1px ">' +
              '<i class="fa fa-eye" aria-hidden="true"></i></div>' +
              "</div>" +
              "</div>" +
              '<div class="col-md-12">' +
              '<div class="progress form-group progressnew' +
              Size_num +
              i +
              '" id="progressnew' +
              Size_num +
              i +
              '" style="background-color: grey;width: 100%;">' +
              '<div class="percentageclass' +
              Size_num +
              i +
              ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
              Size_num +
              i +
              '" [style.width.%]=""> </div>' +
              "</div>" +
              "</div>" +
              "</div>";
          }

          //$("#" + preview).html(StringTemple);
          $("#" + preview).append(StringTemple);

          console.log("inside else handleimagechange");
          console.log(that.filearray);
          console.log("saveddoc else");
          console.log(that.saveddoc);

          //$(document).on('click', '.addproduct', function () {

          $(".previewImage").click(function (event: any) {
            previewData(
              $(that).data("preview_id"),
              showname,
              $(that).data("preview_src")
            );
            event.stopPropagation();
            event.stopImmediatePropagation();
          });

          $(".removepreview").click(function (event: any) {
            removeData(i);

            that.saveddoc.forEach((value: any, index: any) => {
              if (idname.indexOf("DocOne") != -1) {
                if (
                  value.id == docName &&
                  value.index == "DocOne" + $(that).data("preview_id")
                )
                  that.saveddoc.splice(index, 1);
              } else if (idname.indexOf("DocTwo") != -1) {
                if (
                  value.id == docName &&
                  value.index == "DocTwo" + $(that).data("preview_id")
                )
                  that.saveddoc.splice(index, 1);
              } else if (idname.indexOf("DocThree") != -1) {
                if (
                  value.id == docName &&
                  value.index == "DocThree" + $(that).data("preview_id")
                )
                  that.saveddoc.splice(index, 1);
              }
            });

            if (that.localData.hasOwnProperty("companytype")) {
              if (
                that.localData.companytype == "Einzelunternehmen" ||
                that.localData.companytype == "Eingetragener Kaufmann (e.K.)"
              ) {
              } else {
                // let ceo_length = that.localData.type1.legalrepresentativeform.length;
                // let shareholder_length = that.localData.type3.legalrepresentativeform2.length;

                let ceo_length = that.legalrepresentativeform().value.length;
                let shareholder_length =
                  that.legalrepresentativeform2().value.length;

                let doc_check = false;

                let ceo_done = 0;
                let shareholder_done = 0;
                let geschaft_done = 0;
                let akt_done = 0;

                if (that.saveddoc.length > 0) {
                  for (
                    let doc_length = 0;
                    doc_length < that.saveddoc.length;
                    doc_length++
                  ) {
                    let temp_ceo_length = parseInt(ceo_length) - 1;
                    if (
                      ceo_length > 1 &&
                      that.saveddoc[doc_length].id ==
                      "Ausweisdokument Vertretungsberechtigte Person" +
                      temp_ceo_length
                    ) {
                      ceo_done = 1;
                    } else if (
                      ceo_length == 1 &&
                      that.saveddoc[doc_length].id ==
                      "Ausweisdokument Vertretungsberechtigte Person"
                    ) {
                      ceo_done = 1;
                    }

                    if (that.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                      geschaft_done = 1;
                    }

                    if (
                      that.saveddoc[doc_length].id ==
                      "Aktueller Auszug aus dem Handelsregister"
                    ) {
                      akt_done = 1;
                    }
                  }

                  for (
                    let share_doc_length = 0;
                    share_doc_length <
                    that.legalrepresentativeform2().value.length;
                    share_doc_length++
                  ) {
                    for (
                      let doc_length = 0;
                      doc_length < that.signeddoc.length;
                      doc_length++
                    ) {
                      if (
                        that.signeddoc[doc_length].docname ==
                        that.legalrepresentativeform2().value[share_doc_length]
                          .firstname +
                        " " +
                        that.legalrepresentativeform2().value[
                          share_doc_length
                        ].lastname
                      ) {
                        shareholder_done += 1;
                        break;
                      }
                    }
                  }

                  if (
                    ceo_done == 1 &&
                    shareholder_done >= shareholder_length &&
                    geschaft_done == 1 &&
                    akt_done == 1
                  ) {
                    that.disableddocumentgmbh = false;
                  } else {
                    that.disableddocumentgmbh = true;
                  }
                }

                if (that.documents.length > 0) {
                  for (
                    let doc_length = 0;
                    doc_length < that.documents.length;
                    doc_length++
                  ) {
                    let temp_ceo_length = parseInt(ceo_length) - 1;
                    if (
                      ceo_length > 1 &&
                      that.documents[doc_length].element.document_name ==
                      "Ausweisdokument Vertretungsberechtigte Person" +
                      temp_ceo_length
                    ) {
                      ceo_done = 1;
                    } else if (
                      ceo_length == 1 &&
                      that.documents[doc_length].element.document_name ==
                      "Ausweisdokument Vertretungsberechtigte Person"
                    ) {
                      ceo_done = 1;
                    }

                    for (
                      let share_doc_length = 0;
                      share_doc_length <
                      that.legalrepresentativeform2().value.length;
                      share_doc_length++
                    ) {
                      if (
                        that.documents[doc_length].element.document_name ==
                        "Upload Ausweisdokument " +
                        that.legalrepresentativeform2().value[
                          share_doc_length
                        ].firstname +
                        " " +
                        that.legalrepresentativeform2().value[
                          share_doc_length
                        ].lastname
                      ) {
                        shareholder_done += 1;
                      }
                    }

                    if (
                      that.documents[doc_length].element.document_name ==
                      "Geschäftsanmeldung"
                    ) {
                      geschaft_done = 1;
                    }

                    if (
                      that.documents[doc_length].element.document_name ==
                      "Aktueller Auszug aus dem Handelsregister"
                    ) {
                      akt_done = 1;
                    }
                  }

                  if (
                    ceo_done == 1 &&
                    shareholder_done >= shareholder_length &&
                    geschaft_done == 1 &&
                    akt_done
                  ) {
                    that.disableddocumentgmbh = false;
                    doc_check = false;
                  } else {
                    that.disableddocumentgmbh = true;
                    doc_check = true;
                  }
                }
              }
            }

            $(this).parent().parent().parent(".pip").remove();
            console.log("saved array" + JSON.stringify(that.saveddoc));
            event.stopPropagation();
            event.stopImmediatePropagation();
          });
        };

        fileReader.readAsDataURL(f);

        // const element = document.querySelector('#goDown');
        // element.scrollIntoView();

        window.scrollTo(0, document.body.scrollHeight);

        const formData = new FormData();
        formData.append("document", f);
        this.userService
          .uploaddocumentwithoutticketno(formData)
          .subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                console.log("Request has been made!");

                break;
              case HttpEventType.ResponseHeader:
                console.log("Response header has been received!");
                break;
              case HttpEventType.UploadProgress:
                $("div.percentageclass" + Size_num + i).width(
                  Math.round((event.loaded / event.total!) * 100) + "%"
                );
                $("div.percentageclass" + Size_num + i).html(
                  Math.round((event.loaded / event.total!) * 100) + "%"
                );

                console.log("loading is above");

                break;
              case HttpEventType.Response:
                console.log("User successfully created!", event.body);

                let obj1 = this.saveddoc.find((o: any, i: any) => {
                  //if (o.id == docName && o.index == idname) {
                  let indexx;
                  if (idname.indexOf("DocOne") != -1) {
                    indexx = "DocOne" + that.preview_id;
                  } else if (idname.indexOf("DocTwo") != -1) {
                    indexx = "DocTwo" + that.preview_id;
                  } else if (idname.indexOf("DocThree") != -1) {
                    indexx = "DocThree" + that.preview_id;
                  }
                  if (o.id == docName && o.index == indexx) {
                    return true; // stop searching
                  }
                });

                //if(obj1){
                if (false) {
                  console.log("singed array" + JSON.stringify(this.saveddoc));
                } else {
                  // this.saveddoc.push({ id: docName , index: idname });

                  let indexx;
                  if (idname.indexOf("DocOne") != -1) {
                    indexx = "DocOne" + that.preview_id;
                  } else if (idname.indexOf("DocTwo") != -1) {
                    indexx = "DocTwo" + that.preview_id;
                  } else if (idname.indexOf("DocThree") != -1) {
                    indexx = "DocThree" + that.preview_id;
                  }

                  //this.saveddoc.push({ id: docName , index: indexx });

                  let Size111 = f.size;
                  let StringTypeCasting = this.dataconvert(Size111);
                  let typeofimage = f.type;
                  let dateofdocument = f.lastModified;
                  let tags = [];
                  let newtage =
                    StringTypeCasting +
                    "," +
                    typeofimage +
                    "," +
                    dateofdocument;
                  tags.push(newtage);

                  this.saveddoc.push({
                    id: docName,
                    index: indexx,
                    tags: tags,
                    document_unique_id: event.body.document_unique_id,
                  });

                  if (this.localData.hasOwnProperty("companytype")) {
                    if (
                      this.localData.companytype == "Einzelunternehmen" ||
                      this.localData.companytype ==
                      "Eingetragener Kaufmann (e.K.)"
                    ) {
                    } else {
                      // let ceo_length = this.localData.type1.legalrepresentativeform.length;
                      // let shareholder_length = this.localData.type3.legalrepresentativeform2.length;

                      let ceo_length =
                        that.legalrepresentativeform().value.length;
                      let shareholder_length =
                        that.legalrepresentativeform2().value.length;

                      let doc_check = false;

                      let ceo_done = 0;
                      let shareholder_done = 0;
                      let geschaft_done = 0;
                      let akt_done = 0;

                      if (this.saveddoc.length > 0) {
                        for (
                          let doc_length = 0;
                          doc_length < this.saveddoc.length;
                          doc_length++
                        ) {
                          let temp_ceo_length = parseInt(ceo_length) - 1;
                          if (
                            ceo_length > 1 &&
                            this.saveddoc[doc_length].id ==
                            "Ausweisdokument Vertretungsberechtigte Person" +
                            temp_ceo_length
                          ) {
                            ceo_done = 1;
                          } else if (
                            ceo_length == 1 &&
                            this.saveddoc[doc_length].id ==
                            "Ausweisdokument Vertretungsberechtigte Person"
                          ) {
                            ceo_done = 1;
                          }

                          if (
                            this.saveddoc[doc_length].id == "Geschäftsanmeldung"
                          ) {
                            geschaft_done = 1;
                          }

                          if (
                            this.saveddoc[doc_length].id ==
                            "Aktueller Auszug aus dem Handelsregister"
                          ) {
                            akt_done = 1;
                          }
                        }

                        for (
                          let share_doc_length = 0;
                          share_doc_length <
                          this.legalrepresentativeform2().value.length;
                          share_doc_length++
                        ) {
                          for (
                            let doc_length = 0;
                            doc_length < this.signeddoc.length;
                            doc_length++
                          ) {
                            if (
                              this.signeddoc[doc_length].docname ==
                              this.legalrepresentativeform2().value[
                                share_doc_length
                              ].firstname +
                              " " +
                              this.legalrepresentativeform2().value[
                                share_doc_length
                              ].lastname
                            ) {
                              shareholder_done += 1;
                              break;
                            }
                          }
                        }

                        if (
                          ceo_done == 1 &&
                          shareholder_done >= shareholder_length &&
                          geschaft_done == 1 &&
                          akt_done == 1
                        ) {
                          this.disableddocumentgmbh = false;
                        } else {
                          this.disableddocumentgmbh = true;
                        }
                      }

                      if (this.documents.length > 0) {
                        for (
                          let doc_length = 0;
                          doc_length < this.documents.length;
                          doc_length++
                        ) {
                          let temp_ceo_length = parseInt(ceo_length) - 1;
                          if (
                            ceo_length > 1 &&
                            this.documents[doc_length].element.document_name ==
                            "Ausweisdokument Vertretungsberechtigte Person" +
                            temp_ceo_length
                          ) {
                            ceo_done = 1;
                          } else if (
                            ceo_length == 1 &&
                            this.documents[doc_length].element.document_name ==
                            "Ausweisdokument Vertretungsberechtigte Person"
                          ) {
                            ceo_done = 1;
                          }

                          for (
                            let share_doc_length = 0;
                            share_doc_length <
                            this.legalrepresentativeform2().value.length;
                            share_doc_length++
                          ) {
                            if (
                              this.documents[doc_length].element
                                .document_name ==
                              "Upload Ausweisdokument " +
                              this.legalrepresentativeform2().value[
                                share_doc_length
                              ].firstname +
                              " " +
                              this.legalrepresentativeform2().value[
                                share_doc_length
                              ].lastname
                            ) {
                              shareholder_done += 1;
                            }
                          }

                          if (
                            this.documents[doc_length].element.document_name ==
                            "Geschäftsanmeldung"
                          ) {
                            geschaft_done = 1;
                          }

                          if (
                            this.documents[doc_length].element.document_name ==
                            "Aktueller Auszug aus dem Handelsregister"
                          ) {
                            akt_done = 1;
                          }
                        }

                        if (
                          ceo_done == 1 &&
                          shareholder_done >= shareholder_length &&
                          geschaft_done == 1 &&
                          akt_done
                        ) {
                          this.disableddocumentgmbh = false;
                          doc_check = false;
                        } else {
                          this.disableddocumentgmbh = true;
                          doc_check = true;
                        }
                      }
                    }
                  }

                  console.log("singed array" + JSON.stringify(this.saveddoc));
                }

                setTimeout(() => {
                  this.docuploaded = true;

                  $("div.percentageclass" + Size_num + i).width("0%");
                  $("div.percentageclass" + Size_num + i).html("");
                  $(".progressnew" + Size_num + i).css("display", "none");
                  $(".progressnew" + Size_num + i).css("width", "0");

                  let indexx: any;
                  if (idname.indexOf("DocOne") != -1) {
                    indexx = "DocOne" + that.preview_id;
                  } else if (idname.indexOf("DocTwo") != -1) {
                    indexx = "DocTwo" + that.preview_id;
                  } else if (idname.indexOf("DocThree") != -1) {
                    indexx = "DocThree" + that.preview_id;
                  }

                  this.documentid[indexx] = event.body.document_unique_id;

                  let Size111 = f.size;
                  let StringTypeCasting = this.dataconvert(Size111);
                  let typeofimage = f.type;
                  let dateofdocument = f.lastModified;
                  let tags = [];
                  let newtage =
                    StringTypeCasting +
                    "," +
                    typeofimage +
                    "," +
                    dateofdocument;
                  tags.push(newtage);
                  let document_name = "";

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
                    created_by: this.id,
                  };

                  console.log("documentlist");
                  console.log(this.documentlist);

                  this.preview_id += 1;
                }, 500);
            }
          });
      }
    }
    console.log(this.filearray);
  }

  async handlepassportImageChange(
    event: any,
    preview: string,
    docName: string,
    idname: any,
    fname = "",
    lname = ""
  ) {
    this.previewpassportid += 1;

    this.docuploaded = false;
    //this.showfifthstepsuccess=false;
    console.log("documentpasslist" + JSON.stringify(this.documentpasslist));
    console.log("documentpassid" + JSON.stringify(this.documentpassid));
    for (let m = 0; m < this.legalrepresentativeform2().length; m++) {
      this.documentpasslist.push("");
      this.documentpassid.push("");
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

    const previewData = (j: any, modaltitle: any) => {
      console.log("previewData" + j);

      console.log("the source");
      console.log(this.previewpassportidandsrc.length);
      console.log(this.previewpassportidandsrc[j]);

      $("#openpreviewmodel").trigger("click");

      //$('#showpreviewpdf').attr('src',this.previewidandsrc[j]);

      $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + modaltitle);

      $("#showpreviewdownload").attr("href", this.previewpassportidandsrc[j]);

      if (
        this.previewpassportidandsrc[j].indexOf("data:application/pdf;") != -1
      ) {
        $("#showpreviewimg").attr("src", "");
        $("#showpreviewimg").css("display", "none");

        $("#showpreviewpdf").attr("src", "");
        $("#showpreviewpdf").css("display", "block");
        $("#showpreviewpdf").attr("src", this.previewpassportidandsrc[j]);
      } else {
        $("#showpreviewpdf").attr("src", "");
        $("#showpreviewpdf").css("display", "none");

        $("#showpreviewimg").attr("src", "");
        $("#showpreviewimg").css("display", "block");
        $("#showpreviewimg").attr("src", this.previewpassportidandsrc[j]);
      }
    };

    const removeData = (j: any) => {
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
      //this.document_progressbar += 1;

      let f = files[i];
      this.filearraypassport.push(f);
      console.log("events" + JSON.stringify(this.filearraypassport));
      //this.documentpassid[idname] = f;
      this.documentpassid[that.previewpassportid] = f;
      console.log(
        "events" + JSON.stringify(this.documentpassid[that.previewpassportid])
      );
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

        that.previewpassportidandsrc[that.previewpassportid] =
          that.previewpassportsrc;

        console.log("signed and saved docs");
        console.log(that.signeddoc);

        let running_number = 0;
        for (
          let sign_count = 0;
          sign_count < that.signeddoc.length;
          sign_count++
        ) {
          if (that.signeddoc[sign_count].docname == fname + " " + lname) {
            running_number += 1;
          }
        }

        let filename = f.name;
        if (fname != "") {
          if (running_number == 0) {
            filename =
              "Wirtschaftlich Berechtigte Upload Ausweisdokument: " +
              fname +
              " " +
              lname;
          } else {
            filename =
              "Wirtschaftlich Berechtigte Upload Ausweisdokument: " +
              fname +
              " " +
              lname +
              "-" +
              running_number;
          }
        }

        StringTemple =
          '<div class="pip d-flex flex-column col-md-12 p-0" style="margin-top:10px;border: 1px solid silver;border-radius: 9px;">' +
          '<div class="d-flex flex-row col-md-12 p-0">' +
          '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center">' +
          '<img class="imageThumb" style="width: 50px;height:30px;" src="' +
          ImageName +
          '" title="' +
          f.name +
          '"/>' +
          "</div>" +
          '<div class="col-md-8 d-flex justify-content-center flex-column p-0" style="font-size:11px; padding:1px" style="font-size:14px;">' +
          "<span><b>Dokumentenname: " +
          filename +
          "</b></span>" +
          "<span><b>Dateigröße: " +
          Size +
          "</b> </span>" +
          "</div>" +
          '<div class="col-md-2 text-right d-flex flex-column px-0 py-1 align-items-center justify-content-center">' +
          '<div class="removepreview btn bg-danger links mt-1"" data-preview_id="' +
          that.previewpassportid +
          '" id="removepreviewid' +
          that.previewpassportid +
          '" style="cursor: pointer;padding:1px 4px" ><i class="fas fa-times text-white "  aria-hidden="true"></i></div>' 
          ' <div class="previewImagee btn links mt-1" data-preview_id="' +
          that.previewpassportid +
          '" id="previewimagee' +
          that.previewpassportid +
          '" style="cursor: pointer; background: linear-gradient(#17459b, #02a9ed);padding:1px ">' +
          '<i class="fa fa-eye" aria-hidden="true"></i></div>' +
          "</div>" +
          "</div>";

          '<div class="col-md-12">' +
          '<div class="progress form-group progressnew' +
          Size_num +
          i +
          '" id="progressnew' +
          Size_num +
          i +
          '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
          Size_num +
          i +
          ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
          Size_num +
          i +
          '" [style.width.%]=""> </div> </div>' +
          "</div>" +
          "</div>";

        StringTemple1 =
          ' <div style="border: 1px solid #d1d1d1; margin-top:10px;">' +
          "" +
          '<h3 style="margin: 0px;height: 176px;   display: grid;  align-items: center;     text-align: center; margin: auto; width: 100%;font-size: inherit;">Vorschau</h3></div>';
        //  $("#" + preview + idname).html(StringTemple);
        $("#" + preview + idname).append(StringTemple);

        $(".previewImagee").click(function (event: any) {
          previewData($(that).data("preview_id"), filename);
          event.stopPropagation();
          event.stopImmediatePropagation();
        });

        $(".removepreview").click(function (event: any) {
          removeData(i);

          $("#showtick" + $(that).data("preview_id")).hide();

          that.saveddoc.forEach((value: any, index: any) => {
            //if(value.id=="passportpic" && value.index == idname) that.saveddoc.splice(index,1);
            if (
              value.id == "passportpic" &&
              value.index == $(that).data("preview_id")
            )
              that.saveddoc.splice(index, 1);
          });

          that.signeddoc.forEach((value: any, index: any) => {
            //if(value.id=="passportpic" && value.index == idname) that.signeddoc.splice(index,1);
            if (
              value.id == "passportpic" &&
              value.index == $(that).data("preview_id")
            )
              that.signeddoc.splice(index, 1);
          });

          $(this).parent().parent().parent(".pip").remove();

          console.log("saved array" + JSON.stringify(that.saveddoc));
          console.log("singed array" + JSON.stringify(that.signeddoc));

          if (that.localData.hasOwnProperty("companytype")) {
            if (
              that.localData.companytype == "Einzelunternehmen" ||
              that.localData.companytype == "Eingetragener Kaufmann (e.K.)"
            ) {
            } else {
              // let ceo_length = that.localData.type1.legalrepresentativeform.length;
              // let shareholder_length = that.localData.type3.legalrepresentativeform2.length;

              let ceo_length = that.legalrepresentativeform().value.length;
              let shareholder_length =
                that.legalrepresentativeform2().value.length;

              let doc_check = false;

              let ceo_done = 0;
              let shareholder_done = 0;
              let geschaft_done = 0;
              let akt_done = 0;

              if (that.saveddoc.length > 0) {
                for (
                  let doc_length = 0;
                  doc_length < that.saveddoc.length;
                  doc_length++
                ) {
                  let temp_ceo_length = parseInt(ceo_length) - 1;
                  if (
                    ceo_length > 1 &&
                    that.saveddoc[doc_length].id ==
                    "Ausweisdokument Vertretungsberechtigte Person" +
                    temp_ceo_length
                  ) {
                    ceo_done = 1;
                  } else if (
                    ceo_length == 1 &&
                    that.saveddoc[doc_length].id ==
                    "Ausweisdokument Vertretungsberechtigte Person"
                  ) {
                    ceo_done = 1;
                  }

                  if (that.saveddoc[doc_length].id == "Geschäftsanmeldung") {
                    geschaft_done = 1;
                  }

                  if (
                    that.saveddoc[doc_length].id ==
                    "Aktueller Auszug aus dem Handelsregister"
                  ) {
                    akt_done = 1;
                  }
                }

                for (
                  let share_doc_length = 0;
                  share_doc_length <
                  that.legalrepresentativeform2().value.length;
                  share_doc_length++
                ) {
                  for (
                    let doc_length = 0;
                    doc_length < that.signeddoc.length;
                    doc_length++
                  ) {
                    if (
                      that.signeddoc[doc_length].docname ==
                      that.legalrepresentativeform2().value[share_doc_length]
                        .firstname +
                      " " +
                      that.legalrepresentativeform2().value[share_doc_length]
                        .lastname
                    ) {
                      shareholder_done += 1;
                      break;
                    }
                  }
                }

                if (
                  ceo_done == 1 &&
                  shareholder_done >= shareholder_length &&
                  geschaft_done == 1 &&
                  akt_done == 1
                ) {
                  that.disableddocumentgmbh = false;
                } else {
                  that.disableddocumentgmbh = true;
                }
              }

              if (that.documents.length > 0) {
                for (
                  let doc_length = 0;
                  doc_length < that.documents.length;
                  doc_length++
                ) {
                  let temp_ceo_length = parseInt(ceo_length) - 1;
                  if (
                    ceo_length > 1 &&
                    that.documents[doc_length].element.document_name ==
                    "Ausweisdokument Vertretungsberechtigte Person" +
                    temp_ceo_length
                  ) {
                    ceo_done = 1;
                  } else if (
                    ceo_length == 1 &&
                    that.documents[doc_length].element.document_name ==
                    "Ausweisdokument Vertretungsberechtigte Person"
                  ) {
                    ceo_done = 1;
                  }

                  for (
                    let share_doc_length = 0;
                    share_doc_length <
                    that.legalrepresentativeform2().value.length;
                    share_doc_length++
                  ) {
                    if (
                      that.documents[doc_length].element.document_name ==
                      "Upload Ausweisdokument " +
                      that.legalrepresentativeform2().value[share_doc_length]
                        .firstname +
                      " " +
                      that.legalrepresentativeform2().value[share_doc_length]
                        .lastname
                    ) {
                      shareholder_done += 1;
                    }
                  }

                  if (
                    that.documents[doc_length].element.document_name ==
                    "Geschäftsanmeldung"
                  ) {
                    geschaft_done = 1;
                  }

                  if (
                    that.documents[doc_length].element.document_name ==
                    "Aktueller Auszug aus dem Handelsregister"
                  ) {
                    akt_done = 1;
                  }
                }

                if (
                  ceo_done == 1 &&
                  shareholder_done >= shareholder_length &&
                  geschaft_done == 1 &&
                  akt_done
                ) {
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

      const formData = new FormData();
      formData.append("document", f);
      this.userService
        .uploaddocumentwithoutticketno(formData)
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log("Request has been made!");

              break;
            case HttpEventType.ResponseHeader:
              console.log("Response header has been received!");
              break;
            case HttpEventType.UploadProgress:
              console.log(event.total);
              console.log(event.loaded);

              $("div.percentageclass" + Size_num + i).width(
                Math.round((event.loaded / event.total!) * 100) + "%"
              );
              $("div.percentageclass" + Size_num + i).html(
                Math.round((event.loaded / event.total!) * 100) + "%"
              );

              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);

              this.docuploaded = true;

              $("div.percentageclass" + Size_num + i).width("0%");
              $("div.percentageclass" + Size_num + i).html("");
              $(".progressnew" + Size_num + i).css("display", "none");
              $(".progressnew" + Size_num + i).css("width", "0");

              // this.uploadingdoc=false;
              $("#showtick" + idname).show();
              let obj = this.signeddoc.find((o: any, i: any) => {
                if (o.id == "passportpic" && o.index == idname) {
                  return true; // stop searching
                }
              });

              let Size111 = f.size;
              let StringTypeCasting = this.dataconvert(Size111);
              let typeofimage = f.type;
              let dateofdocument = f.lastModified;
              let tags = [];
              let newtage =
                StringTypeCasting + "," + typeofimage + "," + dateofdocument;
              tags.push(newtage);

              this.signeddoc.push({
                id: "passportpic",
                index: that.previewpassportid,
                docname: fname + " " + lname,
                tags: tags,
                document_unique_id: event.body.document_unique_id,
              });

              let obj1 = this.saveddoc.find((o: any, i: any) => {
                if (o.id == "passportpic" && o.index == idname) {
                  return true; // stop searching
                }
              });

              // if(obj1){
              //   console.log("singed array" + JSON.stringify(this.saveddoc))
              // }else{
              //   this.saveddoc.push({ id: "passportpic", index: idname });

              //   console.log("singed array" + JSON.stringify(this.saveddoc))
              // }

              this.saveddoc.push({
                id: "passportpic",
                index: that.previewpassportid,
              });

              console.log("passport saved doc");
              console.log(this.saveddoc);

              if (this.localData.hasOwnProperty("companytype")) {
                if (
                  this.localData.companytype == "Einzelunternehmen" ||
                  this.localData.companytype == "Eingetragener Kaufmann (e.K.)"
                ) {
                } else {
                  // let ceo_length = this.localData.type1.legalrepresentativeform.length;
                  // let shareholder_length = this.localData.type3.legalrepresentativeform2.length;

                  let ceo_length = that.legalrepresentativeform().value.length;
                  let shareholder_length =
                    that.legalrepresentativeform2().value.length;

                  let doc_check = false;

                  let ceo_done = 0;
                  let shareholder_done = 0;
                  let geschaft_done = 0;
                  let akt_done = 0;

                  if (this.saveddoc.length > 0) {
                    for (
                      let doc_length = 0;
                      doc_length < this.saveddoc.length;
                      doc_length++
                    ) {
                      let temp_ceo_length = parseInt(ceo_length) - 1;
                      if (
                        ceo_length > 1 &&
                        this.saveddoc[doc_length].id ==
                        "Ausweisdokument Vertretungsberechtigte Person" +
                        temp_ceo_length
                      ) {
                        ceo_done = 1;
                      } else if (
                        ceo_length == 1 &&
                        this.saveddoc[doc_length].id ==
                        "Ausweisdokument Vertretungsberechtigte Person"
                      ) {
                        ceo_done = 1;
                      }

                      // if(this.saveddoc[doc_length].id == "passportpic"){
                      //   shareholder_done += 1;
                      // }

                      if (
                        this.saveddoc[doc_length].id == "Geschäftsanmeldung"
                      ) {
                        geschaft_done = 1;
                      }

                      if (
                        this.saveddoc[doc_length].id ==
                        "Aktueller Auszug aus dem Handelsregister"
                      ) {
                        akt_done = 1;
                      }
                    }

                    for (
                      let share_doc_length = 0;
                      share_doc_length <
                      that.legalrepresentativeform2().value.length;
                      share_doc_length++
                    ) {
                      for (
                        let doc_length = 0;
                        doc_length < this.signeddoc.length;
                        doc_length++
                      ) {
                        if (
                          this.signeddoc[doc_length].docname ==
                          that.legalrepresentativeform2().value[
                            share_doc_length
                          ].firstname +
                          " " +
                          that.legalrepresentativeform2().value[
                            share_doc_length
                          ].lastname
                        ) {
                          shareholder_done += 1;
                          break;
                        }
                      }
                    }

                    if (
                      ceo_done == 1 &&
                      shareholder_done >= shareholder_length &&
                      geschaft_done == 1 &&
                      akt_done == 1
                    ) {
                      this.disableddocumentgmbh = false;
                    } else {
                      this.disableddocumentgmbh = true;
                    }
                  }

                  if (this.documents.length > 0) {
                    for (
                      let doc_length = 0;
                      doc_length < this.documents.length;
                      doc_length++
                    ) {
                      let temp_ceo_length = parseInt(ceo_length) - 1;
                      if (
                        ceo_length > 1 &&
                        this.documents[doc_length].element.document_name ==
                        "Ausweisdokument Vertretungsberechtigte Person" +
                        temp_ceo_length
                      ) {
                        ceo_done = 1;
                      } else if (
                        ceo_length == 1 &&
                        this.documents[doc_length].element.document_name ==
                        "Ausweisdokument Vertretungsberechtigte Person"
                      ) {
                        ceo_done = 1;
                      }

                      for (
                        let share_doc_length = 0;
                        share_doc_length <
                        that.legalrepresentativeform2().value.length;
                        share_doc_length++
                      ) {
                        if (
                          this.documents[doc_length].element.document_name ==
                          "Upload Ausweisdokument " +
                          that.legalrepresentativeform2().value[
                            share_doc_length
                          ].firstname +
                          " " +
                          that.legalrepresentativeform2().value[
                            share_doc_length
                          ].lastname
                        ) {
                          shareholder_done += 1;
                        }
                      }

                      if (
                        this.documents[doc_length].element.document_name ==
                        "Geschäftsanmeldung"
                      ) {
                        geschaft_done = 1;
                      }

                      if (
                        this.documents[doc_length].element.document_name ==
                        "Aktueller Auszug aus dem Handelsregister"
                      ) {
                        akt_done = 1;
                      }
                    }

                    if (
                      ceo_done == 1 &&
                      shareholder_done >= shareholder_length &&
                      geschaft_done == 1 &&
                      akt_done
                    ) {
                      this.disableddocumentgmbh = false;
                      doc_check = false;
                    } else {
                      this.disableddocumentgmbh = true;
                      doc_check = true;
                    }
                  }
                }
              }
          }
        });
    }
  }

  addCustomer() {
    let id: any
    this.userService.modalIdfromSidebar.pipe(first()).subscribe((data) => {
      id = data
    })

    for (const key of Object.keys(this.hideValues)) {
      this.hideValues[key] = true
    }

    for (const key of Object.keys(this.Vertrage.Laufende)) {
      this.Vertrage.Laufende[key] = true
    }
    for (const key of Object.keys(this.Vertrage.Angebote)) {
      this.Vertrage.Angebote[key] = true
    }
    this.Vertrage.Allgemeine = true
    console.log(id);
  }

  DateRender(id: string) {

    this.open_modal(id)

  }
  dataURLtoBlob(dataurl: any) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  drawComplete1() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL());
    let base64Data = this.signaturePad.toDataURL();
    let base64Datablob: any = this.dataURLtoBlob(base64Data);
    // let base64Datablob:any=this.urltoFile(base64Data,'hello.jpg','	image/jpeg');
    // console.log(base64Datablob);

    this.currentSignature = this.signaturePad.toDataURL();

    this.drawingnew = 1;
    // console.log(this.drawingnew);
    // $("#imageidnewshownew").attr("src", base64Datablob);

    $("#signature1").attr("src", this.signaturePad.toDataURL());
    $("#signature2").attr("src", this.signaturePad.toDataURL());
    $("#imageidnewmodal").attr("src", this.signaturePad.toDataURL());
    $("#imageidnew").attr("src", this.signaturePad.toDataURL());
    $("#imageidnew1").attr("src", this.signaturePad.toDataURL());
    // Modal

    $("#companyNoBroker").attr("src", this.signaturePad.toDataURL());
    $("#companyWithBroker").attr("src", this.signaturePad.toDataURL());
    $("#familyNoBroker").attr("src", this.signaturePad.toDataURL());
    $("#familyNoBrokeresign").attr("src", this.signaturePad.toDataURL());
    $("#familyWithBroker").attr("src", this.signaturePad.toDataURL());
    $("#familyWithBrokeresign").attr("src", this.signaturePad.toDataURL());
    $("#familyWithBrokerpdf").attr("src", this.signaturePad.toDataURL());
    $("#familyNoBrokerpdf").attr("src", this.signaturePad.toDataURL());
    $("#familyWithBrokerpdfesign").attr("src", this.signaturePad.toDataURL());
    $("#familyNoBrokerpdfesign").attr("src", this.signaturePad.toDataURL());
    $("#customerWithBrokerpdf").attr("src", this.signaturePad.toDataURL());
    $("#customerNoBrokerpdf").attr("src", this.signaturePad.toDataURL());
  }
  save() {
    console.log("save");
  }
  getAllFieldsnew(data: any): any {
    let that = this;
    const splitArr = data;
    let str = "";
    //console.log("data", splitArr);
    splitArr.forEach(function (i: any, k: any) {
      let content: any = i.types;
      const found = content.find((element: any) => (element = "street_number"));
      if (found === "street_number") {
        that.addressFormGroupnew.patchValue({ streetNumber: i.short_name });
      } else if (found === "postal_code") {
        that.addressFormGroupnew.patchValue({ postCode: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            //console.log("country", i);
            that.addressFormGroupnew.patchValue({
              countryOfResidence: i.long_name,
            });
          }
          if (countryArr[index] === "locality") {
            that.addressFormGroupnew.patchValue({ city: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      that.addressFormGroupnew.patchValue({ street: str });
    } else {
      that.addressFormGroupnew.patchValue({ street: "" });
    }
  }
  getCountrylandCEO(data: any): any {
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
          // that.customerFormGroup.patchValue({
          //   countryOfResidence: localityCountry,
          // });
        }
      }
    });
    // this.checkDataAndCreateUpdateData();
  }
  getCountrylandOtherPerson(data: any): any {
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
          // that.customerFormGroup.patchValue({
          //   countryOfResidence: localityCountry,
          // });
        }
      }
    });
    // this.checkDataAndCreateUpdateData();
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
          // that.customerFormGroup.patchValue({
          //   countryOfResidence: localityCountry,
          // });
        }
      }
    });
    // this.checkDataAndCreateUpdateData();
  }
  getCountrylandShareholder(data: any): any {
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
          // that.customerFormGroup.patchValue({
          //   countryOfResidence: localityCountry,
          // });
        }
      }
    });
    // this.checkDataAndCreateUpdateData();
  }
  dataconvert(
    bytes: number = 0,
    precision: number | unitPrecisionMap = defaultPrecisionMap
  ): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return "?";

    let unitIndex = 0;

    while (bytes >= 1024) {
      bytes /= 1024;
      unitIndex++;
    }

    const unit = this.units[unitIndex];

    if (typeof precision === "number") {
      return `${bytes.toFixed(+precision)} ${unit}`;
    }
    return `${bytes.toFixed(precision[unit])} ${unit}`;
  }

  //Check if the user is loggedIn or not
  isLoggedIn() {
    if (this.authService.isAuthenticated()) {
      if (
        this.userService.getDecodedAccessToken(localStorage.getItem("token")!)
          .roles == "admin"
      ) {
        this.router.navigate(["./admin-home"]);
      } else if (
        this.userService.getDecodedAccessToken(localStorage.getItem("token")!)
          .roles == "Superadmin"
      ) {
        this.router.navigate(["./superadmin-home"]);
      } else if (
        this.userService.getDecodedAccessToken(localStorage.getItem("token")!)
          .roles == "employee"
      ) {
        this.router.navigate(["./mitarbeiter-home"]);
      } else if (
        this.userService.getDecodedAccessToken(localStorage.getItem("token")!)
          .roles == "b2b"
      ) {
        this.router.navigate(["./b2b-home"]);
        localStorage.setItem("currentActiveRole", "b2b");
      } else {
        console.log("kunde-home");
        this.router.navigate(["./b2b-home"]);
        localStorage.setItem("currentActiveRole", "b2b");
      }
    } else {
      this.router.navigate(["./"]);
    }
  }

  open_runningcont_modal() {
    $("#openrunningmodal").trigger("click");
  }

  open_extcont_modal() {
    console.log("came inside function");
    $("#openexternalmodal").trigger("click");
  }

  private _filter2(value: any): string[] {
    console.log("_filter" + JSON.stringify(value));
    console.log(
      "this.ReadyProductsOptions" + JSON.stringify(this.ReadyProductsOptions)
    );
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

  patchProductTpyeValue(event: any) {
    this.ReadyProductsOptions = [];

    console.log("ProductsTypeControl" + this.ProductsTypeControl.value);

    if (this.ProductsTypeControl.value != "") {
      if (this.ProductsTypeControl.value) {
        this.ShowProductsPartner = true;
        this.ReadyProductsOptions = this.LoopingProductsListTypePatch(
          this.customerList,
          this.ProductsTypeControl.value.id
        );
        this.lastproducttypeid = this.ProductsTypeControl.value.id;
        console.log("ProductsTypeControl" + this.lastproducttypeid);

        this.ProductsTypeControl.setValue(this.ProductsTypeControl.value.name);

        this.ProductsControl.setValue(" ");

        $(".product_partner_image").attr("src", "");
        $(".product_partner_image").css("display", "none");

        setTimeout(() => {
          this.ProductsControl.setValue("");
          this.ShowButton = false;
        }, 500);
      }
    } else {
      this.ShowProductsPartner = false;
    }
  }

  LoopingProductsList(data: string | any[]): string[] {
    let ProductsList = [];
    for (let i = 0; i < data.length; i++) {
      ProductsList.push(data[i].company_name);
    }
    return ProductsList;
  }
  LoopingProductsListType(data: string | any[]): string[] {
    let ProductsList = [];

    for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].producttypesinfo.length; k++) {
        console.log(
          "sadfasdfasdf" + data[i].producttypesinfo[k].product_typename
        );
        ProductsList.push({
          id: data[i].producttypesinfo[k]._id,
          name: data[i].producttypesinfo[k].product_typename,
        });
      }
    }

    // return [...new Set(ProductsList)];
    console.log(
      "ReadyProductsTypeOptions" +
      [...new Map(ProductsList.map((item) => [item["name"], item])).values()]
    );
    return [
      ...new Map(
        ProductsList.map((item: any) => [item["name"], item])
      ).values(),
    ];
  }

  private _filterTypeProducts(value: string): any {
    console.log("ProductsControl" + value);
    if (typeof value != "object") {
      const filterValue = value.toLowerCase();

      return this.ReadyProductsTypeOptions?.filter((option: any) =>
        option.name.toLowerCase().includes(filterValue)
      );
    }
  }

  LoopingProductsListTypePatch(data: string | any[], type: string) {
    let ProductsList = [];

    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);

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
    console.log("LoopingProductsListTypePatch" + [...new Set(ProductsList)]);
    //@ts-ignore
    return [...new Set(ProductsList)];
  }

  patchProductValue(event: any) {
    console.log("ProductsControl" + this.ProductsControl.value.name);
    if (this.ProductsControl.value.name != "") {
      if (this.ProductsControl.value.name) {
        $(".product_partner_image").css("display", "block");
        $(".product_partner_image").attr("src", this.ProductsControl.value.url);
        this.lastproductpartnerid = this.ProductsControl.value.id;
        this.ProductsControl.setValue(this.ProductsControl.value.name);
        this.ShowButton = true;
      }
    } else {
      this.ProductsControl.setValue("");
      this.ShowButton = false;
    }
  }

  async handleImageChange2(
    event: any,
    preview: string,
    docName: string,
    idname: any
  ) {
    event.preventDefault();
    this.uploadingdata = true;

    this.document_uploaded = true;
    $("#result").html("");
    let StringTemple;

    const removeData = () => {
      this.filearraynew.splice(0, 1);

      $("#" + idname).val("");

      console.log("removed");
      this.document_uploaded = false;
    };

    var files = event.target.files;
    console.log("events" + event.target.files);
    var filesLength = files.length;

    for (let i = 0; i < filesLength; i++) {
      let f = files[i];
      this.filearraynew.push(f);

      this.filearray = this.filearraynew;

      var fileReader = new FileReader();
      //var target:EventTarget;
      let Size = this.dataconvert(f.size);
      fileReader.onload = function (e) {
        //var file = e.target;
        let that = this;
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

        if (extension == "doc" || extension == "docx") {
          StringTemple =
            '<div class="pip"  style="margin: auto !important;" id="div3">' +
            "" +
            '<div class="row mt-2"> <div class="col-md-12">' +
            '<div class="removepreview" id="removepreviewid' +
            preview +
            '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px;padding: 10px;padding-top:5px;color: white;position: relative;margin-top: 2px;   margin-left: auto;cursor: pointer;">X</div></div>' +
            "" +
            '<div class="col-md-3 text-center">' +
            '<img class="imageThumb" style="width: 40%;height:50px;    margin-top: 10px;" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            "</div>" +
            '<div class="col-md-9"> <b>Dokumentenname: ' +
            f.name +
            "</b> <b>Dateigröße: " +
            Size +
            "</b> </div><div class='col-md-12'>" +
            '   <div class="progress form-group " id="progressnew' +
            idname +
            '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
            idname +
            ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
            idname +
            '" [style.width.%]=""> </div> </div>' +
            " </div></div></div>" +
            "</div>";
        } else if (extension == "pdf" || extension == "pdfx") {
          StringTemple =
            '<div class="pip"  style="margin: auto !important;" id="div3">' +
            "" +
            '<div class="row mt-2"> <div class="col-md-12">' +
            '<div class="removepreview" id="removepreviewid' +
            preview +
            '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px;padding: 10px;padding-top:5px;color: white;position: relative;margin-top: 2px;   margin-left: auto;cursor: pointer;">X</div></div>' +
            "" +
            '<div class="col-md-3">' +
            '<img class="imageThumb" style="width: 100%;height:50px;    margin-top: 10px;" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            "</div>" +
            '<div class="col-md-9"> <b>Dokumentenname: ' +
            f.name +
            "</b> <b>Dateigröße: " +
            Size +
            "</b> </div><div class='col-md-12'>" +
            '   <div class="progress form-group " id="progressnew' +
            idname +
            '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
            idname +
            ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
            idname +
            '" [style.width.%]=""> </div> </div>' +
            " </div></div></div>" +
            "</div>";
        } else {
          StringTemple =
            '<div class="pip"  style="margin: auto !important;" id="div3">' +
            "" +
            '<div class="row mt-2"> <div class="col-md-12">' +
            '<div class="removepreview" id="removepreviewid' +
            preview +
            '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px;padding: 10px;padding-top:5px;color: white;position: relative;margin-top: 2px;   margin-left: auto;cursor: pointer;">X</div></div>' +
            "" +
            '<div class="col-md-3">' +
            '<img class="imageThumb" style="width: 100%;height:40%;    margin-top: 10px;" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            "</div>" +
            '<div class="col-md-9"> <b>Dokumentenname: ' +
            f.name +
            "</b> <b>Dateigröße: " +
            Size +
            "</b> </div><div class='col-md-12'>" +
            '   <div class="progress form-group " id="progressnew' +
            idname +
            '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
            idname +
            ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
            idname +
            '" [style.width.%]=""> </div> </div>' +
            "</div> </div></div>" +
            "</div>";
        }
        $("#" + preview).html(StringTemple);

        // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> KB </div>`).insertAfter(".pip")
        $("#removepreviewid" + preview).click(function () {
          removeData();
          $(that).parent().parent().parent(".pip").remove();
        });
      };

      fileReader.readAsDataURL(f);

      const formData = new FormData();
      formData.append("document", f);
      this.userService
        .uploaddocumentwithoutticketnocareer(formData)
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log("Request has been made!");

              break;
            case HttpEventType.ResponseHeader:
              console.log("Response header has been received!");
              break;
            case HttpEventType.UploadProgress:
              console.log(event.total);
              console.log(event.loaded);

              $("div.percentageclass" + idname).width(
                Math.round((event.loaded / event.total!) * 100) + "%"
              );
              $("div.percentageclass" + idname).html(
                Math.round((event.loaded / event.total!) * 100) + "%"
              );

              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);

              setTimeout(() => {
                $("#progressnew" + idname).css("display", "none");
                $("#progressnew" + idname).css("width", "0");
                $("div.percentageclass" + idname).width("0");
                $("div.percentageclass" + idname).css("width", "0");
                $("div.percentageclass" + idname).html("");

                this.uploadingdata = false;

                let document_name = docName;
                let olddocumentid = this.documentid;
                this.documentid = event.body.document_unique_id;

                let StringTypeCasting = Math.round(f.size / 1024);
                let typeofimage = f.type;
                let dateofdocument = f.lastModified;
                let tags = [];
                let newtage =
                  StringTypeCasting.toString() +
                  "," +
                  typeofimage +
                  "," +
                  dateofdocument;
                tags.push(newtage);

                this.documentlist = {
                  olddocument_unique_id: olddocumentid,
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
                  created_by: this.id,
                };
              }, 500);
          }
        });
    }

    console.log(this.filearray);
  }

  async handleImageChange3(
    event: any,
    preview: string,
    docName: string,
    idname: any
  ) {
    // this.progressInfos = [];

    this.uploadingdata = true;

    $("#result").html("");

    event.preventDefault();

    const previewData = (source: any, modaltitle: any) => {
      console.log("previewData" + source);



      //$('#showpreviewpdf').attr('src',this.previewidandsrc[j]);


      $('#showpreviewtitle').html("<b>Dokumentenname: </b>" + modaltitle);
      $('#showpreviewdownload').attr('href', source);

      if (source.indexOf("data:application/pdf;") != -1) {

        const base64 = source.replace(/^data:.+;base64,/, "");

        const blob = base64ToBlob(base64, 'application/pdf');
        const url = URL.createObjectURL(blob);
        const pdfWindow = window.open("");
        pdfWindow?.document.write("<iframe width='100%' height='100%' src='" + url + "'></iframe>");

        function base64ToBlob(base64: string, type = "application/octet-stream") {
          console.log(base64);
          const binStr = atob(base64 as string);
          const len = binStr.length;
          const arr = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }
          return new Blob([arr], { type: type });
        }
        // $("#showpreviewimg").attr("src", "");
        // $("#showpreviewimg").css("display", "none");

        // $("#showpreviewpdf").attr("src", "");
        // $("#showpreviewpdf").css("display", "block");
        // $("#showpreviewpdf").attr("src", source);
      } else {
        $("#openpreviewmodel").trigger("click");
        this.open_modal('exampleModalpreview')

        $("#showpreviewpdf").attr("src", "");
        $("#showpreviewpdf").css("display", "none");

        $("#showpreviewimg").attr("src", "");
        $("#showpreviewimg").css("display", "block");
        $("#showpreviewimg").attr("src", source);
      }
    };

    const removeData = (j: any) => {
      //delete this.filearraynew[j];
      this.filearraynew.splice(j, 1);
      let newfilearray = this.filearraynew.filter(function () {
        return true;
      });
      if (newfilearray.length > 0) {
      } else {
      }
      this.filearray = newfilearray;

      //delete this.documentid[j];
      this.documentid.splice(j, 1);
      let documentidnew = this.documentid.filter(function () {
        return true;
      });
      this.documentid = documentidnew;
      //delete this.documentlist[j];
      this.documentlist.splice(j, 1);
      let documentlistnew = this.filearraynew.filter(function () {
        return true;
      });
      this.documentlist = documentlistnew;

      console.log("removing file");
      console.log(this.filearraynew);
    };

    var files = event.target.files; //FileList object
    // var output = document.getElementById("result");

    var filesLength = files.length;
    for (let i = 0; i < filesLength; i++) {
      let f = files[i];
      let newsize: any = this.l;

      this.l = this.l + 1;
      this.filearraynew.push(f);
      let Size1 = f.size;
      let Size = this.dataconvert(Size1);

      this.filearray = this.filearraynew;

      let extension = f.name.substr(f.name.lastIndexOf(".") + 1);
      console.log(extension);
      let ImageName;
      let newkey;

      var fileReader = new FileReader();
      let typeofimage = f.type;
      let dateofdocument = f.lastModified;
      var d = new Date(dateofdocument);
      var date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

      // this.imagearray.push({"index":newsize,"ImageName":ImageName,"name":f.name,"Size":Size,"typeofimage":typeofimage,"date":date})

      //var target:EventTarget;
      fileReader.onload = function (e) {
        let that = this;
        ImageName = (e.target as any).result;

        let extension = f.name.substr(f.name.lastIndexOf(".") + 1);
        console.log(extension);
        if (extension == "doc" || extension == "docx") {
          ImageName = "../assets/docx.png";
        } else if (extension == "pdf" || extension == "pdfx") {
          ImageName = "../assets/icons/file-upload-blue-pdf.svg";
        } else if (extension == "txt" || extension == "TXT") {
          ImageName = "../assets/txt.png";
        } else {
          ImageName = (e.target as any).result;
        }

        if (
          extension == "mp4" ||
          extension == "MP4" ||
          extension == "mov" ||
          extension == "MOV" ||
          extension == "aiv" ||
          extension == "AIV"
        ) {
          $(
            '<div class="pip" style="width: 290px;display: inline-block;margin: 8px;" "id=\'pipremove' +
            newsize +
            "'>" +
            '<div class="removepreview" id="removepreviewid' +
            newsize +
            '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; text-align: center; padding: 6px;color: white;position: absolute;margin-left: 257px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
            "" +
            '<video controls  id="videoSourceWrapper' +
            newsize +
            '" style="width: 100%;height:300px;  object-fit: cover; " ' +
            '"/></video>' +
            "<div> <b>Dokumentenname: " +
            f.name +
            "</b> </div><div> <b class='limitword'>Dateigröße: " +
            Size +
            "</b> </div><div> <b>Dateityp: " +
            typeofimage +
            "</b> </div><div> <b>Datum des Dokuments: " +
            date +
            "</b> </div>" +
            '   <div class="progress form-group " id="progressnew' +
            newsize +
            '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
            newsize +
            ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
            newsize +
            '" [style.width.%]=""> </div> </div>' +
            " </div>"
          ).insertAfter("#" + preview);

          $("#videoSourceWrapper" + newsize).attr(
            "src",
            URL.createObjectURL(files[i])
          );
        } else {
          $(
            '<div class="pip col-md-4 p-0" style="display: inline-block;" "id=\'pipremove' +
            newsize +
            "'>" +

            '<div class="col-md-11 p-1 d-flex m-1 flex-column" style="border: 1px solid #cdcdcd;border-radius:9px;">' +
            '<div class=" col-md-12 p-0 d-flex flex-row" >' +
            '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center ">' +
            '<img class="imageThumb" style="width: 50px;height:30px;" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            "</div>" +
            '<div class="col-md-8 d-flex justify-content-center flex-column p-0" style="font-size:11px; padding:1px" style="font-size:14px;">' + 
            "<div> <b class='limitword' title='" +
            f.name +
            "'>Dokumentenname: " +
            f.name +
            "</b> </div>" +
            "<div> <b>Dateigröße: " +
            Size +
            "</b> KB </div>" +
            "<div> <b class='limitword'>Dateityp: " +
            typeofimage +
            "</b> </div>" +
            // "<div> <b>Datum des Dokuments: " +date +"</b> </div>"+
            "</div>" +


            // '<div class="col-md-12">' +
            // '<div class="removepreview links" id="removepreviewid' +
            // newsize +
            // '" style="margin-bottom:-25px;background: #184297;border-radius: 50%;width:25px;height:25px;font-size: 14px; text-align: center; padding: 2px;color: white;margin-left: 270px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
            // "</div>" +
            // "<div class='col-md-12'>" +
            // '<div class="previewdoc links" data-doc_name="' +
            // f.name +
            // '" data-preview_source="' +
            // (e.target as any).result +
            // '" id="previewdoc' +
            // newsize +
            // '" style="background: #184297;border-radius: 50%;width:25px;height:25px;font-size: 13px; text-align: center; padding: 3px;color: white;margin-left: 270px;margin-top: -25px;margin-right: 0 !important;cursor: pointer;"><i class="fa fa-eye" aria-hidden="true"></i></div>' +
            // "</div>" +


            '<div class="col-md-2 text-right d-flex flex-column p-0 align-items-center justify-content-center ">' +
            '<div class=" p-0 ">' +
            '<div class="removepreview btn bg-danger links mt-1" id="removepreviewid' + newsize + '" style="cursor: pointer;padding:1px 4px" ><i class="fas fa-times text-white "  aria-hidden="true"></i></div>' +
            '</div>' +

            "<div class=' p-0 mt-1'>" +
            '<div class="previewdoc btn links  " data-doc_name="' + f.name + '" data-preview_source="' + (e.target as any).result + '" id="previewdoc' + newsize + '" style="cursor: pointer; background: linear-gradient(#17459b, #02a9ed);padding:1px "><i class="fa fa-eye  text-white" aria-hidden="true"></i> ' +
            ' </div>' +
            "</div>" +
            '</div>' +

            '</div>' +

            "<div class='col-md-12 p-0 mt-2'>" +
            '<div class="progress form-group " id="progressnew' +
            newsize +
            '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
            newsize +
            ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
            newsize +
            '" [style.width.%]=""> </div> </div>' +
            "</div>" +
            "</div>" +
            "</div>"
          ).insertAfter("#" + preview);
        }

        $(".previewdoc").click(function (event: any) {
          previewData($(this).data("preview_source"), $(this).data("doc_name"));
          event.stopPropagation();
          event.stopImmediatePropagation();
        });

        // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> </div>`).insertAfter(".pip")
        $("#removepreviewid" + newsize).click(function () {
          removeData(newsize);

          $(this).parent().parent().parent().parent().parent(".pip").remove();
        });
      };
      fileReader.readAsDataURL(f);

      const formData = new FormData();
      formData.append("document", f);
      this.userService
        .uploaddocumentwithoutticketno(formData)
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log("Request has been made!");

              break;
            case HttpEventType.ResponseHeader:
              console.log("Response header has been received!");
              break;
            case HttpEventType.UploadProgress:
              $("div.percentageclass" + newsize).width(
                Math.round((event.loaded / event.total!) * 100) + "%"
              );
              $("div.percentageclass" + newsize).html(
                Math.round((event.loaded / event.total!) * 100) + "%"
              );

              break;
            case HttpEventType.Response:
              console.log("response came");
              console.log(this.filearraynew);

              setTimeout(() => {
                this.uploadingdata = false;

                $("#progressnew" + newsize).css("display", "none");
                this.documentid[newsize] = event.body.document_unique_id;

                let Size111 = f.size;
                let StringTypeCasting = this.dataconvert(Size111);
                let typeofimage = f.type;
                let dateofdocument = f.lastModified;
                let tags = [];
                let newtage =
                  StringTypeCasting + "," + typeofimage + "," + dateofdocument;
                tags.push(newtage);
                let companycodenew = "";
              }, 500);
          }
        });
    }
  }

  _handleImageUpload2 = (doctype: any) => {
    this.userService
      .getLastdocument()
      .pipe(first())
      .subscribe((data: any) => {
        console.log("ticket_no" + data);
        let values: any = {
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
        };
        var doc = new jsPDF("p", "pt", "a4", true);
        var width = doc.internal.pageSize.width;
        var height = doc.internal.pageSize.height;
        console.log("_handleImageUpload test");
        console.log(this.filearray);
        this.filearray = this.filearray.filter(function () {
          return true;
        });

        for (let i = 0; i < this.filearray.length; i++) {
          //var document_type = "Allgemeines Dokument";
          let url = this.filearray[i];
          let reader = new FileReader();
          let extension = url.name.substr(url.name.lastIndexOf(".") + 1);

          reader.readAsDataURL(url);
          reader.onload = () => {
            let base64ImgString = (reader.result as string).split(",")[1];
            if (true) {
              let StringTypeCasting = Math.round(this.filearray[i].size / 1024);
              let MainType = this.filearray[i].type;
              let Date = this.filearray[i].lastModified;
              console.log("this.StringTypeCasting " + StringTypeCasting);
              values.image = this.filearray[i];
              //values.document_type = "fremdvertrag";
              values.document_type = doctype;
              values.document_sub_type = this.lastproducttypeid;
              values.user_id = this.customerid;
              values.product_partner = this.lastproductpartnerid
                ? this.lastproductpartnerid
                : " ";
              values.companycode = "42140 DFG Finanzprofi GmbH";
              values.brand = "cefima";
              values.upload_by = "cefima_document";
              values.ticket_no = "40-ce-" + data;

              values.tags.push(StringTypeCasting.toString());
              values.tags.push(MainType);
              values.tags.push(Date);
              console.log("inside if handleimage upload");
              console.log(i);
              this.uploadDocument2(values, i);
              values.tags = [];
            }
          };
        }
        $(".pip").remove();
        this.filearraynew = [];
      });
  };

  uploadDocument2(values: any, index: any) {
    console.log("function called = " + index);

    let length = this.filearray.length;
    console.log("length = " + length);
    $("#loaderouterid").css("display", "block");
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

    if (values.image !== "") {
      formData.append("document", values.image);
    }
    //this.UploadDone = true;
    this.userService
      .callApiMultipart(formData)
      .pipe(first())
      .subscribe(
        (data: any) => {
          $("#Success").html(`<div class="alert alert-success" role="alert">
          Erfolgreich hochgeladen
        </div>`);
          $("#Success").css("text-align", "center");
          $("#Success").css("font-size", "30px");
          console.log("POST Request is successful ", data["_id"]);
          // this.UploadDone = true;
        },
        (error) => {
          $("#loaderouterid").css("display", "none");
          // this.UploadError = true;
          this.error = error;

          console.log("Error", error["error"]);
        },
        () => {
          console.log(length, index);
          if (length == index + 1) {
            if (values.document_type == "fremdvertrag") {
              this.userService
                .getDocumentsBYIDnew(this.customerid, "fremdvertrag")
                // .getDocumentsBYIDnew(this.customerid, "Angebot bekommen")
                .pipe(first())
                .subscribe(
                  (data11) => {
                    console.log(data11);
                    this.MetaDataLoopingDocListsecond();
                    this.customerDocListsecond = data11;

                    this.customerDocListsecondunique = [];

                    for (
                      let i = 0;
                      i < this.customerDocListsecond.length;
                      i++
                    ) {
                      let exists = 0;
                      for (
                        let j = 0;
                        j < this.customerDocListsecondunique.length;
                        j++
                      ) {
                        if (
                          this.customerDocListsecondunique[j].element
                            .ticket_no ==
                          this.customerDocListsecond[i].element.ticket_no
                        ) {
                          exists = 1;
                        }
                      }

                      if (exists == 0) {
                        this.customerDocListsecondunique.push(
                          this.customerDocListsecond[i]
                        );
                      }
                    }

                    setTimeout(() => {
                      $("#loaderouterid").css("display", "none");

                      Swal.fire({
                        title: "Angebote/Fremdverträge hinzugefügt",
                        text: "Ihre Vorgangsnmummer ist: " + values.ticket_no,
                        allowOutsideClick: false,
                        confirmButtonText: "Ok",
                        iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
                        confirmButtonColor: '#02a9ed',
                        customClass: {
                          icon: 'no-border'
                        },
                      }).then((result) => {
                        if (result.value) {
                          if (values.document_type == "fremdvertrag") {
                            $("#openexternalmodal").trigger("click");
                          } else {
                            $("#openrunningmodal").trigger("click");
                          }
                        }
                      });
                    }, 500);

                    this.setPage(1, "second");
                    this.show_doc_count();
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            } else {
              this.userService
                .getDocumentsBYID(this.customerid, "bestandsübertragung")
                .pipe(first())
                .subscribe(
                  (data) => {
                    console.log(data);
                    this.MetaDataLoopingDocList();
                    this.customerDocList = data;
                    console.log("innerloop");
                    console.log(this.customerDocList);

                    for (let i = 0; i < this.customerDocList.length; i++) {
                      let exists = 0;
                      for (
                        let j = 0;
                        j < this.customerDocListunique.length;
                        j++
                      ) {
                        if (
                          this.customerDocListunique[j].element.ticket_no ==
                          this.customerDocList[i].element.ticket_no
                        ) {
                          exists = 1;
                        }
                      }

                      if (exists == 0) {
                        this.customerDocListunique.push(
                          this.customerDocList[i]
                        );
                      }
                    }

                    console.log("customer doc list unique");
                    console.log(this.customerDocListunique);

                    this.userService
                      .dashboard_positions_list()
                      .subscribe((result) => {
                        console.log("Dashboard Positions fetched");
                        console.log(result);
                      });

                    setTimeout(() => {
                      $("#loaderouterid").css("display", "none");

                      Swal.fire({
                        title: "Bestandsübertragung hinzugefügt",
                        text: "Ihre Vorgangsnmummer ist: " + values.ticket_no,
                        allowOutsideClick: false,
                        confirmButtonText: "Ok",
                        iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
                        confirmButtonColor: '#02a9ed',
                        customClass: {
                          icon: 'no-border'
                        },
                      }).then((result) => {
                        if (result.value) {
                          if (values.document_type == "fremdvertrag") {
                            $("#openexternalmodal").trigger("click");
                          } else {
                            $("#openrunningmodal").trigger("click");
                          }
                        }
                      });
                    }, 500);

                    this.setPage(1);
                    this.show_doc_count();
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            }

            // .then((result) => {})
            // .catch((err) => {});
          }
        }
      );
  }

  showspartedoc1(sparte: any) {
    console.log("sparte");
    console.log(sparte);

    // let index = sparte.indexOf(" ");
    // if (index >= 0) sparte = sparte.slice(0, index); // or index + 1 to keep the character  this.pagedItems[i].element.inventorydata[j].Sparte

    console.log('customerDocList', this.customerDocList);
    console.log('customerDocListunique', this.customerDocListunique);
    this.customerDocListunique = [];

    if (sparte != "All") {
      for (let i = 0; i < this.customerDocList.length; i++) {
        for (
          let j = 0;
          j < this.customerDocList[i].element.inventorydata.length;
          j++
        ) {
          if (
            this.customerDocList[i].element.inventorydata[j].Sparte == sparte
          ) {
            let exists = 0;

            for (let k = 0; k < this.customerDocListunique.length; k++) {
              if (
                this.customerDocListunique[k].element.ticket_no ==
                this.customerDocList[i].element.ticket_no
              ) {
                // this.customerDocListunique.push(this.customerDocList[i]);
                exists = 1;
              }
            }
            console.log(exists);

            if (exists == 0) {
              this.customerDocListunique.push(this.customerDocList[i]);
            }
          }
        }
      }
    } else {
      for (let i = 0; i < this.customerDocList.length; i++) {
        let exists = 0;
        for (let k = 0; k < this.customerDocListunique.length; k++) {
          if (
            this.customerDocListunique[k].element.ticket_no ==
            this.customerDocList[i].element.ticket_no
          ) {
            //this.customerDocListunique.push(this.customerDocList[i]);
            exists = 1;
          }
        }

        if (exists == 0) {
          this.customerDocListunique.push(this.customerDocList[i]);
        }
      }

    }

    this.setPage(1);

    console.log("first");
    console.log(this.customerDocList);
    console.log(this.customerDocListunique);
  }

  showspartedoc2(sparte: any) {
    console.log("sparte");
    console.log(sparte);

    let index = sparte.indexOf(" ");
    if (index >= 0) sparte = sparte.slice(0, index); // or index + 1 to keep the character

    console.log(sparte);

    this.customerDocListsecondunique = [];

    if (sparte != "all") {
      for (let i = 0; i < this.customerDocListsecond.length; i++) {
        let exists = 0;
        for (let j = 0; j < this.customerDocListsecondunique.length; j++) {
          if (
            this.customerDocListsecondunique[j].element.ticket_no ==
            this.customerDocListsecond[i].element.ticket_no
          ) {
            exists = 1;
          }
        }

        if (exists == 0) {
          if (this.customerDocListsecond[i].element.protype.sparte == sparte) {
            this.customerDocListsecondunique.push(
              this.customerDocListsecond[i]
            );
          }
        }
      }
    } else {
      for (let i = 0; i < this.customerDocListsecond.length; i++) {
        let exists = 0;
        for (let j = 0; j < this.customerDocListsecondunique.length; j++) {
          if (
            this.customerDocListsecondunique[j].element.ticket_no ==
            this.customerDocListsecond[i].element.ticket_no
          ) {
            exists = 1;
          }
        }

        if (exists == 0) {
          this.customerDocListsecondunique.push(this.customerDocListsecond[i]);
        }
      }
    }

    this.setPage(1, "second");

    console.log("unique data");
    console.log(this.customerDocListsecondunique);
  }

  cl: any
  el: any
  opencontract(divid: any, btnid: any, id: any, cl: any, el: any) {
    console.log("open contract");
    this.el = el
    this.cl = cl
    console.log('elcl:', cl, el);

    $('#opencontractmodal').trigger("click")
    this.open_modal('opencontract')

    let btnvalue = $("#" + btnid + id).html();


    if (btnvalue == "Schließen") {
      $("#" + btnid + id).html("Öffnen");
      // this.open_modal('opencontract')
      // $("#" + divid + id).css("display", "none");
    } else {
      $(".openclass").html("Öffnen");
      $("#" + btnid + id).html("Schließen");
      // $(".opencontract").css("display", "none");
      // $("#" + divid + id).css("display", "block");
    }
  }

  closecontract(divid: any, btnid: any, id: any) {
    $("#" + btnid + id).html("Öffnen");
    $("#" + divid + id).css("display", "none");
  }

  opencontractdoc(index: any, url: any, event: any, embedid: any, tags: any) {
    console.log("open doc called");
    console.log(index);
    console.log(url);
    console.log(embedid);
    console.log(tags);
    console.log(event);

    if (event.target.innerHTML == "Öffnen") {
      console.log('here');

      $(".opencontractdocbtn").html("Öffnen");
      event.target.innerHTML = "Schließen";
      $(".contractdocs").css("display", "none");
      $("#" + embedid + index).css("display", "block");
      $("#" + embedid + index).attr("src", url);
      $("#" + embedid + index).attr("type", tags[0].split(",")[1]);
    } else {
      console.log(' elsehere');

      event.target.innerHTML = "Öffnen";
      $(".contractdocs").css("display", "none");
    }
  }

  handleimageuploadcompanycustomer() {
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
    };

    let j = 0;

    for (let i = 0; i < this.saveddoc.length; i++) {
      if (this.saveddoc[i].id != "passportpic") {
        //values.image = this.saveddoc[i].document_unique_id;
        values.image = this.filearray[j];
        values.document_type = "Allgemeines Dokument";
        values.document_sub_type = this.saveddoc[i].id;
        values.document_name = this.saveddoc[i].id;
        values.user_id = this.created_company_customer_id;
        values.product_partner = " ";
        values.companycode = "42140 DFG Finanzprofi GmbH";
        values.brand = "cefima";
        values.upload_by = "cefima_document";
        //values.ticket_no = this.localData.brokerregticketno;
        values.tags = this.saveddoc[i].tags;
        this.uploadDocumentcompanycustomer(values, j);

        j++;
      }
    }

    for (let i = 0; i < this.signeddoc.length; i++) {
      values.image = this.filearraypass[i];
      values.document_type = "Allgemeines Dokument";
      values.document_sub_type = "Upload Ausweisdokument";
      values.document_name =
        "Upload Ausweisdokument " + this.signeddoc[i].docname;
      values.user_id = this.created_company_customer_id;
      values.product_partner = " ";
      values.companycode = "42140 DFG Finanzprofi GmbH";
      values.brand = "cefima";
      values.upload_by = "cefima_document";
      //values.ticket_no = this.localData.brokerregticketno;
      values.tags = this.signeddoc[i].tags;
      this.uploadDocumentcompanycustomerpassport(values, i);
    }

    console.log("function in last");
    console.log(this.currentActiveRole);

    if (this.currentActiveRole == "customer") {
      console.log("condition satisfied");

      this._handleImageUploadcustomeresign();
    }
  }

  _handleImageUploadcustomeresign = (external_sign?: any) => {
    if (external_sign != "") {
      $("#loaderouterid").css("display", "block");
    }

    return new Promise(async (resolve) => {
      let that = this;
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
        document_name: "",
      };

      $("#MyDIvCustomer").css("display", "block");
      let pdfnew = new jsPDF("portrait", "pt", "a4");
      var width = pdfnew.internal.pageSize.width;
      pdfnew.html(document.getElementById("MyDIvCustomer")!, {
        html2canvas: {
          // insert html2canvas options here, e.g.
          width: width,
        },
        callback: async function (pdfnew: any) {
          that.pdffile = pdfnew.output("blob");
          values.image = that.pdffile;
          values.document_type = "Allgemeines Dokument";
          values.document_sub_type = "Power of attorney";
          values.document_name = "Maklervollmacht";

          values.user_id = that.created_company_customer_id;

          values.product_partner = " ";

          values.companycode = "42140 DFG Finanzprofi GmbH";
          values.brand = "cefima";
          values.upload_by = "cefima_document";

          values.tags.push(Math.round(that.pdffile.size / 1024));

          values.tags.push("application/pdf");
          values.tags.push(new Date().getTime());

          console.log("creating poa pdf");

          let data = await that.uploadDocumentcompanycustomeresign(
            values,
            external_sign
          );

          //values.tags = [];

          $("#MyDIvCustomer").css("display", "none");
          if (data) {
            resolve(data);
          }
        },
      });
    });
  };

  uploadDocumentcompanycustomeresign(values: any, external_sign = "") {
    console.log("apidocument check");
    console.log(values);
    // let length = this.filearray.length;

    return new Promise(async (resolve) => {
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
      formData.append("document_name", values.document_name);
      // formData.append("created_by", values.created_by);

      if (values.image !== "") {
        formData.append("document", values.image);
      }

      this.userService
        .callApiuploaddocumentnew(formData)
        .pipe(first())
        .subscribe(
          (data: any) => {
            console.log("apidocument" + JSON.stringify(data));

            if (data) {
              resolve(data);
            }

            if (external_sign != "") {
              setTimeout(() => {
                $("#loaderouterid").css("display", "none");

                Swal.fire({
                  position: "center",
                  allowOutsideClick: false,
                  title: "Ihre Daten wurden erfolgreich gespeichert.",
                  html: `<div>
                      <a id="buttonOne" style="color:#184297;" class="btn"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>  Maklervollmacht
                      <i class="fa fa-download" aria-hidden="true"></i> </a>

                    </div>`,
                  iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
                  confirmButtonText: "Ok",
                  confirmButtonColor: '#02a9ed',
                  customClass: {
                    icon: 'no-border'
                  },
                })
                  .then((result) => {
                    console.log(result);
                    if (result["isDismissed"]) {
                      console.log("iffffff");
                    } else {
                      console.log("elsesssssssss");
                      this.enablebutton = true;
                      $("#closeModalCompany").trigger("click");
                      $("#closeModalcompanycustomerPOAesign").trigger("click");
                      this.familyOrCompany = "";
                      this.reloadCurrentRoute();
                    }
                  })
                  .catch((err) => { });

                const ButtonOne = document.getElementById("buttonOne");
                ButtonOne!.addEventListener(
                  "click",
                  function () {
                    removepreview("one");
                  },
                  false
                );
                const removepreview = (e: any) => {
                  if (e == "one") {
                    this.exportAsPDFnewCustomer();
                  }
                };
              }, 2000);
            }
          },
          (error: any) => {
            if (error) {
              resolve(true);
            }
            console.log("Error", error);
          }
        );
    });
  }

  uploadDocumentcompanycustomer(values: any, index: any) {
    let length = this.filearray.length; // extra 1 added for POA document
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
    if (values.image !== "") {
      formData.append("document", values.image);
    }
    // this.UploadDone = true;
    this.userService
      .callApiuploaddocumentnew(formData)
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log(length, index);
          if (length == index + 1 && this.signeddoc.length == 0) {
            $("#loaderouterid").css("display", "none");

            if (this.currentActiveRole == "customer") {
              Swal.fire({
                position: "center",
                allowOutsideClick: false,
                title: "Ihre Daten wurden erfolgreich gespeichert.",
                html: `<div>
              <a id="buttonOne" style="color:#184297;" class="btn"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>  Maklervollmacht
              <i class="fa fa-download" aria-hidden="true"></i> </a>

            </div>`,
                iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
                confirmButtonText: "Ok",
                confirmButtonColor: '#02a9ed',
                customClass: {
                  icon: 'no-border'
                },
              })
                .then((result) => {
                  console.log(result);
                  if (result["isDismissed"]) {
                    console.log("iffffff");
                  } else {
                    console.log("elsesssssssss");
                    this.enablebutton = true;
                    $("#closeModalCompany").trigger("click");
                    $("#closeModalCompanyCustomer").trigger("click");
                    this.familyOrCompany = "";
                    this.reloadCurrentRoute();
                  }
                })
                .catch((err) => { });
            } else {
              Swal.fire({
                position: "center",
                allowOutsideClick: false,
                title: "Ihre Daten wurden erfolgreich gespeichert.",
                iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
                confirmButtonText: "Ok",
                confirmButtonColor: '#02a9ed',
                customClass: {
                  icon: 'no-border'
                },
              })
                .then((result) => {
                  console.log(result);
                  if (result["isDismissed"]) {
                    console.log("iffffff");
                  } else {
                    console.log("elsesssssssss");
                    this.enablebutton = true;
                    $("#closeModalCompany").trigger("click");
                    $("#closeModalCompanyCustomer").trigger("click");
                    this.familyOrCompany = "";
                    this.reloadCurrentRoute();
                  }
                })
                .catch((err) => { });
            }

            const ButtonOne = document.getElementById("buttonOne");
            ButtonOne!.addEventListener(
              "click",
              function () {
                removepreview("one");
              },
              false
            );
            const removepreview = (e: any) => {
              if (e == "one") {
                this.exportAsPDFnewCustomer();
              }
            };
          }
          $("#Success").html(`<div class="alert alert-success" role="alert">
      Erfolgreich hochgeladen
    </div>`);
          $("#Success").css("text-align", "center");
          $("#Success").css("font-size", "30px");
          console.log("POST Request is successful ", data);
        },
        (error: any) => {
          $("#loaderouterid").css("display", "none");
          // this.UploadError = true;
          console.log("Error", error["error"]);
        },
        () => { }
      );
  }

  uploadDocumentcompanycustomerpassport(values: any, index: any) {
    let length = this.filearraypass.length;
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
    if (values.image !== "") {
      formData.append("document", values.image);
    }
    // this.UploadDone = true;
    this.userService
      .callApiuploaddocumentnew(formData)
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log(length, index);
          if (length == index + 1) {
            $("#loaderouterid").css("display", "none");

            if (this.currentActiveRole == "customer") {
              Swal.fire({
                position: "center",
                allowOutsideClick: false,
                title: "Ihre Daten wurden erfolgreich gespeichert.",
                html: `<div>
                  <a id="buttonOne" style="color:#184297;" class="btn"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>  Maklervollmacht
                  <i class="fa fa-download" aria-hidden="true"></i> </a>

                </div>`,
                iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
                confirmButtonText: "Ok",
                confirmButtonColor: '#02a9ed',
                customClass: {
                  icon: 'no-border'
                },
              })
                .then((result) => {
                  console.log(result);
                  if (result["isDismissed"]) {
                    console.log("iffffff");
                  } else {
                    console.log("elsesssssssss");
                    this.enablebutton = true;
                    $("#closeModalCompany").trigger("click");
                    $("#closeModalCompanyCustomer").trigger("click");
                    this.familyOrCompany = "";
                    this.reloadCurrentRoute();
                  }
                })
                .catch((err) => { });
            } else {
              Swal.fire({
                position: "center",
                allowOutsideClick: false,
                title: "Ihre Daten wurden erfolgreich gespeichert.",
                iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
                confirmButtonText: "Ok",
                confirmButtonColor: '#02a9ed',
                customClass: {
                  icon: 'no-border'
                },
              })
                .then((result) => {
                  console.log(result);
                  if (result["isDismissed"]) {
                    console.log("iffffff");
                  } else {
                    console.log("elsesssssssss");
                    this.enablebutton = true;
                    $("#closeModalCompany").trigger("click");
                    $("#closeModalCompanyCustomer").trigger("click");
                    this.familyOrCompany = "";
                    this.reloadCurrentRoute();
                  }
                })
                .catch((err) => { });
            }
            const ButtonOne = document.getElementById("buttonOne");
            ButtonOne!.addEventListener(
              "click",
              function () {
                removepreview("one");
              },
              false
            );
            const removepreview = (e: any) => {
              if (e == "one") {
                this.exportAsPDFnewCustomer();
              }
            };
          }
          $("#Success").html(`<div class="alert alert-success" role="alert">
        Erfolgreich hochgeladen
      </div>`);
          $("#Success").css("text-align", "center");
          $("#Success").css("font-size", "30px");
          console.log("POST Request is successful ", data);
        },
        (error: any) => {
          $("#loaderouterid").css("display", "none");
          // this.UploadError = true;
          console.log("Error", error["error"]);
        },
        () => { }
      );
  }

  company_customer_poa(company: any) {
    console.log("company_customer clicked");
    console.log(company);

    this.finalFirstname1 = company.firstname;
    this.finalLastname1 = company.lastname;
    this.customer_city = company.city;
    this.customer_postCode = company.plz;
    this.customer_street = company.strassa;
    this.customer_streetNumber = company.strno;
    this.created_company_customer_id = company._id;

    if (
      company.companytype == "Einzelunternehmen" ||
      company.companytype == "Eingetragener Kaufmann (e.K.)"
    ) {
      this.showCompanyname = false;
      this.customer_company_name = "";
    } else {
      this.showCompanyname = true;
      this.customer_company_name = company.companyname;
    }
  }

  change_account_name(
    type: any,
    title: any,
    firstname: any,
    lastname_or_company: any,
    user_id: any = ""
  ) {
    // console.log("tab clicked");
    console.log("current tab User", this.currentTabUser);

    if (type == "Haushalt") {
      this.header_title = title;
      this.header_firstname = firstname;
      this.header_lastname = lastname_or_company;
      this.header_companyname = "";

      this.fetch_consulting_data(user_id);
    } else {
      this.header_title = title;
      this.header_companyname = lastname_or_company;
      this.header_firstname = "";
      this.header_lastname = "";
    }
  }

  fetch_consulting_data(user_id: any) {
    this.consulting_data = [];
    this.objekte_questions = [];
    this.gesundheitsangaben_questions = [];
    this.einkommen_questions = [];

    this.objekte_answers = [];
    this.gesundheitsangaben_answers = [];
    this.einkommen_answers = [];

    let data = {
      user_id: user_id,
    };

    this.userService.get_consulting_by_user(data).subscribe((result) => {
      this.consulting_data = result;

      // filling questions and answers according to tabs
      for (let i = 0; i < this.consulting_data.length; i++) {
        for (
          let j = 0;
          j < this.consulting_data[i].consulting_qna[0].questions.length;
          j++
        ) {
          // let data = {
          //   questions:this.consulting_data[i].consulting_qna[0].questions[j],
          //   answers: this.consulting_data[i].consulting_qna[0].answers[j],
          // };
          if (
            this.consulting_data[i].consulting_qna[0].questions[j].tab ==
            "Objekte"
          ) {
            this.objekte_questions.push(
              this.consulting_data[i].consulting_qna[0].questions[j]
            );
            this.objekte_answers.push(
              this.consulting_data[i].consulting_qna[0].answers[j]
            );
          } else if (
            this.consulting_data[i].consulting_qna[0].questions[j].tab ==
            "Gesundheitsangaben"
          ) {
            this.gesundheitsangaben_questions.push(
              this.consulting_data[i].consulting_qna[0].questions[j]
            );
            this.gesundheitsangaben_answers.push(
              this.consulting_data[i].consulting_qna[0].answers[j]
            );
          } else if (
            this.consulting_data[i].consulting_qna[0].questions[j].tab ==
            "Einkommen/Beschäftigung"
          ) {
            this.einkommen_questions.push(
              this.consulting_data[i].consulting_qna[0].questions[j]
            );
            this.einkommen_answers.push(
              this.consulting_data[i].consulting_qna[0].answers[j]
            );
          }
        }
      }
    });
  }

  remove_border(btnid: any) {
    $("#" + btnid)
      .parent()
      .css("border", "none");
  }

  openDialog(): void {
    this.responseobserve.unsubscribe();
    const dialogRef = this.dialog.open(VideoChatComponent, {
      maxWidth: "100vw",
      maxHeight: "100vh",
      height: "100%",
      width: "100%",
      hasBackdrop: false,
      position: { bottom: "0px", right: "0px" },
      panelClass: "video-container",
      data: {
        chat_data: this.video_chat_data,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.responseobserve = this.intervallTimer.subscribe(() =>
        this.get_unread_chat()
      );
    });
  }


}
