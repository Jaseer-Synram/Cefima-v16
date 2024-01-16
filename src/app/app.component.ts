import { Component } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cefima';

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  constructor(router: Router) {
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
}
