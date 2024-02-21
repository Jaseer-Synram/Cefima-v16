import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import * as jwt_decode from "jwt-decode";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpClient,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
} from "@angular/common/http";

let brand_id = environment.brand_id;

@Injectable()
export class UserService {
  LoggedInUser: any = JSON.parse(localStorage.getItem("currentUser") as any);
  API_URL = environment.API_URL;

  kundetype: any = [];
  kundevalue: any = [];
  type1selected: any = [];
  type2selected: any = [];

  // For passing modal id from sidebar to customer-side comp: By Jaseer
  modalIdfromSidebar = new BehaviorSubject('');
  invokeSideBarRouteFether: BehaviorSubject<any> = new BehaviorSubject('false');
  invokeFunctionInCustomerSide = new BehaviorSubject<any[]>(['string1', 'string2']);
  selectCustomerSideItem: BehaviorSubject<(string | number)[]> = new BehaviorSubject([]);
  heeaderData = new BehaviorSubject([''])


  constructor(private http: HttpClient) { }

  //Get Product Partner
  getproductpartner() {
    return this.http.get(`${this.API_URL}productpartner/listnew`);
  }

  getproductpartnerwithlogindetails(data: any) {
    return this.http.post(
      `${this.API_URL}productpartner/productpartnerwithlogin`,
      data
    );
  }

  productpartnerregistration(data: any) {
    return this.http.post(
      `${this.API_URL}productpartner/direct_register`,
      data
    );
  }

  //User Registration
  registerUser(data: any) {
    console.log("data====", data);
    return this.http.post(`${this.API_URL}users/cefima_user`, data);
  }
  //User Registration
  directregisterUser(data: any) {
    console.log("data====", data);
    return this.http.post(`${this.API_URL}users/cefima_customer`, data);
  }

  registerUserB2B(data: any) {
    console.log("data====", data);
    return this.http.post(`${this.API_URL}b2b/register`, data);
  }
  updatedocumentkey(data: any) {
    console.log("data====", data);
    return this.http.post(`${this.API_URL}users/updatedocumentkey`, data);
  }
  // FileUpload API

  callApiMultipart(data: any) {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    var token = localStorage.getItem("token");
    if (token !== "") {
      headers["Authorization"] = token;
    }
    return this.http.post(`${this.API_URL}document/upload`, data);
    // .pipe(
    //   map((event) => this.getEventMessage(event, data)),
    //   catchError(this.handleError)
    // );
  }

  getLoginHistory(data) {
    return this.http.post(`${this.API_URL}users/getLoginHistory`, data);
  }

  uploaddocumentwithoutticketno(data: any): Observable<any> {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    var token = localStorage.getItem("token");
    if (token !== "") {
      headers["Authorization"] = token;
    }
    return this.http
      .post(`${this.API_URL}document/uploaddocumentwithoutticketno`, data, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(catchError(this.errorMgmt));
  }

  uploaddocumentwithoutticketnocareer(data: any): Observable<any> {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    return this.http
      .post(
        `${this.API_URL}document/uploaddocumentwithoutticketnocareer`,
        data,
        {
          reportProgress: true,
          observe: "events",
        }
      )
      .pipe(catchError(this.errorMgmt));
  }

  submitcefimacareer(data: any) {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    return this.http.post(`${this.API_URL}career/cefimacareer`, data);
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  callApi(data: any) {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    //var token = localStorage.getItem("token");
    // if (token !== "") {
    //   headers["Authorization"] = token;
    // }

    return this.http.post(`${this.API_URL}document/upload-register-user`, data);
  }

  sendcontact(data: any) {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    //var token = localStorage.getItem("token");
    // if (token !== "") {
    //   headers["Authorization"] = token;
    // }

    return this.http.post(`${this.API_URL}contact/cefimacontact`, data);
  }

  callApidirectcustomerpoa(data: any) {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    //var token = localStorage.getItem("token");
    // if (token !== "") {
    //   headers["Authorization"] = token;
    // }

    return this.http.post(
      `${this.API_URL}document/upload-register-userdirectcustomerpoa`,
      data
    );
  }

  SpecialistCase(data: any) {
    console.log("data====", data);
    return this.http.post(`${this.API_URL}SpecialistCase`, data);
  }

  callApidirectcustomer(data: any) {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    //var token = localStorage.getItem("token");
    // if (token !== "") {
    //   headers["Authorization"] = token;
    // }

    return this.http.post(
      `${this.API_URL}document/upload-register-userdirectcustomer`,
      data
    );
  }

  callApi1(data: any) {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    //var token = localStorage.getItem("token");
    // if (token !== "") {
    //   headers["Authorization"] = token;
    // }

    return this.http.post(
      `${this.API_URL}document/upload-register-usernew`,
      data
    );
  }

  callApi2(data: any) {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    //var token = localStorage.getItem("token");
    // if (token !== "") {
    //   headers["Authorization"] = token;
    // }

    return this.http.post(
      `${this.API_URL}document/upload-FamilyMemberPOA`,
      data
    );
  }

  callApiMultipartmedia(data: any): any {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    var token = localStorage.getItem("token");
    if (token !== "") {
      headers["Authorization"] = token;
    }
    return this.http.post(`${this.API_URL}document/uploadmediacloud`, data);
  }

  callApiuploaddocumentnew(data: any): any {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    var token = localStorage.getItem("token");
    if (token !== "") {
      headers["Authorization"] = token;
    }
    return this.http.post(`${this.API_URL}document/uploaddocumentnew`, data);
  }

  callApiMultipartcontract(data: any): any {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    var token = localStorage.getItem("token");
    if (token !== "") {
      headers["Authorization"] = token;
    }
    return this.http.post(`${this.API_URL}document/uploadcontract`, data);
  }

  getListBranch(user_id: any) {
    return this.http.post(`${this.API_URL}addBranches/Getlistbranch`, {
      CreatedBy: user_id,
    });
    // return this.http.get(`${this.API_URL}document/get_documentsbydocumenttype`,{ "document_type" : document_type})
  }

  getEventMessage(event: HttpEvent<any>, formData: any) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
        break;
      case HttpEventType.Response:
        return this.apiResponse(event);
        break;
      default:
        return `File "${formData.get("profile").name
          }" surprising upload event: ${event.type}.`;
    }
  }

