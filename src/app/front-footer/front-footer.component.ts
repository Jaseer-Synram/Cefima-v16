import { Component } from '@angular/core';

@Component({
  selector: 'app-front-footer',
  templateUrl: './front-footer.component.html',
  styleUrls: ['./front-footer.component.css']
})
export class FrontFooterComponent {

  year: any = new Date().getFullYear();
  constructor() { }
  
}
