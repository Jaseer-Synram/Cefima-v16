import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService } from '../_services';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment';
import { Observable, first, map, startWith } from 'rxjs';
import { MatChipInputEvent } from "@angular/material/chips";

import { COMMA, ENTER } from "@angular/cdk/keycodes";
import Swal from 'sweetalert2';
import * as intlTelInput from 'intl-tel-input';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { MatStepper } from '@angular/material/stepper';

import * as $ from 'jquery'

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
export interface Fruit {
  name: string;
}
export interface Fruitnew {
  name: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: false } }
  ]
})

export class AddProductComponent implements OnInit, AfterViewInit {

  api_url: any;
  getproductpartner: any;
  looppartners: any;
  selectedpartners: any = [];

  partners1: any = [];
  partners2: any = [];
  partners3: any = [];

  addpt: any = [];
  personalInfoFormGroup!: FormGroup;
  phoneGroup!: FormGroup;
  routeParams: any;
  progress1 = 0;
  progress2 = 0;
  imgURL: any;

  Versicherungsgesellschaft: any = ["Sach", "Renten/Leben", "Kranken", "Gewerbesach"];
  Geldanlagen: any = ["Investment", "Sachwerte"];
  Bank: any = ["Immobilienfinanzierung", "Verbraucherkredite", "Unternehmensfinanzierung", "KFZ Kredite"];

  selectedart_spartes: any = [];
  selectedart_spartes1: any = [];
  all_sparte: any = [];
  spartes: any = [];
  addedsparte: any = [];

  loginRole = localStorage.getItem("currentActiveRole");
  private readonly units: unit[] = ["bytes", "KB", "MB", "GB", "TB", "PB"];


  buttonCondition = false;
  answer1: any = "";
  answer2: any = "";
  validemail: any = [];

  partner_typ: any = [];