  fileUploadProgress(event: any) {
    const percentDone = Math.round((100 * event.loaded) / event.total);
    return { status: "progress", message: percentDone };
  }
  apiResponse(event: any) {
    return event.body;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened. Please try again later.");
  }

  updateUser(data: any) {
    return this.http.post(`${this.API_URL}users/updateUser`, data);
  }

  updateFamilyMember(data: any) {
    console.log("saveFamilyMemberPOA" + data);
    return this.http.post(
      `${this.API_URL}familymember/updateFamilyMember`,
      data
    );
  }

  updateUserb2b(data: any) {
    return this.http.post(`${this.API_URL}b2b/updateUser`, data);
  }
  updateBrokerCEO(data: any) {
    return this.http.post(`${this.API_URL}b2b/updateBrokerCEO`, data);
  }
  updateBrokerdata(data: any) {
    return this.http.post(`${this.API_URL}b2b/updateBrokerdata`, data);
  }
  updatecustomercompanyCEO(data: any) {
    return this.http.post(
      `${this.API_URL}customercompany/updatecustomercompany`,
      data
    );
  }
  updateUserb2bprogress(data: any) {
    return this.http.post(`${this.API_URL}b2b/updateUserprogress`, data);
  }
  //Getting the current User
  getcurrentUser() {
    console.log("in get current user function");
    return this.http.get(`${this.API_URL}users/me`);
  }

  //Get Autogenerated Password
  getPassword() {
    console.log("in get password function");
    return this.http.get(`${this.API_URL}users/autopassword`);
  }

  //get Document By Id kunde
  getDocumentsBYID(id: any, document_type: any, sub_customer_id?: any, sub_sub_customer_id?: any) {

    if (sub_customer_id && sub_sub_customer_id) {
      console.log(sub_customer_id, sub_sub_customer_id);

      return this.http.post(
        `${this.API_URL}document/get_documentsbyidwithkunde`,
        {
          user: id,
          document_type: document_type,
          sub_customer_id: sub_customer_id,
          sub_sub_customer_id: sub_sub_customer_id
        }
      );
    } else if (sub_customer_id) {
      console.log(sub_customer_id);

      return this.http.post(
        `${this.API_URL}document/get_documentsbyidwithkunde`,
        {
          user: id,
          document_type: document_type,
          sub_customer_id: sub_customer_id,
        }
      );
    }

    // return this.http.post(
    //   `${this.API_URL}document/get_documentsbyidwithkunde`,
    //   {
    //     user: id,
    //     document_type: document_type,
    //     sub_customer_id:sub_customer_id,
    //   }
    // );
  }

  //get Document By Id kunde
  getDocumentsBYIDnew(id: any, document_type: any) {
    return this.http.post(
      // `${this.API_URL}document/get_documentsbyidwithkundesecond`,
      `${this.API_URL}document/get_documentsbyidwithkunde`,
      {
        user: id,
        document_type: document_type
      }
    );
  }

  getLastdocument(): any {
    return this.http.post(`${this.API_URL}document/getLastdocument`, {});
  }
  getregisteredbrokerdocument(data: any): any {
    return this.http.post(
      `${this.API_URL}document/getregisteredbrokerdocument`,
      data
    );
  }
  downloadDocument(id: any) {
    return this.http.get(`${this.API_URL}document/downloaddocument/${id}`);
  }
  getDocumentsByIds(id: any, document_type: any, upload_by: any) {
    return this.http.post(
      `${this.API_URL}document/getgeneraldocumentbycustomerid`,
      {
        user: id,
        document_type: document_type,
        upload_by: upload_by,
      }
    );
  }
  getgeneraldocumentbycustomeridwithpoa(
    id: any,
    document_type: any,
    document_sub_type: any
  ) {
    return this.http.post(
      `${this.API_URL}document/getgeneraldocumentbycustomeridwithpoa`,
      {
        user: id,
        document_type: document_type,
        document_sub_type: document_sub_type,
      }
    );
  }

