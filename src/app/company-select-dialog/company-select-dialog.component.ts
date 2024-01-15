import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-select-dialog',
  templateUrl: './company-select-dialog.component.html',
  styleUrls: ['./company-select-dialog.component.css']
})
export class CompanySelectDialogComponent  implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CompanySelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  isSuperAdmin = localStorage.getItem('currentActiveRole') == 'superadmin';
  calledFrom :any
  roleName: any;
  existingCompanies: any;
  isSubmitDisabled = true;

  companiesArray = [
    {
      name: 'cefima',
      image: "../assets/logo's-04.png",
    },
    {
      name: 'fiorettoimmob',
      image: "../assets/logo's-02.png",
    },
    {
      name: 'birema',
      image: "../assets/logo's-07.png",
    },
    {
      name: 'fiorettomedia',
      image: '../assets/FIORETTO-MEDIA-V3.png',
    },
    {
      name: 'airmage',
      image: "../assets/logo's-06.png",
    },
    // {
    //   "name": "horaidetektei",
    //   "image": "../assets/logo's-03.png"
    // },
    {
      name: 'varioimport',
      image: "../assets/logo's-05.png",
    },
    {
      name: 'sterbvorsoge',
      image: "../assets/logo's-09.png",
    },
    {
      name: 'checkntrack',
      image: "../assets/logo's-01-v3.png",
    },
  ];
  firstRowArray: any = [];
  secondRowArray: any = [];
  thirdRowArray: any = [];
  allCompanies: any = {
    cefima: false,
    fiorettoimmob: false,
    birema: false,
    fiorettomedia: false,
    airmage: false,
    horaidetektei: false,
    varioimport: false,
    sterbvorsoge: false,
    checkntrack: false,
  };

  selectedCompanies: any = [];
  onCompanyChange(event: any) {
    console.log('onCompanyChange' + event.source.value);
    if (event.checked) {
      this.allCompanies[event.source.value] =
        this.calledFrom == 'update' ? 2 : true;
      this.selectedCompanies.push(event.source.value);
      console.log(this.selectedCompanies);
    } else {
      if (event.source.value) {
        let companyName = event.source.value;
        this.allCompanies[companyName] = false;
        this.selectedCompanies.splice(
          this.selectedCompanies.indexOf(companyName),
          1
        );
      }
    }

    if (this.calledFrom == 'update') {
      if (!this.data.companies) {
        this.data.companies = [];
      }
      this.isSubmitDisabled =
        JSON.stringify(this.data.companies.sort()) ==
        JSON.stringify(this.selectedCompanies.sort());
    } else {
      if (this.selectedCompanies.length == 0) {
        this.isSubmitDisabled = true;
      } else {
        this.isSubmitDisabled = false;
      }
    }
  }

  selectCompany(companyName: any) {
    console.log(this.isSubmitDisabled);
    if (!this.disableCompanies[companyName]) {
      if (this.selectedCompanies.includes(companyName)) {
        this.allCompanies[companyName] = false;
        this.selectedCompanies.splice(
          this.selectedCompanies.indexOf(companyName),
          1
        );
      } else {
        this.allCompanies[companyName] = this.calledFrom == 'update' ? 2 : true;
        this.selectedCompanies.push(companyName);
      }
    }
    if (this.calledFrom == 'update') {
      if (!this.data.companies) {
        this.data.companies = [];
      }
      this.isSubmitDisabled =
        JSON.stringify(this.data.companies.sort()) ==
        JSON.stringify(this.selectedCompanies.sort());
      console.log(this.isSubmitDisabled);
    } else {
      if (this.selectedCompanies.length == 0) {
        this.isSubmitDisabled = true;
      } else {
        this.isSubmitDisabled = false;
      }
    }
  }

  allCompaniesArray: any = [];
  companyArray = [];
  disableCompanies: any = {
    cefima: true,
    fiorettoimmob: true,
    birema: true,
    fiorettomedia: true,
    airmage: true,
    horaidetektei: false,
    varioimport: true,
    sterbvorsoge: true,
    checkntrack: true,
  };
  ngOnInit() {
    console.log(this.data);
    this.calledFrom = this.data.calledFrom;
    this.roleName = this.data.roleName;
    if (this.data.disableCompanies && this.data.disableCompanies.length > 0) {
      for (let i = 0; i < this.data.disableCompanies.length; i++) {
        this.disableCompanies[this.data.disableCompanies[i]] = false;
      }
    }
    if (this.isSuperAdmin) {
      for (let i in this.disableCompanies) {
        this.disableCompanies[i] = false;
      }
    }

    this.existingCompanies = this.data.companies
      ? JSON.parse(JSON.stringify(this.data.companies))
      : [];
    this.selectedCompanies = this.existingCompanies;
    for (let i = 0; i < this.existingCompanies.length; i++) {
      this.allCompanies[this.existingCompanies[i]] = true;
    }

    for (let i = 0; i < this.companiesArray.length; i++) {
      if (!this.disableCompanies[this.companiesArray[i].name]) {
        if (this.firstRowArray.length != 3) {
          this.firstRowArray.push(this.companiesArray[i]);
        } else if (this.secondRowArray.length != 3) {
          this.secondRowArray.push(this.companiesArray[i]);
        } else {
          this.thirdRowArray.push(this.companiesArray[i]);
        }
      }
    }
    this.allCompaniesArray = [
      this.firstRowArray,
      this.secondRowArray,
      this.thirdRowArray,
    ];
  }

  close(status?: any) {
    if (status) {
      this.dialogRef.close(this.data.companies);
      console.log('this.data.companies' + this.data.companies);
    } else {
      if (this.calledFrom == 'update') {
        Swal.fire({
          title: 'Möchten Sie diese Unternehmen wirklich aktualisieren?',
          showCancelButton: true,
          confirmButtonText: 'Ja',
          cancelButtonText: 'Nein',
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialogRef.close(this.selectedCompanies);
            //localStorage.setItem('currentUser', JSON.stringify(this.data['user']));
          } else {
            this.dialogRef.close(this.data.companies);
          }
        });
      } else {
        this.dialogRef.close(this.selectedCompanies);
      }
    }
  }
}
