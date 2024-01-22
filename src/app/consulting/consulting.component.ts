import { DatePipe } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Observable, startWith, map, first } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import SignaturePad from "signature_pad"
import { environment } from 'src/environments/environment';


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
  selector: 'app-consulting',
  templateUrl: './consulting.component.html',
  styleUrls: ['./consulting.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultingComponent implements OnInit, AfterViewInit {
  // @Input("appStepperPosition") position: "top" | "bottom";
  // element: any;
  i: any
  API_URL = environment.API_URL;

  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  signaturePad: SignaturePad
  public signaturePadOptions: Object = {
    minWidth: 2,
    canvasWidth: 750,
    canvasHeight: 300,
  };
  public signaturePadOptions2: Object = {
    minWidth: 2,
    canvasWidth: 900,
    canvasHeight: 300,
  };
  title: any
  lastname: any
  customerno: any
  localData: any = JSON.parse(localStorage.getItem("currentUser")!);
  //firstname = this.userService.getDecodedAccessToken(localStorage.getItem('token')).firstname;
  COMPANYNAME: any
  // loginRole = this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles;
  loginRole = localStorage.getItem("currentActiveRole");
  selectedUser = {
    id: "",
  };
  id: any
  myControl = new FormControl("",Validators.required);
  currentCustomer = "";
  customerFormGroup: FormGroup;
  recordCount: Number;
  year: any = new Date().getFullYear();
  customerList: any[];
  optionsValue: any[];
  error: String;
  // id: String;
  routeParams: any;
  myControlnew = new FormControl("");
  optionsValuemembers: any[];
  familymembers: any[];
  filteredOptionsmembers: Observable<any>;
  showmembers: boolean = false;
  componentname: String;
  kundetype: any = "";

  company_kunde: any = false;

  ShowButton: boolean = true;
  documentList: any;
  filteredOptions: Observable<any>;
  stpperForm: boolean = false;

  companytype: any

  contractType = "";
  filteredProductsTypeOptions: any = [];
  ProductsTypeControl = new FormControl();
  ReadyProductsTypeOptions: string[];
  selected_producttype: any = [];

  // Bhupendra
  TabListControl = new FormControl();
  selected_tablist: any = [];
  selected_tablist_questions: any = [];
  selected_tablist_answers: any = [];

  questionlist: any = [];
  selected_producttype_questions: any = [];
  selected_producttype_answers: any = [];
  dashboard_positions_list: any = [];
  selected_answer_option_index: any = [];

  selectedProductTypeList: any = [];
  currentSelectedProduct: FormControl = new FormControl("");
  tabsList: any = [];
  filteredTabsList: any = [];
  currentSelectedTab: FormControl = new FormControl(null);
  selectedTabList: any = [];

  currentMember: FormControl = new FormControl(null);
  selectedMemberList: any = [];
  opened_tab: any = {
    personal_data: true,
    official_residence: false,
    more_info: false,
  };
  allCustomerData: any = [];
  questionTab: any = {
    userName: "",
    tabName: "",
  };
  currentTabType: string = "";
  questionList: any = [];
  finalQuestionList: any = [];
  currentUser: any = "";
  currentTab: any = "";
  currentQuestionArray: any = "";
  currentUserInfo: any = {};

  userIndex: any = null;
  tabIndex: any = null;
  questionIndex: any = null;
  currentQuestionObject: any = {
    qno: 0,
    userIndex: null,
    tabIndex: null,
    questionIndex: null,
    question: {},
  };
  uploaded_document_id: any = [];
  uploaded_document_tags: any = [];
  l: any = 0;
  drawingnew = 0;
  currentSignature: any = "";
  pdfArray: any = [];
  uploadedPdfArray: any = [];
  tabDataArray: any = [];

  currentBranch = new FormControl("");
  allBranches: any = [];
  branchesOptions: any = [];
  selectedBranchList: any = [];
  nextCaseNumber: any = "";
  heading: boolean = true;
  questionCounter: any = 0;
  tabQuestionsLength: any = 0;
  // answeredCounter: any = 0;
  isLinear: boolean = true;
  @ViewChild("consultStepper") consultStepper: MatStepper;
  @ViewChild("QAStepper") QAStepper: MatStepper;
  private readonly units: unit[] = ["bytes", "KB", "MB", "GB", "TB", "PB"];
  modifiedProduct: any = [];

  // Bhupendra
  modifiedTab: any = [];

  hoverOnKunden = false
  hoverOnproduktberatung = false

  itemToDisplayUnderKunden = ''
  itemToDisplayUnderAuswahlberatung = ''
  itemToDisplayUnderFragTyp = ''

  step2Control = this.currentBranch


  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService, 
    private dialog: MatDialog
  ) {
    // this.element = elementRef.nativeElement;
  }

  

  filtercustomer(success: any, companyName: any) {
    let newsuccess = [];

    for (let i = 0; i < success.length; i++) {
      let brokerbrandarray = success[i].brokerbrandarray;
      let brokerarray = success[i].brokerarray;
      let a = brokerbrandarray.indexOf(
        companyName.charAt(0).toUpperCase() + companyName.slice(1)
      );

      if (a != -1) {
        let brokervaluenew = brokerarray[a];

        if (brokervaluenew == this.customerno) {
        } else {
          newsuccess.push(i);
        }
      } else {
        newsuccess.push(i);
      }
    }

    for (let i1 = 0; i1 < newsuccess.length; i1++) {
      delete success[newsuccess[i1]];
      // success.splice(newsuccess[i1],1);
    }
    success = success.filter(function () {
      return true;
    });

    console.log("new success");
    console.log(success);
    return success;
  }
  ngOnInit() {
    $("#loaderouterid").css("display", "block");
    this.signaturePad = new SignaturePad(this.canvas.nativeElement);

    this.title = this.userService.getDecodedAccessToken(localStorage.getItem("token")!)
      .title;
    this.companytype = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).companytype;
    this.lastname = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).lastname;
    this.customerno = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).customerno;
    this.COMPANYNAME = this.userService.getDecodedAccessToken(
      localStorage.getItem("token")!
    ).companyname;
    this.id = this.userService.getDecodedAccessToken(localStorage.getItem("token")!)
      .id;
    this.selectedUser.id = this.id;
    this.componentname = "consulting";

  

    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(""),
    //   map((value) => this._filter(value))
    // );
    this.routeParams = this.route.snapshot.routeConfig!.path;
    this.userService.getCustomers("cefima", true).subscribe((success: any) => {
      $("#loaderouterid").css("display", "none");
      this.onGetTaxList(success);
    });
    this.getCaseNumber();
    this.userService.getproductpartner().subscribe((success: any) => {
      this.ReadyProductsTypeOptions = this.LoopingProductsListType(success);
      this.filteredProductsTypeOptions = this.ReadyProductsTypeOptions;
    });

    // this.userService
    //   .getEditUser(this.customerid)
    //   .pipe(first())
    //   .subscribe((user: any) => {
    //     this.localData = user;
    //   })
  }

  ngAfterViewInit(): void {

    if (this.canvas?.nativeElement) {
      this.signaturePad = new SignaturePad(this.canvas.nativeElement);
    }

    //   if (this.position === "bottom") {
    //     const header = this.element.children[0];
    //     const content = this.element.children[1];
    //     this.element.insertBefore(content, header);
    //   }
  }

  filterProductType(event: any) {
    let value = event.target.value;
    if (value !== "") {
      this.filteredProductsTypeOptions = this.ReadyProductsTypeOptions.filter(
        (option: any) => option.name.toLowerCase().includes(value.toLowerCase())
      );
      console.log("valueeee", this.filteredProductsTypeOptions);
    }
  }

  patchProductTpyeValue(event: any) {
    this.selected_producttype = event.option.value;
    this.ProductsTypeControl.setValue(event.option.value.name);

    this.selectedProductTypeList.push(event.option.value);

    console.log("selected product tyope list", this.selectedProductTypeList);
    // this.itemToDisplayUnderFragTyp += `, ${this.selectedProductTypeList.name}`;
    const index = this.filteredProductsTypeOptions.findIndex((object: any) => {
      return object.name == event.option.value.name;
    });
    let x = this.filteredProductsTypeOptions.splice(index, 1);
    this.modifiedProduct.push(x);
    this.selected_producttype_questions = [];
    this.selected_producttype_answers = [];

    for (let i = 0; i < this.selected_producttype.question.length; i++) {
      for (let j = 0; j < this.selected_producttype.question[i].length; j++) {
        for (let k = 0; k < this.questionlist.length; k++) {
          if (
            this.selected_producttype.question[i][j] == this.questionlist[k]._id
          ) {
            let exists = 0;
            for (
              let l = 0;
              l < this.selected_producttype_questions.length;
              l++
            ) {
              if (
                this.questionlist[k]._id ==
                this.selected_producttype_questions[l]._id
              ) {
                exists = 1;
              }
            }

            if (exists == 0) {
              let dashboard_of = [];
              let tab = [];
              for (
                let db_count = 0;
                db_count < this.dashboard_positions_list.length;
                db_count++
              ) {
                if (
                  this.selected_producttype.dashboard_positions[i] ==
                  this.dashboard_positions_list[db_count]._id
                ) {
                  dashboard_of =
                    this.dashboard_positions_list[db_count].dashboard_of;
                  tab = this.dashboard_positions_list[db_count].tab;
                }
              }

              let question_data = {
                _id: this.questionlist[k]._id,
                type: this.questionlist[k].type,
                ticket_no: this.questionlist[k].ticket_no,
                questionname: this.questionlist[k].questionname,
                option_fields: this.questionlist[k].option_fields,
                option: this.questionlist[k].option,
                option2: this.questionlist[k].option2,
                option3: this.questionlist[k].option3,
                option4: this.questionlist[k].option4,
                option5: this.questionlist[k].option5,
                option6: this.questionlist[k].option6,
                option7: this.questionlist[k].option7,
                description: this.questionlist[k].description,

                dashboard_position_id:
                  this.selected_producttype.dashboard_positions[i],
                dashboard_of: dashboard_of,
                tab: tab,
              };
              this.selected_producttype_questions.push(question_data);
              this.selected_producttype_answers.push([]);
              this.selected_answer_option_index.push([]);
            }
          }
        }
      }
    }

    for (let i = 0; i < this.selected_producttype_answers.length; i++) {
      this.selected_producttype_answers[i].selected_option = "";
      this.selected_producttype_answers[i].input = "";
      this.selected_producttype_answers[i].textarea = "";
      this.selected_producttype_answers[i].date = "";
      this.selected_producttype_answers[i].from_date = "";
      this.selected_producttype_answers[i].to_date = "";
      this.selected_producttype_answers[i].documents = [];
    }

    this.currentSelectedProduct.setValue("");
  }

  private _filterTypeProducts(value: string) {
    if (typeof value != "object") {
      const filterValue = value.toLowerCase();
      // console.log('values', value, filterValue);
      // console.log('ready product type options', this.ReadyProductsTypeOptions);
      let optionss = this.ReadyProductsTypeOptions.filter((option: any) =>
        option.name.toLowerCase().includes(filterValue)
      );
      console.log("optionsss", optionss);
      return optionss;
    }
  }

  LoopingProductsListType(data: string | any[]): string[] {
    let ProductsList = [];
    for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].producttypesinfo.length; k++) {
        ProductsList.push({
          id: data[i].producttypesinfo[k]._id,
          name: data[i].producttypesinfo[k].product_typename,
          question: data[i].producttypesinfo[k].question,
          dashboard_positions: data[i].producttypesinfo[k].dashboard_positions,
        });
      }
    }
    return [
      ...new Map(
        ProductsList.map((item: any) => [item["name"], item])
      ).values(),
    ];
  }

  OpenStpper() {
    this.stpperForm = true;
  }
  LoopingBroker(data: any) {
    let brokerList = [];
    let CustomerData = this.filtercustomer(data, "cefima");
    this.allCustomerData = CustomerData;
    console.log("all customer data", this.allCustomerData);
    for (let i = 0; i < CustomerData.length; i++) {
      if (CustomerData[i].roles.includes("customer")) {
        if (CustomerData[i].title == "Firma") {
          brokerList.push({
            name:
              CustomerData[i].companyname +
              " (" +
              CustomerData[i].customerno +
              ")" +
              " " +
              CustomerData[i].email,
            id: CustomerData[i]._id,
            firstname: CustomerData[i].firstname,
            lastname: CustomerData[i].lastname,
            title: CustomerData[i].title,
            dateofbirth: CustomerData[i].dateofbirth,
            customerno: CustomerData[i].customerno,
            mainCompany: 0,
          });
        } else {
          brokerList.push({
            name:
              //CustomerData[i].firstname +
              "Haushalt" +
              " " +
              CustomerData[i].lastname +
              " (" +
              CustomerData[i].customerno +
              ")" +
              " " +
              CustomerData[i].email,
            id: CustomerData[i]._id,
            firstname: CustomerData[i].firstname,
            lastname: CustomerData[i].lastname,
            title: CustomerData[i].title,
            dateofbirth: CustomerData[i].dateofbirth,
            customerno: CustomerData[i].customerno,
            company_customer: "0",
          });
        }
      }
    }
    console.log("broker list", brokerList);
    return brokerList;
  }
  LoopingBrokermember(data: any) {
    let brokerList = [];
    let CustomerData = data;
    for (let i = 0; i < CustomerData.length; i++) {
      brokerList.push({
        name:
          CustomerData[i].firstname +
          " " +
          CustomerData[i].lastname +
          " (" +
          this.datePipe.transform(CustomerData[i].dateofbirth, "dd.MM.yyyy") +
          ")",
        id: CustomerData[i]._id,
      });
    }
    return brokerList;
  }
  onGetTaxList(data: any) {
    console.log("data in on get tax list", data);
    this.optionsValue = this.LoopingBroker(data);
    console.log("view optionsvalue");
    console.log(this.optionsValue);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );

    let that = this;
    if (this.optionsValue.length > 0) {
      for (let count = 0; count < this.optionsValue.length; count++) {
        if (this.optionsValue[count].title == "Firma") {
          this.userService
            .getCustomerCompanies(this.optionsValue[count].id)
            .subscribe((companydata: any) => {
              for (
                let comp_count = 0;
                comp_count < companydata.length;
                comp_count++
              ) {
                let temp_company_data = companydata[comp_count];
                temp_company_data.id = companydata[comp_count]._id;
                temp_company_data.name =
                  companydata[comp_count].companyname +
                  " (" +
                  that.optionsValue[count].customerno +
                  ") " +
                  companydata[comp_count].email;
                temp_company_data.title = "Firma";

                this.optionsValue.push(temp_company_data);
              }

              this.userService
                .getfamilyMembers(this.optionsValue[count].id)
                .subscribe((familydata11: any) => {
                  if (familydata11.length > 0) {
                    let temp_family_data = familydata11[0];
                    temp_family_data.id = that.optionsValue[count].id;
                    temp_family_data.name =
                      " Haushalt " +
                      familydata11[0].lastname +
                      " (" +
                      that.optionsValue[count].customerno +
                      ") " +
                      familydata11[0].email;

                    temp_family_data.company_customer = "1";

                    this.optionsValue.push(temp_family_data);
                  }

                  this.filteredOptions = this.myControl.valueChanges.pipe(
                    startWith(""),
                    map((value) => this._filter(value))
                  );
                });
            });
        }
      }
    }
  }
  onGetTaxListmember(data: any) {
    console.log("data in on get", data);
    this.optionsValuemembers = this.LoopingBrokermember(data);
    console.log("options members", this.optionsValuemembers);
    // console.log("options value members", this.optionsValuemembers);
    //this.optionsValue = data;
    // this.filteredOptionsmembers = this.myControlnew.valueChanges.pipe(
    //   startWith(""),
    //   map((value) => this._filtermember(value))
    // map((value) => (value.length >= 1 ? this._filter(value) : []))
    // );
  }
  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.optionsValue.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  // private _filtermember(value: string) {
  //   console.log("value to filter", value);
  //   const filterValue = value !== "" ? value.toLowerCase() : "";

  //   console.log("options value members", this.optionsValuemembers);

  //   return this.optionsValuemembers.filter((option) =>
  //     option.name.toLowerCase().includes(filterValue)
  //   );
  // }

  GoNext() {
    if (this.kundetype == "Firma" && this.myControl.value) {
      this.userService.savelocaldata(
        this.kundetype,
        this.myControl.value.split("(")[0].trim()
      );
    } else if (this.kundetype.includes("Haushalt") && this.myControlnew.value) {
      this.userService.savelocaldata(
        this.kundetype,
        this.myControlnew.value.split("(")[0].trim()
      );
    }
    console.log("goooo next", this.allCustomerData);
    this.openDialog();
  }
  openDialog() {

    // const dialogRef = this.dialog.open(SelectConsultingComponent, {
    //   data: {
    //     // message: 'Are you sure want to delete?',
    //     // buttonText: {
    //     //   ok: 'Save',
    //     //   cancel: 'No'
    //     // }
    //   },
    //   // backdropClass: 'backdropBackground'
    // });
    // dialogRef.afterClosed().subscribe((data) => {
    //   if (data.event) {
    //     this.setContractType(data.data);
    //     this.consultStepper.next();
    //   } else {
    //     this.consultStepper.previous();
    //   }
    // });
  }
  patchnationalityValue(event: any) {
    this.myControlnew.reset();
    console.log("my control value", this.myControl.value);
    if (this.myControl.value != "") {
      this.currentCustomer = this.myControl.value;
      let words = this.myControl.value.split(' ');
      words.pop();
      this.itemToDisplayUnderKunden = words.join(' ')
      this.resetMemberList();
      this.resetContractType();
      this.resetTabsList();
      this.resetBranchList();
      for (let i = 0; i < this.optionsValue.length; i++) {
        if (this.optionsValue[i].name === this.myControl.value) {
          this.id = this.optionsValue[i].id;
          console.log(this.optionsValue[i].title);
          
          if (this.optionsValue[i].title == "Firma") {

            this.step2Control = this.currentBranch

            this.kundetype = "Firma";
            this.company_kunde = false;
            this.showmembers = false;
            this.ShowButton = false;
            if (this.optionsValue[i]?.mainCompany === 0) {
              $("#loaderouterid").css("display", "block");
              this.userService
                .getMainCompanyBranch(this.id)
                .subscribe((branches: any) => {
                  // console.log("result of branch", result);
                  $("#loaderouterid").css("display", "none");
                  for (let i = 0; i < branches.length; i++) {
                    this.allCustomerData.push(branches[i]);
                  }
                  let selected_customer = this.optionsValue[i];
                  selected_customer._id = selected_customer.id;
                  branches.unshift(selected_customer);
                  this.allBranches = branches;
                  this.setBranchesOptions(this.allBranches);
                  console.log("all branches", this.allBranches);
                });
            } else {
              $("#loaderouterid").css("display", "block");
              this.userService
                .getSubCompanyBranch(this.id)
                .subscribe((branches: any) => {
                  $("#loaderouterid").css("display", "none");
                  for (let i = 0; i < branches.length; i++) {
                    this.allCustomerData.push(branches[i]);
                  }
                  this.allCustomerData.push(this.optionsValue[i]);
                  let selected_customer = this.optionsValue[i];
                  selected_customer._id = selected_customer.id;
                  branches.unshift(selected_customer);
                  this.allBranches = branches;
                  this.setBranchesOptions(this.allBranches);
                });
            }
          } else {
            this.step2Control = this.myControlnew
            this.kundetype = " Haushalt " + this.optionsValue[i].lastname;
            this.company_kunde = false;
            $("#loaderouterid").css("display", "block");
            this.userService
              .getfamilyMembers(this.id)
              .pipe(first())
              .subscribe((familydata11: any) => {
                console.log("family data 11", familydata11);
                // return;
                for (let i = 0; i < familydata11.length; i++) {
                  this.allCustomerData.push(familydata11[i]);
                }
                $("#loaderouterid").css("display", "none");
                let selected_customer = this.optionsValue[i];
                selected_customer._id = selected_customer.id;
                if (selected_customer.company_customer != "1") {
                  familydata11.unshift(selected_customer);
                }
                this.familymembers = familydata11;
                console.log("family members", this.familymembers);
                if (this.familymembers.length > 0) {
                  this.showmembers = true;
                  this.onGetTaxListmember(this.familymembers);
                } else {
                  this.showmembers = false;
                  this.ShowButton = false;
                }
              });
          }
        }
      }
    } else {
      this.ShowButton = true;
      this.showmembers = false;
      this.familymembers = [];
      this.kundetype = "";
    }
  }
  patchmembervalue(event: any) {
    if (this.myControlnew.value != "") {
      for (let i = 0; i < this.optionsValuemembers.length; i++) {
        if (this.optionsValuemembers[i].name === this.myControlnew.value) {
          this.id = this.optionsValuemembers[i].id;
          let member = this.selectedMemberList.find(
            (item: any) =>
              JSON.stringify(item) ===
              JSON.stringify(this.optionsValuemembers[i])
          );
          if (!member) {
            this.selectedMemberList.push(this.optionsValuemembers[i]);
            this.setCurrentUserInfo(this.selectedMemberList[0].id);
          }
          this.myControlnew.setValue("");
        }
      }
      console.log("selected memeber list", this.selectedMemberList);
      this.stepTwo = true
      this.ShowButton = false;
    } else {
      this.ShowButton = true;
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
  }
  navigateWithb2bID() {
    console.log(this.selectedUser);

    this.router.navigate(["/b2b-dashboard"], {
      queryParams: { id: this.selectedUser.id },
    });

    // this.queryID = this.selectedUser.customerno;
    // this.ngOnInit()
  }

  getAllTabs() {
    let tabType =
      this.kundetype.toLowerCase() === "firma" ? "firmenkunde" : "haushalt";
    this.currentTabType = tabType;
    this.userService.getTabsByType(tabType).subscribe((results: any) => {
      this.tabsList = results;
      console.log(results);

      // this.filteredTabsList = results;
      results.forEach((element: any) => {
        if (element.question_id.length >= 1) {
          this.filteredTabsList.push(element);
        }
      });
      console.log(this.filteredTabsList);
    });
  }

  deleteProductTypeFromList(index: any, product: any) {
    this.selectedProductTypeList.splice(index, 1);
    // this.itemToDisplayUnderFragTyp.slice
    let y = this.modifiedProduct.find((obj: any) => {
      return obj[0].name == product.name;
    });
    this.filteredProductsTypeOptions.push(y[0]);
  }


  setContractType(type: any) {
    console.log(type);
    this.goForward(this.consultStepper)
    this.contractType = type;
    if (type === "privatkunde") {
      this.itemToDisplayUnderAuswahlberatung = 'KUNDENDATEN AKTUALISIEREN'
      this.getAllTabs();
    } else {
      this.itemToDisplayUnderAuswahlberatung = 'PRODUKTBERATUNG STARTEN'
    }
  }

  filterTabsList(event: any) {
    console.log(this.tabsList);
    console.log(event.target.value);
    let value = event.target.value;
    if (value !== "") {
      this.filteredTabsList = this.tabsList.filter((option: any) =>
        option.tab.toLowerCase().includes(value.toLowerCase())
      );
    }
    console.log("this.filteredTabsList: ", this.filteredTabsList);
  }

  setSelectedTabList(event: any) {
    // let tab = this.selectedTabList.find(
    //   (item: any) => JSON.stringify(item) === JSON.stringify(event.option.value)
    // );
    // if (!tab) {
    //   this.selectedTabList.push(event.option.value);
    // }
    // this.currentSelectedTab.setValue(null);

    this.selected_tablist = event.option.value;
    this.TabListControl.setValue(event.option.value.name);

    this.selectedTabList.push(event.option.value);

    const index = this.filteredTabsList.findIndex((object: any) => {
      return object.name == event.option.value.name;
    });

    let x = this.filteredTabsList.splice(index, 1);
    this.modifiedTab.push(x);

    this.currentSelectedTab.setValue("");
  }

  deleteTabFromTabList(index: any, tab: any) {
    this.selectedTabList.splice(index, 1);

    let y = this.modifiedTab.find((obj: any) => {
      return obj[0].tab == tab.tab;
    });
    this.filteredTabsList.push(y[0]);
  }
  deleteMemberFromList(index: any) {
    this.selectedMemberList.splice(index, 1);
  }

  open_modal(modalId: any) {
    $("#" + modalId).appendTo("body");
  }
  close_modal(modal_id: any, append_to: any) {
    $("#" + modal_id).appendTo("#" + append_to);
    if (modal_id == "questionAnswerModal") {
      this.QAStepper.reset();
    }
  }



  getQuestionsForTabs() {
    let that = this;
    this.questionList = [];
    let tabName: any = [];
    let tabType = this.currentTabType;
    this.selectedTabList.map((tab: any) => tabName.push(tab.tab));
    this.userService
      .getAllQuestions({ tabType, tabName })
      .subscribe((results: any) => {
        if (this.kundetype.toLowerCase() == "firma") {
          that.selectedBranchList.map((item: any) => {
            let user = this.allCustomerData.find(
              (user: any) => user._id === item.id
            );
            let tempList = results.map((list: any) => ({
              ...list,
            }));
            that.questionList.push({
              tempList,
              userId: item.id,
              name: item.name,
              email: user.email,
              strno: user.strno,
              city: user.city,
              country: user.current_country,
              userType: user.title !== "Firma" ? "haushalt" : "firma",
            });
          });
        } else {
          that.selectedMemberList.map((item: any) => {
            let user = this.allCustomerData.find(
              (user: any) => user._id === item.id
            );
            let tempList = results.map((list: any) => ({
              ...list,
            }));
            that.questionList.push({
              tempList,
              userId: item.id,
              name: item.name,
              email: user.email,
              strno: user.strno,
              city: user.city,
              country: user.current_country,
              userType: user.title !== "Firma" ? "haushalt" : "firma",
            });
          });
        }
        this.questionCounter = 0;
        that.questionList.map((item: any) => {
          item.tempList.map((item2: any) => {
            item2.pdfSaved = false;
            item2.list.map((item3: any) => {
              this.questionCounter = this.questionCounter + 1;
              item3.answerKey = {};
              item3.validated = false;
              item3.option_index = null;
            });
          });
        });
        console.log("question list 123 ***", that.questionList);
        // this.currentQuestionObject = {
        //   userIndex: 0,
        //   tabIndex: 0,
        //   questionIndex: 0,
        //   question: that.questionList[0].tempList[0].list[0],
        // };
      });
  }

  getQuestionsForProductType() {
    let that = this;
    this.questionList = [];
    let tabName: any = [];
    let tabType = this.currentTabType;
    this.selectedProductTypeList.map((tab: any) => tabName.push(tab.id));
    this.userService
      .getAllQuestionsProductType(tabName)
      .subscribe((results: any) => {
        if (this.kundetype.toLowerCase() == "firma") {
          that.selectedBranchList.map((item: any) => {
            let user = this.allCustomerData.find(
              (user: any) => user._id === item.id
            );
            let tempList = results.map((list: any) => ({
              ...list,
            }));
            that.questionList.push({
              tempList,
              userId: item.id,
              name: item.name,
              email: user.email,
              strno: user.strno,
              city: user.city,
              country: user.current_country,
              userType: user.title !== "Firma" ? "haushalt" : "firma",
            });
          });
        } else {
          that.selectedMemberList.map((item: any) => {
            let user = this.allCustomerData.find(
              (user: any) => user._id === item.id
            );
            let tempList = results.map((list: any) => ({
              ...list,
            }));
            that.questionList.push({
              tempList,
              userId: item.id,
              name: item.name,
              email: user.email,
              strno: user.strno,
              city: user.city,
              country: user.current_country,
              userType: user.title !== "Firma" ? "haushalt" : "firma",
            });
          });
        }
        this.questionCounter = 0;
        that.questionList.map((item: any) => {
          item.tempList.map((item2: any) => {
            item2.pdfSaved = false;
            item2.list.map((item3: any) => {
              this.questionCounter = this.questionCounter + 1;
              item3.answerKey = {};
              item3.validated = false;
              item3.option_index = null;
            });
          });
        });
        console.log("question list ------", that.questionList);
      });

  }
  setCurrentTab(name: any) {
    let currentArray = this.questionList.find(
      (item: any) => item.userId === this.currentUser
    );
    this.currentQuestionArray = currentArray.tempList.find(
      (item: any) => item.tabName === name
    );
    // console.log("current question Array", this.currentQuestionArray);
  }
  setCurrentUserInfo(userId: any) {
    console.log(
      "all customer data in current user function",
      this.allCustomerData
    );
    this.currentUserInfo = this.allCustomerData.find(
      (item: any) => item._id === userId
    );
    console.log("current user info", this.currentUserInfo);
  }

  setCurrentQuestion(i: any, j: any, k: any, ques: any) {
    console.log("hi setCurrentQuestion: ", i, j, k, ques);
    this.currentQuestionObject.userIndex = i;
    this.currentQuestionObject.tabIndex = j;
    this.currentQuestionObject.questionIndex = k;
    this.currentQuestionObject.question = ques;
    let userIndex = i;
    let tabIndex = j;
    this.tabQuestionsLength = this.questionList[userIndex].tempList[tabIndex].list.length;
    let item: HTMLElement = document.querySelector('.mat-mdc-form-field-subscript-wrapper')!;
    item.classList.add('removewrapper');

    // this.questionArray[uIndex].tempList[tabIndex].list[questionIndex]

    // Me
    // this.currentTab = this.questionList[userIndex].tempList[tabIndex].tabId;
    // this.tabIndex = tabIndex;
  }

  // fillingAnswer() {
  //   console.log("question", this.questionList[0].tempList[0].list[0]);
  // }

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

  filling_answer(
    currentObject: any,
    field: any,
    answer_index: any,
    option_index: any = "",
    value: any
  ) {
    console.log("filling current object", currentObject);
    console.log("filling field", field);
    console.log("filling answer_index", answer_index);
    console.log("filling option_index", option_index);
    console.log("filling value", value);
    let questionArray = JSON.parse(JSON.stringify(this.questionList));
    // let currentQuestionList = JSON.parse(JSON.stringify())
    let quesObject = JSON.parse(JSON.stringify(currentObject));
    console.log("quesObject: ", quesObject);
    let uIndex = quesObject.userIndex;
    let tabIndex = quesObject.tabIndex;
    let questionIndex = quesObject.questionIndex;
    if (field == "selected_option") {
      questionArray[uIndex].tempList[tabIndex].list[
        questionIndex
      ].answerKey.selected_option = value;
      // this.selected_answer_option_index[answer_index].option_index = option_index;
      questionArray[uIndex].tempList[tabIndex].list[
        questionIndex
      ].option_index = option_index;
      questionArray[uIndex].tempList[tabIndex].list[
        questionIndex
      ].answerKey.input = "";
      questionArray[uIndex].tempList[tabIndex].list[
        questionIndex
      ].answerKey.textarea = "";
      questionArray[uIndex].tempList[tabIndex].list[
        questionIndex
      ].answerKey.date = "";
      questionArray[uIndex].tempList[tabIndex].list[
        questionIndex
      ].answerKey.from_date = "";
      questionArray[uIndex].tempList[tabIndex].list[
        questionIndex
      ].answerKey.to_date = "";
      questionArray[uIndex].tempList[tabIndex].list[
        questionIndex
      ].answerKey.documents = [];
      // $(".result" + answer_index).html("");
    } else if (field == "input") {
      console.log("hi2");
      questionArray[uIndex].tempList[tabIndex].list[
        questionIndex
      ].answerKey.input = value;
      // questionArray[uIndex].tempList[tabIndex].list[
      //   questionIndex
      // ].answerKey.input = ;
    } else if (field == "textarea") {
      questionArray[uIndex].tempList[tabIndex].list[
        questionIndex
      ].answerKey.textarea = value;
    } else if (field == "date") {
      var d = new Date(value.value._d),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      let date = [year, month, day].join("-");
      questionArray[uIndex].tempList[tabIndex].list[
        questionIndex
      ].answerKey.date = date;
    } else if (field == "from_date") {
      var d = new Date(value.value._d),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      let date = [year, month, day].join("-");
      questionArray[uIndex].tempList[tabIndex].list[
        questionIndex
      ].answerKey.from_date = date;
    } else if (field == "to_date") {
      var d = new Date(value.value._d),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      let date = [year, month, day].join("-");
      questionArray[uIndex].tempList[tabIndex].list[
        questionIndex
      ].answerKey.to_date = date;
    }
    this.questionList = JSON.parse(JSON.stringify(questionArray));
    console.log(
      "answered question",
      questionArray[uIndex].tempList[tabIndex].list[questionIndex]
    );
  }

  async handleDocumentUpload(
    event: any,
    option_index: any = "",
    answer_index: any = ''
  ) {

    event.preventDefault();
    let userIndex = this.currentQuestionObject.userIndex;
    let tabIndex = this.currentQuestionObject.tabIndex;
    let questionIndex = this.currentQuestionObject.questionIndex;

    const previewData = (source: any, modaltitle: any) => {

      $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + modaltitle);

      $("#showpreviewdownload").attr("href", source);

      if (source.indexOf("data:application/pdf;") != -1) {

        const base64 = source.replace(/^data:.+;base64,/, "");

        const blob = base64ToBlob(base64, 'application/pdf');
        const url = URL.createObjectURL(blob);
        const pdfWindow = window.open("");
        pdfWindow.document.write("<iframe width='100%' height='100%' src='" + url + "'></iframe>");

        function base64ToBlob(base64, type = "application/octet-stream") {
          console.log(base64);
          const binStr = atob(base64 as string);
          const len = binStr.length;
          const arr = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }
          return new Blob([arr], { type: type });
        }

      } else {
        $("#openpreviewmodel").trigger("click");
        this.open_modal('exampleModalpreview');


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
        i <
        this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
          .answerKey.documents.length;
        i++
      ) {
        if (
          this.uploaded_document_id[j] ==
          this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
            .answerKey.documents[i].document_unique_id
        ) {
          this.questionList[userIndex].tempList[tabIndex].list[
            questionIndex
          ].answerKey.documents.splice(i, 1);
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
        let ImageName = (e.target as any).result;

        let extension = f.name.substr(f.name.lastIndexOf(".") + 1);
        console.log(extension, f);

        if (typeofimage.indexOf("pdf") != -1) {
          ImageName = "../assets/PDF.svg";
        } else {
          ImageName = (e.target as any).result;
        }

        console.log(option_index, ':anser', answer_index, ':size1', Size1, ':newsize', newsize, ':imagename', ImageName, ':fname', f.name, ':size', Size, ':type', typeofimage);

        if (option_index == "") {
          console.log(":", option_index);

          // ("#resultt" + answer_index).append
          $(
            // 1 s
            '<div class="pip col-md-4 mb-2" style="display: inline-block;" "id=\'pipremove' +
            +i +
            Size1 +
            "'>" +
            // 2 s
            '<div class="row col-md-12 p-0  "style="border: 1px solid #cdcdcd;border-radius:9px;"  >  ' +
            // 3s
            '<div class="col-md-2">' +
            '<img class="imageThumb" style="width: 200%;height:30px;margin-top: 20px;" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            //  3f
            "</div>" +
            // 4s
            '<div class="col-md-8 pr-0 mt-1" style="font-size:12px;">' +
            // 5s
            "<div> <b class='limitword' title='" +
            f.name +
            "'>Dokumentenname: " +
            f.name +
            // 5f
            "</b> </div>" +
            // 6s
            "<div> <b>Dateigröße: " +
            Size +
            // 6f
            "</b></div>" +
            // 7s
            "<div> <b>Dateityp: " +
            typeofimage +
            // 7f
            "</b> </div>" +
            //"<div> <b>Datum des Dokuments: " +date +"</b> </div>"+
            // 4f
            "</div>" +
            // 8s
            "<div class='col-md-2 d-flex flex-column mt-1 justify-content-between'>" +

            // 10s
            '<div class="removepreview btn-danger links" id="removepreviewid' +
            newsize +
            // 10 f
            '" style="border-radius: 3px;width:25px;height:25px;font-size: 14px; text-align: center; padding: 1px;color: white;cursor: pointer;">X</div>' +
            // 9s
            '<div class="previewdoc links" data-doc_name="' +
            f.name +
            '" data-preview_source="' +
            (e.target as any).result +
            '" id="previewdoc' +
            i +
            Size1 +
            // 9f
            '" style="background:  linear-gradient(#17459b, #02a9ed);border-radius: 3px;width:25px;height:25px;font-size: 14px; text-align: center; padding: 1px;color: white;cursor: pointer;"><i class="fa fa-eye" aria-hidden="true"></i></div>' +
            // 2f
            "</div>" +
            // 11 s
            "<div class='col-md-12 mt-2'>" +
            // 12 s
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
            // 11 f
            "</div>" +
            // 12 f
            "</div>" +
            // 1 f
            "</div>"
          ).insertAfter("#resultt" + answer_index);
        } else {
          console.log(":", option_index);
          $(
            // "#result" + option_index).append(
            '<div class="pip col-md-4" style="display: inline-block;border: 1px solid #cdcdcd;border-radius:9px;" "id=\'pipremove' +
            +i +
            Size1 +
            "'>" +
            '<div class="row"  > ' +
            // new size s
            '<div class="col-md-12">' +
            '<div class="removepreview links" id="removepreviewid' +
            newsize +
            '" style="margin-bottom:-25px;background: #184297;border-radius: 3px;width:25px;height:25px;font-size: 14px; text-align: center; padding: 1px;color: white;margin-left: 260px;margin-top: 2px;margin-right: 0 !important;cursor: pointer;">X</div>' +
            // new size f
            "</div>" +
            // img area s
            '<div class="col-md-2">' +
            '<img class="imageThumb" style="width: 170%;height:30px;margin-top: 20px;" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            // img area f
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
          ).insertAfter("#result" + option_index);
        }

        $(".previewdoc").click(function (event) {
          previewData($(this).data("preview_source"), $(this).data("doc_name"));
          event.stopPropagation();
          event.stopImmediatePropagation();
        });

        $("#removepreviewid" + newsize).click(function () {
          removeDocData(newsize);
          $(this).parent().parent().parent(".pip").remove();
        });

        //removing temorary created document div
        $("#removepreviewid2" + newsize).click(function () {
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
              console.log("Request has been made!");

              break;
            case HttpEventType.ResponseHeader:
              console.log(event.status);

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
              console.log(event.status);
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
                !this.questionList[userIndex].tempList[tabIndex].list[
                  questionIndex
                ].answerKey.documents
              ) {
                console.log('1454');

                this.questionList[userIndex].tempList[tabIndex].list[
                  questionIndex
                ].answerKey.documents = [];
              }
              this.questionList[userIndex].tempList[tabIndex].list[
                questionIndex
              ].answerKey.documents.push(data);
              console.log('data:', this.questionList[userIndex].tempList[tabIndex].list[
                questionIndex
              ].answerKey.documents);

              $("#progressnew" + i + Size1).css("display", "none");
          }
        });
    }
  }

  remove_uploaded_document(answer_index: any, document_unique_id: any) {
    let userIndex = this.currentQuestionObject.userIndex;
    let tabIndex = this.currentQuestionObject.tabIndex;
    let questionIndex = this.currentQuestionObject.questionIndex;
    for (
      let i = 0;
      i <
      this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
        .answerKey.documents.length;
      i++
    ) {
      if (
        document_unique_id ==
        this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
          .answerKey.documents[i].document_unique_id
      ) {
        this.questionList[userIndex].tempList[tabIndex].list[
          questionIndex
        ].answerKey.documents.splice(i, 1);
        break;
      }
    }
  }

  preview_uploaded_document(filename: any, url: any, datatype: any) {
    console.log(filename, ':', url, ':', datatype);

    $("#openpreviewmodel").trigger("click");
    $("#exampleModalpreview").appendTo("body");
    $("#showpreviewtitle").html("<b>Dokumentenname: </b>" + filename);
    if (datatype.indexOf("application/pdf") != -1) {
      console.log('if');
      console.log('hii');

      $("#showpreviewimg").attr("src", "");
      $("#showpreviewimg").css("display", "none");
      $("#showpreviewpdf").attr("src", "");
      $("#showpreviewpdf").css("display", "block");
      //  $('#showpreviewvideo').attr('src',source);
      // this.pdfUrl = url
      // $("#showpreviewpdf").attr("src", url);
    } else {
      console.log('else');
      $("#showpreviewpdf").attr("src", "");
      $("#showpreviewpdf").css("display", "none");
      $("#showpreviewimg").attr("src", "");
      $("#showpreviewimg").css("display", "block");
      $("#showpreviewimg").attr("src", url);
    }
  }

  check_nextbutton_validation(currentObject: any) {
    let question = currentObject.question;
    let userIndex = currentObject.userIndex;
    let tabIndex = currentObject.tabIndex;
    let questionIndex = currentObject.questionIndex;
    let validated: any = true;

    if (question.type == "mcq") {
      let input_validation = true;
      let date_validation = true;
      let document_validation = true;

      let selected_option_index: any = "false";

      for (let i = 0; i < question.option.length; i++) {
        if (
          this.questionList[userIndex]?.tempList[tabIndex]?.list[questionIndex]
            ?.answerKey?.selected_option == question.option[i]
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
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.input &&
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.input != ""
          ) {
            //validated = true;
            input_validation = true;
          } else {
            //validated = false;
            input_validation = false;
          }
        } else {
          if (
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.textarea &&
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.textarea != ""
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
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.from_date &&
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.to_date &&
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.from_date != "" &&
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.to_date != ""
          ) {
            //validated = true;
            date_validation = true;
          } else {
            //validated = false;
            date_validation = false;
          }
        } else {
          if (
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.date &&
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.date != ""
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
          this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
            .answerKey.documents &&
          this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
            .answerKey.documents.length > 0
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
            this.questionList[userIndex]?.tempList[tabIndex]?.list[
              questionIndex
            ]?.answerKey?.input &&
            this.questionList[userIndex]?.tempList[tabIndex]?.list[
              questionIndex
            ]?.answerKey?.input != ""
          ) {
            //validated = true;
            input_validation = true;
          } else {
            //validated = false;
            input_validation = false;
          }
        } else {
          if (
            this.questionList[userIndex]?.tempList[tabIndex]?.list[
              questionIndex
            ]?.answerKey?.textarea &&
            this.questionList[userIndex]?.tempList[tabIndex]?.list[
              questionIndex
            ]?.answerKey?.textarea != ""
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
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.from_date &&
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.to_date &&
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.from_date != "" &&
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.to_date != ""
          ) {
            //validated = true;
            date_validation = true;
          } else {
            //validated = false;
            date_validation = false;
          }
        } else {
          if (
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.date &&
            this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
              .answerKey.date != ""
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
          this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
            .answerKey.documents &&
          this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
            .answerKey.documents.length > 0
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

    // this.questionList[userIndex].tempList[tabIndex].list[
    //   questionIndex
    // ].validated = validated;
    if (this.questionList.length > 0) {
      this.questionList[userIndex].tempList[tabIndex].list[
        questionIndex
      ].validated = validated;
      if (
        this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
          .answerKey.input === undefined
      ) {
        // JSON.stringify(
        //   this.questionList[userIndex].tempList[tabIndex].list[questionIndex]
        //     .answerKey
        // ) === JSON.stringify({})
        question = {
          ...question,
          answerKey: {
            ...question.answerKey,
            input: "",
          },
        };
        this.setCurrentQuestion(userIndex, tabIndex, questionIndex, question);
      }
    }
    return validated;
  }

  submitValidation() {
    let disabled: boolean = false;
    for (let i = 0; i < this.questionList.length; i++) {
      for (let j = 0; j < this.questionList[i].tempList.length; j++) {
        for (let k = 0; k < this.questionList[i].tempList[j].list.length; k++) {
          if (this.questionList[i].tempList[j].list[k].validated === false) {
            disabled = true;
          }
        }
      }
    }
    if (this.questionCounter <= 0) {
      disabled = true;
    }
    return disabled;
  }

  clear() {
    this.drawingnew = 0;
    this.signaturePad.clear();
    this.currentSignature = "";

    // $("#signature1").attr("src", "");
    // $("#signature2").attr("src", "");
    $(".showSignature").attr("src", "");
  }

  drawStart1() {
    console.log("begin drawingnew");
  }
  drawComplete1() {
    console.log(this.signaturePad);

    let base64Data = this.signaturePad.toDataURL();
    let base64Datablob: any = this.dataURLtoBlob(base64Data);
    this.currentSignature = this.signaturePad.toDataURL();
    this.drawingnew = 1;
    console.log(this.currentSignature);

    $(".showSignature").attr("src", this.signaturePad.toDataURL());
    // $("#signature2").attr("src", this.signaturePad.toDataURL());
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

  reloadCurrentRoute() {
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate(["cefima/consulting"]);
    });
  }

  generateQuestionPdf() {
    let count = 0;
    let pdfnew: any = new jsPDF("portrait", "pt", "a4");
    var width = pdfnew.internal.pageSize.width;
    let that = this;

    console.log("that.questionList: ", that.questionList);
    for (let k = 0; k < that.questionList.length; k++) {
      for (let j = 0; j < that.questionList[k].tempList.length; j++) {
        // count = count + 1;
        if (that.questionList[k].tempList[j].list.length > 0) {
          count = count + 1;
        }
      }
    }

    $("#loaderouterid").css("display", "block");
    // handlePdf("questionPdf", 0, 0, 1);
    handlePdf("questionPdf", 0, 0, 1);

    async function generateFooter(base64: any) {
      pdfnew.addImage(
        base64,
        "PNG",
        0,
        pdfnew.internal.pageSize.getHeight() - 45,
        pdfnew.internal.pageSize.getWidth(),
        40
      );
    }

    function handlePdf(id: string, nextk: any, nextj: any, counter: any) {
      console.log("calling handlePdf: ", counter);
      $("#questionPdf" + nextk + nextj).css("display", "block");
      pdfnew.html(document.getElementById("questionPdf" + nextk + nextj), {
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
            let context: any = canvas.getContext("2d");
            context.drawImage(image, 0, 0);
            await generateFooter(canvas.toDataURL("image/png").split(",")[1]);
            await pdfnew.save("Test.pdf");
            that.pdfArray.push(pdfnew.output("blob"));
            that.questionList[nextk].tempList[nextj].pdfSaved = true;
            $("#questionPdf" + nextk + nextj).css("display", "none");
            console.log("execute in handle pdf.");
            console.log("counter < count: ", counter < count, counter, count);
            if (counter < count) {
              let nextk = 0;
              let nextj = 0;
              for (let k = 0; k < that.questionList.length; k++) {
                for (let j = 0; j < that.questionList[k].tempList.length; j++) {
                  if (
                    !that.questionList[k].tempList[j].pdfSaved &&
                    that.questionList[k].tempList[j].list.length > 0
                  ) {
                    console.log("inside if condition");
                    nextk = k;
                    nextj = j;
                  }
                }
              }
              // counter++;
              handlePdf("questionPdf", nextk, nextj, counter + 1);

              // console.log("before handlePdf: ", nextk, nextj, counter);
              // if (that.questionList[nextk].tempList[nextj].list.length > 0) {
              //   // handlePdf("questionPdf", nextk, nextj, counter + 1);
              //   console.log("calling myhandlePDF: ", that.questionList);
              //   handlePdf("questionPdf", nextk, nextj, counter);
              // }
            }
            // pdfnew.save("Test.pdf");
            if (counter === count) {
              console.log('here');
              // $("#loaderouterid").css("display", "none");
              // return;
              that.handlePdfUpload();
            }
          };
        },
      });
    }
  }

  async handlePdfUpload() {
    let counter = 1;
    console.log("pdf array", this.pdfArray);
    for (let i = 0; i < this.pdfArray.length; i++) {
      let currentPdf = this.pdfArray[i];
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
              let newtage =
                StringTypeCasting + "," + typeofimage + "," + dateofdocument;
              let data = {
                tags: newtage,
                fileName: `${i}_Antworten`,
              };
              // this.uploadedPdfData = data;
              this.uploadedPdfArray.push({
                pdfData: data,
                pdfId: event.body.document_unique_id,
              });
              if (counter === this.pdfArray.length) {
                // console.log("uploaded pdf array", this.uploadedPdfArray);
                this.handleTabData();
              }
              counter = counter + 1;
          }
        });
    }
  }

  handleTabData() {
    let counter = 0;
    for (let k = 0; k < this.questionList.length; k++) {
      for (let j = 0; j < this.questionList[k].tempList.length; j++) {
        let questionData = {
          tabId: this.questionList[k].tempList[j].tabId,
          userId: this.questionList[k].userId,
          addedBy: this.localData._id,
          questions: this.questionList[k].tempList[j].list,
          docId: this.uploadedPdfArray[counter].pdfId,
          docDetails: this.uploadedPdfArray[counter].pdfData,
          userType: this.questionList[k].userType,
        };
        this.tabDataArray.push(questionData);
        counter = counter + 1;
      }
    }
    console.log("uploaded pdf array", this.uploadedPdfArray);
    console.log("tab data array", this.tabDataArray);

    this.userService
      .addMultipleQuestionAnswer(this.tabDataArray)
      .subscribe((result) => {
        console.log(result);

        $("#loaderouterid").css("display", "none");
        $(".showSignature").attr("src", "");
        this.currentSignature = "";
        $("#QAModalClose").trigger("click");
        Swal.fire({
          position: "center",
          icon: "success",
          allowOutsideClick: false,
          title: "Ihre Daten wurden erfolgreich gespeichert.",
        }).then(() => {
          this.resetMemberList();
          this.resetContractType();
          this.resetTabsList();
          this.resetBranchList();
          this.reloadCurrentRoute();
        });
      });
  }

  handleConsultData() {
    let counter = 0;
    for (let k = 0; k < this.questionList.length; k++) {
      for (let j = 0; j < this.questionList[k].tempList.length; j++) {
        let questionData = {
          producttype_id: this.questionList[k].tempList[j].tabId,
          user_id: this.questionList[k].userId,
          createdBy: this.localData._id,
          questions: this.questionList[k].tempList[j].list,
          docId: this.uploadedPdfArray[counter].pdfId,
          docDetails: this.uploadedPdfArray[counter].pdfData,
          user_type: this.questionList[k].userType,
        };
        this.tabDataArray.push(questionData);
        counter = counter + 1;
      }
    }
    console.log("uploaded pdf array", this.uploadedPdfArray);
    console.log("tab data array", this.tabDataArray);

    this.userService
      .addMultipleConsultData(this.tabDataArray)
      .subscribe((result) => {
        $("#loaderouterid").css("display", "none");
        $(".showSignature").attr("src", "");
        this.currentSignature = "";
        $("#QAModalClose").trigger("click");
        Swal.fire({
          position: "center",
          icon: "success",
          allowOutsideClick: false,
          title: "Ihre Daten wurden erfolgreich gespeichert.",
        }).then(() => {
          this.reloadCurrentRoute();
        });
      });
  }

  // consult() {
  //   $("#loaderouterid").css("display", "block");

  //   let answers: any = [];

  //   for (let i = 0; i < this.selected_producttype_answers.length; i++) {
  //     let answer_data = {
  //       date: this.selected_producttype_answers[i].date,
  //       documents: this.selected_producttype_answers[i].documents,
  //       from_date: this.selected_producttype_answers[i].from_date,
  //       to_date: this.selected_producttype_answers[i].to_date,
  //       input: this.selected_producttype_answers[i].input,
  //       selected_option: this.selected_producttype_answers[i].selected_option,
  //       textarea: this.selected_producttype_answers[i].textarea,
  //     };
  //     answers.push(answer_data);
  //   }
  //   console.log("answer data");
  //   console.log(answers);

  //   let data = {
  //     questions: this.selected_producttype_questions,
  //     answers: answers,
  //     producttype_id: this.selected_producttype.id,
  //     user_id: this.user_id,
  //     user_type: this.user_type,
  //     createdBy: this.localdata._id,
  //   };

  //   this.userService.consult(data).subscribe((result) => {
  //     console.log("Data saved and here is result");
  //     console.log(result);

  //     setTimeout(() => {
  //       $("#loaderouterid").css("display", "none");
  //       $("#close_infopopup").trigger("click");

  //       Swal.fire({
  //         icon: "success",
  //         title: "Beratungsdaten gespeichert.",
  //         html: "Ihre Vorgangsnummer ist: " + result["case_no"],
  //         confirmButtonText: "Ok",
  //         allowOutsideClick: false,
  //       }).then((result) => {
  //         if (result.value) {
  //           this.router.navigate(["/b2b-home"]);
  //         }
  //       });
  //     }, 1000);
  //   });
  // }

  resetMemberList() {
    this.selectedMemberList = [];
  }

  resetContractType() {
    this.contractType = "";
  }

  resetTabsList() {
    this.selectedTabList = [];
  }

  resetBranchList() {
    this.selectedBranchList = [];
    this.branchesOptions = [];
  }

  setBranchesOptions(data: any) {
    this.branchesOptions = data.map((item: any) => {
      return {
        name: item.officename
          ? item.officename
          : `${item.firstname} ${item.lastname}`,
        id: item._id,
      };
    });
    console.log("branches options", this.branchesOptions);
  }

  setBranchList(event: any) {
    console.log("all customer data", this.allCustomerData);

    let branch = this.selectedBranchList.find(
      (item: any) => JSON.stringify(item) === JSON.stringify(event.option.value)
    );
    if (!branch) {
      this.selectedBranchList.push(event.option.value);
      this.setCurrentUserInfo(this.selectedBranchList[0].id);
    }
    this.currentBranch.setValue("");
  }

  deleteBranchFromList(index: any) {
    this.selectedBranchList.splice(index, 1);
  }

  getCaseNumber() {
    $("#loaderouterid").css("display", "block");
    this.userService.getNextCaseNumber().subscribe((result: any) => {
      $("#loaderouterid").css("display", "none");
      this.nextCaseNumber = result;
      console.log("result data", result);
      // console.log("case number", this.nextCaseNumber);
    });
  }

  goBack(stepper: MatStepper) {
    if (stepper.selectedIndex === 3) {
      this.heading = true;
      this.openDialog();
    }
    console.log(stepper.selectedIndex);
    console.log("stepper index prevoius", stepper.selectedIndex);
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    console.log("stepper: ", stepper);
    console.log("Hello: ", stepper.selectedIndex);
    if (stepper.selectedIndex === 1) {
      this.GoNext();
    } else if (stepper.selectedIndex === 2) {
      this.heading = false;
      this.getCaseNumber();
    } else if (stepper.selectedIndex === 3) {
      console.log("func executing");
      $("#questionAnswerModal").show();
      this.open_modal("questionAnswerModal");
      if (this.contractType === "privatkunde") {
        this.getQuestionsForTabs();
      } else if (this.contractType === "firmakunde") {
        this.getQuestionsForProductType();
      }
    }
    console.log("stepper index", stepper.selected);
    stepper.next();
  }

  stepTwo = false

  nextDisabled(stepper: MatStepper) {
    let disabled = false;
    if (stepper.selectedIndex === 0 && this.currentCustomer === "") {
      disabled = true;
    } else if (
      stepper.selectedIndex === 1 &&
      this.selectedBranchList.length === 0 &&
      this.selectedMemberList.length === 0
    ) {
      this.stepTwo = true
      disabled = true;
    } else if (stepper.selectedIndex === 2 && this.contractType === "") {
      disabled = true;
    } else if (
      stepper.selectedIndex === 3 &&
      this.selectedTabList.length === 0 &&
      this.selectedProductTypeList.length === 0
    ) {
      disabled = true;
    }
    return disabled;
  }

  hiddenPrevButton(stepper: MatStepper) {
    let hidden = stepper.selectedIndex === 0 ? true : false;
    return hidden;
  }

  hiddenNextButton(stepper: MatStepper) {
    let hidden =
      stepper.selectedIndex === stepper.steps.length - 1 ? true : false;
    return hidden;
  }

  hiddenLastButton(stepper: MatStepper) {
    let hidden = stepper.selectedIndex === 3 ? false : true;
    return hidden;
  }

  getHeader(stepper: MatStepper) {
    let hidden = stepper.selectedIndex !== 2 ? true : false;
    return hidden;
  }

  answeredCount() {
    let answeredCounter = 0;
    this.questionList.map((item: any) => {
      item.tempList.map((item2: any) => {
        item2.pdfSaved = false;
        item2.list.map((item3: any) => {
          if (item3.validated) {
            answeredCounter = answeredCounter + 1;
          }
        });
      });
    });

    return answeredCounter;
  }

  setNextQuestion(currentObject: any) {
    let count = 0;
    let quesObject = JSON.parse(JSON.stringify(currentObject));
    let userIndex = quesObject.userIndex;
    let tabIndex = quesObject.tabIndex;
    let questionIndex = quesObject.questionIndex;
    let qno = quesObject.qno;

    console.log("ques objewct", quesObject);

    // this.currentQuestionObject = {
    //   userIndex: userIndex,
    //   tabIndex: tabIndex,
    //   questionIndex: questionIndex + 1,
    //   question:
    //     this.questionList[userIndex].tempList[tabIndex].list[questionIndex + 1],
    // };
    // console.log("this.questionList next: ", this.questionList);

    if (
      questionIndex + 1 <
      this.questionList[userIndex].tempList[tabIndex].list.length
    ) {
      questionIndex = questionIndex + 1;
      this.currentQuestionObject = {
        userIndex: userIndex,
        tabIndex: tabIndex,
        questionIndex: questionIndex,
        qno: qno + 1,
        question:
          this.questionList[userIndex].tempList[tabIndex].list[questionIndex],
      };
    } else if (tabIndex + 1 < this.questionList[userIndex].tempList.length) {
      questionIndex = 0;
      tabIndex = tabIndex + 1;
      let question =
        this.questionList[userIndex].tempList[tabIndex].list[questionIndex];
      this.setCurrentQuestion(userIndex, tabIndex, questionIndex, question);

      // me
      this.currentTab = this.questionList[userIndex].tempList[tabIndex].tabId;
      this.tabIndex = tabIndex;
    } else {
      console.log("no more question");
    }
    for (let a = 0; a <= userIndex; a++) {
      for (let b = 0; b <= tabIndex; b++) {
        for (let c = 0; c <= questionIndex; c++) {
          count++;
        }
      }
    }
    this.currentQuestionObject.qno = count;
  }

  setPrevQuestion(currentObject: any) {
    let count = 0;
    let quesObject = JSON.parse(JSON.stringify(currentObject));
    let userIndex = quesObject.userIndex;
    let tabIndex = quesObject.tabIndex;
    let questionIndex = quesObject.questionIndex;
    let qno = quesObject.qno;

    console.log("ques object", quesObject);

    // this.currentQuestionObject = {
    //   userIndex: userIndex,
    //   tabIndex: tabIndex,
    //   questionIndex: questionIndex - 1,
    //   question:
    //     this.questionList[userIndex].tempList[tabIndex].list[questionIndex - 1],
    // };
    // console.log("this.questionList prev: ", this.questionList);

    if (questionIndex - 1 >= 0) {
      questionIndex = questionIndex - 1;
      this.currentQuestionObject = {
        userIndex: userIndex,
        tabIndex: tabIndex,
        questionIndex: questionIndex,
        qno: qno - 1,
        question:
          this.questionList[userIndex].tempList[tabIndex].list[questionIndex],
      };
    } else if (tabIndex - 1 >= 0) {
      tabIndex = tabIndex - 1;
      questionIndex =
        this.questionList[userIndex].tempList[tabIndex].list.length - 1;
      let question =
        this.questionList[userIndex].tempList[tabIndex].list[questionIndex];
      this.setCurrentQuestion(userIndex, tabIndex, questionIndex, question);

      // me
      this.currentTab = this.questionList[userIndex].tempList[tabIndex].tabId;
      this.tabIndex = tabIndex;
    } else {
      console.log("no more question");
    }
    for (let a = 0; a <= userIndex; a++) {
      for (let b = 0; b <= tabIndex; b++) {
        for (let c = 0; c <= questionIndex; c++) {
          count--;
        }
      }
    }
    this.currentQuestionObject.qno = count;
  }


}