  //send verification code
  sendVerificationCode(phoneData: any) {
    return this.http.post(`${this.API_URL}sendVerificationCode`, {
      phoneNumber: phoneData.phoneNumber,
    });

    /*return this.http.post(`${this.API_URL}sendVerificationCode`,{"phoneNumber":phoneData.phoneNumber}).subscribe((data:any) => {
       console.log("serviceData",data);
       return data;
    }); */
    //return this.http.post(`${this.API_URL}sendVerificationCode`,{"phoneData":phoneData});
  }

  sendVerificationCode1(phoneData: any) {
    return this.http.post(`${this.API_URL}sendVerificationCode/cefima`, {
      phoneNumber: phoneData.phoneNumber,
    });

    /*return this.http.post(`${this.API_URL}sendVerificationCode`,{"phoneNumber":phoneData.phoneNumber}).subscribe((data:any) => {
       console.log("serviceData",data);
       return data;
    }); */
    //return this.http.post(`${this.API_URL}sendVerificationCode`,{"phoneData":phoneData});
  }

  checkVerificationCode(verificationData: any) {
    return this.http.post(`${this.API_URL}checkVerificationCode`, {
      otp: verificationData.otp,
      requestId: verificationData.requestId,
      userId: verificationData.userId,
    });
  }

  checkemail(data: any) {
    console.log("data====", data);
    return this.http.post(`${this.API_URL}users/checkemail`, data);
  }

  checkemailproductpartner(data: any) {
    console.log("data====", data);
    return this.http.post(
      `${this.API_URL}users/checkemailproductpartner`,
      data
    );
  }

  senduserdetails(Data: any) {
    return this.http.post(
      `${this.API_URL}users/updatewelcomvideobycefima`,
      Data
    );
  }
  addfamilymember(Data: any) {
    return this.http.post(`${this.API_URL}familymember/addFamilyMember`, Data);
  }
  addCustomerOffice(Data: any) {
    return this.http.post(
      `${this.API_URL}customeroffice/addCustomerOffice`,
      Data
    );
  }
  addUserOffice(Data: any) {
    return this.http.post(`${this.API_URL}useroffice/addUserOffice`, Data);
  }
  addCustomerCompany(Data: any) {
    return this.http.post(
      `${this.API_URL}customercompany/addNewCustomerCompany`,
      Data
    );
  }
  senduserdetailsupdate(Data: any) {
    return this.http.post(
      `${this.API_URL}users/updatewelcomvideobycefimaupdate`,
      Data
    );
  }
  sendmessage(Data: any) {
    return this.http.post(`${this.API_URL}chat/sendmessage`, Data);
  }
  giveansforquestion(Data: any) {
    return this.http.post(`${this.API_URL}chat/giveansforquestion`, Data);
  }
  checkvideoscreenshot(data: any) {
    return this.http.post(`${this.API_URL}users/checkvideoscreenshot`, data);
  }
  checkVerificationCode1(verificationData: any) {
    return this.http.post(`${this.API_URL}checkVerificationCode/newcefima`, {
      otp: verificationData.otp,
      requestId: verificationData.requestId,
      userId: verificationData.userId,
      phone_number: verificationData.phone_number,
    });
  }
  checkVerificationverifyphoneforcustomerregister(verificationData: any) {
    return this.http.post(
      `${this.API_URL}checkVerificationCode/verifyphoneforcustomerregister`,
      {
        otp: verificationData.otp,
        requestId: verificationData.requestId,
        userId: verificationData.userId,
        phone_number: verificationData.phone_number,
      }
    );
  }

  getGeneratePassword() {
    return this.http.get(`${this.API_URL}generatePassword`);
  }

  //user timeline activity
  usertimeline(timelines: any) {
    console.log(timelines);
    return this.http.post(`${this.API_URL}timeline`, timelines);
  }

  //user timeline activity
  usertimeline111(timelines: any, userid: any) {
    console.log(timelines);
    return this.http.post(`${this.API_URL}timeline/new`, {
      timelines: timelines,
      userid: userid,
    });
  }

  // user timeline by ID
  getusertimeline(user_id: any) {
    return this.http.post(`${this.API_URL}timeline/gettimeline`, {
      user_id: user_id,
    });
  }

