import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import jsPDF from 'jspdf';
import { Observable, Subject, startWith, map, first, interval } from 'rxjs';
import SignaturePad from 'signature_pad';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import {
  isSameDay,
  isSameMonth,
} from "date-fns";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from "angular-calendar";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NumberFormatStyle } from '@angular/common';

export interface Broker {
  name: string;
  value: string;
}

const colors: any = {
  blue: {
    primary: "#fff",
    secondary: "#fff",
  },
};

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

@Component({
  selector: 'app-main-data',
  templateUrl: './main-data.component.html',
  styleUrls: ['./main-data.component.css']
})
export class MainDataComponent {

  api_url = environment.API_URL;
  locale: any = "de";
  brand_id: any = environment.brand_id;
  hide = true;
  co: any;

  edited = false;
  companyTitleShow = false;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2020, 0, 1);
  options: any;

  myControlland = new FormControl();
  brokerFormControl = new FormControl();
  countryName: any;

  filteredOptions!: Observable<string[]>;
  filteredOptionsland!: Observable<string[]>;
  brokerListOptions!: Observable<Broker[]>;

  opened_tab: any = {
    personal_data: true,
    official_residence: false,
    more_info: false,
  };

  isFormDirty: boolean = false;

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

  customerFormGroup!: FormGroup;

  loaded: any = { rights: false, chat_cases: false, calendarLoad: false };
  currentUserToParse: any = localStorage.getItem("currentUser")
  currentUser = JSON.parse(this.currentUserToParse);

  currentActiveRole = localStorage.getItem("currentActiveRole");
  currentActiveRoleView =
    this.currentActiveRole == "b2b" ? "Vermittler" : this.currentActiveRole;
  // Calender Start
  events: any = [];
  @ViewChild("modalContent")
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  addEventFormGroup!: FormGroup;
  editEventFormGroup!: FormGroup;
  refresh: Subject<any> = new Subject();
  opened_event_data: any = {};

  //   signaturePad: SignaturePad;
  sendEmailFormGroup!: FormGroup;
  custom_emails: any = [];

  modalData!: {
    action: string;
    //event: CalendarEvent;
    event: any;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil text-white links"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent("Edited", event);
      },
    },
    {
      label: '<i class="fa fa-fw fa-times text-white links"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent("Deleted", event);
      },
    },
  ];

  handleEvent(action: string, event: any): void {
    this.opened_event_data = {};
    if (action == "Edited") {
      this.editEventFormGroup.reset();
      this.editEventFormGroup.patchValue({
        event_id: event.id,
        start_datetime: event.start,
        end_datetime: event.end,
        event_title: event.title,
        event_desc: event.desc,
      });
      this.opened_event_data = {
        event_id: event.id,
        start_datetime: event.start,
        end_datetime: event.end,
        event_title: event.title,
        event_desc: event.desc,
      };

      $("#event_ends_at_edit").attr(
        "min",
        event.start.toISOString().slice(0, 16)
      );
      $("#event_starts_at_edit").attr(
        "max",
        event.end.toISOString().slice(0, 16)
      );

      $("#open_editEventModal").trigger("click");
      this.open_modal("editEventModal");
    } else if (action == "Deleted") {
      Swal.fire({
        title: "Möchten Sie das ereignis sicher löschen?",
        allowOutsideClick: false,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ja",
        cancelButtonText: "Nein",
      }).then((result: any) => {
        if (result.value) {
          this.userService
            .delete_calendar_event({ event_id: event.id })
            .subscribe((result) => {
              this.events = [];
              this.userService
                .get_calendar_events_by_user({ user_id: this.currentUser._id })
                .subscribe((result: any) => {
                  result.map((event: any) => {
                    this.events.push({
                      id: event._id,
                      start: new Date(event.start_time),
                      end: new Date(event.end_time),
                      title: event.title,
                      desc: event.description,
                      actions: this.actions,
                      color: colors.blue,
                      meta: { type: "calendarEvent" },
                    });
                  });
                  this.refresh.next(0);
                  this.activeDayIsOpen = false;
                  $("#loaderouterid").css("display", "none");
                  Swal.fire({
                    title: "Erfolgreich gelöscht",
                    showCloseButton: true,
                    allowOutsideClick: false,
                    icon: "success",
                  }).then((result: any) => { });
                });
            });
        }
      });
    } else {
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: "lg" });
    }
  }

  // Calender End

  // Kommunikation Start
  private readonly units: unit[] = ["bytes", "KB", "MB", "GB", "TB", "PB"];
  show_case_searchbar: boolean = false;
  temp_chat_cases: any = [];
  opened_case_details: any = {};
  chat_messages: any = [];
  documents: any = [];
  all_uploaded: Boolean = false;
  doc_count: any = 0;
  createLetterFormGroup!: FormGroup;
  drawingnew: any = 0;
  opened: any = { section: [] };
  all_chat_cases: any = [];
  video_chat_data: any = {};
  chat_interval: any;
  initial_emails_data: any = {};
  public signaturePadOptions: Object = {
    minWidth: 2,
    canvasWidth: 750,
    canvasHeight: 300,
  };
  @ViewChild("canvas", { read: SignaturePad, static: true })
  canvas!: ElementRef;
  signaturePad!: SignaturePad;

  @ViewChild("canvastwo", { read: SignaturePad, static: true })
  canvastwo!: ElementRef;
  signaturePadtwo!: SignaturePad;
  // @ViewChild(SignaturePad) signaturePad: SignaturePad;
  // Kommunikation End

  // Zugriff/Rechte Start
  emailConfigurationFormGroup!: FormGroup;
  company_rights: any = [];
  chosen_dashboard_functionality_url: any = "";
  chosen_dashboard_functionality_type: any = 0;
  chosen_dashboard_company: any = {};
  chosen_dashboard_brand: any = {};
  userData: any;
  opened_emails: any = [];
  isConfigurationFormDirty: boolean = true;

  functionalities: any = [
    {
      name: "Beratung",
      url: "consulting",
      opened: false,
      inside_functionality: [],
    },
    {
      name: "Kunden",
      url: "customer",
      opened: false,
      inside_functionality: [],
    },
    {
      name: "Meine Daten",
      url: "meine-daten",
      opened: false,
      inside_functionality: [],
    },
  ];

  host_options: any = [
    { host: "smtp.gmail.com", name: "Gmail" },
    { host: "smtp.mail.yahoo.com", name: "Yahoo" },
    { host: "smtp.live.com", name: "Outlook.com" },
    { host: "smtp.aol.com", name: "AOL Mail" },
    { host: "smtp.protonmail.com", name: "ProtonMail" },
    { host: "smtp.zoho.com", name: "Zoho Mail" },
    { host: "smtp.gmx.com", name: "GMX Mail" },
    { host: "securesmtp.t-online.de", name: "T-Online (Deutsche Telekom)" },
    { host: "smtp.1und1.de", name: "1&1 (1und1)" },
    { host: "mail.gmx.net", name: "GMX (Germany Media Exchange)" },
    { host: "smtp.web.de", name: "Web.de" },
    { host: "mx.freenet.de", name: "Freenet" },
  ];
  searched_host_options: any = JSON.parse(JSON.stringify(this.host_options));

  imap_host_options: any = [
    { host: "imap.gmail.com", name: "Gmail" },
    { host: "imap.mail.yahoo.com", name: "Yahoo" },
    { host: "imap-mail.outlook.com", name: "Outlook.com" },
    { host: "imap.aol.com", name: "AOL Mail" },
    { host: "imap.protonmail.ch", name: "ProtonMail" },
    { host: "imap.zoho.com", name: "Zoho Mail" },
    { host: "imap.gmx.com", name: "GMX Mail" },
    { host: "imap.t-online.de", name: "T-Online (Deutsche Telekom)" },
    { host: "imap.ionos.de", name: "1&1 (1und1)" },
    { host: "imap.gmx.net", name: "GMX (Germany Media Exchange)" },
    { host: "imap.web.de", name: "Web.de" },
    { host: "imap.freenet.de", name: "Freenet" },
  ];
  searched_imap_host_options: any = JSON.parse(
    JSON.stringify(this.imap_host_options)
  );
  // Zugriff/Rechte End

  constructor(
    private modal: NgbModal,
    public userService: UserService,
    private _formBuilder: FormBuilder
  ) { }
  today_date: Date = new Date();


  ngOnInit(): void {
    console.log(localStorage.getItem("currentActiveRole"));

    this.customerFormGroup = this._formBuilder.group({
      title: ["", Validators.required],
      companyName: ["", Validators.required],
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
      brokernew: [""],
    });

    this.addEventFormGroup = this._formBuilder.group({
      start_datetime: ["", Validators.required],
      end_datetime: ["", Validators.required],
      event_title: ["", Validators.required],
      event_desc: ["", Validators.required],
    });

    this.editEventFormGroup = this._formBuilder.group({
      event_id: ["", Validators.required],
      start_datetime: ["", Validators.required],
      end_datetime: ["", Validators.required],
      event_title: ["", Validators.required],
      event_desc: ["", Validators.required],
    });

    this.getUserData(this.currentUser._id);

    this.filteredOptions =
      this.customerFormGroup.controls['nationality'].valueChanges.pipe(
        startWith(""),
        map((value) => this._filter(value))
      );

    this.createLetterFormGroup = this._formBuilder.group({
      letter_name: ["", Validators.required],
      letter_sections: this._formBuilder.array([]),
    });

    this.add_letter_section();

    this.emailConfigurationFormGroup = this._formBuilder.group({
      _id: [""],
      // sending_emails: this._formBuilder.array([]),
      // receiving_emails: this._formBuilder.array([]),
      emails: this._formBuilder.array([]),
    });
    this.addEmail("manual");

    this.signaturePad = new SignaturePad(this.canvas.nativeElement);
    this.signaturePadtwo = new SignaturePad(this.canvastwo.nativeElement);

    this.sendEmailFormGroup = this._formBuilder.group({
      from_email: ["", Validators.required],
      subject: ["", Validators.required],
      text: ["", Validators.required],
    });
  }

  ngOnDestroy() {
    // let index:any = this.initial_emails_data.emails.findIndex(email => email.main_receiver == "1");
    // if(index != -1){
    // 	let email_imap_data:any = {
    // 		email: this.initial_emails_data.emails[index].email,
    // 		email_password: this.initial_emails_data.emails[index].email_password,
    // 		host: this.initial_emails_data.emails[index].imap_email_host,
    // 		imap_port: this.initial_emails_data.emails[index].imap_port,
    // 		case_no: this.opened_case_details?.Activity_No,
    // 	};
    // 	this.opened_case_details = {};
    // 	this.chat_interval?.unsubscribe();
    // 	this.userService.close_imap_connection(email_imap_data).subscribe((result)=>{
    // 		console.log("Closed Imap connection");
    // 		console.log(result);
    // 	});
    // }else{
    // 	this.opened_case_details = {};
    // 	this.chat_interval?.unsubscribe();
    // }
  }

  tab_changed(event: any) {
    if (event.index == 3 && !this.loaded.calendarLoad) {
      this.userService
        .get_calendar_events_by_user({ user_id: this.currentUser._id })
        .subscribe((result: any) => {
          result.map((event: any) => {
            this.events.push({
              id: event._id,
              start: new Date(event.start_time),
              end: new Date(event.end_time),
              title: event.title,
              desc: event.description,
              actions: this.actions,
              color: colors.blue,
              meta: { type: "calendarEvent" },
            });
          });
          this.refresh.next(0);
          this.loaded.calendarLoad = true;
        });
    } else if (event.index == 1) {
      this.currentUser?.frontend_home_page.find((x:any) => x.id == this.brand_id)
        ? (this.chosen_dashboard_functionality_url =
          this.currentUser?.frontend_home_page.find(
            (x:any) => x.id == this.brand_id
          ).url)
        : (this.chosen_dashboard_functionality_url = "");
      this.userData = {
        user_home_page: { url: this.chosen_dashboard_functionality_url },
      };
    } else if (event.index == 4 && !this.loaded.chat_cases) {
      $("#loaderouterid").css("display", "flex");
      this.userService
        .get_case_by_user_id(this.currentUser._id)
        .subscribe((result) => {
          this.all_chat_cases = result;
          this.all_chat_cases = this.all_chat_cases.reverse();
          this.temp_chat_cases = JSON.parse(
            JSON.stringify(this.all_chat_cases)
          );
          this.loaded.chat_cases = true;
          $("#loaderouterid").css("display", "none");
        });
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsValue.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  titleChange($event: any) {
    this.companyTitleShow = false;
    if (this.customerFormGroup?.get("title")?.value == "Firma") {
      this.companyTitleShow = true;
      this.customerFormGroup.patchValue({
        companyname: this.customerFormGroup.value.companyname,
      });
    }
  }

  handleAllFields(data:any) {
    const splitArr = data.address_components;
    this.getAllFields(splitArr);
  }

  getAllFields(data:any){
    let that = this;
    const splitArr = data;
    splitArr.forEach(function (i:any, k:any) {
      let content: any = i.types;
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
      if (content.length > 1) {
        const countryArr = content;
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

  handleAddressChangeland(data:any) {
    const splitArr = data.address_components;
    this.getCountryland(splitArr);
  }

  getCountryland(data:any): any {
    let that = this;
    const splitArr = data;
    splitArr.forEach(function (i:any, k:any) {
      let content: any = i.types;
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
  }

  brokerDisplayFn(user: Broker): string {
    if (user.name != "") {
      this.edited = false;
      return user && user.name ? user.name : "";
    } else {
      this.edited = true;

      return user && user.name ? user.name : "";
    }
  }

  getUserData(id:any) {
    this.userService.getEditUser(id).subscribe((data1: any) => {
      const that = this;
      this.customerFormGroup.patchValue({
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
        // brokernew: (brokername) ? brokername : data1.broker,
        broker: data1.broker,
      });

      this.customerFormGroup.valueChanges.subscribe(() => {
        this.isFormDirty = true;
      });

      that.initial_emails_data = {};
      that.userService
        .get_user_email_configuration(data1._id)
        .subscribe((result: any) => {
          if (result) {
            that.initial_emails_data = JSON.parse(JSON.stringify(result));

            that.opened_emails = [];
            while (that.emails.length != 0) {
              that.emails.removeAt(0);
            }

            that.isConfigurationFormDirty = false;

            that.emailConfigurationFormGroup.patchValue({
              _id: result._id,
            });

            result.emails.map((email:any) => {
              that.addEmail("auto");
              that.emails.controls[that.emails.controls.length - 1].patchValue({
                email: email.email,
                email_password: email.email_password,

                imap_email_host: email.imap_email_host, // to receive emails
                imap_port: email.imap_port,

                smtp_email_host: email.smtp_email_host, // to send emails
                smtp_port: email.smtp_port,

                type: email.type, // 0 == for sending and receiving, 1 == for sending only, 2 == for receiving only.

                main_receiver: email.main_receiver, // if the type == 0 or 2,

                connection_tested: "1",
              });

              if (email.type == "0") {
                (that.emails as any).controls[
                  that.emails.controls.length - 1
                ].controls["smtp_email_host"].setValidators(
                  Validators.required
                );
                (that.emails as any).controls[
                  that.emails.controls.length - 1
                ].controls["smtp_port"].setValidators(Validators.required);
                (that.emails as any).controls[
                  that.emails.controls.length - 1
                ].controls["imap_email_host"].setValidators(
                  Validators.required
                );
                (that.emails as any).controls[
                  that.emails.controls.length - 1
                ].controls["imap_port"].setValidators(Validators.required);
              } else if (email.type == "1") {
                (that.emails as any).controls[
                  that.emails.controls.length - 1
                ].controls["smtp_email_host"].setValidators(
                  Validators.required
                );
                (that.emails as any).controls[
                  that.emails.controls.length - 1
                ].controls["smtp_port"].setValidators(Validators.required);
                (that.emails as any).controls[
                  that.emails.controls.length - 1
                ].controls["imap_email_host"].clearValidators();
                (that.emails as any).controls[
                  that.emails.controls.length - 1
                ].controls["imap_port"].clearValidators();
              } else {
                (that.emails as any).controls[
                  that.emails.controls.length - 1
                ].controls["imap_email_host"].setValidators(
                  Validators.required
                );
                (that.emails as any).controls[
                  that.emails.controls.length - 1
                ].controls["imap_port"].setValidators(Validators.required);
                (that.emails as any).controls[
                  that.emails.controls.length - 1
                ].controls["smtp_email_host"].clearValidators();
                (that.emails as any).controls[
                  that.emails.controls.length - 1
                ].controls["smtp_port"].clearValidators();
              }

              (that.emails as any).controls[
                that.emails.controls.length - 1
              ].controls["imap_email_host"].updateValueAndValidity();
              (that.emails as any).controls[
                that.emails.controls.length - 1
              ].controls["imap_port"].updateValueAndValidity();
              (that.emails as any).controls[
                that.emails.controls.length - 1
              ].controls["smtp_email_host"].updateValueAndValidity();
              (that.emails as any).controls[
                that.emails.controls.length - 1
              ].controls["smtp_port"].updateValueAndValidity();
            });
            // that.emailConfigurationFormGroup.valueChanges.subscribe(()=>{
            //   that.isConfigurationFormDirty = true;
            // });
          }
        });
    });
  }

  save() {
    let data = {
      roles: this.currentUser.roles,
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
      status: "1",
    };
    this.userService.updateUser(data).subscribe(
      (data:any) => {
        $("#loaderouterid").css("display", "none");
        this.isFormDirty = false;
        localStorage.setItem("token", data["token"]);
        localStorage.setItem("currentUser", JSON.stringify(data["user"]));

        Swal.fire({
          title: "Benutzer erfolgreich aktualisiert",
          showCancelButton: false,
          allowOutsideClick: false,
          icon: "success",
        });
      },
      (error) => {
        Swal.fire({
          title:
            "Benutzerdetails konnten nicht aktualisiert werden. Bitte versuchen Sie es später noch einmal.",
          showCancelButton: false,
          allowOutsideClick: false,
          icon: "error",
        });
      }
    );
  }

  open_modal(modal_id: any) {
    $("#" + modal_id).appendTo("body");
  }

  close_modal(modal_id: any, append_to: any) {
    $("#" + modal_id).appendTo("#" + append_to);
  }

  //   close_modal(modal_id: any, parentId: any) {
  // 	const modal = document.getElementById(modal_id);
  // 	const parent = document.getElementById(parentId);

  // 	if (modal && parent) {
  // 		// Remove the modal from the parent
  // 		parent.removeChild(modal);
  // 	}
  //   }

  add_event() {
    $("#loaderouterid").css("display", "flex");
    let data: any = {
      user_id: this.currentUser._id,
      title: this.addEventFormGroup.controls['event_title'].value,
      description: this.addEventFormGroup.controls['event_desc'].value,
      start_time: this.addEventFormGroup.controls['start_datetime'].value,
      end_time: this.addEventFormGroup.controls['end_datetime'].value,
    };
    this.userService.add_calendar_event(data).subscribe((result) => {
      this.events = [];
      this.userService
        .get_calendar_events_by_user({ user_id: this.currentUser._id })
        .subscribe((result: any) => {
          result.map((event:any) => {
            this.events.push({
              id: event._id,
              start: new Date(event.start_time),
              end: new Date(event.end_time),
              title: event.title,
              desc: event.description,
              actions: this.actions,
              color: colors.blue,
              meta: { type: "calendarEvent" },
            });
          });

          this.refresh.next(0);

          $("#loaderouterid").css("display", "none");
          Swal.fire({
            title: "Erfolgreich hinzugefügt",
            showCancelButton: false,
            allowOutsideClick: false,
            icon: "success",
          }).then((result) => {
            if (result.value) {
              $("#close_createEventModal").trigger("click");
            }
          });
        });
    });
  }

  update_event() {
    $("#loaderouterid").css("display", "flex");
    let data: any = {
      user_id: this.currentUser._id,
      event_id: this.editEventFormGroup.controls['event_id'].value,
      title: this.editEventFormGroup.controls['event_title'].value,
      description: this.editEventFormGroup.controls['event_desc'].value,
      start_time: this.editEventFormGroup.controls['start_datetime'].value,
      end_time: this.editEventFormGroup.controls['end_datetime'].value,
    };
    this.userService.update_calendar_event(data).subscribe((result) => {
      this.events = [];
      this.userService
        .get_calendar_events_by_user({ user_id: this.currentUser._id })
        .subscribe((result: any) => {
          result.map((event:any) => {
            this.events.push({
              id: event._id,
              start: new Date(event.start_time),
              end: new Date(event.end_time),
              title: event.title,
              desc: event.description,
              actions: this.actions,
              color: colors.blue,
              meta: { type: "calendarEvent" },
            });
          });
          this.refresh.next(0);
          $("#loaderouterid").css("display", "none");
          Swal.fire({
            title: "Erfolgreich aktualisiert",
            showCancelButton: false,
            allowOutsideClick: false,
            icon: "success",
          }).then((result) => {
            if (result.value) {
              $("#close_editEventModal").trigger("click");
            }
          });
        });
    });
  }

  check_edit_data_changed() {
    if (
      this.editEventFormGroup.controls['start_datetime'].value ==
      this.opened_event_data.start_datetime &&
      this.editEventFormGroup.controls['end_datetime'].value ==
      this.opened_event_data.end_datetime &&
      this.editEventFormGroup.controls['event_title'].value ==
      this.opened_event_data.event_title &&
      this.editEventFormGroup.controls['event_desc'].value ==
      this.opened_event_data.event_desc
    ) {
      return false;
    }
    return true;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent("Dropped or resized", event);
    this.refresh.next(0);
  }

  send_message(type?:any) {
    if (
      this.checkmessage() &&
      (this.documents.length <= 0 || !this.all_uploaded)
    ) {
      // if the message is not validated
      return;
    }

    let index = this.opened_case_details.employ_ids.indexOf(
      this.currentUser._id
    );
    let user_ids_to_send_message: any = JSON.parse(
      JSON.stringify(this.opened_case_details.employ_ids)
    );

    if (index != -1) {
      user_ids_to_send_message.splice(index, 1);
    }

    let inputmessage: any = $("#inputmessage1").val();
    let documents: any = [];
    this.documents.map((doc:any) =>
      documents.push({
        document_unique_id: doc.document_unique_id,
        tags: doc.tags,
      })
    );

    let newdata = {
      broker_id: user_ids_to_send_message,
      case_no: this.opened_case_details.Activity_No,
      company_name: this.opened_case_details.Uploaded_By,
      message: inputmessage,
      CreatedBy: this.currentUser._id,
      documents: documents,
      letter: type ? 1 : 0,
    };

    if (this.documents.length > 0) {
      this.upload_document(newdata);
    } else {
      this.send_chat_message(newdata);
    }
  }

  async handleImageChange(event: any, id: any) {
    // this.progressInfos = [];
    event.preventDefault();
    this.all_uploaded = false;
    let uploaded_files: any = [];

    const previewData = (source:any, modaltitle:any) => {
      $("#openpreviewmodel").trigger("click");
      this.open_modal("exampleModalpreview1");
      $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + modaltitle);
      $("#showpreviewdownload").attr("href", source);

      if (source.indexOf("data:application/pdf;") != -1) {
        $("#showpreviewimg").attr("src", "");
        $("#showpreviewimg").css("display", "none");

        $("#showpreviewpdf").attr("src", "");
        $("#showpreviewpdf").css("display", "block");
        $("#showpreviewpdf").attr("src", source);
      } else {
        $("#showpreviewpdf").attr("src", "");
        $("#showpreviewpdf").css("display", "none");

        $("#showpreviewimg").attr("src", "");
        $("#showpreviewimg").css("display", "block");
        $("#showpreviewimg").attr("src", source);
      }
    };
    const removeData = (j:any) => {
      //this.documents.splice(j,1);
      this.documents.splice(
        this.documents.map((doc:any) => doc.index == j),
        1
      );
      this.documents.length <= 0 ? (this.all_uploaded = false) : "";
    };

    var files = event.target.files; //FileList object
    var filesLength = files.length;
    for (let i = 0; i < filesLength; i++) {
      let f = files[i];
      let newsize: any = this.doc_count;

      this.doc_count = this.doc_count + 1;
      let Size1 = f.size;
      let Size = this.dataconvert(Size1);

      let extension = f.name.substr(f.name.lastIndexOf(".") + 1);
      let ImageName;
      let newkey;

      var fileReader = new FileReader();
      let typeofimage = f.type;
      let dateofdocument = f.lastModified;
      var d = new Date(dateofdocument);
      var date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

      fileReader.onload = function (e) {
        ImageName = (e.target as any).result;

        let extension = f.name.substr(f.name.lastIndexOf(".") + 1);
        if (extension == "doc" || extension == "docx") {
          ImageName = "../assets/docx.png";
        } else if (extension == "pdf" || extension == "pdfx") {
          ImageName = "../assets/PDF.svg";
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
            '<div class="pip col-md-4 mt-2" "id=\'pipremove' +
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
          ).insertAfter("#" + id);
          $("#videoSourceWrapper" + newsize).attr(
            "src",
            URL.createObjectURL(files[i])
          );
        } else {
          $(
            '<div class="pip col-md-6 mt-2 p-0" "id=\'pipremove' +
            newsize +
            "'>" +
            '<div class="row m-0">' +
            '<div class="col-md-2 p-0">' +
            '<img class="imageThumb" style="width: 100%;height:40px;margin-top: 15px;" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            "</div>" +
            '<div class="col-md-8 pr-0 pl-2" style="font-size:12px;">' +
            "<div> <b class='limitword' title='" +
            f.name +
            "'>Dokumentenname: " +
            f.name +
            "</b> </div>" +
            "<div> <b>Dateigröße: " +
            Size +
            "</b></div>" +
            "<div> <b class='limitword'>Dateityp: " +
            typeofimage +
            "</b> </div>" +
            "<div> <b>Datum des Dokuments: " +
            date +
            "</b> </div>" +
            "</div>" +
            "<div class='col-md-2 text-right'>" +
            '<div class="removepreview links" id="removepreviewid' +
            newsize +
            '" style="background: #6083c4;border-radius: 3px;width:25px;height:25px;font-size: 14px; text-align: center; padding: 1px;color: white;margin-top: 2px;cursor: pointer;">X</div>' +
            '<div class="previewdoc links mt-3" data-doc_name="' +
            f.name +
            '" data-preview_source="' +
            (e.target as any).result +
            '" id="previewdoc' +
            newsize +
            '" style="background: #6083c4;border-radius: 3px;width:25px;height:25px;font-size: 14px; text-align: center; padding: 1px;color: white;cursor: pointer;"><i class="fa fa-eye" aria-hidden="true"></i></div>' +
            "</div>" +
            "<div class='col-md-12 mt-2'>" +
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
          ).insertAfter("#" + id);
        }

        $(".previewdoc").click(function (event) {
          previewData($(this).data("preview_source"), $(this).data("doc_name"));
          event.stopPropagation();
          event.stopImmediatePropagation();
        });
        // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> </div>`).insertAfter(".pip")
        $("#removepreviewid" + newsize).click(function () {
          removeData(newsize);
          //$(this).parent(".pip").remove();
          $(this).parent().parent().parent(".pip").remove();
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
              // console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              // console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              if(event.total){
              $("div.percentageclass" + newsize).width(
                Math.round((event.loaded / event.total) * 100) + "%"
              );
              $("div.percentageclass" + newsize).html(
                Math.round((event.loaded / event.total) * 100) + "%"
              );}
              break;
            case HttpEventType.Response:
              $("#progressnew" + newsize).css("display", "none");
              let Size111 = f.size;
              let StringTypeCasting = this.dataconvert(Size111);
              let typeofimage = f.type;
              let dateofdocument = f.lastModified;
              let tags = [];
              let newtage =
                StringTypeCasting + "," + typeofimage + "," + dateofdocument;
              tags.push(newtage);
              let documentname = f.name + "-" + newsize;

              let file_object: any = {
                document_url: event.body.image1,
                document_unique_id: event.body.document_unique_id,
                document_type: "Allgemeines Dokument",
                document_sub_type: "Posteingang",
                user_id: this.currentUser._id,
                companycode:
                  this.opened_case_details.case_brand_details.company_info[0]
                    .company_code +
                  " " +
                  this.opened_case_details.case_brand_details.company_info[0]
                    .name,
                brand: this.opened_case_details.brand,
                tags: tags,
                upload_by: "business_administrator",
                product_partner: " ",
                document_name: documentname,
                created_by: this.currentUser._id,

                index: newsize,
              };

              uploaded_files.push(file_object);
              //this.documents[newsize]= file_object;
              this.documents.push(file_object);
              uploaded_files.length == filesLength
                ? (this.all_uploaded = true)
                : (this.all_uploaded = false);
              if (id == "result") {
                $("#removepreviewid" + newsize)
                  .parent()
                  .parent()
                  .parent(".pip")
                  .remove();
                this.upload_document();
              }
          }
        });
    }
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

  upload_document(newdata?: any) {
    let data: any = {
      documentname: "",
      documentlist: this.documents,
      manual_tags: "",
      ticketnew: this.opened_case_details.Activity_No,
      brand_id: this.brand_id,
    };
    $("#loaderouterid").css("display", "flex");
    this.userService
      .addmediadocument(data)
      .pipe(first())
      .subscribe((result: any) => {
        this.update_case_files(newdata);
      });
  }

  update_case_files(newdata?: any) {
    let document_unique_ids: any = [];
    this.documents.map((doc:any) =>
      document_unique_ids.push(doc.document_unique_id)
    );
    let data: any = {
      case_id: this.opened_case_details._id,
      files: document_unique_ids,
    };
    this.userService.add_file_in_case(data).subscribe((result) => {
      this.documents.map((doc: any) => {
        doc.ticket_no = this.opened_case_details.Activity_No;
        this.opened_case_details.document_details.unshift(doc);
      });
      if (newdata) {
        this.send_chat_message(newdata);
      } else {
        $("#loaderouterid").css("display", "none");
        this.documents = [];
      }
    });
  }

  send_chat_message(data: any) {
    this.userService.sendmessage(data).subscribe((result: any) => {
      $(".pip").remove();
      let message_data = {
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
            firstname: this.currentUser.firstname,
            lastname: this.currentUser.lastname,
          },
        ],
        documents: data.documents,
      };

      this.chat_messages.push(message_data);
      this.documents = [];

      //If we sent letter then reset formgroup and signatures
      if (data.letter == 1) {
        this.createLetterFormGroup.reset();
        this.drawingnew = 0;
        $("#close_createLetter").trigger("click");
        Swal.fire({
          title: `Brief erfolgreich versendet.`,
          showCloseButton: true,
          allowOutsideClick: false,
          icon: "success",
        });
        while (this.letter_sections.length != 0) {
          this.letter_sections.removeAt(0);
        }
        this.add_letter_section();
      }

      $("#inputmessage1").val("");
      $("#loaderouterid").css("display", "none");

      console.log("send_chat_message Done");
    });
  }

  get letter_sections() {
    return this.createLetterFormGroup.controls["letter_sections"] as FormArray;
  }

  add_letter_section() {
    this.letter_sections.push(this.letterSectionsFormGroup());
    this.opened.section[this.opened.section.length - 1] = false;
    this.opened.section.push(true);
  }

  letterSectionsFormGroup(): FormGroup {
    return this._formBuilder.group({
      heading: ["", Validators.required],
      content: ["", Validators.required],
    });
  }

  fetch_case_details(case_details: any) {
    if (this.opened_case_details?.Activity_No == case_details.Activity_No) {
      return;
    }

    $("#loaderouterid").css("display", "flex");

    this.opened_case_details = [];
    this.documents = [];
    this.video_chat_data = {};

    if (this.chat_interval) {
      this.chat_interval.unsubscribe();
    }
    this.userService
      .get_case_details_by_case_number(case_details.Activity_No)
      .subscribe((result:any) => {
        console.log("result came here");
        console.log(result);
        this.opened_case_details = result[0];

        this.video_chat_data = {
          broker_id: this.currentUser._id,
          user: JSON.parse(JSON.stringify(result[0])),
        };

        let message = {
          broker_id: this.currentUser._id,
          case_no: case_details.Activity_No,
        };

        // this.userService.get_brand_details_by_case_no(case_details.Activity_No).subscribe((result)=>{
        // 	if(result[0] && result[0]._id){
        this.userService
          .get_brand_by_id({ brand_id: this.brand_id })
          .subscribe((result:any) => {
            this.opened_case_details.case_brand_details = result[0];
            this.opened_case_details.brand = result[0]?.name;
            this.get_chat(message);
          });
        // 	}else{
        // 		this.get_chat(message);
        // 	}
        // });
      });
  }

  get_chat(message: any) {
    this.userService.getchatmessage(message).subscribe((success: any) => {
      if (this.initial_emails_data?.emails) {
        let index: any = this.initial_emails_data?.emails?.findIndex(
          (email:any) => email.main_receiver == "1"
        );
        if (index != -1) {
          let email_imap_data: any = {
            email: this.initial_emails_data.emails[index].email,
            email_password:
              this.initial_emails_data.emails[index].email_password,
            host: this.initial_emails_data.emails[index].imap_email_host,
            imap_port: this.initial_emails_data.emails[index].imap_port,
            case_no: this.opened_case_details?.Activity_No,
          };

          this.userService
            .get_chat_mails(email_imap_data)
            .subscribe((result: any) => {
              console.log("EMails of this chat is here");
              console.log(result);
              $("#loaderouterid").css("display", "none");

              if (result.data != "Data not found" && result.data.length > 0) {
                const mergedArray = [...success.result, ...result.data];
                // Sort the merged array by date (assuming 'date1' and 'date2' are date strings in ISO format)
                mergedArray.sort((a, b) => {
                  const dateA: any = new Date(a.createdAt || a.date);
                  const dateB: any = new Date(b.createdAt || b.date);
                  return dateA - dateB;
                });
                this.chat_messages = mergedArray;
              } else {
                this.chat_messages = success.result;
              }

              let first_time: any = true;
              this.chat_interval = interval(1000).subscribe((result) => {
                this.userService.getchatunreadmessage(message).subscribe(
                  (success: any) => {
                    success.result.map((result:any) =>
                      this.chat_messages.push(result)
                    );

                    if (first_time) {
                      this.get_unread_emails(email_imap_data);
                      first_time = false;
                    }
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              });
            });
        } else {
          this.chat_messages = success.result;
          $("#loaderouterid").css("display", "none");
          this.chat_interval = interval(1000).subscribe((result) => {
            this.userService.getchatunreadmessage(message).subscribe(
              (success: any) => {
                success.result.map((result:any) => this.chat_messages.push(result));
              },
              (err) => {
                console.log(err);
              }
            );
          });
        }
      } else {
        this.chat_messages = success.result;
        $("#loaderouterid").css("display", "none");
        this.chat_interval = interval(1000).subscribe((result) => {
          this.userService.getchatunreadmessage(message).subscribe(
            (success: any) => {
              success.result.map((result:any) => this.chat_messages.push(result));
            },
            (err) => {
              console.log(err);
            }
          );
        });
      }
    });
  }

  get_unread_emails(email_imap_data: any) {
    this.userService.get_chat_unread_mails(email_imap_data).subscribe(
      (result: any) => {
        if (result.data != "Data not found" && result.data.length > 0) {
          result.data.map((email:any) => {
            this.chat_messages.push(email);
          });
        }
        if (this.opened_case_details?.Activity_No == email_imap_data?.case_no) {
          this.get_unread_emails(email_imap_data);
        }
      },
      (error) => {
        console.log("Failed to load");
        this.get_unread_emails(email_imap_data);
      }
    );
  }

  send_email() {
    let email_to: any = [];
    this.opened_case_details?.userinfo.map((user:any) => {
      if (user._id != this.userService.LoggedInUser._id) {
        email_to.push(user.email);
      }
    });
    this.custom_emails.map((email:any) => email_to.push(email));
    if (email_to.length < 1) {
      Swal.fire({
        title: "Keine Empfänger gefunden.",
        showCloseButton: true,
        allowOutsideClick: false,
        icon: "error",
      });
      return;
    }

    let data: any = {
      host: this.sendEmailFormGroup.controls['from_email'].value.smtp_email_host,
      email: this.sendEmailFormGroup.controls['from_email'].value.email,
      email_password:
        this.sendEmailFormGroup.controls['from_email'].value.email_password,
      name:
        this.userService.LoggedInUser.firstname +
        " " +
        this.userService.LoggedInUser.lastname,
      subject:
        this.opened_case_details?.Activity_No +
        " " +
        this.sendEmailFormGroup.controls['subject'].value,
      text: this.sendEmailFormGroup.controls['text'].value,
      email_to: email_to,
    };
    console.log("check email data here");
    console.log(data);
    $("#loaderouterid").css("display", "flex");
    this.userService.send_chat_email(data).subscribe((result: any) => {
      console.log("Email result came here");
      console.log(result);
      $("#loaderouterid").css("display", "none");
      if (result.status == "200") {
        Swal.fire({
          title: "Email wurde erfolgreich Versendet.",
          showCloseButton: true,
          allowOutsideClick: false,
          icon: "success",
        }).then((result) => {
          this.custom_emails = [];
          this.sendEmailFormGroup.reset();
          $("#close_email_modal").trigger("click");
        });
      } else {
        Swal.fire({
          title:
            "E-Mail konnte nicht gesendet werden. Bitte überprüfen Sie E-Mail, Host und E-Mail-Passwort erneut",
          icon: "error",
          showCloseButton: true,
          allowOutsideClick: false,
        });
      }
    });
  }

  searchCase(event: any) {
    if (event.target.value) {
      this.temp_chat_cases = [];
      for (let i = 0; i < this.all_chat_cases.length; i++) {
        if (
          this.all_chat_cases[i].Activity_No.toLowerCase().includes(
            event.target.value.toLowerCase()
          ) ||
          this.all_chat_cases[i].Transaction_Type.toLowerCase().includes(
            event.target.value.toLowerCase()
          )
        ) {
          this.temp_chat_cases.push(this.all_chat_cases[i]);
        } else {
          for (let j = 0; j < this.all_chat_cases[i].case_users.length; j++) {
            if (
              this.all_chat_cases[i].case_users[j].firstname
                .toLowerCase()
                .includes(event.target.value.toLowerCase()) ||
              this.all_chat_cases[i].case_users[j].lastname
                .toLowerCase()
                .includes(event.target.value.toLowerCase()) ||
              this.all_chat_cases[i].case_users[j].companyname
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
            ) {
              this.temp_chat_cases.push(this.all_chat_cases[i]);
            }
          }
        }
      }
    } else {
      this.temp_chat_cases = JSON.parse(JSON.stringify(this.all_chat_cases));
    }
  }

  previewdocclick(url:any, unique_id:any, name: string) {
    $("#openpreviewmodel").trigger("click");
    this.open_modal("exampleModalpreview1");

    //$('#showpreviewpdf').attr('src',this.previewidandsrc[j]);

    $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + name);

    $("#showpreviewdownload").attr(
      "href",
      this.api_url + "document/downloaddocument/" + unique_id
    );

    if (unique_id.indexOf(".pdf") != -1) {
      $("#showpreviewimg").attr("src", "");
      $("#showpreviewimg").css("display", "none");

      $("#showpreviewpdf").attr("src", "");
      $("#showpreviewpdf").css("display", "block");
      $("#showpreviewpdf").attr("src", url);
    } else {
      $("#showpreviewpdf").attr("src", "");
      $("#showpreviewpdf").css("display", "none");

      $("#showpreviewimg").attr("src", "");
      $("#showpreviewimg").css("display", "block");
      $("#showpreviewimg").attr("src", url);
    }
  }

  preview_chat_doc(document: any) {
    this.userService
      .get_document_url_by_document_unique_id({
        document_unique_id: document.document_unique_id,
      })
      .subscribe((result: any) => {
        this.previewdocclick(
          result.response,
          document.document_unique_id,
          document.document_unique_id
        );
      });
  }

  send_letter() {
    $("#loaderouterid").css("display", "flex");
    $("#letter_pdf").css("display", "block");
    setTimeout(() => {
      let pdf: any = new jsPDF("portrait", "pt", "a4");
      var width = pdf.internal.pageSize.width;
      let that = this;
      pdf.html(document.getElementById("letter_pdf"), {
        html2canvas: {
          width: width,
        },
        autoPaging: "text",
        margin: [10, 0, 10, 0],
        callback: function (pdf: any) {
          // pdf.save();
          // return;
          let file = pdf.output("blob");
          const formData = new FormData();
          formData.append("document", file);
          that.userService
            .uploaddocumentwithoutticketno(formData)
            .subscribe((event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.Response:
                  that.all_uploaded = true;
                  $("#letter_pdf").css("display", "none");

                  let Size111 = file.size;
                  let StringTypeCasting = that.dataconvert(Size111);
                  let typeofimage = file.type;
                  let dateofdocument = file.lastModified;
                  let tags = [];
                  let newtage =
                    StringTypeCasting +
                    "," +
                    typeofimage +
                    "," +
                    dateofdocument;
                  tags.push(newtage);
                  let documentname = "Letter";

                  let file_object: any = {
                    document_url: event.body.image1,
                    document_unique_id: event.body.document_unique_id,
                    document_type: "Allgemeines Dokument",
                    document_sub_type: "Letter",
                    user_id: that.currentUser._id,
                    companycode:
                      that.opened_case_details.case_brand_details
                        .company_info[0].company_code +
                      " " +
                      that.opened_case_details.case_brand_details
                        .company_info[0].name,
                    brand: that.opened_case_details.brand,
                    tags: tags,
                    upload_by: localStorage.getItem("currentActiveRole"),
                    product_partner: " ",
                    document_name: documentname,
                    created_by: that.currentUser._id,
                  };
                  console.log(file_object);

                  that.documents.push(file_object);
                  that.send_message("letter");
              }
            });
        },
      });
    }, 2000);
  }

  checkmessage() {
    if ($("#inputmessage1").val() != "") {
      return false;
    }
    return true;
  }

  clear() {
    let img_class = "imageidnew";
    this.drawingnew = 0;
    this.signaturePad.clear();
    $("." + img_class).attr("src", "");
  }

  add_class() {
    setTimeout(() => {
      $("body").addClass("modal-open");
    }, 500);
  }

  drawComplete1() {
    // will be notified of szimek/signature_pad's onEnd event
    let base64Data = this.signaturePad.toDataURL();
    let base64Datablob: any = this.dataURLtoBlob(base64Data);
    // let base64Datablob:any=this.urltoFile(base64Data,'hello.jpg','	image/jpeg');
    this.drawingnew = 1;
    $(".imageidnew").attr("src", this.signaturePad.toDataURL());
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

  choosing_homepage(event: any, type: any) {
    if (type == "company") {
      this.chosen_dashboard_company = this.company_rights.find(
        (company:any) => company._id == event.value
      );
    } else if (type == "brand") {
      this.chosen_dashboard_brand = this.chosen_dashboard_company.brands.find(
        (brand:any) => brand._id == event.value
      );
    }
  }

  update_homepage() {
    let data: any = {
      id: this.brand_id,
      url: this.chosen_dashboard_functionality_url,
      user_id: this.currentUser._id,
    };

    $("#loaderouterid").css("display", "flex");

    this.userService.update_frontend_home_page(data).subscribe((result) => {
      $("#loaderouterid").css("display", "none");
      let user_data: any = localStorage.getItem("currentUser");
      user_data = JSON.parse(user_data);
      delete user_data.frontend_home_page;
      delete this.currentUser.frontend_home_page;
      if (data.url != "") {
        user_data.frontend_home_page = [
          { type: data.type, url: data.url, id: data.id },
        ];
        this.currentUser.frontend_home_page = [
          { type: data.type, url: data.url, id: data.id },
        ];
      }
      localStorage.setItem("currentUser", JSON.stringify(user_data));

      Swal.fire({
        title: "Ihre Startseite wurde erfolgreich geändert.",
        showCloseButton: true,
        allowOutsideClick: false,
        icon: "success",
      }).then((result: any) => { });
    });
  }

  get emails() {
    return this.emailConfigurationFormGroup.controls["emails"] as FormArray;
  }

  emailFormGroup(): FormGroup {
    return this._formBuilder.group({
      email: ["", Validators.required],
      email_password: ["", Validators.required],

      imap_email_host: ["", Validators.required], // to receive emails
      imap_port: ["993", Validators.required],

      smtp_email_host: ["", Validators.required], // to send emails
      smtp_port: ["465", Validators.required],

      type: ["0", Validators.required], // 0 == for sending and receiving, 1 == for sending only, 2 == for receiving only.

      main_receiver: ["0"], // if the type == 0 or 2,

      connection_tested: ["", Validators.required],
    });
  }

  addEmail(type: any) {
    this.emails.push(this.emailFormGroup());
    if (type == "manual") {
      this.opened_emails.push(true);
      if (this.emails.controls.length == 1) {
        this.emails.controls[0].patchValue({ main_receiver: "1" });
      }
    } else {
      this.opened_emails.push(false);
    }
  }

  check_form_changed() {
    if (
      this.emails?.controls?.length != this.initial_emails_data?.emails?.length
    ) {
      this.isConfigurationFormDirty = true;
      return true;
    }

    for (let i = 0; i < this.initial_emails_data.emails.length; i++) {
      if (
        (this.emails as any).controls[i].controls.email.value !=
        this.initial_emails_data.emails[i].email ||
        (this.emails as any).controls[i].controls.email_password.value !=
        this.initial_emails_data.emails[i].email_password ||
        (this.emails as any).controls[i].controls.imap_email_host.value !=
        this.initial_emails_data.emails[i].imap_email_host ||
        (this.emails as any).controls[i].controls.imap_port.value !=
        this.initial_emails_data.emails[i].imap_port ||
        (this.emails as any).controls[i].controls.smtp_email_host.value !=
        this.initial_emails_data.emails[i].smtp_email_host ||
        (this.emails as any).controls[i].controls.smtp_port.value !=
        this.initial_emails_data.emails[i].smtp_port ||
        (this.emails as any).controls[i].controls.type.value !=
        this.initial_emails_data.emails[i].type ||
        (this.emails as any).controls[i].controls.main_receiver.value !=
        this.initial_emails_data.emails[i].main_receiver
      ) {
        this.emails.controls[i].patchValue({
          connection_tested: "",
        });

        this.isConfigurationFormDirty = true;
        return true;
      }
    }

    this.isConfigurationFormDirty = false;
    return false;
  }

  save_email_configuration() {
    console.log("Saving the email configurations");
    console.log(this.emailConfigurationFormGroup.controls['emails'].value);

    $("#loaderouterid").css("display", "flex");
    let data: any = {
      user_id: this.currentUser._id,
      // sending_email_host: this.emailConfigurationFormGroup.controls.sending_email_host.value,
      // sending_email: this.emailConfigurationFormGroup.controls.sending_email.value,
      // sending_email_password: this.emailConfigurationFormGroup.controls.sending_email_password.value,
      // receiving_email_host: this.emailConfigurationFormGroup.controls.receiving_email_host.value,
      // receiving_email: this.emailConfigurationFormGroup.controls.receiving_email.value,
      // receiving_email_password: this.emailConfigurationFormGroup.controls.receiving_email_password.value,

      // smtp_port: this.emailConfigurationFormGroup.controls.smtp_port.value,
      // imap_port: this.emailConfigurationFormGroup.controls.imap_port.value,

      emails: this.emailConfigurationFormGroup.controls['emails'].value,
    };

    if (this.emailConfigurationFormGroup.controls['_id'].value) {
      data.configuration_id =
        this.emailConfigurationFormGroup.controls['_id'].value;

      this.userService
        .update_user_email_configuration(data)
        .subscribe((result) => {
          $("#loaderouterid").css("display", "none");
          this.isConfigurationFormDirty = false;
          this.initial_emails_data.emails = JSON.parse(
            JSON.stringify(this.emails.value)
          );
          Swal.fire({
            title: "E-Mail-Konfiguration erfolgreich aktualisiert.",
            showCloseButton: true,
            allowOutsideClick: false,
            icon: "success",
          });
        });
    } else {
      this.userService
        .save_user_email_configuration(data)
        .subscribe((result) => {
          $("#loaderouterid").css("display", "none");
          Swal.fire({
            title: "E-Mail-Konfiguration erfolgreich gespeichert.",
            showCloseButton: true,
            allowOutsideClick: false,
            icon: "success",
          });
        });
    }
  }

  check_email_connections(email_index: any) {
    let data: any = {
      smtp_email_host: (this.emails as any).controls[email_index].controls
        .smtp_email_host.value,
      smtp_port: (this.emails as any).controls[email_index].controls.smtp_port
        .value,

      imap_email_host: (this.emails as any).controls[email_index].controls
        .imap_email_host.value,
      imap_port: (this.emails as any).controls[email_index].controls.imap_port
        .value,

      email: (this.emails as any).controls[email_index].controls.email.value,
      email_password: (this.emails as any).controls[email_index].controls
        .email_password.value,

      email_index: email_index,
    };

    $("#loaderouterid").css("display", "flex");

    if ((this.emails as any).controls[email_index].controls.type.value == "0") {
      // check both(SMTP & IMAP) connections
      data.imap = 1;
      this.check_smtp_connection(data);
    } else if (
      (this.emails as any).controls[email_index].controls.type.value == "1"
    ) {
      // check only SMTP connection.
      data.imap = 0;
      this.check_smtp_connection(data);
    } else {
      // check only IMAP connection
      this.check_imap_connection(data);
    }
  }

  check_smtp_connection(data:any) {
    console.log("Testing smtp connection with the data");
    console.log(data);
    console.log(data.imap == 1);
    this.userService.check_smtp_connection(data).subscribe((result: any) => {
      if (data.imap == 1) {
        this.check_imap_connection(data);
      } else {
        $("#loaderouterid").css("display", "none");
        if (result.status == "200") {
          this.emails.controls[data.email_index].patchValue({
            connection_tested: "1",
          });
          console.log(
            "this.emails.controls[data.email_index]: ",
            typeof (this.emails as any).controls[data.email_index]?.controls
              .connection_tested.value,
            (this.emails as any).controls[data.email_index]?.controls
              .connection_tested.value
          );
          Swal.fire({
            title: "E-Mail eingerichtet",
            showCloseButton: true,
            allowOutsideClick: false,
            icon: "success",
          });
        } else if (result.status == "500") {
          this.emails.controls[data.email_index].patchValue({
            connection_tested: "",
          });
          Swal.fire({
            title: "Prüfung fehlgeschlagen",
            showCloseButton: true,
            allowOutsideClick: false,
            icon: "error",
          });
        }
      }
    });
  }

  check_imap_connection(data:any) {
    this.userService.check_imap_connection(data).subscribe((result: any) => {
      $("#loaderouterid").css("display", "none");
      if (result.status == "200") {
        this.emails.controls[data.email_index].patchValue({
          connection_tested: "1",
        });
        Swal.fire({
          title: "E-Mail eingerichtet",
          showCloseButton: true,
          allowOutsideClick: false,
          icon: "success",
        });
      } else if (result.status == "500") {
        this.emails.controls[data.email_index].patchValue({
          connection_tested: "",
        });
        Swal.fire({
          title: "Prüfung fehlgeschlagen",
          showCloseButton: true,
          allowOutsideClick: false,
          icon: "error",
        });
      }
    });
  }

  match_my_email(chat_email: any) {
    let exists: Boolean;
    this.initial_emails_data.emails.findIndex(
      (email:any) => email.email == chat_email
    ) != -1
      ? (exists = true)
      : (exists = false);
    return exists;
  }

  change_email_type(event: any, email_index: any) {
    console.log("Changing email type");
    console.log(event);
    if (event.value == "0") {
      (this.emails as any).controls[email_index].controls[
        "smtp_email_host"
      ].setValidators(Validators.required);
      (this.emails as any).controls[email_index].controls[
        "smtp_port"
      ].setValidators(Validators.required);
      (this.emails as any).controls[email_index].controls[
        "imap_email_host"
      ].setValidators(Validators.required);
      (this.emails as any).controls[email_index].controls[
        "imap_port"
      ].setValidators(Validators.required);
    } else if (event.value == "1") {
      (this.emails as any).controls[email_index].controls[
        "smtp_email_host"
      ].setValidators(Validators.required);
      (this.emails as any).controls[email_index].controls[
        "smtp_port"
      ].setValidators(Validators.required);
      (this.emails as any).controls[email_index].controls[
        "imap_email_host"
      ].clearValidators();
      (this.emails as any).controls[email_index].controls[
        "imap_port"
      ].clearValidators();
    } else if (event.value == "2") {
      (this.emails as any).controls[email_index].controls[
        "imap_email_host"
      ].setValidators(Validators.required);
      (this.emails as any).controls[email_index].controls[
        "imap_port"
      ].setValidators(Validators.required);
      (this.emails as any).controls[email_index].controls[
        "smtp_email_host"
      ].clearValidators();
      (this.emails as any).controls[email_index].controls[
        "smtp_port"
      ].clearValidators();
    }
    (this.emails as any).controls[email_index].controls[
      "smtp_email_host"
    ].updateValueAndValidity();
    (this.emails as any).controls[email_index].controls[
      "smtp_port"
    ].updateValueAndValidity();
    (this.emails as any).controls[email_index].controls[
      "imap_email_host"
    ].updateValueAndValidity();
    (this.emails as any).controls[email_index].controls[
      "imap_port"
    ].updateValueAndValidity();
  }
}

