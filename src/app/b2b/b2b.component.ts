import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import *as intlTelInput from "intl-tel-input";
import { UserService } from "../user.service";
import { first, map, startWith } from "rxjs/operators";
// import { SignaturePad } from "angular2-signaturepad";
import SignaturePad from "signature_pad"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormGroupDirective,
  NgForm,
  FormControl,
  CheckboxControlValueAccessor,
} from "@angular/forms";
import { localeData } from "moment";
import { Observable, async } from "rxjs";
type unit = 'bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';
type unitPrecisionMap = {
  [u in unit]: number;
};

const defaultPrecisionMap: unitPrecisionMap = {
  bytes: 0,
  KB: 0,
  MB: 1,
  GB: 1,
  TB: 2,
  PB: 2
};
import { HttpEvent, HttpEventType, JsonpClientBackend } from "@angular/common/http";
// import { win } from "ngx-youtube-player";
@Component({
  selector: 'app-b2b',
  templateUrl: './b2b.component.html',
  styleUrls: ['./b2b.component.css']
})
export class B2bComponent implements OnInit {



  private readonly units: unit[] = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  showCustomer = false;
  showmekFinanz = false;
  drawing: number = 0;
  drawingcheck = false;
  showFiorettoImmob = false;
  uploadingvideo = false;
  showBirema = false;
  TodayDate: any;
  showFiorettoMedia = false;
  showAirmage = false;
  getregisteredbrokerdocument: any = [];
  filename: any = [];
  showsuccess = false;
  docFromGroup: FormGroup ;
  ext: any = 0;
  uploadingdoc = false;
  passFromGroup: FormGroup;
  year: any = new Date().getFullYear();
  showHoraiDetektei = false;
  showButton: boolean = false;
  showVarioImport = false;
  showSterbVorsoge = false;
  filearraynew: any[] = [];
  signedarraynew = [];
  showsavebutton = false;
  filearray: any[] = [];
  showCheckntrack = false;
  token: any;
  pdffile: any;
  pdffile2: any;
  pdffile3: any;
  sign1: any;
  completeupload: number = 0;
  type3count: number = 0;
  sign2: any;
  sign3: any;
  sign4: any;
  signeddoc: any = [];

  userdata: any = [];
  pdffile4: any;
  uploadfile: number = 0;
  edited = false;
  documentid: any = [];
  documentlist: any = [];
  documentpassid: any = [];
  documentpasslist: any = [];

  modal_download: any = [];