  getUser(id: any) {
    return this.http.post(`${this.API_URL}getUser`, { id: id });
    /*return this.http.post(`${this.API_URL}getUser`,{"id":id}).subscribe((data:any) => {

    });*/
  }
  updateUserbrokeresign(data: any) {
    return this.http.post(`${this.API_URL}users/updateUserbrokeresign`, data);
  }
  updateUserdocumentdata(user_id: any) {
    console.log("updateUserdocumentdata" + user_id);
    return this.http.post(`${this.API_URL}document/updatedocumentname`, {
      user_id: user_id,
    });
  }
  getUser1(id: any) {
    return this.http.post(`${this.API_URL}getUser/userbycustomerno`, {
      customerno: id,
    });
    /*return this.http.post(`${this.API_URL}getUser`,{"id":id}).subscribe((data:any) => {

    });*/
  }
  getfamilyMembers(id: any) {
    console.log("familydata" + id);
    return this.http.post(`${this.API_URL}familymember/getFamilyMembers`, {
      customerid: id,
    });
  }

  getCompanyOffices(id: any) {
    return this.http.post(`${this.API_URL}customeroffice/getCustomerOffices`, {
      company_id: id,
    });
  }
  getUserCompanyOffices(id: any) {
    return this.http.post(`${this.API_URL}useroffice/getUserOffices`, {
      customerid: id,
    });
  }
  getCustomerCompanies(id: any) {
    return this.http.post(
      `${this.API_URL}customercompany/getCustomerCompanies`,
      { customerid: id }
    );
  }
  checkLinkExpire(id: any) {
    return this.http.post(`${this.API_URL}checkLinkExpire`, { id: id });
  }

  checkLinkExpirenew(id: any) {
    return this.http.post(`${this.API_URL}checkLinkExpirenew`, { id: id });
  }

  //Get All Users
  getUsers() {
    console.log("get all users function");

    return this.http.get(`${this.API_URL}users/allusers`);
  }

  getAllUsersFilter1(companies: any) {
    return this.http.post(`${this.API_URL}users/getAllUsersFilter1`, {
      companies: companies,
    });
  }

  getAllUsersFilter(companies: any) {
    return this.http.post(`${this.API_URL}users/getAllUsersFilter`, {
      companies: companies,
      startindexoption: 1,
    });
  }

  getSearch(searchText: any, CustomerNumbernew = "") {
    return this.http.post(`${this.API_URL}users/getSearch`, {
      searchText: searchText,
      CustomerNumbernew: CustomerNumbernew,
    });
  }

  //Decoding the token
  getDecodedAccessToken(token: string): any {
    try {
      let decodedToken = jwt_decode.jwtDecode(token)
      return decodedToken;
    } catch (Error) {
      return null;
    }
  }

  updateField(data1: any): any {
    return this.http
      .post(`${this.API_URL}users/updateField`, data1)
      .subscribe((data: any) => { });
  }

  deleteCustomer(id: any): any {
    return this.http
      .post(`${this.API_URL}users/deleteCustomer`, id)
      .subscribe((data: any) => {
        return data;
      });
  }

  statusCustomer(id: any): any {
    return this.http
      .post(`${this.API_URL}users/statusCustomer`, id)
      .subscribe((data: any) => { });
  }

  statusCustomernew(id: any): any {
    return this.http
      .post(`${this.API_URL}users/statusCustomernew`, id)
      .subscribe((data: any) => { });
  }

  updatePassword(data: any): any {
    return this.http
      .post(`${this.API_URL}updatePassword`, {
        id: data.id,
        password: data.password,
      })
      .subscribe((data: any) => {
        return data;
      });
    //return this.http.post(`${this.API_URL}updatePassword`,data);
    //return this.http.post(`${this.API_URL}updatePassword`,{ id:data.id, password:data.password });
  }

  updatePasswordnew(data: any): any {
    return this.http.post(`${this.API_URL}updatePassword`, {
      id: data.id,
      password: data.password,
    });

    //return this.http.post(`${this.API_URL}updatePassword`,data);
    //return this.http.post(`${this.API_URL}updatePassword`,{ id:data.id, password:data.password });
  }

  updatePasswordnewforspecialist(data: any): any {
    return this.http.post(
      `${this.API_URL}updatePassword/updatePasswordnewforspecialist`,
      {
        id: data.id,
        password: data.password,
      }
    );

    //return this.http.post(`${this.API_URL}updatePassword`,data);
    //return this.http.post(`${this.API_URL}updatePassword`,{ id:data.id, password:data.password });
  }

  updatePasswordforproductpartner(data: any): any {
    return this.http.post(
      `${this.API_URL}updatePassword/updatePasswordforproductpartner`,
      {
        id: data.id,
        password: data.password,
      }
    );
  }

  getLastUser(): any {
    console.log(this.API_URL);

    return this.http.post(`${this.API_URL}users/getLastUser`, {});
    /*this.http.post(`${this.API_URL}users/getLastUser`,{}).subscribe((data:any) => {
        //console.log("getLLLAT",data);
        return data;
    }); */
  }

