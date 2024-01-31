import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userData: any = localStorage.getItem("currentUser");
  role: any = localStorage.getItem("currentActiveRole");

  opened_page_title: any = "";
  selectedUser = {
    id: "",
  };

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.change_page_title();
    this.router.events.subscribe((val) => {
      this.change_page_title();
    });

    this.userData = JSON.parse(this.userData);
    this.selectedUser.id = this.userData._id;
    // console.log("router url", this.router.url);
  }

  getUserData(key){
    let User = JSON.parse(localStorage.getItem('currentUser'));
    return User[key];
  }

  change_page_title() {
    if (this.router.url.includes("country-management")) {
      this.opened_page_title = "Länder Management";
    } else if (this.router.url.includes("mediacloud")) {
      this.opened_page_title = "Media Cloud";
    } else if (this.router.url.includes("media_upload")) {
      this.opened_page_title = "Media Upload";
    } else if (this.router.url.includes("customer-managment")) {
      this.opened_page_title = "Benutzer Management";
    } else if (this.router.url.includes("meine-daten")) {
      this.opened_page_title = "Meine Daten";
    } else if (this.router.url.includes("new-user")) {
      this.opened_page_title = "Benutzer Hinzufügen";
    } else if (this.router.url.includes("companies-management")) {
      this.opened_page_title = "Unternehmensmanagement";
    } else if (this.router.url.includes("add-neoloop-company")) {
      this.opened_page_title = "Unternehmens Hinzufügen";
    } else if (this.router.url.includes("module-management")) {
      this.opened_page_title = "NEOLOOP Produkte / Modul Management";
    } else if (this.router.url.includes("add-module")) {
      this.opened_page_title = "NEOLOOP Produkte / Modul Hinzufügen";
    } else if (this.router.url.includes("subscription-management")) {
      this.opened_page_title = "NEOLOOP Produkte / Abo Management";
    } else if (this.router.url.includes("add-module-subscription")) {
      this.opened_page_title = "NEOLOOP Produkte / Abo Hinzufügen";
    } else if (this.router.url.includes("customer")) {
      this.opened_page_title = "Kunden";
    } else if (this.router.url.includes("kunde-home")) {
      this.opened_page_title = "Kunde Home";
    } else if (this.router.url.includes("b2b-dashboard")) {
      this.opened_page_title = "B2B Dashboard";
    } else if (this.router.url.includes("consulting")) {
      this.opened_page_title = "Beratung ";
    } else {
      this.opened_page_title = "Neoloop";
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentActiveRole");
    this.router.navigate(["./"]);
  }

  navigateWithb2bID() {
    this.router.navigate(["/cefima/b2b-dashboard"], {
      queryParams: { id: this.selectedUser.id },
    });
  }
}
