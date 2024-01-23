import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  tokensession = localStorage.getItem("token");
  localdata = JSON.parse(localStorage.getItem("currentUser"));
  currentActiveRole = localStorage.getItem("currentActiveRole");
  year: any = new Date().getFullYear();

  id: any
  ppid: any = ""

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    // this.id = this.userService.getDecodedAccessToken(localStorage.getItem("token")!).id;
    this.route.queryParams.subscribe((param) => {
      this.ppid = param["ppid"];
    });
  }

  ngOnInit(): void {
    console.log(this.ppid);
    
  }

  gotosessiondashboard() {
    if (this.tokensession != null) {
      if (this.currentActiveRole == "b2b") {
        this.router.navigate(["/b2b-home"]);
      } else {
        this.router.navigate(["/kunde-home"], { queryParams: { id: this.id } });
      }
    } else {
      this.router.navigate(["/"]);
    }
  }

  ngAfterViewInit() {
    $("#brokerhowitworkmodal").css("display", "none");
    var height: any = $(window).height();
    var width: any = $(window).width();
    var correctwidth = width;
    // var newhieght = height-80;
    $(".iconst").css("width", "6%");
    if (width > 545 && width <= 1500) {
      var actualwidthrotate = width;
      if (width > 767 && width <= 1200) {
      }
      width = 545;
      var newtoprotate = (height / 100) * 50;
      if (actualwidthrotate > 767 && actualwidthrotate <= 900) {
        var newtoprotate = (height / 100) * 51;
      } else if (actualwidthrotate > 900 && actualwidthrotate <= 1100) {
        var newtoprotate = (height / 100) * 53;
      } else if (actualwidthrotate > 1100 && actualwidthrotate <= 1200) {
        var newtoprotate = (height / 100) * 58;
      } else if (actualwidthrotate > 1200 && actualwidthrotate <= 1400) {
        var newtoprotate = (height / 100) * 55;
      }
    } else if (width > 1500) {
      var actualwidthrotate = width;
      var widthrotate = width / 10;

      if (width > 1500 && width <= 2000) {
        width = 600;
        var newtoprotate = (height / 100) * 50;
      }
      if (width > 2000 && width <= 2500) {
        width = 700;
        var newtoprotate = (height / 100) * 50;
      }
      if (width > 2500) {
        width = 900;
        var newtoprotate = (height / 100) * 50;
      }
    } else {
      var newwidth = (width * 100) / 545;
    }

    if (width > 600 && width < 800) {
      var widthicon = "8%";
      $(".iconst").css("width", widthicon);

      var newwidth = 900 - width;

      var right = newwidth / 10 - 5 + "%";
      $("#icons1").css("right", right);

      var right = newwidth / 10 + 25 + "%";
      $("#icons2").css("right", right);

      var right = newwidth / 10 + 25 + "%";
      $("#icons3").css("right", right);

      var right = newwidth / 10 + 13 + "%";
      $("#icons4").css("right", right);

      var right = newwidth / 10 - 10 + "%";
      $("#icons5").css("right", right);

      var right = newwidth / 10 + 35 + "%";
      $("#icons6").css("right", right);

      var right = newwidth / 10 + 0 + "%";
      $("#icons7").css("right", right);

      var right = newwidth / 10 + 45 + "%";
      $("#icons8").css("right", right);

      var right = newwidth / 10 + 44 + "%";
      $("#icons9").css("right", right);

      var right = newwidth / 10 - 15 + "%";
      $("#icons10").css("right", right);

      var right = newwidth / 10 + 5 + "%";
      $("#icons11").css("right", right);

      var right = newwidth / 10 + 30 + "%";
      $("#icons12").css("right", right);

      var right = newwidth / 10 + 6 + "%";
      $("#icons13").css("right", right);

      var right = newwidth / 10 - 12 + "%";
      $("#icons14").css("right", right);

      var right = newwidth / 10 + 30 + "%";
      $("#icons15").css("right", right);
    } else if (width > 800) {
      var widthicon = "8%";
      $(".iconst").css("width", widthicon);

      var newwidth = 900 - width;

      var right = newwidth / 10 + "%";
      $("#icons1").css("right", right);

      var right = newwidth / 10 + 30 + "%";
      $("#icons2").css("right", right);

      var right = newwidth / 10 + 32 + "%";
      $("#icons3").css("right", right);

      var right = newwidth / 10 + 18 + "%";
      $("#icons4").css("right", right);

      var right = newwidth / 10 - 6 + "%";
      $("#icons5").css("right", right);

      var right = newwidth / 10 + 45 + "%";
      $("#icons6").css("right", right);

      var right = newwidth / 10 + 4 + "%";
      $("#icons7").css("right", right);

      var right = newwidth / 10 + 53 + "%";
      $("#icons8").css("right", right);

      var right = newwidth / 10 + 50 + "%";
      $("#icons9").css("right", right);

      var right = newwidth / 10 - 10 + "%";
      $("#icons10").css("right", right);

      var right = newwidth / 10 + 10 + "%";
      $("#icons11").css("right", right);

      var right = newwidth / 10 + 36 + "%";
      $("#icons12").css("right", right);

      var right = newwidth / 10 + 12 + "%";
      $("#icons13").css("right", right);

      var right = newwidth / 10 - 7 + "%";
      $("#icons14").css("right", right);

      var right = newwidth / 10 + 47 + "%";
      $("#icons15").css("right", right);
    } else {
      var widthicon = "6%";
      $(".iconst").css("width", widthicon);

      var right = "30%";
      $("#icons1").css("right", right);

      var right = "50%";
      $("#icons2").css("right", right);

      var right = "53%";
      $("#icons3").css("right", right);

      var right = "44%";
      $("#icons4").css("right", right);

      var right = "27%";
      $("#icons5").css("right", right);

      var right = "59%";
      $("#icons6").css("right", right);

      var right = "39%";
      $("#icons7").css("right", right);

      var right = "63%";
      $("#icons8").css("right", right);

      var right = "64%";
      $("#icons9").css("right", right);

      var right = "28%";
      $("#icons10").css("right", right);

      var right = "43%";
      $("#icons11").css("right", right);

      var right = "57%";
      $("#icons12").css("right", right);

      var right = "48%";
      $("#icons13").css("right", right);

      var right = "36%";
      $("#icons14").css("right", right);

      var right = "60%";
      $("#icons15").css("right", right);
    }

    var newheight = height - 80;

    $("#heightid").css("height", newheight);

    let valuenew = $("#goinsidediv").val();
    if (valuenew == "0") {
      var newheight1 = height - 210;
      $("#scrolled").css("height", newheight1);
    } else {
      var newheight1: number = height;
      $("#scrolled").css("height", newheight1);
    }
    if (correctwidth > 1100) {
      $(".section-fix").css("width", width);
      $(".section-fix").css("height", width);
      $("#rotatebtn").css("width", width - 100);
    } else {
      $(".section-fix").css("width", "100%");
      $(".section-fix").css("height", "100%");
      $("#rotatebtn").css("width", "100%");
    }

    // if need, to include
    // this.signaturePad.set("minWidth", 2); // set szimek/signature_pad options at runtime
    // this.signaturePad.clear(); // invoke functions from szimek/signature_pad API

    if (this.ppid != undefined) {
      $("#loginbtn").trigger("click");
    }

    let that = this;

    $("#closeform2").on("click", function () {
      $(".section2").removeClass("slideboxs2");
      // $('#content2').css("display", "none");

      Swal.fire({
        title:
          "Wenn Sie die den Eingabebereich verlassen werden Ihre Daten verworfen.",
        // allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: "Bleiben",
        cancelButtonText: "Verlassen &nbsp; <i class='fa fa-arrow-right'></i>",
      }).then((result) => {
        if (result.value) {
        } else if (result.dismiss === Swal.DismissReason.backdrop) {
          // that.reset_company_type();
          // that.company_name_exists = false;

          // that.ThirdTypeDoc.reset();
          //  that.RegistrationGroupfirma.patchValue({
          //    companytype:""
          //  });
        } else {
          // that.reset_company_type();
          // that.company_name_exists = false;
          // that.ThirdTypeDoc.reset();
          //  that.RegistrationGroupfirma.patchValue({
          //    companytype:""
          //  });

          $("#sidebar2").removeClass("active");

          $("#aboutus").addClass("active");
          $("#fp-nav").css("display", "block");
          $("#resetsecond").trigger("click");
          $("#formopen").val("0");
        }
      });

      // $('#Firstpage').css("display","block");
      //   $('#aboutus').css("display","block");
      //   $('#privatesection').css("display","block");
      //   $('#footersectionnew').css("display","block");
    });
  }

}