  getEditUser(id: any): any {
    return this.http.post(`${this.API_URL}users/editUser`, { id: id });
    /*return this.http.post(`${this.API_URL}users/editUser`,id).subscribe((data:any) => {
        return data;
    }); */
  }

  getCustomers(company: any, role?: any): any {
    if (role) {
      return this.http.post(`${this.API_URL}users/getCustomers`, {
        company: company,
        role: "b2b",
      });
    } else {
      return this.http.post(`${this.API_URL}users/getCustomers`, {
        company: company,
        // role: "b2b",
      });
    }
  }

  getCustomerssearch(searchtext: any, company: any, role?: any): any {
    if (role) {
      return this.http.post(`${this.API_URL}users/getCustomerssearch`, {
        searchText: searchtext,
        company: company,
        role: "b2b",
      });
    } else {
      return this.http.post(`${this.API_URL}users/getCustomerssearch`, {
        searchText: searchtext,
        company: company,
      });
    }
  }

  updatePatientStatus(drId: any, patientNo: any, status: any) {
    return this.http.post(`${this.API_URL}patient/updateStatus`, {
      doctorId: drId,
      status: status,
      userNo: patientNo,
    });
  }

  checkPositive(userNo: any) {
    return this.http.post(`${this.API_URL}patient/checkPositive`, {
      userNo: userNo,
    });
  }

  getAllPatients() {
    return this.http.get(`${this.API_URL}patient/all`);
  }

  getPatientLocation(patientId: any, date: any) {
    return this.http.get(
      `${this.API_URL}patient/${patientId}/locations?createdAt=${date}`
    );
  }

  getLastlocations() {
    return this.http.get(`${this.API_URL}patient/getLastlocations`);
  }

  getUserNoById(id: any) {
    return this.http.post(`${this.API_URL}patient/getUserNoById`, { id: id });
  }

  getIdByUserNo(userNo: any) {
    return this.http.post(`${this.API_URL}patient/getIdByUserNo`, {
      userNo: userNo,
    });
  }

  getLocations(id: any, fromDate: any, toDate: any) {
    return this.http.post(`${this.API_URL}patient/getLocations`, {
      id: id,
      fromDate: fromDate,
      toDate: toDate,
    });
  }

  getDocuments(id: any, document_type: any) {
    return this.http.post(`${this.API_URL}document/get_documents`, {
      user: id,
      document_type: document_type,
    });
  }

  viewDocument(id: any) {
    return this.http.get(`${this.API_URL}document/view_document/${id}`);
  }

  SendMailToAllProductPartner(data: any) {
    return this.http.post(`${this.API_URL}users/SendMailAllProductPartner`, {
      data: data,
    });
  }

  // CaseListUpload
  CaseListUpload(data: any) {
    console.log("data====", data);
    return this.http.post(`${this.API_URL}case`, data);
  }

  // New Apis

  GetSingleDocument(t_n = "", id = "", companynameactual = "") {
    return this.http.post(`${this.API_URL}case/GetList`, {
      companyname: t_n,
      employee_id: id,
      companynameactual: companynameactual,
    });
  }
  getdocumentidbydocument_unique_id(id: any, document_unique_id: any) {
    return this.http.post(
      `${this.API_URL}document/getdocumentidbydocument_unique_id`,
      {
        user: id,
        document_type: "dd",
        document_unique_id: document_unique_id,
      }
    );
  }
  GetListbycaseno0(companyname = "", id = "") {
    return this.http.post(`${this.API_URL}case/GetListbycaseno0`, {
      companyname: companyname,
      employee_id: id,
    });
  }
  GetListbynewcaseno(employee_id: any) {
    return this.http.post(
      `${this.API_URL}case/GetListbynewcaseno`,
      employee_id
    );
  }

  GetSingleDocumentbycaseno(caseno = "") {
    return this.http.post(`${this.API_URL}case/GetListbycaseno`, {
      caseno: caseno,
    });
  }

  getlistbyproductpartner(data: any) {
    return this.http.post(
      `${this.API_URL}inventoryDoc/getlistbyproductpartner`,
      data
    );
  }

  getlistbyuserid(data: any) {
    return this.http.post(`${this.API_URL}inventoryDoc/getlistbyuserid`, data);
  }

  geteditpartner(id: any): any {
    return this.http.post(`${this.API_URL}productpartner/editpartner`, {
      id: id,
    });
    /*return this.http.post(`${this.API_URL}users/editUser`,id).subscribe((data:any) => {
        return data;
    }); */
  }

  getproductpartnerbyproducttypeid(id: any): any {
    return this.http.post(
      `${this.API_URL}productpartner/getproductpartnerbyproducttypeid`,
      {
        ptid: id,
      }
    );
    /*return this.http.post(`${this.API_URL}users/editUser`,id).subscribe((data:any) => {
        return data;
    }); */
  }
  assigncaseno(data: any) {
    return this.http.post(`${this.API_URL}Specialist/assigncaseno`, data);
  }
  assigncasenoforproductpartnerlogin(data: any) {
    return this.http.post(`${this.API_URL}partner/assigncaseno`, data);
  }