  TicketNo = "";
  dataid = "";
  fileBase64first: string;
  fileBase64second: string;
  fileBase64third: string;
  fileBase64fourth: string;
  SecDomChange: string = "show";
  tokensession = localStorage.getItem("token");
  selectedUser = {
    id: "",
  };
  title = this.userService.getDecodedAccessToken(localStorage.getItem("token"))
    .title;
  lastname = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).lastname;
  firstname = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).firstname;
  COMPANYNAME = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).companyname;
  localData = JSON.parse(localStorage.getItem("currentUser"));
  // loginRole = this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles;
  id = this.userService.getDecodedAccessToken(localStorage.getItem("token")).id;
  currentid = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).id;
  loginRole = localStorage.getItem("currentActiveRole");
  localdata = JSON.parse(localStorage.getItem("currentUser"));
  currentActiveRole = localStorage.getItem("currentActiveRole");


  companytype = this.userService.getDecodedAccessToken(
    localStorage.getItem("token")
  ).companytype;


  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  signaturePad: SignaturePad

  //@ViewChild('modalButton') modalButton: ElementRef;

  public signaturePadOptions: Object = {
    // passed through to szimek/signature_pad constructor
    minWidth: 2,
    canvasWidth: 750,
    canvasHeight: 300,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private form_builder: FormBuilder
  ) {


    this.localData = JSON.parse(localStorage.getItem("currentUser"));
    this.localdata = JSON.parse(localStorage.getItem("currentUser"));

    console.log("inside construct");
    console.log(this.localData)


    this.userService.getregisteredbrokerdocument({ id: this.localData._id }).subscribe((response) => {
      console.log("response" + JSON.stringify(response))
      this.getregisteredbrokerdocument = response;
      this.completeupload = this.getregisteredbrokerdocument.length;
      console.log("completeupload" + this.completeupload)
    })

    if (this.loginRole == "b2b") {
    }
    else {
      this.router.navigate(["/kunde-home"], {
        queryParams: { id: this.currentid },
      });
    }


  }



  ngAfterViewInit() {
    const input = document.querySelector("#phone");
    console.log("querySelector" + input);
    if (input)
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
        }
      });

    if (this.canvas) {
      this.signaturePad = new SignaturePad(this.canvas?.nativeElement);
      this.signaturePad.minWidth = 2;
      this.signaturePad.clear();
    }


    // $("#datedynamic").html(todaynew1);
  }
  gotosessiondashboard() {
    let url = window.location.href;
    console.log("url" + url);
    const middle = url.slice(
      url.indexOf('#') + 1,
      // url.lastIndexOf('?')+ 1,
    );
    console.log("url" + middle);
    $(".removeStyle").removeClass("showSelected");
    $("#addstyle").addClass("showSelected");

    if (this.tokensession != null) {
      if (this.currentActiveRole == 'b2b') {
        this.router.navigate(["/cefima/b2b-home"]);
      }
      else {
        this.router.navigate(["/cefima/kunde-home"], { queryParams: { id: this.id } });
      }
    }
    else {
      this.router.navigate(["/"]);
    }
  }
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL());
    // console.log(this.drawing);
    // this.drawing = this.drawing + 1;
    // console.log(this.drawing);

    // let id = $("#idnew").val();
    // if (id == "firstesign") {
    //   this.sign1 = this.signaturePad.toDataURL();
    // }
    // if (id == "secondesign") {
    //   this.sign2 = this.signaturePad.toDataURL();
    // }
    // if (id == "thirdesign") {
    //   this.sign3 = this.signaturePad.toDataURL();
    // }
    // if (id == "fourthesign") {
    //   this.sign4 = this.signaturePad.toDataURL();
    // }
    // console.log(this.signaturePad.toDataURL());
    // console.log("#imageid1" + id);
    // $("#imageid" + id).attr("src", this.signaturePad.toDataURL());
    // $("#imageid1" + id).attr("src", this.signaturePad.toDataURL());
    // let firstesign = $("#firstesign").is(":checked");
    // let secondesign = $("#secondesign").is(":checked");
    // let thirdesign = $("#thirdesign").is(":checked");
    // let fourthesign = $("#fourthesign").is(":checked");

    // if (firstesign && secondesign  && fourthesign) {
    //   this.drawingcheck = true;
    // } else {
    //   this.drawingcheck = false;
    // }
  }
  clear() {
    // this.drawing = 0;
    this.signaturePad.clear();

    let id = $("#idnew").val();
    $("#" + id).prop("checked", false);
  }
  clear1() {
    // this.drawing = 0;
    this.signaturePad.clear();
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log("begin drawing");
  }

  openpdf(data, index) {
    let url = this.checkpdf(data, index);
    //  $('#firstdownload').attr("href",url);
    //  location.href=url;
    var a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = 'bill.pdf';
    document.body.appendChild(a);
    a.click();
  }
  checkpdf(document_sub_type, product_partner) {
    console.log("begin drawingqwedwqewq");

    var obj = this.getregisteredbrokerdocument.filter(function (node) {

      return (node.document_sub_type == document_sub_type && node.product_partner == product_partner) ? true : false;
    });
    if (obj.length > 0) {
      let ext = obj[0].document_url.includes(".pdf")
      if (ext) {
        this.ext = 1;
      }
      console.log("checkpdf " + document_sub_type);
      console.log("checkpdfurl " + obj[0].document_url);


      return obj[0].document_url;

    }
    else {
      return '';
    }
  }
  checkext(document_sub_type, product_partner) {
    console.log("begin drawingqwedwqewq");

    var obj = this.getregisteredbrokerdocument.filter(function (node) {

      return (node.document_sub_type == document_sub_type && node.product_partner == product_partner) ? true : false;
    });
    if (obj.length > 0) {
      let ext = obj[0].document_url.includes(".pdf")


      return ext;

    }
    else {
      return false;
    }
  }

  ngOnInit(): void {

    if (this.localData.status != 0 && this.localData.registeration_editable != 0) {
      $("#loaderouterid").css("display", "block");

      setTimeout(() => {
        $("#loaderouterid").css("display", "none");
      }, 2000);
    }


    let url = window.location.href;
    console.log("url" + url);
    const middle = url.slice(
      url.indexOf('#') + 1,
      // url.lastIndexOf('?')+ 1,
    );
    console.log("url" + middle);
    if (middle == "/b2b-home") {
      $(".removeStyle").removeClass("showSelected");
      $("#addstyle").addClass("showSelected");
    }

    this.TicketNo = this.localData.brokerregticketno;

    //  (function() {

    //   'use strict';

    //   $('.input-file1').each(function() {
    //     var $input = $(this),
    //         $label = $input.next('.js-labelFile1'),
    //         labelVal = $label.html();

    //    $input.on('change', function(element) {
    //       var fileName = '';
    //       if (element.target.value) fileName = element.target.value.split('\\').pop();
    //       fileName ? $label.addClass('has-file1').find('.js-fileName1').html(fileName) : $label.removeClass('has-file1').html(labelVal);
    //       $('#newfileserror').html("");

    //    });
    //   });

    // })();



    this.documentid.push('', '');
    this.documentlist.push('', '');
    for (let i = 0; i < this.localData.type3.legalrepresentativeform2.length; i++) {
      this.documentpassid.push('');
      this.documentpasslist.push('');
    }
    console.log("documentpassid" + this.documentpassid)
    console.log("documentpasslist" + this.documentpasslist)
    if (this.localData.companytype == 'Einzelunternehmen' || this.localData.companytype == 'Eingetragener Kaufmann (e.K.)') {
      this.type3count = 3;
      console.log("type3" + this.type3count)
    }
    else {
      this.type3count = parseInt(this.localData.type3.legalrepresentativeform2.length) + 3
      console.log("type3" + this.type3count)
    }


    //   setTimeout(() => {
    //     if(this.localData.status == '2' && this.localData.strno == '-'){
    //       console.log("trigger");
    // this.DomChangeTwo();
    //     }
    //   }, 100);
    this.docFromGroup = this.form_builder.group({
      logo: [""],
      welcomevideo: [""],
      website_url: ["", Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
      phone_number: [""],

      // acceptcontrol:["",Validators.required]
    });

    this.passFromGroup = this.form_builder.group({
      passportform: this.form_builder.array([]),
    });

    console.log("completedata" + JSON.stringify(this.localData));
    if (this.loginRole == "customer") {
      Swal.fire({
        icon: "error",
        title:
          "Bitte wählen Sie die B2B-Rolle, um auf die B2B-Homepage zuzugreifen",
        showConfirmButton: true,
        showCloseButton: true,
        showCancelButton: false,
      });
    }
    let todaynew = new Date();
    var dd = String(todaynew.getDate()).padStart(2, "0");
    var mm = String(todaynew.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = todaynew.getFullYear();

    var todaynew1 = dd + "." + mm + "." + yyyy;
    this.TodayDate = todaynew1;

    this.selectedUser.id = this.id;
    var that = this;
    var company = JSON.parse(
      localStorage.getItem("currentUser")
    ).companies_with_roles;
    this.setCompanyCondition(company);
    var user = this.userService.getEditUser(this.id).subscribe(function (data) {

      // company = data.companies;
      // company.forEach(function(value){
      //   if(value === 'mekFinanz'){
      //     that.showmekFinanz=true
      //   }
      //   if(value === 'fiorettoimmob'){
      //     that.showFiorettoImmob=true;
      //   }
      //   if(value === 'birema'){
      //     that.showBirema=true;
      //   }
      //   if(value === 'fiorettomedia'){
      //     that.showFiorettoMedia=true;
      //   }
      //   if(value === 'airmage'){
      //     that.showAirmage=true;
      //   }
      //   if(value === 'horaidetektei'){
      //     that.showHoraiDetektei=true;
      //   }
      //   if(value === 'varioimport'){
      //     that.showVarioImport=true;
      //   }
      //   if(value === 'sterbvorsoge'){
      //     that.showSterbVorsoge=true;
      //   }
      //   if(value === 'checkntrack'){
      //     that.showCheckntrack=true;
      //   }
      // });
    });
    //this.cusCompany();



    // if(this.localData.status == '0' && this.localData.uploaddocument == '1'){


    //   $('#modalButton').trigger('click');
    // }
  }

  passportform(): FormArray {
    return this.passFromGroup.get(
      "passportform"
    ) as FormArray;

  }
  newpassportform(): FormGroup {
    return this.form_builder.group({

      passportpic: ["", Validators.required],

    });

  }
  addlegalrepresentativeform() {

    this.passportform().push(this.newpassportform());

  }
  //Check for Displaying Companies for which the Customer is Registered
  cusCompany() {
    var company = JSON.parse(
      localStorage.getItem("currentUser")
    ).companies_with_roles;
    this.setCompanyCondition(company);
    // var company = this.userService.getDecodedAccessToken(localStorage.getItem('token')).companies;

    //   if(company.includes('mekFinanz')){
    //     this.showmekFinanz=true
    //   }

    //   if(company.includes('fiorettoimmob')){
    //     this.showFiorettoImmob=true;
    //   }

    //   if(company.includes('birema')){
    //     this.showBirema=true;
    //   }

    //   if(company.includes('fiorettomedia')){
    //     this.showFiorettoMedia=true;
    //   }

    //   if(company.includes('airmage')){
    //     this.showAirmage=true;
    //   }

    //   if(company.includes('horaidetektei')){
    //     this.showHoraiDetektei=true;
    //   }

    //   if(company.includes('varioimport')){
    //     this.showVarioImport=true;
    //   }

    //   if(company.includes('sterbvorsoge')){
    //     this.showSterbVorsoge=true;
    //   }

    //   if(company.includes('checkntrack'))
    //   {
    //     this.showCheckntrack=true;
    //   }

    return;
  }
  dataconvert(bytes: number = 0, precision: number | unitPrecisionMap = defaultPrecisionMap): string {

    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';

    let unitIndex = 0;

    while (bytes >= 1024) {
      bytes /= 1024;
      unitIndex++;
    }

    const unit = this.units[unitIndex];

    if (typeof precision === 'number') {
      return `${bytes.toFixed(+precision)} ${unit}`;
    }
    return `${bytes.toFixed(precision[unit])} ${unit}`;
  }
  handlepassportImageChange(
    event: any,
    preview: string,
    docName: string,
    idname: any
  ) {
    let that = this;
    event.preventDefault();
    this.uploadingdoc = true;
    this.showsavebutton = true;
    console.log("passport array" + JSON.stringify(this.signeddoc))
    console.log("dataaa" + preview);
    console.log("dataaa" + docName);
    console.log("dataaa" + idname);
    $("#result").html("");
    let StringTemple;
    let StringTemple1;
    const removeData = (j) => {
      this.filearraynew.splice(j, 1);
      this.documentpassid[j] = "";
      this.documentpasslist[j] = "";
      $("#" + idname).val("");
      if (this.filearraynew.length == 0) {
        this.edited = true;
      } else {
        this.showButton = false;
      }
      console.log("documentpasslist" + JSON.stringify(this.documentpasslist));
      console.log("documentpassid" + JSON.stringify(this.documentpassid));
    };

    var files = event.target.files;
    console.log("events" + event.target.files);
    var filesLength = files.length;

    for (let i = 0; i < filesLength; i++) {
      let f = files[i];
      this.filearraynew.push(f);
      this.documentpassid[idname] = f;
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



        StringTemple =
          '<div class="pip"  style=" display: inline-block; margin: auto !important; position: relative;" id="div3">' +
          "" +
          '<div  class="removepreview" id="removepreviewid' +
          idname +
          '" style="background: #184297;border-radius: 50%;width:30px;height:30px;font-size: 14px;padding: 6px;color: white;position: absolute;margin-top: 2px;   margin-left: auto;cursor: pointer;right:0; top:8px; ">X</div>' +
          "" +
          '<img class="imageThumb" style="width: 100%;height:150px;    background: #e7e7e7;    margin-top: 10px; object-fit: contain;" src="' +
          ImageName +
          '" title="' +
          f.name +
          '"/>' +
          "<div " + 'style=" height: 75px; overflow:hidden"'
          + "><div> <b>Dokumentenname: " +
          f.name +
          "</b> </div><div> <b>Dateigröße: " +
          Size +
          "</b> </div></div>" +
          '   <div class="progress form-group " id="progressnew' + idname + '" style="background-color: grey;width: 100%;"> <div class="percentageclass' + idname + ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' + idname + '" [style.width.%]=""> </div> </div>'
          +
          " </div>"
          + "</div>";
        StringTemple1 =
          ' <div style="border: 1px solid #d1d1d1; margin-top:10px;">' +
          "" +
          '<h3 style="margin: 0px;height: 176px;   display: grid;  align-items: center;     text-align: center; margin: auto; width: 100%;font-size: inherit;">Vorschau</h3></div>';
        $("#" + preview + idname).html(StringTemple);


        // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> KB </div>`).insertAfter(".pip")
        $("#removepreviewid" + idname).click(function () {
          removeData(i);
          // $("#pipremove" + i).remove();
          $(this).parent(".pip").remove();
          $("#showtick" + idname).hide();
          $("#" + preview + idname).html(StringTemple1);
          // $("#previewbox" + idname).show();
          that.signeddoc.pop({ id: "passportpic", index: idname });

        });
      };
      fileReader.readAsDataURL(f);

      const formData = new FormData();
      formData.append("document", f);
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

            // this.progress[newsize] = Math.round(event.loaded / event.total * 100);
            $('div.percentageclass' + idname).width(Math.round((event.loaded / event.total) * 100) + "%");
            $('div.percentageclass' + idname).html(Math.round((event.loaded / event.total) * 100) + "%");

            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            $('#progressnew' + idname).css("display", "none");
            $('div.percentageclass' + idname).width("0%");
            $('div.percentageclass' + idname).html('');
            this.uploadingdoc = false;
            $("#showtick" + idname).show();
            let obj = this.signeddoc.find((o, i) => {

              if (o.id == 'passportpic' && o.index == idname) {
                return true; // stop searching
              }
            });

            if (obj) {
              console.log("singed array" + JSON.stringify(this.signeddoc))
            } else {
              this.signeddoc.push({ id: "passportpic", index: idname });

              console.log("singed array" + JSON.stringify(this.signeddoc))
            }


          //             setTimeout(() => {

          //               $('#progressnew'+idname).css("display","none");
          //             this.documentpassid[idname]=event.body.document_unique_id;
          //             // let StringTypeCasting:any = Math.round(
          //             //   this.filearray[newsize].size / 1024
          //             // );
          //             let Size111 = f.size;
          //             let StringTypeCasting = this.dataconvert(Size111);
          //             let typeofimage = f.type;
          //             let dateofdocument = f.lastModified;
          //             let tags=[]
          //             let newtage=StringTypeCasting+","+typeofimage+","+dateofdocument;
          //             tags.push(newtage);
          // let document_name = docName + idname;

          //             this.documentpasslist[idname]={
          //               document_unique_id:event.body.document_unique_id,
          //               document_type:  "Passport Document",
          //               document_sub_type: " ",
          //               user_id: this.id,
          //               companycode: "42140 DFG Finanzprofi GmbH",

          //               brand: "Cefima",
          //               tags: tags,
          //               upload_by: "cefima_document",
          //               product_partner:" ",
          //               document_name:document_name,
          //               created_by:this.id
          //             };
          //             console.log("documentpasslist"+JSON.stringify(this.documentpasslist));
          //             console.log("documentpassid"+JSON.stringify(this.documentpassid));
          //             }, 1500);

        }
      })
    }

    console.log("filearray" + this.filearray);
  }

  async handleImageChange(
    event: any,
    preview: string,
    docName: string,
    idname: any
  ) {
    event.preventDefault();
    this.uploadingvideo = true;
    $("#result").html("");
    let StringTemple;
    this.showButton = true;
    const removeData = (j) => {
      this.filearraynew.splice(j, 1);
      this.documentid[j] = "";
      this.documentlist[j] = "";
      $("#" + idname).val("");
      if (this.filearraynew.length == 0) {
        this.edited = true;
      } else {
        this.showButton = false;
      }
      console.log("documentlist" + JSON.stringify(this.documentlist));
      console.log("documentlist" + JSON.stringify(this.documentid));
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

        if (extension == "mp4" || extension == "MP4" || extension == "mov" || extension == "MOV" || extension == "aiv" || extension == "AIV" || extension == "m4v" || extension == "M4V") {
          StringTemple =
            '<div class="pip"  style="display: inline-block; margin: auto  !important;" id="div3">' +
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
            '   <div class="progress form-group " id="progressnew' + idname + '" style="background-color: grey;width: 100%;"> <div class="percentageclass' + idname + ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' + idname + '" [style.width.%]=""> </div> </div>' +
            " </div>"
            + "</div>";
          $("#" + preview).html(StringTemple);

          $("#videoSourceWrapper" + idname).attr("src", URL.createObjectURL(files[i]));
        }
        else {

          StringTemple =
            '<div class="pip"  style=" display: inline-block; margin: auto !important;" id="div3">' +
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
            '   <div class="progress form-group " id="progressnew' + idname + '" style="background-color: grey;width: 100%;"> <div class="percentageclass' + idname + ' progress-bar progress-bar-striped bg-success" role="progressbar" id="percentage' + idname + '" [style.width.%]=""> </div> </div>' +
            " </div>"
            + "</div>";
          $("#" + preview).html(StringTemple);
        }
        // $(`<div> <b>  ${Math.round((f.size / 1024))} </b> KB </div>`).insertAfter(".pip")
        $("#removepreviewid" + preview).click(function () {
          removeData(i);
          // $("#pipremove" + i).remove();
          $(this).parent(".pip").remove();
        });
      };
      fileReader.readAsDataURL(f);

      const formData = new FormData();
      formData.append("document", f);
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

            // this.progress[newsize] = Math.round(event.loaded / event.total * 100);
            $('div.percentageclass' + idname).width(Math.round((event.loaded / event.total) * 100) + "%");
            $('div.percentageclass' + idname).html(Math.round((event.loaded / event.total) * 100) + "%");

            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);

            setTimeout(() => {

              $('#progressnew' + idname).css("display", "none");
              $('#progressnew' + idname).css('width', '0');

              $('div.percentageclass' + idname).width("0");
              $('div.percentageclass' + idname).css('width', '0');
              $('div.percentageclass' + idname).html('');
              this.documentid[idname] = event.body.document_unique_id;
              this.uploadingvideo = false;
              // let StringTypeCasting:any = Math.round(
              //   this.filearray[newsize].size / 1024
              // );
              let Size111 = f.size;
              let StringTypeCasting = Math.round(f.size / 1024);
              let typeofimage = f.type;
              let dateofdocument = f.lastModified;
              let tags = []
              let newtage = StringTypeCasting.toString() + "," + typeofimage + "," + dateofdocument;
              tags.push(newtage);
              let document_name = docName;

              this.documentlist[idname] = {
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
                created_by: this.id
              };
              console.log("documentlist" + JSON.stringify(this.documentlist));
              console.log("documentlist" + JSON.stringify(this.documentid));
            }, 1500);

        }
      })
    }

    console.log(this.filearray);
  }
  setCompanyCondition(company) {
    if (company.includes("cefima_b2b")) {
      this.showmekFinanz = true;
    }

    if (company.includes("fiorettoimmob_b2b")) {
      this.showFiorettoImmob = true;
    }

    if (company.includes("birema_b2b")) {
      this.showBirema = true;
    }

    if (company.includes("fiorettomedia_b2b")) {
      this.showFiorettoMedia = true;
    }

    if (company.includes("airmage_b2b")) {
      this.showAirmage = true;
    }

    if (company.includes("horaidetektei_b2b")) {
      this.showHoraiDetektei = true;
    }

    if (company.includes("varioimport_b2b")) {
      this.showVarioImport = true;
    }

    if (company.includes("sterbvorsoge_b2b")) {
      this.showSterbVorsoge = true;
    }

    if (company.includes("checkntrack_b2b")) {
      this.showCheckntrack = true;
    }
  }
  gotosessionmaindata() {
    let url = window.location.href;
    console.log("url" + url);
    if (this.currentActiveRole == 'b2b') {
      console.log("localdata" + JSON.stringify(this.localdata))
      this.router.navigate(["/b2b-dashboard"], {
        queryParams: { id: this.currentid },
      });
    }
    else {
      this.router.navigate(["/kunde-home"], {
        queryParams: { id: this.localdata._id, tabname: 1 },
      });
    }

  }
  //Kunde
  Cus() {
    if (
      this.userService.getDecodedAccessToken(localStorage.getItem("token"))
        .roles == "customer"
    ) {
      this.showCustomer = false;
    }
  }

  //User Logout
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["./"]);
    document.body.classList.remove("modal-open");
  }

  backloginnew() {
    this.SecDomChange = "";
    $("#hide1").css("display", "block");
    $("#hide3").css("display", "block");
    $("#hide2").css("display", "block");
    // $("#col-3").css("display", "none");
    // $("#col-6").css("display", "none");
    // $("#col-3").css("display", "none");
    $("#maindetan").css("display", "none");
  }

  DomChange() {
    this.SecDomChange = "hide";
    $("#hide1").css("display", "none");
    $("#hide3").css("display", "none");
    $("#hide2").css("display", "none");
    $("#maindetan").css("display", "block");
  }
  // saveprogress(signarray: any = []) {
  //   console.log("function" + JSON.stringify(signarray))


  //   let that = this;
  //   $("#loaderouterid").css("display", "block");

  //   this.userService
  //     .getLastdocument()
  //     .pipe(first())
  //     .subscribe((data) => {
  //       console.log("ticket_no" + data);
  //       this.TicketNo = "40-ce-" + data;

  //       for (let i = 0; i < signarray.length; i++) {


  //         if (signarray[i].id == 'firstesign') {

  //         }
  //       }
  //       var values = {
  //         image: "",
  //         document_type: "",
  //         document_sub_type: "",
  //         user_id: "",
  //         product_partner: "",
  //         companycode: "",
  //         brand: "",
  //         tags: [],
  //         upload_by: "",
  //         ticket_no: "",
  //         created_by: "",
  //         document_name: "",
  //       };

  //       $("#modelfirst").css("display", "block");
  //       var doc = new jsPDF("portrait", "pt", "a4");
  //       var width = doc.internal.pageSize.width;
  //       doc.html(document.getElementById("modelfirst"), {
  //         html2canvas: {
  //           // insert html2canvas options here, e.g.
  //           width: width,
  //         },
  //         callback: function (doc) {
  //           this.pdffile = doc.output("blob");

  //           $("#modelfirst").css("display", "none");
  //           values.image = this.pdffile;
  //           values.document_type = "Allgemeines Dokument";
  //           values.document_sub_type = "Vermittlervertrag";
  //           values.document_name = "Vermittlervertrag";

  //           values.user_id = that.id;
  //           values.product_partner = " ";

  //           values.companycode = "42140 DFG Finanzprofi GmbH";
  //           values.brand = "cefima";
  //           values.upload_by = "cefima_document";
  //           values.ticket_no = "40-ce-" + data;
  //           //values.created_by = this.id.toString()
  //           values.tags.push(Math.round(this.pdffile.size / 1024));
  //           //values.tags.push(MainType);
  //           // values.tags.push(Date);
  //           values.tags.push("application/pdf");
  //           values.tags.push(new Date().getTime());
  //           that.uploadDocumentforVollmacht(values);
  //           values.tags = [];
  //         },
  //       });

  //       var values11 = {
  //         image: "",
  //         document_type: "",
  //         document_sub_type: "",
  //         user_id: "",
  //         product_partner: "",
  //         companycode: "",
  //         brand: "",
  //         tags: [],
  //         upload_by: "",
  //         ticket_no: "",
  //         created_by: "",
  //         document_name: "",
  //       };

  //       $("#modelsecond").css("display", "block");
  //       var doc11 = new jsPDF("portrait", "pt", "a4");

  //       var width = doc11.internal.pageSize.width;
  //       doc11.html(document.getElementById("modelsecond"), {
  //         html2canvas: {
  //           // insert html2canvas options here, e.g.
  //           width: width,
  //         },
  //         callback: function (doc11) {
  //           this.pdffile2 = doc11.output("blob");
  //           $("#modelsecond").css("display", "none");

  //           values11.image = this.pdffile2;
  //           values11.document_type = "Allgemeines Dokument";
  //           values11.document_sub_type = "Datenweiterverarbeitung Vertrag";
  //           values11.document_name = "Datenweiterverarbeitung Vertrag";
  //           values11.user_id = that.id;
  //           values11.product_partner = " ";

  //           values11.companycode = "42140 DFG Finanzprofi GmbH";
  //           values11.brand = "cefima";
  //           values11.upload_by = "cefima_document";
  //           values11.ticket_no = "40-ce-" + data;
  //           //values11.created_by = this.id.toString()
  //           values11.tags.push(Math.round(this.pdffile2.size / 1024));
  //           //values11.tags.push(MainType);
  //           // values11.tags.push(Date);
  //           values11.tags.push("application/pdf");
  //           values11.tags.push(new Date().getTime());
  //           that.uploadDocumentforVollmacht(values11);
  //           values11.tags = [];
  //         },
  //       });

  //       var values3 = {
  //         image: "",
  //         document_type: "",
  //         document_sub_type: "",
  //         user_id: "",
  //         product_partner: "",
  //         companycode: "",
  //         brand: "",
  //         tags: [],
  //         upload_by: "",
  //         ticket_no: "",
  //         created_by: "",
  //         document_name: "",
  //       };
  //       var doc2 = new jsPDF("portrait", "pt", "a4");
  //       $("#modelthird").css("display", "block");
  //       var width = doc2.internal.pageSize.width;
  //       doc2.html(document.getElementById("modelthird"), {
  //         html2canvas: {
  //           // insert html2canvas options here, e.g.
  //           width: width,
  //         },
  //         callback: function (doc2) {
  //           this.pdffile3 = doc2.output("blob");
  //           $("#modelthird").css("display", "none");

  //           values3.image = this.pdffile3;
  //           values3.document_type = "Allgemeines Dokument";
  //           values3.document_sub_type = "Bürgschaft Wirtschaftliche Eigentümer";
  //           values3.document_name = "Bürgschaft Wirtschaftliche Eigentümer";
  //           values3.user_id = that.id;
  //           values3.product_partner = " ";

  //           values3.companycode = "42140 DFG Finanzprofi GmbH";
  //           values3.brand = "cefima";
  //           values3.upload_by = "cefima_document";
  //           values3.ticket_no = "40-ce-" + data;
  //           //values3.created_by = this.id.toString()
  //           values3.tags.push(Math.round(this.pdffile3.size / 1024));
  //           //values3.tags.push(MainType);
  //           // values3.tags.push(Date);
  //           values3.tags.push("application/pdf");
  //           values3.tags.push(new Date().getTime());
  //           that.uploadDocumentforVollmacht(values3);
  //           values3.tags = [];
  //         },
  //       });

  //       var values4 = {
  //         image: "",
  //         document_type: "",
  //         document_sub_type: "",
  //         user_id: "",
  //         product_partner: "",
  //         companycode: "",
  //         brand: "",
  //         tags: [],
  //         upload_by: "",
  //         ticket_no: "",
  //         created_by: "",
  //         document_name: "",
  //       };
  //       var doc3 = new jsPDF("portrait", "pt", "a4");
  //       $("#modelfourth").css("display", "block");
  //       // $("#modelfourth2").css("display", "block");
  //       var width = doc3.internal.pageSize.width;
  //       doc3.html(document.getElementById("modelfourth"), {
  //         html2canvas: {
  //           // insert html2canvas options here, e.g.
  //           width: width,
  //         },
  //         callback: function (doc3) {
  //           this.pdffile4 = doc3.output("blob");
  //           $("#modelfourth").css("display", "none");

  //           values4.image = this.pdffile4;
  //           values4.document_type = "Allgemeines Dokument";
  //           values4.document_sub_type = "Power of attorney";
  //           values4.document_name = "Maklervollmacht";
  //           values4.user_id = that.id;
  //           values4.product_partner = " ";

  //           values4.companycode = "42140 DFG Finanzprofi GmbH";
  //           values4.brand = "cefima";
  //           values4.upload_by = "cefima_document";
  //           values4.ticket_no = "40-ce-" + data;
  //           //values4.created_by = this.id.toString()
  //           values4.tags.push(Math.round(this.pdffile4.size / 1024));
  //           //values4.tags.push(MainType);
  //           // values4.tags.push(Date);
  //           values4.tags.push("application/pdf");
  //           values4.tags.push(new Date().getTime());
  //           that.uploadDocumentforVollmacht(values4);
  //           values4.tags = [];
  //         },
  //       });
  //     });
  // }
  getDimensions(id, index) {
    var obj = this.signeddoc.filter(function (node) {
      return (node.id == id && node.index == index) ? true : false;
    });

    return obj;
  }

  uploadthirddoc(i, user_id, ticket_no, docname) {
    return new Promise(resolve => {
      console.log("reached here");
      let firstpdfbrokerdetail = this.localData.firstname + " " + this.localData.lastname;
      if (this.localData.title == "Firma") {

        firstpdfbrokerdetail = firstpdfbrokerdetail + "/" + this.localData.companyname;
      }
      firstpdfbrokerdetail = firstpdfbrokerdetail + ", " + this.localData.strassa + " "
        + this.localData.strno
        + ", " + this.localData.plz + " " + this.localData.city;
      $("#brokerdetails3").html(firstpdfbrokerdetail);
      console.log("reached here");
      $(".shareholderdetailsclass").css("display", "none");
      $("#shareholderdetails" + i).css("display", "block")
      $(".shareholderdetailsclasspdf").css("display", "none");
      $("#shareholderdetailspdf" + i).css("display", "block")
      $(".shareholderdesignationclass").css("display", "none");
      $("#shareholderdesignation" + i).css("display", "block")
      $(".shareholderdesignationclasspdf").css("display", "none");
      $("#shareholderdesignationpdf" + i).css("display", "block")
      $(".imageidclass").css("display", "none");
      $("#imageidthirdesign" + i).css("display", "block");
      $(".imageidclasspdf").css("display", "none");
      $("#imageid1thirdesign" + i).css("display", "block");

      console.log("reached here");

      let that = this;
      var values3 = {
        image: "",
        document_type: "",
        document_sub_type: "",
        user_id: "",
        product_partner: "",
        companycode: "",
        brand: "",
        tags: [],
        upload_by: "",
        ticket_no: "",
        created_by: "",
        document_name: "",
      };
      var doc2 = new jsPDF("portrait", "pt", "a4");
      $("#modelthird").css("display", "block");
      var width = doc2.internal.pageSize.width;
      console.log("reached here");
      doc2.html(document.getElementById("modelthird"), {
        html2canvas: {
          // insert html2canvas options here, e.g.
          width: width,
        },
        callback: function (doc2) {
          console.log("reached here");
          // this.pdffile3 = doc2.output("blob");
          // doc2.save("MaklerVollmacht.pdf");
          // $("#modelthird").css("display", "none");
          this.pdffile3 = doc2.output("blob");
          console.log("reached here");
          $("#modelthird").css("display", "none");
          console.log("reached here");
          let document_name = "Bürgschaft Wirtschaftliche Eigentümer " + docname;
          console.log("reached here");
          values3.image = this.pdffile3;
          console.log("reached here");
          values3.document_type = "Allgemeines Dokument";
          console.log("reached here");
          values3.document_sub_type = "Bürgschaft Wirtschaftliche Eigentümer";
          console.log("reached here");
          values3.document_name = document_name;
          console.log("reached here");
          values3.user_id = user_id;
          console.log("reached here");
          values3.product_partner = "" + i;
          console.log("reached here");
          values3.companycode = "42140 DFG Finanzprofi GmbH";
          values3.brand = "cefima";
          values3.upload_by = "cefima_document";
          values3.ticket_no = ticket_no;
          //values3.created_by = this.id.toString()
          values3.tags.push(Math.round(this.pdffile3.size / 1024));
          //values3.tags.push(MainType);
          // values3.tags.push(Date);
          values3.tags.push("application/pdf");
          values3.tags.push(new Date().getTime());
          console.log("reached here");
          that.uploadDocumentforVollmacht(values3);
          console.log("reached here");

          values3.tags = [];
          resolve(true);
        },
      });

    });
  }
  uploadthirdpassportdoc(i, user_id, ticket_no, docname) {
    return new Promise(resolve => {
      console.log("reached here");


      console.log("reached here");

      let that = this;
      var values3 = {
        image: "",
        document_type: "",
        document_sub_type: "",
        user_id: "",
        product_partner: "",
        companycode: "",
        brand: "",
        tags: [],
        upload_by: "",
        ticket_no: "",
        created_by: "",
        document_name: "",
      };



      let document_name = "Upload Ausweisdokument " + docname;
      console.log("reached here");
      values3.image = this.documentpassid[i];
      console.log("reached here");
      values3.document_type = "Allgemeines Dokument";
      console.log("reached here");
      values3.document_sub_type = "Upload Ausweisdokument";
      console.log("reached here");
      values3.document_name = document_name;
      console.log("reached here");
      values3.user_id = user_id;
      console.log("reached here");
      values3.product_partner = "" + i;
      console.log("reached here");
      values3.companycode = "42140 DFG Finanzprofi GmbH";
      values3.brand = "cefima";
      values3.upload_by = "cefima_document";
      values3.ticket_no = ticket_no;
      //values3.created_by = this.id.toString()
      values3.tags.push(Math.round(this.documentpassid[i].size / 1024));
      //values3.tags.push(MainType);
      // values3.tags.push(Date);
      values3.tags.push("application/pdf");
      values3.tags.push(new Date().getTime());
      console.log("reached here");
      that.uploadDocumentforVollmacht(values3);
      console.log("reached here");

      values3.tags = [];
      resolve(true);


    });
  }
  _handleImageUpload = () => {


    this.TicketNo = this.localData.brokerregticketno;
    var values = {
      image: "",
      document_type: "",
      document_sub_type: "",
      user_id: "",
      product_partner: "",
      companycode: "",
      brand: "",
      tags: [],
      upload_by: "",
      ticket_no: "",
      document_name: "",
    };

    console.log("filearray" + JSON.stringify(this.filearray));
    for (let i = 0; i < this.filearray.length; i++) {
      console.log(Math.round(this.filearray[i].size / 1024));
      let MainType = this.filearray[i].type;
      let Date = this.filearray[i].lastModified;
      let StringTypeCasting = Math.round(this.filearray[i].size / 1024);
      //var document_type = "Allgemeines Dokument";
      values.image = this.filearray[i];
      values.document_type = "Passportpic Dokument";
      values.document_sub_type = this.filename[i];
      values.document_name = this.filename[i];
      values.user_id = this.id;
      values.product_partner = " ";
      values.companycode = "42140 DFG Finanzprofi GmbH";
      values.brand = "cefima";
      values.upload_by = "cefima_document";
      values.ticket_no = this.localData.brokerregticketno;
      // tagssize.push({ size: Math.round(this.filearray[i].size / 1024) });
      values.tags.push(StringTypeCasting.toString());
      values.tags.push(MainType);
      values.tags.push(Date);
      this.uploadDocument(values, i);
      values.tags = [];
      console.log(values);
    }
    // $(".pip").remove();

    this.filearraynew = [];
    // });
  };
  uploadDocument(values: any, index: any) {
    let length = this.filearray.length;
    $("#loaderouterid").css("display", "block");
    const formData = new FormData();
    formData.append("document_type", values.document_type);
    formData.append("document_sub_type", values.document_sub_type);
    formData.append("product_partner", values.product_partner);
    formData.append("user", values.user_id);
    formData.append("companycode", values.companycode);
    formData.append("brand", values.brand);
    formData.append("tags", values.tags);
    formData.append("upload_by", values.upload_by);
    formData.append("ticket_no", values.ticket_no);
    formData.append("document_name", values.document_name);
    if (values.image !== "") {
      formData.append("document", values.image);
    }
    // this.UploadDone = true;
    this.userService
      .callApiuploaddocumentnew(formData)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(length, index);
          if (length == index + 1) {
            $("#loaderouterid").css("display", "none");
            Swal.fire({
              title: `Wir überprüfen Ihre Daten innerhalb von einem Werktag und stellen Ihnen
            nach erfolgreicher Prüfung Ihren Vermittlervertrag zur Verfügung.
            Hierzu erhalten Sie eine E-Mail. <br>
            Vorgangs Nr.: ${this.TicketNo}.`,
              showCloseButton: true,
              allowOutsideClick: false,
              icon: "success",
            })
              .then((result) => {
                console.log(result);
                if (result["isDismissed"]) {
                  // this.logout();
                  this.logout();
                  console.log("iffffff");
                  // this.router.navigate([`/upload-document/${this.user_id}`], {
                  //   queryParams: { user_id: this.user_id },
                  // });
                } else {
                  console.log("elsesssssssss");
                  this.logout();
                }
              })
              .catch((err) => { });
          }
          $("#Success").html(`<div class="alert alert-success" role="alert">
        Erfolgreich hochgeladen
      </div>`);
          $("#Success").css("text-align", "center");
          $("#Success").css("font-size", "30px");
          console.log("POST Request is successful ", data);
          // this.UploadDone = true;
        },
        (error) => {
          $("#loaderouterid").css("display", "none");
          // this.UploadError = true;
          console.log("Error", error["error"]);
        },
        () => { }
      );
  }
  moveForward() {
    console.log("moveforward");
    let data = {
      "_id": this.localData._id,
      "website_url": this.docFromGroup.value.website_url,
      "marketingcustomerno": this.docFromGroup.value.phone_number,
      "documentlist": this.documentlist,
      "documentid": this.documentid,
      "ticket_no": this.localData.brokerregticketno,
    }

    $('#loaderouterid').css("display", "block");
    this.userService.senduserdetails(data).subscribe(
      (success: any) => {
        // if success and error give response
        if (success.status == 200) {
          $('#loaderouterid').css("display", "none");
          localStorage.setItem("currentUser", JSON.stringify(success.result))
          // window.location.reload();
          this.reloadComponent();
        } else {

        }
      },
      (rejected) => {
        console.log(rejected);
      }
    );
  }
  finalsaveuploadthirddoc(i, user_id, ticket_no, docname) {
    return new Promise(resolve => {
      console.log("reached here");
      let firstpdfbrokerdetail = this.localData.firstname + " " + this.localData.lastname;
      if (this.localData.title == "Firma") {

        firstpdfbrokerdetail = firstpdfbrokerdetail + "/" + this.localData.companyname;
      }
      firstpdfbrokerdetail = firstpdfbrokerdetail + ", " + this.localData.strassa + " "
        + this.localData.strno
        + ", " + this.localData.plz + " " + this.localData.city;
      $("#brokerdetails3").html(firstpdfbrokerdetail);
      console.log("reached here");
      $(".shareholderdetailsclass").css("display", "none");
      $("#shareholderdetails" + i).css("display", "block")
      $(".shareholderdetailsclasspdf").css("display", "none");
      $("#shareholderdetailspdf" + i).css("display", "block")
      $(".shareholderdesignationclass").css("display", "none");
      $("#shareholderdesignation" + i).css("display", "block")
      $(".shareholderdesignationclasspdf").css("display", "none");
      $("#shareholderdesignationpdf" + i).css("display", "block")
      $(".imageidclass").css("display", "none");
      $("#imageidthirdesign" + i).css("display", "block");
      $(".imageidclasspdf").css("display", "none");
      $("#imageid1thirdesign" + i).css("display", "block");

      console.log("reached here");

      let that = this;
      var values3 = {
        image: "",
        document_type: "",
        document_sub_type: "",
        user_id: "",
        product_partner: "",
        companycode: "",
        brand: "",
        tags: [],
        upload_by: "",
        ticket_no: "",
        created_by: "",
        document_name: "",
      };
      var doc2 = new jsPDF("portrait", "pt", "a4");
      $("#modelthird").css("display", "block");
      var width = doc2.internal.pageSize.width;
      console.log("reached here");
      doc2.html(document.getElementById("modelthird"), {
        html2canvas: {
          // insert html2canvas options here, e.g.
          width: width,
        },
        callback: function (doc2) {
          console.log("reached here");
          // this.pdffile3 = doc2.output("blob");
          // doc2.save("MaklerVollmacht.pdf");
          // $("#modelthird").css("display", "none");
          this.pdffile3 = doc2.output("blob");
          console.log("reached here");
          $("#modelthird").css("display", "none");
          console.log("reached here");
          let document_name = "Bürgschaft Wirtschaftliche Eigentümer " + docname;
          console.log("reached here");
          values3.image = this.pdffile3;
          console.log("reached here");
          values3.document_type = "Allgemeines Dokument";
          console.log("reached here");
          values3.document_sub_type = "Bürgschaft Wirtschaftliche Eigentümer";
          console.log("reached here");
          values3.document_name = document_name;
          console.log("reached here");
          values3.user_id = user_id;
          console.log("reached here");
          values3.product_partner = "" + i;
          console.log("reached here");
          values3.companycode = "42140 DFG Finanzprofi GmbH";
          values3.brand = "cefima";
          values3.upload_by = "cefima_document";
          values3.ticket_no = ticket_no;
          //values3.created_by = this.id.toString()
          values3.tags.push(Math.round(this.pdffile3.size / 1024));
          //values3.tags.push(MainType);
          // values3.tags.push(Date);
          values3.tags.push("application/pdf");
          values3.tags.push(new Date().getTime());
          console.log("reached here");
          that.finalsaveuploadDocumentforVollmacht(values3);
          console.log("reached here");

          values3.tags = [];
          resolve(true);
        },
      });

    });
  }
  finalsaveuploadthirdpassportdoc(i, user_id, ticket_no, docname) {
    return new Promise(resolve => {
      console.log("reached here");

      console.log("reached here");

      let that = this;
      var values3 = {
        image: "",
        document_type: "",
        document_sub_type: "",
        user_id: "",
        product_partner: "",
        companycode: "",
        brand: "",
        tags: [],
        upload_by: "",
        ticket_no: "",
        created_by: "",
        document_name: "",
      };



      console.log("reached here");

      console.log("reached here");
      let document_name = "Upload Ausweisdokument " + docname;
      console.log("reached here");
      values3.image = this.documentpassid[i];
      console.log("reached here");
      values3.document_type = "Allgemeines Dokument";
      console.log("reached here");
      values3.document_sub_type = "Upload Ausweisdokument";
      console.log("reached here");
      values3.document_name = document_name;
      console.log("reached here");
      values3.user_id = user_id;
      console.log("reached here");
      values3.product_partner = "" + i;
      console.log("reached here");
      values3.companycode = "42140 DFG Finanzprofi GmbH";
      values3.brand = "cefima";
      values3.upload_by = "cefima_document";
      values3.ticket_no = ticket_no;
      //values3.created_by = this.id.toString()
      values3.tags.push(Math.round(this.documentpassid[i].size / 1024));
      //values3.tags.push(MainType);
      // values3.tags.push(Date);
      values3.tags.push("application/pdf");
      values3.tags.push(new Date().getTime());
      console.log("reached here");
      that.finalsaveuploadDocumentforVollmacht(values3);
      console.log("reached here");

      values3.tags = [];
      resolve(true);


    });
  }

  async uploaddocumnetnew(signname, index) {
    console.log("asdgysatdghsadjsadsa123" + signname);
    return new Promise(async resolve => {
      let that = this;
      if (signname == 'firstesign') {
        var values = {
          image: "",
          document_type: "",
          document_sub_type: "",
          user_id: "",
          product_partner: "",
          companycode: "",
          brand: "",
          tags: [],
          upload_by: "",
          ticket_no: "",
          created_by: "",
          document_name: "",
        };

        let firstpdfbrokerdetail = this.localData.firstname + " " + this.localData.lastname;
        if (this.localData.title == "Firma") {

          firstpdfbrokerdetail = firstpdfbrokerdetail + "<br>" + this.localData.companyname;
        }
        firstpdfbrokerdetail = firstpdfbrokerdetail + "<br>" + this.localData.strassa + " " + this.localData.strno
          + "<br>" + this.localData.plz + " " + this.localData.city;



        $("#firstpdfbrokerdetail").html(firstpdfbrokerdetail);

        $("#modelfirst").css("display", "block");
        var doc = new jsPDF("portrait", "pt", "a4");
        var width = doc.internal.pageSize.width;
        doc.html(document.getElementById("modelfirst"), {
          html2canvas: {
            // insert html2canvas options here, e.g.
            width: width,
          },
          callback: function (doc) {

            this.pdffile = doc.output("blob");

            $("#modelfirst").css("display", "none");
            values.image = this.pdffile;
            values.document_type = "Allgemeines Dokument";
            values.document_sub_type = "Vermittlervertrag";
            values.document_name = "Vermittlervertrag";

            values.user_id = that.id;
            values.product_partner = " ";

            values.companycode = "42140 DFG Finanzprofi GmbH";
            values.brand = "cefima";
            values.upload_by = "cefima_document";
            values.ticket_no = that.TicketNo;
            //values.created_by = this.id.toString()
            values.tags.push(Math.round(this.pdffile.size / 1024));
            //values.tags.push(MainType);
            // values.tags.push(Date);
            values.tags.push("application/pdf");
            values.tags.push(new Date().getTime());
            that.uploadDocumentforVollmacht(values);
            values.tags = [];
            resolve(true);
          },
        });
      }
      if (signname == 'secondesign') {

        var values11 = {
          image: "",
          document_type: "",
          document_sub_type: "",
          user_id: "",
          product_partner: "",
          companycode: "",
          brand: "",
          tags: [],
          upload_by: "",
          ticket_no: "",
          created_by: "",
          document_name: "",
        };

        $("#modelsecond").css("display", "block");
        var doc11 = new jsPDF("portrait", "pt", "a4");

        var width = doc11.internal.pageSize.width;
        doc11.html(document.getElementById("modelsecond"), {
          html2canvas: {
            // insert html2canvas options here, e.g.
            width: width,
          },
          callback: function (doc11) {
            this.pdffile2 = doc11.output("blob");
            $("#modelsecond").css("display", "none");

            values11.image = this.pdffile2;
            values11.document_type = "Allgemeines Dokument";
            values11.document_sub_type = "Datenweiterverarbeitung Vertrag";
            values11.document_name = "Datenweiterverarbeitung Vertrag";
            values11.user_id = that.id;
            values11.product_partner = " ";

            values11.companycode = "42140 DFG Finanzprofi GmbH";
            values11.brand = "cefima";
            values11.upload_by = "cefima_document";
            values11.ticket_no = that.TicketNo;
            //values11.created_by = this.id.toString()
            values11.tags.push(Math.round(this.pdffile2.size / 1024));
            //values11.tags.push(MainType);
            // values11.tags.push(Date);
            values11.tags.push("application/pdf");
            values11.tags.push(new Date().getTime());
            that.uploadDocumentforVollmacht(values11);
            values11.tags = [];
            resolve(true);
          },
        });
      }
      if (signname == 'thirdesign') {
        for (let i = 0; i < this.localData.type3.legalrepresentativeform2.length; i++) {

          console.log("etthjdshhfgsdfs" + JSON.stringify(this.getDimensions('thirdesign', i)))
          if (signname == 'thirdesign' && index == i) {
            let docname = this.localData.type3.legalrepresentativeform2[i].firstname + " " + this.localData.type3.legalrepresentativeform2[i].lastname;
            let result = await this.uploadthirddoc(i, that.id, this.localData.brokerregticketno, docname);
            console.log("etthjdshhfgsdfs" + result)

          }

        }
        resolve(true);
      }
      if (signname == 'fourthesign') {


        var values4 = {
          image: "",
          document_type: "",
          document_sub_type: "",
          user_id: "",
          product_partner: "",
          companycode: "",
          brand: "",
          tags: [],
          upload_by: "",
          ticket_no: "",
          created_by: "",
          document_name: "",
        };
        var doc3 = new jsPDF("portrait", "pt", "a4");
        $("#modelfourth").css("display", "block");
        // $("#modelfourth2").css("display", "block");
        var width = doc3.internal.pageSize.width;
        doc3.html(document.getElementById("modelfourth"), {
          html2canvas: {
            // insert html2canvas options here, e.g.
            width: width,
          },
          callback: function (doc3) {
            this.pdffile4 = doc3.output("blob");
            $("#modelfourth").css("display", "none");

            values4.image = this.pdffile4;
            values4.document_type = "Allgemeines Dokument";
            values4.document_sub_type = "Power of attorney";
            values4.document_name = "Maklervollmacht";
            values4.user_id = that.id;
            values4.product_partner = " ";

            values4.companycode = "42140 DFG Finanzprofi GmbH";
            values4.brand = "cefima";
            values4.upload_by = "cefima_document";
            values4.ticket_no = that.TicketNo;
            //values4.created_by = this.id.toString()
            values4.tags.push(Math.round(this.pdffile4.size / 1024));
            //values4.tags.push(MainType);
            // values4.tags.push(Date);
            values4.tags.push("application/pdf");
            values4.tags.push(new Date().getTime());
            that.uploadDocumentforVollmacht(values4);


            values4.tags = [];
            resolve(true);
          },
        });
      }
      if (signname == 'passportpic') {
        for (let i = 0; i < this.localData.type3.legalrepresentativeform2.length; i++) {


          if (signname == 'passportpic' && index == i) {
            let docname = this.localData.type3.legalrepresentativeform2[i].firstname + " " + this.localData.type3.legalrepresentativeform2[i].lastname;
            let result = await this.uploadthirdpassportdoc(i, that.id, this.localData.brokerregticketno, docname);
            console.log("etthjdshhfgsdfs" + result)

          }

        }
        resolve(true);
      }

    });
  }

  async uploaddocumnetnewfinal(signname, index) {
    console.log("asdgysatdghsadjsadsa123" + signname);
    return new Promise(async resolve => {
      let that = this;
      if (signname == 'firstesign') {
        var values = {
          image: "",
          document_type: "",
          document_sub_type: "",
          user_id: "",
          product_partner: "",
          companycode: "",
          brand: "",
          tags: [],
          upload_by: "",
          ticket_no: "",
          created_by: "",
          document_name: "",
        };

        let firstpdfbrokerdetail = this.localData.firstname + " " + this.localData.lastname;
        if (this.localData.title == "Firma") {

          firstpdfbrokerdetail = firstpdfbrokerdetail + "<br>" + this.localData.companyname;
        }
        firstpdfbrokerdetail = firstpdfbrokerdetail + "<br>" + this.localData.strassa + " " + this.localData.strno
          + "<br>" + this.localData.plz + " " + this.localData.city;



        $("#firstpdfbrokerdetail").html(firstpdfbrokerdetail);

        $("#modelfirst").css("display", "block");
        var doc = new jsPDF("portrait", "pt", "a4");
        var width = doc.internal.pageSize.width;
        doc.html(document.getElementById("modelfirst"), {
          html2canvas: {
            // insert html2canvas options here, e.g.
            width: width,
          },
          callback: function (doc) {

            this.pdffile = doc.output("blob");

            $("#modelfirst").css("display", "none");
            values.image = this.pdffile;
            values.document_type = "Allgemeines Dokument";
            values.document_sub_type = "Vermittlervertrag";
            values.document_name = "Vermittlervertrag";

            values.user_id = that.id;
            values.product_partner = " ";

            values.companycode = "42140 DFG Finanzprofi GmbH";
            values.brand = "cefima";
            values.upload_by = "cefima_document";
            values.ticket_no = that.TicketNo;
            //values.created_by = this.id.toString()
            values.tags.push(Math.round(this.pdffile.size / 1024));
            //values.tags.push(MainType);
            // values.tags.push(Date);
            values.tags.push("application/pdf");
            values.tags.push(new Date().getTime());
            that.finalsaveuploadDocumentforVollmacht(values);
            values.tags = [];
            resolve(true);
          },
        });
      }
      if (signname == 'secondesign') {

        var values11 = {
          image: "",
          document_type: "",
          document_sub_type: "",
          user_id: "",
          product_partner: "",
          companycode: "",
          brand: "",
          tags: [],
          upload_by: "",
          ticket_no: "",
          created_by: "",
          document_name: "",
        };

        $("#modelsecond").css("display", "block");
        var doc11 = new jsPDF("portrait", "pt", "a4");

        var width = doc11.internal.pageSize.width;
        doc11.html(document.getElementById("modelsecond"), {
          html2canvas: {
            // insert html2canvas options here, e.g.
            width: width,
          },
          callback: function (doc11) {
            this.pdffile2 = doc11.output("blob");
            $("#modelsecond").css("display", "none");

            values11.image = this.pdffile2;
            values11.document_type = "Allgemeines Dokument";
            values11.document_sub_type = "Datenweiterverarbeitung Vertrag";
            values11.document_name = "Datenweiterverarbeitung Vertrag";
            values11.user_id = that.id;
            values11.product_partner = " ";

            values11.companycode = "42140 DFG Finanzprofi GmbH";
            values11.brand = "cefima";
            values11.upload_by = "cefima_document";
            values11.ticket_no = that.TicketNo;
            //values11.created_by = this.id.toString()
            values11.tags.push(Math.round(this.pdffile2.size / 1024));
            //values11.tags.push(MainType);
            // values11.tags.push(Date);
            values11.tags.push("application/pdf");
            values11.tags.push(new Date().getTime());
            that.finalsaveuploadDocumentforVollmacht(values11);
            values11.tags = [];
            resolve(true);
          },
        });
      }
      if (signname == 'thirdesign') {
        for (let i = 0; i < this.localData.type3.legalrepresentativeform2.length; i++) {

          console.log("etthjdshhfgsdfs" + JSON.stringify(this.getDimensions('thirdesign', i)))
          if (signname == 'thirdesign' && index == i) {
            let docname = this.localData.type3.legalrepresentativeform2[i].firstname + " " + this.localData.type3.legalrepresentativeform2[i].lastname;
            let result = await this.finalsaveuploadthirddoc(i, that.id, this.localData.brokerregticketno, docname);
            console.log("etthjdshhfgsdfs" + result)

          }

        }
        resolve(true);
      }
      if (signname == 'fourthesign') {


        var values4 = {
          image: "",
          document_type: "",
          document_sub_type: "",
          user_id: "",
          product_partner: "",
          companycode: "",
          brand: "",
          tags: [],
          upload_by: "",
          ticket_no: "",
          created_by: "",
          document_name: "",
        };
        var doc3 = new jsPDF("portrait", "pt", "a4");
        $("#modelfourth").css("display", "block");
        // $("#modelfourth2").css("display", "block");
        var width = doc3.internal.pageSize.width;
        doc3.html(document.getElementById("modelfourth"), {
          html2canvas: {
            // insert html2canvas options here, e.g.
            width: width,
          },
          callback: function (doc3) {
            this.pdffile4 = doc3.output("blob");
            $("#modelfourth").css("display", "none");

            values4.image = this.pdffile4;
            values4.document_type = "Allgemeines Dokument";
            values4.document_sub_type = "Power of attorney";
            values4.document_name = "Maklervollmacht";
            values4.user_id = that.id;
            values4.product_partner = " ";

            values4.companycode = "42140 DFG Finanzprofi GmbH";
            values4.brand = "cefima";
            values4.upload_by = "cefima_document";
            values4.ticket_no = that.TicketNo;
            //values4.created_by = this.id.toString()
            values4.tags.push(Math.round(this.pdffile4.size / 1024));
            //values4.tags.push(MainType);
            // values4.tags.push(Date);
            values4.tags.push("application/pdf");
            values4.tags.push(new Date().getTime());
            that.finalsaveuploadDocumentforVollmacht(values4);


            values4.tags = [];
            resolve(true);
          },
        });
      }
      if (signname == 'passportpic') {
        for (let i = 0; i < this.localData.type3.legalrepresentativeform2.length; i++) {


          if (signname == 'passportpic' && index == i) {
            let docname = this.localData.type3.legalrepresentativeform2[i].firstname + " " + this.localData.type3.legalrepresentativeform2[i].lastname;
            let result = await this.finalsaveuploadthirdpassportdoc(i, that.id, this.localData.brokerregticketno, docname);
            console.log("etthjdshhfgsdfs" + result)

          }

        }
        resolve(true);
      }

    });
  }


  async savedocument() {
    let that = this;
    $("#loaderouterid").css("display", "block");


    console.log("ticket_no" + this.localData.brokerregticketno);
    this.TicketNo = this.localData.brokerregticketno;

    for (let j = 0; j < this.signeddoc.length; j++) {
      let signname = this.signeddoc[j].id;
      let index = this.signeddoc[j].index;
      console.log("asdgysatdghsadjsadsa" + signname);
      let result = await this.uploaddocumnetnew(signname, index);
      console.log("asdgysatdghsadjsadsa" + signname);
      console.log("asdgysatdghsadjsadsa" + result);
    }


  }


  async finalsavedocument() {

    let that = this;
    $("#loaderouterid").css("display", "block");
    console.log("finalsavedocument" + this.type3count);
    console.log("finalsavedocument" + this.signeddoc.length);
    console.log("finalsavedocument" + this.completeupload);
    if (this.type3count == this.completeupload) {
      setTimeout(() => {
        Swal.fire({
          title: `Ihre Daten wurden erfolgreich gespeichert. Sie können beim nächsten Login die fehlenden Daten ergänzen. <br> Vorgangs Nr.: ${this.TicketNo}.`,
          showCloseButton: true,
          allowOutsideClick: false,
          icon: "success",
        })
          .then((result) => {
            console.log("himani" + result);
            if (result["isDismissed"]) {
              console.log("1234567elsesssssssss");

              //this.logout();

              //this.reloadCurrentRoute();

              this.reloadComponent();
            } else {
              console.log("1234567elsesssssssss");

              //this.logout();
              $("#loaderouterid").css("display", "none");
              //this.reloadCurrentRoute();

              this.reloadComponent();

            }
          })
          .catch((err) => { });

      }, 2000);

    } else {
      // this.userService
      //   .getLastdocument()
      //   .pipe(first())
      //   .subscribe(async (data) => {
      console.log("ticket_no" + this.localData.brokerregticketno);
      this.TicketNo = this.localData.brokerregticketno;
      for (let j = 0; j < this.signeddoc.length; j++) {
        let signname = this.signeddoc[j].id;
        let index = this.signeddoc[j].index;
        console.log("finalsavedocument" + signname);
        let result = await this.uploaddocumnetnewfinal(signname, index);
        console.log("finalsavedocument" + signname);
        console.log("finalsavedocument" + result);
      }



      //         if (this.getDimensions('firstesign', '').length > 0) {
      //           var values = {
      //             image: "",
      //             document_type: "",
      //             document_sub_type: "",
      //             user_id: "",
      //             product_partner: "",
      //             companycode: "",
      //             brand: "",
      //             tags: [],
      //             upload_by: "",
      //             ticket_no: "",
      //             created_by: "",
      //             document_name: "",
      //           };

      //           let firstpdfbrokerdetail = this.localData.firstname + " " + this.localData.lastname;
      //           if (this.localData.title == "Firma") {

      //             firstpdfbrokerdetail = firstpdfbrokerdetail + "<br>" + this.localData.companyname;
      //           }
      //           firstpdfbrokerdetail = firstpdfbrokerdetail + "<br>" + this.localData.strassa + " " + this.localData.strno
      //             + "<br>" + this.localData.plz + " " + this.localData.city;



      //           $("#firstpdfbrokerdetail").html(firstpdfbrokerdetail);

      //           $("#modelfirst").css("display", "block");
      //           var doc = new jsPDF("portrait", "pt", "a4");
      //           var width = doc.internal.pageSize.width;
      //           doc.html(document.getElementById("modelfirst"), {
      //             html2canvas: {
      //               // insert html2canvas options here, e.g.
      //               width: width,
      //             },
      //             callback: function (doc) {

      //               this.pdffile = doc.output("blob");

      //               $("#modelfirst").css("display", "none");
      //               values.image = this.pdffile;
      //               values.document_type = "Allgemeines Dokument";
      //               values.document_sub_type = "Vermittlervertrag";
      //               values.document_name = "Vermittlervertrag";

      //               values.user_id = that.id;
      //               values.product_partner = " ";

      //               values.companycode = "42140 DFG Finanzprofi GmbH";
      //               values.brand = "cefima";
      //               values.upload_by = "cefima_document";
      //               values.ticket_no =this.TicketNo;
      //               //values.created_by = this.id.toString()
      //               values.tags.push(Math.round(this.pdffile.size / 1024));
      //               //values.tags.push(MainType);
      //               // values.tags.push(Date);
      //               values.tags.push("application/pdf");
      //               values.tags.push(new Date().getTime());
      //               that.finalsaveuploadDocumentforVollmacht(values);
      //               values.tags = [];
      //             },
      //           });
      //         }
      //         if (this.getDimensions('secondesign', '').length > 0) {

      //           var values11 = {
      //             image: "",
      //             document_type: "",
      //             document_sub_type: "",
      //             user_id: "",
      //             product_partner: "",
      //             companycode: "",
      //             brand: "",
      //             tags: [],
      //             upload_by: "",
      //             ticket_no: "",
      //             created_by: "",
      //             document_name: "",
      //           };

      //           $("#modelsecond").css("display", "block");
      //           var doc11 = new jsPDF("portrait", "pt", "a4");

      //           var width = doc11.internal.pageSize.width;
      //           doc11.html(document.getElementById("modelsecond"), {
      //             html2canvas: {
      //               // insert html2canvas options here, e.g.
      //               width: width,
      //             },
      //             callback: function (doc11) {
      //               this.pdffile2 = doc11.output("blob");
      //               $("#modelsecond").css("display", "none");

      //               values11.image = this.pdffile2;
      //               values11.document_type = "Allgemeines Dokument";
      //               values11.document_sub_type = "Datenweiterverarbeitung Vertrag";
      //               values11.document_name = "Datenweiterverarbeitung Vertrag";
      //               values11.user_id = that.id;
      //               values11.product_partner = " ";

      //               values11.companycode = "42140 DFG Finanzprofi GmbH";
      //               values11.brand = "cefima";
      //               values11.upload_by = "cefima_document";
      //               values11.ticket_no = this.TicketNo;
      //               //values11.created_by = this.id.toString()
      //               values11.tags.push(Math.round(this.pdffile2.size / 1024));
      //               //values11.tags.push(MainType);
      //               // values11.tags.push(Date);
      //               values11.tags.push("application/pdf");
      //               values11.tags.push(new Date().getTime());
      //               that.finalsaveuploadDocumentforVollmacht(values11);
      //               values11.tags = [];
      //             },
      //           });
      //         }

      //         for (let i = 0; i < this.localData.type3.legalrepresentativeform2.length; i++) {

      //           console.log("etthjdshhfgsdfs" + JSON.stringify(this.getDimensions('thirdesign', i)))
      //           if (this.getDimensions('thirdesign', i).length > 0) {
      //             let docname=this.localData.type3.legalrepresentativeform2[i].firstname+" "+this.localData.type3.legalrepresentativeform2[i].lastname;
      // let result=await this.finalsaveuploadthirddoc(i,that.id,this.localData.brokerregticketno,docname);
      // console.log("etthjdshhfgsdfs" + result)
      //           }
      //         }

      //         if (this.getDimensions('fourthesign', '').length > 0) {


      //           var values4 = {
      //             image: "",
      //             document_type: "",
      //             document_sub_type: "",
      //             user_id: "",
      //             product_partner: "",
      //             companycode: "",
      //             brand: "",
      //             tags: [],
      //             upload_by: "",
      //             ticket_no: "",
      //             created_by: "",
      //             document_name: "",
      //           };
      //           var doc3 = new jsPDF("portrait", "pt", "a4");
      //           $("#modelfourth").css("display", "block");
      //           // $("#modelfourth2").css("display", "block");
      //           var width = doc3.internal.pageSize.width;
      //           doc3.html(document.getElementById("modelfourth"), {
      //             html2canvas: {
      //               // insert html2canvas options here, e.g.
      //               width: width,
      //             },
      //             callback: function (doc3) {
      //               this.pdffile4 = doc3.output("blob");
      //               $("#modelfourth").css("display", "none");

      //               values4.image = this.pdffile4;
      //               values4.document_type = "Allgemeines Dokument";
      //               values4.document_sub_type = "Power of attorney";
      //               values4.document_name = "Maklervollmacht";
      //               values4.user_id = that.id;
      //               values4.product_partner = " ";

      //               values4.companycode = "42140 DFG Finanzprofi GmbH";
      //               values4.brand = "cefima";
      //               values4.upload_by = "cefima_document";
      //               values4.ticket_no =this.TicketNo;
      //               //values4.created_by = this.id.toString()
      //               values4.tags.push(Math.round(this.pdffile4.size / 1024));
      //               //values4.tags.push(MainType);
      //               // values4.tags.push(Date);
      //               values4.tags.push("application/pdf");
      //               values4.tags.push(new Date().getTime());
      //               that.finalsaveuploadDocumentforVollmacht(values4);


      //               values4.tags = [];
      //             },
      //           });
      //         }
      // });
    }
  }

  uploadDocumentforVollmacht(values: any) {
    console.log("reached here");
    //$("#loaderouterid").css("display", "block");
    const formData = new FormData();
    formData.append("document_type", values.document_type);
    formData.append("document_sub_type", values.document_sub_type); // product_type
    formData.append("product_partner", values.product_partner);
    formData.append("user", values.user_id);
    formData.append("companycode", values.companycode);
    formData.append("brand", values.brand);
    formData.append("tags", values.tags);
    formData.append("upload_by", values.upload_by);
    formData.append("ticket_no", values.ticket_no);
    // formData.append("created_by", values.created_by);
    formData.append("document_name", values.document_name);
    if (values.image !== "") {
      formData.append("document", values.image);
    }
    // let type3count=parseInt(this.localData.type3.legalrepresentativeform2.length)+3;
    // if(type3count==this.completeupload)
    // {
    //   formData.append("uploaddocument", '1');
    // }
    // else{
    //   formData.append("uploaddocument", '0');
    // }

    console.log("reached here");

    this.userService
      .callApiMultipartmedia(formData)
      .pipe(first())
      .subscribe(
        (data) => {
          this.uploadfile++;
          this.completeupload++;
          if (this.uploadfile == this.signeddoc.length) {
            this.showsuccess = true;
            Swal.fire({
              title: `Ihre Daten wurden erfolgreich gespeichert. Sie können beim nächsten Login die fehlenden Daten ergänzen. <br> Vorgangs Nr.: ${this.TicketNo}.`,
              showCloseButton: true,
              allowOutsideClick: false,
              icon: "success",
            })
              .then((result) => {
                console.log("himani" + result);
                if (result["isDismissed"]) {
                  //window.location.reload();
                  // this.reloadCurrentRoute();
                   this.reloadComponent();
                  // this.logout();
                  // this.logout();
                  console.log("response1" + this.completeupload)
                  // this.userService.getregisteredbrokerdocument({id:this.localData._id}).subscribe((response)=>{
                  //   console.log("response"+JSON.stringify(response))
                  //   this.getregisteredbrokerdocument=response;
                  //   this.completeupload=this.getregisteredbrokerdocument.length;
                  //   this.signeddoc=[];
                  //   this.uploadfile=0;
                  //    console.log("completeupload"+this.completeupload)
                  //    $("#loaderouterid").css("display", "none");
                  //      })

                  console.log("iffffff");
                  // this.router.navigate([`/upload-document/${this.user_id}`], {
                  //   queryParams: { user_id: this.user_id },

                  // });
                } else {
                  console.log("elsesssssssss");
                  // window.location.reload();
                   this.reloadComponent();
                  // this.reloadCurrentRoute();
                  // this.logout();
                  $("#loaderouterid").css("display", "none");
                }
              })
              .catch((err) => { });
          }
        },
        (error) => {
          $("#loaderouterid").css("display", "none");

          console.log("Error", error);
        },
        () => { }
      );
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  finalsaveuploadDocumentforVollmacht(values: any) {
    console.log("reached here");
    //$("#loaderouterid").css("display", "block");
    const formData = new FormData();
    formData.append("document_type", values.document_type);
    formData.append("document_sub_type", values.document_sub_type); // product_type
    formData.append("product_partner", values.product_partner);
    formData.append("user", values.user_id);
    formData.append("companycode", values.companycode);
    formData.append("brand", values.brand);
    formData.append("tags", values.tags);
    formData.append("upload_by", values.upload_by);
    formData.append("ticket_no", values.ticket_no);
    // formData.append("created_by", values.created_by);
    formData.append("document_name", values.document_name);
    if (values.image !== "") {
      formData.append("document", values.image);
    }
    // let type3count=parseInt(this.localData.type3.legalrepresentativeform2.length)+3;
    // if(type3count==this.completeupload)
    // {
    //   formData.append("uploaddocument", '1');
    // }
    // else{
    //   formData.append("uploaddocument", '0');
    // }

    console.log("reached here");

    this.userService
      .callApiMultipartmedia(formData)
      .pipe(first())
      .subscribe(
        (data) => {
          this.uploadfile++;
          this.completeupload++;
          if (this.uploadfile == this.signeddoc.length) {
            this.showsuccess = true;
            this.userService.updatedocumentkey({ id: this.localData._id }).subscribe((response: any) => {

              if (response) {

                Swal.fire({
                  title: `Alle Verträge erfolgreich hochgeladen. <br> Vorgangs Nr.:` + this.localData.brokerregticketno,
                  showCloseButton: true,
                  allowOutsideClick: false,
                  icon: "success",
                  confirmButtonText: "Zum Dashboard <i class='fa fa-arrow-right'></i>",
                })
                  .then((result) => {
                    console.log(result);
                    if (result["isDismissed"]) {
                      // window.location.reload();
                      //this.logout();
                      // this.logout();

                      //this.reloadCurrentRoute();

                      this.localData.uploaddocument = 1;
                      localStorage.setItem("currentUser", JSON.stringify(this.localData));
                      console.log("iffffff");
                      // this.router.navigate([`/upload-document/${this.user_id}`], {
                      //   queryParams: { user_id: this.user_id },
                      $("#loaderouterid").css("display", "none");
                      // });
                    } else {
                      console.log("elsesssssssss");
                      // window.location.reload();
                      //this.logout();
                      this.localData.uploaddocument = 1;
                      localStorage.setItem("currentUser", JSON.stringify(this.localData));
                      //this.reloadCurrentRoute();
                      $("#loaderouterid").css("display", "none");
                    }
                  })
                  .catch((err) => { });
              }
            })
            // Swal.fire({
            //   title: `Ihre Daten wurden erfolgreich gespeichert. Sie können beim nächsten Login die fehlenden Daten ergänzen.  : ${this.TicketNo}.`,
            //   showCloseButton: true,
            //   allowOutsideClick: false,
            //   icon: "success",
            // })
            //   .then((result) => {
            //     console.log(result);
            //     if (result["isDismissed"]) {
            //       window.location.reload();
            //       // this.logout();
            //       // this.logout();
            //       console.log("iffffff");
            //       // this.router.navigate([`/upload-document/${this.user_id}`], {
            //       //   queryParams: { user_id: this.user_id },
            //       $("#loaderouterid").css("display", "none");
            //       // });
            //     } else {
            //       console.log("elsesssssssss");
            //       window.location.reload();
            //       // this.logout();
            //       $("#loaderouterid").css("display", "none");
            //     }
            //   })
            //   .catch((err) => { });
          }
        },
        (error) => {
          $("#loaderouterid").css("display", "none");

          console.log("Error", error);
        },
        () => { }
      );
  }
  downloadpdf(id, index = null, firstname = null, lastname = null) {
    if (id == "fourth") {
      let that = this;
      $("#model" + id).css("display", "block");
      // this.dataid = id;
      let pdfnew = new jsPDF("portrait", "pt", "a4");
      var width = pdfnew.internal.pageSize.width;
      pdfnew.html(document.getElementById("model" + id), {
        html2canvas: {
          // insert html2canvas options here, e.g.
          width: width,
        },
        callback: function (pdfnew) {
          pdfnew.save("MaklerVollmacht.pdf");
          $("#model" + id).css("display", "none");
        },
      });
    } else {
      $("#model" + id).css("display", "block");
      if (id == "first") {
        let firstpdfbrokerdetail = this.localData.firstname + " " + this.localData.lastname;
        if (this.localData.title == "Firma") {

          firstpdfbrokerdetail = firstpdfbrokerdetail + "<br>" + this.localData.companyname;
        }
        firstpdfbrokerdetail = firstpdfbrokerdetail + "<br>" + this.localData.strassa + " " + this.localData.strno
          + "<br>" + this.localData.plz + " " + this.localData.city;



        $("#firstpdfbrokerdetail").html(firstpdfbrokerdetail);

      }

      if (id == "third") {
        let firstpdfbrokerdetail = this.localData.firstname + " " + this.localData.lastname;
        if (this.localData.title == "Firma") {

          firstpdfbrokerdetail = firstpdfbrokerdetail + "/" + this.localData.companyname;
        }
        firstpdfbrokerdetail = firstpdfbrokerdetail + ", " + this.localData.strassa + " "
          + this.localData.strno
          + ", " + this.localData.plz + " " + this.localData.city;



        $("#brokerdetails3").html(firstpdfbrokerdetail);

        if (index == null) {
          console.log("indexxxxxxxx1111111111" + index)
        }
        else {
          console.log("indexxxxxxxx" + index)

          setTimeout(() => {
            $(".shareholderdetailsclass").css("display", "none");

            $("#shareholderdetails" + index).css("display", "block")
            $(".shareholderdetailsclasspdf").css("display", "none");

            $("#shareholderdetailspdf" + index).css("display", "block")

            $(".shareholderdesignationclass").css("display", "none");
            $("#shareholderdesignation" + index).css("display", "block")
            $(".shareholderdesignationclasspdf").css("display", "none");
            $("#shareholderdesignationpdf" + index).css("display", "block")


            $(".imageidclass").css("display", "none");
            $("#imageid" + id + "esign" + index).css("display", "block");

            $(".imageidclasspdf").css("display", "none");
            $("#imageid1" + id + "esign" + index).css("display", "block");


          }, 100);



        }




      }

      // this.dataid = id;
      console.log(id);
      let pdfnew = new jsPDF("portrait", "pt", "a4");
      var width = pdfnew.internal.pageSize.width;
      pdfnew.html(document.getElementById("model" + id), {
        html2canvas: {
          // insert html2canvas options here, e.g.
          width: width,
        },
        callback: function (pdfnew) {
          if (id == "first") {
            pdfnew.save("Vermittlervertrag.pdf");
            // this._handleImageUploadVollmacht();
          }
          if (id == "second") {
            pdfnew.save("Datenweiterverarbeitung_Vertrag.pdf");
            // this._handleImageUploadVollmacht();
          }
          if (id == "third") {
            let newpdfname = "Bürgschaft_Wirtschaftliche_Eigentümer_" + firstname + "_" + lastname + ".pdf";


            pdfnew.save(newpdfname);
            // this._handleImageUploadVollmacht();
          }
          $("#model" + id).css("display", "none");
        },
      });

      // let data = document.getElementById("model"+id);
      // console.log(data);
      // let pdf = new jsPDF("p", "pt", "a4");
      // html2canvas(data).then(canvas => {
      //   const contentDataURL = canvas.toDataURL("image/*");
      //   //Generates PDF in landscape mode
      //   var width = pdf.internal.pageSize.width;
      //   var height = pdf.internal.pageSize.height;
      //   var widthnew = width - 300;
      //   var heightnew = height - 180;
      //   console.log(width, height);
      //   if(id=='first')
      //   {
      //     this.fileBase64first = contentDataURL;
      //   pdf.addImage(contentDataURL, "PNG", 50, 20, width - 100, 500);
      //   pdf.save("Vermittlervertrag.pdf");
      //   // this._handleImageUploadVollmacht();
      //   }
      //   if(id=='second')
      //   {
      //     this.fileBase64second = contentDataURL;
      //   pdf.addImage(contentDataURL, "PNG", 50, 20, width - 100, 500);
      //   pdf.save("Datenweiterverarbeitung_Vertrag.pdf");
      //   // this._handleImageUploadVollmacht();
      //   }

      //   if(id=='third')
      //   {
      //     this.fileBase64third = contentDataURL;
      //   pdf.addImage(contentDataURL, "PNG", 50, 20, width - 100, 500);
      //   pdf.save("Bürgschaft_Wirtschaftliche_Eigentümer.pdf");
      //   // this._handleImageUploadVollmacht();
      //   }

      //   if(id=='fourth')
      //   {
      //     this.fileBase64fourth = contentDataURL;
      //   pdf.addImage(contentDataURL, "PNG", 50, 20, width - 100, 500);
      //   pdf.save("Maklervollmacht.pdf");
      //   // this._handleImageUploadVollmacht();
      //   }

      // });
      // $("#model"+id).css("display", "none");
    }
  }
  savesign() {
    let idnew = $("#idnew").val();
    let idnewindex = $("#idnewindex").val();
    let idnewindexmodelid = $("#idnewindexmodelid").val();
    $(".popupmodel").css("display", "none");
    $("#" + idnewindexmodelid + "pop").css("display", "block");
    // this.dataid = idnew;
    // $("#" + idnew).prop("checked", true);

    // let firstesign = $("#firstesign").is(":checked");
    // let secondesign = $("#secondesign").is(":checked");
    // let thirdesign = $("#thirdesign").is(":checked");
    // let fourthesign = $("#fourthesign").is(":checked");
    // if (firstesign && secondesign && fourthesign) {
    //   this.drawingcheck = true;
    // } else {
    //   this.drawingcheck = false;
    // }
    if (idnewindex != '') {
      $("#" + idnew + "" + idnewindex).css("display", "block");
      $("#imageid" + idnew + "" + idnewindex).attr("src", this.signaturePad.toDataURL());
      $("#imageid1" + idnew + "" + idnewindex).attr("src", this.signaturePad.toDataURL());
      // $("#imageid" + idnew+""+idnewindex).css("display","block");

      // $("#imageid1" + idnew).attr("src", this.signaturePad.toDataURL());
    }
    else {
      $("#" + idnew).css("display", "block");
      $("#imageid" + idnew).attr("src", this.signaturePad.toDataURL());
      $("#imageid1" + idnew).attr("src", this.signaturePad.toDataURL());
    }
    $("#" + idnewindexmodelid + "pop").css("display", "none");
    let obj = this.signeddoc.find((o, i) => {
      console.log("sign12367" + o.id + " " + o.index)
      console.log("sign12367" + idnew + " " + idnewindex)
      if (o.id == idnew && o.index == idnewindex) {
        return true; // stop searching
      }
    });
    console.log("obj" + obj)
    if (obj) {
      console.log("singed array" + JSON.stringify(this.signeddoc))
    } else {
      this.signeddoc.push({ id: idnew, index: idnewindex });
      this.showsavebutton = true;
      console.log("singed array" + JSON.stringify(this.signeddoc))
    }
    // this.signeddoc.push({ id: idnew, index: idnewindex });
    // this.showsavebutton=true;
    // console.log("singed array" + JSON.stringify(this.signeddoc))
    // if($("#"+idnew).css("display")=='block'){
    //   $("#"+idnew).css("display", "none");
    // }else
    // {
    //   $("#"+idnew).css("display", "block");
    // }
  }
  openesign(id, modelid, index = '') {
    $("#openmodelsign").trigger("click");

    this.clear1();

    $("#idnew").val(id);
    $("#idnewindex").val(index);
    $("#idnewindexmodelid").val(modelid);
    // if(index!='')
    // {
    //     if (id == "firstesign") {
    //       console.log(this.sign1);
    //       $("#signatureCanvas").attr("src", this.sign1);
    //     }
    //     if (id == "secondesign") {
    //       $("#signatureCanvas").attr("src", this.sign2);
    //     }

    //     if (id == "fourthesign") {
    //       $("#signatureCanvas").attr("src", this.sign4);
    //     }
    //   }
    //   else
    //   {
    //     if (id == "thirdesign") {
    //       $("#signatureCanvas").attr("src", this.sign3);
    //     }
    //   }

    // $('#'+id).prop('checked', true);
    // this.dataid=id;
  }
  openpopup(id, index = null) {
    //   if(id == "first")
    //   {
    //   let firstpdfbrokerdetail= this.localData.firstname +  " " + this.localData.lastname;
    //   if(this.localData.title == "Firma") {

    //     firstpdfbrokerdetail = firstpdfbrokerdetail + "<br>"  + this.localData.companyname;
    //   }
    //   firstpdfbrokerdetail = firstpdfbrokerdetail + "<br>"  + this.localData.strassa + " " + this.localData.strno
    //   + "<br>" + this.localData.plz + " " +  this.localData.city;



    //   $("#firstpreviewbrokerdetail").html(firstpdfbrokerdetail);
    // }

    $("#openmodel").trigger("click");
    console.log("indexxxxxxxx" + index)
    // this.dataid = id;
    $(".popupmodel").css("display", "none");
    $("#" + id + "pop").css("display", "block");

    this.modal_download = id;

    if (index == null) {
      console.log("indexxxxxxxx1111111111" + index)
    }
    else {
      console.log("indexxxxxxxx" + index)

      setTimeout(() => {
        $(".shareholderdetailsclass").css("display", "none");

        $("#shareholderdetails" + index).css("display", "block")
        $(".shareholderdetailsclasspdf").css("display", "none");

        $("#shareholderdetailspdf" + index).css("display", "block")

        $(".shareholderdesignationclass").css("display", "none");
        $("#shareholderdesignation" + index).css("display", "block")
        $(".shareholderdesignationclasspdf").css("display", "none");
        $("#shareholderdesignationpdf" + index).css("display", "block")


        $(".imageidclass").css("display", "none");
        $("#imageid" + id + "esign" + index).css("display", "block");

        $(".imageidclasspdf").css("display", "none");
        $("#imageid1" + id + "esign" + index).css("display", "block");


      }, 100);



    }


  }


  openpdfpopup(id, index = null) {
    if (index == null) {
      index = ' ';
    }
    let url: any = "";
    $("#openpdfmodel").trigger("click");
    url = this.checkpdf(id, index)
    console.log("url123" + id)
    console.log("url123" + url)
    $("#showsavedpdf").attr("src", url);





  }






  DomChangeTwo() {
    console.log("asdadadasdsadsadasd");
    this.SecDomChange = "show";
    $("#hide1").css("display", "none");
    $("#hide2").css("display", "none");
    $("#hide3").css("display", "none");

    $("#maindetan").css("display", "block");
    console.log("asdadadasdsadsadasd111111111111111111");

  }
  navigateWithb2bID() {
    console.log(this.selectedUser);

    this.router.navigate(["/b2b-dashboard"], {
      queryParams: { id: this.selectedUser.id },
    });

    // this.queryID = this.selectedUser.customerno;
   }
  //Check if the user is loggedIn or not
  isLoggedIn() {
    console.log("ddddd");
    let redirectionRoute = this.authService.checkRouteRedirect(this.loginRole);
    this.router.navigate([redirectionRoute]);
    // if (this.authService.isAuthenticated()) {
    //   if (this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles == 'admin') {
    //     this.router.navigate(['./admin-home']);
    //   }
    //   else if (this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles == 'Superadmin') {
    //     this.router.navigate(['./superadmin-home']);
    //   }
    //   else if (this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles == 'employee') {
    //     this.router.navigate(['./mitarbeiter-home']);
    //   }
    //   else if (this.userService.getDecodedAccessToken(localStorage.getItem('token')).roles == 'b2b') {
    //     this.router.navigate(['./b2b-home']);
    //   }
    //   else {
    //     this.router.navigate(['./kunde-home']);
    //   }
    // }
    // else {
    //   this.router.navigate(['./']);
    // }
  }
  startPage(): void {
    this.router.navigate(["./"]);
  }
}
