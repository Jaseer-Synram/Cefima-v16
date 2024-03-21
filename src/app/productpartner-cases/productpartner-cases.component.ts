import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription, interval, of } from "rxjs";
import { first, map, startWith } from "rxjs/operators";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { AuthService } from "../auth.service";
import { UserService } from "../user.service";
import { PagerService } from "../_services";
import * as intlTelInput from "intl-tel-input";
import { VideoChatComponent } from "../video-chat/video-chat.component";
import { MatDialog } from "@angular/material/dialog";
import { EventEmitterService } from "../event-emitter.service";

@Component({
  selector: 'app-productpartner-cases',
  templateUrl: './productpartner-cases.component.html',
  styleUrls: ['./productpartner-cases.component.css']
})
export class ProductpartnerCasesComponent implements OnInit {
  public intervallTimer = interval(1000);
  private responseobserve: Subscription;
  video_chat_data: any = {};
  chatUser: any;

  Specialistform: FormGroup;
  CurrentUser = JSON.parse(localStorage.getItem("currentUser"));
  title = this.userService.getDecodedAccessToken(localStorage.getItem("token"))
    .title;
  loginid = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).id;
  lastname = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).lastname_of_ceo;
  firstname = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).name_of_ceo;
  COMPANYNAME = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).company_name;
  ppid = this.userService.getDecodedAccessToken(localStorage.getItem("token"))
    .ppid;
  caseno: any = [];
  //customerList: any[];
  customerList: any = [];
  pager:
    | {
      totalItems: number;
      currentPage: number;
      pageSize: number;
      totalPages: number;
      startPage: number;
      endPage: number;
      startIndex: number;
      endIndex: number;
      pages: number[];
    }
    | {
      totalItems: number;
      currentPage: number;
      pageSize: number;
      totalPages: number;
      startPage: number;
      endPage: number;
      startIndex: number;
      endIndex: number;
      pages: number;
    };

  pager_specialist:
    | {
      totalItems: number;
      currentPage: number;
      pageSize: number;
      totalPages: number;
      startPage: number;
      endPage: number;
      startIndex: number;
      endIndex: number;
      pages: number[];
    }
    | {
      totalItems: number;
      currentPage: number;
      pageSize: number;
      totalPages: number;
      startPage: number;
      endPage: number;
      startIndex: number;
      endIndex: number;
      pages: number;
    };

  pagedItems: any[];
  pagedItems_specialist: any[];
  startRecord: number;
  startRecord_specialist: number;
  endRecord: number;
  endRecord_specialist: number;
  values: any;
  recordCount: number;
  OfferedDocWithTicket_No: any[] = [];
  assignid: any;
  previewid: any;
  Uploaded_By: any;
  fiorettomediacustomer: any = [];
  SpecialistOptions: Observable<any>;
  OfferdDocUrl: any;
  specialist_id: any;
  urlname: any = "";
  Date_of_upload: any;
  StpperForm: boolean = false;
  selectedcaseno: any = "";
  selectedptid: any = "";
  selectedptname: any = "";
  Producttype_id: any;
  Producttype_name: any;
  Customer_by_name: any;
  ShowButton: boolean = true;

  year: any = new Date().getFullYear();
  userData: any = [];
  customerFormGroup: FormGroup;
  specialistformgroup: FormGroup;
  spartedatanew: any = [];
  producttypesinfonew: any = [];
  pdfarraynew: any = [];
  pdfarraynewurl: any = [];
  producttypelist: any = [];
  typesOptionsArray: any = [];
  oldtypesOptionsArray: any = [];
  currentUserData: any = [];

  unreadcount: any = 0;
  newcaselistnew: any = [];
  caselistnew: any = [];
  lastcase_no: any = "";
  messagelist: any = [];
  alluserdetails: any = [];
  T_N: any = "";
  selectedbroker: any = [];
  ptname: any = "";
  Transaction_Type: any = "";
  selectedppid: any = "";
  ppdata: any = [];
  editsendbutton: any = true;
  specialists: any = [];
  last_transaction_type: any = [];
  active_tab = false;

  hideValues = {
    Unternehmensdaten: {
      Unternehmensdaten: false,
      Vertretungsberechtigte: false
    },
    Anfragen: true,
    Sachbearbeiter: false,
  }

  constructor(
    private authService: AuthService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private pagerService: PagerService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private eventEmitterService: EventEmitterService
  ) {
    this.userService.productPartnerItem.subscribe((data) => {
      let itemString = `${data[0]}`
      let itemChildString = `${data[1]}`
      console.log('itemString', itemString);
      console.log('itemChildString', itemChildString);

      if (itemString != undefined || null || '') {
        for (const key of Object.keys(this.hideValues)) {
          console.log(key);

          if (itemString == 'Unternehmensdaten') {
            if (itemChildString == 'Unternehmensdaten') {
              this.hideValues.Unternehmensdaten.Unternehmensdaten = true
            } else {
              this.hideValues.Unternehmensdaten.Unternehmensdaten = false
            }

            if (itemChildString == 'Vertretungsberechtigte') {
              this.hideValues.Unternehmensdaten.Vertretungsberechtigte = true
            } else {
              this.hideValues.Unternehmensdaten.Vertretungsberechtigte = false
            }

            this.hideValues.Anfragen = false;
            this.hideValues.Sachbearbeiter = false

          } else {
            if (key != 'Unternehmensdaten') {
              this.hideValues.Unternehmensdaten.Vertretungsberechtigte = false
              this.hideValues.Unternehmensdaten.Unternehmensdaten = false
              if (key == itemString) {
                this.hideValues[key] = true
              } else {
                this.hideValues[key] = false
              }
            }
          }
        }
      }
      console.log(this.hideValues);
    })
  }

  _filterKundeoption(value: any): string[] {
    console.log("kundenewqwewqe" + this.fiorettomediacustomer);
    console.log("kundenewqwewqe" + JSON.stringify(typeof value.b2b_list));
    if (typeof value.b2b_list == "object") {
      const filterValue = value.b2b_list.name.toLowerCase();
      console.log("kundenewqwewqe" + filterValue);
      return this.fiorettomediacustomer.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      );
    } else {
      const filterValue = value.b2b_list.toLowerCase();
      console.log("kundenewqwewqe" + filterValue);
      return this.fiorettomediacustomer.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      );
    }
  }

  LoopinSpecialist(userData: string | any[]) {
    let brokerList = [];
    console.log("kundenew" + JSON.stringify(userData));
    for (let i = 0; i < userData.length; i++) {
      console.log(userData[i].ProductPartnerID, this.ppid);
      if (userData[i].ProductPartnerID == this.ppid) {
        brokerList.push({
          name:
            userData[i].firstName +
            " " +
            userData[i].lastName +
            " (" +
            userData[i].email +
            ")",
          id: userData[i]._id,
        });
      }
    }

    return brokerList;
  }

  checkdata(event) {
    console.log("dsfds" + event.target.value);
    if (event.target.value == "") {
      this.ShowButton = true;
    }
  }

  onKey_specialist(event: any) {
    this.values = event.target.value;
    var value = event.keyCode;
    if (this.values != "") {
      if (value == "13") {
        let temp_specialists = [];

        for (let i = 0; i < this.specialists.length; i++) {
          if (
            this.specialists[i].title
              .toLowerCase()
              .indexOf(this.values.toLowerCase()) != -1 ||
            this.specialists[i].firstName
              .toLowerCase()
              .indexOf(this.values.toLowerCase()) != -1 ||
            this.specialists[i].lastName
              .toLowerCase()
              .indexOf(this.values.toLowerCase()) != -1 ||
            this.specialists[i].sparte
              .toLowerCase()
              .indexOf(this.values.toLowerCase()) != -1 ||
            this.specialists[i].department
              .toLowerCase()
              .indexOf(this.values.toLowerCase()) != -1
          ) {
            temp_specialists.push(this.specialists[i]);
          }
        }

        this.pager_specialist = this.pagerService.getPager(
          temp_specialists.length,
          1
        );
        this.pagedItems_specialist = temp_specialists.slice(
          this.pager_specialist.startIndex,
          this.pager_specialist.endIndex + 1
        );

        if (temp_specialists.length > 0) {
          this.startRecord_specialist =
            this.pager_specialist.currentPage *
            this.pagerService.getDefaultPageSize() -
            this.pagerService.getDefaultPageSize() +
            1;
          this.endRecord_specialist =
            this.pager_specialist.currentPage *
              this.pagerService.getDefaultPageSize() >
              temp_specialists.length
              ? temp_specialists.length
              : this.pager_specialist.currentPage *
              this.pagerService.getDefaultPageSize();
        } else {
          this.startRecord_specialist = 0;
          this.endRecord_specialist = 0;
        }
      }
    } else {
      this.specialist_list();
    }
  }

  specialist_list() {
    this.userService
      .GetSpecialist_listnew(this.CurrentUser)
      .subscribe((success: any) => {
        this.specialists = success;
        console.log("brought specialists");
        console.log(this.specialists);

        this.setPage_specialist(1);
      });
  }

  ngOnInit() {
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

    this.responseobserve = this.intervallTimer.subscribe(() =>
      this.get_unread_chat()
    );

    this.specialist_list();

    //this.urlname=this.router.url;
    let searchtext = "";
    this.Specialistform = this._formBuilder.group({
      b2b_list: ["", Validators.required],
    });

    this.customerFormGroup = this._formBuilder.group({
      company_name: [""],

      name_of_ceo: [""],
      lastname_of_ceo: [""],

      art: [""],
      street: [""],
      streetNumber: [""],
      postCode: [""],
      city: [""],
      countryOfResidence: [""],
      title: [""],
      picimage: [""],
      picpdf: [""],
      secondstep: this._formBuilder.array([]),
    });

    this.specialistformgroup = this._formBuilder.group({
      specialist_id: ["", Validators.required],
      title: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      sparte: ["", Validators.required],
      department: ["", Validators.required],
      position: ["", Validators.required],
    });

    this.SpecialistOptions = this.Specialistform.valueChanges.pipe(
      startWith(""),

      map(
        (name) =>
          // {
          // console.log("sdfsfsfs"+JSON.stringify(name))
          name
            ? this._filterKundeoption(name)
            : this.fiorettomediacustomer.slice()
        // }
      )
    );

    console.log("check curent");
    console.log(this.CurrentUser);

    this.userService
      .getalldocumentbyeployeeidnew(
        searchtext,
        "42140 DFG Finanzprofi GmbH",
        "40-ce-129"
      )
      .subscribe((success: any) => {
        for (let i = 0; i < success.length; i++) {
          if (success[i].document_sub_type == "Power of attorney") {
            this.OfferdDocUrl = success[i].document_url;
          }
        }
      });

    // this.userService
    //   .GetSpecialist_list(this.CurrentUser)
    //   .subscribe((success: any) => {
    //     $("#loaderouterid").css("display", "none");

    //     this.fiorettomediacustomer = this.LoopinSpecialist(success);
    //     console.log(success);
    //   });
    console.log("successsadfadad" + JSON.stringify(this.CurrentUser));
    this.userService
      .GetSpecialist_listnew(this.CurrentUser)
      .subscribe((success: any) => {
        $("#loaderouterid").css("display", "none");

        this.fiorettomediacustomer = this.LoopinSpecialist(success);
        console.log(this.fiorettomediacustomer);
      });
    this.getalldocument();
    this.getproductpartner();
  }
  onSubmit() {
    if (this.values != "") {
      this.getalldocument();
      this.customerList = [];
      this.setPage(1);
      this.recordCount = 0;
    }
  }

  onKey(event: any) {
    let count: any;
    this.values = event.target.value;
    var value = event.keyCode;
    console.log("value hai" + this.values);
    if (this.values != "") {
      // this.getalldocument();
      if (value == "13") {
        this.getalldocument();
        // this.customerList = [];
        // this.setPage(1);
        this.recordCount = 0;
      }
    } else {
      this.getalldocument();
      // this.customerList = [];
      // this.setPage(1);
      this.recordCount = 0;
    }
  }
  OpenStpper() {
    console.log("ddddddddddd");
    this.StpperForm = true;
  }

  PatchSpecialistVaalue() {
    if (this.Specialistform.controls.b2b_list.value.id != "") {
      this.ShowButton = false;
    } else {
      this.ShowButton = true;
    }
    this.specialist_id = this.Specialistform.controls.b2b_list.value.id;
    console.log(this.Specialistform.controls.b2b_list.value.name);
    this.Specialistform.patchValue({
      b2b_list: this.Specialistform.controls.b2b_list.value.name,
    });
  }
  editRecord(id, accordianId, cl) {
    accordianId = "collapse";

    console.log(id, accordianId, cl);
    event.preventDefault();
    let element1: HTMLElement = document.getElementById(
      "ul" + id
    ) as HTMLElement;
    let element1new: HTMLElement = document.getElementById(
      "cardbodyid"
    ) as HTMLElement;
    let element: HTMLElement = document.getElementById(
      "click3" + id
    ) as HTMLElement;
    let accordian: HTMLElement = document.getElementById(accordianId);
    console.log("element1new" + element.innerHTML);
    console.log("element" + element);
    console.log("else accordian1", accordian);
    if (element.innerHTML == "Schließen") {
      element1new.after(accordian);
      accordian.classList.add("collapse");
      this.OfferedDocWithTicket_No = [];
      accordian.classList.remove("collapse-show");
      element.innerHTML = "Öffnen";
    } else {
      // if (this.id != "") {
      //   let elementnew1: HTMLElement = document.getElementById(
      //     "click3" + this.id
      //   ) as HTMLElement;
      //   if (elementnew1) {
      //     console.log("elementelse", elementnew1);
      //     elementnew1.innerHTML = "Öffnen";
      //   }
      // }
      console.log("else accordian", accordian);
      console.log("else element", element1);
      element1.after(accordian);
      accordian.classList.remove("collapse");
      accordian.classList.add("collapse-show");
      element.innerHTML = "Schließen";
      //this.id = id;
      this.getcurrentUser(cl);
    }
  }

  createspectiality(ticket_no, ppid, ptid, ptname) {
    this.selectedcaseno = ticket_no;
    this.selectedptid = ptid;
    this.selectedptname = ptname;
    $("#opencreatespecialist").trigger("click");
  }

  addStpperForm(value) {
    this.StpperForm = value;
  }
  addnewspecialistadded(value) {
    console.log("safsadffsfafaf" + JSON.stringify(value));
    this.fiorettomediacustomer.push({
      name: value.firstName + " " + value.lastName + " (" + value.email + ")",
      id: value._id,
    });
  }
  addspecialisttocaseno() {
    this.userService
      .geteditpartner(this.CurrentUser.ppid)
      .subscribe((poductpartnerdata: any) => {
        console.log("asfadsadsadada" + poductpartnerdata);
        let checkagentnumber = poductpartnerdata.spartedata.find(
          (o) => o.sparte == "Gewerbesach"
        );
        let agent_number = "";
        if (checkagentnumber != undefined) {
          agent_number = checkagentnumber.agent_number;
        }

        $("#loaderouterid").css("display", "block");
        $("#loaderouterid").css("z-index", "100000");
        console.log("casenosdfdsfdsfdsf" + this.selectedcaseno);
        console.log("casenosdfdsfdsfdsf" + this.selectedptid);
        console.log("casenosdfdsfdsfdsf" + this.specialist_id);
        let data = {
          assigncaseno: [
            { case_no: this.selectedcaseno, ptid: this.selectedptid },
          ],
          id: this.specialist_id,
          agent_number: agent_number,
          ProductPartnername: poductpartnerdata.company_name,
          selectedptname: this.selectedptname,
          addingpersonname:
            this.CurrentUser.title +
            " " +
            this.CurrentUser.name_of_ceo +
            " " +
            this.CurrentUser.lastname_of_ceo,
        };
        this.userService.assigncaseno(data).subscribe((success: any) => {
          if (success.status == "200") {
            $("#loaderouterid").css("display", "none");
            $("#loaderouterid").css("z-index", "999");
            Swal.fire({
              title: `Kontaktperson wurde für diesen Vorgang Nr.: ${this.selectedcaseno} & Produkttyp: ${this.selectedptname} erfolgreich zugewiesen`,
              showConfirmButton: false,
              allowOutsideClick: false,
              icon: "success",
              html: `<div style="width:100%">
          <button id="buttonFour" type="button" style="background: #184397" class="btn btn-primary">Ok</button>
          </div>`,
            }).then((result) => {
              console.log(result);
              if (result["isDismissed"]) {
                // this.logout();
              } else {
                // this.CloseFormDiv();
              }
            });
            const ButtonFour = document.getElementById("buttonFour");

            ButtonFour.addEventListener(
              "click",
              function () {
                removepreview1("four");
              },
              false
            );
            const removepreview1 = (e) => {
              if (e == "four") {
                this.closepopup();

                Swal.close();
              }
            };
          } else {
            Swal.fire(
              "Ihr ausgewählter Ansprechpartner mit Vorgang Nr.: " +
              this.selectedcaseno +
              " & Produkttyp " +
              this.selectedptname +
              " wurde bereits hinzugefügt",
              "",
              "error"
            );
            $("#loaderouterid").css("display", "none");
            $("#loaderouterid").css("z-index", "999");
          }
          console.log("dsjgfgjdsfhkjdsfhdsf" + success);
        });
      });
  }
  closepopup() {
    // $('#resetform').trigger('click');
    this.Specialistform.patchValue({
      b2b_list: "",
    });

    // this.addStpperForm(false)
    $("#closecreatespecialist").trigger("click");
  }
  getcurrentUser(T_N) {
    this.userService
      .GetDocByInsurancenew(T_N, this.ppid)
      .subscribe((success: any) => {
        console.log(success);
        for (let i = 0; i < success.length; i++) {
          if (success[i].element.document_type == "Angebot bekommen") {
            let obj = {
              URL: this.OfferdDocUrl,
            };
            let Final = Object.assign(obj, success[i]);

            this.OfferedDocWithTicket_No.push(Final);
          }
        }
        console.log(
          "sdgfdjsgfjdshfkdshfdsf" +
          JSON.stringify(this.OfferedDocWithTicket_No)
        );
      });
  }

  getalldocument() {
    // this.userService
    //   .GetSingleDocument(this.CurrentUser.caseno)
    //   .subscribe((success: any) => {
    //     $("#loaderouterid").css("display", "none");
    //     console.log("success" + success);
    //     if (this.values)
    //     {
    //       console.log("value hai");
    //       success.forEach((data: any, i: number) => {
    //         if (
    //           data.Activity_No.toLowerCase() == this.values.toLowerCase() ||
    //           data.Transaction_Type.toLowerCase() ==
    //             this.values.toLowerCase() ||
    //           data.Uploaded_By.toLowerCase() == this.values.toLowerCase() ||
    //           data.companyname.toLowerCase() == this.values.toLowerCase()
    //         ) {
    //           this.customerList = [success[i]];
    //           this.setPage(1);
    //         }
    //       });
    //     }
    //     else
    //     {
    //       this.customerList = success;
    //       this.Uploaded_By = success[0].Uploaded_By;
    //       this.setPage(1);
    //     }
    //   });
    // console.log("value hai"+this.values);
    this.userService
      .getlistbyproductpartner({ bodypp: this.ppid })
      .subscribe((result: any) => {
        let success = [];
        let success2: any = [];
        result.forEach((data: any, i: number) => {
          if (
            success.find(
              (o) => o.Activity_No == data.documentdatanew[0].ticket_no
            ) == undefined
          ) {
            if (data.casedata.length > 0) {
              success.push(data.casedata[0]);
              success2.push({ case_no: data.casedata[0].Activity_No });
            }
          }
        });

        console.log("getall documents called");
        console.log(success);
        console.log(success2);
        console.log("above given success 2");

        this.userService
          .GetSingleDocumentbycaseno(success2)
          .subscribe((success3: any) => {
            $("#loaderouterid").css("display", "none");
            this.caselistnew = success3;

            console.log("success3 came");
            console.log(success3);

            this.caselistnew.forEach((element) => {
              let caseno = element.Activity_No;

              let checkcase = result.filter((o) => {
                if (o.casedata.length > 0) {
                  return o.casedata[0].Activity_No == caseno;
                }
              });

              if (checkcase.length > 0) {
                checkcase.forEach((o) => {
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
                    ppname: o.productpartnersinfo[0].company_name.toUpperCase(),
                    //usercompanyname: o.usersinfo[0].companyname.toUpperCase(),
                  };

                  this.newcaselistnew.push(newdata);
                });
              }
            });
            console.log("sdfdsfdsfdsf" + JSON.stringify(this.newcaselistnew));
          });

        console.log("value haifdgdgdfgfdgdgdfgd" + success);
        if (this.values) {
          let newarray = [];
          console.log("value hai" + this.values);
          success.forEach((data: any, i11: number) => {
            if (
              data.Activity_No.toLowerCase().includes(
                this.values.toLowerCase()
              ) ||
              data.Transaction_Type.toLowerCase().includes(
                this.values.toLowerCase()
              ) ||
              data.Uploaded_By.toLowerCase().includes(
                this.values.toLowerCase()
              ) ||
              data.companyname.toLowerCase().includes(this.values.toLowerCase())
            ) {
              console.log("value hai" + JSON.stringify(success[i11]));
              newarray.push(success[i11]);
            }
          });
          this.customerList = newarray;
          this.setPage(1);
        } else {
          this.customerList = success;
          if (this.customerList.length > 0) {
            this.Uploaded_By = success[0].Uploaded_By;
          }
          this.setPage(1);
        }

        //   this.customerList = casearray;
        //         this.setPage(1);
        // console.log("sdfdsfdfsdsfdsfdsf"+JSON.stringify(casearray));
        // console.log("sdfdsfdfsdsfdsfdsf"+JSON.stringify(result));
      });
  }

  previewOffer(
    url?,
    tags?,
    imagename?,
    companycode?,
    brand?,
    document_name?,
    date_of_uploadnew?,
    id?,
    created_byname?,
    index?,
    document_sub_type?,
    ticket_no?
  ) {
    this.assignid = id;
    this.previewid = id;

    this.userService
      .assigncasenoforproductpartnerlogin({
        id: this.CurrentUser._id,
        case_no: ticket_no,
      })
      .subscribe((result) => {
        this.router.navigate(["./productpartner-chat/"], {
          queryParams: { urlptid: document_sub_type, case_no: ticket_no },
        });
      });

    // this.Date_of_upload = date_of_uploadnew;
    // this.Producttype_id = id;
    // this.Producttype_name = document_sub_type;
    // this.Customer_by_name = created_byname;
    // let element: HTMLElement = document.getElementById(
    //   "click1" + this.previewid
    // ) as HTMLElement;
    // if (element.innerHTML == "Schließen") {
    //   element.innerHTML = "öffnen";

    //   $("#preview" + id).html("");
    //   $("#employeeassign" + id).css("display", "none");
    // } else {
    //   $(".openclass").html("öffnen");

    //   element.innerHTML = "Schließen";
    //   $(".previewclass").html("");
    // }

    // if (element.innerHTML == "Schließen") {
    //   const removepreview = () => {
    //     let elementnew: HTMLElement = document.getElementById(
    //       "click1" + this.previewid
    //     ) as HTMLElement;
    //     elementnew.innerHTML = "öffnen";

    //     $("#preview" + id).html("");
    //     $("#employeeassign" + id).css("display", "none");
    //     console.log("sadasda");
    //   };

    //   const result1 = this.getFileExtension(imagename);
    //   let metadata = tags[0].split(",");
    //   var d = new Date(date_of_uploadnew).toLocaleDateString("en-IN", {
    //     day: "2-digit",
    //     month: "2-digit",
    //     year: "numeric",
    //   });
    //   var date_of_upload = d.replace(/[/]/g, ".");
    //   if (typeof metadata[2] != "undefined") {
    //     let dateofdocument = Number(metadata[2]);
    //     var date = new Date(dateofdocument).toLocaleDateString("en-IN", {
    //       day: "2-digit",
    //       month: "2-digit",
    //       year: "numeric",
    //     });

    //     var date_of_document = date.replace(/[/]/g, ".");
    //   } else {
    //     var date_of_document = "";
    //   }
    //   var filetype = "";
    //   if (typeof metadata[1] != "undefined") {
    //     filetype = metadata[1];
    //   } else {
    //     filetype = "";
    //   }

    //   if (
    //     result1 == "pdf" ||
    //     result1 == "pdfx" ||
    //     result1 == "txt" ||
    //     result1 == "TXT"
    //   ) {
    //     $("#employeeassign" + id).css("display", "block");
    //     $("#preview" + id).html(
    //       '<div style="background: #fff;padding: 33px;border:1px solid;    margin-bottom: 15px;"><div class="col-md-6"  style="display: inline-block;    vertical-align: top;"><div class="line-heights"><h3>Dokumentenname: ' +
    //         document_name +
    //         "</h3><h3>Dateigröße: " +
    //         metadata[0] +
    //         " Kb</h3><h3>Vorgangs Nr.: " +
    //         ticket_no +
    //         "</h3><h3>Datum des Dokuments: " +
    //         date_of_document +
    //         "</h3><h3>Datum des Uploads: " +
    //         date_of_upload +
    //         "</h3><h3>Hochgeladen von: " +
    //         this.Uploaded_By +
    //         "</h3><h3>Dateityp: " +
    //         filetype +
    //         "</h3><h3>Stichworte: " +
    //         companycode +
    //         "," +
    //         brand +
    //         "," +
    //         ticket_no +
    //         '</h3></div><div class="col-md-12"> </div></div><div class="col-md-6" style="display: inline-block;"><span class="side-icons"><i class="fa fa-times" aria-hidden="true" style="position:relative;float:right;" aria-hidden="true"  id="previewimg" ></i></span><embed  type="' +
    //         filetype +
    //         '" src="' +
    //         url +
    //         '" style=" width: 100%; height:1200px;object-fit: cover; "/><a href="' +
    //         environment.API_URL +
    //         "document/downloaddocument/" +
    //         imagename +
    //         '" ><span class="side-icons" ><i class="fa fa-download" style="position:relative;float:right;" aria-hidden="true"  ></i></span></a></div> </div>'
    //     );
    //   } else {
    //     $("#employeeassign" + id).css("display", "block");

    //     $("#preview" + id).html(
    //       '<div style="background:#fff;padding: 33px;border:1px solid;    margin-bottom: 15px;"><div class="col-md-6"  style="display: inline-block;    vertical-align: top;"><div class="line-heights"><h3>Dokumentenname: ' +
    //         document_name +
    //         "</h3><h3>Dateigröße: " +
    //         metadata[0] +
    //         " Kb</h3><h3>Vorgangs Nr.: " +
    //         ticket_no +
    //         "</h3><h3>Datum des Dokuments: " +
    //         date_of_document +
    //         "</h3><h3>Datum des Uploads: " +
    //         date_of_upload +
    //         "</h3><h3>Hochgeladen von: " +
    //         this.Uploaded_By +
    //         "</h3><h3><h3>Dateityp: " +
    //         filetype +
    //         "</h3><h3>Stichworte: " +
    //         companycode +
    //         "," +
    //         brand +
    //         "," +
    //         ticket_no +
    //         '</h3></div></div><div class="col-md-6" style="display: inline-block;"><span class="side-icons"><i class="fa fa-times" aria-hidden="true" id="previewimg" style="position:relative;float:right;" aria-hidden="true"  ></i></span><embed  src="' +
    //         url +
    //         '" style="width: 100%;height:1200px;object-fit: cover; "><a href="' +
    //         environment.API_URL +
    //         "document/downloaddocument/" +
    //         imagename +
    //         '" ><span class="side-icons" ><i class="fa fa-download" style="position:relative;float:right;" aria-hidden="true"  ></i></span></a></div> </div>'
    //     );
    //   }

    //   const someInput = document.getElementById("previewimg");
    //   someInput.addEventListener(
    //     "click",
    //     function () {
    //       removepreview();
    //     },
    //     false
    //   );

    //   // $('#loaderouterid').css("display","none");
    // }
  }

  getFileExtension(filename) {
    // get file extension
    const extension =
      filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
      filename;
    return extension;
  }

  onchangedata() {
    this.customerList = [];
    this.setPage(1);
    this.recordCount = 0;
    this.getalldocument();
  }

  assign() {
    // $("#employeeformid")[0].reset();
    $("#loaderouterid").css("display", "block");
    console.log(this.assignid);
    console.log("specialist_id" + this.specialist_id);
    let projectdatanew = {
      Specialist_id: this.specialist_id,
      Customer_By_name: this.Uploaded_By,
      uploaddate: this.Date_of_upload,
      Producttype_id: this.Producttype_id,
      caseno: this.CurrentUser.caseno,
      Producttype_name: this.Producttype_name,
      Assign_id: this.CurrentUser._id,
    };
    this.userService
      .SpecialistCase(projectdatanew)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          Swal.fire("Spezialistin erfolgreich zugewiesen", "", "success");
          // this.ticket_no = "";

          $("#loaderouterid").css("display", "none");
          $("#employeeassign" + this.assignid).css("display", "none");
          $("#preview" + this.assignid).html("");
          let element: HTMLElement = document.getElementById(
            "click" + this.previewid
          ) as HTMLElement;
          element.innerHTML = "Öffnen";
          setTimeout(() => {
            Swal.close();
            this.onchangedata();
          }, 1000);
        },
        (error) => {
          console.log("Error", error);
          $("#loaderouterid").css("display", "none");
        }
      );
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["./"]);
  }
  //Checking token Authentication
  isLoggedIn() {
    this.router.navigate(["./product-partner-cases"]);
  }

  setPage_specialist(page: number) {
    // get pager object from service

    this.pager_specialist = this.pagerService.getPager(
      this.specialists.length,
      page
    );
    // get current page of items
    this.pagedItems_specialist = this.specialists.slice(
      this.pager_specialist.startIndex,
      this.pager_specialist.endIndex + 1
    );

    if (this.specialists.length > 0) {
      this.startRecord_specialist =
        this.pager_specialist.currentPage *
        this.pagerService.getDefaultPageSize() -
        this.pagerService.getDefaultPageSize() +
        1;
      this.endRecord_specialist =
        this.pager_specialist.currentPage *
          this.pagerService.getDefaultPageSize() >
          this.specialists.length
          ? this.specialists.length
          : this.pager_specialist.currentPage *
          this.pagerService.getDefaultPageSize();
    } else {
      this.startRecord_specialist = 0;
      this.endRecord_specialist = 0;
    }
  }

  setPage(page: number) {
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

  getproductpartner() {
    let data = {
      id: this.ppid,
    };

    console.log("parameter id");
    console.log(data);

    this.userService
      .getproductpartnerwithlogindetails(data)
      .pipe(first())
      .subscribe((data: any) => {
        this.caseno = data[0]?.logininfo[0]?.caseno;
        console.log("see case");
        console.log(this.caseno);

        this.ppdata = data[0];

        let success2: any = [];

        success2.push({ case_no: this.caseno });

        this.userService
          .GetSingleDocumentbycaseno(success2)
          .subscribe((success3: any) => {
            console.log("brought case details");
            console.log(success3);

            var newdata = {
              employ_ids: success3[0]?.employ_ids,
              _id: success3[0]?._id,
              Activity_No: success3[0]?.Activity_No,
              Transaction_Type: success3[0]?.Transaction_Type,
              Uploaded_By: success3[0]?.Uploaded_By,
              Proces_Date: success3[0]?.Proces_Date,
              companyname: success3[0]?.companyname,
              //ptid: o.producttypesinfo[0]._id,
              ppid: this.ppid,
              // ptname: o.producttypesinfo[0].product_typename,
              ppname: data[0]?.company_name?.toUpperCase(),
              usercompanyname: data[0]?.company_name?.toUpperCase(),
            };

            this.newcaselistnew.push(newdata);

            this.activatedRoute.queryParams.subscribe((params) => {
              if (params["case_no"]) {
                console.log("in construct");
                console.log(this.newcaselistnew);

                this.lastcase_no = params["case_no"];
                this.active_tab = true;
                for (let i = 0; i < this.newcaselistnew.length; i++) {
                  console.log("inside loop constructor");
                  if (this.newcaselistnew[i].Activity_No == this.lastcase_no) {
                    this.CurrentChat_productpartner(this.newcaselistnew[i], i);
                    this.chatUser = this.newcaselistnew[i];
                    console.log("check data");
                    console.log(this.newcaselistnew[i]);
                    console.log(i);
                    break;
                  }
                }
              }
            });
          });
      });

    this.typesOptionsArray = [];
    this.oldtypesOptionsArray = [];
    this.spartedatanew = [];

    this.producttypelist = [];
    this.producttypesinfonew = [];

    const that = this;
    this.userService.getEditpartner(this.ppid).subscribe(function (data1) {
      that.currentUserData = data1;
      console.log("data fetched");
      console.log(that.currentUserData);
      setData(data1);
    });

    function setData(data1) {
      that.userData = data1;

      that.customerFormGroup.patchValue({
        company_name: data1.company_name,
        title: data1.title,
        name_of_ceo: data1.name_of_ceo,
        lastname_of_ceo: data1.lastname_of_ceo,
        art: data1.art,
        street: data1.street,
        streetNumber: data1.streetNumber,
        postCode: data1.postCode,
        city: data1.city,
        countryOfResidence: data1.countryOfResidence,
        // product_type: "",
      });

      that.spartedatanew = data1.spartedata;
      that.producttypesinfonew = data1.producttypesinfo;

      var theDate = new Date(data1.registered_time * 1000);
      var d111 = theDate.toUTCString();
      //var documentlistnew = [];
      var tagarray = ["1510,application/pdf," + data1.registered_time];

      let dataname: any[] = data1.pdf?.split(".");
      console.log(dataname, ':', data1.pdf);

      if (!dataname) {
        dataname = ['']
      }
      var data;

      console.log();
      if (data1.documentlist?.length > 0) {
        data = [
          {
            document_name: "Vermittlervertrag",
            size: "1510",
            tags: tagarray,
            document_unique_id: data1.pdf,
            companycode: "42140 DFG Finanzprofi GmbH",
            brand: "cefima",
            createdAt: d111,
            _id: dataname[0],
            ticket_no: data1.documentlist[0][0].ticket_no,
          },
        ];

        //data1.documentlist.push(data);
      } else {
        data = [
          {
            document_name: "Vermittlervertrag",
            size: "1510",
            tags: tagarray,
            document_unique_id: data1.pdf,
            companycode: "42140 DFG Finanzprofi GmbH",
            brand: "cefima",
            createdAt: d111,
            _id: dataname[0],
            ticket_no: "40-ce-1",
          },
        ];
      }

      data1?.documentlist?.push(data);

      let newi;

      for (let i = 0; i < data1?.documentlist?.length; i++) {
        console.log("forloop");
        let date_of_uploadnew = data1?.documentlist[i][0].createdAt;
        console.log("forloop" + data1?.documentlist[i][0].tags[0]);
        let metadata = data1?.documentlist[i][0].tags[0].split(",");
        console.log("forloop" + metadata[2]);
        // var d = new Date(date_of_uploadnew);
        // var date_of_upload =
        //   d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
        var d = new Date(date_of_uploadnew).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        var date_of_upload = d.replace(/[/]/g, ".");
        if (data1?.documentlist[i][0]?.document_name == "Vermittlervertrag") {
          var d = new Date(date_of_uploadnew)?.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          var date_of_document = d.replace(/[/]/g, ".");
          data1.documentlist[i][0].document_url = data1?.pdfurl;
          data1.documentlist[i][0].created_byname =
            that.title + " " + that.firstname + " " + that.lastname;
        } else {
          if (typeof metadata[2] != "undefined") {
            let dateofdocument = Number(metadata[2]);
            var date = new Date(dateofdocument)?.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            var date_of_document = date?.replace(/[/]/g, ".");
          } else {
            var date_of_document = "";
          }
        }

        var filetype = "";
        if (typeof metadata[1] != "undefined") {
          filetype = metadata[1];
        } else {
          filetype = "";
        }
        data1.documentlist[i][0].size =
          metadata[0] > 1024
            ? metadata[0].charAt(0) + "MB"
            : metadata[0] + "KB";
        data1.documentlist[i][0].filetype = filetype;
        data1.documentlist[i][0].date_of_document = date_of_document;
        data1.documentlist[i][0].date_of_upload = date_of_upload;

        // documentlistnew.push(data1.documentlist);

        newi = i;
      }

      if (data1.url != "" && data1.url != " ") {
        $("#logopreview").css("display", "block");
      } else {
        $("#logopreview").css("display", "none");
      }

      $("#logopreview").html(
        "<a href='" +
        data1.url +
        "' target='_blank'><img src='" +
        data1.url +
        "' style='width:100%;    height: 200px;   object-fit: contain;'></a>"
      );

      var pdflink =
        "<a href='" +
        data1.pdfurl +
        "' target='_blank'><embed  type='application/pdf' src='" +
        data1.pdfurl +
        "' style=' width: 100%; height:300px;object-fit: cover; '/></a>";
      $("#previewpdf").html(pdflink);

      if (data1.pdfurl != "" && data1.pdfurl != " ") {
        that.pdfarraynew = data1.documentlist;
      }

      //that.pdfarraynew = data1.documentlist;

      data1?.pdfarray?.push(data1?.pdfurl);
      that.pdfarraynewurl = data1?.pdfarray;

      for (var k = 0; k < that.spartedatanew?.length; k++) {
        that.quantities().push(that.newQuantity());
        that.typesOptionsArray?.push([]);
        that.producttypelist?.push([]);

        let pparray = [];
        for (var m = 0; m < that.spartedatanew[k]?.product_type?.length; m++) {
          let check = that.producttypesinfonew.find(
            (result) => that.spartedatanew[k]?.product_type[m] == result?._id
          );
          if (check) {
            pparray?.push({ id: check._id, value: check.product_typename });
          }
        }
        that.oldtypesOptionsArray?.push(pparray);
        that.callspartedata(that.spartedatanew[k]?.sparte, k);
      }

      let length = that.spartedatanew?.length + 1;
      console.log("before setting telephone");
      console.log(that.spartedatanew);
      console.log(length);

      setTimeout(() => {
        for (let i = 0; i < length; i++) {
          // intlTelInput(document.querySelector("#brokerage_telefon"+i), {
          //   initialCountry: "de",
          //   geoIpLookup: function (callback) {
          //     $.get("http://ipinfo.io", function () {}, "jsonp").always(function (
          //       resp
          //     ) {
          //       var countryCode = resp && resp.country ? resp.country : "de";
          //       callback(countryCode);
          //       console.log("countryCode" + countryCode);
          //     });
          //   },
          // });

          // intlTelInput(document.querySelector("#brokeradvisor_telefon"+i), {
          //   initialCountry: "de",
          //   geoIpLookup: function (callback) {
          //     $.get("http://ipinfo.io", function () {}, "jsonp").always(function (
          //       resp
          //     ) {
          //       var countryCode = resp && resp.country ? resp.country : "de";
          //       callback(countryCode);
          //       console.log("countryCode" + countryCode);
          //     });
          //   },
          // });

          // intlTelInput(document.querySelector("#contract_department_telefon"+i), {
          //   initialCountry: "de",
          //   geoIpLookup: function (callback) {
          //     $.get("http://ipinfo.io", function () {}, "jsonp").always(function (
          //       resp
          //     ) {
          //       var countryCode = resp && resp.country ? resp.country : "de";
          //       callback(countryCode);
          //       console.log("countryCode" + countryCode);
          //     });
          //   },
          // });

          // intlTelInput(document.querySelector("#damage_department_telefon"+i), {
          //   initialCountry: "de",
          //   geoIpLookup: function (callback) {
          //     $.get("http://ipinfo.io", function () {}, "jsonp").always(function (
          //       resp
          //     ) {
          //       var countryCode = resp && resp.country ? resp.country : "de";
          //       callback(countryCode);
          //       console.log("countryCode" + countryCode);
          //     });
          //   },
          // });

          intlTelInput(document.querySelector("#brokerage_telefon" + i), {});

          intlTelInput(
            document.querySelector("#brokeradvisor_telefon" + i),
            {}
          );

          intlTelInput(
            document.querySelector("#contract_department_telefon" + i),
            {}
          );

          intlTelInput(
            document.querySelector("#damage_department_telefon" + i),
            {}
          );
        }
      }, 500);
    }
  }

  callspartedata(sparte, i) {
    if (this.producttypelist[i]?.length > 0) {
    } else {
      this.userService
        .getproducttypelistbysparte(sparte)
        .subscribe((result: any) => {
          this.producttypelist[i] = result.result;
        });
    }
  }

  quantities(): FormArray {
    return this.customerFormGroup.get("secondstep") as FormArray;
  }

  newQuantity(): FormGroup {
    return this._formBuilder.group({
      sparte: [""],
      agent_number: [""],
      product_type: [""],
      brokerage_name: [""],
      brokerage_address: [""],
      brokerage_email: [""],
      brokerage_streetNumber: [""],
      brokerage_postCode: [""],
      brokerage_city: [""],
      brokerage_countryOfResidence: [""],
      brokerage_telefon: [""],
      brokeradvisor_title: [""],
      brokeradvisor_firstname: [""],
      brokeradvisor_lastname: [""],
      brokeradvisor_email: [""],
      brokeradvisor_telefon: [""],
      contract_department_email: [""],
      contract_department_telefon: [""],
      damage_department_email: [""],
      damage_department_telefon: [""],
    });
  }

  previewnew(
    url?,
    tags?,
    imagename?,
    companycode?,
    brand?,
    document_name?,
    date_of_uploadnew?,
    id?,
    created_byname?,
    ticket_no?,
    index?
  ) {
    url = this.pdfarraynewurl[index];
    console.log();
    this.previewid = id;
    let finalName = document_name == "blob" ? "Maklervollmacht" : document_name;
    console.log(id);
    let elementpreview: HTMLElement = document.getElementById(
      "clickpreview" + this.previewid
    ) as HTMLElement;

    if (elementpreview.innerHTML == "Schließen") {
      elementpreview.innerHTML = "Öffnen";
      $("#preview" + id).html("");
    } else {
      $(".openclasspreview").html("Öffnen");
      elementpreview.innerHTML = "Schließen";
      $(".previewclass").html("");
    }

    if (elementpreview.innerHTML == "Schließen") {
      console.log("tags" + JSON.stringify(tags));
      const removepreview = () => {
        let elementnewpreview: HTMLElement = document.getElementById(
          "clickpreview" + this.previewid
        ) as HTMLElement;
        elementnewpreview.innerHTML = "Öffnen";
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

      if (document_name == "Vermittlervertrag") {
        var d = new Date(date_of_uploadnew).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        var date_of_document = d.replace(/[/]/g, ".");
      } else {
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
      }

      var filetype = "";
      if (typeof metadata[1] != "undefined") {
        filetype = metadata[1];
      } else {
        filetype = "";
      }

      $("#preview" + id).html(
        '<div style="border-radius:10px;background:white;padding: 4px 8px 4px;border:1px solid;margin-bottom: 15px;"><div class="col-md-4"  style="display: inline-block;vertical-align: top;"><div class="line-heights">' +
        '<div class="row" style="margin-top:36px;cursor: pointer;background-color: rgb(181, 172, 172);color: black;padding-top: 10px;padding-bottom: 5px;border-radius: 10px;"><div class="col-md-11" >' +
        "1." +
        document_name +
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
        //"," +
        "&nbsp;" +
        '<span style="background-color: #184195;color: white;padding: 5px;border-radius: 5px;font-size: 11px;">' +
        ticket_no +
        "</span>" +
        "</h6></div></div></div>" +
        '<div class="col-md-12"> </div></div><div class="col-md-8" style="display: inline-block;"><span class="side-icons"><i class="fa fa-times links" aria-hidden="true" style="margin-bottom:5px;font-size:16px;position:relative;float:right;" aria-hidden="true"  id="previewimg" ></i></span><embed  type="' +
        filetype +
        '" src="' +
        url +
        '" style=" width: 100%; height:818px;"/><a href="' +
        environment.API_URL +
        "document/downloaddocument/" +
        imagename +
        '" ><span class="side-icons" ><i class="fa fa-download links" style="position:relative;float:right;padding-right: 24px;" aria-hidden="true"  ></i></span></a></div> </div>'
      );

      const someInput = document.getElementById("previewimg");
      someInput.addEventListener(
        "click",
        function () {
          removepreview();
        },
        false
      );
    }
  }

  CurrentChat(user, i: number) {
    console.log("function called");
    console.log(user);
    this.last_transaction_type = user.Transaction_Type;

    if (user.Transaction_Type != "Registrierung Produktpartner") {
      this.lastcase_no = user.Activity_No;
      $(".nesteslist").removeClass("activediv");
      let message = {
        broker_id: this.loginid,
        case_no: user.Activity_No,
        ptid: user.ptid,
        ppid: user.ppid,
      };

      this.video_chat_data = {
        broker_id: this.loginid,
        user: user,
      };

      console.log("here is login id", this.loginid);

      this.userService.getchatmessage(message).subscribe(
        (success: any) => {
          console.log("messages in product partner loginid", success);
          this.messagelist = success.result;
          // $("#li" + user.Activity_No + user.ptid + user.ppid).addClass(
          //   "activediv"
          // );

          $("#li" + user.Activity_No).addClass("activediv");

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
          console.log(err);
        },
        () => { }
      );
    } else {
      this.CurrentChat_productpartner(user, i);
    }
  }

  CurrentChat_productpartner(user, i: number) {
    this.lastcase_no = user.Activity_No;
    $(".nesteslist").removeClass("activediv");
    let message = {
      broker_id: this.ppid,
      case_no: user.Activity_No,
      ptid: "",
      ppid: "",
    };
    console.log("sending data to chat api");
    console.log(message);

    console.log("here is pp id", this.ppid);

    this.video_chat_data = {
      broker_id: this.ppid,
      user: user,
    };
    this.userService.getchatmessage(message).subscribe(
      (success: any) => {
        console.log("see chat came or not");
        console.log("messages in product partner ppid", success);
        this.messagelist = success.result;
        // $("#li" + user.Activity_No + user.ptid + user.ppid).addClass(
        //   "activediv"
        // );

        $("#li" + user.Activity_No).addClass("activediv");

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
        console.log(err);
      },
      () => { }
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

    if (this.last_transaction_type != "Registrierung Produktpartner") {
      this.userService
        .geteditpartner(this.ppid)
        .subscribe((poductpartnerdata: any) => {
          let inputmessage: any = $("#inputmessage").val();

          console.log("moveforward" + JSON.stringify(this.selectedbroker));
          let index = this.selectedbroker.indexOf(this.CurrentUser._id);
          if (index != -1) {
            this.selectedbroker.splice(index, 1);
          }
          console.log("moveforward" + JSON.stringify(this.selectedbroker));

          let newdata = {
            broker_id: this.selectedbroker,
            case_no: this.T_N,
            company_name: poductpartnerdata.company_name,
            message: inputmessage,
            CreatedBy: this.CurrentUser._id,
            ptid: this.selectedptid,
            ppid: this.selectedppid,
          };

          console.log(
            "new message data in product partner component case register",
            newdata
          );

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
              userinfo: [],
              specilistsinfo: [],
              ppinfo: [
                {
                  firstname: this.ppdata.name_of_ceo,
                  lastname: this.ppdata.lastname_of_ceo,
                },
              ],
            };

            console.log("moveforward" + JSON.stringify(data));

            this.messagelist.push(data);
            $("#inputmessage").removeAttr("disabled");
            this.editsendbutton = true;
            $("#inputmessage").val("");
          });
        });
    } else {
      this.sendmessage_productpartner();
    }
  }

  sendmessage_productpartner() {
    let inputmessage: any = $("#inputmessage").val();
    let index = this.selectedbroker.indexOf(this.currentUserData._id);
    if (index != -1) {
      this.selectedbroker.splice(index, 1);
    }
    let newdata = {
      broker_id: this.selectedbroker,
      case_no: this.lastcase_no,
      company_name: this.currentUserData.company_name,
      message: inputmessage,
      CreatedBy: this.currentUserData._id,
      ptid: "",
      ppid: "",
    };

    console.log(
      "new message data in product partner component no case register",
      newdata
    );
    // console.log("check message before sending");
    // console.log(newdata);

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
        userinfo: [],
        specilistsinfo: [],
        ppinfo: [
          {
            firstname: this.ppdata.name_of_ceo,
            lastname: this.ppdata.lastname_of_ceo,
          },
        ],
      };

      console.log("moveforward" + JSON.stringify(data));

      this.messagelist.push(data);
      $("#inputmessage").removeAttr("disabled");
      this.editsendbutton = true;
      $("#inputmessage").val("");
    });
  }

  editRecord_specialist(specialist_data: any) {
    console.log("function called");
    console.log(specialist_data);

    if ($("#click_specialist" + specialist_data._id).html() == "Schließen") {
      $("#collapse1").addClass("collapse");
      $("#collapse1").removeClass("collapse-show");
      $(".click_specialist").html("Öffnen");
    } else {
      $("#collapse1").addClass("collapse-show");
      $("#collapse1").removeClass("collapse");
      $(".click_specialist").html("Öffnen");
      $("#click_specialist" + specialist_data._id).html("Schließen");

      let element1: HTMLElement = document.getElementById(
        "ul_specialist" + specialist_data._id
      ) as HTMLElement;
      let accordian: HTMLElement = document.getElementById("collapse1");
      element1.after(accordian);
    }

    this.specialistformgroup.patchValue({
      specialist_id: specialist_data._id,
      title: specialist_data.title,
      firstName: specialist_data.firstName,
      lastName: specialist_data.lastName,
      email: specialist_data.email,
      sparte: specialist_data.sparte,
      department: specialist_data.department,
      position: specialist_data.position,
    });
  }

  update_specialist() {
    $("#loaderouterid").css("display", "block");

    let data = {
      specialist_id: this.specialistformgroup.controls.specialist_id.value,
      title: this.specialistformgroup.controls.title.value,
      firstName: this.specialistformgroup.controls.firstName.value,
      lastName: this.specialistformgroup.controls.lastName.value,
      email: this.specialistformgroup.controls.email.value,
      sparte: this.specialistformgroup.controls.sparte.value,
      department: this.specialistformgroup.controls.department.value,
      position: this.specialistformgroup.controls.position.value,
    };

    this.userService.update_specialist(data).subscribe((success: any) => {
      if (success.status == "200") {
        setTimeout(() => {
          $("#collapse1").addClass("collapse");
          $("#collapse1").removeClass("collapse-show");
          $(".click_specialist").html("Öffnen");
          Swal.fire({
            title: `Specilist erfolgreich aktualisiert.`,
            showCloseButton: true,
            allowOutsideClick: false,
            icon: "success",
          }).then((result) => {
            this.specialist_list();
          });
        }, 1000);
      }
    });
  }

  open_sparte_data(id: any) {
    if ($("#open-sparte-data" + id).html() == "Schließen") {
      $("#open-sparte-data" + id).html("Öffnen");
      $("#sparte-data-row" + id).css("display", "none");
    } else {
      $(".open-sparte-data").html("Öffnen");
      $(".sparte-data-row").css("display", "none");

      $("#open-sparte-data" + id).html("Schließen");
      $("#sparte-data-row" + id).css("display", "block");
    }
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

  get_unread_chat() {
    let message = {
      broker_id: this.loginid,
      case_no: this.lastcase_no,
    };
    // console.log("case no in product partner");
    // this.userService.getchatunreadmessage(message).subscribe(
    //   (success: any) => {
    //     for (let i = 0; i < success.result.length; i++) {
    //       if (
    //         this.messagelist.findIndex((x) => x._id == success.result[i]._id) ==
    //         -1
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
}