  GetSpecialist_list(id: any) {
    return this.http.post(`${this.API_URL}Specialist/Specialist-list`, {
      id: id,
    });
  }
  GetSpecialist_listnew(id: any) {
    return this.http.post(`${this.API_URL}Specialist/Specialist-listnew`, {
      id: id,
    });
  }

  getalldocumentbyeployeeidnew(searchtext: any, companyname: any, id: any) {
    console.log(searchtext, companyname, id);
    return this.http.post(
      `${this.API_URL}document/getalldocumentbyeployeeidnew`,
      { searchtext: searchtext, companyname: companyname, ticket_no: id }
    );
  }

  GetDocByInsurance(T_N: any) {
    return this.http.post(
      `${this.API_URL}document/DocBySendEmailToInsurance `,
      {
        ticket_no: T_N,
      }
    );
  }

  GetDocByInsurancenew(T_N: any, pp: any) {
    return this.http.post(
      `${this.API_URL}document/DocBySendEmailToInsurancenew `,
      {
        ticket_no: T_N,
        pp: pp,
      }
    );
  }

  getproductlistbyid(id: any) {
    console.log("data====" + id);
    return this.http.post(`${this.API_URL}productpartner/Productlistbyid`, {
      id: id,
    });
  }
  Productlistbyidnew(id: any) {
    console.log("data====" + id);
    return this.http.post(`${this.API_URL}productpartner/Productlistbyidnew`, {
      id: id,
    });
  }
  Productpartnerloginbyidnew(id: any) {
    console.log("data====" + id);
    return this.http.post(`${this.API_URL}partner/Productpartnerloginbyidnew`, {
      id: id,
    });
  }

  ProductPartnerRegister(data: any) {
    console.log("in get password function");
    return this.http.post(`${this.API_URL}partner/Register`, data);
  }

  getSpecialistBy_Id(id: any) {
    return this.http.post(`${this.API_URL}Specialist/GetSpecialistById`, {
      id: id,
    });
  }
  getSpecialistBy_Idnew(id: any) {
    return this.http.post(`${this.API_URL}Specialist/GetSpecialistByIdnew`, {
      id: id,
    });
  }

  getalldocumentbyticket_no(ticket_no: any) {
    return this.http.post(`${this.API_URL}document/getalldocumentbyticket_no`, {
      ticket_no: ticket_no,
    });
  }

  Productpartnerloginbyuniqueidnew(id: any) {
    return this.http.post(
      `${this.API_URL}partner/Productpartnerloginbyuniqueidnew`,
      {
        id: id,
      }
    );
  }
  SpecialistLogin(email: any, id: any) {
    return this.http.post(`${this.API_URL}Specialist/SpecialistLogin`, {
      id: id,
      email: email,
    });
  }

  UpdatePassword(id: any, password: any) {
    return this.http.post(
      `${this.API_URL}Specialist/UpdateSpecialistPassword`,
      {
        id: id,
        password: password,
      }
    );
  }

  update_specialist(data: any) {
    return this.http.post(`${this.API_URL}Specialist/updatespecialist`, data);
  }

  registerSpecilist(data: any) {
    console.log("data====", data);
    return this.http.post(`${this.API_URL}Specialist/Register`, data);
  }

  GetSpecialistCases(id: any) {
    return this.http.post(
      `${this.API_URL}SpecialistCase/GetSpecialistCasesById`,
      {
        id: id,
      }
    );
  }

  DocByTicketNumber(T_N: any) {
    return this.http.post(`${this.API_URL}document/DocByTicketNumber`, {
      ticket_no: T_N,
    });
  }

  SpecialistUpdateStatus(id: any) {
    return this.http.post(`${this.API_URL}Specialist/updatespecialiststatus`, {
      id: id,
    });
  }

  CurrentConversation(id: any) {
    return this.http.post(`${this.API_URL}messages/conversationId`, {
      ConversationId: id,
    });
  }
  GetConversation(id: any) {
    return this.http.post(`${this.API_URL}conversations/userId`, {
      userId: id,
    });
  }

  AddMessages(data: any) {
    return this.http.post(`${this.API_URL}messages`, {
      data,
    });
  }
  callApiuploaddocumentnewsaveprogress(data: any): any {
    var headers: any = {};
    headers["Content-Type"] = "multipart/form-data";
    var token = localStorage.getItem("token");
    if (token !== "") {
      headers["Authorization"] = token;
    }
    return this.http.post(
      `${this.API_URL}document/uploaddocumentnewsaveprogress`,
      data
    );
  }

  getchatmessage(data: any) {
    return this.http.post(`${this.API_URL}chat/getchatmessage`, data);
  }

  getchatunreadmessage(data: any) {
    return this.http.post(`${this.API_URL}chat/getchatunreadmessage`, data);
  }

