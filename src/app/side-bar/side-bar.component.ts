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
export class SideBarComponent implements OnInit, AfterViewInit {



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
        console.log('customerid', this.customerid);
        this.userService.getEditUser(this.customerid).pipe(first()).subscribe((data: any) => {
          this.localData = data
          console.log('localData', data);
        })
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
            });
        }, 500);

        this.userService
          .getUserCompanyOffices(this.customerid)
          .pipe(first())
          .subscribe((userofficedata: any) => {
            this.userofficeData = userofficedata;
          });

      }

      console.log(!this.localData.hasOwnProperty('companytype') ||
        this.localData.companytype == ' ' ||
        this.localData.companytype == '' ||
        this.localData.companytype == null);

      console.log(this.localData.lastname);
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






  }


  ngAfterViewInit(): void {

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

  clikeditem(item:string){
    this.userService.selectCustomerSideItem.next(item)
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
    console.log("office data", office);
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
      this.userService.invokeFunctionInCustomerSide.next(['change_account_name',type, title, 
      firstname, lastname_or_company, user_id])
      // this.fetch_consulting_data(user_id);
    } else {
      this.header_title = title;
      this.header_companyname = lastname_or_company;
      this.header_firstname = "";
      this.header_lastname = "";
      this.userService.invokeFunctionInCustomerSide.next(['change_account_name',type, title, 
      firstname, lastname_or_company, user_id])
    }

  }


  tabisclicked(event: any) {
    this.header_title = "Firma";
    this.header_companyname = event.companyname;
    this.header_firstname = "";
    this.header_lastname = "";

    this.officeData = [];
    console.log("tabisclicked" + JSON.stringify(event));
    setTimeout(() => {
      this.userService
      .getCompanyOffices(event._id)
      .pipe(first())
      .subscribe((officeData: any) => {
        this.officeData = officeData;

        console.log("officeData" + JSON.stringify(officeData));
      });
    }, 300);

    const eventdata = {
         _id: event._id,
         companyname : event.companyname
    }
   
      this.userService.invokeFunctionInCustomerSide.next(['tabisclicked',eventdata])
  }

  savecompanyId(companydata: any){
    this.userService.invokeFunctionInCustomerSide.next(['savecompanyId',companydata])
  }

  remove_border(btnid: any){
    this.userService.invokeFunctionInCustomerSide.next(['remove_border',btnid])
  }

  DateRender(id: string) {
    this.userService.modalIdfromSidebar.next(id)
  }

  close_modal(modal_id: any, append_to: any) {
    $('#' + modal_id).appendTo("#" + append_to);
  }
}
