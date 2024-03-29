import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { first } from 'rxjs';
import * as intlTelInput from 'intl-tel-input';
import { data } from 'jquery';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {



  isExpanded = true;
  showSubmenu: any = [];
  isShowing = false;
  showSubSubMenu: boolean = false;
  all_companies: any = [];

  // For Kunden Dashboard

  header_title: any
  header_firstname: any
  header_lastname: any
  header_companyname: any

  localData: any
  currentTabUser: any = JSON.parse(localStorage.getItem("currentUser"));
  currentActiveRole = localStorage.getItem("currentActiveRole");


  consulting_data: any = [];

  objekte_questions: any = [];
  gesundheitsangaben_questions: any = [];
  einkommen_questions: any = [];

  objekte_answers: any = [];
  gesundheitsangaben_answers: any = [];
  einkommen_answers: any = [];

  companyData: any = [];
  familyData: any = [];
  userofficeData: any = [];


  selectedUser: any = {
    customerno: "",
    _id: "",
    roles: [],
    companies_with_roles: [],
  };

  customerid: any;
  officeData: any = [];

  currentTab = ''
  isProductPartner = false
  isProductPartnerInnerExpanded = false

  constructor(public router: Router,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      if (params["id"]) {
        this.customerid = params["id"];
      }
    });
    function fetchId() {
      if (this.customerid && this.customerid != undefined && this.customerid != null && this.customerid != '') {
        this.route.queryParams.subscribe((params) => {
          this.customerid = params["id"];
        });
        console.log('customerid : ', this.customerid);
      }
    }

    this.userService.invokeSideBarRouteFether.subscribe((data) => {

      this.route.queryParams.subscribe((params) => {
        this.customerid = params["id"];
      });
      console.log('customerid : ', this.customerid);

      if (this.customerid != undefined && this.customerid != null && this.customerid != '') {

        // $("#loaderouterid").css("display", "block");
        this.userService.getEditUser(this.customerid).subscribe((EditUser: any) => {
          // $("#loaderouterid").css("display", "none");

          this.userService.editUserData.next(EditUser)
          console.log(EditUser);
          this.localData = EditUser

          getCustomerCompanies()
        }, (error: any) => {
          console.log('error 85:', error);
        })

        const getCustomerCompanies = () => {
          this.userService
            .getCustomerCompanies(this.customerid)
            .pipe(first())
            .subscribe((companydata: any) => {
              this.companyData = companydata;
              this.userService.customerCompaniesData.next(companydata)
              getfamilyMembers()
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
            }, (error: any) => {
              console.log('error 127:', error);
            });
        }


        const getfamilyMembers = () => {
          this.userService
            .getfamilyMembers(this.customerid)
            .pipe(first())
            .subscribe((familydata11: any) => {
              this.familyData = familydata11;
              this.userService.familyMembersData.next(familydata11)
              getUserCompanyOffices()
              // console.log('familyData', this.familyData);
            }, (error: any) => {
              console.log('error 140:', error);
            });
        }

        const getUserCompanyOffices = () => {
          this.userService
            .getUserCompanyOffices(this.customerid)
            .pipe(first())
            .subscribe((userofficedata: any) => {
              this.userofficeData = userofficedata;
              this.userService.userCompanyOfficesData.next(userofficedata);
              // console.log('officedata', this.userofficeData);
            }, (error: any) => {
              console.log('error 148:', error);
            });

        }

      } else {
        if (this.router.url.includes("kunde-home")) {
          fetchId()
        }
      }

      this.currentActiveRole = localStorage.getItem("currentActiveRole")

    })
  }



  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.customerid = params["id"];
    });

    if (this.currentTab == "") {
      if (this.router.url == '/cefima/b2b-dashboard') {
        setTimeout(() => {
          this.clickedBroker('Unternehmensdaten', 'Unternehmensdaten')
        }, 30);
      } else if(this.router.url == '/cefima/product-partner-cases'){
        setTimeout(() => {
          this.clickedPartner('Anfragen','Anfragen/Vorgange')
        }, 30);
      }
    }

    this.isProductPartnerInnerExpanded = false

    if (this.router.url.includes("product-partner")) {
      this.isProductPartner = true;
    } else {
      this.isProductPartner = false
    }
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  indexOfHideValuesj: any = -1
  indexOfHideValues: any = -1
  clikeditem(id: string, item: string, data: string, index?: number, subid = '', indexj?: number) {

    if (this.localData != undefined) {
      console.log(`id :${id},    item :${item}, data :${data} , index: ${index}, subid : ${subid}, indexj:${indexj}`);
      console.log(this.customerid);


      this.indexOfHideValues = index
      this.currentTab = item
      this.indexOfHideValuesj = indexj
      this.userService.heeaderData.next(['Kunden', data])
      this.userService.selectCustomerSideItem.next([id, item, index, subid, indexj])
    } else {
      setInterval(() => {
        if (this.localData != undefined) {
          recaller()
        }
      }, 100)
      const recaller = () => {
        if (!this.localData.hasOwnProperty('companytype') ||
          this.localData.companytype == ' ' || this.localData.companytype == '' ||
          this.localData.companytype == null) {
          $('#haushaltMainBtn').trigger('click')
        } else if (this.localData.companytype ==
          'Eingetragener Kaufmann (e.K.)' || this.localData.companytype == 'Einzelunternehmen') {
          $('#firmaMainBtn').trigger('click')
        } else {
          $('#firmaMultiMainBtn').trigger('click')
        }
      }

    }

  }

  clickedBroker(item: string, data: string) {
    setTimeout(() => {
      this.userService.heeaderData.next([data])
      this.currentTab = `Verwaltung.${item}`
      this.userService.b2bDashboardItem.next([item])
    }, 200);
  }

  clickedPartner(item: string, data: string, child='') {
    console.log(item,':',data,':',child);

    setTimeout(() => {
      if (child == '') {
        this.userService.heeaderData.next([data])
        this.userService.productPartnerItem.next([item])
        this.currentTab = `Produktpartner.${item}`
      } else {
        this.userService.heeaderData.next([child])
        this.userService.productPartnerItem.next([item,child])
        this.currentTab = `Produktpartner.${item}.${child}`
      }


    }, 200);
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
    this.userService.invokeFunctionInCustomerSide.next(['setCurrentTabUser', office, type])
    // console.log("office data", office);
    //
  }



  change_account_name(
    type: any,
    title: any,
    firstname: any,
    lastname_or_company: any,
    user_id: any = ""
  ) {
    // console.log("tab clicked");
    // console.log("current tab User", this.currentTabUser);

    if (type == "Haushalt") {
      this.header_title = title;
      this.header_firstname = firstname;
      this.header_lastname = lastname_or_company;
      this.header_companyname = "";
      this.userService.invokeFunctionInCustomerSide.next(['change_account_name', type, title,
        firstname, lastname_or_company, user_id])
      // this.fetch_consulting_data(user_id);
    } else {
      this.header_title = title;
      this.header_companyname = lastname_or_company;
      this.header_firstname = "";
      this.header_lastname = "";
      this.userService.invokeFunctionInCustomerSide.next(['change_account_name', type, title,
        firstname, lastname_or_company, user_id])
    }

  }


  tabisclicked(event: any) {
    this.header_title = "Firma";
    this.header_companyname = event.companyname;
    this.header_firstname = "";
    this.header_lastname = "";

    this.officeData = [];
    // console.log("tabisclicked" + JSON.stringify(event));
    setTimeout(() => {
      this.userService
        .getCompanyOffices(event._id)
        .pipe(first())
        .subscribe((officeData: any) => {
          this.officeData = officeData;

        });
    }, 300);

    // const eventdata = event

    this.userService.invokeFunctionInCustomerSide.next(['tabisclicked', event])
  }

  savecompanyId(companydata: any) {
    this.userService.invokeFunctionInCustomerSide.next(['savecompanyId', companydata])
  }

  remove_border(btnid: any) {
    this.userService.invokeFunctionInCustomerSide.next(['remove_border', btnid])
  }

  DateRender(id: string, item: string) {
    this.currentTab = item
    console.log(item);
    let headerData = ''
    if (item.includes('Betriebsstätte')) {
      headerData = 'Betriebsstätte hinzufügen'
    } else if (item.includes('Unternehmen')) {
      headerData = 'Unternehmen hinzufügen'
    } else if (item.includes('Mitglied')) {
      headerData = 'Mitglied zum Haushalt hinzufügen'
    } else if (item.includes('Kundentyp')) {
      headerData = 'Kundentyp hinzufügen'
    }
    this.userService.heeaderData.next(['Kunden', headerData])

    this.userService.modalIdfromSidebar.next(id)
  }

  close_modal(modal_id: any, append_to: any) {
    $('#' + modal_id).appendTo("#" + append_to);
  }
}