  getbrokerbyuser_id(user_id: any) {
    console.log("data====");
    return this.http.post(`${this.API_URL}users/getbrokerbyuser_id1111`, {
      user_id: user_id,
    });
    // return this.http.get(`${this.API_URL}document/get_documentsbydocumenttype`,{ "document_type" : document_type})
  }
  getchatmessageunreadcount(data: any) {
    return this.http.post(
      `${this.API_URL}chat/getchatmessageunreadcount`,
      data
    );
  }

  getproducttypequestionlistbyid(id: any) {
    return this.http.post(
      `${this.API_URL}chat/getproducttypequestionlistbyid`,
      id
    );
  }

  getchatmessagebyanytime(data: any) {
    return this.http.post(`${this.API_URL}chat/getchatmessagebyanytime`, data);
  }

  getUserRolesAndRouteArray() {
    let roles = [];
    if (localStorage.getItem("token")) {
      let currentRoles: any = this.getDecodedAccessToken(
        localStorage.getItem("token")!
      ).roles;
      for (let i = 0; i < currentRoles.length; i++) {
        let role: any = {};
        if (currentRoles[i] == "b2b" || currentRoles[i] == "customer") {
          if (currentRoles[i] == "b2b") {
            role.name = "B2B";
            role.english_name = "b2b";
            role.route = "./b2b-home";
            roles.push(role);
          } else if (currentRoles[i] == "customer") {
            role.name = "Kunde";
            role.english_name = "customer";
            role.route = "./kunde-home";
            roles.push(role);
          }
        }
      }
    }
    console.log("Rolles" + roles);
    return roles;
  }

  delete_registeration_document(id: any): any {
    return this.http
      .post(`${this.API_URL}document/deleteregisterationdocument`, id)
      .subscribe((data: any) => {
        return data;
      });
  }

  removebrokerdata(id: any): any {
    return this.http
      .post(`${this.API_URL}b2b/deleteallbrokerdata`, id)
      .subscribe((data: any) => {
        return data;
      });
  }

  unverifybrokerdocs(id: any): any {
    return this.http
      .post(`${this.API_URL}b2b/unverifybrokerdocs`, id)
      .subscribe((data: any) => {
        return data;
      });
  }

  savelocaldata(kundetype = "", kundevalue = "", type1 = "", type2 = "") {
    this.kundetype = kundetype;
    this.kundevalue = kundevalue;

    this.type1selected = type1;
    this.type2selected = type2;
  }

  getdocument_url(document_unique_id: any) {
    return this.http.post(`${this.API_URL}document/getdocument_url`, {
      document_unique_id: document_unique_id,
    });
  }

  getEditpartner(id: any): any {
    return this.http.post(`${this.API_URL}productpartner/editpartner`, {
      id: id,
    });
  }

  getproducttypelistbysparte(sparte: any) {
    return this.http.post(
      `${this.API_URL}productpartner/getproducttypelistbysparte`,
      {
        sparte: sparte,
      }
    );
  }

  dashboard_positions_list() {
    return this.http.get(
      `${this.API_URL}dashboard_positions/dashboard_positions_list`
    );
  }

  getuserby_id(data: any) {
    return this.http.post(`${this.API_URL}users/getuserbyid`, data);
  }

  getfamilymemberby_id(data: any) {
    return this.http.post(
      `${this.API_URL}familymember/getfamilymemberbyid`,
      data
    );
  }

  getcompanyuserby_id(data: any) {
    return this.http.post(
      `${this.API_URL}customercompany/getcompanybyid`,
      data
    );
  }

  getproducttypequestionlist(search = "") {
    return this.http.post(
      `${this.API_URL}productpartner/getproducttypequestionlist`,
      { search: search }
    );
  }

  consult(data: any) {
    return this.http.post(`${this.API_URL}consulting/cefima_consulting`, data);
  }

  get_consulting_by_user(data: any) {
    return this.http.post(
      `${this.API_URL}consulting/get_consulting_by_user`,
      data
    );
  }

  getAllTabs() {
    return this.http.get(`${this.API_URL}dashboard_positions/get-all-tabs`);
  }

  getQuestionsByTab(data: any) {
    return this.http.post(
      `${this.API_URL}dashboard_positions/get-questions-by-tab`,
      data
    );
  }

  addQuestionAnswer(data: any) {
    return this.http.post(
      `${this.API_URL}question-answer/add-question-answer`,
      data
    );
  }
  addMultipleQuestionAnswer(data: any) {
    return this.http.post(
      `${this.API_URL}question-answer/add-multiple-question-answer`,
      data
    );
  }

  getAnswersByQuestionId(data: any) {
    return this.http.post(
      `${this.API_URL}question-answer/get-answer-by-id`,
      data
    );
  }

  getDocumentByTabId(tabId: any) {
    return this.http.get(
      `${this.API_URL}question-answer/get-document-by-id/${tabId}`
    );
  }

