import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { DatePipe } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Observable, startWith, map, first } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';


//final step
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
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  currentUserToParse: any = localStorage.getItem("currentUser")
  localdata = JSON.parse(this.currentUserToParse);
  title: any;
  lastname: any

  customerno: any
  firstname: any
  COMPANYNAME: any
  id: any
  // loginRole = this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles;
  loginRole = localStorage.getItem("currentActiveRole");

  documentList: any;
  myControl = new FormControl('', Validators.required);
  myControlnew = new FormControl();
  myFirmaControlnew = new FormControl()
  customerFormGroup!: FormGroup;
  recordCount!: Number;
  customerList!: any[];
  optionsValue!: any[];
  optionsValuemembers!: any[];
  familymembers!: any[];
  clickMessage!: '';
  error!: String;
  componentname!: String;
  kundetype: any = '';
  // id: String;
  routeParams: any;
  year: any = new Date().getFullYear();
  ShowButton: boolean = true;
  ShowButtonTwo: boolean = true;
  StpperForm: boolean = false;
  showmembers: boolean = false;
  status: boolean = false;
  filteredOptions!: Observable<any>;
  filteredOptionsmembers!: Observable<any>;
  selectedUser = {
    id: "",
  };
  currentid: any;

  sub_customer_id = '';
  sub_sub_customer_id = '';

  companytype: any;

  askquestion!: FormGroup;
  itemToDisplayUnderKunden = ''
  itemToDisplayUnderDokumenttyp = ''
  itemToDisplayUnderProdukttyp = ''
  itemToDisplayUnderProduktPartner = ''


  //for step 2
  kundevalue = ''
  poa = "false";
  slectedUserCompanyname = "";
  slectedUserTitle = "";
  slectedUserFirstname = "";
  slectedUserLastname = "";

  hoverBestands = false
  hoverFremdvertrag = false
  hoverAllgemeines = false
  dokumenttypStep = new FormControl('', Validators.required)
  ProdukttypStep = new FormControl('', Validators.required)

  currentBranch = new FormControl("");
  allBranches: any = [];
  branchesOptions: any = [];
  selectedBranchList: any = [];
  allCustomerData: any = [];
  step2Control = new FormControl('', Validators.required)
  currentUserInfo: any = {};
  optionsValuecompany: any[];

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    if (this.loginRole == "b2b") {
    }
    else {
      this.router.navigate(["/kunde-home"], {
        queryParams: { id: this.currentid },
      });
    }
  }


  onStepChange(event: StepperSelectionEvent) {
    console.log(event.selectedStep);

    if (event.selectedIndex === 3) {

    }
  }

  filtercustomer(success: any, companyName: any) {
    let newsuccess = [];

    console.log("ddd" + success);
    for (let i = 0; i < success.length; i++) {
      let brokerbrandarray = success[i].brokerbrandarray;
      let brokerarray = success[i].brokerarray;
      let a = brokerbrandarray.indexOf(
        companyName.charAt(0).toUpperCase() + companyName.slice(1)
      );
      console.log("ddd" + i);
      console.log("ddd" + a);

      if (a != -1) {
        let brokervaluenew = brokerarray[a];
        console.log("ddd" + brokervaluenew);
        if (brokervaluenew == this.customerno) {
        } else {
          newsuccess.push(i);
        }
      } else {
        newsuccess.push(i);
        console.log("ddd2" + this.customerno);
      }
    }

    console.log(newsuccess);
    for (let i1 = 0; i1 < newsuccess.length; i1++) {
      delete success[newsuccess[i1]];
      // success.splice(newsuccess[i1],1);
    }
    success = success.filter(function () {
      return true;
    });
    return success;
  }

  ngOnInit() {
    const token: any = localStorage.getItem("token")
    this.title = this.userService.getDecodedAccessToken(token)
      .title;
    this.lastname = this.userService.getDecodedAccessToken(
      token
    ).lastname;

    this.customerno = this.userService.getDecodedAccessToken(
      token
    ).customerno;
    this.firstname = this.userService.getDecodedAccessToken(token).firstname;
    this.COMPANYNAME = this.userService.getDecodedAccessToken(
      token
    ).companyname;
    this.id = this.userService.getDecodedAccessToken(token).id;

    this.currentid = this.userService.getDecodedAccessToken(
      token
    ).id;

    this.companytype = this.userService.getDecodedAccessToken(
      token
    ).companytype;

    $("#loaderouterid").css("display", "block");
    this.componentname = "documentupload";
    this.routeParams = this.route?.snapshot?.routeConfig?.path;
    this.userService.getCustomers("cefima", true).subscribe((success: any) => {
      $("#loaderouterid").css("display", "none");
      console.log("documentupload" + JSON.stringify(success));
      this.onGetTaxList(success);
    });
    this.route.queryParams.subscribe(params => {
      const user_id = params['user_id']
      console.log(user_id);
    })
    this.ShowButtonTwo = true
  }


  OpenStpper() {
    console.log("ddddddddddd");
    this.StpperForm = true;
    this.router.navigate(["./cefima/new-user"], {
      queryParams: {
        OnlyNewUser: false,
      },
    });
  }

  LoopingBroker(data: any) {
    console.log(data + "LoopingBrokerLoopingBroker")
    let brokerList = [];
    let CustomerData = this.filtercustomer(data, "cefima");
    console.log(CustomerData + "CustomerDataCustomerData");
    for (let i = 0; i < CustomerData.length; i++) {
      if (CustomerData[i].roles.includes("customer")) {
        if (CustomerData[i].title == 'Firma') {
          console.log("customercustomer" + CustomerData[i].title);
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
          });
        } else {
          console.log("customercustomer" + CustomerData[i].title);
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
    console.log("customercustomer" + brokerList);
    return brokerList;
  }
  LoopingBrokermember(data: any) {
    console.log(JSON.stringify(data) + "LoopingBrokerLoopingBroker")
    let brokerList = [];
    let CustomerData = data;
    console.log(JSON.stringify(CustomerData) + "CustomerDataCustomerData");
    for (let i = 0; i < CustomerData.length; i++) {
      brokerList.push({
        name:
          CustomerData[i].firstname +
          " " +
          CustomerData[i].lastname +
          " (" +
          this.datePipe.transform(CustomerData[i].dateofbirth, 'dd.MM.yyyy') +
          ")",
        id: CustomerData[i]._id
      });


    }
    console.log("customercustomer" + JSON.stringify(brokerList));
    return brokerList;
  }
  onGetTaxList(data: any) {
    this.optionsValue = this.LoopingBroker(data);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

    let that = this;
    if (this.optionsValue.length > 0) {
      for (let count = 0; count < this.optionsValue.length; count++) {
        if (this.optionsValue[count].title == "Firma") {

          console.log(this.optionsValue[count]);

          this.userService.getCustomerCompanies(this.optionsValue[count].id).
            subscribe((companydata: any) => {


              for (let comp_count = 0; comp_count < companydata.length; comp_count++) {
                let temp_company_data = companydata[comp_count];
                temp_company_data.id = companydata[comp_count]._id;
                temp_company_data.name = companydata[comp_count].companyname + " (" + that.optionsValue[count].customerno + ") " + companydata[comp_count].email;
                temp_company_data.title = "Firma";

                this.optionsValue.push(temp_company_data);
              }

              console.log("company data fetched");
              console.log(companydata);

              this.userService.getfamilyMembers(this.optionsValue[count].id).
                subscribe((familydata11: any) => {

                  // for(let family_count = 0;family_count<familydata11.length;family_count++){
                  //   let temp_family_data = familydata11[family_count];
                  //   temp_family_data.id = familydata11[family_count]._id;
                  //   temp_family_data.name = familydata11[family_count].firstname+" "+familydata11[family_count].lastname+" ("+that.optionsValue[count].customerno+") "+familydata11[family_count].email;
                  //   temp_family_data.company_private_customer = "1";

                  //   this.optionsValue.push(temp_family_data);
                  // }


                  if (familydata11.length > 0) {
                    let temp_family_data = familydata11[0];
                    temp_family_data.id = that.optionsValue[count].id;
                    temp_family_data.name = " Haushalt " + familydata11[0].lastname + " (" + that.optionsValue[count].customerno + ") " + familydata11[0].email;

                    temp_family_data.company_customer = "1";

                    this.optionsValue.push(temp_family_data);
                  }

                  this.filteredOptions = this.myControl.valueChanges.pipe(
                    startWith(""),
                    map(value => this._filter(value))
                  );
                });

            });


        }
      }
    }




    //this.optionsValue = data;


    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(""),
    //   map(value => this._filter(value))
    // );
  }
  onGetTaxListmember(data: any) {
    this.optionsValuemembers = this.LoopingBrokermember(data);
    //this.optionsValue = data;
    this.filteredOptionsmembers = this.myControlnew.valueChanges.pipe(
      startWith(""),
      map(value => {
        console.log(value);
        if (value) {
          this.stepper.next()
        }

        return this._filtermember(value)
      })
    );

    this.branchesOptions = this.myFirmaControlnew.valueChanges.pipe(
      startWith(""),
      map(value => {
        console.log('myFirmaControlnew', value);
        if (value) {
          this.stepper.next()
        }

        return this._filtermember(value)
      })
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.optionsValue.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  private _filtermember(value: string) {
    const filterValue = value.toLowerCase();

    return this.optionsValuemembers.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private _filtercompany(value: string) {
    const filterValue = value.toLowerCase();

    return this.optionsValuecompany.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  GoNext() {

    if (this.kundetype == 'Firma' && this.myControl.value) {
      console.log('firma');
      this.kundevalue = this.myControl.value.split('(')[0].trim()
      console.log(this.myControl.value);
      this.userService.savelocaldata(this.kundetype, this.myControl.value.split('(')[0].trim());
    } else if (this.kundetype.includes('Haushalt') && this.myControlnew.value) {
      console.log('hauhsalt');
      this.kundevalue = this.myControlnew.value.split('(')[0].trim()
      console.log(this.myControl.value);
      this.userService.savelocaldata(this.kundetype, this.myControlnew.value.split('(')[0].trim());
    }

  }

  patchnationalityValue(event: any) {
    console.log(this.optionsValue);
    // this.myControlnew.reset();
    this.ShowButtonTwo = true
    if (this.myControl.value != "" || null || undefined) {

      for (let i = 0; i < this.optionsValue.length; i++) {
        if (this.optionsValue[i].name === this.myControl.value) {
          this.id = this.optionsValue[i].id;
          if (this.optionsValue[i].title == 'Firma') {
            this.kundetype = 'Firma';

            console.log("patchnationalityValue" + this.optionsValue[i].title + "if");
            this.showmembers = false;
            this.ShowButton = false;
            console.log('', this.optionsValue[i])
            // if (this.optionsValue[i]?.mainCompany === 0) {
            $("#loaderouterid").css("display", "block");
            console.log('id', this.id);

            this.userService
              .getMainCompanyBranch(this.id)
              .subscribe((branches: any) => {
                console.log("result of branch", branches);
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
                // if (this.myFirmaControlnew.touched == true) {
                //   console.log('toucheed');
                // } else {
                //   console.log('hh');
                //   this.myFirmaControlnew.setValue(" ")
                //   this.myFirmaControlnew.setValue("")
                // }
              })
          } else {
            this.kundetype = 'Haushalt ' + this.optionsValue[i].lastname;
            console.log("patchnationalityValue" + this.optionsValue[i].title + "else");

            $("#loaderouterid").css("display", "block");
            this.userService.getfamilyMembers(this.id)
              .pipe(first())
              .subscribe(

                (familydata11: any) => {
                  $("#loaderouterid").css("display", "none");


                  let selected_customer = this.optionsValue[i];

                  selected_customer._id = selected_customer.id;

                  console.log("look familydata");
                  console.log(familydata11);

                  //familydata11.push(selected_customer);
                  if (selected_customer.company_customer != "1") {
                    familydata11.unshift(selected_customer);
                  }



                  this.familymembers = familydata11;
                  if (this.familymembers.length > 0) {
                    this.ShowButton = false;
                    this.showmembers = true;
                    this.onGetTaxListmember(this.familymembers);
                  } else {
                    this.showmembers = false;
                    this.ShowButton = false;
                  }
                })
          }

        }
      }
      this.stepper.next()

    } else {
      console.log('true1');
      this.ShowButton = true;
      this.showmembers = false;
      this.familymembers = [];
      this.kundetype = '';
    }

    this.myControl.valueChanges.subscribe((data:any) => {
      this.resetStepper()
    })

    let words = this.myControl.value.split(' ');
    words.pop();
    this.itemToDisplayUnderKunden = words.join(' ')

    console.log("patchnationalityValue" + this.myControl.value, this.id);
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
    console.log('event value:', event.trim(), event.trim() != ('' || undefined || null), event == ('' || undefined || null))
    console.log(`subcustomer: ${this.sub_customer_id}`);
    if (event.trim() != ('' || undefined || null)) {
      const filterArray = this.branchesOptions.find(data => data.name == this.myFirmaControlnew.value)
      this.sub_sub_customer_id = filterArray?.id
      console.log(filterArray);
      console.log(`sub_sub_customer_id: ${this.sub_sub_customer_id}`);

      this.step2Control.setValue('value');
      console.log(this.step2Control.valid);
      this.ShowButtonTwo = false
      this.stepper.next()
    } else {
      console.log('true2');
      this.ShowButtonTwo = true
    }

    let branch = this.selectedBranchList?.find(
      (item: any) => JSON.stringify(item) === JSON.stringify(event)
    );
    if (!branch) {
      this.selectedBranchList.push(event);
      this.setCurrentUserInfo(this.selectedBranchList[0]?.id);
    }

  }

  patchmembervalue(event: any) {
    console.log(`subcustomer: ${this.sub_customer_id}`);
    console.log(this.optionsValue);
    console.log(this.myControlnew.value);
    console.log(this.myControlnew.value != null || "");
    console.log(this.myControlnew.value != null && "");

    if (this.myControlnew.value != "" || null || undefined) {
      for (let i = 0; i < this.optionsValuemembers?.length; i++) {
        if (this.optionsValuemembers[i].name === this.myControlnew.value) {
          this.id = this.optionsValuemembers[i].id;
          console.log("patchmembervalue" + JSON.stringify(this.optionsValuemembers[i]));
        }
      }
      this.ShowButtonTwo = false
      this.ShowButton = false;
      this.filteredOptionsmembers?.subscribe(data => {
        const filterArray = data.find((opt: any) => opt.name !== this.myControlnew.value);
        console.log(filterArray);
        this.sub_sub_customer_id = filterArray?.id
      })
      console.log(`sub_sub_customer_id: ${this.sub_sub_customer_id}`);
      this.step2Control.setValue('value');
      console.log(this.step2Control.valid);
      this.stepper.next()

    } else {
      console.log('true2');
      this.ShowButtonTwo = true
      this.ShowButton = true;
    }
    this.filteredOptions.subscribe(data => {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.name == this.myControl.value) {
          this.sub_customer_id = element.id
          console.log(element);
        }
      }
    })

    console.log(`subcustomer: ${this.sub_customer_id}`);

    console.log("patchmembervalue" + this.myControlnew.value, this.id);
  }

  resetStepper(){
    // this.stepper.reset();
    this.myFirmaControlnew.setValue('');
    this.myControlnew.setValue('');
    this.itemToDisplayUnderDokumenttyp = '';
    this.itemToDisplayUnderProduktPartner = '';
    this.itemToDisplayUnderProdukttyp = '';
    this.step2Control.setValue('');
    this.ThirdTypeDoc.setValue("");
    this.ProductsControl.setValue("");
    this.ProductsTypeControl.setValue("");
    this.dokumenttypStep.setValue('');
    this.ProdukttypStep.setValue('')
  }

  GoNext2(document_type: string) {
    this.dokumenttypStep.setValue('value')
    this.itemToDisplayUnderDokumenttyp = document_type
    console.log(document_type);
    this.itemToDisplayUnderProduktPartner = ""
    this.itemToDisplayUnderProdukttyp = ""
    this.document_type = document_type
    setTimeout(() => {
      $('#movetonextstep').trigger("click");
    }, 100);

    this.initToProducctPartner()

  }

  //step 3 : product type *************

  productsOptionsOne: string[] = [
    "Private Haftpflichtversicherung",
    "Hausratversicherung",
    "Glasversicherung",
    "Rohngebaudeversicherung",
    "reiseversicherung",
    "Tierhalterhaftplicht",
    "Sterbegeldversicherung",
    "Berufshaftpflichtversicherung",
    "Rechtsschutzversicherung",
    "Restschuldversicherung",
    "Unfallversicherung",
    "Kfz kaskoversicherung",
    "Private krankenversicherung",
    "Gesetzliche krankenversicherung",
    "Schwere krankheiten_vorsorgeversicherung",
    "Private Rentenversicherung",
    "Lebensversicherung",
    "Riester Rente",
    "Basisrente",
    "Betriebliche Altersversorgung",
    "Berufsunfahigkeitsversicherung",
  ];
  ThirdTypeDocList: string[] = [
    "Erstinformation",
    "Datenschutzeinwilligung",
    "Personalausweis",
    "Reisepass",
    "Fuhrerschein",
    "Vorsorgevollmacht",
    "Betreuungsvollmacht",
    "Patientenverfügung",
    "Sonstiges",
  ];

  ReadyProductsOptions!: string[];
  ReadyProductsTypeOptions!: string[];
  filteredProductsOptions!: Observable<any>;
  filteredProductsTypeOptions!: Observable<any>;
  ProductsControl: FormControl<any> = new FormControl('', Validators.required);
  ProductsTypeControl = new FormControl();
  ThirdTypeDoc: FormControl<any> = new FormControl('', Validators.required);
  ThirdTypeDocOptions!: Observable<any>;
  ShowProductsPartner: boolean = false;
  lastproducttypeid: any = '';
  Links!: string;
  routeParams3: any;
  lastproductpartnerid: any = '';
  ShowButtonStep3: boolean = true;

  producttypeselected: any = "";
  productpartnerselected: any = "";
  document_type!: string;
  document_sub_type = ''
  document_sub_typename = ''
  product_partner = ''
  // from oninit-step3 found no use

  callValueChange(item: string) {
    if (item == 'Produkttyp') {
      if (this.ProductsTypeControl.touched == true) {
        console.log('toucheed');
      } else {
        this.ProductsTypeControl.setValue(" ")
        this.ProductsTypeControl.setValue("")
      }
    } else if (item == 'ThirdTypeDoc'){
      if (this.ThirdTypeDoc.touched == true) {
        console.log('toucheed');
      } else {
        this.ThirdTypeDoc.setValue(" ")
        this.ThirdTypeDoc.setValue("")
      }
    } else if(item = 'ProductsControl') {
      if (this.ProductsControl.touched == true) {
        console.log('toucheed');
      } else {
        this.ProductsControl.setValue(" ")
        this.ProductsControl.setValue("")
      }
    }
  }

  initToProducctPartner() {
    this.ThirdTypeDocOptions = this.ThirdTypeDoc.statusChanges.pipe(
      map((value) => this._filterThirdTypeDoc(value))
    );
    this.ThirdTypeDocOptions = this.ThirdTypeDoc.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterThirdTypeDoc(value))
    );

    this.filteredProductsOptions = this.ProductsControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterstep3(value))
    );

    this.filteredProductsTypeOptions = this.ProductsTypeControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterTypeProducts(value))
    )


    const data = this.userService.getproductpartner().subscribe(
      (success: any) => {
        // if success and error give response
        console.log(JSON.stringify(success))
        this.ReadyProductsOptions = this.LoopingProductsList(success);
        this.ReadyProductsTypeOptions = this.LoopingProductsListType(success);
        console.log("ReadyProductsTypeOptions" + this.ReadyProductsTypeOptions);
        if (success.status == "error") {
          this.error = success.message;
        } else {
          this.customerList = success;
          //this.setPage(1);
          this.recordCount = success.length;
          console.log(this.customerList);
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );






    console.log(
      "this.filteredProductsTypeOptions:" + this.filteredProductsTypeOptions
    );
  }



  LoopingProductsList(data: string | any[]): string[] {
    let ProductsList = [];
    for (let i = 0; i < data.length; i++) {
      ProductsList.push(data[i].company_name);
    }
    return ProductsList;
  }

  LoopingProductsListType(data: string | any[]): any[] {
    let ProductsList = [];
    // for (let i = 0; i < data.length; i++) {
    //   console.log(data[i]);
    //   for (let j = 0; j < data[i].spartedata.length; j++) {
    //     for (let k = 0; k < data[i].spartedata[j].product_type.length; k++) {
    //       ProductsList.push(data[i].spartedata[j].product_type[k]);
    //     }
    //   }
    // }

    // return [...new Set(ProductsList)];
    for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].producttypesinfo.length; k++) {
        console.log("sadfasdfasdf" + data[i].producttypesinfo[k].product_typename);
        ProductsList.push({
          "id": data[i].producttypesinfo[k]._id
          , "name": data[i].producttypesinfo[k].product_typename
        });

      }
    }

    // return [...new Set(ProductsList)];
    console.log("ReadyProductsTypeOptions" + [...new Map(ProductsList.map(item =>
      [item['name'], item])).values()]);

    const datatoReturn = [...new Map(ProductsList.map(item =>
      [item['name'], item])).values()];
    return datatoReturn
  }

  LoopingProductsListTypePatch(data: string | any[], type: string): any {
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
    return [...new Set(ProductsList)];
  }

  GoToUploadSingleDocument() {

    this.userService.savelocaldata(this.kundetype, this.kundevalue, this.producttypeselected, this.productpartnerselected);
    console.log(this.document_type, ':', this.kundetype, ':', this.kundevalue, ':', this.producttypeselected, ':', this.productpartnerselected);
    console.log(this.ThirdTypeDoc.value, ':', this.ProductsControl.value, ';', this.lastproducttypeid, ':', this.lastproductpartnerid, ':', this.ProductsTypeControl.value);

    setTimeout(() => {
      $('#movetonextstep').trigger("click");
    }, 100);
  }


  private _filterstep3(value: any): string[] {
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

  private _filterThirdTypeDoc(value: string): string[] {
    console.log("_filter" + value);
    this.document_sub_type = value
    const filterValue = value.toLowerCase();
    return this.ThirdTypeDocList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterTypeProducts(value: string): any {
    this.itemToDisplayUnderProdukttyp = value
    console.log(value);
    // debugger
    this.document_sub_type = value
    console.log("ProductsControl" , JSON.stringify(value));
    if (typeof value != 'object') {
      const filterValue = value.toLowerCase();

      return this.ReadyProductsTypeOptions?.filter((option: any) =>
        option.name.toLowerCase().includes(filterValue)
      );
    }
  }

  patchProductValue(event: any) {
    this.itemToDisplayUnderProduktPartner = this.ProductsControl.value.name
    console.log("ProductsControl" + this.ProductsControl.value.name);
    if (this.ProductsControl.value.name != "" || null || undefined) {
      if (this.ProductsControl.value.name) {
        this.lastproductpartnerid = this.ProductsControl.value.id;

        this.product_partner = this.ProductsControl.value

        this.productpartnerselected = this.ProductsControl.value.name;

        this.ProductsControl.setValue(this.ProductsControl.value.name)
        this.ShowButtonStep3 = false;
        this.GoToUploadSingleDocument()
        // this.stepper.next()
        console.log(this.product_partner);
      }
    } else {
      this.ProductsControl.setValue("")
      this.ShowButtonStep3 = true;
    }

    this.Links = `/upload-document/${this.id}/${this.document_type}/${this.lastproducttypeid}`;
  }


  ThirdTypeDocValue() {

    this.producttypeselected = this.ThirdTypeDoc.value;

    console.log("ThirdTypeDoc" + this.ThirdTypeDoc.value);
    if (this.ThirdTypeDoc.value?.trim() != "" || null || undefined) {
      if (this.ThirdTypeDoc.value) {
        console.log("ThirdTypeDoc" + this.ThirdTypeDoc.value);
        this.ShowButtonStep3 = false;
        this.itemToDisplayUnderProdukttyp = this.ThirdTypeDoc.value
        this.document_sub_typename = this.ThirdTypeDoc.value
        this.ProdukttypStep.setValue('value')
        this.stepper.next()

      }
    } else {
      this.ShowButtonStep3 = true;
    }

    // this.Links = `/upload-document/${this.id}/${this.document_type}/${this.ProductsControl.value}`;
  }

  patchProductTypeValue(_event: any) {

    this.ReadyProductsOptions = [];
    console.log("ProductsTypeControl" + this.ProductsTypeControl.value.name);
    this.document_sub_typename = this.ProductsTypeControl.value.name
    console.log(this.ProductsTypeControl);
    // debugger
    this.document_sub_type = this.ProductsTypeControl.value.id
    this.itemToDisplayUnderProdukttyp = this.ProductsTypeControl.value.name
    if (this.ProductsTypeControl.value != "" || null || undefined) {
      this.ProdukttypStep.setValue('value')
      this.stepper.next()
      if (this.ProductsTypeControl.value) {
        this.ShowProductsPartner = true;
        this.ReadyProductsOptions =
          this.LoopingProductsListTypePatch(this.customerList, this.ProductsTypeControl.value.
            id);
        this.lastproducttypeid = this.ProductsTypeControl.value.id;
        console.log("ProductsTypeControl" + this.lastproducttypeid);

        // this.ProductTypeArray.push(this.ProductsTypeControl.value);
        // this.producttypenew.push(this.ProductsTypeControl.value);
        // this.lastproducttypeid=this.ProductsTypeControl.value.id;


        this.producttypeselected = this.ProductsTypeControl.value.name;

        this.ProductsTypeControl.setValue(this.ProductsTypeControl.value.name);
        // this.ShowProductsPartner = true;
      }
    } else {
      this.ShowProductsPartner = false;
    }

    // this.clickpp();

  }

  // final step

  finalShowButton = false

  private readonly units: unit[] = ["bytes", "KB", "MB", "GB", "TB", "PB"];
  uploadimage!: boolean;
  filearray: any[] = [];
  filearraynew: any[] = [];
  UploadDone!: boolean;
  UploadError!: boolean;
  showLoader!: boolean;
  ShowPop!: boolean;
  l = 0;

  fileUpload = { status: "", message: "", filePath: "" };
  inputText: any;
  fn: string = "";
  ln: string = "";
  pdffile: any;


  @ViewChild('stepper')
  stepper!: MatStepper;

  addMoreDocument() {
    if (this.kundetype != 'Firma' && this.myControl.value) {
      this.stepper.selectedIndex = 2
    } else {
      this.stepper.selectedIndex = 1
    }
  }

  goToFirstStep() {
    this.stepper.selectedIndex = 0;
    this.itemToDisplayUnderProduktPartner = ''
    this.itemToDisplayUnderProdukttyp = ''
    this.itemToDisplayUnderDokumenttyp = ''
    this.itemToDisplayUnderDokumenttyp = ''
    // this.itemToDisplayUnderKunden = ''
  }


  uploadDocument(values: any, index: any) {

    this.userService
      .getEditUser(this.id)
      .pipe(first())
      .subscribe((userData: any) => {
        console.log(userData);
        this.fn = userData.firstname;
        this.ln = userData.lastname;
      });

    let length = this.filearray.length;
    if (length) this.finalShowButton = false;
    $("#loaderouterid").css("display", "block");
    const formData = new FormData();
    formData.append("document_type", values.document_type);
    formData.append("document_sub_type", values.document_sub_type); // product_type
    formData.append("product_partner", values.product_partner);
    formData.append("user", values.user_id);
    formData.append("sub_customer_id", values.sub_customer_id);
    if (values.sub_sub_customer_id != undefined) {
      formData.append("sub_sub_customer_id", values.sub_sub_customer_id);
    }
    formData.append("companycode", values.companycode);
    formData.append("brand", values.brand);
    formData.append("tags", values.tags);
    formData.append("upload_by", values.upload_by);
    formData.append("ticket_no", values.ticket_no);

    if (values.image !== "") {
      formData.append("document", values.image);
    }
    formData.forEach((value, key) => {
      console.log(`Key: ${key}, Value: ${value}`);
    });
    // debugger

    this.UploadDone = true;
    this.userService
      .callApiMultipart(formData)
      .pipe(first())
      .subscribe(
        (data: any) => {
          //   $("#Success").html(`<div class="alert alert-success" role="alert">
          //   Erfolgreich hochgeladen
          // </div>`);
          //   $("#Success").css("text-align", "center");
          //   $("#Success").css("font-size", "30px");
          console.log("POST Request is successful ", data["_id"]);
          this.UploadDone = true;
        },
        (error) => {
          $("#loaderouterid").css("display", "none");
          this.UploadError = true;
          this.error = error;

          console.log("Error", error);
        },
        () => {
          console.log(length, index);
          if (length == index + 1) {
            $("#loaderouterid").css("display", "none");
            Swal.fire({
              title: ` Möchten Sie für den ausgewählten Kunden  ${this.fn} ${this.ln} weitere Dokumente hochladen?`,
              html: `<div style="width:100%">
                <button id="buttonOne"type="button" style="background: #184397" class="btn button-primary">Ja</button>
                <button id="buttonTwo"type="button" class="btn btn-success">Nein</button>
                <button id="buttonThree"type="button" class="btn btn-dark">Neuer Kunde</button>
                </div>`,
              showConfirmButton: false,
              iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
              confirmButtonText: "Ok",
              confirmButtonColor: '#02a9ed',
              customClass: {
                icon: 'no-border'
              },
            })
              .then((result) => { })
              .catch((err) => { });
            const ButtonOne = document.getElementById("buttonOne");
            ButtonOne?.addEventListener(
              "click",
              function () {
                removepreview("one");
              },
              false
            );
            const ButtonTwo = document.getElementById("buttonTwo");
            ButtonTwo?.addEventListener(
              "click",
              function () {
                removepreview("two");
              },
              false
            );
            const buttonThree = document.getElementById("buttonThree");
            buttonThree?.addEventListener(
              "click",
              function () {
                removepreview("three");
              },
              false
            );
            const removepreview = (e: any) => {
              if (e == "one") {
                console.log(e);

                // this.router.navigate([`./cefima/upload-document`], {
                //   queryParams: { user_id: this.id },
                // });

                this.addMoreDocument()
                Swal.close();
                this.finalShowButton = false;
              } else if (e == "two") {
                console.log(e);
                // this.router.navigate(["./cefima/upload-document"]);
                this.goToFirstStep()
                Swal.close();
                this.finalShowButton = false;
              } else {
                console.log(e);
                this.router.navigate(["./cefima/new-user/"]);

                Swal.close();
                this.finalShowButton = false;
              }
            };
          }
        }
      );
  }

  _handleImageUpload = () => {
    this.userService
      .getLastdocument()
      .pipe(first())
      .subscribe((data: any) => {
        console.log("ticket_no" + data);
        var values: {
          image: string;
          document_type: string;
          document_sub_type: string;
          user_id: string;
          sub_customer_id:string;
          sub_sub_customer_id:string;
          product_partner: string;
          companycode: string;
          brand: string;
          tags: any[]; // Modified to accept any array type
          upload_by: string;
          ticket_no: string;
        } = {
          image: "",
          document_type: "",
          document_sub_type: "",
          user_id: "",
          sub_customer_id: "" ,
          sub_sub_customer_id:"",
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
        console.log("_handleImageUpload" + JSON.stringify(this.filearray));
        this.filearray = this.filearray.filter(function () {
          return true;
        });

        for (let i = 0; i < this.filearray.length; i++) {
          //var document_type = "Allgemeines Dokument";
          let url = this.filearray[i];
          let reader = new FileReader();
          let extension = url.name.substr(url.name.lastIndexOf(".") + 1);
          if (extension == 'svg') {
            Swal.fire({
              title: 'File Format Error',
              text: 'Please upload a Valid document',
              icon: 'warning',
            })
            return
          }
          reader.readAsDataURL(url);
          reader.onload = () => {
            // this.fileName = url.name + " " + url.type;
            let base64ImgString = (reader.result as string).split(",")[1];
            if (
              extension == "PDF" ||
              extension == "pdf" ||
              extension == "pdfx" ||
              extension == "docx" ||
              extension == "doc" ||
              extension == "DOCX" ||
              extension == "txt" ||
              extension == "TXT"
            ) {
              console.log(this.document_sub_type);

              let product_partnerid: any = this.product_partner
              let StringTypeCasting = Math.round(this.filearray[i].size / 1024);
              let MainType = this.filearray[i].type;
              let Date = this.filearray[i].lastModified;
              console.log("this.StringTypeCasting " + StringTypeCasting);
              values.image = this.filearray[i];
              values.document_type = this.document_type;
              values.document_sub_type = this.lastproducttypeid;
              values.user_id = this.id;
              values.sub_customer_id = this.sub_customer_id
              if (this.myControlnew != undefined) {
                values.sub_sub_customer_id = this.sub_sub_customer_id
              } else {
                values.sub_sub_customer_id = this.sub_sub_customer_id
              }
              values.product_partner = this.product_partner
                ? product_partnerid.id
                : " ";
              values.companycode = "42140 DFG Finanzprofi GmbH";
              values.brand = "cefima";
              values.upload_by = "cefima_document";
              values.ticket_no = "40-ce-" + data;

              values.tags.push(StringTypeCasting.toString());
              values.tags.push(MainType);
              values.tags.push(Date);
              console.log(values);
              debugger
              this.uploadDocument(values, i);
              values.tags = [];
              this.showLoader = true;
              this.showLoader = false;
              this.ShowPop = true;
              console.log(values);
            } else {
              var widthnew = width - 300;
              var widthnew1 = widthnew / 2;
              var heightnew = height - 180;
              var heightnew1 = heightnew / 2;
              doc.addImage(base64ImgString, 50, 50, width - 100, height - 100);

              if (i == this.filearray.length - 1) {
                //  doc.save("a4.pdf");
                this.pdffile = doc.output("blob");

                console.log(this.pdffile.Size);

                let StringTypeCasting = Math.round(
                  this.filearray[i].size / 1024
                );
                let product_partnerid: any = this.product_partner
                let MainType = this.filearray[i].type;
                //let Date = this.filearray[i].lastModified;
                let typeofimage = "application/pdf";
                let dateofdocument = new Date().getTime();
                values.image = this.pdffile;
                console.log("this.StringTypeCasting " + StringTypeCasting);
                // values.image = this.filearray[i];
                values.document_type = this.document_type;
                values.document_sub_type = this.lastproducttypeid;
                values.user_id = this.id;
                values.sub_customer_id = this.sub_customer_id
                if (this.myControlnew != undefined) {
                  values.sub_sub_customer_id = this.sub_sub_customer_id
                } else {
                  values.sub_sub_customer_id = this.sub_sub_customer_id
                }
                values.product_partner = this.product_partner
                  ? product_partnerid.id
                  : " ";
                values.companycode = "42140 DFG Finanzprofi GmbH";
                values.brand = "cefima";
                values.upload_by = "cefima_document";
                values.ticket_no = "40-ce-" + data;

                values.tags.push(StringTypeCasting.toString());
                //values.tags.push(MainType);
                // values.tags.push(Date);
                values.tags.push(typeofimage);
                values.tags.push(dateofdocument);
                console.log(values);
                debugger
                this.uploadDocument(values, i);
                values.tags = [];

                console.log(values);
              } else {
                doc.addPage();
              }
            }
          };
        }
        $(".pip").remove();

        // this.finalShowButton = false;

        this.filearraynew = [];
      });
  };

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
  source = ''

  handleImageChange(event: any) {
    $("#result").html("");
    event.preventDefault();


    const previewData = (source: any, modaltitle: any) => {
      console.log("previewData" + source);

      // $('#openpreviewmodel').trigger('click');
      // this.open_modal('exampleModalpreview')
      //$('#showpreviewpdf').attr('src',this.previewidandsrc[j]);

      $('#showpreviewtitle').html("<b>Dokumentenname: </b>" + modaltitle);
      $('#showpreviewdownload').attr('href', source);

      if (source.indexOf('data:application/pdf;') != -1) {
        this.source = source
        // const base64 = source.replace(/^data:.+;base64,/, "");

        // const blob = base64ToBlob(base64, 'application/pdf');
        // const url = URL.createObjectURL(blob);
        // const pdfWindow = window.open("");
        // pdfWindow?.document.write("<iframe width='100%' height='100%' src='" + url + "'></iframe>");

        // function base64ToBlob(base64: string, type = "application/octet-stream") {
        //   console.log(base64);
        //   const binStr = atob(base64 as string);
        //   const len = binStr.length;
        //   const arr = new Uint8Array(len);
        //   for (let i = 0; i < len; i++) {
        //     arr[i] = binStr.charCodeAt(i);
        //   }
        //   return new Blob([arr], { type: type });
        // }
        setTimeout(() => {
          $('#openpreviewmodel').trigger('click');
          this.open_modal('exampleModalpreview')

          $('#showpreviewimg').attr('src', '');
          $('#showpreviewimg').css('display', 'none');

          $('#showpreviewpdf').attr('src', '');
          $('#showpreviewpdf').css('display', 'block');
          $('#showpreviewpdf').attr('src', source);
        }, 500);


      } else {

        $('#openpreviewmodel').trigger('click');
        this.open_modal('exampleModalpreview')

        $('#showpreviewpdf').attr('src', '');
        $('#showpreviewpdf').css('display', 'none');

        $('#showpreviewimg').attr('src', '');
        $('#showpreviewimg').css('display', 'block');
        $('#showpreviewimg').attr('src', source);
      }
    };


    const removeData = (j: any) => {
      console.log(j);

      console.log("dsfsfdsf" + j);
      console.log(this.filearraynew.length);
      console.log(this.filearraynew);
      // this.filearraynew.splice(j, 1);
      delete this.filearraynew[j];
      console.log(this.filearraynew);

      console.log(this.filearraynew.length);

      let newfilearray = this.filearraynew.filter(function () {
        return true;
      });
      if (newfilearray.length > 0) {
        // this.finalShowButton = true;
      } else {
        this.finalShowButton = false;
      }
      console.log("dsfsfdsf" + newfilearray);
      this.filearray = newfilearray;
    };

    var files = event.target.files; //FileList object

    var filesLength = files.length;

    if (filesLength) {
      this.finalShowButton = true;
    }

    for (let i = 0; i < filesLength; i++) {
      let f = files[i];
      let extension = f.name.substr(f.name.lastIndexOf(".") + 1);
      console.log(extension);
      if (extension == 'svg') {
        Swal.fire({
          title: 'File Format Error',
          text: 'Please upload a Valid document',
          icon: 'warning',
        })
        return
      }
      let newsize = this.l;
      this.l = this.l + 1;
      this.filearraynew.push(f);
      let Size1 = f.size;
      let Size = this.dataconvert(Size1);

      this.filearray = this.filearraynew;
      console.log("this.filearraynew" + this.filearraynew);
      console.log("this.filearray " + this.filearray);

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
        // var d = new Date(dateofdocument);
        // var date =
        // d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

        var d = new Date(dateofdocument).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        var date = d.replace(/[/]/g, ".");

        // let Size = Math.round(f.size / 1024);




        $(
          '<div class="pip col-md-4 p-0  " style="display: inline-block;" "id=\'pipremove' +
          newsize +
          "'>" +
          '<div class="col-md-11 p-0 d-flex m-1 flex-raw" style="border: 1px solid #cdcdcd;border-radius:9px;">' +

          '<div class="col-md-2 py-0 px-2 d-flex align-items-center justify-content-center ">' +
          '<img class="imageThumb" style="width: 50px;height:30px;" src="' + ImageName + '" title="' + f.name + '"/>' +
          '</div>' +
          '<div class="col-md-8 p-0" style="font-size:11px; padding:1px">' +
          "<div> <b class='limitword' title='" + f.name + "'>Dokumentenname: " + f.name + "</b> </div>" +
          "<div> <b>Dateigröße: " + Size + "</b>  </div>" +
          "<div> <b class='limitword'>Dateityp: " + typeofimage + "</b> </div>" +
          "<div> <b>Datum des Dokuments: " + date + "</b> </div>" +
          "</div>" +


          '<div class="col-md-2 text-right d-flex flex-column p-0 align-items-center justify-content-center ">' +
          '<div class=" p-0 ">' +
          '<div class="removepreview btn bg-danger links " id="removepreviewid' + newsize + '" style="cursor: pointer;padding:1px 4px" ><i class="fas fa-times text-white "  aria-hidden="true"></i></div>' +
          '</div>' +

          "<div class=' p-0 mt-1'>" +
          '<div class="previewdoc btn links  " data-doc_name="' + f.name + '" data-preview_source="' + (e.target as any).result + '" id="previewdoc' + newsize + '" style="cursor: pointer; background: linear-gradient(#17459b, #02a9ed);padding:1px "><i class="fa fa-eye  text-white" aria-hidden="true"></i> ' +
          ' </div>' +
          "</div>" +
          '</div>' +

          "</div>" +

          "<div class='col-md-12 p-0 mt-2'>" +
          '<div class="progress form-group " id="progressnew' + newsize + i + '" style="background-color: grey;width: 100%;"> ' +
          '<div class="percentageclass' + newsize + i + ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' + newsize + i + '" [style.width.%]=""> </div>' +
          ' </div>' +
          "</div>" +

          "</div>"
        ).insertAfter("#result");





        $('.previewdoc').click(function (event) {
          previewData($(this).data('preview_source'), $(this).data('doc_name'));
          event.stopPropagation();
          event.stopImmediatePropagation();
        })


        // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> KB </div>`).insertAfter(".pip")
        $("#removepreviewid" + newsize).click(function () {
          removeData(newsize);
          // $("#pipremove" + i).remove();
          $(this).parent().parent().parent().parent(".pip").remove();
        });
      };
      fileReader.readAsDataURL(f);


      const formData = new FormData();
      formData.append("document", f);
      formData.forEach((value, key) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });
      // debugger
      this.userService.uploaddocumentwithoutticketno(formData)
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {

            case HttpEventType.Sent:
              console.log('Request has been made!');

              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              if (event.total) {
                $('div.percentageclass' + newsize + i).width(Math.round((event.loaded / event.total) * 100) + "%");
                $('div.percentageclass' + newsize + i).html(Math.round((event.loaded / event.total) * 100) + "%");
              }
              break;
            case HttpEventType.Response:

              setTimeout(() => {
                $('div.percentageclass' + newsize + i).width("0%");
                $('#progressnew' + newsize + i).css("display", "none");
              }, 500);

          }
        })

    }
    console.log(this.filearraynew);
  }

  open_modal(modal_id: any) {
    $('#' + modal_id).appendTo("body");
  }
  close_modal(modal_id: any, append_to: any) {
    $('#' + modal_id).appendTo("#" + append_to);
  }


}
