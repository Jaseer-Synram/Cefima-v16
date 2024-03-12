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

  localData: any = JSON.parse(localStorage.getItem("currentUser"));
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



  constructor(public router: Router,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.customerid = params["id"];

    });

    this.userService.invokeSideBarRouteFether.subscribe(data => {


      if (data) {
        this.route.queryParams.subscribe((params) => {
          this.customerid = params["id"];
        });
        // console.log('customerid', this.customerid);
        if(this.customerid)
        this.userService.getEditUser(this.customerid).pipe(first()).subscribe((data: any) => {
          this.localData = data
        });
      } else {
        this.localData = ''
      }

      if (this.customerid) {
        this.userService
          .getCustomerCompanies(this.customerid)
          .pipe(first())
          .subscribe((companydata: any) => {
            this.companyData = companydata;

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
              this.familyData = familydata11;
              // console.log('familyData', this.familyData);
            });
        }, 500);

        this.userService
          .getUserCompanyOffices(this.customerid)
          .pipe(first())
          .subscribe((userofficedata: any) => {
            this.userofficeData = userofficedata;
            // console.log('officedata', this.userofficeData);
          });

      }

      // console.log(this.localData.lastname);
      this.currentActiveRole = localStorage.getItem("currentActiveRole")


    })
  }

  ngOnInit(): void {
    // this.userService.get_all_companies().subscribe((result)=>{
    //   console.log("All companies in side bar");
    //   console.log(result);
    //   this.all_companies = result;
    //   this.all_companies.map(company=>{
    //     this.showSubmenu[company._id] = false;
    //   })
    // });

    this.route.queryParams.subscribe((params) => {
      this.customerid = params["id"];
    });

    if (this.currentTab == "") {
      if (this.router.url == '/cefima/b2b-dashboard') {
        setTimeout(() => {
          this.clickedBroker('Unternehmensdaten', 'Unternehmensdaten')
        }, 30);
      }
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
    console.log(`id :${id},    item :${item},   subid : ${subid}`);
    this.indexOfHideValues = index
    this.currentTab = item
    this.indexOfHideValuesj = indexj

    this.userService.heeaderData.next(['Kunden', data])
    this.userService.selectCustomerSideItem.next([id, item, index, subid, indexj])
  }

  clickedBroker(item: string, data: string) {
    setTimeout(() => {
      this.userService.heeaderData.next([data])
      this.currentTab = `Verwaltung.${item}`
      this.userService.b2bDashboardItem.next([item])
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
    // debugger
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

          // console.log("officeData" + JSON.stringify(officeData));
          // debugger
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
    // console.log(item);
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
