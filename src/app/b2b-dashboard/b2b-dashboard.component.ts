import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import * as intlTelInput from 'intl-tel-input';
import { interval, Subscription, Observable, first } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { PagerService } from '../_services';
import { AuthService } from '../auth.service';
import { EventEmitterService } from '../event-emitter.service';
import { UserService } from '../user.service';
import { VideoChatComponent } from '../video-chat/video-chat.component';
import { DomSanitizer } from '@angular/platform-browser';
// import { AgmMap } from "@agm/core";



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
export interface Broker {
  name: string;
  value: string;
}
@Component({
  selector: 'app-b2b-dashboard',
  templateUrl: './b2b-dashboard.component.html',
  styleUrls: ['./b2b-dashboard.component.css']
})
export class B2bDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  defaultCenter = { lat: 55.5815245, lng: 36.8251383 };
  currentCenter = Object.assign({}, this.defaultCenter);
  createobserve: any;
  zoom = 3;
  public intervallTimer = interval(1000);
  private responseobserve: Subscription;
  selectedUser = {
    id: "",
  };
  private readonly units: unit[] = ["bytes", "KB", "MB", "GB", "TB", "PB"];
  // @ViewChild(AgmMap, { read: AgmMap }) agmMap: any;
  showCustomer = false;
  currentid: any
  showmekFinanz = false;
  brokerList: Broker[] = [];
  showFiorettoImmob = false;
  edited = false;
  customerList: any = [];
  otpSuccess = false;
  editedans = false;
  activecontactform: any = "";
  showBirema = false;
  recordCount: any;
  year: any = new Date().getFullYear();
  showFiorettoMedia = false;
  showAirmage = false;
  unreadcount: any = 0;
  phoneFormGroup: FormGroup;
  showHoraiDetektei = false;
  uploadingdata = false;
  showVarioImport = false;
  showSterbVorsoge = false;
  selectedbroker: any = [];
  showCheckntrack = false;
  customerno: any
  alluserdetails: any = [];
  showceodoc = false;
  customerDocList: any = [];
  customerNo: string;
  ceoDocList: any = [];

  ceoDocListunique: any = [];

  editsendbutton: any = true;
  shareholdersDocList: any = [];
  caselistnew: any = [];
  latitude: any;
  messagelist: any = [];
  shareholdersindex: any = "";
  longitude: any;
  token: any;
  T_N: any = "";
  origin = {};
  values = "";
  destination = {};
  pager: any = {};
  disableEditSubmit: boolean = true;
  pagerGDOC: any = {};
  lastcase_no: any = "";
  pagertype: any = [{ type1: "" }, { type2: "" }, { type3: "" }];
  pagedItems: any[] = [];
  pagedItemsGDOC: any[] = [];
  pagedItemsGDOCSearch: any[] = [];
  pagedItemstype: any[] = [{ type1: [] }, { type2: [] }, { type3: [] }];
  pagedItemstypeSearch: any[] = [{ type1: [] }, { type2: [] }, { type3: [] }];
  docFromGroup: FormGroup;
  startRecord: any;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2020, 0, 1);
  endRecord: any;
  documentidforans: any = [];
  documentid: any = [];
  documentlist: any = [];
  filename: any = [];
  newcaselistnew: any = [];
  type1: any = [];
  verificationData: any = [];
  type2: any = [];
  error: { [index: string]: any } = {};
  type3: any = [];
  startRecordGDOC: number = 1
  startRecordtype: any = [{ type1: "" }, { type2: "" }, { type3: "" }];
  api_url: string;
  inputfield: string = "Telefonnummer eingeben";
  showButton: boolean = false;
  endRecordGDOC: any;
  endRecordtype: any = [{ type1: "" }, { type2: "" }, { type3: "" }];
  ImgUrl: string = "";
  website_urlupdate: boolean = false;
  phonenumupdate: boolean = false;
  dataSave: any;
  welcomevideodata: boolean = false;
  brokerlogodata: boolean = false;
  brokermarketingdetails: boolean = false;
  Size: string = "";
  href: string = "";
  financialcheckdata: any = [];
  financialcheckdataceo: any = [];
  financialcheckdatashareholder: any = [];
  financialcheckdatamiddle: any = [];
  ceodatacheckupnewdata: any = [];
  shareholderdatacheckupnewdata: any = [];
  middledatacheckupnewdata: any = [];
  selectedindexforshareholder: any = "";
  otp = false;
  selectedindexformiddle: any = "";
  filearraynew: any[] = [];
  brokerformtype1: FormGroup;
  askquestion: FormGroup;
  personaldataform: FormGroup;
  companydataform: FormGroup;
  otpError = false;
  brokerformtype2: FormGroup;
  brokerformtype3: FormGroup;
  ptname: any;
  brokerListOptions: Observable<Broker[]>;
  Transaction_Type: any;
  selectedptid: any;
  selectedppid: any;
  filearray: any[] = [];
  localData: any = [];
  viewquestiondata: any = [];
  addquestionformgroup: FormGroup;
  ShowDiv: boolean = false;
  selectedquestion: any = "";
  phoneData: any = [];
  TimeLineData: [] = [];
  queryID: any;
  loginRole = localStorage.getItem("currentActiveRole");
  title: any
  lastname: any
  firstname: any
  id: any

  values_document: any = [];

  detect_upload_changes: any = 0;

  openid: any = "";
  firstdocumentdata: any = [];
  firstdocumentdataSearch: any = []
  COMPANYNAME: any
  // localData = JSON.parse(localStorage.getItem("currentUser"));
  documents: any;

  companytype: any

  unique_documents: any = [];

  tags: any[] = [];
  previewid: string;
  routeParams: any;
  changesdone: boolean = false;

  opened_tab: any = {
    personal_data: true,
    official_residence: false,
    more_info: false,
  };

  video_chat_data: any = {};

  hideValues = {
    Unternehmensdaten: false,
    Vermittlervertrag: true,
    Vertretungsberechtigte: true,
    Bevollmachtigte: true,
    Wirtschaftlicher: true,
    Marketing: true,
    Fallliste: true,
    Angebote: true,
    Allgemeines: true
  }
  searchVariable: any


  @ViewChild("aForm") aForm: ElementRef;
  @ViewChild("fsa") updateform: NgForm;
  @ViewChild("fsa1") askqueform: NgForm;
  setFocus(name: any) {
    console.log("setfocus" + name);
    const ele = this.aForm.nativeElement[name];
    console.log("setfocus" + name);
    if (ele) {
      console.log("setfocus" + ele);
      ele.focus();
      console.log("setfocus" + name);
    } else {
      console.log("setfocus" + ele);
    }
    console.log("setfocus" + name);
  }

  repearPreventer = true
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private renderer: Renderer2,
    private pagerService: PagerService,
    private el: ElementRef,
    private activatedRoute: ActivatedRoute,
    private form_builder: FormBuilder,
    private eventEmitterService: EventEmitterService,
    private readonly sanitizer: DomSanitizer
  ) {

    this.repearPreventer = true
    this.id = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).id;

    this.queryID = this.id;
    console.log(this.queryID);
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params["id"] == undefined) {
        this.queryID = this.id;
      } else {
        this.queryID = params["id"]
      }
      this.activecontactform = params["activecontactform"];
      this.lastcase_no = params["case_no"];
      if (this.activecontactform == undefined) {
        this.activecontactform = "";
      }
      if (this.lastcase_no == undefined) {
        this.lastcase_no = "";
      }
    });

    userService.b2bDashboardItem.subscribe(data => {
      console.log(data);

      let itemString = `${data[0]}`

      for (const key of Object.keys(this.hideValues)) {
        if (key !== itemString) {
          this.hideValues[key] = true
        } else {
          this.hideValues[key] = false
        }
      }

      if (this.repearPreventer) {
        // if (itemString == "Vermittlervertrag" ||  itemString == "Kundenvertrag") {
        $("#loaderouterid").css("display", "block");
        this.userService
          .getDocumentsByIds(
            this.queryID,
            "Allgemeines Dokument",
            "cefima_document"
          )
          .pipe(first())
          .subscribe(
            (result) => {
              this.repearPreventer = false
              $("#loaderouterid").css("display", "none");
              this.documents = result;
              console.log('result :', result);
              this.MetaDataLooping();
              this.setPage(1, true);
            },
            (error) => {
              console.log("error2");
              console.log(error);
            }
          );
        // }
      }
    })


  }

  uploadansfile(event: any) {
    event.preventDefault();
    $("#result").html("");
    let StringTemple;

    const removeData = (j: any) => {
      this.filearraynew.splice(j, 1);
      // console.log("asdghafdagjfdgfasfdjgasfdjsa");
      $("#ansfile").val("");
      if (this.filearraynew.length == 0) {
        this.editedans = false;
      } else {
        // this.editedans = true;
      }
    };

    var files = event.target.files; //FileList object
    var filesLength = files.length;
    for (let i = 0; i < filesLength; i++) {
      this.editedans = true;
      let f = files[i];
      this.filearraynew.push(f);
      var fileReader = new FileReader();
      fileReader.onload = function (e) {
        console.log(f.name.split("."));
        let extension = f.name.substr(f.name.lastIndexOf(".") + 1);
        console.log(extension);
        let ImageName;
        if (extension == "doc" || extension == "docx") {
          ImageName = "../assets/docx.png";
        } else if (extension == "pdf" || extension == "pdfx") {
          ImageName = "../assets/PDF.svg";
        } else {
          ImageName = (e.target as any).result;
        }

        let Size = Math.round(f.size / 1024);
        StringTemple =
          '<div class="pip"  style="width: 290px;display: inline-block;margin: 8px;" id="div3">' +
          "" +
          '<div class="removepreview" id="removepreviewid' +
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
          '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
          ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
          '" [style.width.%]=""> </div> </div>' +
          " </div>" +
          "</div>";
        $("#showcheckup").html(StringTemple);
        // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> KB </div>`).insertAfter(".pip")
        $("#removepreviewid").click(function () {
          removeData(i);
          // $("#pipremove" + i).remove();
          $(this).parent(".pip").remove();
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
              // console.log(event.total);
              // console.log(event.loaded);

              // this.progress[newsize] = Math.round(event.loaded / event.total * 100);
              $("div.percentageclass").width(
                Math.round((event.loaded / event.total!) * 100) + "%"
              );
              $("div.percentageclass").html(
                Math.round((event.loaded / event.total!) * 100) + "%"
              );

              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);

              setTimeout(() => {
                $("#progressnew").css("display", "none");
                this.documentidforans = event.body.document_unique_id;
              }, 1500);
          }
        });
    }

    // console.log(this.filearray);
  }

  giveans(questionid: any) {
    this.userService
      .getproducttypequestionlistbyid({ id: questionid })
      .subscribe((result: any) => {
        this.viewquestiondata = result.result[0];
        if (this.viewquestiondata.option == "Erforderlich") {
          this.addquestionformgroup
            .get("ansinput")!
            .setValidators(Validators.required);
        } else {
          this.addquestionformgroup.get("ansinput")!.clearValidators();
        }
        // console.log("resuiltasdfasdasdas" + this.viewquestiondata.option1);
        if (this.viewquestiondata.option1 == "Erforderlich") {
          this.addquestionformgroup
            .get("ansfile")!
            .setValidators(Validators.required);
        } else {
          this.editedans = true;
          this.addquestionformgroup.get("ansfile")!.clearValidators();
        }

        if (
          this.viewquestiondata.option7 == "Erforderlich" &&
          this.viewquestiondata.option6 == "Date range"
        ) {
          this.addquestionformgroup
            .get("singledate")!
            .setValidators(Validators.required);
        } else {
          this.addquestionformgroup.get("singledate")!.clearValidators();
        }

        if (
          this.viewquestiondata.option7 == "Erforderlich" &&
          this.viewquestiondata.option6 == "Single date"
        ) {
          this.addquestionformgroup
            .get("fromdate")!
            .setValidators(Validators.required);
          this.addquestionformgroup
            .get("todate")!
            .setValidators(Validators.required);
        } else {
          this.addquestionformgroup.get("fromdate")!.clearValidators();
          this.addquestionformgroup.get("todate")!.clearValidators();
        }
      });
    this.selectedquestion = questionid;
    // $('#selectedquestion').val(questionid);
    $("#openmodalforquestion").trigger("click");
    this.remove();
  }
  remove() {
    setTimeout(() => {
      $(".modal-backdrop").css("display", "none");
    }, 100);
  }

  opencustomerpopup() {
    $("#loaderouterid").css("display", "block");
    const data = this.userService.getCustomers("cefima", true).subscribe(
      (success: any) => {
        // if success and error give response
        console.log("cefimaaaaaaaaaaaaa");
        if (success.status == "error") {
        } else {
          var success = this.filtercustomer(success, "cefima");

          this.customerList = success;

          $("#openmodelcustomerlist").trigger("click");
          $("#loaderouterid").css("display", "none");
          this.remove();
        }
      },
      (rejected: any) => {
        console.log(rejected);
      }
    );
  }

  startchat(user_id: any) {
    // console.log("sdfdsfsdfsdf" + this.localData._id);
    let newemployee: any = [];
    newemployee.push(this.localData._id);
    newemployee.push(user_id);
    this.userService
      .GetListbynewcaseno({
        employee_id: newemployee,
      })
      .subscribe((result: any) => {
        if (result.length > 0) {
          this.reloadCurrentRoute(result[0].Activity_No);
        } else {
          let U_B = this.localData.firstname + " " + this.localData.lastname;
          let caseno = new Date().getTime() + "_ce";
          let projectdatanew = {
            employee_id: newemployee,
            Uploaded_By: U_B,
            Transaction_Type: "Kundenregister",
            uploaddate: new Date().toISOString(),
            updateticket_no: caseno,
            companyname: "42140 DFG Finanzprofi GmbH",
            Type: "Kundenregister",
          };
          this.userService
            .CaseListUpload(projectdatanew)
            .pipe(first())
            .subscribe(
              (data) => {
                // console.log(data);
              },
              (error) => {
                console.log("Error", error);
                $("#loaderouterid").css("display", "none");
              },
              () => {
                this.reloadCurrentRoute(caseno);
              }
            );
        }
      });
  }

  reloadCurrentRoute(caseno: any) {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate(["./cefima/b2b-dashboard"], {
        queryParams: {
          id: this.queryID,
          case_no: caseno,
          activecontactform: "1",
        },
      });
    });
  }
  ngAfterViewInit() {
    console.log("m called ngafterviewunit");
    console.log(this.localData._id, ': localData');

    setTimeout(() => {
      const input: any = document.querySelector("#phone");
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
    }, 500);
    setTimeout(() => {
      const input: any = document.querySelector("#phoneupdate");
      console.log("querySelector" + input);
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
    }, 100);
    this.getalldocument();

    if (this.caselistnew.length > 0) {
      $("#li0").trigger("click");
    }
    if (this.lastcase_no != "") {
      let locaDataId = this.localData._id
      if (locaDataId == undefined || locaDataId == '' || locaDataId == null) {
        locaDataId = this.id
      }
      // console.log("sdfsfsdfs" + this.lastcase_no);
      this.userService
        .GetSingleDocument(this.lastcase_no, "", "")
        .subscribe((success: any) => {
          console.log("success  :" ,success );
          this.userService
            .GetListbycaseno0("42140 DFG Finanzprofi GmbH", locaDataId)
            .subscribe((usercasenew: any) => {
              console.log(usercasenew);

              let newcaselistnew: any = [];
              success.forEach((element: any) => {
                var newdata = {
                  employ_ids: element.employ_ids,
                  _id: element._id,
                  Activity_No: element.Activity_No,
                  Transaction_Type: element.Transaction_Type,
                  Uploaded_By: element.Uploaded_By,
                  Proces_Date: element.Proces_Date,
                  companyname: element.companyname,
                  ptid: "",
                  ppid: "",
                  ptname: "",
                  ppname: "",
                };
                // newdata.ptid=o.ptid;
                newcaselistnew.push(newdata);
                // newdata='';
              });

              if (usercasenew.length > 0) {
                usercasenew.forEach((usercasenew11: any) => {
                  let newcase = usercasenew11.userinfo.find(
                    (o: any) => o._id != this.localData._id
                  );
                  // console.log(
                  //   "sdfdsfdsfdsfdfdhfsdhfghsdgfhjsdfsd" +
                  //     JSON.stringify(newcase)
                  // );
                  var newdata = {
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
                  newcaselistnew.push(newdata);

                  // newdata='';
                });
              }
              let j = 0;
              newcaselistnew.forEach((usercasenew11111: any) => {
                if (usercasenew11111.Activity_No == this.lastcase_no) {
                  var newdata = {
                    employ_ids: usercasenew11111.employ_ids,
                    _id: usercasenew11111._id,
                    Activity_No: usercasenew11111.Activity_No,
                    Transaction_Type: usercasenew11111.Transaction_Type,
                    Uploaded_By: usercasenew11111.Uploaded_By,
                    Proces_Date: usercasenew11111.Proces_Date,
                    companyname: usercasenew11111.companyname,
                    ptid: usercasenew11111.ptid,
                    ppid: usercasenew11111.ppid,
                    ptname: usercasenew11111.ptname,
                    ppname: usercasenew11111.ppname,
                  };
                  this.CurrentChat(newdata, 0);
                }
                j++;
              });
            });

          // this.selectedbroker=success[0].employ_ids;
        });
    }

    // $("#datedynamic").html(todaynew1);
  }
  getalldocument() {
    let locaDataId = this.localData._id
    if (locaDataId == undefined || locaDataId == '' || locaDataId == null) {
      locaDataId = this.id
    }

    this.userService
      .GetSingleDocument("42140 DFG Finanzprofi GmbH", this.id)
      .subscribe((success: any) => {
        $("#loaderouterid").css("display", "none");
        console.log("success" + success);

        console.log("value haiin");


        this.userService
          .GetListbycaseno0("42140 DFG Finanzprofi GmbH", this.localData._id)
          .subscribe((usercasenew: any) => {
            this.caselistnew = success;

            this.caselistnew.forEach((element: any) => {
              var newdata = {
                employ_ids: element.employ_ids,
                _id: element._id,
                Activity_No: element.Activity_No,
                Transaction_Type: element.Transaction_Type,
                Uploaded_By: element.Uploaded_By,
                Proces_Date: element.Proces_Date,
                companyname: element.companyname,
                ptid: "",
                ppid: "",
                ptname: "",
                ppname: "",
              };
              // newdata.ptid=o.ptid;
              this.newcaselistnew.push(newdata);
              // newdata='';
            });

            if (usercasenew.length > 0) {
              usercasenew.forEach((usercasenew11: any) => {
                let newcase = usercasenew11.userinfo.find(
                  (o: any) => o._id != this.localData._id
                );
                // console.log(
                //   "sdfdsfdsfdsfdfdhfsdhfghsdgfhjsdfsd" + JSON.stringify(newcase)
                // );
                var newdata = {
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
          });
        // }
      });
  }
  removedatanew(id: any, index: any) {
    $("#" + id).html("");
    this.documentid[index] = "";
    this.brokermarketingdetails = true;
    console.log("brokermarketingdetails" + this.brokermarketingdetails);
  }
  editRecord(type: any, index: any, data: any) {

    let modalid = ''
    if (type.includes('type1')) {
      modalid = `collapsetype1modal`
    } else if (type.includes('type2')) {
      modalid = `collapsetype2modal`
    } else if (type.includes('type3')) {
      modalid = `collapsetype3modal`
    }

    if (type == "type1" && index == 0) {
      this.ceoDocList.length = 0;
      this.ceoDocList = [];
      this.ceoDocListunique = [];
      this.ceoDocListunique.length = 0;

      for (let doc_count = 0; doc_count < this.documents?.length; doc_count++) {
        if (
          this.documents[doc_count].element.document_name ==
          "Ausweisdokument Vertretungsberechtigte Person" ||
          this.documents[doc_count].element.document_name ==
          "Ausweisdokument Vertretungsberechtigte Person(Abgelaufen)"
        ) {
          let temp_doc = this.documents[doc_count];
          temp_doc.element.ceo_doc_name =
            "Ausweisdokument Vertretungsberechtigte Person";
          //this.ceoDocList.push(this.documents[doc_count]);
          this.ceoDocList.push(temp_doc);
        }
      }

      this.ceoDocListunique.push(this.ceoDocList[0]);

      this.showceodoc = true;
    } else if (type == "type1" && index != 0) {
      this.ceoDocList.length = 0;
      this.ceoDocList = [];
      this.ceoDocListunique = [];
      this.ceoDocListunique.length = 0;
      for (let doc_count = 0; doc_count < this.documents.length; doc_count++) {
        if (
          this.documents[doc_count].element.document_name ==
          "Ausweisdokument Vertretungsberechtigte Person" + index ||
          this.documents[doc_count].element.document_name ==
          "Ausweisdokument Vertretungsberechtigte Person" +
          doc_count +
          "(Abgelaufen)"
        ) {
          let temp_doc = this.documents[doc_count];
          temp_doc.element.ceo_doc_name =
            "Ausweisdokument Vertretungsberechtigte Person";
          //this.ceoDocList.push(this.documents[doc_count]);
          this.ceoDocList.push(temp_doc);
        }
      }
      this.ceoDocListunique.push(this.ceoDocList[0]);
      this.showceodoc = true;
    } /*else{
  this.showceodoc=false;
}*/

    // console.log("printing ceo doc lists");
    // console.log(this.ceoDocList);
    // console.log(this.ceoDocListunique);

    if (type == "type3") {
      this.shareholdersindex = index;
      console.log("shareholdersindex" + this.shareholdersindex);
    } else {
      this.shareholdersindex = "";
      console.log("shareholdersindex1" + this.shareholdersindex);
    }
    let accordianId: any = "collapse" + type;
    event!.preventDefault();
    let element1: HTMLElement = document.getElementById(
      "ul" + type + index
    ) as HTMLElement;
    let element1new: HTMLElement = document.getElementById(
      "cardbodyid" + type
    ) as HTMLElement;
    let element: HTMLElement = document.getElementById(
      "click" + type + index
    ) as HTMLElement;
    let accordian: HTMLElement = document.getElementById(accordianId)!;
    if (element.innerHTML == "Schließen") {
      console.log("element", element1new);
      // element1new.after(accordian);
      // accordian.classList.add("collapse");
      // accordian.classList.remove("collapse-show");
      element.innerHTML = "Öffnen";

      let close = "close";
      console.log("elementelse0000000", element1);
      this.openid = "";
      //this.checkDataAndCreateUpdateData(true, element, accordian,close)
    } else {
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


      $(`#${modalid}btn`).trigger("click");
      this.open_modal(modalid)

      // element1.after(accordian);
      // accordian.classList.remove("collapse");
      // accordian.classList.add("collapse-show");
      // element.innerHTML = "Schließen";

      this.openid = type + index;
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
  checkDataAndCreateUpdateData(data: any) {
    console.log("checkDataAndCreateUpdateData" + data);

    let data1: any = {
      title: this.companydataform.value.title,
      firstname: this.companydataform.value.firstName,
      lastname: this.companydataform.value.lastName,
      strassa: this.companydataform.value.street,
      strno: this.companydataform.value.streetNumber,
      plz: this.companydataform.value.postCode,
      city: this.companydataform.value.city,
      additionalReference: this.companydataform.value.additionalReference,
      current_country: this.companydataform.value.countryOfResidence,
      Vermittlerstatus: this.companydataform.value.vermittlerstatus,
      registration_number: this.companydataform.value.registrationsnummer,
      responsible_ihk: this.companydataform.value.ihk,
    };
    for (let i in data1) {
      console.log(
        "checkDataAndCreateUpdateData" + this.localData.hasOwnProperty(i)
      );
      console.log("checkDataAndCreateUpdateData" + i);

      console.log("checkDataAndCreateUpdateData" + data1[i]);

      console.log("checkDataAndCreateUpdateData" + this.localData[i]);

      if (data1[i] == this.localData[i]) {
        console.log("checkDataAndCreateUpdateData" + "  matched");

        this.changesdone = false;
      } else if (data1[i] != this.localData[i] && data1[i] != "") {
        console.log("checkDataAndCreateUpdateData" + "  notmatched");
        this.changesdone = true;
        break;
      }

      console.log(
        "checkDataAndCreateUpdateData" + "changesdone" + this.changesdone
      );
    }
  }
  saveChangedData() {
    $("#loaderouterid").css("display", "block");
    if (this.changesdone) {
      let data2 = {
        _id: this.localData._id,
        title: this.companydataform.value.title,
        firstname: this.companydataform.value.firstName,
        lastname: this.companydataform.value.lastName,
        strassa: this.companydataform.value.street,
        strno: this.companydataform.value.streetNumber,
        plz: this.companydataform.value.postCode,
        city: this.companydataform.value.city,
        additionalReference: this.companydataform.value.additionalReference,
        current_country: this.companydataform.value.countryOfResidence,
        Vermittlerstatus: this.companydataform.value.vermittlerstatus,
        registration_number: this.companydataform.value.registrationsnummer,
        responsible_ihk: this.companydataform.value.ihk,
      };
      this.userService.updateBrokerdata(data2).subscribe(
        async (success: any) => {
          // if success and error give response
          if (success.status == 200) {
            setTimeout(() => {
              $("#loaderouterid").css("display", "none");
              this.changesdone = false;

              localStorage.setItem(
                "currentUser",
                JSON.stringify(success["result"])
              );
              this.localData = success["result"];

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
                  // console.log(result);
                  if (result["isDismissed"]) {
                    console.log("iffffff");
                  } else {
                  }
                })
                .catch((err) => { });
            }, 3000);
          } else {
            setTimeout(() => {
              $("#loaderouterid").css("display", "none");
              console.log("type1data" + success.status);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Fill Correct Details!!",
              });
            }, 100);
          }
        },
        (rejected) => {
          console.log(rejected);
        }
      );
    }
  }
  navigatetob2bhome() {
    this.router.navigate(["./cefima/b2b-home"]);
  }
  CurrentChat(user: any, i: number) {
    // console.log("aditya");
    this.lastcase_no = user.Activity_No;
    $(".nesteslist").removeClass("activediv");
    let message = {
      broker_id: this.queryID,
      case_no: user.Activity_No,
      ptid: user.ptid,
      ppid: user.ppid,
    };

    this.video_chat_data = {
      broker_id: this.queryID,
      user: user,
    };

    this.userService.getchatmessage(message).subscribe(
      (success: any) => {
        // console.log(success);
        this.messagelist = success.result;
        $("#li" + user.Activity_No + user.ptid + user.ppid).addClass(
          "activediv"
        );
        this.userService
          .getbrokerbyuser_id(user.employ_ids)
          .subscribe((fidresult: any) => {
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
        console.log("error1");
        console.log(err);
      },
      () => { }
    );
  }

  ngOnInit() {

    this.lastname = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).lastname;
    this.firstname = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).firstname;
    this.customerno = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).customerno;

    this.id = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).id;

    // By Jaseer
    this.queryID = this.id

    this.title = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).title;

    this.COMPANYNAME = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).companyname;

    this.companytype = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).companytype;


    this.currentid = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).id;

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

    $(document).click(function (e) {
      if ($(e.target).hasClass("modal-backdrop")) {
        console.log("you clicked the backdrop!");
        alert("you clicked the backdrop!");
      }
    });
    setTimeout(() => {
      $("#loaderouterid").css("display", "block");
      this.userService
        .getDocumentsByIds(
          this.queryID,
          "Allgemeines Dokument",
          "cefima_document"
        )
        .pipe(first())
        .subscribe(
          (result) => {
            this.documents = result;
            console.log('result :', result);
            $("#loaderouterid").css("display", "none");
            this.MetaDataLooping();
            this.setPage(1, true);
          },
          (error) => {
            console.log("error2");
            console.log(error);
          }
        );
    }, 500);


    let url = window.location.href;
    console.log("url" + url);
    const middle = url.slice(url.indexOf("#") + 1, url.lastIndexOf("?"));
    console.log("url" + middle);
    if (middle == "/b2b-dashboard") {
      $(".removeStyle").removeClass("showSelected");
      $("#addstyle2").addClass("showSelected");
    }

    this.documentlist.push("", "");
    this.documentid.push("", "");
    this.api_url = environment.API_URL;
    this.docFromGroup = this.form_builder.group({
      logo: [""],
      welcomevideo: [""],
      phone_number: [""],
      website_url: [
        "",
        Validators.pattern(
          "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
        ),
      ],

      // acceptcontrol:["",Validators.required]
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
      city: ["", [Validators.required]],
      additionalReference: [""],
      countryOfResidence: ["", [Validators.required]],
      birthPlace: ["", [Validators.required]],
    });
    this.askquestion = this.form_builder.group({
      formkey: ["", [Validators.required]],
    });
    this.phoneFormGroup = new FormGroup({
      phone_number: new FormControl("", Validators.required),
      otp: new FormControl("", Validators.required),
    });
    this.companydataform = this.form_builder.group({
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
      phoneno: ["", [Validators.required]],
      vermittlerstatus: ["", [Validators.required]],
      registrationsnummer: ["", [Validators.required]],
      customerno: ["", [Validators.required]],
      ihk: ["", [Validators.required]],
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
    this.selectedUser.id = this.id;
    this.loginRole = this.loginRole;
    this.routeParams = this.activatedRoute.snapshot.routeConfig!.path;
    console.log("this.routeParams" + this.routeParams);
    console.log("loginRole" + this.loginRole);
    console.log(this.id);
    var company = JSON.parse(
      localStorage.getItem("currentUser")!
    ).companies_with_roles;
    this.userService
      .getusertimeline(this.id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.TimeLineData = data;
          // console.log(this.TimeLineData);
        },
        (err) => {
          console.log("error3");
          console.log(err);
        }
      );

    $("#loaderouterid").css("display", "block");
    console.log('this.queryID :', this.queryID);

    this.userService
      .getEditUser(this.queryID)
      .pipe(first())
      .subscribe((user: any) => {
        this.localData = user;

        setTimeout(() => {
          this.getcompanydatacheckup();
          this.getceodatacheckup();
          this.getshareholderdatacheckup();
          this.getmiddledatacheckup();
        }, 100);

        if (this.localData.hasOwnProperty("type1")) {
          this.type1 = this.localData.type1.legalrepresentativeform;
          this.type2 = this.localData.type2.legalrepresentativeform1;
          this.type3 = this.localData.type3.legalrepresentativeform2;
          this.setPagetype(1, "type1");
          this.setPagetype(1, "type2");
          this.setPagetype(1, "type3");

          for (let j = 0; j < this.type3.length; j++) {
            this.shareholdersDocList.push([]);
          }
          console.log(
            "shareholdersDocList1" + JSON.stringify(this.shareholdersDocList)
          );
          this.personaldataform.patchValue({
            title: this.localData.title,
            firstName: this.localData.firstname,
            email: this.localData.email,
            lastName: this.localData.lastname,
            dob: this.localData.dateofbirth,
            street: this.localData.strassaliving,
            streetNumber: this.localData.strnoliving,
            postCode: this.localData.plzliving,
            city: this.localData.cityliving,
            additionalReference: this.localData.additionalReferenceliving,
            countryOfResidence: this.localData.current_countryliving,
            birthPlace: this.localData.birth_place,
          });
          this.companydataform.patchValue({
            title: this.localData.title,
            firstName: this.localData.firstname,
            email: this.localData.email,
            lastName: this.localData.lastname,
            street: this.localData.strassa,
            streetNumber: this.localData.strno,
            postCode: this.localData.plz,
            city: this.localData.city,
            additionalReference: this.localData.additionalReference,
            countryOfResidence: this.localData.current_country,

            companyname: this.localData.companyname,
            companytype: this.localData.companytype,
            phoneno: this.localData.contactno,
            vermittlerstatus: this.localData.Vermittlerstatus,
            registrationsnummer: this.localData.registration_number,
            customerno: this.localData.customerno,
            ihk: this.localData.responsible_ihk,
          });
          setTimeout(() => {
            const input: any = document.querySelector("#Telefonnummer");
            console.log("querySelector" + input);
            intlTelInput(input, {
              initialCountry: "de",
              geoIpLookup: function (callback) {
                $.get("http://ipinfo.io", function () { }, "jsonp").always(
                  function (resp) {
                    var countryCode =
                      resp && resp.country ? resp.country : "de";
                    callback(countryCode);
                    console.log("countryCode" + countryCode);
                  }
                );
              },
            });
          }, 500);
        } else {
          this.setPagetype(1, "type1");
          this.setPagetype(1, "type2");
          this.setPagetype(1, "type3");
        }

        if (this.localData.hasOwnProperty("website_url")) {
          if (this.localData.website_url != "") {
            console.log("hithre" + this.localData.website_url);
            this.docFromGroup.patchValue({
              website_url: this.localData.website_url,
            });
          }
        } else {
          console.log("hithre1" + this.localData.website_url);
        }

        if (this.localData.hasOwnProperty("marketingcustomerno")) {
          console.log("fthtgf" + this.localData.marketingcustomerno);
          if (this.localData.marketingcustomerno != "") {
            console.log("dfgfd" + this.localData.marketingcustomerno);
            if (this.localData.marketingcustomerno == "+49") {
              this.inputfield = "Telefonnummer eingeben";
            } else {
              this.inputfield = "Telefonnummer";
            }

            this.docFromGroup.patchValue({
              phone_number: this.localData.marketingcustomerno,
            });
          } else {
            this.inputfield = "Telefonnummer eingeben";
            this.docFromGroup.patchValue({ phone_number: "+49" });
          }
          setTimeout(() => {
            const input: any = document.querySelector("#phone");
            console.log("querySelector" + input);
            if (input) {
              intlTelInput(input, {
                initialCountry: "de",
                geoIpLookup: function (callback) {
                  $.get("http://ipinfo.io", function () { }, "jsonp").always(
                    function (resp) {
                      var countryCode =
                        resp && resp.country ? resp.country : "de";
                      callback(countryCode);
                      console.log("countryCode" + countryCode);
                    }
                  );
                },
              });
            }
          }, 100);
        }

        if (this.localData.hasOwnProperty("welcomevideo")) {
          this.userService
            .checkvideoscreenshot({
              video: this.localData.logo,
              id: this.queryID,
            })
            .subscribe(
              (success: any) => { },
              (rejected) => {
                console.log(rejected);
              }
            );
          if (this.localData.welcomevideo != "") {
            console.log("video" + this.localData.welcomevideo.size);
            this.Size = this.dataconvert(this.localData.welcomevideo.size);
            console.log("sizevideo" + this.Size);
            this.welcomevideodata = true;
            setTimeout(() => {
              // console.log("sdfsfsdfs");
              $("#videoSourceWrapper0").attr(
                "src",
                this.api_url +
                "" +
                "document/downloaddocument" +
                "/" +
                this.localData.welcomevideo
              );
            }, 100);

            this.documentid[0] = this.localData.welcomevideo;
          }
        }
        if (this.localData.hasOwnProperty("logo")) {
          if (this.localData.logo != "") {
            console.log("logo" + this.localData.logo.size);

            this.brokerlogodata = true;

            this.documentid[1] = this.localData.logo;
          }
        }
        console.log("documentid :", this.documentid);
      },
        (err: any) => {
          $("#loaderouterid").css("display", "none");
        }
      );
    let strno = this.localData.strno;
    let strassa = this.localData.strassa;
    let city = this.localData.city;
    let current_country = this.localData.current_country;
    let plz = this.localData.plz;

    this.addquestionformgroup = this.form_builder.group({
      ansinput: [""],
      ansfile: [""],
      singledate: [""],
      fromdate: [""],
      todate: [""],
    });

    //this.responseobserve = interval(1000).subscribe((result) => {
    //this.get_unread_chat();
    this.responseobserve = this.intervallTimer.subscribe(() =>
      this.get_unread_chat()
    );

    this.hideValues = {
      Unternehmensdaten: false,
      Vermittlervertrag: true,
      Vertretungsberechtigte: true,
      Bevollmachtigte: true,
      Wirtschaftlicher: true,
      Marketing: true,
      Fallliste: true,
      Angebote: true,
      Allgemeines: true
    }

  }

  searchMembers(event: any, from: string, type: string, data: string) {
    console.log(event, from, type, data);
    console.log(this.searchVariable)

    this.pagedItemstype
    this.firstdocumentdata

    if (type == "firstdocumentdata") {
      console.log(this.firstdocumentdataSearch);

      this.firstdocumentdata = []
      for (let i = 0; i < this.firstdocumentdataSearch.length; i++) {
        const element = this.firstdocumentdataSearch[i].element.document_name.toLowerCase();

        if (element.includes(this.searchVariable)) {
          this.firstdocumentdata.push(this.firstdocumentdataSearch[i])
        }
      }

      if (this.searchVariable.trim() == '') {
        this.firstdocumentdata = this.firstdocumentdataSearch
      }
    }

    if (type == "type1") {
      this.pagedItemstype[0].type1 = []
      for (let i = 0; i < this.pagedItemstypeSearch[0].type1.length; i++) {
        const element = this.pagedItemstypeSearch[0].type1[i].firstname.toLowerCase();

        if (element.includes(this.searchVariable)) {
          this.pagedItemstype[0].type1.push(this.pagedItemstypeSearch[0].type1[i])
        }
      }

      if (this.searchVariable.trim() == '') {
        this.pagedItemstypeSearch[0].type1 = this.pagedItemstypeSearch[0].type1
      }
    }

    if (type == 'type2') {

      this.pagedItemstype[0].type2 = []
      for (let i = 0; i < this.pagedItemstypeSearch[0].type2.length; i++) {
        const element = this.pagedItemstypeSearch[0].type2[i].firstname.toLowerCase();

        if (element.includes(this.searchVariable)) {
          this.pagedItemstype[0].type2.push(this.pagedItemstypeSearch[0].type2[i])
        }
      }

      if (this.searchVariable.trim() == '') {
        this.pagedItemstypeSearch[0].type2 = this.pagedItemstypeSearch[0].type2
      }
    }

    if (type == 'type3') {

      this.pagedItemstype[0].type3 = []
      for (let i = 0; i < this.pagedItemstypeSearch[0].type3.length; i++) {
        const element = this.pagedItemstypeSearch[0].type3[i].firstname.toLowerCase();

        if (element.includes(this.searchVariable)) {
          this.pagedItemstype[0].type3.push(this.pagedItemstypeSearch[0].type3[i])
        }
      }

      if (this.searchVariable.trim() == '') {
        this.pagedItemstype[0].type3 = this.pagedItemstypeSearch[0].type3
      }
    }

    if (type == 'pagedItemsGDOC') {
      this.pagedItemsGDOC = []
      for (let i = 0; i < this.pagedItemsGDOCSearch.length; i++) {
        const element = this.pagedItemsGDOCSearch[i].element.document_name.toLowerCase();

        if (element.includes(this.searchVariable)) {
          this.pagedItemsGDOC.push(this.pagedItemsGDOCSearch[i])
        }
      }

      if (this.searchVariable.trim() == '') {
        this.pagedItemsGDOC = this.pagedItemsGDOCSearch
      }
    }

  }

  get_unread_chat() {
    let message = {
      broker_id: this.queryID,
      case_no: this.lastcase_no,
    };
    // console.log("case no in b2b");
    // this.userService.getchatunreadmessage(message).subscribe(
    //   (success: any) => {
    //     for (let i = 0; i < success.result.length; i++) {
    //       if (
    //         this.messagelist.findIndex(
    //           (x: any) => x._id == success.result[i]._id
    //         ) == -1
    //       ) {
    //         this.messagelist.push(success.result[i]);
    //       }
    //     }
    //     //success.result.map((result) => this.messagelist.push(result));
    //     console.log("Message list after pushing", this.messagelist);
    //     console.log("success_result", success);
    //   },
    //   (err) => {
    //     console.log("error5");
    //     console.log(err);
    //   },
    //   () => { }
    // );
  }

  getcompanydatacheckup() {
    // console.log("financialcheckdata" + JSON.stringify(this.financialcheckdata));
    // console.log("financialcheckdata" + JSON.stringify(this.localData));
    if (this.localData.hasOwnProperty("companydatacheckup")) {
      // console.log(
      //   "financialcheckdata" + JSON.stringify(this.financialcheckdata)
      // );
      var nameArray = this.localData.companydatacheckup.map(function (el: any) {
        return el.nameoffinancialcheck;
      });
      this.userService
        .getdocumentidbydocument_unique_id(this.queryID, nameArray)
        .pipe(first())
        .subscribe(
          (result) => {
            this.financialcheckdata = result;
            // console.log(
            //   "financialcheckdata" + JSON.stringify(this.financialcheckdata)
            // );
          },
          (error) => {
            console.log("error6");
            console.log(error);
          }
        );
    }
  }

  findcheckupforceobyindex() {
    // console.log("sdfdsfasdasdsad" + JSON.stringify(this.financialcheckdataceo));
    for (let j = 0; j < this.type1.length; j++) {
      for (let k = 0; k < this.financialcheckdataceo.length; k++) {
        if (this.financialcheckdataceo[k].element.index == j) {
          this.ceodatacheckupnewdata[j].push(this.financialcheckdataceo[k]);
        }
      }
    }
  }
  getceodatacheckup() {
    if (this.localData.hasOwnProperty("ceodatacheckup")) {
      var nameArray = this.localData.ceodatacheckup.map(function (el: any) {
        return el.nameoffinancialcheck;
      });
      this.userService
        .getdocumentidbydocument_unique_id(this.queryID, nameArray)
        .pipe(first())
        .subscribe(
          (result) => {
            this.financialcheckdataceo = result;
            this.findcheckupforceobyindex();
          },
          (error) => {
            console.log("error7");
            console.log(error);
          }
        );
    }
  }
  findcheckupforshareholderbyindex() {
    for (let j = 0; j < this.type3.length; j++) {
      for (let k = 0; k < this.financialcheckdatashareholder.length; k++) {
        if (this.financialcheckdatashareholder[k].element.index == j) {
          this.shareholderdatacheckupnewdata[j].push(
            this.financialcheckdatashareholder[k]
          );
        }
      }
    }
  }
  findcheckupformiddlebyindex() {
    for (let j = 0; j < this.type2.length; j++) {
      for (let k = 0; k < this.financialcheckdatamiddle.length; k++) {
        if (this.financialcheckdatamiddle[k].element.index == j) {
          this.middledatacheckupnewdata[j].push(
            this.financialcheckdatamiddle[k]
          );
        }
      }
    }
  }

  public verify() {
    console.log("rejected");

    // this.phone_number = this.phoneFormGroup.value.phone_number;
    var width = $(window).width();
    this.phoneData["phoneNumber"] = this.localData.contactno;
    this.userService.sendVerificationCode1(this.phoneData).subscribe(
      (success: any) => {
        // if success and error give response
        if (success) {
          this.otp = true;
          setTimeout(() => {
            this.setFocus("otp");
          }, 100);
          document.getElementById('focusfield').focus()
          $("#focusfield").attr("autofocus");
          localStorage.setItem("key", JSON.stringify(success));
          return true;
        } else {
          this.otp = false;
          return false;
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
    this.otp = true;
    return true;
  }
  public verifyOtp() {
    var width = $(window).width();

    this.otpSuccess = false;
    this.otpError = false;

    $("#loaderouterid49").css("display", "block");
    console.log("otpnew" + this.phoneFormGroup.controls["otp"].value);
    if (this.phoneFormGroup.controls["otp"].value == "") {
      this.otpError = true;
      this.otp = false;
      $("#loaderouterid49").css("display", "none");
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
        this.verificationData["phone_number"] = this.localData.contactno;
        console.log("verificationData", this.verificationData);
        this.userService
          .checkVerificationverifyphoneforcustomerregister(
            this.verificationData
          )
          .subscribe(
            (success: any) => {
              // if success and error give response
              if (success == 0) {
                console.log("status" + success);

                setTimeout(() => {
                  this.otpSuccess = true;

                  this.Nextstep();

                  return true;
                }, 2000);
              } else {
                console.log("statuselse" + success);
                setTimeout(() => {
                  // this.Nextstep();
                  this.otpError = true;
                  this.otp = false;
                  this.phoneFormGroup.patchValue({
                    otp: "",
                  });
                  $("#loaderouterid49").css("display", "none");
                  return true;
                }, 2000);
              }
            },
            (rejected) => {
              $("#loaderouterid49").css("display", "none");
              console.log(rejected);
            }
          );
        $("#loaderouterid").css("display", "none");
        this.Nextstep();
        this.otpSuccess = true;

        return true;
      } else {
        this.otpError = true;
        $("#loaderouterid49").css("display", "none");
      }
    }
  }
  public sleep(ms: any) {
    // console.log(2);
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  async Nextstep() {
    // console.log(2);
    await this.sleep(2000);

    // $("#nextstep").trigger("click");
    $("#loaderouterid49").css("display", "none");
    // console.log(1);
  }
  getshareholderdatacheckup() {
    if (this.localData.hasOwnProperty("shareholderdatacheckup")) {
      var nameArray = this.localData.shareholderdatacheckup.map(function (
        el: any
      ) {
        return el.nameoffinancialcheck;
      });
      this.userService
        .getdocumentidbydocument_unique_id(this.queryID, nameArray)
        .pipe(first())
        .subscribe(
          (result) => {
            this.financialcheckdatashareholder = result;
            this.findcheckupforshareholderbyindex();
          },
          (error) => {
            console.log("error8");
            console.log(error);
          }
        );
    }
  }

  checkkey(data: any = [], key: any) {
    if (data.length > 0) {
      let response = data.find((o: any) => o.name === key);
      if (key == "vermittlerstatus1") {
        //console.log("sdfsfsfsdfif" + JSON.stringify(response));
      }
      console.log("sdfsfsfsdf" + response);
      return response;
    } else {
      // console.log("sdfsfsfsdfelse");
      return undefined;
    }
  }
  getmiddledatacheckup() {
    if (this.localData.hasOwnProperty("middledatacheckup")) {
      var nameArray = this.localData.middledatacheckup.map(function (el: any) {
        return el.nameoffinancialcheck;
      });
      this.userService
        .getdocumentidbydocument_unique_id(this.queryID, nameArray)
        .pipe(first())
        .subscribe(
          (result) => {
            this.financialcheckdatamiddle = result;
            this.findcheckupformiddlebyindex();
          },
          (error) => {
            console.log("error9");
            console.log(error);
          }
        );
    }
  }
  filtercustomer(success: any, companyName: any) {
    let newsuccess = [];
    // console.log("stringify" + JSON.stringify(success));
    // console.log("ddd" + success.length);
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
    // console.log(newsuccess);
    // console.log("stringify" + JSON.stringify(success));
    success = success.filter(function () {
      return true;
    });
    // console.log("stringify" + JSON.stringify(success));
    return success;
  }

  getnotidata(notidata: any) {
    this.unreadcount = notidata;
    // console.log("sdfsfdsfsfsfsf" + notidata);
  }
  ngOnDestroy() {
    // console.log("m called ngOnDestroy");
    // console.log("asdfaasdasdasdngdes");
    this.responseobserve.unsubscribe();
  }

  MetaDataLooping() {
    for (let i = 0; i < this.documents.length; i++) {
      // console.log("forloop");
      let date_of_uploadnew = this.documents[i].element.createdAt;
      // console.log("date_of_uploadnew date_of_uploadnew " + date_of_uploadnew);
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

      if (
        this.documents[i].element.document_name == "Geschäftsanmeldung" ||
        this.documents[i].element.document_name ==
        "Aktueller Auszug aus dem Handelsregister" ||
        this.documents[i].element.document_name == "Vermittlervertrag" ||
        this.documents[i].element.document_name ==
        "Datenweiterverarbeitung Vertrag" ||
        this.documents[i].element.document_name == "Maklervollmacht" ||
        this.documents[i].element.document_name ==
        "Datenstammblatt mit Einwilligungserklärung" ||
        this.documents[i].element.document_name ==
        "Geschäftsanmeldung(Abgelaufen)" ||
        this.documents[i].element.document_name ==
        "Aktueller Auszug aus dem Handelsregister(Abgelaufen)" ||
        this.documents[i].element.document_name ==
        "Vermittlervertrag(Abgelaufen)" ||
        this.documents[i].element.document_name ==
        "Datenweiterverarbeitung Vertrag(Abgelaufen)" ||
        this.documents[i].element.document_name ==
        "Maklervollmacht(Abgelaufen)" ||
        this.documents[i].element.document_name ==
        "Datenstammblatt mit Einwilligungserklärung(Abgelaufen)"
      ) {
        let doc_exists = 0;
        for (
          let first_doc_count = 0;
          first_doc_count < this.firstdocumentdata.length;
          first_doc_count++
        ) {
          if (
            this.firstdocumentdata[first_doc_count].element.document_name ==
            this.documents[i].element.document_name
          ) {
            doc_exists = 1;
          }
        }

        if (doc_exists == 0) {
          this.firstdocumentdataSearch.push(this.documents[i]);
          this.firstdocumentdata.push(this.documents[i]);
        }
      }

      if (
        this.documents[i].element.document_name ==
        "Ausweisdokument Vertretungsberechtigte Person" ||
        this.documents[i].element.document_name ==
        "Ausweisdokument Vertretungsberechtigte Person(Abgelaufen)"
      ) {
        this.ceoDocList.push(this.documents[i]);
      }
      if (this.localData.hasOwnProperty("type3")) {
        for (let j = 0; j < this.type3.length; j++) {
          let name =
            "Bürgschaft Wirtschaftliche Eigentümer" +
            " " +
            this.type3[j].firstname +
            " " +
            this.type3[j].lastname;
          let name2 =
            "Bürgschaft Wirtschaftliche Eigentümer" +
            " " +
            this.type3[j].firstname +
            " " +
            this.type3[j].lastname +
            "(Abgelaufen)";
          let name1 =
            "Upload Ausweisdokument" +
            " " +
            this.type3[j].firstname +
            " " +
            this.type3[j].lastname;
          let name3 =
            "Upload Ausweisdokument" +
            " " +
            this.type3[j].firstname +
            " " +
            this.type3[j].lastname +
            "(Abgelaufen)";
          console.log("name" + name);

          // console.log(
          //   "shareholders1" + JSON.stringify(this.shareholdersDocList)
          // );
          if (
            this.documents[i].element.document_name == name ||
            this.documents[i].element.document_name == name2
          ) {
            console.log(
              "shareholders2" + JSON.stringify(this.shareholdersDocList)
            );
            this.shareholdersDocList[j].push(this.documents[i]);
          }

          if (
            this.documents[i].element.document_name == name1 ||
            this.documents[i].element.document_name == name3
          ) {
            // console.log(
            //   "shareholders2" + JSON.stringify(this.shareholdersDocList)
            // );
            this.shareholdersDocList[j].push(this.documents[i]);
          }
        }
        // console.log("shareholders3" + JSON.stringify(this.shareholdersDocList));
      }
    }
  }

  MetaDataLoopingDocList() {
    for (let i = 0; i < this.customerDocList.length; i++) {
      // console.log("forloop");
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
      this.customerDocList[i].size = metadata[0];
      this.customerDocList[i].filetype = filetype;
      this.customerDocList[i].Start_of_contract = Start_of_contract;
      this.customerDocList[i].Contribution = Contribution;
    }
  }

  previewshare(
    url: any,
    tags: any,
    imagename: any,
    companycode: any,
    brand: any,
    document_name: any,
    date_of_uploadnew: any,
    id: any,
    created_byname: any,
    ticket_no: any,
    index: number = 0
  ) {
    this.previewid = id;
    this.preViewData = []
    // console.log(date_of_uploadnew);
    let element: HTMLElement = document.getElementById(
      "clickshare" + this.previewid
    ) as HTMLElement;
    if (element.innerHTML == "Schließen") {
      // element.innerHTML = "Öffnen";
      // $("#imagediv").removeClass("col-md-7");
      // $("#imagediv").addClass("col-md-12");
      // $("#preview" + id).html("");
      // $("#preview" + id).html("");
      // $(".offenclass").html("Öffnen");
    } else {
      // $(".openclass").html("Öffnen");
      // $(".offenclass").html("Öffnen");
      // element.innerHTML = "Schließen";
      // $(".previewclass").html("");
    }

    // if (element.innerHTML == "Schließen") {
    // $("#imagediv").removeClass("col-md-12");
    // $("#imagediv").addClass("col-md-7");
    // console.log("tags" + JSON.stringify(tags));
    const removepreview = () => {
      let elementnew: HTMLElement = document.getElementById(
        "clickshare" + this.previewid
      ) as HTMLElement;
      elementnew.innerHTML = "Öffnen";

      // $("#imagediv").removeClass("col-md-7");
      // $("#imagediv").addClass("col-md-12");
      $("#preview" + id).html("");

      // console.log("sadasda");
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

    let same_docs = "";
    for (let i = 0; i < this.ceoDocList.length; i++) {
      let index: number = i;
      index += 1;

      let metadata = this.ceoDocList[i].element.tags[0].split(",");
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

      this.preViewData.push({
        document_name: this.ceoDocList[i].element.document_name,
        metadata: metadata,
        ticket_no: ticket_no,
        date_of_document: date_of_document,
        date_of_upload: date_of_upload,
        created_byname: created_byname,
        filetype: filetype,
        companycode: companycode,
        brand: brand,
        url: this.sanitizeURL(this.ceoDocList[i].element.document_url),
        imagename: this.ceoDocList[i].element.document_unique_id,
        href: `${environment.API_URL}document/downloaddocument/${this.ceoDocList[i].element.document_unique_id}`
      })

      if (i == 0) {
        same_docs +=
          '<div class="row list_rows" id="list_row' +
          index +
          '" data-index="' +
          index +
          '" data-filetype="' +
          filetype +
          '" data-download_link="' +
          this.ceoDocList[i].element.document_unique_id +
          '" data-source="' +
          this.ceoDocList[i].element.document_url +
          '" style="margin-top:36px;cursor: pointer;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;"><div class="col-md-11" >' +
          index +
          "." +
          document_name +
          '</div><div class="col-md-1">' +
          '<i class="fa fa-angle-right angle-right" id="angle-right' +
          index +
          '" style="display:none;font-weight:bold;font-size:25px;"></i>' +
          '<i class="fa fa-angle-down angle-down" id="angle-down' +
          index +
          '" style="display:block;font-weight:bold;font-size:25px;"></i>' +
          "</div>" +
          '<div class="col-md-12 document-details" id="document-detail' +
          index +
          '" style="display:block;background-color: white;border: 1px solid darkgray;margin-bottom: -5px;border-radius: 0px 0px 10px 10px;padding: 20px">' +
          "<h6>Dokumentenname: " +
          document_name +
          "</h6><h6>Dateigröße: " +
          metadata[0] +
          " Kb</h6><h6>Vorgangs Nr.: " +
          this.ceoDocList[i].element.ticket_no +
          "</h6><h6>Datum des Dokuments: " +
          date_of_document +
          "</h6><h6>Datum des Uploads: " +
          date_of_upload +
          "</h6><h6>Hochgeladen von: " +
          this.ceoDocList[i].element.created_byname +
          "</h6><h6>Dateityp: " +
          filetype +
          "</h6><h6>Stichworte: " +
          '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
          this.ceoDocList[i].element.companycode +
          "</span>" +
          //"," +
          "&nbsp;" +
          '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
          this.ceoDocList[i].element.brand +
          "</span>" +
          //"," +
          "&nbsp;" +
          '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
          this.ceoDocList[i].element.ticket_no +
          "</span>" +
          "</h6></div></div>";
      } else {
        same_docs +=
          '<div class="row list_rows" id="list_row' +
          index +
          '" data-index="' +
          index +
          '" data-filetype="' +
          filetype +
          '" data-download_link="' +
          this.ceoDocList[i].element.document_unique_id +
          '" data-source="' +
          this.ceoDocList[i].element.document_url +
          '" style="margin-top:5px;cursor: pointer;background-color: #184195;color: white;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;"><div class="col-md-11" >' +
          index +
          "." +
          document_name +
          '</div><div class="col-md-1">' +
          '<i class="fa fa-angle-right angle-right" id="angle-right' +
          index +
          '" style="display:block;font-weight:bold;font-size:25px;"></i>' +
          '<i class="fa fa-angle-down angle-down" id="angle-down' +
          index +
          '" style="display:none;font-weight:bold;font-size:25px;"></i>' +
          "</div>" +
          '<div class="col-md-12 document-details" id="document-detail' +
          index +
          '" style="display:none;background-color: white;border: 1px solid darkgray;margin-bottom: -5px;border-radius: 0px 0px 10px 10px;padding: 20px">' +
          "<h6>Dokumentenname: " +
          document_name +
          "</h6><h6>Dateigröße: " +
          metadata[0] +
          " Kb</h6><h6>Vorgangs Nr.: " +
          this.ceoDocList[i].element.ticket_no +
          "</h6><h6>Datum des Dokuments: " +
          date_of_document +
          "</h6><h6>Datum des Uploads: " +
          date_of_upload +
          "</h6><h6>Hochgeladen von: " +
          this.ceoDocList[i].element.created_byname +
          "</h6><h6>Dateityp: " +
          filetype +
          "</h6><h6>Stichworte: " +
          '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
          this.ceoDocList[i].element.companycode +
          "</span>" +
          //"," +
          "&nbsp;" +
          '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
          this.ceoDocList[i].element.brand +
          "</span>" +
          //"," +
          "&nbsp;" +
          '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
          this.ceoDocList[i].element.ticket_no +
          "</span>" +
          "</h6></div></div>";
      }
    }

    // $("#preview" + id).html(
    //   '<div style="border-radius:10px;background:white;padding: 4px 8px 4px;border:1px solid;margin-bottom: 15px;"><div class="col-md-4"  style="display: inline-block;vertical-align: top;"><div class="line-heights">' +
    //   same_docs +
    //   "</div>" +
    //   '<div class="col-md-12"> </div></div><div class="col-md-8" style="display: inline-block;"><span class="side-icons"><i class="fa fa-times" aria-hidden="true" style="font-size:16px;position:relative;float:right;" aria-hidden="true"  id="previewimg" ></i></span><embed id="preview-doc" type="' +
    //   filetype +
    //   '" src="' +
    //   url +
    //   '" style=" width: 100%; height:818px;"/><a id="download-link" href="' +
    //   environment.API_URL +
    //   "document/downloaddocument/" +
    //   imagename +
    //   '" ><span class="side-icons" ><i class="fa fa-download" style="position:relative;float:right;padding-right: 24px;" aria-hidden="true"  ></i></span></a></div> </div>'
    // );

    console.log(this.preViewData)


    $("#openAllgemeinePreiveiwmodal").trigger('click');
    this.open_modal('openAllgemeinePreiveiw')



    const someInput: any = document.getElementById("previewimg");
    // someInput.addEventListener(
    //   "click",
    //   function () {
    //     removepreview();
    //   },
    //   false
    // );

    $(".list_rows").click(function (event) {
      let link = $(this).data("download_link");
      let source = $(this).data("source");
      let index = $(this).data("index");

      $(".list_rows").css("background-color", "#184195");
      $(".list_rows").css("color", "white");
      $(".angle-right").css("display", "block");
      $(".angle-down").css("display", "none");
      $(".document-details").css("display", "none");

      $("#list_row" + index).css("background-color", "rgb(181, 172, 172)");
      $("#list_row" + index).css("color", "black");
      $("#angle-right" + index).css("display", "none");
      $("#angle-down" + index).css("display", "block");
      $("#document-detail" + index).css("display", "block");

      $("#download-link").attr(
        "href",
        environment.API_URL + "document/downloaddocument/" + link
      );
      $("#preview-doc").attr("src", source);
      $("#preview-doc").attr("type", $(this).data("filetype"));

      event.stopPropagation();
      event.stopImmediatePropagation();
    });

    //   // $('#loaderouterid').css("display","none");

    // }
  }

  // onKeyup(event: any) {
  //   this.values_document = event.target.value;

  //   var value = event.keyCode;

  //   // console.log("onkeyup");
  //   // console.log(this.values_document);
  //   // console.log(value);

  //   if (value == "13") {
  //     if (this.values_document == "" || this.values_document == " ") {
  //       this.unique_documents = [];
  //       this.unique_documents.length = 0;

  //       this.setPage(1, true);
  //     } else {
  //       this.unique_documents = [];
  //       this.unique_documents.length = 0;

  //       for (
  //         let doc_count = 0;
  //         doc_count < this.documents.length;
  //         doc_count++
  //       ) {
  //         let doc_exists = 0;

  //         if (doc_count > 0) {
  //           for (
  //             let unique_doc_count = 0;
  //             unique_doc_count < this.unique_documents.length;
  //             unique_doc_count++
  //           ) {
  //             if (
  //               this.unique_documents[unique_doc_count].element.document_name ==
  //               this.documents[doc_count].element.document_name
  //             ) {
  //               doc_exists = 1;
  //             }
  //           }
  //         }

  //         if (
  //           doc_exists == 0 &&
  //           this.documents[doc_count].element.document_name.indexOf("Old") == -1
  //         ) {
  //           if (
  //             this.documents[doc_count].element.document_name ==
  //             "Ausweisdokument Vertretungsberechtigte Person"
  //           ) {
  //             let temp_doc = this.documents[doc_count];
  //             temp_doc.element.ceo_doc_name =
  //               "Ausweisdokument Vertretungsberechtigte Person: " +
  //               this.localData.type1.legalrepresentativeform[0].firstname +
  //               " " +
  //               this.localData.type1.legalrepresentativeform[0].lastname;

  //             if (
  //               temp_doc.element.ceo_doc_name
  //                 .toLowerCase()
  //                 .indexOf(this.values_document.toLowerCase()) != -1
  //             ) {
  //               this.unique_documents.push(temp_doc);
  //             }
  //           } else if (
  //             this.documents[doc_count].element.document_name !=
  //             "Ausweisdokument Vertretungsberechtigte Person" &&
  //             this.documents[doc_count].element.document_name.indexOf(
  //               "Ausweisdokument Vertretungsberechtigte Person"
  //             ) != -1
  //           ) {
  //             let temp_doc_name =
  //               this.documents[doc_count].element.document_name;

  //             let index = temp_doc_name.replace(
  //               "Ausweisdokument Vertretungsberechtigte Person",
  //               ""
  //             );

  //             let temp_doc = this.documents[doc_count];
  //             temp_doc.element.ceo_doc_name =
  //               "Ausweisdokument Vertretungsberechtigte Person: " +
  //               this.localData.type1.legalrepresentativeform[index].firstname +
  //               " " +
  //               this.localData.type1.legalrepresentativeform[index].lastname;

  //             if (
  //               temp_doc.element.ceo_doc_name
  //                 .toLowerCase()
  //                 .indexOf(this.values_document.toLowerCase()) != -1
  //             ) {
  //               this.unique_documents.push(temp_doc);
  //             }
  //           } else if (
  //             this.documents[doc_count].element.document_name.indexOf(
  //               "Geschäftsanmeldung"
  //             ) != -1
  //           ) {
  //             if (
  //               "gewerbeanmeldung".indexOf(
  //                 this.values_document.toLowerCase()
  //               ) != -1
  //             ) {
  //               this.unique_documents.push(this.documents[doc_count]);
  //             }
  //           } else {
  //             if (
  //               this.documents[doc_count].element.document_name
  //                 .toLowerCase()
  //                 .indexOf(this.values_document.toLowerCase()) != -1
  //             ) {
  //               this.unique_documents.push(this.documents[doc_count]);
  //             }
  //           }
  //         }
  //       }

  //       this.pagerGDOC = this.pagerService.getPager(
  //         this.unique_documents.length,
  //         1
  //       );
  //       // get current page of items
  //       this.pagedItemsGDOC = this.unique_documents.slice(
  //         this.pagerGDOC.startIndex,
  //         this.pagerGDOC.endIndex + 1
  //       );

  //       if (this.unique_documents.length > 0) {
  //         this.startRecordGDOC =
  //           this.pagerGDOC.currentPage *
  //           this.pagerService.getDefaultPageSize() -
  //           this.pagerService.getDefaultPageSize() +
  //           1;
  //         this.endRecordGDOC =
  //           this.pagerGDOC.currentPage *
  //             this.pagerService.getDefaultPageSize() >
  //             this.unique_documents.length
  //             ? this.unique_documents.length
  //             : this.pagerGDOC.currentPage *
  //             this.pagerService.getDefaultPageSize();
  //       } else {
  //         this.startRecordGDOC = 0;
  //         this.endRecordGDOC = 0;
  //       }
  //     }
  //   }
  // }

  sanitizeURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    // (SecurityContext.URL,url)
  }

  preViewIndexAllgeme = 0
  preViewData: any = []
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
    this.preViewIndexAllgeme = 0
    console.log(id);
    this.preViewData = []
    // console.log(date_of_uploadnew);
    let element: HTMLElement = document.getElementById(
      "click" + this.previewid
    ) as HTMLElement;
    // if (element.innerHTML == "Schließen") {
    //   element.innerHTML = "Öffnen";
    //   // $("#imagediv").removeClass("col-md-7");
    //   // $("#imagediv").addClass("col-md-12");
    //   // $("#preview" + id).html("");
    //   $("#preview" + id).html("");
    // } else {
    //   $(".openclass").html("Öffnen");
    //   element.innerHTML = "Schließen";
    //   $(".previewclass").html("");
    // }

    // if (element.innerHTML == "Schließen") {

    // $("#imagediv").removeClass("col-md-12");
    // $("#imagediv").addClass("col-md-7");
    // console.log("tags" + JSON.stringify(tags));
    // const removepreview = () => {
    //   let elementnew: HTMLElement = document.getElementById(
    //     "click" + this.previewid
    //   ) as HTMLElement;
    //   elementnew.innerHTML = "Öffnen";

    //   // $("#imagediv").removeClass("col-md-7");
    //   // $("#imagediv").addClass("col-md-12");
    //   $("#preview" + id).html("");

    //   console.log("sadasda");
    // };

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


    let same_docs: any = [];

    for (let doc_count = 0; doc_count < this.documents.length; doc_count++) {
      if (this.documents[doc_count].element.document_name == document_name) {
        same_docs.push(this.documents[doc_count]);
      }
    }
    console.log(same_docs);


    let temporary_doc_name = "";
    if (
      document_name.indexOf(
        "Ausweisdokument Vertretungsberechtigte Person"
      ) != -1
    ) {
      temporary_doc_name = "Ausweisdokument Vertretungsberechtigte Person-1";
    } else if (document_name.indexOf("Geschäftsanmeldung") != -1) {
      temporary_doc_name = "Gewerbeanmeldung-1";
    } else {
      temporary_doc_name = document_name + "-1";
    }

    // this.preViewData = same_docs

    let list_html = "";

    for (
      let same_docs_count = 0;
      same_docs_count < same_docs.length;
      same_docs_count++
    ) {

      let index = same_docs_count + 1;
      this.preViewData.push({
        document_name: same_docs[same_docs_count].element.document_name,
        metadata: metadata,
        ticket_no: ticket_no,
        date_of_document: date_of_document,
        date_of_upload: date_of_upload,
        created_byname: created_byname,
        filetype: filetype,
        companycode: companycode,
        brand: brand,
        url: this.sanitizeURL(same_docs[same_docs_count].element.document_url),
        imagename: same_docs[same_docs_count].element.document_unique_id,
        href: `${environment.API_URL}document/downloaddocument/${same_docs[same_docs_count].element.document_unique_id}`
      })
      if (list_html == "") {
        if (
          same_docs[same_docs_count].element.document_name.includes(
            "Geschäftsanmeldung"
          )
        ) {
          console.log('Is it includes', same_docs[same_docs_count].element.document_name.includes(
            "Geschäftsanmeldung"
          ));

          if (same_docs[same_docs_count].element.verified == 1) {



            list_html =
              '<div class="list_rows row" id="list_roww' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11" style="font-size: 15px;">' +
              index +
              ". Gewerbeanmeldung-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_downn" id="angle_downn' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-right angle_rightt" id="angle_rightt' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              "</div>" +
              // '<div class="col-md-2">'+
              //     '<i class="fas fa-check-circle" style="font-size:28px;color:green;"></i>'+
              // '</div>'+
              '<div class="col-md-12 previewmultipledocsdetailss" style="background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetailss' +
              same_docs_count +
              '">' +
              "<h6>Dokumentenname: " +
              // document_name +
              temporary_doc_name +
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
              //"," +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          } else {


            list_html =
              '<div class="list_rows row" id="list_roww' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11" style="font-size: 15px;">' +
              index +
              ". Gewerbeanmeldung-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_downn" id="angle_downn' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-right angle_rightt" id="angle_rightt' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              "</div>" +
              // '<div class="col-md-2">'+
              //     '<i class="fas fa-check-circle" style="font-size:28px;color:green;"></i>'+
              // '</div>'+
              '<div class="col-md-12 previewmultipledocsdetailss" style="background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetailss' +
              same_docs_count +
              '">' +
              "<h6>Dokumentenname: " +
              // document_name +
              temporary_doc_name +
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
              //"," +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          }
        } else {
          if (same_docs[same_docs_count].element.verified == 1) {
            list_html =
              '<div class="list_rows row" id="list_roww' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11" style="font-size: 15px;">' +
              index +
              ". " +
              same_docs[same_docs_count].element.document_name +
              "-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_downn" id="angle_downn' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-right angle_rightt" id="angle_rightt' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              "</div>" +
              // '<div class="col-md-2">'+
              //     '<i class="fas fa-check-circle" style="font-size:28px;color:green;"></i>'+
              // '</div>'+
              '<div class="col-md-12 previewmultipledocsdetailss" style="background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetailss' +
              same_docs_count +
              '">' +
              "<h6>Dokumentenname: " +
              // document_name +
              temporary_doc_name +
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
              //"," +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          } else {

            list_html =
              '<div class="list_rows row" id="list_roww' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11" style="font-size: 15px;">' +
              index +
              ". " +
              same_docs[same_docs_count].element.document_name +
              "-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_downn" id="angle_downn' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-right angle_rightt" id="angle_rightt' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              "</div>" +
              '<div class="col-md-12 previewmultipledocsdetailss" style="background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetailss' +
              same_docs_count +
              '">' +
              "<h6>Dokumentenname: " +
              // document_name +
              temporary_doc_name +
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
              //"," +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          }
        }
      } else {
        if (
          same_docs[same_docs_count].element.document_name.includes(
            "Geschäftsanmeldung"
          )
        ) {
          if (same_docs[same_docs_count].element.verified == 1) {
            list_html +=
              '<div class="list_rows row" id="list_roww' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(24, 66, 151);color: white;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11" style="font-size: 15px;">' +
              index +
              ". Gewerbeanmeldung-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_downn" id="angle_downn' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              '<i class="fa fa-angle-right angle_rightt" id="angle_rightt' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              "</div>" +
              '<div class="col-md-12 previewmultipledocsdetailss" style="display:none;background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetailss' +
              same_docs_count +
              '">' +
              "</div>" +
              "</div>";
          } else {
            list_html +=
              '<div class="list_rows row" id="list_roww' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(24, 66, 151);color: white;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11" style="font-size: 15px;">' +
              index +
              ". Gewerbeanmeldung-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_downn" id="angle_downn' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              '<i class="fa fa-angle-right angle_rightt" id="angle_rightt' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              "</div>" +
              '<div class="col-md-12 previewmultipledocsdetailss" style="display:none;background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetailss' +
              same_docs_count +
              '">' +
              "</div>" +
              "</div>";
          }
        } else {
          if (same_docs[same_docs_count].element.verified == 1) {
            list_html +=
              '<div class="list_rows row" id="list_roww' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(24, 66, 151);color: white;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11" style="font-size: 15px;">' +
              index +
              ". " +
              same_docs[same_docs_count].element.document_name +
              "-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_downn" id="angle_downn' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              '<i class="fa fa-angle-right angle_rightt" id="angle_rightt' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              "</div>" +
              '<div class="col-md-12 previewmultipledocsdetailss" style="display:none;background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetailss' +
              same_docs_count +
              '">' +
              "</div>" +
              "</div>";
          } else {
            list_html +=
              '<div class="list_rows row" id="list_roww' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(24, 66, 151);color: white;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11" style="font-size: 15px;">' +
              index +
              ". " +
              same_docs[same_docs_count].element.document_name +
              "-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_downn" id="angle_downn' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              '<i class="fa fa-angle-right angle_rightt" id="angle_rightt' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              "</div>" +
              '<div class="col-md-12 previewmultipledocsdetailss" style="display:none;background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetailss' +
              same_docs_count +
              '">' +
              "</div>" +
              "</div>";
          }
        }
      }
    }

    // By Jaseer
    // $("#preview" + id).html(
    //   '<div class="col-md-12" style="border-radius:10px;border:1px solid;padding:4px 25px 4px;mrgin-bottom:35px;">' +
    //   '<div class="row">' +
    //   '<div class="col-md-4" style="margin-top:30px;">' +
    //   list_html +
    //   "</div>" +
    //   '<div class="col-md-8" id="previewmultipledocss">' +
    //   '<span class="side-icons"><i class="fa fa-times transitionanimation previewimg" aria-hidden="true" style="margin-top:0px;height:33px;width:33px;font-size:18px;position:relative;float:right;transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);" aria-hidden="true"></i></span>' +
    //   '<embed  type="' +
    //   filetype +
    //   '" src="' +
    //   url +
    //   '" style=" width: 100%; height:818px;"/>' +
    //   '<a href="' +
    //   environment.API_URL +
    //   "document/downloaddocument/" +
    //   imagename +
    //   '" ><span class="side-icons" ><i class="fa fa-download transitionanimation" style="height:36px;width:36px;font-size:16px;position:relative;float:right; transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);" aria-hidden="true"  ></i></span></a>' +
    //   "</div>" +
    //   "</div>" +
    //   "</div>"
    // );

    console.log(this.preViewData)


    $("#openAllgemeinePreiveiwmodal").trigger('click');
    this.open_modal('openAllgemeinePreiveiw')

    $(".list_rows").click(function (event) {
      previewdoc($(this).data("index"));
      event.stopPropagation();
      event.stopImmediatePropagation();
    });

    const previewdoc = (index: any) => {
      $(".list_rows").css("background-color", "rgb(24, 66, 151)");
      $(".list_rows").css("color", "white");

      $("#list_roww" + index).css("background-color", "rgb(181, 172, 172)");
      $("#list_roww" + index).css("color", "black");

      // console.log("tags here");
      // console.log(same_docs);
      // console.log(index);
      // console.log(same_docs[index]);

      let metadata = same_docs[index].element.tags[0].split(",");

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

      $(".angle_downn").css("display", "none");
      $(".angle_rightt").css("display", "block");

      $("#angle_downn" + index).css("display", "block");
      $("#angle_rightt" + index).css("display", "none");

      $("#previewmultipledocss").html(
        '<span class="side-icons"><i class="fa fa-times transitionanimation previewimg" aria-hidden="true" style="margin-top:0px;height:33px;width:33px;font-size:18px;position:relative;float:right;transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);" aria-hidden="true" ></i></span>' +
        '<embed  type="' +
        filetype +
        '" src="' +
        same_docs[index].element.document_url +
        '" style=" width: 100%; height:818px;"/>' +
        '<a href="' +
        environment.API_URL +
        "document/downloaddocument/" +
        same_docs[index].element.document_unique_id +
        '" ><span class="side-icons" ><i class="fa fa-download transitionanimation" style="height:36px;width:36px;font-size:16px;position:relative;float:right; transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);" aria-hidden="true"  ></i></span></a>'
      );

      $(".previewimg").click(function (event) {
        console.log("checked it");
        removepreview();
        event.stopPropagation();
        event.stopImmediatePropagation();
      });
      const removepreview = () => {
        let elementnew: HTMLElement = document.getElementById(
          "click" + this.previewid
        ) as HTMLElement;
        elementnew.innerHTML = "Öffnen";

        // $("#imagediv").removeClass("col-md-7");
        // $("#imagediv").addClass("col-md-12");
        $("#preview" + id).html("");

        // console.log("sadasda");
      };

      let temp_name = same_docs[index].element.document_name;

      if (
        temp_name.indexOf("Ausweisdokument Vertretungsberechtigte Person") !=
        -1
      ) {
        temp_name =
          "Ausweisdokument Vertretungsberechtigte Person-" +
          parseInt(index + 1);
      } else if (temp_name.indexOf("Geschäftsanmeldung") != -1) {
        temp_name = "Gewerbeanmeldung-" + parseInt(index + 1);
      } else {
        temp_name = temp_name + "-" + parseInt(index + 1);
      }

      $(".previewmultipledocsdetailss").html("");
      $(".previewmultipledocsdetailss").css("display", "none");

      $("#previewmultipledocsdetailss" + index).css("display", "block");
      $("#previewmultipledocsdetailss" + index).html(
        "<h6>Dokumentenname: " +
        temp_name +
        "</h6><h6>Dateigröße: " +
        metadata[0] +
        " Kb</h6><h6>Vorgangs Nr.: " +
        same_docs[index].element.ticket_no +
        "</h6><h6>Datum des Dokuments: " +
        date_of_document +
        "</h6><h6>Datum des Uploads: " +
        date_of_upload +
        "</h6><h6>Hochgeladen von: " +
        same_docs[index].element.created_byname +
        "</h6><h6>Dateityp: " +
        filetype +
        "</h6><h6>Stichworte: " +
        '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
        same_docs[index].element.companycode +
        "</span>" +
        //"," +
        "&nbsp;" +
        '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
        same_docs[index].element.brand +
        "</span>" +
        //"," +
        "&nbsp;" +
        '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
        same_docs[index].element.ticket_no +
        "</span>" +
        "</h6>"
      );
    };

    $(".previewimg").click(function (event) {
      console.log("checked it");
      removepreview();
      event.stopPropagation();
      event.stopImmediatePropagation();
    });
    const removepreview = () => {
      let elementnew: HTMLElement = document.getElementById(
        "click" + this.previewid
      ) as HTMLElement;
      elementnew.innerHTML = "Öffnen";

      // $("#imagediv").removeClass("col-md-7");
      // $("#imagediv").addClass("col-md-12");
      $("#preview" + id).html("");

      // console.log("sadasda");
    };

    const someInput = document.getElementById("previewimg");
    // someInput.addEventListener(
    //   "click",
    //   function () {
    //     removepreview();
    //   },
    //   false
    // );

    //   // $('#loaderouterid').css("display","none");

    // }
  }
  onKey(event: any) {
    // without type info
    this.values = event.target.value;
    var value = event.keyCode;
    // console.log(value);
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
                // console.log(this.customerList);
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
              // console.log(this.customerList);
            }
          },
          (rejected: any) => {
            console.log(rejected);
          }
        );
      }
    }
  }
  private _brokerfilter(name: string): Broker[] {
    // console.log("_brokerfilter" + name);
    // console.log("_broker" + JSON.stringify(this.brokerList));
    const filterValue = name.toLowerCase();
    return this.brokerList.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  onSubmit(): void {
    const that = this;

    // console.log("asghgdj" + this.values);
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
              // console.log(this.customerList);
              // console.log("this.customerList" + this.customerList);
              // console.log("this.customerno" + this.customerno);
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
            // console.log(this.customerList);
          }
        },
        (rejected: any) => {
          console.log(rejected);
        }
      );
    }
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
    // console.log(this.brokerList);
  }
  previewthirddoc(
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
    this.preViewData = []
    // console.log(date_of_uploadnew);
    let element: HTMLElement = document.getElementById(
      "clickthirddoc" + this.previewid
    ) as HTMLElement;
    // if (element.innerHTML == "Schließen") {
    //   element.innerHTML = "Öffnen";

    //   $("#previewthirddoc" + id).html("");
    // } else {
    //   $(".openclassthirddoc").html("Öffnen");
    //   element.innerHTML = "Schließen";
    //   $(".previewclass").html("");
    // }

    // if (element.innerHTML == "Schließen") {
    // console.log("tags" + JSON.stringify(tags));
    // const removepreview = () => {
    //   let elementnew: HTMLElement = document.getElementById(
    //     "clickthirddoc" + this.previewid
    //   ) as HTMLElement;
    //   elementnew.innerHTML = "Öffnen";

    //   $("#previewthirddoc" + id).html("");

    //   console.log("sadasda");
    // };

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

    let same_docs: any = [];

    for (let doc_count = 0; doc_count < this.documents.length; doc_count++) {
      if (this.documents[doc_count].element.document_name == document_name) {
        same_docs.push(this.documents[doc_count]);
      }
    }

    let temporary_doc_name = "";
    if (
      document_name.indexOf(
        "Ausweisdokument Vertretungsberechtigte Person"
      ) != -1
    ) {
      temporary_doc_name = "Ausweisdokument Vertretungsberechtigte Person-1";
    } else if (document_name.indexOf("Geschäftsanmeldung") != -1) {
      temporary_doc_name = "Gewerbeanmeldung-1";
    } else {
      temporary_doc_name = document_name + "-1";
    }

    let list_html = "";

    for (
      let same_docs_count = 0;
      same_docs_count < same_docs.length;
      same_docs_count++
    ) {

      this.preViewData.push({
        document_name: same_docs[same_docs_count].element.document_name,
        metadata: metadata,
        ticket_no: ticket_no,
        date_of_document: date_of_document,
        date_of_upload: date_of_upload,
        created_byname: created_byname,
        filetype: filetype,
        companycode: companycode,
        brand: brand,
        url: this.sanitizeURL(same_docs[same_docs_count].element.document_url),
        imagename: same_docs[same_docs_count].element.document_unique_id,
        href: `${environment.API_URL}document/downloaddocument/${same_docs[same_docs_count].element.document_unique_id}`
      })

      let index = same_docs_count + 1;
      if (list_html == "") {
        if (
          same_docs[same_docs_count].element.document_name.indexOf(
            "Ausweisdokument Vertretungsberechtigte Person"
          ) != -1
        ) {
          if (same_docs[same_docs_count].element.verified == 1) {
            list_html =
              '<div class="list_rows row" id="list_row' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11">' +
              index +
              ". Ausweisdokument Vertretungsberechtigte Person-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_down" id="angle_down' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-right angle_right" id="angle_right' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              "</div>" +
              // '<div class="col-md-2">'+
              //     '<i class="fas fa-check-circle" style="font-size:28px;color:green;"></i>'+
              // '</div>'+
              '<div class="col-md-12 previewmultipledocsdetails" style="background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetails' +
              same_docs_count +
              '">' +
              "<h6>Dokumentenname: " +
              // document_name +
              temporary_doc_name +
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
              //"," +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          } else {
            list_html =
              '<div class="list_rows row" id="list_row' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11">' +
              index +
              ". Ausweisdokument Vertretungsberechtigte Person-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_down" id="angle_down' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-right angle_right" id="angle_right' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              "</div>" +
              '<div class="col-md-12 previewmultipledocsdetails" style="background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetails' +
              same_docs_count +
              '">' +
              "<h6>Dokumentenname: " +
              // document_name +
              temporary_doc_name +
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
              //"," +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          }
        } else if (
          same_docs[same_docs_count].element.document_name.indexOf(
            "Geschäftsanmeldung"
          ) != -1
        ) {
          if (same_docs[same_docs_count].element.verified == 1) {
            list_html =
              '<div class="list_rows row" id="list_row' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11">' +
              index +
              ". Gewerbeanmeldung-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_down" id="angle_down' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-right angle_right" id="angle_right' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              "</div>" +
              // '<div class="col-md-2">'+
              //     '<i class="fas fa-check-circle" style="font-size:28px;color:green;"></i>'+
              // '</div>'+

              '<div class="col-md-12 previewmultipledocsdetails" style="background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetails' +
              same_docs_count +
              '">' +
              "<h6>Dokumentenname: " +
              // document_name +
              temporary_doc_name +
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
              //"," +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          } else {
            list_html =
              '<div class="list_rows row" id="list_row' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11">' +
              index +
              ". Gewerbeanmeldung-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_down" id="angle_down' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-right angle_right" id="angle_right' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              "</div>" +
              '<div class="col-md-12 previewmultipledocsdetails" style="background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetails' +
              same_docs_count +
              '">' +
              "<h6>Dokumentenname: " +
              // document_name +
              temporary_doc_name +
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
              //"," +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          }
        } else {
          if (same_docs[same_docs_count].element.verified == 1) {
            list_html =
              '<div class="list_rows row" id="list_row' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11">' +
              index +
              ". " +
              same_docs[same_docs_count].element.document_name +
              "-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_down" id="angle_down' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-right angle_right" id="angle_right' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              "</div>" +
              // '<div class="col-md-2">'+
              //     '<i class="fas fa-check-circle" style="font-size:28px;color:green;"></i>'+
              // '</div>'+

              '<div class="col-md-12 previewmultipledocsdetails" style="background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetails' +
              same_docs_count +
              '">' +
              "<h6>Dokumentenname: " +
              // document_name +
              temporary_doc_name +
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
              //"," +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          } else {
            list_html =
              '<div class="list_rows row" id="list_row' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11">' +
              index +
              ". " +
              same_docs[same_docs_count].element.document_name +
              "-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_down" id="angle_down' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              '<i class="fa fa-angle-right angle_right" id="angle_right' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              "</div>" +
              '<div class="col-md-12 previewmultipledocsdetails" style="background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetails' +
              same_docs_count +
              '">' +
              "<h6>Dokumentenname: " +
              // document_name +
              temporary_doc_name +
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
              //"," +
              "&nbsp;" +
              '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
              ticket_no +
              "</span>" +
              "</h6>" +
              "</div>" +
              "</div>";
          }
        }
      } else {
        if (
          same_docs[same_docs_count].element.document_name.indexOf(
            "Ausweisdokument Vertretungsberechtigte Person"
          ) != -1
        ) {
          if (same_docs[same_docs_count].element.verified == 1) {
            list_html +=
              '<div class="list_rows row" id="list_row' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(24, 66, 151);color: white;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11">' +
              index +
              ". Ausweisdokument Vertretungsberechtigte Person-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_down" id="angle_down' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              '<i class="fa fa-angle-right angle_right" id="angle_right' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              "</div>" +
              // '<div class="col-md-2">'+
              //     '<i class="fas fa-check-circle" style="font-size:28px;color:green;"></i>'+
              // '</div>'+

              '<div class="col-md-12 previewmultipledocsdetails" style="display:none;background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" style="background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding-top:10px;"  id="previewmultipledocsdetails' +
              same_docs_count +
              '">' +
              "</div>" +
              "</div>";
          } else {
            list_html +=
              '<div class="list_rows row" id="list_row' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(24, 66, 151);color: white;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11">' +
              index +
              ". Ausweisdokument Vertretungsberechtigte Person-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_down" id="angle_down' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              '<i class="fa fa-angle-right angle_right" id="angle_right' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              "</div>" +
              '<div class="col-md-12 previewmultipledocsdetails" style="display:none;background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetails' +
              same_docs_count +
              '">' +
              "</div>" +
              "</div>";
          }
        } else if (
          same_docs[same_docs_count].element.document_name.indexOf(
            "Geschäftsanmeldung"
          ) != -1
        ) {
          if (same_docs[same_docs_count].element.verified == 1) {
            list_html +=
              '<div class="list_rows row" id="list_row' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(24, 66, 151);color: white;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11">' +
              index +
              ". Gewerbeanmeldung-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_down" id="angle_down' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              '<i class="fa fa-angle-right angle_right" id="angle_right' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              "</div>" +
              // '<div class="col-md-2">'+
              //     '<i class="fas fa-check-circle" style="font-size:28px;color:green;"></i>'+
              // '</div>'+
              '<div class="col-md-12 previewmultipledocsdetails" style="display:none;background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetails' +
              same_docs_count +
              '">' +
              "</div>" +
              "</div>";
          } else {
            list_html +=
              '<div class="list_rows row" id="list_row' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(24, 66, 151);color: white;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11">' +
              index +
              ". Gewerbeanmeldung-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_down" id="angle_down' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              '<i class="fa fa-angle-right angle_right" id="angle_right' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              "</div>" +
              '<div class="col-md-12 previewmultipledocsdetails" style="display:none;background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetails' +
              same_docs_count +
              '">' +
              "</div>" +
              "</div>";
          }
        } else {
          if (same_docs[same_docs_count].element.verified == 1) {
            list_html +=
              '<div class="list_rows row" id="list_row' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(24, 66, 151);color: white;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11">' +
              index +
              ". " +
              same_docs[same_docs_count].element.document_name +
              "-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_down" id="angle_down' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              '<i class="fa fa-angle-right angle_right" id="angle_right' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              "</div>" +
              // '<div class="col-md-2">'+
              //     '<i class="fas fa-check-circle" style="font-size:28px;color:green;"></i>'+
              // '</div>'+
              '<div class="col-md-12 previewmultipledocsdetails" style="display:none;background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetails' +
              same_docs_count +
              '">' +
              "</div>" +
              "</div>";
          } else {
            list_html +=
              '<div class="list_rows row" id="list_row' +
              same_docs_count +
              '" data-index="' +
              same_docs_count +
              '" style="cursor: pointer;margin-top: 5px;background-color: rgb(24, 66, 151);color: white;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;">' +
              '<div class="col-md-11">' +
              index +
              ". " +
              same_docs[same_docs_count].element.document_name +
              "-" +
              index +
              "</div>" +
              '<div class="col-md-1">' +
              '<i class="fa fa-angle-down angle_down" id="angle_down' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;display:none;"></i>' +
              '<i class="fa fa-angle-right angle_right" id="angle_right' +
              same_docs_count +
              '" style="font-weight:bold;font-size:30px;"></i>' +
              "</div>" +
              '<div class="col-md-12 previewmultipledocsdetails" style="display:none;background-color:white;border:1px solid darkgray;margin-bottom:-5px;border-radius:0px 0px 10px 10px;padding: 20px;" id="previewmultipledocsdetails' +
              same_docs_count +
              '">' +
              "</div>" +
              "</div>";
          }
        }
      }
    }

    // $("#previewthirddoc" + id).html(
    //   '<div class="col-md-12" style="border-radius:10px;border:1px solid;padding:4px 25px 4px;margin-bottom:35px;">' +
    //   '<div class="row">' +
    //   '<div class="col-md-4" style="margin-top:30px;">' +
    //   list_html +
    //   "</div>" +
    //   '<div class="col-md-8" id="previewmultipledocs">' +
    //   '<span class="side-icons"><i class="fa fa-times transitionanimation previewimg" aria-hidden="true" style="margin-top:0px;height:35px;width:35px;font-size:18px;position:relative;float:right;transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);" aria-hidden="true"></i></span>' +
    //   '<embed  type="' +
    //   filetype +
    //   '" src="' +
    //   url +
    //   '" style=" width: 100%; height:818px;"/>' +
    //   '<a href="' +
    //   environment.API_URL +
    //   "document/downloaddocument/" +
    //   imagename +
    //   '" ><span class="side-icons" ><i class="fa fa-download transitionanimation" style="height:36px;width:36px;font-size:16px;position:relative;float:right; transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);" aria-hidden="true"  ></i></span></a>' +
    //   "</div>" +
    //   "</div>" +
    //   "</div>"
    // );


    $("#openAllgemeinePreiveiwmodal").trigger('click');
    this.open_modal('openAllgemeinePreiveiw')



    $(".list_rows").click(function (event) {
      previewdoc($(this).data("index"));
      event.stopPropagation();
      event.stopImmediatePropagation();
    });

    const previewdoc = (index: any) => {
      $(".list_rows").css("background-color", "rgb(24, 66, 151)");
      $(".list_rows").css("color", "white");

      $("#list_row" + index).css("background-color", "rgb(181, 172, 172)");
      $("#list_row" + index).css("color", "black");

      // console.log("tags here");
      // console.log(same_docs);
      // console.log(index);
      // console.log(same_docs[index]);

      let metadata = same_docs[index].element.tags[0].split(",");

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

      $(".angle_down").css("display", "none");
      $(".angle_right").css("display", "block");

      $("#angle_down" + index).css("display", "block");
      $("#angle_right" + index).css("display", "none");

      $("#previewmultipledocs").html(
        '<span class="side-icons"><i class="fa fa-times transitionanimation previewimg" aria-hidden="true" style="margin-top:0px;height:33px;width:33px;font-size:18px;position:relative;float:right;transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);" aria-hidden="true" ></i></span>' +
        '<embed  type="' +
        filetype +
        '" src="' +
        same_docs[index].element.document_url +
        '" style=" width: 100%; height:818px;"/>' +
        '<a href="' +
        environment.API_URL +
        "document/downloaddocument/" +
        same_docs[index].element.document_unique_id +
        '" ><span class="side-icons" ><i class="fa fa-download transitionanimation" style="height:36px;width:36px;font-size:16px;position:relative;float:right; transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);" aria-hidden="true"  ></i></span></a>'
      );

      $(".previewimg").click(function (event) {
        console.log("checked it");
        removepreview();
        event.stopPropagation();
        event.stopImmediatePropagation();
      });

      const removepreview = () => {
        let elementnew: HTMLElement = document.getElementById(
          "clickthirddoc" + this.previewid
        ) as HTMLElement;
        elementnew.innerHTML = "Öffnen";

        $("#previewthirddoc" + id).html("");

        // console.log("sadasda");
      };

      let temp_name = same_docs[index].element.document_name;

      if (
        temp_name.indexOf("Ausweisdokument Vertretungsberechtigte Person") !=
        -1
      ) {
        temp_name =
          "Ausweisdokument Vertretungsberechtigte Person-" +
          parseInt(index + 1);
      } else if (temp_name.indexOf("Geschäftsanmeldung") != -1) {
        temp_name = "Gewerbeanmeldung-" + parseInt(index + 1);
      } else {
        temp_name = temp_name + "-" + parseInt(index + 1);
      }

      $(".previewmultipledocsdetails").html("");
      $(".previewmultipledocsdetails").css("display", "none");

      $("#previewmultipledocsdetails" + index).css("display", "block");
      $("#previewmultipledocsdetails" + index).html(
        "<h6>Dokumentenname: " +
        temp_name +
        "</h6><h6>Dateigröße: " +
        metadata[0] +
        " Kb</h6><h6>Vorgangs Nr.: " +
        same_docs[index].element.ticket_no +
        "</h6><h6>Datum des Dokuments: " +
        date_of_document +
        "</h6><h6>Datum des Uploads: " +
        date_of_upload +
        "</h6><h6>Hochgeladen von: " +
        same_docs[index].element.created_byname +
        "</h6><h6>Dateityp: " +
        filetype +
        "</h6><h6>Stichworte: " +
        '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
        same_docs[index].element.companycode +
        "</span>" +
        //"," +
        "&nbsp;" +
        '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
        same_docs[index].element.brand +
        "</span>" +
        //"," +
        "&nbsp;" +
        '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
        same_docs[index].element.ticket_no +
        "</span>" +
        "</h6>"
      );
    };

    $(".previewimg").click(function (event) {
      console.log("checked it");
      removepreview();
      event.stopPropagation();
      event.stopImmediatePropagation();
    });

    const removepreview = () => {
      let elementnew: HTMLElement = document.getElementById(
        "clickthirddoc" + this.previewid
      ) as HTMLElement;
      elementnew.innerHTML = "Öffnen";

      $("#previewthirddoc" + id).html("");

      // console.log("sadasda");
    };

    const someInput = document.getElementById("previewimg");
    //const someInput = document.getElementsByClassName("previewimg");
    //  someInput.addEventListener(
    //    "click",
    //    function () {
    //      removepreview();
    //    },
    //    false
    //  );

    //   // $('#loaderouterid').css("display","none");

    // }
  }
  modaloutsideclicked() {
    alert("background is clicked!");
  }
  goToRegistration() {
    $("#loaderouterid").css("display", "block");
    $("#closeModaltelephoneverification").trigger("click");
    let data2 = {
      _id: this.localData._id,
    };
    this.userService.updateBrokerdata(data2).subscribe(
      async (success: any) => {
        // if success and error give response
        if (success.status == 200) {
          this.userService
            .updateUserdocumentdata(this.id)
            .pipe(first())
            .subscribe(
              (data: any) => {
                if (data.status == 200) {
                  setTimeout(() => {
                    $("#loaderouterid").css("display", "none");
                    this.changesdone = false;
                    console.log(
                      "saveChangedData localdata" +
                      JSON.stringify(this.localData)
                    );
                    console.log("saveChangedDataaftersaving" + success.result);
                    console.log(
                      "saveChangedDataaftersaving" + success["result"]
                    );
                    console.log(
                      "saveChangedDataaftersaving" +
                      JSON.stringify(success["result"])
                    );
                    console.log("saveChangedDataaftersaving" + success.status);
                    localStorage.setItem(
                      "currentUser",
                      JSON.stringify(success["result"])
                    );
                    this.localData = success["result"];
                    console.log(
                      "saveChangedData localdata" +
                      JSON.stringify(this.localData)
                    );

                    console.log("type1data" + success.status);
                    let newemployee = [];
                    let name =
                      this.localData.firstname + " " + this.localData.lastname;
                    newemployee.push("5fb56bfa3a90792ac8e4227c");
                    newemployee.push(this.localData._id);

                    let projectdatanew = {
                      employee_id: newemployee,
                      Uploaded_By: name,
                      Transaction_Type: "Vermittlerupdate",
                      uploaddate: new Date().toISOString(),
                      updateticket_no: this.localData.brokerregticketno,
                      companyname: "42140 DFG Finanzprofi GmbH",
                      Type: "Vermittlerregistrierung",
                    };

                    this.CasePostforbroker(projectdatanew, data);
                  }, 3000);
                } else {
                  setTimeout(() => {
                    $("#loaderouterid").css("display", "none");
                    console.log("type1data" + success.status);
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Please Fill Correct Details123!!",
                    });
                  }, 100);
                }
              },
              (err) => {
                console.log("error10");
                console.log(err);
              }
            );
        } else {
          setTimeout(() => {
            $("#loaderouterid").css("display", "none");
            console.log("type1data" + success.status);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please Fill Correct Details123!!",
            });
          }, 100);
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
  }

  CasePostforbroker(projectdatanew: any, response: any) {
    this.userService
      .CaseListUpload(projectdatanew)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log("Error", error);
          $("#loaderouterid").css("display", "none");
        },
        () => {
          this.router.navigate(["./cefima/b2b-home"]);
          $("#loaderouterid").css("display", "none");
        }
      );
  }

  resetphoneverification() {
    this.updateform.reset();
    this.askqueform.reset();
    this.dataSave = false;
    this.otpError = false;
    this.otp = false;
    this.otpSuccess = false;
    $("#previousbutton").trigger("click");
  }
  updateData(data: any) {
    if (data == "no") {
      this.dataSave = false;
      $("#closeModaltelephoneverification").trigger("click");
    } else if (data == "yes") {
      this.dataSave = true;
      this.askquestion.patchValue({
        formkey: "yes",
      });
      setTimeout(() => {
        $("#movetonextstep").trigger("click");
      }, 100);
      setTimeout(() => {
        let num1 = this.localData.contactno;
        let number = num1.split("");
        console.log("split number" + number);
        console.log("split number" + number[0]);
        console.log("split number" + number[1]);
        for (let i = 3; i < number.length - 4; i++) {
          number[i] = "x";
        }
        console.log("split number" + number);
        console.log("split number" + number.join(""));
        let newnumber = number.join("");
        this.phoneFormGroup.patchValue({
          phone_number: newnumber,
        });
        const input: any = document.querySelector("#phoneupdate");
        console.log("querySelector" + input);
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
      }, 100);
    }
  }
  showAlert() {
    Swal.fire({
      title: "Bitte beachten Sie den Hinweis.",
      html:
        "Sie können in den nächsten Schritten Ihre Vermittlerdaten aktualisieren. Bitte beachten Sie, das ihre Daten daraufhin erneut von einem CEFIMA Mitarbeiter verifiziert werden und nach erfolgreicher Prüfung Ihre Vermittlerverträge & Vereinbarungen aktualisiert zur Signatur zur Verfügung gestellt werden. Während des Verifizierungsprozesses sind Auszahlungen durch CEFIMA pausiert.<br><i class='fa fa-info-circle iconmove' style='color: #184397;cursor: pointer;' aria-hidden='true'></i> Informationspflicht" +
        "Vermittler sind verpflichtet CEFIMA die Änderung ihrer Daten unverzüglich mitzuteilen<br><i class='fa fa-info-circle iconmove' style='color: #184397;cursor: pointer;' aria-hidden='true'></i>  Prüfdauer" +
        " Im Regelfall sind Ihre Daten in zwei Werktagen verifiziert ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "grey",
      confirmButtonText:
        'Verstanden&nbsp;<i class="fa fa-arrow-right" aria-hidden="true"></i>',
      cancelButtonText: "Abrechen",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        $("#opentelephoneverification").trigger("click");
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    });
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

  checkforverified(docname: any) {
    let dataLocal = JSON.parse(localStorage.getItem("currentUser")!);

    let count = 0;

    if (dataLocal.companydata.length > 0) {
      for (let i = 0; i < dataLocal.companydata.length; i++) {
        if (docname == dataLocal.companydata[i].name) {
          count = 1;
        }
      }
    } else {
      //return undefined;
      count = 0;
    }

    if (docname == "Ausweisdokument Vertretungsberechtigte Person") {
      if (dataLocal.ceodata[0]) {
        count = 1;
      }
    }

    if (
      docname != "Ausweisdokument Vertretungsberechtigte Person" &&
      docname.indexOf("Ausweisdokument Vertretungsberechtigte Person") != -1
    ) {
      docname = docname.replace(
        "Ausweisdokument Vertretungsberechtigte Person",
        "ceodoc"
      );

      if (dataLocal.ceodata.length > 0) {
        for (let i = 0; i < dataLocal.ceodata.length; i++) {
          if (docname == dataLocal.ceodata[i].name) {
            count = 1;
          }
        }
      }
    }

    if (dataLocal.contractdata.length > 0) {
      for (let i = 0; i < dataLocal.contractdata.length; i++) {
        if (docname == dataLocal.contractdata[i].name) {
          count = 1;
        }
      }
    }

    if (dataLocal.shareholderdata.length > 0) {
      for (let i = 0; i < dataLocal.shareholderdata.length; i++) {
        if (docname == dataLocal.shareholderdata[i].name) {
          count = 1;
        }
      }
    }

    if (count == 1) {
      return true;
    } else {
      return undefined;
    }
  }

  jumptoresigndocs() {
    this.localData.uploaddata = 0;
    localStorage.setItem("currentUser", JSON.stringify(this.localData));
    // this.router.navigate(["b2b-home"]);
    this.router.navigate(["./cefima/b2b-home"]);
  }

  jumptoregisteration() {
    console.log("my button clicked");
    console.log(this.localData.status);

    this.localData.registeration_editable = 1;
    this.localData.documents_visible = "no";
    localStorage.setItem("currentUser", JSON.stringify(this.localData));

    this.router.navigate(["./cefima/b2b-home"]);
  }

  // pagination unique_documents.push

  setPage(page: number, Double?: any) {
    // get pager object from service
    //this.getdivoutside();
    this.unique_documents.length = 0;
    this.unique_documents = [];

    console.log(Double);


    if (Double) {
      for (let doc_count = 0; doc_count < this.documents.length; doc_count++) {
        let doc_exists = 0;

        if (doc_count > 0) {
          for (
            let unique_doc_count = 0;
            unique_doc_count < this.unique_documents.length;
            unique_doc_count++
          ) {
            if (
              this.unique_documents[unique_doc_count].element.document_name ==
              this.documents[doc_count].element.document_name
            ) {
              doc_exists = 1;
            }
          }
        }
        console.log('doc_count :', doc_count);
        console.log('4618 :', this.documents[doc_count].element.document_name.indexOf("Old"));



        if (
          doc_exists == 0 &&
          this.documents[doc_count].element.document_name.indexOf("Old") == -1
        ) {
          if (
            this.documents[doc_count].element.document_name ==
            "Ausweisdokument Vertretungsberechtigte Person"
          ) {
            let temp_doc = this.documents[doc_count];
            temp_doc.element.ceo_doc_name =
              "Ausweisdokument Vertretungsberechtigte Person: " +
              this.localData.type1.legalrepresentativeform[0]?.firstname +
              " " +
              this.localData.type1.legalrepresentativeform[0]?.lastname;
            this.unique_documents.push(temp_doc);
          } else if (
            this.documents[doc_count].element.document_name !=
            "Ausweisdokument Vertretungsberechtigte Person" &&
            this.documents[doc_count].element.document_name.indexOf(
              "Ausweisdokument Vertretungsberechtigte Person"
            ) != -1
          ) {
            let temp_doc_name = this.documents[doc_count].element.document_name;

            let index = temp_doc_name.replace(
              "Ausweisdokument Vertretungsberechtigte Person",
              ""
            );

            let temp_doc = this.documents[doc_count];
            temp_doc.element.ceo_doc_name =
              "Ausweisdokument Vertretungsberechtigte Person: " +
              this.localData.type1?.legalrepresentativeform[index]?.firstname +
              " " +
              this.localData.type1?.legalrepresentativeform[index]?.lastname;
            this.unique_documents.push(temp_doc);
          } else {
            this.unique_documents.push(this.documents[doc_count]);
          }
        }
      }

      this.pagerGDOC = this.pagerService.getPagerGDOC(
        this.unique_documents.length,
        page,
        10
      );

      console.log("Pager gdoc");
      console.log(this.pagerGDOC);
      // get current page of items
      this.pagedItemsGDOC = this.unique_documents.slice(
        this.pagerGDOC.startIndex,
        this.pagerGDOC.endIndex + 1
      );
      this.pagedItemsGDOCSearch = this.unique_documents.slice(
        this.pagerGDOC.startIndex,
        this.pagerGDOC.endIndex + 1
      );


      if (this.unique_documents.length > 0) {
        this.startRecordGDOC = this.pagerGDOC.currentPage * 10 - 10 + 1;
        this.endRecordGDOC =
          this.pagerGDOC.currentPage * 10 > this.unique_documents.length
            ? this.unique_documents.length
            : this.pagerGDOC.currentPage * 10;
      } else {
        this.startRecordGDOC = 0;
        this.endRecordGDOC = 0;
      }
    } else {
      this.pager = this.pagerService.getPager(
        this.customerDocList.length,
        page
      );
      // get current page of items
      this.pagedItems = this.customerDocList.slice(
        this.pager.startIndex,
        this.pager.endIndex + 1
      );
      // console.log("AAAAAAAAA");
      // console.log(this.pagedItemsGDOC);
      if (this.customerDocList.length > 0) {
        this.startRecord =
          this.pager.currentPage * this.pagerService.getDefaultPageSize() -
          this.pagerService.getDefaultPageSize() +
          1;
        this.endRecord =
          this.pager.currentPage * this.pagerService.getDefaultPageSize() >
            this.customerDocList.length
            ? this.customerDocList.length
            : this.pager.currentPage * this.pagerService.getDefaultPageSize();
      } else {
        this.startRecord = 0;
        this.endRecord = 0;
      }
    }
  }

  setPagetype(page: number, data: any) {
    // console.log("sadsadsad" + JSON.stringify(this.type1));
    // get pager object from service
    //this.getdivoutside();
    if (data == "type1") {
      // console.log("sadsadsad" + JSON.stringify(this.type1));

      this.pagertype[0].type1 = this.pagerService.getPager(
        this.type1.length,
        page
      );
      // console.log("sadsadsad" + this.pagertype[0].type1);
      // get current page of items
      this.pagedItemstype[0].type1 = this.type1.slice(
        this.pagertype[0].type1.startIndex,
        this.pagertype[0].type1.endIndex + 1
      );
      this.pagedItemstypeSearch[0].type1 = this.type1.slice(
        this.pagertype[0].type1.startIndex,
        this.pagertype[0].type1.endIndex + 1
      );
      console.log("pagedItemstype :" + this.pagedItemstype[0].type1);
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
      // console.log("sadsadsad" + JSON.stringify(this.type2));

      this.pagertype[0].type2 = this.pagerService.getPager(
        this.type2.length,
        page
      );
      // console.log("sadsadsad" + this.pagertype[0].type2);
      // get current page of items
      this.pagedItemstype[0].type2 = this.type2.slice(
        this.pagertype[0].type2.startIndex,
        this.pagertype[0].type2.endIndex + 1
      );

      this.pagedItemstypeSearch[0].type2 = this.type2.slice(
        this.pagertype[0].type2.startIndex,
        this.pagertype[0].type2.endIndex + 1
      );

      console.log("pagedItemstype2 :" + this.pagedItemstype[0].type2);
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
      // console.log("sadsadsad" + JSON.stringify(this.type3));

      this.pagertype[0].type3 = this.pagerService.getPager(
        this.type3.length,
        page
      );
      // console.log("sadsadsad" + this.pagertype[0].type3);
      // get current page of items
      this.pagedItemstype[0].type3 = this.type3.slice(
        this.pagertype[0].type3.startIndex,
        this.pagertype[0].type3.endIndex + 1
      );

      this.pagedItemstypeSearch[0].type3 = this.type3.slice(
        this.pagertype[0].type3.startIndex,
        this.pagertype[0].type3.endIndex + 1
      );
      // console.log("pagedItemstype 3" ,this.pagedItemstype[0].type3 );
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
  statusCustomer(id: any) {
    Swal.fire({
      title: "Möchten Sie den Benutzerstatus wirklich ändern?",
      showCancelButton: true,
      confirmButtonText: "Ja",
      cancelButtonText: "Nein",
    }).then((result) => {
      if (result.value) {
        // const data = this.userService.statusCustomer({ id: id });
      }
    });
  }
  setCompanyCondition(company: any) {
    // console.log("adsasdsadasdasdas");
    if (company.includes("cefima_customer")) {
      // console.log("compaaaanyyyyy");
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

  //Check if the user is loggedIn or not
  isLoggedIn() {
    let redirectionRoute = this.authService.checkRouteRedirect(this.loginRole);
    this.router.navigate([redirectionRoute]);
  }
  dataconvert(
    bytes: number = 0,
    precision: number | unitPrecisionMap = defaultPrecisionMap
  ): string {
    console.log("ngOn");
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
  fetchNews(event: any) {
    // console.log("changetab" + event);
  }

  gotocontact() {
    // console.log("changetab");
  }

  tabClick() { }
  async handleImageChange(
    event: any,
    preview: string,
    docName: string,
    idname: any
  ) {
    event.preventDefault();
    this.uploadingdata = true;
    $("#result").html("");
    let StringTemple;
    this.showButton = true;
    const removeData = (j: any) => {
      this.filearraynew.splice(j, 1);
      this.documentid[j] = "";
      this.documentlist[j] = "";
      $("#" + idname).val("");
      if (this.filearraynew.length == 0) {
        this.edited = true;
      } else {
        this.showButton = false;
      }
      // console.log("documentlist" + JSON.stringify(this.documentlist));
      // console.log("documentid" + JSON.stringify(this.documentid));
    };

    var files = event.target.files;
    console.log("events" + event.target.files);
    var filesLength = files.length;

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
          ImageName = "../assets/PDF.svg";
        } else {
          ImageName = (e.target as any).result;
        }

        let Size111 = Math.round(f.size / 1024);

        if (
          extension == "mp4" ||
          extension == "MP4" ||
          extension == "mov" ||
          extension == "MOV" ||
          extension == "aiv" ||
          extension == "AIV" ||
          extension == "m4v" ||
          extension == "M4V"
        ) {
          StringTemple =
            '<div class="pip"  style=" margin: auto  !important;" id="div3">' +
            "" +
            '<div class="removepreview" id="removepreviewid' +
            preview +
            '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px; padding: 6px;color: white;position: relative;margin-top: 2px;   margin-left: auto;cursor: pointer;">X</div>' +
            "" +
            '<video controls  id="videoSourceWrapper' +
            idname +
            '" style="width: 100%;height:210px;    margin-top: 10px;  object-fit: cover; " ' +
            '"/></video>' +
            "<div> <b>Dokumentenname: " +
            f.name +
            "</b> </div><div> <b>Dateigröße: " +
            Size +
            "</b> </div>" +
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

          $("#videoSourceWrapper" + idname).attr(
            "src",
            URL.createObjectURL(files[i])
          );
        } else {
          StringTemple =
            '<div class="pip"  style="margin: auto !important;" id="div3">' +
            "" +
            '<div class="removepreview" id="removepreviewid' +
            preview +
            '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px;padding: 6px;color: white;position: relative;margin-top: 2px;   margin-left: auto;cursor: pointer;">X</div>' +
            "" +
            '<img class="imageThumb" style="width: 100%;height:210px;    margin-top: 10px;" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            "<div> <b>Dokumentenname: " +
            f.name +
            "</b> </div><div> <b>Dateigröße: " +
            Size +
            "</b> </div>" +
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
        }

        $("#removepreviewid" + preview).click(function () {
          removeData(idname);

          $(this).parent(".pip").remove();
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
              //if((size_extension=="MB" && size_num > 30) || (size_extension=="KB" && size_num > 30000)){
              $("div.percentageclass" + idname).width(
                Math.round((event.loaded / event.total!) * 100) + "%"
              );
              $("div.percentageclass" + idname).html(
                Math.round((event.loaded / event.total!) * 100) + "%"
              );
              //}

              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);

              setTimeout(() => {
                //if((size_extension=="MB" && size_num > 30) || (size_extension=="KB" && size_num > 30000)){
                $("#progressnew" + idname).css("display", "none");
                $("#progressnew" + idname).css("width", "0");
                $("div.percentageclass" + idname).width("0");
                $("div.percentageclass" + idname).css("width", "0");
                $("div.percentageclass" + idname).html("");
                //}
                this.uploadingdata = false;

                let document_name = docName;
                let olddocumentid = this.documentid[idname];
                this.documentid[idname] = event.body.document_unique_id;

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

                this.documentlist[idname] = {
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
                //   this.documentlist[idname]={
                //     olddocument_unique_id:olddocumentid,
                //     document_unique_id:event.body.document_unique_id,
                //  tags: tags,
                //   };
                console.log("documentlist" + JSON.stringify(this.documentlist));
                console.log("documentid" + JSON.stringify(this.documentid));
                // }, 1500);
              }, 500);
          }
        });
    }

    console.log(this.filearray);
  }

  moveForward() {
    console.log("documentid" + JSON.stringify(this.documentid));
    // console.log("moveforward");
    let data = {
      _id: this.localData._id,
      website_url: this.docFromGroup.value.website_url,
      marketingcustomerno: this.docFromGroup.value.phone_number,
      documentlist: this.documentlist,
      documentid: this.documentid,
      ticket_no: "40-ce-332",
    };
    // console.log("moveforward" + JSON.stringify(data));
    $("#loaderouterid").css("display", "block");
    this.userService.senduserdetailsupdate(data).subscribe(
      (success: any) => {
        // if success and error give response
        if (success.status == 200) {
          $("#loaderouterid").css("display", "none");
          Swal.fire({
            position: "center",
            title: "Marketingdetails erfolgreich aktualisiert!!",
            // showConfirmButton: false,
            // timer: 1500
            iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
            confirmButtonText: "Ok",
            confirmButtonColor: '#02a9ed',
            customClass: {
              icon: 'no-border'
            },
          });
          localStorage.setItem("currentUser", JSON.stringify(success.result));
          this.documentlist[0] = "";
          this.documentlist[1] = "";
          this.brokermarketingdetails = false;
          this.phonenumupdate = false;
          this.website_urlupdate = false;
        } else {
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
  }

  checkmessage() {
    let inputmessage: any = $("#inputmessage").val();
    if (inputmessage == "") {
      this.editsendbutton = true;
    } else {
      this.editsendbutton = false;
    }
  }

  sendmessage() {
    // $('#inputmessage').attr("disabled","true");
    $("#inputmessage").attr("disabled", "true");

    let inputmessage: any = $("#inputmessage").val();

    // console.log("moveforward" + JSON.stringify(this.selectedbroker));
    let index = this.selectedbroker.indexOf(this.localData._id);
    if (index != -1) {
      this.selectedbroker.splice(index, 1);
    }
    // console.log("moveforward" + JSON.stringify(this.selectedbroker));

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
      // console.log("moveforward" + JSON.stringify(result));
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
      this.messagelist.push(data);
      $("#inputmessage").removeAttr("disabled");
      this.editsendbutton = true;
      $("#inputmessage").val("");
    });
  }

  giveanswer() {
    // console.log("documentid" + JSON.stringify(this.documentidforans));
    // console.log("moveforward" + this.documentidforans);
    // let selectedquestion=this.selectedquestion;

    let data = {
      question_id: this.selectedquestion,
      ansinput: this.addquestionformgroup.value.ansinput,
      ansfile: this.documentidforans,

      singledate: this.addquestionformgroup.value.singledate,
      fromdate: this.addquestionformgroup.value.fromdate,
      todate: this.addquestionformgroup.value.todate,
      // "documentlist":this.documentlist,
      // "documentid":this.documentid,
      // "ticket_no":'40-ce-332',
    };

    $("#loaderouterid").css("display", "block");
    this.userService.giveansforquestion(data).subscribe(
      (success: any) => {
        // if success and error give response
        if (success.status == 200) {
          $("#loaderouterid").css("display", "none");
          Swal.fire({
            position: "center",
            title: "Ihre Antwort wurde erfolgreich gesendet.",
            // showConfirmButton: false,
            // timer: 1500
            iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
            confirmButtonText: "Ok",
            confirmButtonColor: '#02a9ed',
            customClass: {
              icon: 'no-border'
            },
          });
          // localStorage.setItem("currentUser",JSON.stringify(success.result))
          this.documentlist[0] = "";
          this.documentlist[1] = "";
          this.selectedquestion = false;
          this.addquestionformgroup.reset();
          $("#closequestionmodel").trigger("click");

          let message = {
            broker_id: this.queryID,
            case_no: this.lastcase_no,
          };
          this.userService.getchatmessage(message).subscribe(
            (success: any) => {
              console.log(success);
              this.messagelist = success.result;
            },
            (err) => {
              console.log("error11");
              console.log(err);
            },
            () => { }
          );
        } else {
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
  }
  updateKey(event: any) {
    console.log("value" + event);
    if (event == this.localData.website_url) {
      console.log("valuesame" + event);
      this.website_urlupdate = false;
    } else {
      console.log("valuedif" + event);
      this.website_urlupdate = true;
    }
  }
  updatephoneno(event: any) {
    // if(event=="+49"){
    //   this.inputfield="Telefonnummer eingeben";
    // }else{
    //   this.inputfield="Telefonnummer";
    // }
    console.log("value" + event);
    if (event == this.localData.marketingcustomerno) {
      console.log("valuesame" + event);
      this.phonenumupdate = false;
    } else {
      console.log("valuedif" + event);
      this.phonenumupdate = true;
    }
  }
  navigateWithb2bID() {
    console.log(this.selectedUser);

    this.router.navigate(["./cefima/b2b-dashboard"], {
      queryParams: { id: this.selectedUser.id },
    });

    // this.queryID = this.selectedUser.customerno;
    // this.ngOnInit()
  }

  openDialog(): void {
    this.responseobserve.unsubscribe();
    let dialogRef = this.dialog.open(VideoChatComponent, {
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
      console.log("Video chat closed");
      this.responseobserve = this.intervallTimer.subscribe(() =>
        this.get_unread_chat()
      );
    });
  }

  open_modal(modalId: any) {
    $("#" + modalId).appendTo("body");
  }

  close_modal(modal_id: any, append_to: any) {
    $('#' + modal_id).appendTo("#" + append_to);
  }
}