  constructor(
    private authService: AuthService,
    public router: Router,
    private userService: UserService,
    private pagerService: PagerService,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {

    $('.mainfist').removeClass('modal-open');
    this.api_url = environment.API_URL;
    this.userService.getproductpartner().subscribe((data) => {
      this.getproductpartner = data

      let all_pro: any = [];
      for (let i = 0; i < this.getproductpartner.length; i++) {

        if (this.getproductpartner[i].status != 0) {

          for (let j = 0; j < this.getproductpartner[i].spartedata.length; j++) {

            let data = {
              logo: this.getproductpartner[i].url,
              name: this.getproductpartner[i].company_name,
              art: this.getproductpartner[i].art,
              sparte: this.getproductpartner[i].spartedata[j].sparte,
            };

            all_pro.push(data);
          }

        }
      }

      this.looppartners = all_pro;

      console.log("All product partners");
      console.log(this.getproductpartner);
      console.log(this.looppartners);


      for (let i = 0; i < this.looppartners.length; i++) {
        if (this.looppartners[i].sparte == "Sach") {
          this.selectedpartners.push(this.looppartners[i]);
        }
      }


      for (let i = 0; i < this.looppartners.length; i++) {
        // if(this.looppartners[i].art == "Versicherungsgesellschaft"){
        //   this.partners1.push(this.looppartners[i]);
        // }else if(this.looppartners[i].art == "Geldanlagen"){
        //   this.partners2.push(this.looppartners[i]);
        // }else if(this.looppartners[i].art == "Bank"){
        //   this.partners3.push(this.looppartners[i]);
        // }

        if (this.looppartners[i].sparte == "Sach") {
          this.partners1.push(this.looppartners[i]);
        } else if (this.looppartners[i].sparte == "Investment") {
          this.partners2.push(this.looppartners[i]);
        } else if (this.looppartners[i].sparte == "Immobilienfinanzierung") {
          this.partners3.push(this.looppartners[i]);
        }
      }

    })

  }

  items = ["Javascript", "Typescript"];
  visible = true;
  selectable = true;
  filterproducttype!: Observable<any>;
  removable = true;
  addOnBlur = true;

  availableproducttypelist: any = [];

  producttypeControl = new FormControl();
  fruits: Fruit[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  addOpt(event: MatChipInputEvent, index: number): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.typesOptionsArray[index].push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
  }
  removeOpt(opt: string, index: number): void {
    const optIndex = this.typesOptionsArray[index].indexOf(opt);
    if (optIndex >= 0) {
      this.typesOptionsArray[index].splice(optIndex, 1);
    }
  }
  telInputObject(obj: { setCountry: (arg0: string) => void; }) {
    console.log(obj);
    obj.setCountry("de");
  }
  callspartedata11(i: any, event?: { target: { value: any; }; }) {
    this.lastsparteindex = i;

    this.filtermatautocomplete = '';
    if (event) {
      this.filtermatautocomplete = event.target.value;
      console.log('getvalue', this)
    }

    this.filterproducttype = this.producttypeControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterproducttype(value))

    );

  }

  callspartedata(i: string | number) {

    let sparte;

    let art;
    console.log("sadasd" + i)
    if (i == 0) {

      console.log("sadasd")
      sparte = this.SparteFormGroup.controls['sparte'].value;
    }
    else {
      console.log("sadasd111")
      let j = Number(i)
      sparte = this.SparteinfoForm['secondstep'].value[j - 1].sparte;
    }

    art = this.personalInfoFormGroup.controls['art'].value;

    console.log("sadasd" + sparte)

    console.log("printing art " + art);

    $('#loaderouterid').css("display", "block");
  }

  setproducttype(event: any, index: string | number) {
    const input = this.producttypeControl.value;
    const value = input.product_typename.trim();
    const id = input._id;
    if (value == "Kein Produkttyp gefunden") {
      Swal.fire(
        {
          title: "Bitte ändern Sie sparsam",

          icon: "error",

          showCloseButton: true
        })
    }
    else {
      // Add our fruit
      if ((value || "").trim()) {
        console.log("asdsadsadsadas" + JSON.stringify(value));
        let indexi = Number(index)
        console.log("asdsadsadsadas" + JSON.stringify(this.typesOptionsArray[indexi]));

        let check = this.typesOptionsArray[indexi].find((result) => result.value === value)

        if (check) {
          Swal.fire(
            {
              title: "Dieser Produkttyp wurde bereits hinzugefügt",

              icon: "error",

              showCloseButton: true
            })
        }
        else {

          this.typesOptionsArray[indexi].push({ id: id, value: value });
          let checkaddpt = this.addpt.find((result: any) => result === id)
          if (checkaddpt) {

          }
          else {
            this.addpt.push(id);
            console.log("addpt" + JSON.stringify(this.addpt))
          }
        }
      }
      // Reset the input value
      if (value) {
        this.producttypeControl.setValue("");
      }
    }
  }

  private _filterproducttype(value: string) {
    console.log("value11111asdsadasdas" + JSON.stringify(this.lastsparteindex));
    console.log("value11111asdsadasdas345345234324" + JSON.stringify(this.producttypelist));
    console.log("value11111asdsadasdasffgdgdfgdfg" + JSON.stringify(this.producttypelist[this.lastsparteindex]));
    console.log("value11111qsedqasdsad" + typeof value);
    if (typeof value == "string") {
      console.log("value11111qsedqasdsad11" + JSON.stringify(value.toLowerCase()));
      if (this.producttypelist[this.lastsparteindex] != undefined) {
        const filterValue = value.toLowerCase();
        const successdata = this.producttypelist[this.lastsparteindex].filter((option: { product_typename: string; }) =>
          option.product_typename.toLowerCase().includes(filterValue)
        );

        this.availableproducttypelist = [];
        this.availableproducttypelist.length = 0;

        for (let i = 0; i < this.producttypelist[this.lastsparteindex].length; i++) {
          console.log("every iteration console");
          console.log(this.filtermatautocomplete);

          if (this.filtermatautocomplete != "" && this.filtermatautocomplete != " ") {
            if (this.producttypelist[this.lastsparteindex][i].product_typename.includes(this.filtermatautocomplete)) {
              this.availableproducttypelist.push(this.producttypelist[this.lastsparteindex][i]);
            }
          } else {
            this.availableproducttypelist.push(this.producttypelist[this.lastsparteindex][i]);
          }


        }

        console.log("after done loop");
        console.log(this.availableproducttypelist);

        console.log("value11111qsedqasdsad11" + JSON.stringify(successdata));
        //if(this.producttypelist[this.lastsparteindex].length>0)
        if (this.availableproducttypelist.length != 0) {
          //return this.producttypelist[this.lastsparteindex]
          return this.availableproducttypelist;
        }
        else {
          return [{ "product_typename": "Kein Produkttyp gefunden" }]
        }

      }
    } else {
    }
  }

  gotonexttab() {
    let length = 1
    console.log("sdfdsfsdfsdfsdfsd" + length);
    for (let i = 0; i < length; i++) {
      const brokerage_telefon = document.querySelector("#brokerage_telefon" + i)
      if (brokerage_telefon) {
        intlTelInput(brokerage_telefon, {
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
      const brokeradvisor_telefon = document.querySelector("#brokeradvisor_telefon" + i);
      if (brokeradvisor_telefon) {
        intlTelInput(brokeradvisor_telefon, {
          initialCountry: "de",
          geoIpLookup: function (callback: any) {
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



      const contract_department_telefon = document.querySelector("#contract_department_telefon" + i);
      if (contract_department_telefon) {
        intlTelInput(contract_department_telefon, {
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

      const damage_department_telefon = document.querySelector("#damage_department_telefon" + i)
      if (damage_department_telefon) {
        intlTelInput(damage_department_telefon, {
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
    }
  }

  gotonexttabadd() {
    let length = this.quantities().controls.length + 1;
    console.log("sdfdsfsdfsdfsdfsd" + length);
    setTimeout(() => {
      for (let i = this.quantities().controls.length; i < length; i++) {
        console.log("sdfdsfsdfsdfsdfsd" + document.querySelector("#brokerage_telefon" + i));
        const brokerage_telefon = document.querySelector("#brokerage_telefon" + i)
        if (brokerage_telefon) {
          intlTelInput(brokerage_telefon, {
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

        const brokeradvisor_telefon = document.querySelector("#brokeradvisor_telefon" + i);
        if (brokeradvisor_telefon) {
          intlTelInput(brokeradvisor_telefon, {
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

        const contract_department_telefon = document.querySelector("#contract_department_telefon" + i);
        if (contract_department_telefon) {
          intlTelInput(contract_department_telefon, {
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

        const damage_department_telefon = document.querySelector("#damage_department_telefon" + i)
        if (damage_department_telefon) {
          intlTelInput(damage_department_telefon, {
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
      }
    }, 500);

  }

  quantities(): FormArray {
    return this.SparteFormGroup.get("secondstep") as FormArray;
  }

  newQuantity(): FormGroup {
    return this._formBuilder.group({
      sparte: ["", Validators.required],
      agent_number: ["", Validators.required],
      product_type: [""],
      brokerage_name: [""],
      brokerage_address: [""],
      brokerage_email: [
        ""
      ],
      brokerage_streetNumber: [""],
      brokerage_postCode: [""],
      brokerage_city: [""],
      brokerage_countryOfResidence: [""],
      brokerage_telefon: ["", Validators.required],
      brokeradvisor_title: ["", Validators.required],
      brokeradvisor_firstname: ["", Validators.required],
      brokeradvisor_lastname: ["", Validators.required],
      brokeradvisor_email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      brokeradvisor_telefon: ["", Validators.required],
      contract_department_email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      contract_department_telefon: ["", Validators.required],
      damage_department_email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      damage_department_telefon: ["", Validators.required]
    });
  }

  addmorefield() {

    this.quantities().push(this.newQuantity());
    this.typesOptionsArray.push([]);
    this.producttypelist[this.SparteinfoForm['secondstep'].value.length + 1] = [];
    this.gotonexttabadd();
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }

  public imagePath: any;
  public pdfPath: any;
  public message!: string;

  openBase64InNewTab(data: string, mimeType: string) {
    var byteCharacters = atob(data);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: mimeType + ";base64" });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  handleAddressChangeland(data: { address_components: any; }) {
    const splitArr = data.address_components;
    this.getCountryland(splitArr);
  }
  handleAddressChangelandsparteadd(data: { address_components: any; }, index: any) {
    const splitArr = data.address_components;
    this.getCountrylandsparteadd(splitArr, index);
  }
  handleAddressChangelandsparte(data: { address_components: any; }, index: any) {
    const splitArr = data.address_components;
    this.getCountrylandsparte(splitArr, index);
  }

  getCountryland(data: any): any {
    let that = this;
    const splitArr = data;
    // console.log(splitArr);
    splitArr.forEach(function (i: { types: any; long_name: any; }, k: any) {
      let content: any = i.types;
      //// console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
          }

          let localityCountry = that.countryName;
          that.personalInfoFormGroup.patchValue({
            countryOfResidence: localityCountry
          });
        }
      }
    });
  }

  getCountrylandsparte(data: any, index11: any): any {
    let that = this;
    const splitArr = data;
    // console.log(splitArr);
    splitArr.forEach(function (i: { types: any; long_name: any; }, k: any) {
      let content: any = i.types;
      //// console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
          }

          let localityCountry = that.countryName;
          that.SparteFormGroup.patchValue({
            brokerage_countryOfResidence: localityCountry
          });
        }
      }
    });
  }

  getCountrylandsparteadd(data: any, index11: string | number): any {
    let that = this;
    const splitArr = data;
    // console.log(splitArr);
    splitArr.forEach(function (i: { types: any; long_name: any; }, k: any) {
      let content: any = i.types;
      //// console.log(content);
      if (content.length > 1) {
        const countryArr = content;
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            that.countryName = i.long_name;
          }
          let taskListArrays = that.SparteFormGroup.get(
            "secondstep"
          ) as FormArray;
          let localityCountry = that.countryName;
          let indexi11 = Number(index11)
          taskListArrays.controls[indexi11].patchValue({
            brokerage_countryOfResidence: localityCountry,
          });

          // that.personalInfoFormGroup.patchValue({
          //   countryOfResidence: localityCountry
          // });
        }
      }
    });
  }
  handleAllFields(data: { address_components: any; }) {
    //console.log("original data = ", data);
    const splitArr = data.address_components;
    this.getAllFields(splitArr);
  }


  handleAllFieldssparte(data: { address_components: any; }, i: any) {
    //console.log("original data = ", data);
    const splitArr = data.address_components;
    this.getAllFieldssparte(splitArr, i);
  }

  handleAllFieldssparteadd(data: { address_components: any; }, i: any) {
    //console.log("original data = ", data);
    const splitArr = data.address_components;
    this.getAllFieldssparteadd(splitArr, i);
  }

  getAllFields(data: any): any {
    let that = this;
    const splitArr = data;
    let str = "";
    //console.log("data", splitArr);
    splitArr.forEach(function (i: { types: any; short_name: string; long_name: any; }, k: any) {
      let content: any = i.types;
      const found = content.find((element: string) => (element = "street_number"));
      if (found === "street_number") {
        that.personalInfoFormGroup.patchValue({ streetNumber: i.short_name });
      } else if (found === "postal_code") {
        that.personalInfoFormGroup.patchValue({ postCode: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            //console.log("country", i);
            that.personalInfoFormGroup.patchValue({
              countryOfResidence: i.long_name
            });
          }
          if (countryArr[index] === "locality") {
            that.personalInfoFormGroup.patchValue({ city: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      that.personalInfoFormGroup.patchValue({ street: str });
    } else {
      that.personalInfoFormGroup.patchValue({ street: "" });
    }
  }

  getAllFieldssparte(data: any, index11: any): any {
    let that = this;
    const splitArr = data;
    let str = "";
    //console.log("data", splitArr);
    splitArr.forEach(function (i: { types: any; short_name: string; long_name: any; }, k: any) {
      let content: any = i.types;
      const found = content.find((element: string) => (element = "street_number"));
      if (found === "street_number") {
        that.SparteFormGroup.patchValue({ brokerage_streetNumber: i.short_name });
      } else if (found === "postal_code") {
        that.SparteFormGroup.patchValue({ brokerage_postCode: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            //console.log("country", i);
            that.SparteFormGroup.patchValue({
              brokerage_countryOfResidence: i.long_name
            });
          }
          if (countryArr[index] === "locality") {
            that.SparteFormGroup.patchValue({ brokerage_city: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      that.SparteFormGroup.patchValue({ brokerage_address: str });
    } else {
      that.SparteFormGroup.patchValue({ brokerage_address: "" });
    }
  }

  getAllFieldssparteadd(data: any, index11: string | number): any {
    let that = this;
    const splitArr = data;
    let str = "";
    const indexi11 = Number(index11)
    //console.log("data", splitArr);
    splitArr.forEach(function (i: { types: any; short_name: string; long_name: any; }, k: any) {
      let content: any = i.types;
      const found = content.find((element: string) => (element = "street_number"));
      if (found === "street_number") {
        let taskListArrays = that.SparteFormGroup.get(
          "secondstep"
        ) as FormArray;
        taskListArrays.controls[indexi11].patchValue({
          brokerage_streetNumber: i.short_name,
        });
        // that.SparteFormGroup.patchValue({ brokerage_streetNumber: i.short_name });
      } else if (found === "postal_code") {
        let taskListArrays = that.SparteFormGroup.get(
          "secondstep"
        ) as FormArray;
        taskListArrays.controls[indexi11].patchValue({
          brokerage_postCode: i.short_name,
        });
        // that.SparteFormGroup.patchValue({ brokerage_postCode: i.short_name });
      } else if (found === "route") {
        str = i.short_name;
      }
      if (content.length > 1) {
        const countryArr = content;
        ////console.log(countryArr);
        for (let index = 0; index < content.length; index++) {
          if (countryArr[index] === "country") {
            let taskListArrays = that.SparteFormGroup.get(
              "secondstep"
            ) as FormArray;
            taskListArrays.controls[indexi11].patchValue({
              brokerage_countryOfResidence: i.long_name,
            });
            //console.log("country", i);
            // that.SparteFormGroup.patchValue({
            //   brokerage_countryOfResidence: i.long_name
            // });
          }
          if (countryArr[index] === "locality") {
            let taskListArrays = that.SparteFormGroup.get(
              "secondstep"
            ) as FormArray;
            taskListArrays.controls[indexi11].patchValue({
              brokerage_city: i.short_name,
            });
            // that.SparteFormGroup.patchValue({ brokerage_city: i.short_name });
          }
        }
      }
    });
    if (str.length > 0) {
      let taskListArrays = that.SparteFormGroup.get(
        "secondstep"
      ) as FormArray;
      taskListArrays.controls[indexi11].patchValue({
        brokerage_address: str,
      });
      // that.SparteFormGroup.patchValue({ brokerage_address: str });
    } else {
      let taskListArrays = that.SparteFormGroup.get(
        "secondstep"
      ) as FormArray;
      taskListArrays.controls[indexi11].patchValue({
        brokerage_address: "",
      });
      // that.SparteFormGroup.patchValue({ brokerage_address: "" });
    }
  }

  @ViewChild('addProduct')
  stepper!: MatStepper;
  clearSteps() {
    this.personalInfoFormGroup.reset()
    this.addedsparte = []
    this.answer1 = ""
    this.answer2 = ""
    this.buttonCondition = false
    this.stepper.selectedIndex = 0;
  }

  add_product_partner() {

    $("#loaderouterid").css("display", "block");


    let objectjson = [];

    console.log("check final");
    console.log(this.addedsparte);

    for (let i = 0; i < this.addedsparte.length; i++) {

      console.log("inside loop");
      let firstform = {
        sparte: this.addedsparte[i],
        agent_number: "",
        product_type: [],
        brokerage_name: "",
        brokerage_address: "",
        brokerage_streetNumber: "",
        brokerage_city: "",
        brokerage_postCode: "",
        brokerage_countryOfResidence: "",
        brokerage_email: "",
        brokerage_telefon: "",
        brokeradvisor_title: "",
        brokeradvisor_firstname: "",
        brokeradvisor_lastname: "",
        brokeradvisor_email: "",
        brokeradvisor_telefon: "",
        contract_department_email: "",
        contract_department_telefon: "",
        damage_department_email: "",
        damage_department_telefon: ""
      };

      console.log("end of loop");
      console.log(firstform);

      objectjson.push(firstform);
    }


    let data = {
      company_name: this.personalInfoForm['company_name'].value,
      //title: this.personalInfoForm.title.value,
      //name_of_ceo: this.personalInfoForm.name_of_ceo.value,
      //lastname_of_ceo: this.personalInfoForm.lastname_of_ceo.value,
      title: " ",
      name_of_ceo: " ",
      lastname_of_ceo: " ",
      art: this.artsparteFormGroup.controls['art'].value,
      street: this.personalInfoForm['street'].value,
      streetNumber: this.personalInfoForm['streetNumber'].value,
      postCode: this.personalInfoForm['postCode'].value,
      city: this.personalInfoForm['city'].value,
      countryOfResidence: this.personalInfoForm['countryOfResidence'].value,
      contactno: this.personalInfoForm['partnerOfNumber'].value,
      email: this.personalInfoForm['partnerOfEmail'].value,
      status: "0",
      spartedata: objectjson,
      // filearray:this.formData,
    };

    console.log("final function");
    console.log(data);

    //$("#loaderouterid").css("display", "block");

    this.userService.productpartnerregistration(data).subscribe(data => {
      console.log("Product partner registered");
      console.log(data);

      let response: any = data;

      $("#loaderouterid").css("display", "none");

      Swal.fire({
        icon: "success",
        target: '#forSwal',
        title: "Produktpartner erfolgreich hinzugefügt",
        html: "Ihre Vorgangsnmummer ist: " + response['case_no'],
        allowOutsideClick: false,
        confirmButtonText: "Ok",
        customClass: {
          container: 'position-absolute no-border'
        },
        iconHtml: '<img width="90%" src="../../assets/icons/swal-success.svg">',
        confirmButtonColor: '#02a9ed',
      }).then(result => {
        if (result.value) {
          this.clearSteps()
          this.router.navigate(['./produktwelt']);
        }
      })
    })



    //let formData = new FormData();
    // for (var i = 0; i < this.uploadedFiles.length; i++) {
    //   formData.append(
    //     "uploads",
    //     this.uploadedFiles[i],
    //     this.uploadedFiles[i].name
    //   );
    // }
    // for (var i = 0; i < this.uploadedFilespdf.length; i++) {
    //   formData.append(
    //     "uploadspdf",
    //     this.uploadedFilespdf[i],
    //     this.uploadedFilespdf[i].name
    //   );
    // }
    // formData.append("Data", JSON.stringify(data));
    // formData.append("addpt", JSON.stringify(this.addpt));

    // console.log("second_stepnew" + JSON.stringify(data));
    // this.userService
    //   .registerproductpartner(formData)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       console.log("POST Request is successful ", data);
    //       this.registerDone = true;
    //       this.registraionError = false;
    //       //Swal.fire("Produktpartner erfolgreich hinzugefügt","","success")

    //       Swal.fire({
    //         title: "Möchten Sie weitere Produktpartner hinzufügen?",
    //         showCancelButton: true,
    //         allowOutsideClick: false,
    //         confirmButtonText: "Ja",
    //         cancelButtonText: "Nein"
    //       }).then(result => {
    //         if (result.value) {
    //           let currentUrl = this.router.url;
    //           this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //           this.router.onSameUrlNavigation = 'reload';
    //           this.router.navigate([currentUrl]);
    //         }else{
    //           this.router.navigate(["./finance/product-partner-list"]);
    //         }
    //       })
    //       $("#loaderouterid").css("display", "none");
    //       // setTimeout(() => {
    //       //   $('html, body').animate({
    //       //     scrollTop: $("#msgId").offset().top
    //       // }, 2000);
    //       // }, 1000);
    //     },
    //     error => {
    //       this.registraionError = true;
    //       this.registerDone = false;
    //       Swal.fire("Der neue Produktpartner kann nicht angelegt werden. Überprüfen Sie Ihre Angaben und probieren Sie es erneut.","","error")
    //       console.log("Error", error["error"]);
    //       $("#loaderouterid").css("display", "none");
    //       // $("html, body").animate(
    //       //   { scrollTop: "0" }, 3000);
    //     }
    //   );

    // $('#loaderouterid').css("display","none");
    console.log("company_name" + this.personalInfoForm['company_name'].value);
  }

  tokensession = localStorage.getItem("token");
  dataaToParse: any = localStorage.getItem("currentUser")

  localdata = JSON.parse(this.dataaToParse);

  currentActiveRole = localStorage.getItem("currentActiveRole");
  year: any = new Date().getFullYear();

  id: any = "";

  email_exists: any = true;

  artsparteFormGroup!: FormGroup;

  contactinfoFormGroup!: FormGroup;
  documentFormGroup!: FormGroup;
  typesOptionsArray: any[][] = [];
  uploadingdata: any = [];
  filearraynew: any = [];
  filearray: any = [];
  documentid: any = [];
  documentlist: any = [];
  tags: any = [];
  document_name: any = [];
  experience: any = [];
  producttypelist: any = [];
  SparteFormGroup!: FormGroup;
  document_uploaded: any = false;
  recaptcha_done: any = false;
  spartedatanew: any = [];
  grecaptcha: any;
  secondstep!: FormGroup;
  generated_ticket: any;
  registerDone = false;
  registraionError = false;
  registerbtn = true;
  countryName: any;
  uploadedFiles!: Array<File>;
  lastsparteindex: any = '';
  uploadedFilespdf!: Array<File>;
  filtermatautocomplete: any = [];
  valid: any = false;

  phone_number: any = [];
  otp: any = false;


  otpSuccess: any = false;
  otpError: any = false;
  verificationData: any = [];






  ngOnInit() {
    this.loginRole = this.loginRole;
    console.log(this.loginRole);

    this.routeParams = this.activatedRoute.snapshot?.routeConfig?.path;

    this.personalInfoFormGroup = this._formBuilder.group({
      company_name: ["", Validators.required],

      // name_of_ceo: ["", Validators.required],
      // lastname_of_ceo: ["", Validators.required],

      //art: ["", Validators.required],
      street: ["", Validators.required],
      streetNumber: ["", Validators.required],
      postCode: ["", Validators.required],
      city: ["", Validators.required],
      countryOfResidence: ["", Validators.required],
      partnerOfNumber: ["+49", Validators.required],

      partnerOfEmail: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],

      //title: ["", Validators.required],


    });

    this.phoneGroup = this._formBuilder.group({
      partnerOfNumber: ["+49", Validators.required],
      otp: ["", Validators.required],
    });



    this.artsparteFormGroup = this._formBuilder.group({
      art: ["", Validators.required],
      sparte: [""],
    })




    this.typesOptionsArray.push([]);
    this.producttypelist[0] = [];


    // tocken access
    if (this.tokensession != null) {
      const token = localStorage.getItem("token")
      if (token)
        this.id = this.userService.getDecodedAccessToken(
          token
        ).id;
    }


    //product field end

    this.contactinfoFormGroup = this._formBuilder.group({
      firstname: [""],
      lastname: [""],
      email: [""],
      phone_number: [""],
      message: [""],
    });


    this.selectedart_spartes = this.Versicherungsgesellschaft;

  }



  get personalInfoForm() {
    return this.personalInfoFormGroup.controls;
  }
  get SparteinfoForm() {
    return this.SparteFormGroup.controls;
  }

  checkfields() {
    if (
      this.contactinfoFormGroup.controls['firstname'].value != "" &&
      this.contactinfoFormGroup.controls['lastname'].value != "" &&
      this.contactinfoFormGroup.controls['email'].value != "" &&
      this.contactinfoFormGroup.controls['phone_number'].value != "" &&
      this.contactinfoFormGroup.controls['message'].value != ""
    ) {
      this.valid = true;
    } else {
      this.valid = false;
    }
  }

  JumpTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  }
  gotosessiondashboard() {
    if (this.tokensession != null) {
      if (this.currentActiveRole == "b2b") {
        this.router.navigate(["./cefima/b2b-home"]);
      } else {
        this.router.navigate(["./cefima/kunde-home"], { queryParams: { id: this.id } });
      }
    } else {
      this.router.navigate(["/"]);
    }
  }

  ngAfterViewInit() {
    // const input = document.querySelector("#phone");
    // console.log("querySelector" + input);

    // intlTelInput(input, {
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
    const brokeradvisor_telefonn = document.querySelector("#brokeradvisor_telefonn")
    if (brokeradvisor_telefonn) {
      intlTelInput(
        brokeradvisor_telefonn, {
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
  }

  captcha = "";
  captcha_resolve = false;
  resolvedcefima12(captchaResponse: string) {

    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captcha = captchaResponse;
    if (this.captcha !== "") {
      this.captcha_resolve = true;
    }

  }

  checkemailnew1(event: { target: { value: any; }; }) {
    console.log("in check_mail");
    console.log(event.target.value);

    let datanew = { email: event.target.value };
    this.userService
      .checkemail(datanew)
      .pipe()
      .subscribe((data11: any) => {
        console.log("Data camee");
        console.log(data11);
        if (data11["status"] == "200") {
          $("#email_addresserror01").css("display", "none");

          this.email_exists = false;
        } else {
          $("#email_addresserror01").css("display", "block");
          this.email_exists = true;
        }
      });
  }



  gotosessionmaindata() {
    if (this.currentActiveRole == "b2b") {
      console.log("localdata" + JSON.stringify(this.localdata));
      this.router.navigate(["./cefima/b2b-dashboard"], {
        queryParams: { id: this.localdata._id },
      });
    } else {
      this.router.navigate(["./cefima/kunde-home"], {
        queryParams: { id: this.localdata._id, tabname: 1 },
      });
    }
  }

  changepic() {
    $("#picimage").trigger("click");
  }

  preview(files: any) {
    this.progress1 = 0;
    console.log("files.length" + files.length);
    if (files.length === 0) {
      return;
    }
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      console.log("asddasdsadsa");
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    // this.filearray=files[0];
    this.uploadedFiles = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      console.log("asddasdsadsa" + reader.result);
      this.imgURL = reader.result;



      $('#progressbar1').css("display", "flex");

      const formData = new FormData();
      formData.append("document", files[0]);
      this.userService.uploaddocumentwithoutticketno(
        formData
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {

          case HttpEventType.Sent:
            console.log('Request has been made!');

            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            console.log(event.total);
            console.log(event.loaded);
            if (event.total) this.progress1 = Math.round(event.loaded / event.total * 100);

            console.log(`Uploaded! ${this.progress1}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);

            setTimeout(() => {
              $('#progressbar1').css("display", "none");
              this.progress1 = 0;
            });
        }
      })


    };
  }

  changepdf() {
    $("#picpdf").trigger("click");
  }

  previewpdf(filesnew: any) {
    this.progress2 = 0;
    console.log("pdfdatalength" + filesnew.length);
    if (filesnew.length === 0) return;

    var mimeType = filesnew[0].type;

    if (mimeType.match(/application\/pdf/) == null) {
      this.message = "Only PDF are supported.";
      return;
    }

    var reader = new FileReader();
    this.pdfPath = filesnew;
    this.uploadedFilespdf = filesnew;
    // this.formData.append("uploads[]", filesnew[0], filesnew[0].name);
    reader.readAsDataURL(filesnew[0]);
    reader.onload = _event => {
      var pdflink = "<img src='../assets/PDF.svg' width='100%' height='200px'>";
      $("#previewpdf").html(pdflink);
      console.log("pdfdata" + reader.result);

      $('#progressbar2').css("display", "flex");

      const formData = new FormData();
      formData.append("document", filesnew[0]);
      this.userService.uploaddocumentwithoutticketno(
        formData
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {

          case HttpEventType.Sent:
            console.log('Request has been made!');

            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            console.log(event.total);
            console.log(event.loaded);
            if (event.total) this.progress2 = Math.round(event.loaded / event.total * 100);

            console.log(`Uploaded! ${this.progress2}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);

            setTimeout(() => {
              $('#progressbar2').css("display", "none");
              this.progress2 = 0;
            });
        }
      })

      // this.imgURL = reader.result;
    };
  }

  async handleImageChange(
    event: any,
    preview: string,
    docName: string,
    idname: any
  ) {
    event.preventDefault();
    this.uploadingdata = true;

    this.document_uploaded = true;
    $("#result").html("");
    let StringTemple;

    const removeData = () => {
      this.filearraynew.splice(0, 1);

      $("#" + idname).val("");

      console.log("removed");
      this.document_uploaded = false;
    };

    var files = event.target.files;
    console.log("events" + event.target.files);
    var filesLength = files.length;

    for (let i = 0; i < filesLength; i++) {
      let f = files[i];
      this.filearraynew.push(f);

      this.filearray = this.filearraynew;

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

        if (extension == "doc" || extension == "docx") {
          StringTemple =
            '<div class="pip"  style="margin: auto !important;" id="div3">' +
            "" +
            '<div class="row mt-2"> <div class="col-md-12">' +
            '<div class="removepreview" id="removepreviewid' +
            preview +
            '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px;padding: 10px;padding-top:5px;color: white;position: relative;margin-top: 2px;   margin-left: auto;cursor: pointer;">X</div></div>' +
            "" +
            '<div class="col-md-3 text-center">' +
            '<img class="imageThumb" style="width: 40%;height:50px;    margin-top: 10px;" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            "</div>" +
            '<div class="col-md-9"> <b>Dokumentenname: ' +
            f.name +
            "</b><br> <b>Dateigröße: " +
            Size +
            "</b> </div><div class='col-md-12'>" +
            '   <div class="progress form-group " id="progressnew' +
            idname +
            '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
            idname +
            ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
            idname +
            '" [style.width.%]=""> </div> </div>' +
            " </div></div></div>" +
            "</div>";
        } else if (extension == "pdf" || extension == "pdfx") {
          StringTemple =
            '<div class="pip"  style="margin: auto !important;" id="div3">' +
            "" +
            '<div class="row mt-2"> <div class="col-md-12">' +
            '<div class="removepreview" id="removepreviewid' +
            preview +
            '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px;padding: 10px;padding-top:5px;color: white;position: relative;margin-top: 2px;   margin-left: auto;cursor: pointer;">X</div></div>' +
            "" +
            '<div class="col-md-3">' +
            '<img class="imageThumb" style="width: 100%;height:50px;    margin-top: 10px;" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            "</div>" +
            '<div class="col-md-9"> <b>Dokumentenname: ' +
            f.name +
            "</b><br> <b>Dateigröße: " +
            Size +
            "</b> </div><div class='col-md-12'>" +
            '   <div class="progress form-group " id="progressnew' +
            idname +
            '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
            idname +
            ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
            idname +
            '" [style.width.%]=""> </div> </div>' +
            " </div></div></div>" +
            "</div>";
        } else {
          StringTemple =
            '<div class="pip"  style="margin: auto !important;" id="div3">' +
            "" +
            '<div class="row mt-2"> <div class="col-md-12">' +
            '<div class="removepreview" id="removepreviewid' +
            preview +
            '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px;padding: 10px;padding-top:5px;color: white;position: relative;margin-top: 2px;   margin-left: auto;cursor: pointer;">X</div></div>' +
            "" +
            '<div class="col-md-3">' +
            '<img class="imageThumb" style="width: 100%;height:40%;    margin-top: 10px;" src="' +
            ImageName +
            '" title="' +
            f.name +
            '"/>' +
            "</div>" +
            '<div class="col-md-9"> <b>Dokumentenname: ' +
            f.name +
            "</b><br> <b>Dateigröße: " +
            Size +
            "</b> </div><div class='col-md-12'>" +
            '   <div class="progress form-group " id="progressnew' +
            idname +
            '" style="background-color: grey;width: 100%;"> <div class="percentageclass' +
            idname +
            ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' +
            idname +
            '" [style.width.%]=""> </div> </div>' +
            "</div> </div></div>" +
            "</div>";
        }
        $("#" + preview).html(StringTemple);

        // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> KB </div>`).insertAfter(".pip")
        $("#removepreviewid" + preview).click(function () {
          removeData();
          $(this).parent().parent().parent(".pip").remove();
        });
      };

      fileReader.readAsDataURL(f);

      const formData = new FormData();
      formData.append("document", f);
      this.userService
        .uploaddocumentwithoutticketnocareer(formData)
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
              if (event.total)
                $("div.percentageclass" + idname).width(
                  Math.round((event.loaded / event.total) * 100) + "%"
                );
              if (event.total)
                $("div.percentageclass" + idname).html(
                  Math.round((event.loaded / event.total) * 100) + "%"
                );

              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);

              setTimeout(() => {
                $("#progressnew" + idname).css("display", "none");
                $("#progressnew" + idname).css("width", "0");
                $("div.percentageclass" + idname).width("0");
                $("div.percentageclass" + idname).css("width", "0");
                $("div.percentageclass" + idname).html("");

                this.uploadingdata = false;

                let document_name = docName;
                let olddocumentid = this.documentid;
                this.documentid = event.body.document_unique_id;

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

                this.documentlist = {
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

                console.log("documentlist");
                console.log(this.documentlist);
                console.log("documentid");
                console.log(this.documentid);

                console.log("tags here");
                console.log(tags);

                this.tags = tags;
                this.document_name = document_name;
              }, 500);
          }
        });
    }

    console.log(this.filearray);
  }



  resolvedcefima11(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    //this.recaptcha_done = captchaResponse;
    this.recaptcha_done = true;
  }

  savedata() {
    $("#loaderouterid").css("display", "block");

    let data = {
      work_experience: this.experience,
      first_name: this.contactinfoFormGroup.controls['firstname'].value,
      last_name: this.contactinfoFormGroup.controls['lastname'].value,
      email_address: this.contactinfoFormGroup.controls['email'].value,
      phone_no: this.contactinfoFormGroup.controls['phone_number'].value,
      message: this.contactinfoFormGroup.controls['message'].value,
      type: "Versicherungskaufleute (Innendienst)",
      tags: this.tags,
      document_name: this.document_name,
      document_unique_id: this.documentid,
      prefixticketno: "40-ce-",
    };

    this.userService.submitcefimacareer(data).subscribe((data: Object | any) => {
      console.log("data came from api");
      console.log(data);
      console.log(data["data"]["Activity_No"]);

      $("#activityno02").html(data["data"]["Activity_No"]);

      this.document_uploaded = false;
      this.recaptcha_done = false;
      this.tags = "";
      this.document_name = "";
      this.documentid = "";
      $("#PerviewOne").html("");

      this.contactinfoFormGroup.patchValue({
        fisrtname: "",
        lastname: "",
        email: "",
        phone_number: "",
        message: "",
      });

      grecaptcha.reset();

      setTimeout(() => {
        $("#tolaststep").trigger("click");
        $("#loaderouterid").css("display", "none");
      }, 2000);
    });
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

    console.log("units check");
    console.log(unitIndex);

    if (typeof precision === "number") {
      return `${bytes.toFixed(+precision)} ${unit}`;
    }
    return `${bytes.toFixed(precision[unit])} ${unit}`;
  }

  get_experience(experience_type: any) {
    this.experience = experience_type;
  }

  public verify() {
    console.log("verifying");
    console.log(this.phoneGroup.controls['partnerOfNumber'].value);
    this.phone_number["phoneNumber"] = this.phoneGroup.controls['partnerOfNumber'].value;
    this.userService.sendVerificationCode(this.phone_number).subscribe(
      (success: any) => {
        // if success and error give response
        if (success) {
          this.otp = true;
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
  }

  public verifyOtp() {
    this.otpSuccess = false;
    this.otpError = false;
    this.otp = this.phoneGroup.value.otp;
    this.verificationData["otp"] = this.otp;
    const key: any = localStorage.getItem("key")
    this.verificationData["requestId"] = JSON.parse(key);
    this.verificationData["userId"] = this.id;
    console.log("verificationData", this.verificationData);
    this.userService.checkVerificationCode(this.verificationData).subscribe(
      (success: any) => {
        console.log("success");
        console.log(success);
        if (success == 0) {
          this.otpSuccess = true;
          this.otpError = false;
        } else {
          this.otpSuccess = false;
          this.otpError = true;
        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
  }

  //main view

  radioValueCheck(x: any) {

    if (x.checked == true) {
      if (x.source.value == "Ihr Unternehmen bietet Produkte aus mindestens einer der Sparten Versicherungen, Geldanlagen oder Bankprodukte an.") {
        this.answer1 = "yes";
      } else if (x.source.value == "Sie sind Zeichnungsberechtigt oder durch eine vertretungsberechtigte Person beauftragt eine Zusammenarbeit mit uns zu beginnen.") {
        this.answer2 = "yes";
      }
    } else if (x.checked == false) {
      if (x.source.value == "Ihr Unternehmen bietet Produkte aus mindestens einer der Sparten Versicherungen, Geldanlagen oder Bankprodukte an.") {
        this.answer1 = "";
      } else if (x.source.value == "Sie sind Zeichnungsberechtigt oder durch eine vertretungsberechtigte Person beauftragt eine Zusammenarbeit mit uns zu beginnen.") {
        this.answer2 = "";
      }
    }

    if (this.answer1 != "" && this.answer2 != "") {
      this.buttonCondition = true;
    } else {
      this.buttonCondition = false;
    }

  }






  select_art(art: any) {

    if (art == "Versicherungsgesellschaft") {
      this.selectedart_spartes = this.Versicherungsgesellschaft;
    } else if (art == "Geldanlagen") {
      this.selectedart_spartes = this.Geldanlagen;
    } else if (art == "Bank") {
      this.selectedart_spartes = this.Bank;
    }


    this.selectedpartners = [];

    for (let i = 0; i < this.looppartners.length; i++) {
      if (this.looppartners[i].sparte == this.selectedart_spartes[0]) {
        this.selectedpartners.push(this.looppartners[i]);
      }
    }


    $('.art-btnclass').removeClass('btn-secondary');
    $('.art-btnclass').addClass('btn-info');
    $('.art-angle').css('display', 'none');

    $('.' + art).removeClass('btn-info');
    $('.' + art).addClass('btn-secondary');
    $('.' + art + '-angle').css('display', '');

  }



  select_sparte(sparte: any) {
    $('.sparte-btnclass').removeClass('btn-secondary');
    $('.sparte-btnclass').addClass('btn-info');
    $('.sparte-angle').css('display', 'none');

    $('.' + sparte).removeClass('btn-info');
    $('.' + sparte).addClass('btn-secondary');
    $('.' + sparte + '-angle').css('display', '');


    if (sparte == "renten") {
      sparte == "Renten/Leben";
    }

    this.selectedpartners = [];

    for (let i = 0; i < this.looppartners.length; i++) {
      if (this.looppartners[i].sparte == sparte) {
        this.selectedpartners.push(this.looppartners[i]);
      }
    }

  }


  patchsparte() {
    let art = this.artsparteFormGroup.controls['art'].value;
    if (art == "Versicherungsgesellschaft") {
      this.spartes = this.Versicherungsgesellschaft;
      this.all_sparte = this.Versicherungsgesellschaft;
    } else if (art == "Geldanlagen") {
      this.spartes = this.Geldanlagen;
      this.all_sparte = this.Geldanlagen;
    } else if (art == "Bank") {
      this.spartes = this.Bank;
      this.all_sparte = this.Bank;
    }

    this.addedsparte = [];

  }



  getsparte(event: any) {

    console.log("function called here");
    console.log(event.target.value);

    if (event.target.value != "") {
      this.spartes = [];

      for (let i = 0; i < this.all_sparte.length; i++) {
        if (this.all_sparte[i].toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
          this.spartes.push(this.all_sparte[i]);
        }
      }

    } else {
      this.patchsparte();
    }

  }

  choose_sparte(sparte: any) {
    let spartename = sparte;

    if (sparte == "renten") {
      spartename = "Renten/Leben";
    } else if (sparte == "KFZ_Kredite") {
      spartename = "KFZ Kredite";
    }

    let exists = 0;
    for (let i = 0; i < this.addedsparte.length; i++) {
      if (this.addedsparte[i] == spartename) {
        exists = 1;
      }
    }

    if (exists == 0) {
      $('.' + sparte + "1").removeClass('btn-step2');
      $('.' + sparte + "1").addClass('btn-step2-success');

      $('.' + sparte + "-square").css('display', 'none');
      $('.' + sparte + "-square-check").css('display', '');

      this.addedsparte.push(spartename);
    } else {
      $('.' + sparte + "1").removeClass('btn-step2-success');
      $('.' + sparte + "1").addClass('btn-step2');

      $('.' + sparte + "-square").css('display', '');
      $('.' + sparte + "-square-check").css('display', 'none');

      const index = this.addedsparte.indexOf(spartename);
      this.addedsparte.splice(index, 1);

    }



  }


  checkemailnew() {
    $("#checkemailerror1").html("");
    $("#checkemailerror1").css("background-color", "transparent");
    $("#checkemailerror1").css("padding", "0px");
    let datanew = { email: this.personalInfoFormGroup.controls['partnerOfEmail'].value };
    this.userService
      //.checkemail(datanew)
      .checkemailproductpartner(datanew)
      .pipe(first())
      .subscribe((data11: Object | any) => {
        if (data11["status"] == "200") {
          // this.validemail = true;
          // $("#checkemailerror1").html("");
          // $("#checkemailerror1").css("background-color", "transparent");
          // $("#checkemailerror1").css("padding", "0px");
          this.userService
            .checkemail(datanew)
            .pipe()
            .subscribe((data11: Object | any) => {
              if (data11["status"] == "200") {
                this.validemail = true;
                $("#checkemailerror1").html("");
                $("#checkemailerror1").css("background-color", "transparent");
                $("#checkemailerror1").css("padding", "0px");
              } else {
                this.validemail = false;
                $("#checkemailerror1").html(data11["msg"]);
                $("#checkemailerror1").css("background-color", "white");
                $("#checkemailerror1").css("padding", "10px");
              }
            });
        } else {
          this.validemail = false;
          $("#checkemailerror1").html(data11["msg"]);
          $("#checkemailerror1").css("background-color", "white");
          $("#checkemailerror1").css("padding", "10px");
        }
      });
  }


  partner_type(type: any) {
    this.partner_typ = type;
  }

  show_spartewise_partners(sparte: any, partner_array: any, event = "") {







    if (partner_array == "partners1") {
      $('.sparte_span').css('background', 'transparent');
      $('.sparte_span').css('font-weight', '');
      $('.sparte_span').css('color', 'white');
      $('#' + event).css('background', 'white');
      $('#' + event).css('font-weight', '400px');
      $('#' + event).css('color', '#3D3C3C');
      this.partners1 = [];
    } else if (partner_array == "partners2") {
      $('.sparte_span2').css('background', 'transparent');
      $('.sparte_span2').css('font-weight', '');
      $('.sparte_span2').css('color', 'white');
      $('#' + event).css('background', 'white');
      $('#' + event).css('font-weight', '400px');
      $('#' + event).css('color', '#3D3C3C');
      this.partners2 = [];
    } else if (partner_array == "partners3") {
      $('.sparte_span3').css('background', 'transparent');
      $('.sparte_span3').css('font-weight', '');
      $('.sparte_span3').css('color', 'white');
      $('#' + event).css('background', 'white');
      $('#' + event).css('font-weight', '400px');
      $('#' + event).css('color', '#3D3C3C');
      this.partners3 = [];
    }


    for (let i = 0; i < this.looppartners.length; i++) {
      if (partner_array == "partners1") {
        if (this.looppartners[i].sparte == sparte) {
          this.partners1.push(this.looppartners[i]);
        }
      } else if (partner_array == "partners2") {
        if (this.looppartners[i].sparte == sparte) {
          this.partners2.push(this.looppartners[i]);
        }
      } else if (partner_array == "partners3") {
        if (this.looppartners[i].sparte == sparte) {
          this.partners3.push(this.looppartners[i]);
        }
      }

    }

  }


}