  getTabsByType(type: any) {
    return this.http.get(
      `${this.API_URL}dashboard_positions/get-tabs-by-type/${type}`
    );
  }

  getAllQuestions(data: any) {
    return this.http.post(
      `${this.API_URL}dashboard_positions/get-questions-for-multiple-tabs`,
      data
    );
  }

  getMainCompanyBranch(id: any) {
    return this.http.get(`${this.API_URL}useroffice/get-all-branches/${id}`);
  }

  getSubCompanyBranch(id: any) {
    return this.http.get(
      `${this.API_URL}customeroffice/get-all-branches/${id}`
    );
  }

  getAllQuestionsProductType(data: any) {
    return this.http.post(
      `${this.API_URL}productpartner/get-questions-for-multiple-producttype`,
      data
    );
  }

  addMultipleConsultData(data: any) {
    return this.http.post(
      `${this.API_URL}consulting/add-multiple-consulting`,
      data
    );
  }

  getNextCaseNumber() {
    // return this.http.get(`${this.API_URL}consulting/get-next-case-number`);
    return this.http.post(`${this.API_URL}document/getLastdocument`, "");
  }

  delete_calendar_event(data: any) {
    return this.http.post(`${this.API_URL}calendar_events/delete`, data);
  }

  get_calendar_events_by_user(data: any) {
    return this.http.post(
      `${this.API_URL}calendar_events/get_events_by_user`,
      data
    );
  }

  get_user_neoloop_rights(user_id: any) {
    return this.http.get(
      `${this.API_URL}users/get_user_neoloop_rights/${user_id}`
    );
  }

  add_calendar_event(data: any) {
    return this.http.post(`${this.API_URL}calendar_events/add`, data);
  }

  update_calendar_event(data: any) {
    return this.http.post(`${this.API_URL}calendar_events/update`, data);
  }

  update_frontend_home_page(data: any) {
    return this.http.post(
      `${this.API_URL}users/update_frontend_home_page`,
      data
    );
  }

  get_hrtech_companies(brand_id: any) {
    return this.http.get(
      `${this.API_URL}hrtech/get_hrtech_companies/${brand_id}`
    );
  }

  add_file_in_case(data: any) {
    return this.http.post(`${this.API_URL}case/add_files_in_case`, data);
  }

  addmediadocument(data: any) {
    console.log("data====", data);
    return this.http.post(`${this.API_URL}document/addmediadocument`, data);
  }

  get_case_by_user_id(user_id: any) {
    return this.http.get(`${this.API_URL}case/get_case_by_user_id/${user_id}`);
  }

  get_case_details_by_case_number(Activity_No: String) {
    return this.http.get(
      `${this.API_URL}case/getCaseDetailsByCaseNumber/${Activity_No}`
    );
  }

  get_brand_details_by_case_no(Activity_No: any) {
    return this.http.get(
      `${this.API_URL}all_companies/get_brand_details_by_case_no/${Activity_No}`
    );
  }

  get_brand_by_id(data: any) {
    return this.http.post(`${this.API_URL}all_companies/get_brand_by_id`, data);
  }

  get_chat_mails(data: any) {
    return this.http.post(`${this.API_URL}chat/getChatMails`, data);
  }

  get_chat_unread_mails(data: any) {
    return this.http.post(`${this.API_URL}chat/getChatUnreadMails`, data);
  }

  close_imap_connection(data: any) {
    return this.http.post(`${this.API_URL}chat/closeImapConnection`, data);
  }

  send_chat_email(data: any) {
    return this.http.post(`${this.API_URL}users/send_chat_email`, data);
  }

  get_document_url_by_document_unique_id(data: any) {
    return this.http.post(`${this.API_URL}document/getdocument_url`, data);
  }

  save_user_email_configuration(data: any) {
    return this.http.post(
      `${this.API_URL}users/save_user_email_configuration`,
      data
    );
  }

  update_user_email_configuration(data: any) {
    return this.http.post(
      `${this.API_URL}users/update_user_email_configuration`,
      data
    );
  }

  get_user_email_configuration(user_id: any) {
    return this.http.get(
      `${this.API_URL}users/get_user_email_configuration/${user_id}`
    );
  }

  check_smtp_connection(data: any) {
    return this.http.post(`${this.API_URL}users/check_smtp_connection`, data);
  }

  check_imap_connection(data: any) {
    return this.http.post(`${this.API_URL}users/check_imap_connection`, data);
  }
  // setUserStatus(data:any) {
  //   return this.http.post(`${this.API_URL}user/set-user-status`, data);
  // }


  ipify() {
    return this.http.get('https://api.ipify.org/?format=json');
  }

  geolocation() {
    return this.http.get('https://geolocation-db.com/json/');
  }

  getIpDetails(ip_address) {
    return this.http.get(`https://freeipapi.com/api/json/${ip_address}`);
  }

}
