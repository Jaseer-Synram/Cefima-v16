import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  isExpanded = true;
  showSubmenu: any = [];
  isShowing = false;
  showSubSubMenu: boolean = false;
  all_companies: any = [];

  constructor(public router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // this.userService.get_all_companies().subscribe((result)=>{
    //   console.log("All companies in side bar");
    //   console.log(result);
    //   this.all_companies = result;
    //   this.all_companies.map(company=>{
    //     this.showSubmenu[company._id] = false;
    //   })
    // });
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
}
