import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { SocketAlertsService } from './socket-alerts.service';
import Swal from 'sweetalert2';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cefima';

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  constructor(private router: Router,
    private socketAlertService:SocketAlertsService,
    private socket:Socket) {
    router.events.subscribe(
      (event): void => {
        if (event instanceof RouteConfigLoadStart) {
          $("#loaderouterid").css("display", "block");
        } else if (event instanceof RouteConfigLoadEnd) {
          $("#loaderouterid").css("display", "none");
        }
      }
    );
  }

  ngOnInit(): void {
    this.socketAlertService.data$.subscribe((newData:any) => {
      // this.socketAlerts(newData);
    });
    if(JSON.parse(localStorage.getItem("currentUser"))?._id){
      // this.logged_in();
    }
  }

  logged_in(){
    let user_info = JSON.parse(localStorage.getItem("currentUser"));
      // this.socket.emit("logged-in", user_info._id);
      this.socket.on("session-removed",(data)=>{
        if(data.token_to_remove == localStorage.getItem("token")){
          localStorage.clear();
          this.router.navigate(['./']).then(() => {
            Swal.fire({
              title: "Die Sitzung dieses Geräts wurde abgemeldet.",
              icon:"info"
            });
          });
        }
      });
  }

  socketAlerts(param){
    if(param.socketName == "logged-in"){
      this.logged_in();
    }else if(param.socketName == "remove-session"){
      let user_info = JSON.parse(localStorage.getItem("currentUser"));
      this.socket.emit("remove-session", {user_id: user_info._id, token_to_remove: param.token_to_remove});
    }
  }

}
